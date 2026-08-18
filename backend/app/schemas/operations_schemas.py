from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class InvestigationTaskOut(BaseModel):
    id: str
    claim_id: str
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    assignee_name: str
    assignee_role: str
    due_date: datetime
    checklist_items: List[Dict[str, Any]] = []

    class Config:
        from_attributes = True

class SLARecordOut(BaseModel):
    id: str
    claim_id: str
    claim_number: str
    stage_name: str
    sla_deadline: datetime
    remaining_minutes: int
    is_breached: bool
    priority_score: int
    assigned_investigator: str
    escalation_status: str

    class Config:
        from_attributes = True

class ComplianceScoreOut(BaseModel):
    standard_code: str
    standard_name: str
    compliance_pct: float
    passed_controls: int
    total_controls: int
    status: str
    last_audited_at: datetime

    class Config:
        from_attributes = True

class CaseCommentOut(BaseModel):
    id: str
    claim_id: str
    author_name: str
    author_role: str
    comment_text: str
    mentions: List[str] = []
    timestamp: datetime

    class Config:
        from_attributes = True
