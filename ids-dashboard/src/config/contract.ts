/**
 * Smart Contract Configuration
 * IDS Blockchain Contract - stores intrusion detection alerts on Ethereum
 */

// Contract address deployed on Ganache local network
export const CONTRACT_ADDRESS = "0x614B69618b3650812f4B520346D755b7A9C341a2" as const;

// Contract ABI - only the functions we need for the dashboard
export const CONTRACT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "alerts",
    outputs: [
      { internalType: "string", name: "attackType", type: "string" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAlertsCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_attackType", type: "string" }],
    name: "logAttack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// Ganache local RPC endpoint
export const RPC_URL = "http://127.0.0.1:7545";
