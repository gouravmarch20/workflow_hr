import {
  WorkflowDefinition,
  SimulationResult,
  SimulationStep,
  WorkflowNode,
} from "@/types/workflow";

export class WorkflowSimulator {
  private workflow: WorkflowDefinition;

  constructor(workflow: WorkflowDefinition) {
    this.workflow = workflow;
  }

  async simulate(): Promise<SimulationResult> {
    const startTime = Date.now();
    const steps: SimulationStep[] = [];

    try {
      // Find start node
      const startNode = this.workflow.nodes.find((n) => n.type === "start");
      if (!startNode) {
        throw new Error("No start node found");
      }

      // Execute workflow
      await this.executeNode(startNode, steps, new Set());

      const endTime = Date.now();

      return {
        success: true,
        steps,
        duration: endTime - startTime,
      };
    } catch (error) {
      return {
        success: false,
        steps,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      };
    }
  }

  private async executeNode(
    node: WorkflowNode,
    steps: SimulationStep[],
    visited: Set<string>
  ): Promise<void> {
    if (visited.has(node.id)) {
      throw new Error(`Cycle detected at node: ${node.data.label}`);
    }
    visited.add(node.id);

    // Create step
    const step: SimulationStep = {
      nodeId: node.id,
      nodeType: node.type as any,
      nodeLabel: node.data.label,
      status: "pending",
      message: this.getNodeMessage(node),
      timestamp: new Date().toISOString(),
    };

    steps.push(step);

    // Simulate processing delay
    await this.delay(300 + Math.random() * 500);

    // Mark as completed
    step.status = "completed";

    // If this is an end node, stop
    if (node.type === "end") {
      return;
    }

    // Find next nodes
    const outgoingEdges = this.workflow.edges.filter(
      (e) => e.source === node.id
    );

    if (outgoingEdges.length === 0) {
      throw new Error(`Node "${node.data.label}" has no outgoing connections`);
    }

    for (const edge of outgoingEdges) {
      const nextNode = this.workflow.nodes.find((n) => n.id === edge.target);
      if (nextNode) {
        await this.executeNode(nextNode, steps, new Set(visited));
      }
    }
  }

  private getNodeMessage(node: WorkflowNode): string {
    switch (node.type) {
      case "start":
        return `Workflow started: ${node.data.label}`;
      case "task":
        const taskData = node.data as any;
        return taskData.assignee
          ? `Task assigned to ${taskData.assignee}`
          : "Task created and waiting for assignment";
      case "approval":
        const approvalData = node.data as any;
        return approvalData.approverRole
          ? `Approval requested from ${approvalData.approverRole}`
          : "Approval requested";
      case "automated":
        const autoData = node.data as any;
        return autoData.action
          ? `Executing automated action: ${autoData.action}`
          : "Automated action triggered";
      case "end":
        const endData = node.data as any;
        return endData.endMessage || "Workflow completed successfully";
      default:
        return "Processing...";
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
