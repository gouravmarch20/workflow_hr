// src/hooks/useApi.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useAutomations() {
  const { data, error } = useSWR("/api/automations", fetcher);
  return { actions: data || [], loading: !error && !data, error };
}

export async function simulateWorkflow(payload: any) {
  const res = await fetch("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
