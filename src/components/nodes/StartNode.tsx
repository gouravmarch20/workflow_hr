// src/components/nodes/StartNode.tsx
import React from "react";
export default function StartNode({ data }: any) {
  return (
    <div className="p-3 bg-white rounded shadow-sm border">
      <div className="text-xs text-slate-500">Start</div>
      <div className="font-medium">{data?.title || "Start"}</div>
    </div>
  );
}
