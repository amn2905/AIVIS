from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

def generate_uuid():
    return str(uuid.uuid4())

class OBDSession(Base):
    __tablename__ = "obd_sessions"

    id = Column(String, primary_key=True, default=generate_uuid)
    vehicle_id = Column(String, nullable=False)
    vin = Column(String, index=True, nullable=False)
    connection_type = Column(String, default="USB") # USB, BLUETOOTH, WIFI
    protocol = Column(String)
    ecu_id = Column(String)
    calibration_id = Column(String)
    active_dtcs = Column(JSON, default=list)
    pending_dtcs = Column(JSON, default=list)
    freeze_frame = Column(JSON, default=dict)
    health_score = Column(Integer, default=100)
    created_at = Column(DateTime, default=datetime.utcnow)

class SensorSnapshot(Base):
    __tablename__ = "sensor_snapshots"

    id = Column(String, primary_key=True, default=generate_uuid)
    vehicle_id = Column(String, nullable=False)
    sensor_name = Column(String, nullable=False)
    category = Column(String, nullable=False) # ENGINE, ELECTRICAL, TRANSMISSION, BRAKE_CHASSIS
    current_value = Column(Float, nullable=False)
    unit = Column(String)
    expected_min = Column(Float)
    expected_max = Column(Float)
    deviation_pct = Column(Float, default=0.0)
    health_score = Column(Integer, default=100)
    anomaly_score = Column(Float, default=0.0)
    severity = Column(String, default="LOW")
    root_cause = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

class CANFrameRecord(Base):
    __tablename__ = "can_frames"

    id = Column(String, primary_key=True, default=generate_uuid)
    session_id = Column(String, nullable=False)
    frame_id_hex = Column(String, index=True, nullable=False)
    timestamp_ms = Column(Integer, nullable=False)
    payload_hex = Column(String, nullable=False)
    priority = Column(Integer, default=1)
    bus_load_pct = Column(Float, default=0.0)
    signal_frequency_hz = Column(Integer, default=10)
    ecu_name = Column(String)

class ECUProfile(Base):
    __tablename__ = "ecu_profiles"

    id = Column(String, primary_key=True, default=generate_uuid)
    vehicle_id = Column(String, nullable=False)
    ecu_name = Column(String, nullable=False)
    hardware_part_number = Column(String)
    firmware_version = Column(String)
    calibration_hash = Column(String, nullable=False)
    stored_vin = Column(String, nullable=False)
    chassis_vin = Column(String, nullable=False)
    vin_match = Column(Boolean, default=True)
    reflash_count = Column(Integer, default=0)
    last_flashed_at = Column(DateTime, default=datetime.utcnow)
    integrity_score = Column(Integer, default=100)
    tampering_detected = Column(Boolean, default=False)

class EDRCrashRecord(Base):
    __tablename__ = "edr_crash_records"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, nullable=False)
    impact_angle_degrees = Column(Float)
    peak_g_force = Column(Float)
    airbag_deployed = Column(Boolean, default=False)
    airbag_deployment_ms = Column(Integer, default=0)
    seatbelt_driver_buckled = Column(Boolean, default=True)
    pre_crash_stream = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

class Evidence(Base):
    __tablename__ = "evidence_vault"

    id = Column(String, primary_key=True, default=generate_uuid)
    case_number = Column(String, index=True, nullable=False)
    file_name = Column(String, nullable=False)
    file_size_bytes = Column(Integer, nullable=False)
    mime_type = Column(String)
    uploader_name = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    is_locked = Column(Boolean, default=True)

class EvidenceHash(Base):
    __tablename__ = "evidence_hashes"

    id = Column(String, primary_key=True, default=generate_uuid)
    evidence_id = Column(String, ForeignKey("evidence_vault.id"), nullable=False)
    sha256 = Column(String, nullable=False)
    sha512 = Column(String, nullable=False)
    md5 = Column(String, nullable=False)

class DamageAssessment(Base):
    __tablename__ = "damage_assessments"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, nullable=False)
    overall_severity = Column(String, default="MODERATE")
    total_estimated_repair_usd = Column(Float, default=0.0)
    detected_boxes = Column(JSON, default=list)
    confidence_score = Column(Float, default=0.0)

class OCRDocument(Base):
    __tablename__ = "ocr_documents"

    id = Column(String, primary_key=True, default=generate_uuid)
    doc_type = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    extracted_fields = Column(JSON, default=dict)
    confidence_pct = Column(Float, default=0.0)
    forgery_detected = Column(Boolean, default=False)
    forgery_type = Column(String)

class TimelineEvent(Base):
    __tablename__ = "forensic_timeline_events"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    title = Column(String, nullable=False)
    description = Column(Text)
    source = Column(String, nullable=False)
    severity = Column(String, default="INFO")

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, unique=True, nullable=False)
    overall_fraud_risk_score = Column(Integer, default=0)
    orchestration_summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class InvestigationFinding(Base):
    __tablename__ = "investigation_findings"

    id = Column(String, primary_key=True, default=generate_uuid)
    investigation_id = Column(String, ForeignKey("investigations.id"), nullable=False)
    agent_type = Column(String, nullable=False)
    agent_name = Column(String, nullable=False)
    confidence_pct = Column(Float)
    risk_level = Column(String, default="LOW")
    summary = Column(Text)
    reasoning = Column(JSON, default=list)
