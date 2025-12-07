// src/components/nodes/EndNode.tsx
import React from "react";
export default function EndNode({ data }: any) {
  return (
    <div className="p-3 bg-white rounded shadow-sm border">
      <div className="text-xs text-slate-500">End</div>
      <div className="font-medium">{data?.message || "End"}</div>
    </div>
  );
}
