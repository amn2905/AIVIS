from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/stats")
def get_dashboard_overview_stats() -> Dict[str, Any]:
    return {
        "totalClaims": 2760,
        "pendingClaims": 314,
        "activeInvestigations": 89,
        "fraudAlertsCount": 42,
        "totalLossPreventedUsd": 3840000,
        "fraudDetectionRatePct": 94.2,
        "claimsTrend": [
            {"month": "Feb", "totalClaims": 380, "fraudDetected": 28, "approvedClaims": 320, "lossPreventedUsd": 410000},
            {"month": "Mar", "totalClaims": 420, "fraudDetected": 35, "approvedClaims": 350, "lossPreventedUsd": 520000},
            {"month": "Apr", "totalClaims": 390, "fraudDetected": 31, "approvedClaims": 330, "lossPreventedUsd": 460000},
            {"month": "May", "totalClaims": 460, "fraudDetected": 44, "approvedClaims": 380, "lossPreventedUsd": 680000},
            {"month": "Jun", "totalClaims": 510, "fraudDetected": 52, "approvedClaims": 420, "lossPreventedUsd": 820000},
            {"month": "Jul", "totalClaims": 600, "fraudDetected": 68, "approvedClaims": 490, "lossPreventedUsd": 950000}
        ],
        "vehicleCategories": [
            {"category": "Sedan", "count": 980, "percentage": 35.5, "avgFraudScore": 32},
            {"category": "SUV", "count": 740, "percentage": 26.8, "avgFraudScore": 41},
            {"category": "Commercial Truck", "count": 420, "percentage": 15.2, "avgFraudScore": 58},
            {"category": "EV / Hybrid", "count": 350, "percentage": 12.7, "avgFraudScore": 66},
            {"category": "Heavy Equipment", "count": 180, "percentage": 6.5, "avgFraudScore": 72},
            {"category": "Motorcycle", "count": 90, "percentage": 3.3, "avgFraudScore": 28}
        ]
    }
