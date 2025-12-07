import React from "react";
import { Handle, Position } from "reactflow";

interface StartNodeProps {
  data: {
    label: string;
  };
  selected: boolean;
}

export const StartNode: React.FC<StartNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${
        selected ? "border-blue-500 shadow-lg" : "border-green-500"
      } bg-green-50 shadow-md min-w-[140px] transition-all`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">▶</span>
        <div>
          <div className="font-semibold text-green-700 text-xs uppercase">
            Start
          </div>
          <div className="text-sm text-gray-800 font-medium">{data.label}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500"
      />
    </div>
  );
};
