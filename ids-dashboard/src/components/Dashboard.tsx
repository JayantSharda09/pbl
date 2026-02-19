"use client";

/**
 * Dashboard Component
 * Main container - orchestrates Web3 connection, data fetching, and UI
 */

import { useState, useEffect, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  checkConnection,
  fetchAlertsCount as apiFetchAlertsCount,
  logAttack as apiLogAttack,
} from "@/lib/api";
import Header from "./Header";
import ConnectionStatus from "./ConnectionStatus";
import AlertsCard from "./AlertsCard";
import SimulateAttackButton from "./SimulateAttackButton";
import ContractInfo from "./ContractInfo";

const REFRESH_INTERVAL_MS = 5000; // Auto-refresh every 5 seconds

export default function Dashboard() {
  const [totalAlerts, setTotalAlerts] = useState<number | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionLoading, setConnectionLoading] = useState(true);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [attackLoading, setAttackLoading] = useState(false);

  /** Fetch alert count from FastAPI (reads from blockchain) */
  const fetchAlertsCount = useCallback(async () => {
    try {
      const count = await apiFetchAlertsCount();
      setTotalAlerts(count);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      setTotalAlerts(null);
    } finally {
      setAlertsLoading(false);
    }
  }, []);

  /** Check blockchain connection status */
  const checkConn = useCallback(async () => {
    setConnectionLoading(true);
    const connected = await checkConnection();
    setIsConnected(connected);
    setConnectionLoading(false);
  }, []);

  /** Simulate attack - POST to FastAPI (writes to blockchain) */
  const handleSimulateAttack = useCallback(async () => {
    setAttackLoading(true);
    try {
      await apiLogAttack("Manual Attack");
      toast.success("Attack logged on blockchain!");
      await fetchAlertsCount(); // Refresh count after successful tx
    } catch (err) {
      console.error("Failed to log attack:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to log attack"
      );
    } finally {
      setAttackLoading(false);
    }
  }, [fetchAlertsCount]);

  // Initial connection check
  useEffect(() => {
    checkConn();
  }, [checkConn]);

  // Initial fetch + auto-refresh every 5 seconds (DEBUG: bypassing isConnected check)
  useEffect(() => {
    // if (!isConnected) return;  // DEBUG: commented for debugging
    fetchAlertsCount();
    const interval = setInterval(fetchAlertsCount, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAlertsCount]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-zinc-800 text-zinc-100 border border-zinc-700",
        }}
      />

      <Header />

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Status bar */}
        {/* DEBUG: ConnectionStatus commented out for debugging */}
        {/* <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <ConnectionStatus
            isConnected={isConnected}
            isLoading={connectionLoading}
          />
        </div> */}

        {/* Main content - centered */}
        <div className="flex flex-col items-center gap-8">
          {/* Alerts card */}
          <AlertsCard
            totalAlerts={totalAlerts}
            lastRefresh={lastRefresh}
            isLoading={alertsLoading}
          />

          {/* Simulate attack button */}
          <SimulateAttackButton
            onClick={handleSimulateAttack}
            disabled={attackLoading}
            isLoading={attackLoading}
          />

          {/* Contract info - subtle */}
          <div className="mt-4 w-full max-w-md">
            <ContractInfo />
          </div>
        </div>
      </main>
    </div>
  );
}
