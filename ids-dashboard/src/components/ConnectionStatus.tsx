"use client";

/**
 * ConnectionStatus Component
 * Live indicator for blockchain connection state (Connected / Disconnected)
 */

type ConnectionStatusProps = {
  isConnected: boolean;
  isLoading?: boolean;
};

export default function ConnectionStatus({
  isConnected,
  isLoading = false,
}: ConnectionStatusProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-zinc-600/50 bg-zinc-800/50 px-3 py-1.5">
        <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        <span className="text-xs font-medium text-zinc-400">Checking...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        isConnected
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-red-500/30 bg-red-500/10"
      }`}
    >
      <div
        className={`h-2 w-2 rounded-full ${
          isConnected ? "bg-emerald-400" : "bg-red-400"
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isConnected ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isConnected ? "Connected to Ganache" : "Disconnected"}
      </span>
    </div>
  );
}
