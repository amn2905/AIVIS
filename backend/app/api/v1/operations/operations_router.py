from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

@router.get("/tasks")
def get_tasks() -> List[Dict[str, Any]]:
    return [
        {
            "id": "task-101",
            "claimId": "clm-8801",
            "title": "Extract & Decode High-Speed CAN Bus ASC Log",
            "status": "IN_PROGRESS",
            "priority": "CRITICAL",
            "assigneeName": "Alex Vance"
        }
    ]

@router.get("/sla")
def get_sla_records() -> List[Dict[str, Any]]:
    return [
        {
            "id": "sla-1",
            "claimNumber": "CLM-2026-8801",
            "stageName": "48h Telematics Audit Stage",
            "remainingMinutes": 42,
            "isBreached": False,
            "escalationStatus": "WARNED"
        }
    ]

@router.get("/approvals")
def get_approvals() -> List[Dict[str, Any]]:
    return [
        {
            "id": "sig-901",
            "signerName": "Chief Alex Vance",
            "signatureAlgorithm": "RSA-2048",
            "verificationStatus": "VALIDATED"
        }
    ]

@router.get("/compliance")
def get_compliance_scores() -> List[Dict[str, Any]]:
    return [
        {"standardCode": "ISO_27001", "compliancePct": 98.4, "status": "COMPLIANT"},
        {"standardCode": "ISO_21434", "compliancePct": 96.2, "status": "COMPLIANT"},
        {"standardCode": "NIST_CSF", "compliancePct": 99.1, "status": "COMPLIANT"},
        {"standardCode": "ISO_27037", "compliancePct": 100.0, "status": "COMPLIANT"}
    ]

@router.get("/collaboration")
def get_collaboration_feed() -> Dict[str, Any]:
    return {
        "comments": [
            {"id": "comm-1", "authorName": "Elena Rostova", "commentText": "@alex.vance I verified EXIF tag 0x9003."}
        ]
    }
