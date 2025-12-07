import { NextRequest, NextResponse } from "next/server";
import { WorkflowDefinition } from "@/types/workflow";
import { WorkflowSimulator } from "@/lib/simulateEngine";

export async function POST(request: NextRequest) {
  try {
    const workflow: WorkflowDefinition = await request.json();

    // Validate workflow structure
    if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
      return NextResponse.json(
        { error: "Invalid workflow: nodes array is required" },
        { status: 400 }
      );
    }

    if (!workflow.edges || !Array.isArray(workflow.edges)) {
      return NextResponse.json(
        { error: "Invalid workflow: edges array is required" },
        { status: 400 }
      );
    }

    // Create simulator and run
    const simulator = new WorkflowSimulator(workflow);
    const result = await simulator.simulate();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json(
      {
        success: false,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        steps: [],
      },
      { status: 500 }
    );
  }
}
