import React from "react";
import { Card } from "./common/Card";

interface NodeTemplate {
  type: string;
  label: string;
  color: string;
  icon: string;
  description: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    type: "start",
    label: "Start",
    color: "bg-green-100 border-green-400 hover:bg-green-200",
    icon: "▶",
    description: "Workflow entry point",
  },
  {
    type: "task",
    label: "Task",
    color: "bg-purple-100 border-purple-400 hover:bg-purple-200",
    icon: "📋",
    description: "Human task assignment",
  },
  {
    type: "approval",
    label: "Approval",
    color: "bg-orange-100 border-orange-400 hover:bg-orange-200",
    icon: "✓",
    description: "Manager/HR approval",
  },
  {
    type: "automated",
    label: "Automated",
    color: "bg-cyan-100 border-cyan-400 hover:bg-cyan-200",
    icon: "⚡",
    description: "System action",
  },
  {
    type: "end",
    label: "End",
    color: "bg-red-100 border-red-400 hover:bg-red-200",
    icon: "■",
    description: "Workflow completion",
  },
];

export const SidebarPalette: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    label: string
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType, label })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Node Palette</h3>

      <div className="space-y-3">
        {nodeTemplates.map((node) => (
          <Card key={node.type} className="p-0 overflow-hidden">
            <div
              className={`${node.color} border-2 p-3 cursor-move transition-all`}
              draggable
              onDragStart={(e) => onDragStart(e, node.type, node.label)}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{node.icon}</span>
                <span className="font-semibold text-sm">{node.label}</span>
              </div>
              <p className="text-xs text-gray-600">{node.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-4">
        <div className="flex items-start gap-2">
          <span className="text-blue-500 text-lg">💡</span>
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-1">
              Quick Start
            </h4>
            <p className="text-xs text-gray-600">
              Drag nodes onto the canvas, connect them, and click to edit
              properties.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
