// src/components/Canvas.tsx
"use client";

import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
} from "reactflow";

import "reactflow/dist/style.css";

import { useWorkflow } from "@/hooks/useWorkflow";

// Custom Nodes
import StartNode from "./nodes/StartNode";
import TaskNode from "./nodes/TaskNode";
import ApprovalNode from "./nodes/ApprovalNode";
import AutomatedNode from "./nodes/AutomatedNode";
import EndNode from "./nodes/EndNode";

// UI Panels
import SidebarPalette from "./SidebarPalette";
import NodeFormPanel from "./NodeFormPanel";

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export default function Canvas() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    addEdge,
    removeNode,
    removeEdge,
    updateNode,
    serialize,
  } = useWorkflow();

  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null
  );

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar Palette for Drag & Drop */}
        <SidebarPalette onDrop={(type, pos) => addNode(type, pos)} />

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
            /* Correct TS-safe handlers */
            onNodesChange={(changes) =>
              setNodes((nds) => applyNodeChanges(changes, nds))
            }
            onEdgesChange={(changes) =>
              setEdges((eds) => applyEdgeChanges(changes, eds))
            }
            onConnect={(params: Connection) =>
              params.source &&
              params.target &&
              addEdge(params.source, params.target)
            }
            /* Delete handlers */
            onNodesDelete={(deletedNodes) => {
              deletedNodes.forEach((n) => removeNode(n.id));
              setSelectedNodeId(null);
            }}
            onEdgesDelete={(deletedEdges) =>
              deletedEdges.forEach((e) => removeEdge(e.id))
            }
          >
            <Background gap={16} size={1} color="#ddd" />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Right-side config panel */}
        <NodeFormPanel
          nodeId={selectedNodeId}
          nodes={nodes}
          updateNode={updateNode}
          close={() => setSelectedNodeId(null)}
          serialize={serialize}
        />
      </div>
    </ReactFlowProvider>
  );
}
