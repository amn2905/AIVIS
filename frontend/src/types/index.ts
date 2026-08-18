export type RoleType = 'SUPER_ADMIN' | 'CLAIMS_INVESTIGATOR' | 'FRAUD_ANALYST' | 'BRANCH_AUDITOR' | 'INSURANCE_ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: RoleType;
  companyId: string;
  companyName: string;
  branchId?: string;
  branchName?: string;
  avatarUrl?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  lastActive: string;
  permissions: string[];
}

export interface InsuranceCompany {
  id: string;
  code: string;
  name: string;
  taxId: string;
  country: string;
  headquarters: string;
  activeBranches: number;
  totalClaimsCount: number;
  status: 'ACTIVE' | 'SUSPENDED';
  contactEmail: string;
  createdAt: string;
}

export interface Branch {
  id: string;
  companyId: string;
  companyName: string;
  code: string;
  name: string;
  city: string;
  state: string;
  country: string;
  investigatorsCount: number;
  activeClaimsCount: number;
  status: 'ACTIVE' | 'INACTIVE';
  phone: string;
}

export type VehicleCategory = 'Sedan' | 'SUV' | 'Commercial Truck' | 'Heavy Equipment' | 'EV / Hybrid' | 'Motorcycle';

export interface TelematicsSummary {
  hardBrakingEvents: number;
  rapidAccelerationEvents: number;
  speedingIncidents: number;
  nighttimeMilesPct: number;
  lastKnownOdometer: number;
  odometerTamperAlert: boolean;
}

export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  registrationState: string;
  category: VehicleCategory;
  engineNumber: string;
  color: string;
  ownerName: string;
  ownerNationalId: string;
  stolenCheckStatus: 'CLEAR' | 'FLAGGED' | 'PENDING';
  riskScore: number;
  telematics?: TelematicsSummary;
}

export type ClaimStatus = 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'FRAUD_SUSPECTED' 
  | 'FIELD_INVESTIGATION' 
  | 'APPROVED' 
  | 'REJECTED';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface EvidenceItem {
  id: string;
  type: 'IMAGE' | 'TELEMATICS_LOG' | 'POLICE_REPORT' | 'STATEMENT' | 'AI_SCAN';
  title: string;
  fileUrl?: string;
  uploadedAt: string;
  aiAuthenticityScore: number; // 0 - 100
  notes: string;
}

export interface TimelineItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: string;
  type: 'SYSTEM' | 'INVESTIGATOR' | 'AI_TRIGGER' | 'STATUS_CHANGE';
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyNumber: string;
  companyId: string;
  companyName: string;
  branchId: string;
  branchName: string;
  vehicle: Vehicle;
  incidentDate: string;
  reportedDate: string;
  incidentLocation: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  incidentDescription: string;
  status: ClaimStatus;
  fraudScore: number; // 0 - 100
  riskLevel: RiskLevel;
  estimatedLossUsd: number;
  assignedInvestigatorId?: string;
  assignedInvestigatorName?: string;
  flaggedFactors: string[];
  evidence: EvidenceItem[];
  timeline: TimelineItem[];
}

export interface FraudAlert {
  id: string;
  claimId: string;
  claimNumber: string;
  severity: RiskLevel;
  title: string;
  description: string;
  timestamp: string;
  status: 'NEW' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  confidencePct: number;
}

export interface MonthlyClaimStat {
  month: string;
  totalClaims: number;
  fraudDetected: number;
  approvedClaims: number;
  lossPreventedUsd: number;
}

export interface VehicleCategoryStat {
  category: VehicleCategory;
  count: number;
  percentage: number;
  avgFraudScore: number;
}

export interface IncidentLocationMarker {
  id: string;
  locationName: string;
  country: string;
  lat: number;
  lng: number;
  claimCount: number;
  highRiskCount: number;
}

export interface DashboardOverviewStats {
  totalClaims: number;
  pendingClaims: number;
  activeInvestigations: number;
  fraudAlertsCount: number;
  totalLossPreventedUsd: number;
  fraudDetectionRatePct: number;
  claimsTrend: MonthlyClaimStat[];
  vehicleCategories: VehicleCategoryStat[];
  recentFraudAlerts: FraudAlert[];
  recentClaims: Claim[];
  mapMarkers: IncidentLocationMarker[];
  liveTimeline: TimelineItem[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
}

export interface NotificationItem {
  id: string;
  type: 'FRAUD_ALERT' | 'CLAIM_UPDATE' | 'ASSIGNMENT' | 'SYSTEM_SECURITY';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: RiskLevel;
  link?: string;
}
