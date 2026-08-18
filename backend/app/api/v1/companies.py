from fastapi import APIRouter
from typing import List
from app.schemas.schemas import InsuranceCompanyOut

router = APIRouter()

MOCK_COMPANIES = [
    {
        "id": "comp-1",
        "code": "MMI-US",
        "name": "Metropolitan Mutual Insurance",
        "tax_id": "US-884920194",
        "country": "United States",
        "headquarters": "New York, NY",
        "active_branches": 14,
        "total_claims_count": 1420,
        "status": "ACTIVE",
        "contact_email": "security@metropolitan-ins.com",
        "created_at": "2024-01-15T00:00:00Z"
    }
]

@router.get("", response_model=List[InsuranceCompanyOut])
def get_companies():
    return MOCK_COMPANIES
