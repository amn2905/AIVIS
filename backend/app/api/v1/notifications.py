from fastapi import APIRouter
from typing import List
from app.schemas.schemas import NotificationOut

router = APIRouter()

MOCK_NOTIFS = [
    {
        "id": "notif-1",
        "type": "FRAUD_ALERT",
        "title": "CRITICAL Fraud Alert: CLM-2026-8801",
        "message": "Synthetic image manipulation detected.",
        "timestamp": "2026-08-02T12:00:00Z",
        "read": False,
        "severity": "CRITICAL",
        "link": "/claims/clm-8801"
    }
]

@router.get("", response_model=List[NotificationOut])
def get_notifications():
    return MOCK_NOTIFS
