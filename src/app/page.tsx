"use client";

import React, { useCallback, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { Play, Download, Upload, Trash2 } from "lucide-react";
import { Canvas } from "@/components/Canvas";
import { SidebarPalette } from "@/components/SidebarPalette";
import { NodeFormPanel } from "@/components/NodeFormPanel";
import { SimulatorPanel } from "@/components/SimulatorPanel";
import { useWorkflow } from "@/hooks/useWorkflow";
import { useApi } from "@/hooks/useApi";


export default function HomePage() {
  const {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNode,
    deleteNode,
    selectNode,
    validateWorkflow,
    exportWorkflow,
    importWorkflow,
    clearWorkflow,
  } = useWorkflow();

  const { automations, simulateWorkflow } = useApi();
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { nodeType } = JSON.parse(data);
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      addNode(nodeType, position);
    },
    [addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      selectNode(node);
    },
    [selectNode]
  );

  const handleExport = () => {
    const workflow = exportWorkflow();
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportFileDefaultName = `workflow-${Date.now()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workflow = JSON.parse(event.target?.result as string);
            importWorkflow(workflow);
          } catch (error) {
            alert("Invalid workflow file");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSimulate = async () => {
    const errors = validateWorkflow();
    if (errors.length > 0) {
      return { errors };
    }

    const workflow = exportWorkflow();
    const result = await simulateWorkflow(workflow);
    return { result };
  };

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              HR Workflow Designer
            </h1>
            <p className="text-sm text-gray-500">
              Build and test internal HR workflows visually
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulatorOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <Play size={18} />
              Test Workflow
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Export Workflow"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Import Workflow"
            >
              <Upload size={18} />
            </button>
            <button
              onClick={clearWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Clear All"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <SidebarPalette />
          <Canvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
          <NodeFormPanel
            selectedNode={selectedNode}
            onUpdate={updateNode}
            onDelete={deleteNode}
            automations={automations}
          />
        </div>

        {/* Simulator Panel */}
        <SimulatorPanel
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          onSimulate={handleSimulate}
        />
      </div>
    </ReactFlowProvider>
  );
}
