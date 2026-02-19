
import os
from web3 import Web3

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:7545")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "0x614B69618b3650812f4B520346D755b7A9C341a2")
ABI = [
    {
        "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "name": "alerts",
        "outputs": [
            {"internalType": "string", "name": "attackType", "type": "string"},
            {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "getAlertsCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "string", "name": "_attackType", "type": "string"}],
        "name": "logAttack",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]


def get_web3() -> Web3:
    """Get Web3 instance connected to Ganache."""
    return Web3(Web3.HTTPProvider(RPC_URL))


def get_contract():
    """Get contract instance."""
    w3 = get_web3()
    return w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)


def is_connected() -> bool:
    """Check if blockchain is reachable."""
    try:
        w3 = get_web3()
        return w3.is_connected()
    except Exception:
        return False


def get_alerts_count() -> int:
    """Fetch total alert count from blockchain."""
    contract = get_contract()
    return contract.functions.getAlertsCount().call()


def get_alerts() -> list[dict]:
    """Fetch all alerts from blockchain."""
    contract = get_contract()
    count = contract.functions.getAlertsCount().call()
    alerts_list = []
    for i in range(count):
        attack_type, timestamp = contract.functions.alerts(i).call()
        alerts_list.append({"attackType": attack_type, "timestamp": int(timestamp)})
    return alerts_list


def log_attack(attack_type: str) -> str:
    """Log an attack to the blockchain. Returns transaction hash."""
    w3 = get_web3()
    contract = get_contract()
    account = w3.eth.accounts[0]
    tx_hash = contract.functions.logAttack(attack_type).transact({"from": account})
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return receipt["transactionHash"].hex()
