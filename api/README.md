# IDS Blockchain API

FastAPI backend that reads/writes blockchain data. The dashboard fetches all data from here.

## Setup

```bash
pip install -r ../requirements.txt
```

## Run

```bash
cd api
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Ensure **Ganache** is running on `http://127.0.0.1:7545`. Override with env vars:
- `CONTRACT_ADDRESS` - Deployed IDS contract address
- `RPC_URL` - Ganache RPC URL

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | API + blockchain status |
| GET | `/config` | Contract address & RPC URL (no frontend hardcoding) |
| GET | `/alerts/count` | Total alerts on chain |
| GET | `/alerts` | All alerts (attackType, timestamp) |
| POST | `/alerts` | Log attack `{"attack_type": "Manual Attack"}` |
