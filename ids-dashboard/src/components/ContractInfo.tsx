"use client";

/**
 * ContractInfo Component
 * Fetches config from backend; falls back to local config when API is unavailable
 */

import { useState, useEffect } from "react";
import { fetchConfig } from "@/lib/api";
import { CONTRACT_ADDRESS, RPC_URL } from "@/config/contract";

const FALLBACK_CONFIG = { contractAddress: CONTRACT_ADDRESS, rpcUrl: RPC_URL };

export default function ContractInfo() {
  const [config, setConfig] = useState<{ contractAddress: string; rpcUrl: string } | null>(null);
  const [apiOffline, setApiOffline] = useState(false);

  useEffect(() => {
    fetchConfig()
      .then((c) => {
        setConfig(c);
        setApiOffline(false);
      })
      .catch(() => {
        setConfig(FALLBACK_CONFIG);
        setApiOffline(true);
      });
  }, []);

  if (!config) {
    return (
      <div className="rounded-lg border border-zinc-700/30 bg-zinc-900/50 px-4 py-3">
        <p className="text-xs text-zinc-500">Loading contract info...</p>
      </div>
    );
  }

  const truncatedAddress = `${config.contractAddress.slice(0, 10)}...${config.contractAddress.slice(-8)}`;

  return (
    <div className="rounded-lg border border-zinc-700/30 bg-zinc-900/50 px-4 py-3">
      <p className="mb-1 text-xs font-medium text-zinc-500">
        Contract Address
      </p>
      <code
        className="block truncate font-mono text-sm text-zinc-400"
        title={config.contractAddress}
      >
        {truncatedAddress}
      </code>
      <p className="mt-1 text-xs text-zinc-600">
        Ganache local network
        {apiOffline && " · API offline, using local config"}
      </p>
    </div>
  );
}
