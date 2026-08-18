from fastapi import APIRouter
from typing import List
from app.schemas.schemas import AuditLogOut

router = APIRouter()

MOCK_AUDIT_LOGS = [
    {
        "id": "log-1001",
        "user_id": "usr-101",
        "user_name": "Alex Vance",
        "user_role": "SUPER_ADMIN",
        "action": "UPDATE_ROLE_PERMISSIONS",
        "resource": "Role: FRAUD_ANALYST",
        "ip_address": "192.168.1.104",
        "timestamp": "2026-08-02T11:45:12Z",
        "status": "SUCCESS",
        "details": "Added evidence:upload permission."
    }
]

@router.get("/logs", response_model=List[AuditLogOut])
def get_audit_logs():
    return MOCK_AUDIT_LOGS
