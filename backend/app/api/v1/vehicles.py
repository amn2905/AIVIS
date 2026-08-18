from fastapi import APIRouter
from typing import List
from app.schemas.schemas import VehicleOut

router = APIRouter()

MOCK_VEHICLES = [
    {
        "id": "veh-901",
        "vin": "1G1YC2D75H5104821",
        "make": "Chevrolet",
        "model": "Corvette Stingray",
        "year": 2023,
        "license_plate": "7XYZ890",
        "registration_state": "NY",
        "category": "Sedan",
        "color": "Torch Red",
        "owner_name": "Robert Sterling",
        "owner_national_id": "SSN-***-**-4912",
        "stolen_check_status": "FLAGGED",
        "risk_score": 89
    }
]

@router.get("", response_model=List[VehicleOut])
def get_vehicles():
    return MOCK_VEHICLES
