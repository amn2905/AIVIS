from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class OEMConnectorOut(BaseModel):
    id: str
    provider: str
    name: str
    protocol: str
    status: str
    last_ping_ms: int
    capabilities: List[str] = []

    class Config:
        from_attributes = True

class PredictiveModelOut(BaseModel):
    claim_id: str
    fraud_probability_pct: float
    failure_risk_pct: float
    predicted_component: str
    estimated_repair_cost_usd: float
    market_average_cost_usd: float
    cost_inflation_pct: float
    predicted_repair_duration_days: float
    confidence_score: float

class APIKeyOut(BaseModel):
    id: str
    key_name: str
    api_key_masked: str
    owner_tenant: str
    rate_limit_rpm: int
    status: str

    class Config:
        from_attributes = True

class SaaSLicenseOut(BaseModel):
    company_name: str
    tier: str
    monthly_api_limit: int
    current_api_count: int
    billing_status: str

    class Config:
        from_attributes = True
