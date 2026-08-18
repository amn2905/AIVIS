from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.schemas import ClaimOut, ClaimCreate

router = APIRouter()

# Mock dataset provider for API endpoints
MOCK_CLAIMS = [
    {
        "id": "clm-8801",
        "claim_number": "CLM-2026-8801",
        "policy_number": "POL-9920194",
        "company_id": "comp-1",
        "branch_id": "br-101",
        "vehicle": {
            "id": "veh-901",
            "vin": "1G1YC2D75H5104821",
            "make": "Chevrolet",
            "model": "Corvette Stingray",
            "year": 2023,
            "license_plate": "7XYZ890",
            "registration_state": "NY",
            "category": "Sedan",
            "owner_name": "Robert Sterling",
            "stolen_check_status": "FLAGGED",
            "risk_score": 89
        },
        "incident_date": "2026-07-28T02:14:00Z",
        "reported_date": "2026-07-28T08:30:00Z",
        "incident_location": {"city": "Brooklyn", "state": "NY", "country": "United States", "lat": 40.6782, "lng": -73.9442},
        "incident_description": "Hit and run claim on street overnight.",
        "status": "FRAUD_SUSPECTED",
        "fraud_score": 92,
        "risk_level": "CRITICAL",
        "estimated_loss_usd": 68500.0,
        "assigned_investigator_name": "Sarah Chen",
        "flagged_factors": ["Metadata EXIF mismatch", "Odometer tamper signal"],
        "evidence": [],
        "timeline": []
    }
]

@router.get("", response_model=List[ClaimOut])
def get_all_claims():
    return MOCK_CLAIMS

@router.get("/{claim_id}", response_model=ClaimOut)
def get_claim_by_id(claim_id: str):
    for claim in MOCK_CLAIMS:
        if claim["id"] == claim_id or claim["claim_number"] == claim_id:
            return claim
    return MOCK_CLAIMS[0]

@router.patch("/{claim_id}/status")
def update_claim_status(claim_id: str, new_status: str):
    for claim in MOCK_CLAIMS:
        if claim["id"] == claim_id:
            claim["status"] = new_status
            return claim
    return {"message": "Status updated successfully", "claim_id": claim_id, "status": new_status}
