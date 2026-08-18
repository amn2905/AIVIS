from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

@router.get("/obd/session")
def get_obd_session() -> Dict[str, Any]:
    return {
        "vin": "1G1YC2D75H5104821",
        "ecuId": "ECU-CHEV-CORVETTE-Z51-0982",
        "protocol": "ISO 15765-4 (CAN 11-bit ID, 500 kbit/s)",
        "calibrationId": "CAL-GM-8849102-V4",
        "activeDtcs": ["P0300 — Random/Multiple Cylinder Misfire Detected"],
        "milStatus": True,
        "healthScore": 62
    }

@router.get("/sensors/intelligence")
def get_sensor_intelligence() -> Dict[str, Any]:
    return {
        "vehicleHealthScore": 58,
        "correlations": [
            {
                "id": "corr-1",
                "title": "High RPM Engine Rev with Zero Wheel Speed",
                "description": "Engine revved to 4850 RPM for 18s while vehicle speed sensor was 0 km/h.",
                "severity": "CRITICAL",
                "confidencePct": 96.8
            }
        ]
    }

@router.get("/canbus/frames")
def get_canbus_frames() -> Dict[str, Any]:
    return {
        "frames": [
            {"frameIdHex": "0x0C4", "timestampMs": 142010, "payloadHex": "02 48 20 00 00 00 FF 12", "ecuName": "ECM"}
        ],
        "threats": [
            {"type": "SIGNAL_INJECTION", "frameIdHex": "0x7DF", "confidencePct": 94.2, "severity": "CRITICAL"}
        ]
    }

@router.get("/ecu/profile")
def get_ecu_profile() -> Dict[str, Any]:
    return {
        "ecuName": "Primary ECM-1",
        "storedVin": "1G1YC2D75H5104821",
        "chassisVin": "1G1YC2D75H5104821",
        "integrityScore": 48,
        "tamperingDetected": True,
        "tamperingType": "UNAUTHORIZED_FLASH"
    }

@router.get("/edr/record")
def get_edr_record() -> Dict[str, Any]:
    return {
        "impactDirectionDegrees": 180,
        "peakGForce": 1.8,
        "airbagDeployed": False,
        "driverSeatbeltBuckled": True,
        "collisionSeverityIndex": 18
    }

@router.get("/evidence/locker")
def get_evidence_locker() -> List[Dict[str, Any]]:
    return [
        {
            "id": "ev-1",
            "fileName": "rear_bumper_impact_raw.jpg",
            "evidenceNumber": "EVD-99201-A",
            "hashes": {"sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"},
            "isLocked": True
        }
    ]

@router.get("/ocr/scan")
def get_ocr_scan() -> Dict[str, Any]:
    return {
        "docType": "REPAIR_INVOICE",
        "fileName": "bodyshop_repair_estimate_july2026.pdf",
        "forgeryDetected": True,
        "forgeryType": "FONT_ANOMALY"
    }

@router.get("/damage/assessment")
def get_damage_assessment() -> Dict[str, Any]:
    return {
        "overallDamageSeverity": "MODERATE",
        "totalEstimatedRepairCostUsd": 14200,
        "confidenceScore": 95.8
    }

@router.get("/agents/orchestrate")
def get_agents_orchestration() -> Dict[str, Any]:
    return {
        "overallFraudRiskScore": 94,
        "orchestrationSummary": "Multi-agent forensic synthesis completed. Staged collision suspected."
    }

@router.get("/timeline/events")
def get_forensic_timeline() -> List[Dict[str, Any]]:
    return [
        {"timestamp": "2026-07-28T02:10:00Z", "title": "CAN Signal Injection Detected", "source": "CAN_BUS", "severity": "CRITICAL"}
    ]
