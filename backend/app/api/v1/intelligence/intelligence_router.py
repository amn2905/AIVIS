from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

@router.get("/graph")
def get_knowledge_graph() -> Dict[str, Any]:
    return {
        "nodes": [
            {"id": "n-w1", "node_type": "REPAIR_SHOP", "label": "Tri-State Auto Body Shop", "risk_score": 96, "fraud_network_score": 98, "is_suspect": True},
            {"id": "n-ph1", "node_type": "PHONE_NUMBER", "label": "+1 (555) 019-9941", "risk_score": 95, "fraud_network_score": 98, "is_suspect": True}
        ],
        "edges": [
            {"id": "e-8", "source_id": "n-w1", "target_id": "n-ph1", "relation_type": "SHARED_PHONE", "weight": 5.0, "is_suspicious": True}
        ]
    }

@router.get("/algorithms")
def get_graph_algorithms() -> Dict[str, Any]:
    return {
        "pageRank": [
            {"nodeId": "n-w1", "nodeLabel": "Tri-State Auto Body Shop", "nodeType": "REPAIR_SHOP", "pageRankScore": 0.284, "centralityRank": 1, "isMastermindCandidate": True}
        ],
        "communities": [
            {
                "id": "comm-1",
                "communityName": "Tri-State Phantom Collision Syndicate",
                "memberNodeIds": ["n-w1", "n-ph1", "n-b1"],
                "primaryTerritory": "Brooklyn & Tri-State NY Metro",
                "syndicateRiskScore": 96,
                "totalFraudValueUsd": 1480000
            }
        ]
    }

@router.get("/vin-policy")
def get_vin_and_policy_alerts() -> Dict[str, Any]:
    return {
        "vinClones": [
            {
                "id": "vc-1",
                "vin": "1G1YC2D75H5104821",
                "makeModel": "2023 Chevrolet Corvette Stingray",
                "registeredStates": ["NY (Active)", "FL (Active)", "TX (Active)"],
                "activePoliciesCount": 3,
                "fraudRiskScore": 98
            }
        ],
        "ghostPolicies": [
            {
                "id": "gp-1",
                "policyNumber": "POL-9920194",
                "vin": "1G1YC2D75H5104821",
                "duplicateCarrierCodes": ["MMI-US", "AVA-UK"],
                "totalPremiumUsd": 8400,
                "fraudRiskScore": 94
            }
        ]
    }

@router.get("/workshops")
def get_workshops_and_surveyors_risk() -> Dict[str, Any]:
    return {
        "workshops": [
            {
                "id": "w-101",
                "shopName": "Tri-State Auto Body Shop",
                "registrationNumber": "NY-BODY-8821",
                "totalClaimsHandled": 142,
                "inflationRatioPct": 280,
                "fraudRiskScore": 96
            }
        ],
        "surveyors": [
            {
                "id": "surv-201",
                "surveyorName": "Inspector James Vance",
                "licenseNumber": "SURV-NY-9901",
                "aiDiscrepancyOverridePct": 42.0,
                "fraudRiskScore": 92
            }
        ]
    }

@router.get("/syndicates")
def get_fraud_syndicates() -> List[Dict[str, Any]]:
    return [
        {
            "id": "synd-1",
            "ringName": "Tri-State Phantom Collision Ring #881",
            "codeName": "OPERATION PHANTOM IMPACT",
            "riskScore": 96,
            "memberCount": 14,
            "totalClaimLossUsd": 1480000,
            "primaryLocation": "New York / New Jersey"
        }
    ]

@router.get("/money-flow")
def get_money_flow_analysis() -> List[Dict[str, Any]]:
    return [
        {
            "id": "mf-1",
            "sourceEntity": "Metropolitan Mutual Payout Escrow",
            "targetEntity": "Tri-State Auto Body Shop",
            "bankAccountMasked": "Chase Bank (****4912)",
            "amountUsd": 68500,
            "isFlagged": True,
            "flagReason": "Rapid payout to high-risk workshop sharing policyholder phone number"
        }
    ]
