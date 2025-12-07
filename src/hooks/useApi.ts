import { useState, useEffect } from "react";
import {
  AutomationAction,
  WorkflowDefinition,
  SimulationResult,
} from "@/types/workflow";

export const useApi = () => {
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/automations");
      if (!response.ok) throw new Error("Failed to fetch automations");
      const data = await response.json();
      setAutomations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const simulateWorkflow = async (
    workflow: WorkflowDefinition
  ): Promise<SimulationResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflow),
      });
      if (!response.ok) throw new Error("Simulation failed");
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    automations,
    loading,
    error,
    fetchAutomations,
    simulateWorkflow,
  };
};
