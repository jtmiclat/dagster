// @generated
/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LogLevel, ObjectStoreOperationType } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: RunPipelineRunEventFragment
// ====================================================

export interface RunPipelineRunEventFragment_ExecutionStepSkippedEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepSkippedEvent {
  __typename: "ExecutionStepSkippedEvent" | "ExecutionStepStartEvent" | "ExecutionStepSuccessEvent" | "LogMessageEvent" | "PipelineFailureEvent" | "PipelineProcessExitedEvent" | "PipelineStartEvent" | "PipelineSuccessEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_ExecutionStepSkippedEvent_step | null;
}

export interface RunPipelineRunEventFragment_ExecutionStepFailureEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepFailureEvent_error {
  __typename: "PythonError";
  message: string;
  stack: string[];
}

export interface RunPipelineRunEventFragment_ExecutionStepFailureEvent {
  __typename: "ExecutionStepFailureEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_ExecutionStepFailureEvent_step | null;
  error: RunPipelineRunEventFragment_ExecutionStepFailureEvent_error;
}

export interface RunPipelineRunEventFragment_PipelineProcessStartedEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_PipelineProcessStartedEvent {
  __typename: "PipelineProcessStartedEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_PipelineProcessStartedEvent_step | null;
  processId: number;
}

export interface RunPipelineRunEventFragment_PipelineProcessStartEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_PipelineProcessStartEvent {
  __typename: "PipelineProcessStartEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_PipelineProcessStartEvent_step | null;
  pipelineName: string;
  runId: string;
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries = RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventPathMetadataEntry | RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventJsonMetadataEntry | RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventUrlMetadataEntry | RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventTextMetadataEntry | RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries_EventMarkdownMetadataEntry;

export interface RunPipelineRunEventFragment_StepMaterializationEvent_materialization {
  __typename: "Materialization";
  label: string;
  description: string | null;
  metadataEntries: RunPipelineRunEventFragment_StepMaterializationEvent_materialization_metadataEntries[];
}

export interface RunPipelineRunEventFragment_StepMaterializationEvent {
  __typename: "StepMaterializationEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_StepMaterializationEvent_step | null;
  materialization: RunPipelineRunEventFragment_StepMaterializationEvent_materialization;
}

export interface RunPipelineRunEventFragment_PipelineInitFailureEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_PipelineInitFailureEvent_error {
  __typename: "PythonError";
  stack: string[];
  message: string;
}

export interface RunPipelineRunEventFragment_PipelineInitFailureEvent {
  __typename: "PipelineInitFailureEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_PipelineInitFailureEvent_step | null;
  error: RunPipelineRunEventFragment_PipelineInitFailureEvent_error;
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries = RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventPathMetadataEntry | RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry | RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry | RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventTextMetadataEntry | RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry;

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck {
  __typename: "TypeCheck";
  label: string;
  description: string | null;
  success: boolean;
  metadataEntries: RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck_metadataEntries[];
}

export interface RunPipelineRunEventFragment_ExecutionStepInputEvent {
  __typename: "ExecutionStepInputEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_ExecutionStepInputEvent_step | null;
  inputName: string;
  typeCheck: RunPipelineRunEventFragment_ExecutionStepInputEvent_typeCheck;
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries = RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventPathMetadataEntry | RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry | RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry | RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventTextMetadataEntry | RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry;

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck {
  __typename: "TypeCheck";
  label: string;
  description: string | null;
  success: boolean;
  metadataEntries: RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries[];
}

export interface RunPipelineRunEventFragment_ExecutionStepOutputEvent {
  __typename: "ExecutionStepOutputEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_ExecutionStepOutputEvent_step | null;
  outputName: string;
  typeCheck: RunPipelineRunEventFragment_ExecutionStepOutputEvent_typeCheck;
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries = RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventPathMetadataEntry | RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventJsonMetadataEntry | RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventUrlMetadataEntry | RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventTextMetadataEntry | RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventMarkdownMetadataEntry;

export interface RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult {
  __typename: "ExpectationResult";
  success: boolean;
  label: string;
  description: string | null;
  metadataEntries: RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult_metadataEntries[];
}

export interface RunPipelineRunEventFragment_StepExpectationResultEvent {
  __typename: "StepExpectationResultEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_StepExpectationResultEvent_step | null;
  expectationResult: RunPipelineRunEventFragment_StepExpectationResultEvent_expectationResult;
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries = RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventPathMetadataEntry | RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventJsonMetadataEntry | RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventUrlMetadataEntry | RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventTextMetadataEntry | RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventMarkdownMetadataEntry;

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult {
  __typename: "ObjectStoreOperationResult";
  op: ObjectStoreOperationType;
  metadataEntries: RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult_metadataEntries[];
}

export interface RunPipelineRunEventFragment_ObjectStoreOperationEvent {
  __typename: "ObjectStoreOperationEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_ObjectStoreOperationEvent_step | null;
  operationResult: RunPipelineRunEventFragment_ObjectStoreOperationEvent_operationResult;
}

export interface RunPipelineRunEventFragment_EngineEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type RunPipelineRunEventFragment_EngineEvent_metadataEntries = RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventPathMetadataEntry | RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventJsonMetadataEntry | RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventUrlMetadataEntry | RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventTextMetadataEntry | RunPipelineRunEventFragment_EngineEvent_metadataEntries_EventMarkdownMetadataEntry;

export interface RunPipelineRunEventFragment_EngineEvent {
  __typename: "EngineEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: RunPipelineRunEventFragment_EngineEvent_step | null;
  metadataEntries: RunPipelineRunEventFragment_EngineEvent_metadataEntries[];
}

export type RunPipelineRunEventFragment = RunPipelineRunEventFragment_ExecutionStepSkippedEvent | RunPipelineRunEventFragment_ExecutionStepFailureEvent | RunPipelineRunEventFragment_PipelineProcessStartedEvent | RunPipelineRunEventFragment_PipelineProcessStartEvent | RunPipelineRunEventFragment_StepMaterializationEvent | RunPipelineRunEventFragment_PipelineInitFailureEvent | RunPipelineRunEventFragment_ExecutionStepInputEvent | RunPipelineRunEventFragment_ExecutionStepOutputEvent | RunPipelineRunEventFragment_StepExpectationResultEvent | RunPipelineRunEventFragment_ObjectStoreOperationEvent | RunPipelineRunEventFragment_EngineEvent;
