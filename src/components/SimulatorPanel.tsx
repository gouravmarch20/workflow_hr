// src/components/SimulatorPanel.tsx
"use client";
import React, { useState } from "react";
import { simulateWorkflow } from "../hooks/useApi";

export default function SimulatorPanel({ payload }: { payload: any }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    const res = await simulateWorkflow(payload);
    setLogs(res.logs || [{ error: res.error }]);
    setLoading(false);
  }

  return (
    <div className="p-3 border-t bg-white">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={run}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Run Simulation
        </button>
      </div>
      <div className="space-y-2">
        {loading ? (
          <div>Running...</div>
        ) : (
          logs.map((l, i) => (
            <div key={i} className="p-2 bg-slate-50 rounded border">
              <div className="text-sm font-medium">
                {l.type} — {l.nodeId}
              </div>
              <div className="text-xs text-slate-600">{l.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
