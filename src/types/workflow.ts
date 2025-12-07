// src/types/workflow.ts
import { Node as RFNode, Edge as RFEdge } from "reactflow";

export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface BaseData {
  title?: string;
  meta?: Record<string, string>;
}

export interface StartData extends BaseData {
  title: string;
  meta?: Record<string, string>;
}

export interface TaskData extends BaseData {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  custom?: Record<string, string>;
}

export interface ApprovalData extends BaseData {
  title: string;
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedData extends BaseData {
  title: string;
  actionId?: string;
  params?: Record<string, string>;
}

export interface EndData extends BaseData {
  message?: string;
  summary?: boolean;
}

export type NodeData =
  | StartData
  | TaskData
  | ApprovalData
  | AutomatedData
  | EndData;

export type WorkflowNode = RFNode<NodeData> & { type: NodeType };
export type WorkflowEdge = RFEdge;

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}
