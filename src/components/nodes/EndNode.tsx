import React from "react";
import { Handle, Position } from "reactflow";

interface EndNodeProps {
  data: {
    label: string;
  };
  selected: boolean;
}

export const EndNode: React.FC<EndNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${
        selected ? "border-blue-500 shadow-lg" : "border-red-500"
      } bg-red-50 shadow-md min-w-[140px] transition-all`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-red-500"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">■</span>
        <div>
          <div className="font-semibold text-red-700 text-xs uppercase">
            End
          </div>
          <div className="text-sm text-gray-800 font-medium">{data.label}</div>
        </div>
      </div>
    </div>
  );
};
