/**
 * API Client - Fetches blockchain data from FastAPI backend
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type Config = { contractAddress: string; rpcUrl: string };

export async function fetchConfig(): Promise<Config> {
  const res = await fetch(`${API_BASE_URL}/config`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function checkConnection(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    const data = await res.json();
    return data.blockchain_connected === true;
  } catch {
    return false;
  }
}

export async function fetchAlertsCount(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts/count`);
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.count;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "Failed to fetch" || msg.includes("fetch")) {
      throw new Error(`Cannot reach API at ${API_BASE_URL} - is the FastAPI server running? (cd api && uvicorn main:app --port 8000)`);
    }
    throw e;
  }
}

export async function logAttack(attackType: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attack_type: attackType }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.txHash;
}
