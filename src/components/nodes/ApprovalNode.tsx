// src/components/nodes/ApprovalNode.tsx
import React from "react";
export default function ApprovalNode({ data }: any) {
  return (
    <div className="p-3 bg-white rounded shadow-sm border">
      <div className="text-xs text-slate-500">Approval</div>
      <div className="font-medium">{data?.title || "Approval"}</div>
      <div className="text-xs text-slate-400">
        {data?.approverRole || "Role: ..."}
      </div>
    </div>
  );
}
