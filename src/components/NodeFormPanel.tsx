// src/components/NodeFormPanel.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Node } from "reactflow";
import type { NodeData } from "@/types/workflow"; // NodeData type from the shared types file
import { useAutomations, simulateWorkflow } from "@/hooks/useApi";

type Props = {
  nodeId: string | null;
  nodes: Node<NodeData>[];
  updateNode: (id: string, patch: Partial<NodeData>) => void;
  close: () => void;
  serialize: () => { nodes: Node<NodeData>[]; edges: any[] };
};

export default function NodeFormPanel({ nodeId, nodes, updateNode, close, serialize }: Props) {
  const node = useMemo(() => nodes.find((n) => n.id === nodeId), [nodes, nodeId]);
  const { actions, loading: actionsLoading } = useAutomations();

  // local editable copy of node.data
  const [local, setLocal] = useState<Partial<NodeData>>({});
  const [simLogs, setSimLogs] = useState<any[] | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setLocal(node?.data ? { ...node.data } : {});
  }, [node?.id]); // update when selection changes

  // guard rendering if no node selected
  if (!node) {
    return (
      <div className="w-80 p-4 border-l bg-white">
        <div className="text-sm text-gray-600">Select a node to edit</div>
      </div>
    );
  }

  // Save handler - always guard node presence
  function onSave() {
    if (!node) return;
    updateNode(node.id, local as Partial<NodeData>);
  }

  async function onSimulate() {
    setRunning(true);
    setSimLogs(null);
    try {
      const payload = serialize();
      const res = await simulateWorkflow(payload);
      setSimLogs(res.logs || []);
    } catch (err: any) {
      setSimLogs([{ error: err?.message || String(err) }]);
    } finally {
      setRunning(false);
    }
  }

  // Helper to update local state
  const setField = (k: keyof NodeData, v: any) => setLocal((s) => ({ ...(s || {}), [k]: v }));

  return (
    <div className="w-80 p-4 border-l bg-white h-full overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500">Editing</div>
          <div className="font-semibold">{node.data?.title ?? node.id}</div>
          <div className="text-xs text-gray-400">{node.type}</div>
        </div>
        <button onClick={close} className="text-sm text-gray-500">Close</button>
      </div>

      {/* Forms by node.type */}
      {node.type === "start" && (
        <>
          <label className="block text-xs text-gray-600">Title</label>
          <input className="w-full mb-2 p-2 border rounded" value={local.title ?? ""} onChange={(e) => setField("title", e.target.value)} />
          <label className="block text-xs text-gray-600">Metadata (json)</label>
          <textarea className="w-full mb-2 p-2 border rounded" value={JSON.stringify(local.meta ?? {}, null, 2)} onChange={(e) => {
            try {
              setField("meta", JSON.parse(e.target.value));
            } catch {
              // ignore parse errors in UI; user can fix
            }
          }} />
        </>
      )}

      {node.type === "task" && (
        <>
          <label className="block text-xs text-gray-600">Title *</label>
          <input className="w-full mb-2 p-2 border rounded" value={local.title ?? ""} onChange={(e) => setField("title", e.target.value)} />
          <label className="block text-xs text-gray-600">Description</label>
          <textarea className="w-full mb-2 p-2 border rounded" value={(local as any).description ?? ""} onChange={(e) => setField("description" as any, e.target.value)} />
          <label className="block text-xs text-gray-600">Assignee</label>
          <input className="w-full mb-2 p-2 border rounded" value={(local as any).assignee ?? ""} onChange={(e) => setField("assignee" as any, e.target.value)} />
          <label className="block text-xs text-gray-600">Due date</label>
          <input type="date" className="w-full mb-2 p-2 border rounded" value={(local as any).dueDate ?? ""} onChange={(e) => setField("dueDate" as any, e.target.value)} />
        </>
      )}

      {node.type === "approval" && (
        <>
          <label className="block text-xs text-gray-600">Title</label>
          <input className="w-full mb-2 p-2 border rounded" value={local.title ?? ""} onChange={(e) => setField("title", e.target.value)} />
          <label className="block text-xs text-gray-600">Approver role</label>
          <input className="w-full mb-2 p-2 border rounded" value={(local as any).approverRole ?? ""} onChange={(e) => setField("approverRole" as any, e.target.value)} />
          <label className="block text-xs text-gray-600">Auto-approve threshold</label>
          <input type="number" className="w-full mb-2 p-2 border rounded" value={(local as any).autoApproveThreshold ?? 0} onChange={(e) => setField("autoApproveThreshold" as any, Number(e.target.value))} />
        </>
      )}

      {node.type === "automated" && (
        <>
          <label className="block text-xs text-gray-600">Title</label>
          <input className="w-full mb-2 p-2 border rounded" value={local.title ?? ""} onChange={(e) => setField("title", e.target.value)} />

          <label className="block text-xs text-gray-600">Action</label>
          <select className="w-full mb-2 p-2 border rounded" value={(local as any).actionId ?? ""} onChange={(e) => setField("actionId" as any, e.target.value)}>
            <option value="">-- select action --</option>
            {actionsLoading ? <option>Loading…</option> : actions.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>

          {/* render action params dynamically */}
          {actions?.find((a) => a.id === (local as any).actionId)?.params?.map((p: string) => (
            <div key={p}>
              <label className="block text-xs text-gray-600">{p}</label>
              <input className="w-full mb-2 p-2 border rounded" value={(local as any).params?.[p] ?? ""} onChange={(e) => {
                setField("params" as any, { ...((local as any).params || {}), [p]: e.target.value });
              }} />
            </div>
          ))}
        </>
      )}

      {node.type === "end" && (
        <>
          <label className="block text-xs text-gray-600">End message</label>
          <input className="w-full mb-2 p-2 border rounded" value={(local as any).message ?? ""} onChange={(e) => setField("message" as any, e.target.value)} />
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={!!(local as any).summary} onChange={(e) => setField("summary" as any, e.target.checked)} />
            Summary flag
          </label>
        </>
      )}

      <div className="mt-4 flex gap-2">
        <button onClick={onSave} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        <button onClick={onSimulate} className="px-3 py-1 bg-emerald-600 text-white rounded" disabled={running}>{running ? "Running…" : "Simulate"}</button>
      </div>

      {/* Simulation logs */}
      <div className="mt-4">
        <div className="text-xs text-gray-500 mb-2">Simulation</div>
        {simLogs === null ? (<div className="text-sm text-gray-400">No runs yet</div>) : simLogs.length === 0 ? (<div className="text-sm text-gray-500">No logs</div>) : (
          <div className="space-y-2">
            {simLogs.map((l, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded border text-sm">
                <div className="font-medium">{l.type ?? l.nodeId ?? "step"}</div>
                <div className="text-xs text-gray-600">{l.message ?? JSON.stringify(l)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
