from fastapi import APIRouter
from typing import List
from app.schemas.schemas import BranchOut

router = APIRouter()

MOCK_BRANCHES = [
    {
        "id": "br-101",
        "company_id": "comp-1",
        "company_name": "Metropolitan Mutual Insurance",
        "code": "NY-HQ",
        "name": "New York HQ Branch",
        "city": "New York",
        "state": "NY",
        "country": "United States",
        "investigators_count": 18,
        "active_claims_count": 42,
        "status": "ACTIVE",
        "phone": "+1 (212) 555-0199"
    }
]

@router.get("", response_model=List[BranchOut])
def get_branches():
    return MOCK_BRANCHES
