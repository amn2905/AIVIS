from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

def generate_uuid():
    return str(uuid.uuid4())

class OEMConnectorRecord(Base):
    __tablename__ = "oem_connectors"

    id = Column(String, primary_key=True, default=generate_uuid)
    provider = Column(String, nullable=False) # TESLA, GM_ONSTAR, FORDPASS, GEOTAB, GUIDEWIRE
    name = Column(String, nullable=False)
    protocol = Column(String, default="REST API")
    status = Column(String, default="ONLINE")
    last_ping_ms = Column(Integer, default=15)
    capabilities = Column(JSON, default=list)

class APIKeyEntity(Base):
    __tablename__ = "api_keys"

    id = Column(String, primary_key=True, default=generate_uuid)
    key_name = Column(String, nullable=False)
    api_key_masked = Column(String, nullable=False)
    owner_tenant = Column(String, nullable=False)
    rate_limit_rpm = Column(Integer, default=10000)
    status = Column(String, default="ACTIVE")
    created_at = Column(DateTime, default=datetime.utcnow)

class SaaSLicenseEntity(Base):
    __tablename__ = "saas_licenses"

    id = Column(String, primary_key=True, default=generate_uuid)
    company_name = Column(String, nullable=False)
    tier = Column(String, default="ENTERPRISE_CARRIER")
    monthly_api_limit = Column(Integer, default=5000000)
    current_api_count = Column(Integer, default=1420800)
    billing_status = Column(String, default="ACTIVE")
