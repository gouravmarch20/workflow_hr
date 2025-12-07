import React from "react";
import { Handle, Position } from "reactflow";

interface AutomatedNodeProps {
  data: {
    label: string;
    action?: string;
  };
  selected: boolean;
}

export const AutomatedNode: React.FC<AutomatedNodeProps> = ({
  data,
  selected,
}) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${
        selected ? "border-blue-500 shadow-lg" : "border-cyan-500"
      } bg-cyan-50 shadow-md min-w-[160px] transition-all`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-cyan-500"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">⚡</span>
        <div>
          <div className="font-semibold text-cyan-700 text-xs uppercase">
            Automated
          </div>
          <div className="text-sm text-gray-800 font-medium">{data.label}</div>
          {data.action && (
            <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <span>🔧</span>
              {data.action}
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-cyan-500"
      />
    </div>
  );
};
