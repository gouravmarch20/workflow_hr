// src/components/nodes/AutomatedNode.tsx
import React from "react";
export default function AutomatedNode({ data }: any) {
  return (
    <div className="p-3 bg-white rounded shadow-sm border">
      <div className="text-xs text-slate-500">Automated</div>
      <div className="font-medium">{data?.title || "Automated"}</div>
      <div className="text-xs text-slate-400">{data?.actionId || ""}</div>
    </div>
  );
}
