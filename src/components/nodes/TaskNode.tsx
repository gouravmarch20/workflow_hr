// src/components/nodes/TaskNode.tsx
import React from "react";
export default function TaskNode({ data }: any) {
  return (
    <div className="p-3 bg-white rounded shadow-sm border">
      <div className="text-xs text-slate-500">Task</div>
      <div className="font-medium">{data?.title || "Task"}</div>
      {data?.assignee && (
        <div className="text-xs text-slate-400">Assignee: {data.assignee}</div>
      )}
    </div>
  );
}
