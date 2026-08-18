from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class AgentOpinionOut(BaseModel):
    role: str
    agent_title: str
    confidence_pct: float
    verdict: str
    findings_summary: str
    reasoning_chain: List[str] = []

    class Config:
        from_attributes = True

class SHAPAttributionOut(BaseModel):
    feature_name: str
    category: str
    shap_value: float
    feature_value: Any
    description: str

class ChatMessageOut(BaseModel):
    id: str
    sender: str
    message: str
    timestamp: str
    suggested_followups: List[str] = []

class MultilingualReportOut(BaseModel):
    claim_id: str
    language: str
    title: str
    executive_summary: str
    findings_section: str
    legal_conclusion: str
    generated_at: datetime
