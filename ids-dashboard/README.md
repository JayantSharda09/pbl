# Blockchain IDS Dashboard

A modern frontend dashboard for a Blockchain-based Intrusion Detection System (IDS). Displays on-chain alerts from an Ethereum-compatible smart contract (Ganache local network).

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Ethers.js** (blockchain interaction)

## Prerequisites

1. **Ganache** running locally on `http://127.0.0.1:7545`
2. Smart contract deployed at: `0xd8E4A68c949dc70cA4a8d7b0E12A9413F03E935e`

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Total Alerts** – Display count from `getAlertsCount()` on the contract
- **Simulate Attack** – Button to call `logAttack("Manual Attack")`
- **Connection Status** – Live indicator (Connected / Disconnected)
- **Contract Address** – Info panel with deployed contract address
- **Auto-refresh** – Alert count refreshes every 5 seconds
- **Toast Notifications** – Success/error feedback after logging attacks

## Project Structure

```
ids-dashboard/
├── app/
│   ├── layout.tsx      # Root layout (dark mode)
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── src/
│   ├── components/     # UI components
│   │   ├── Header.tsx
│   │   ├── ConnectionStatus.tsx
│   │   ├── AlertsCard.tsx
│   │   ├── SimulateAttackButton.tsx
│   │   ├── ContractInfo.tsx
│   │   └── Dashboard.tsx
│   ├── config/
│   │   └── contract.ts # ABI, address, RPC URL
│   └── lib/
│       └── web3.ts     # Ethers.js utilities
└── package.json
```

## Smart Contract Interface

- `logAttack(string attackType)` – Log an attack (writes to chain)
- `getAlertsCount()` view returns (uint) – Read total alert count
