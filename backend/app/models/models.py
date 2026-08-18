from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

def generate_uuid():
    return str(uuid.uuid4())

class Role(Base):
    __tablename__ = "roles"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, unique=True, nullable=False) # SUPER_ADMIN, FRAUD_ANALYST, etc.
    description = Column(String)
    permissions = Column(JSON, default=list) # ["claims:read", "claims:write"]

    users = relationship("User", back_populates="role_rel")

class InsuranceCompany(Base):
    __tablename__ = "insurance_companies"

    id = Column(String, primary_key=True, default=generate_uuid)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    tax_id = Column(String)
    country = Column(String, default="United States")
    headquarters = Column(String)
    status = Column(String, default="ACTIVE")
    contact_email = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    branches = relationship("Branch", back_populates="company")
    users = relationship("User", back_populates="company")
    claims = relationship("Claim", back_populates="company")

class Branch(Base):
    __tablename__ = "branches"

    id = Column(String, primary_key=True, default=generate_uuid)
    company_id = Column(String, ForeignKey("insurance_companies.id"), nullable=False)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    status = Column(String, default="ACTIVE")
    phone = Column(String)

    company = relationship("InsuranceCompany", back_populates="branches")
    users = relationship("User", back_populates="branch")
    claims = relationship("Claim", back_populates="branch")

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, ForeignKey("roles.name"), nullable=False)
    company_id = Column(String, ForeignKey("insurance_companies.id"))
    branch_id = Column(String, ForeignKey("branches.id"), nullable=True)
    status = Column(String, default="ACTIVE")
    last_active = Column(DateTime, default=datetime.utcnow)

    role_rel = relationship("Role", back_populates="users")
    company = relationship("InsuranceCompany", back_populates="users")
    branch = relationship("Branch", back_populates="users")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True, default=generate_uuid)
    vin = Column(String, unique=True, index=True, nullable=False)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    license_plate = Column(String, nullable=False)
    registration_state = Column(String)
    category = Column(String, nullable=False) # Sedan, SUV, Commercial Truck, EV / Hybrid
    engine_number = Column(String)
    color = Column(String)
    owner_name = Column(String, nullable=False)
    owner_national_id = Column(String)
    stolen_check_status = Column(String, default="CLEAR") # CLEAR, FLAGGED
    risk_score = Column(Integer, default=0)
    telematics_data = Column(JSON, nullable=True)

    claims = relationship("Claim", back_populates="vehicle")

class Claim(Base):
    __tablename__ = "claims"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_number = Column(String, unique=True, index=True, nullable=False)
    policy_number = Column(String, index=True, nullable=False)
    company_id = Column(String, ForeignKey("insurance_companies.id"), nullable=False)
    branch_id = Column(String, ForeignKey("branches.id"), nullable=False)
    vehicle_id = Column(String, ForeignKey("vehicles.id"), nullable=False)
    
    incident_date = Column(DateTime, default=datetime.utcnow)
    reported_date = Column(DateTime, default=datetime.utcnow)
    incident_location = Column(JSON, nullable=False) # {city, state, country, lat, lng}
    incident_description = Column(Text)
    
    status = Column(String, default="SUBMITTED") # SUBMITTED, UNDER_REVIEW, FRAUD_SUSPECTED, FIELD_INVESTIGATION, APPROVED, REJECTED
    fraud_score = Column(Integer, default=0)
    risk_level = Column(String, default="INFO") # CRITICAL, HIGH, MEDIUM, LOW, INFO
    estimated_loss_usd = Column(Float, default=0.0)
    assigned_investigator_id = Column(String, ForeignKey("users.id"), nullable=True)
    
    flagged_factors = Column(JSON, default=list)
    evidence = Column(JSON, default=list)
    timeline = Column(JSON, default=list)

    company = relationship("InsuranceCompany", back_populates="claims")
    branch = relationship("Branch", back_populates="claims")
    vehicle = relationship("Vehicle", back_populates="claims")

class FraudAlert(Base):
    __tablename__ = "fraud_alerts"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, ForeignKey("claims.id"), nullable=False)
    severity = Column(String, default="HIGH")
    title = Column(String, nullable=False)
    description = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="NEW")
    confidence_pct = Column(Float, default=0.0)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=False)
    user_name = Column(String, nullable=False)
    user_role = Column(String)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    resource_id = Column(String)
    ip_address = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="SUCCESS")
    details = Column(Text)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=generate_uuid)
    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    message = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    read = Column(Boolean, default=False)
    severity = Column(String, default="INFO")
    link = Column(String)
