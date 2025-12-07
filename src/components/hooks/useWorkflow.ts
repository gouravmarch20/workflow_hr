// src/hooks/useWorkflow.ts
import { useCallback, useState } from "react";
import type { WorkflowNode, WorkflowEdge } from "../types/workflow";
import { v4 as uuid } from "uuid";

export function useWorkflow(initial?: {
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
}) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initial?.nodes || []);
  const [edges, setEdges] = useState<WorkflowEdge[]>(initial?.edges || []);

  const addNode = useCallback(
    (type: WorkflowNode["type"], position = { x: 0, y: 0 }) => {
      const id = uuid();
      const data = { title: `${type[0].toUpperCase() + type.slice(1)} node` };
      const node: WorkflowNode = { id, type, position, data } as any;
      setNodes((s) => [...s, node]);
      return node;
    },
    []
  );

  const updateNode = useCallback((id: string, patch: Partial<any>) => {
    setNodes((s) =>
      s.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))
    );
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((s) => s.filter((n) => n.id !== id));
    setEdges((s) => s.filter((e) => e.source !== id && e.target !== id));
  }, []);

  const addEdge = useCallback((source: string, target: string) => {
    const id = `e${source}-${target}`;
    setEdges((s) => {
      if (s.find((e) => e.source === source && e.target === target)) return s;
      return [...s, { id, source, target }];
    });
  }, []);

  const removeEdge = useCallback((id: string) => {
    setEdges((s) => s.filter((e) => e.id !== id));
  }, []);

  const serialize = useCallback(() => ({ nodes, edges }), [nodes, edges]);

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
