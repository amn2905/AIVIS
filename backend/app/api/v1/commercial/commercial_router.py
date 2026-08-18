from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

@router.get("/oem")
def get_oem_connectors() -> List[Dict[str, Any]]:
    return [
        {"id": "oem-1", "provider": "TESLA", "name": "Tesla Fleet Telematics API", "status": "ONLINE", "lastPingMs": 14},
        {"id": "oem-2", "provider": "GM_ONSTAR", "name": "GM OnStar Insights", "status": "ONLINE", "lastPingMs": 18},
        {"id": "oem-5", "provider": "GUIDEWIRE", "name": "Guidewire ClaimCenter Bus", "status": "ONLINE", "lastPingMs": 16}
    ]

@router.get("/predictive")
def get_predictive_model_scores() -> Dict[str, Any]:
    return {
        "claimId": "clm-8801",
        "fraudProbabilityPct": 94.2,
        "failureRiskPct": 88.5,
        "predictedComponent": "Primary Engine Transmission & ECU",
        "estimatedRepairCostUsd": 68500,
        "predictedRepairDurationDays": 4.5
    }

@router.get("/developer")
def get_developer_api_keys() -> List[Dict[str, Any]]:
    return [
        {"id": "key-1", "keyName": "Metropolitan Production Backend API Key", "apiKeyMasked": "aivis_live_sk_9018...4912", "status": "ACTIVE"}
    ]

@router.get("/licensing")
def get_saas_license_quota() -> Dict[str, Any]:
    return {
        "companyName": "Metropolitan Mutual Insurance",
        "tier": "ENTERPRISE_CARRIER",
        "monthlyApiRequestLimit": 5000000,
        "currentApiRequestCount": 1420800,
        "billingStatus": "ACTIVE"
    }

@router.get("/portfolio")
def get_executive_portfolio_metrics() -> Dict[str, Any]:
    return {
        "totalInsuredVehicles": 142500,
        "totalActiveClaimsValueUsd": 14850000,
        "flaggedFraudValueUsd": 3420000,
        "portfolioRiskScore": 82,
        "f1ScorePct": 97.3
    }
