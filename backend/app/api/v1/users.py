from fastapi import APIRouter
from typing import List
from app.schemas.schemas import UserOut

router = APIRouter()

MOCK_USERS = [
    {
        "id": "usr-101",
        "email": "alex.vance@aivis-sec.io",
        "full_name": "Alex Vance",
        "role": "SUPER_ADMIN",
        "company_id": "comp-global",
        "company_name": "AIVIS Global Command",
        "status": "ACTIVE",
        "last_active": "2026-08-02T11:45:00Z"
    },
    {
        "id": "usr-102",
        "email": "sarah.chen@metropolitan-ins.com",
        "full_name": "Sarah Chen",
        "role": "FRAUD_ANALYST",
        "company_id": "comp-1",
        "company_name": "Metropolitan Mutual Insurance",
        "branch_name": "New York HQ Branch",
        "status": "ACTIVE",
        "last_active": "2026-08-02T11:40:00Z"
    }
]

@router.get("", response_model=List[UserOut])
def get_users():
    return MOCK_USERS
