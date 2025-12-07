// src/app/page.tsx
import dynamic from "next/dynamic";
import Canvas from "../components/Canvas";

export default function Page() {
  return (
    <main className="h-screen">
      <Canvas />
    </main>
  );
}
