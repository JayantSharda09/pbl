"use client";

/**
 * SimulateAttackButton Component
 * Primary action - calls logAttack("Manual Attack") on the smart contract
 */

type SimulateAttackButtonProps = {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
};

export default function SimulateAttackButton({
  onClick,
  disabled,
  isLoading,
}: SimulateAttackButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-emerald-500/20"
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>Logging Attack...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Simulate Attack</span>
        </>
      )}
    </button>
  );
}
