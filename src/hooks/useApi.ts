// src/hooks/useApi.ts
import * as React from "react";

export async function fetcher(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`API ${url} failed: ${res.status}`);
  return res.json();
}

export function useAutomations() {
  // lightweight client-side fetch (no swr required)
  const [actions, setActions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    let mounted = true;
    fetcher("/api/automations")
      .then((d) => {
        if (mounted) setActions(d);
      })
      .catch(() => setActions([]))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return { actions, loading };
}

export async function simulateWorkflow(payload: any) {
  return fetcher("/api/simulate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}
