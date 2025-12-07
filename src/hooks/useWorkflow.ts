import { useState, useCallback } from "react";
import { useNodesState, useEdgesState, addEdge, Connection } from "reactflow";
import {
  WorkflowNode,
  WorkflowDefinition,
  ValidationError,
} from "@/types/workflow";

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

export const useWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const id = getNodeId();
      const newNode: WorkflowNode = {
        id,
        type: type as any,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };
      setNodes((nds) => [...nds, newNode]);
      return newNode;
    },
    [setNodes]
  );

  const updateNode = useCallback(
    (nodeId: string, updates: Partial<any>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, ...updates },
            };
          }
          return node;
        })
      );

      // Update selected node if it's the one being updated
      setSelectedNode((current) => {
        if (current && current.id === nodeId) {
          return {
            ...current,
            data: { ...current.data, ...updates },
          };
        }
        return current;
      });
    },
    [setNodes]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      setSelectedNode(null);
    },
    [setNodes, setEdges]
  );

  const deleteEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  const selectNode = useCallback((node: WorkflowNode | null) => {
    setSelectedNode(node);
  }, []);

  const validateWorkflow = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Check if workflow has nodes
    if (nodes.length === 0) {
      errors.push({
        message: "Workflow is empty. Add at least one node.",
        type: "error",
      });
      return errors;
    }

    // Check for start node
    const startNodes = nodes.filter((n) => n.type === "start");
    if (startNodes.length === 0) {
      errors.push({
        message: "Workflow must have a Start node",
        type: "error",
      });
    } else if (startNodes.length > 1) {
      errors.push({
        message: "Workflow should have only one Start node",
        type: "warning",
      });
    }

    // Check for end node
    const endNodes = nodes.filter((n) => n.type === "end");
    if (endNodes.length === 0) {
      errors.push({
        message: "Workflow must have an End node",
        type: "error",
      });
    }

    // Check for disconnected nodes
    nodes.forEach((node) => {
      const hasIncoming = edges.some((e) => e.target === node.id);
      const hasOutgoing = edges.some((e) => e.source === node.id);

      if (node.type === "start" && !hasOutgoing) {
        errors.push({
          nodeId: node.id,
          message: `Start node "${node.data.label}" has no outgoing connections`,
          type: "error",
        });
      } else if (node.type === "end" && !hasIncoming) {
        errors.push({
          nodeId: node.id,
          message: `End node "${node.data.label}" has no incoming connections`,
          type: "error",
        });
      } else if (
        node.type !== "start" &&
        node.type !== "end" &&
        (!hasIncoming || !hasOutgoing)
      ) {
        errors.push({
          nodeId: node.id,
          message: `Node "${node.data.label}" is not properly connected`,
          type: "warning",
        });
      }
    });

    // Check for required fields
    nodes.forEach((node) => {
      if (!node.data.label || node.data.label.trim() === "") {
        errors.push({
          nodeId: node.id,
          message: `Node is missing a title`,
          type: "error",
        });
      }
    });

    return errors;
  }, [nodes, edges]);

  const exportWorkflow = useCallback((): WorkflowDefinition => {
    return {
      nodes: nodes as WorkflowNode[],
      edges,
    };
  }, [nodes, edges]);

  const importWorkflow = useCallback(
    (workflow: WorkflowDefinition) => {
      setNodes(workflow.nodes);
      setEdges(workflow.edges);
      setSelectedNode(null);
    },
    [setNodes, setEdges]
  );

  const clearWorkflow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  return {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNode,
    deleteNode,
    deleteEdge,
    selectNode,
    validateWorkflow,
    exportWorkflow,
    importWorkflow,
    clearWorkflow,
  };
};
