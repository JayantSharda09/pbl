/**
 * Web3 Utility - Reusable blockchain interaction layer
 * Uses Ethers.js to connect to Ganache and interact with IDS contract
 */

import {
  JsonRpcProvider,
  Contract,
  type Signer,
} from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, RPC_URL } from "@/config/contract";

/** Provider instance - JSON RPC connection to Ganache */
let provider: JsonRpcProvider | null = null;

/**
 * Get or create the Web3 provider
 * Connects to local Ganache instance via JSON RPC
 */
export function getProvider(): JsonRpcProvider {
  if (typeof window === "undefined") {
    throw new Error("Web3 is only available in the browser");
  }
  if (!provider) {
    provider = new JsonRpcProvider(RPC_URL);
  }
  return provider;
}

/**
 * Get signer for transaction (uses first Ganache account)
 * Ganache accounts are unlocked by default
 * Uses getSigner(0) - listAccounts() can return unexpected formats with JsonRpcProvider in ethers v6
 */
export async function getSigner(): Promise<Signer> {
  const prov = getProvider();
  return prov.getSigner(0);
}

/**
 * Create a contract instance for write operations (logAttack)
 * Uses signer from first Ganache account
 */
export async function getContract(): Promise<Contract> {
  const signer = await getSigner();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI as never[], signer);
}

/**
 * Create a read-only contract instance (for getAlertsCount)
 * No signer needed - view functions don't require gas
 */
export async function getReadOnlyContract(): Promise<Contract> {
  const prov = getProvider();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI as never[], prov);
}

/**
 * Check if connected to the blockchain
 * Returns true if RPC is reachable and chain responds
 */
export async function checkConnection(): Promise<boolean> {
  try {
    if (typeof window === "undefined") return false;
    const prov = new JsonRpcProvider(RPC_URL);
    await prov.getBlockNumber();
    return true;
  } catch {
    return false;
  }
}
