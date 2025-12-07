import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { nodes, edges } = req.body;

  if (!nodes || !edges) {
    return res.status(400).json({ error: "Missing workflow" });
  }

  const logs = nodes.map((node: any) => ({
    nodeId: node.id,
    type: node.type,
    message: `Executed ${node.type} step`,
  }));

  res.status(200).json({ ok: true, logs });
}
