import type { WorkflowNode, WorkflowEdge } from "@/types/workflow";

export function simulateWorkflowEngine(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
) {
  let current = nodes.find((n) => n.type === "start");
  const resultLog: string[] = [];

  while (current) {
    resultLog.push(`Executing ${current.data.title} (${current.type})`);

    switch (current.type) {
      case "task":
        resultLog.push(`Task by ${current.data.assignee || "Unknown"}`);
        break;
      case "approval":
        resultLog.push(
          `Approval needed by ${current.data.approverRole || "Manager"}`
        );
        break;
      case "automated":
        resultLog.push(`Automated action: ${current.data.actionId || "none"}`);
        break;
      case "end":
        resultLog.push("Workflow Completed ✅");
        return resultLog;
    }

    const nextEdge = edges.find((e) => e.source === current.id);
    if (!nextEdge) break;
    current = nodes.find((n) => n.id === nextEdge.target);
  }

  return resultLog;
}
