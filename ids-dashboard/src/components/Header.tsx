"use client";

/**
 * Header Component
 * Displays the main dashboard title with cybersecurity-themed styling
 */

export default function Header() {
  return (
    <header className="w-full border-b border-emerald-500/20 bg-zinc-900/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">
              Blockchain IDS Dashboard
            </h1>
            <p className="text-xs text-zinc-500">
              Intrusion Detection • On-Chain Alerts
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
