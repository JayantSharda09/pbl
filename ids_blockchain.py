from web3 import Web3

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
assert w3.is_connected(), "Ganache not connected"

# Account
account = w3.eth.accounts[0]

# Contract details
contract_address = "0xd8E4A68c949dc70cA4a8d7b0E12A9413F03E935e"
abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "alerts",
		"outputs": [
			{
				"internalType": "string",
				"name": "attackType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAlertsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_attackType",
				"type": "string"
			}
		],
		"name": "logAttack",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

contract = w3.eth.contract(
    address=contract_address,
    abi=abi
)

# Call smart contract
tx = contract.functions.logAttack(
    "Port Scan Detected"
).transact({
    "from": account
})

w3.eth.wait_for_transaction_receipt(tx)
print("Attack logged on blockchain!")
