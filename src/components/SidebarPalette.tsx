// src/components/SidebarPalette.tsx
"use client";
import React from "react";

import type { NodeType } from "@/types/workflow";
export default function SidebarPalette({
  onDrop,
}: {
  onDrop: (type: NodeType, pos?: { x: number; y: number }) => void;
}) {
  const items: { type: NodeType; label: string }[] = [
    { type: "start", label: "Start" },
    { type: "task", label: "Task" },
    { type: "approval", label: "Approval" },
    { type: "automated", label: "Automated" },
    { type: "end", label: "End" },
  ];
  return (
    <div className="w-48 bg-slate-50 p-3 border-r">
      <h4 className="text-sm font-semibold mb-2">Palette</h4>
      <div className="space-y-2">
        {items.map((it) => (
          <button
            key={it.type}
            className="w-full bg-white p-2 rounded shadow-sm text-left"
            onClick={() => onDrop(it.type, { x: 100, y: 100 })}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
