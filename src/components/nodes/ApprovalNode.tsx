import React from "react";
import { Handle, Position } from "reactflow";

interface ApprovalNodeProps {
  data: {
    label: string;
    approverRole?: string;
  };
  selected: boolean;
}

export const ApprovalNode: React.FC<ApprovalNodeProps> = ({
  data,
  selected,
}) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${
        selected ? "border-blue-500 shadow-lg" : "border-orange-500"
      } bg-orange-50 shadow-md min-w-[160px] transition-all`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-orange-500"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">✓</span>
        <div>
          <div className="font-semibold text-orange-700 text-xs uppercase">
            Approval
          </div>
          <div className="text-sm text-gray-800 font-medium">{data.label}</div>
          {data.approverRole && (
            <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <span>👔</span>
              {data.approverRole}
            </div>
          )}
        </div>
      </div>
      {/* <div className="relative "> */}
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-orange-500"
        />
        {/* <button className="absolute right-4">dddfsaadfs</button> */}
      {/* </div> */}
    </div>
  );
};
