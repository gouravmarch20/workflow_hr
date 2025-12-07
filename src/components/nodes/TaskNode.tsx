import React from "react";
import { Handle, Position } from "reactflow";

interface TaskNodeProps {
  data: {
    label: string;
    assignee?: string;
  };
  selected: boolean;
}

export const TaskNode: React.FC<TaskNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${
        selected ? "border-blue-500 shadow-lg" : "border-purple-500"
      } bg-purple-50 shadow-md min-w-[160px] transition-all`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">📋</span>
        <div>
          <div className="font-semibold text-purple-700 text-xs uppercase">
            Task
          </div>
          <div className="text-sm text-gray-800 font-medium">{data.label}</div>
          {data.assignee && (
            <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <span>👤</span>
              {data.assignee}
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500"
      />
    </div>
  );
};
