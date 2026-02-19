from web3 import Web3

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
assert w3.is_connected(), "Ganache not connected"

# Account
account = w3.eth.accounts[0]

# Contract details
contract_address = "0x614B69618b3650812f4B520346D755b7A9C341a2"
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

# Intrusion detection: more than 5 logs = intrusion
try:
    count = contract.functions.getAlertsCount().call()
    if count > 5:
        print("⚠ INTRUSION DETECTED - More than 5 attacks logged! (Total: {})".format(count))
except Exception as e:
    print("(Could not check alert count - ensure contract is deployed at {}: {})".format(contract_address, e))
