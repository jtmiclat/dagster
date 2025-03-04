import * as React from "react";
import gql from "graphql-tag";
import * as querystring from "query-string";
import { ApolloClient } from "apollo-client";
import { DirectGraphQLSubscription } from "../DirectGraphQLSubscription";
import { Run } from "./Run";
import { RunPipelineRunEventFragment } from "./types/RunPipelineRunEventFragment";
import { PipelineRunStatus } from "../types/globalTypes";
import { PipelineRunLogsSubscriptionStatusFragment } from "./types/PipelineRunLogsSubscriptionStatusFragment";
import { PipelineRunLogsSubscription } from "./types/PipelineRunLogsSubscription";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
  EVENT = "EVENT" // structured events
}

export const GetDefaultLogFilter = () => {
  const { q } = querystring.parse(window.location.search);

  return {
    levels: Object.assign(
      Object.keys(LogLevel).reduce(
        (dict, key) => ({ ...dict, [key]: true }),
        {}
      ),
      { [LogLevel.DEBUG]: false }
    ),
    text: typeof q === "string" ? q : "",
    since: 0
  };
};

export interface ILogFilter {
  text: string;
  levels: { [key: string]: boolean };
  since: number;
}

interface ILogsFilterProviderProps {
  client: ApolloClient<any>;
  runId: string;
  filter: ILogFilter;
  children: (props: {
    allNodes: (RunPipelineRunEventFragment & { clientsideKey: string })[];
    filteredNodes: (RunPipelineRunEventFragment & { clientsideKey: string })[];
  }) => React.ReactChild;
}

interface ILogsFilterProviderState {
  nodes: (RunPipelineRunEventFragment & { clientsideKey: string })[];
}

export class LogsProvider extends React.Component<
  ILogsFilterProviderProps,
  ILogsFilterProviderState
> {
  state: ILogsFilterProviderState = {
    nodes: []
  };

  _subscription: DirectGraphQLSubscription<PipelineRunLogsSubscription>;

  componentDidMount() {
    this.subscribeToRun();
  }

  componentDidUpdate(prevProps: ILogsFilterProviderProps) {
    if (prevProps.runId !== this.props.runId) {
      this.subscribeToRun();
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromRun();
  }

  subscribeToRun() {
    const { runId } = this.props;

    if (this._subscription) {
      this.unsubscribeFromRun();
      this.setState({ nodes: [] });
    }

    if (!runId) {
      return;
    }

    this._subscription = new DirectGraphQLSubscription<
      PipelineRunLogsSubscription
    >(
      PIPELINE_RUN_LOGS_SUBSCRIPTION,
      { runId: runId, after: null },
      this.onHandleMessages
    );
  }

  unsubscribeFromRun() {
    if (this._subscription) {
      this._subscription.close();
    }
  }

  onHandleMessages = (
    messages: PipelineRunLogsSubscription[],
    isFirstResponse: boolean
  ) => {
    // Note: if the socket says this is the first response, it may be becacuse the connection
    // was dropped and re-opened, so we reset our local state to an empty array.
    const nextNodes = isFirstResponse ? [] : [...this.state.nodes];

    let nextPipelineStatus: PipelineRunStatus | null = null;
    for (const msg of messages) {
      if (
        msg.pipelineRunLogs.__typename === "PipelineRunLogsSubscriptionFailure"
      ) {
        break;
      }

      // append the nodes to our local array and give each of them a unique key
      // so we can change the row indexes they're displayed at and still track their
      // sizes, etc.
      nextNodes.push(
        ...msg.pipelineRunLogs.messages.map((m, idx) =>
          Object.assign(m, { clientsideKey: `csk${nextNodes.length + idx}` })
        )
      );

      // look for changes to the pipeline's overall run status and sync that to apollo
      for (const { __typename } of msg.pipelineRunLogs.messages) {
        if (__typename === "PipelineProcessStartEvent") {
          nextPipelineStatus = PipelineRunStatus.STARTED;
        } else if (__typename === "PipelineSuccessEvent") {
          nextPipelineStatus = PipelineRunStatus.SUCCESS;
        } else if (
          __typename === "PipelineFailureEvent" ||
          __typename === "PipelineInitFailureEvent"
        ) {
          nextPipelineStatus = PipelineRunStatus.FAILURE;
        }
      }
    }

    if (nextPipelineStatus) {
      this.syncPipelineStatusToApolloCache(nextPipelineStatus);
    }
    this.setState({ nodes: nextNodes });
  };

  syncPipelineStatusToApolloCache(status: PipelineRunStatus) {
    const local = this.props.client.readFragment<
      PipelineRunLogsSubscriptionStatusFragment
    >({
      fragmentName: "PipelineRunLogsSubscriptionStatusFragment",
      fragment: PIPELINE_RUN_LOGS_SUBSCRIPTION_STATUS_FRAGMENT,
      id: `PipelineRun.${this.props.runId}`
    });

    if (local) {
      local.status = status;
      this.props.client.writeFragment({
        fragmentName: "PipelineRunLogsSubscriptionStatusFragment",
        fragment: PIPELINE_RUN_LOGS_SUBSCRIPTION_STATUS_FRAGMENT,
        id: `PipelineRun.${this.props.runId}`,
        data: local
      });
    }
  }

  render() {
    const { filter } = this.props;
    const { nodes } = this.state;

    const textLower = filter.text.toLowerCase();

    // step: sum_solid
    const textStep =
      textLower.startsWith("step:") && filter.text.substr(5).trim();

    // type: materialization or type: step start
    const textType =
      textLower.startsWith("type:") &&
      textLower.substr(5).replace(/[ _-]/g, "");

    const filteredNodes = nodes.filter(node => {
      const l = node.__typename === "LogMessageEvent" ? node.level : "EVENT";
      if (!filter.levels[l]) return false;
      if (filter.since && Number(node.timestamp) < filter.since) return false;

      if (textStep) {
        return node.step && node.step.key === textStep;
      } else if (textType) {
        return node.__typename.toLowerCase().includes(textType);
      } else if (textLower) {
        return node.message.toLowerCase().includes(textLower);
      }
      return true;
    });

    return this.props.children({ allNodes: nodes, filteredNodes });
  }
}

export const PIPELINE_RUN_LOGS_SUBSCRIPTION = gql`
  subscription PipelineRunLogsSubscription($runId: ID!, $after: Cursor) {
    pipelineRunLogs(runId: $runId, after: $after) {
      __typename
      ... on PipelineRunLogsSubscriptionSuccess {
        messages {
          ... on MessageEvent {
            runId
          }
          ...RunPipelineRunEventFragment
        }
        run {
          runId
          canCancel
        }
      }
      ... on PipelineRunLogsSubscriptionFailure {
        missingRunId
        message
      }
    }
  }

  ${Run.fragments.RunPipelineRunEventFragment}
`;

export const PIPELINE_RUN_LOGS_SUBSCRIPTION_STATUS_FRAGMENT = gql`
  fragment PipelineRunLogsSubscriptionStatusFragment on PipelineRun {
    runId
    status
  }
`;
