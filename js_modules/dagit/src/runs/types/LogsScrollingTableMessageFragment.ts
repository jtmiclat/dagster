// @generated
/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LogLevel, ObjectStoreOperationType } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: LogsScrollingTableMessageFragment
// ====================================================

export interface LogsScrollingTableMessageFragment_ExecutionStepSkippedEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepSkippedEvent {
  __typename: "ExecutionStepSkippedEvent" | "ExecutionStepStartEvent" | "ExecutionStepSuccessEvent" | "LogMessageEvent" | "PipelineFailureEvent" | "PipelineProcessExitedEvent" | "PipelineStartEvent" | "PipelineSuccessEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_ExecutionStepSkippedEvent_step | null;
}

export interface LogsScrollingTableMessageFragment_PipelineProcessStartedEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_PipelineProcessStartedEvent {
  __typename: "PipelineProcessStartedEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_PipelineProcessStartedEvent_step | null;
}

export interface LogsScrollingTableMessageFragment_PipelineProcessStartEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_PipelineProcessStartEvent {
  __typename: "PipelineProcessStartEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_PipelineProcessStartEvent_step | null;
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries = LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventPathMetadataEntry | LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventJsonMetadataEntry | LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventUrlMetadataEntry | LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventTextMetadataEntry | LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries_EventMarkdownMetadataEntry;

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization {
  __typename: "Materialization";
  label: string;
  description: string | null;
  metadataEntries: LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization_metadataEntries[];
}

export interface LogsScrollingTableMessageFragment_StepMaterializationEvent {
  __typename: "StepMaterializationEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_StepMaterializationEvent_step | null;
  materialization: LogsScrollingTableMessageFragment_StepMaterializationEvent_materialization;
}

export interface LogsScrollingTableMessageFragment_PipelineInitFailureEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_PipelineInitFailureEvent_error {
  __typename: "PythonError";
  stack: string[];
  message: string;
}

export interface LogsScrollingTableMessageFragment_PipelineInitFailureEvent {
  __typename: "PipelineInitFailureEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_PipelineInitFailureEvent_step | null;
  error: LogsScrollingTableMessageFragment_PipelineInitFailureEvent_error;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepFailureEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepFailureEvent_error {
  __typename: "PythonError";
  stack: string[];
  message: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepFailureEvent {
  __typename: "ExecutionStepFailureEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_ExecutionStepFailureEvent_step | null;
  error: LogsScrollingTableMessageFragment_ExecutionStepFailureEvent_error;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries = LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventPathMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventTextMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry;

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck {
  __typename: "TypeCheck";
  label: string;
  description: string | null;
  success: boolean;
  metadataEntries: LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck_metadataEntries[];
}

export interface LogsScrollingTableMessageFragment_ExecutionStepInputEvent {
  __typename: "ExecutionStepInputEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_ExecutionStepInputEvent_step | null;
  inputName: string;
  typeCheck: LogsScrollingTableMessageFragment_ExecutionStepInputEvent_typeCheck;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries = LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventPathMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventJsonMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventUrlMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventTextMetadataEntry | LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries_EventMarkdownMetadataEntry;

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck {
  __typename: "TypeCheck";
  label: string;
  description: string | null;
  success: boolean;
  metadataEntries: LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck_metadataEntries[];
}

export interface LogsScrollingTableMessageFragment_ExecutionStepOutputEvent {
  __typename: "ExecutionStepOutputEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_step | null;
  outputName: string;
  typeCheck: LogsScrollingTableMessageFragment_ExecutionStepOutputEvent_typeCheck;
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries = LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventPathMetadataEntry | LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventJsonMetadataEntry | LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventUrlMetadataEntry | LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventTextMetadataEntry | LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries_EventMarkdownMetadataEntry;

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult {
  __typename: "ExpectationResult";
  success: boolean;
  label: string;
  description: string | null;
  metadataEntries: LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult_metadataEntries[];
}

export interface LogsScrollingTableMessageFragment_StepExpectationResultEvent {
  __typename: "StepExpectationResultEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_StepExpectationResultEvent_step | null;
  expectationResult: LogsScrollingTableMessageFragment_StepExpectationResultEvent_expectationResult;
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries = LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventPathMetadataEntry | LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventJsonMetadataEntry | LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventUrlMetadataEntry | LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventTextMetadataEntry | LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries_EventMarkdownMetadataEntry;

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult {
  __typename: "ObjectStoreOperationResult";
  op: ObjectStoreOperationType;
  metadataEntries: LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult_metadataEntries[];
}

export interface LogsScrollingTableMessageFragment_ObjectStoreOperationEvent {
  __typename: "ObjectStoreOperationEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_step | null;
  operationResult: LogsScrollingTableMessageFragment_ObjectStoreOperationEvent_operationResult;
}

export interface LogsScrollingTableMessageFragment_EngineEvent_step {
  __typename: "ExecutionStep";
  key: string;
}

export interface LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventPathMetadataEntry {
  __typename: "EventPathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventJsonMetadataEntry {
  __typename: "EventJsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventUrlMetadataEntry {
  __typename: "EventUrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventTextMetadataEntry {
  __typename: "EventTextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventMarkdownMetadataEntry {
  __typename: "EventMarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdString: string;
}

export type LogsScrollingTableMessageFragment_EngineEvent_metadataEntries = LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventPathMetadataEntry | LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventJsonMetadataEntry | LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventUrlMetadataEntry | LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventTextMetadataEntry | LogsScrollingTableMessageFragment_EngineEvent_metadataEntries_EventMarkdownMetadataEntry;

export interface LogsScrollingTableMessageFragment_EngineEvent {
  __typename: "EngineEvent";
  message: string;
  timestamp: string;
  level: LogLevel;
  step: LogsScrollingTableMessageFragment_EngineEvent_step | null;
  metadataEntries: LogsScrollingTableMessageFragment_EngineEvent_metadataEntries[];
}

export type LogsScrollingTableMessageFragment = LogsScrollingTableMessageFragment_ExecutionStepSkippedEvent | LogsScrollingTableMessageFragment_PipelineProcessStartedEvent | LogsScrollingTableMessageFragment_PipelineProcessStartEvent | LogsScrollingTableMessageFragment_StepMaterializationEvent | LogsScrollingTableMessageFragment_PipelineInitFailureEvent | LogsScrollingTableMessageFragment_ExecutionStepFailureEvent | LogsScrollingTableMessageFragment_ExecutionStepInputEvent | LogsScrollingTableMessageFragment_ExecutionStepOutputEvent | LogsScrollingTableMessageFragment_StepExpectationResultEvent | LogsScrollingTableMessageFragment_ObjectStoreOperationEvent | LogsScrollingTableMessageFragment_EngineEvent;
