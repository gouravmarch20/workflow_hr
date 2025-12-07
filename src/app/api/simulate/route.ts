// src/app/api/simulate/route.ts
import { NextResponse } from "next/server";

type Payload = { nodes: any[]; edges: any[] };

export async function POST(req: Request) {
  const body = (await req.json()) as Payload;
  const { nodes = [], edges = [] } = body;

  // simple validations
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }

  // find start node
  const start = nodes.find((n) => n.type === "start");
  if (!start)
    return NextResponse.json(
      { ok: false, error: "Start node missing" },
      { status: 400 }
    );

  // detect cycle (basic)
  const adj = new Map<string, string[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.source)?.push(e.target);
  });

  const visited = new Set<string>();
  const rec = new Set<string>();
  const hasCycle = (id: string): boolean => {
    if (rec.has(id)) return true;
    if (visited.has(id)) return false;
    visited.add(id);
    rec.add(id);
    for (const nb of adj.get(id) || []) if (hasCycle(nb)) return true;
    rec.delete(id);
    return false;
  };
  for (const n of nodes)
    if (!visited.has(n.id) && hasCycle(n.id)) {
      return NextResponse.json(
        { ok: false, error: "Cycle detected" },
        { status: 400 }
      );
    }

  // BFS simulation from start
  const logs: { nodeId: string; type: string; message: string }[] = [];
  const queue = [start.id];
  const seen = new Set(queue);
  while (queue.length) {
    const id = queue.shift()!;
    const node = nodes.find((n) => n.id === id);
    logs.push({
      nodeId: id,
      type: node.type,
      message: `Executed ${node.type} - ${node.data?.title || id}`,
    });
    for (const nb of adj.get(id) || []) {
      if (!seen.has(nb)) {
        seen.add(nb);
        queue.push(nb);
      }
    }
  }

  return NextResponse.json({ ok: true, logs });
}
