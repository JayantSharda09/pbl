"use client";

/**
 * AlertsCard Component
 * Displays total alerts count and last refresh timestamp
 */

type AlertsCardProps = {
  totalAlerts: number | null;
  lastRefresh: Date | null;
  isLoading: boolean;
};

export default function AlertsCard({
  totalAlerts,
  lastRefresh,
  isLoading,
}: AlertsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Total Alerts
        </h2>
        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
          On-Chain
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3 py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-400" />
          <span className="text-zinc-500">Fetching from blockchain...</span>
        </div>
      ) : (
        <>
          {totalAlerts !== null && totalAlerts > 5 && (
            <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
              <p className="font-semibold text-red-400">
                ⚠ INTRUSION DETECTED
              </p>
              <p className="mt-1 text-sm text-red-300/80">
                More than 5 attacks logged (Total: {totalAlerts})
              </p>
            </div>
          )}
          <p className="text-4xl font-bold tabular-nums text-zinc-100">
            {totalAlerts !== null ? totalAlerts.toLocaleString() : "—"}
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Last refresh:{" "}
            {lastRefresh
              ? lastRefresh.toLocaleTimeString()
              : "Never"}
          </p>
        </>
      )}
    </div>
  );
}
