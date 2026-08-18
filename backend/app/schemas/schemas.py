from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# Token Schemas
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    type: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str
    company_id: Optional[str] = None
    branch_id: Optional[str] = None
    status: Optional[str] = "ACTIVE"

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str
    company_name: Optional[str] = None
    branch_name: Optional[str] = None
    last_active: Optional[datetime] = None

    class Config:
        from_attributes = True

# Role Schemas
class RoleOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    permissions: List[str] = []

    class Config:
        from_attributes = True

# Insurance Company Schemas
class InsuranceCompanyBase(BaseModel):
    code: str
    name: str
    tax_id: Optional[str] = None
    country: Optional[str] = "United States"
    headquarters: Optional[str] = None
    contact_email: Optional[str] = None

class InsuranceCompanyOut(InsuranceCompanyBase):
    id: str
    active_branches: int = 0
    total_claims_count: int = 0
    status: str = "ACTIVE"
    created_at: datetime

    class Config:
        from_attributes = True

# Branch Schemas
class BranchBase(BaseModel):
    company_id: str
    code: str
    name: str
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None

class BranchOut(BranchBase):
    id: str
    company_name: Optional[str] = None
    investigators_count: int = 0
    active_claims_count: int = 0
    status: str = "ACTIVE"

    class Config:
        from_attributes = True

# Vehicle Schemas
class VehicleBase(BaseModel):
    vin: str
    make: str
    model: str
    year: int
    license_plate: str
    registration_state: Optional[str] = None
    category: str
    color: Optional[str] = None
    owner_name: str
    owner_national_id: Optional[str] = None

class VehicleOut(VehicleBase):
    id: str
    stolen_check_status: str = "CLEAR"
    risk_score: int = 0
    telematics_data: Optional[Any] = None

    class Config:
        from_attributes = True

# Claim Schemas
class ClaimCreate(BaseModel):
    claim_number: str
    policy_number: str
    company_id: str
    branch_id: str
    vehicle_vin: str
    estimated_loss_usd: float
    incident_description: str

class ClaimOut(BaseModel):
    id: str
    claim_number: str
    policy_number: str
    company_id: str
    branch_id: str
    vehicle: VehicleOut
    incident_date: datetime
    reported_date: datetime
    incident_location: Any
    incident_description: Optional[str] = None
    status: str
    fraud_score: int
    risk_level: str
    estimated_loss_usd: float
    assigned_investigator_name: Optional[str] = None
    flagged_factors: List[str] = []
    evidence: List[Any] = []
    timeline: List[Any] = []

    class Config:
        from_attributes = True

# Fraud Alert Schema
class FraudAlertOut(BaseModel):
    id: str
    claim_id: str
    claim_number: Optional[str] = None
    severity: str
    title: str
    description: str
    timestamp: datetime
    status: str
    confidence_pct: float

    class Config:
        from_attributes = True

# Audit Log Schema
class AuditLogOut(BaseModel):
    id: str
    user_id: str
    user_name: str
    user_role: Optional[str] = None
    action: str
    resource: str
    ip_address: str
    timestamp: datetime
    status: str
    details: str

    class Config:
        from_attributes = True

# Notification Schema
class NotificationOut(BaseModel):
    id: str
    type: str
    title: str
    message: str
    timestamp: datetime
    read: bool
    severity: str
    link: Optional[str] = None

    class Config:
        from_attributes = True
