import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Node, Edge, XYPosition } from "reactflow";

export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export type NodeData = {
  title: string;
  config?: any;
};

export function useWorkflow(initial?: {
  nodes?: Node<NodeData>[];
  edges?: Edge[];
}) {
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initial?.nodes || []);
  const [edges, setEdges] = useState<Edge[]>(initial?.edges || []);

  /* -------------------------
    ADD NODE (ReactFlow compatible)
  -------------------------- */
  const addNode = useCallback(
    (type: NodeType, position: XYPosition = { x: 0, y: 0 }) => {
      const id = uuid();

      const newNode: Node<NodeData> = {
        id,
        type,
        position,
        data: {
          title: `${type[0].toUpperCase() + type.slice(1)} node`,
          config: {},
        },
      };

      setNodes((prev) => [...prev, newNode]);
      return newNode;
    },
    []
  );

  /* -------------------------
    UPDATE NODE DATA
  -------------------------- */
  const updateNode = useCallback((id: string, patch: Partial<NodeData>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
      )
    );
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
  }, []);

  const addEdge = useCallback((source: string, target: string) => {
    const id = `e${source}-${target}`;

    setEdges((prev) => {
      if (prev.some((e) => e.source === source && e.target === target)) {
        return prev;
      }

      const edge: Edge = { id, source, target };
      return [...prev, edge];
    });
  }, []);

  const removeEdge = useCallback((id: string) => {
    setEdges((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const serialize = useCallback(
    () => ({
      nodes,
      edges,
    }),
    [nodes, edges]
  );

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    addEdge,
    updateNode,
    removeNode,
    removeEdge,
    serialize,
  };
}
