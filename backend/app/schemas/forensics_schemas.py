from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class OBDSessionOut(BaseModel):
    id: str
    vin: str
    connection_type: str
    protocol: Optional[str] = None
    ecu_id: Optional[str] = None
    calibration_id: Optional[str] = None
    active_dtcs: List[str] = []
    pending_dtcs: List[str] = []
    health_score: int = 100

    class Config:
        from_attributes = True

class SensorMetricOut(BaseModel):
    id: str
    sensor_name: str
    category: str
    current_value: float
    unit: Optional[str] = None
    deviation_pct: float = 0.0
    health_score: int = 100
    anomaly_score: float = 0.0
    severity: str = "LOW"
    root_cause: Optional[str] = None

    class Config:
        from_attributes = True

class CANFrameOut(BaseModel):
    id: str
    frame_id_hex: str
    timestamp_ms: int
    payload_hex: str
    priority: int
    bus_load_pct: float
    ecu_name: str

    class Config:
        from_attributes = True

class ECUProfileOut(BaseModel):
    id: str
    ecu_name: str
    hardware_part_number: Optional[str] = None
    firmware_version: Optional[str] = None
    calibration_hash: str
    stored_vin: str
    chassis_vin: str
    vin_match: bool
    integrity_score: int
    tampering_detected: bool

    class Config:
        from_attributes = True

class EDRRecordOut(BaseModel):
    id: str
    impact_angle_degrees: float
    peak_g_force: float
    airbag_deployed: bool
    seatbelt_driver_buckled: bool
    pre_crash_stream: List[Any] = []

    class Config:
        from_attributes = True

class EvidenceOut(BaseModel):
    id: str
    case_number: str
    file_name: str
    file_size_bytes: int
    mime_type: str
    uploader_name: str
    uploaded_at: datetime
    is_locked: bool
    hashes: Optional[Dict[str, str]] = None

    class Config:
        from_attributes = True

class OCRDocumentOut(BaseModel):
    id: str
    doc_type: str
    file_name: str
    extracted_fields: Dict[str, Any]
    confidence_pct: float
    forgery_detected: bool
    forgery_type: Optional[str] = None

    class Config:
        from_attributes = True

class DamageAssessmentOut(BaseModel):
    id: str
    overall_severity: str
    total_estimated_repair_usd: float
    detected_boxes: List[Any] = []
    confidence_score: float

    class Config:
        from_attributes = True

class AIAgentFindingOut(BaseModel):
    agent_type: str
    agent_name: str
    confidence_pct: float
    risk_level: str
    summary: str
    reasoning: List[str] = []

    class Config:
        from_attributes = True

class UnifiedReportOut(BaseModel):
    id: str
    claim_id: str
    overall_fraud_risk_score: int
    orchestration_summary: str
    agent_findings: List[AIAgentFindingOut] = []

    class Config:
        from_attributes = True

class TimelineEventOut(BaseModel):
    id: str
    timestamp: datetime
    title: str
    description: str
    source: str
    severity: str

    class Config:
        from_attributes = True
