"""
FastAPI backend - IDS Blockchain API
Serves blockchain data to the dashboard frontend
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from blockchain import (
    is_connected,
    get_alerts_count,
    get_alerts,
    log_attack,
    CONTRACT_ADDRESS,
    RPC_URL,
)

app = FastAPI(title="IDS Blockchain API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class LogAttackRequest(BaseModel):
    attack_type: str


@app.get("/health")
def health():
    """Check if API and blockchain are reachable."""
    connected = is_connected()
    return {"status": "ok", "blockchain_connected": connected}


@app.get("/config")
def config():
    """Get contract config - frontend fetches this instead of hardcoding."""
    return {"contractAddress": CONTRACT_ADDRESS, "rpcUrl": RPC_URL}


@app.get("/alerts/count")
def alerts_count():
    """Get total number of alerts on chain."""
    if not is_connected():
        raise HTTPException(503, "Blockchain not connected")
    try:
        count = get_alerts_count()
        return {"count": count}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.get("/alerts")
def alerts_list():
    """Get all alerts from blockchain."""
    if not is_connected():
        raise HTTPException(503, "Blockchain not connected")
    try:
        alerts_data = get_alerts()
        return {"alerts": alerts_data}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/alerts")
def log_attack_endpoint(body: LogAttackRequest):
    """Log an attack to the blockchain."""
    if not is_connected():
        raise HTTPException(503, "Blockchain not connected")
    try:
        tx_hash = log_attack(body.attack_type)
        return {"success": True, "txHash": tx_hash}
    except Exception as e:
        raise HTTPException(500, str(e))
