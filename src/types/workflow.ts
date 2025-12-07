import { Node, Edge } from "reactflow";

export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface MetadataItem {
  key: string;
  value: string;
}

export interface StartNodeData {
  label: string;
  metadata?: MetadataItem[];
}

export interface TaskNodeData {
  label: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: MetadataItem[];
}

export interface ApprovalNodeData {
  label: string;
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData {
  label: string;
  action?: string;
  actionParams?: Record<string, string>;
}

export interface EndNodeData {
  label: string;
  endMessage?: string;
  summaryFlag?: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

export interface WorkflowNode extends Node {
  type: NodeType;
  data: WorkflowNodeData;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: Edge[];
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  nodeLabel: string;
  status: "pending" | "completed" | "failed";
  message: string;
  timestamp: string;
}

export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  errors?: string[];
  duration?: number;
}

export interface ValidationError {
  nodeId?: string;
  message: string;
  type: "error" | "warning";
}
