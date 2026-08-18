export type OBDConnectionMode = 'USB' | 'BLUETOOTH' | 'WIFI' | 'FILE_IMPORT';

export interface OBDVehicleIdentity {
  vin: string;
  ecuId: string;
  protocol: string;
  calibrationId: string;
  hardwareVersion: string;
}

export interface OBDDiagnosticCodes {
  activeDtc: string[];
  pendingDtc: string[];
  permanentDtc: string[];
  freezeFrameData: Record<string, string | number>;
  readinessMonitors: Record<string, boolean>;
  milStatus: boolean;
}

export interface OBDSensorLiveReading {
  timestamp: string;
  rpm: number;
  engineLoadPct: number;
  runtimeSeconds: number;
  fuelRateLph: number;
  fuelLevelPct: number;
  coolantTempC: number;
  intakeAirTempC: number;
  mapKpa: number;
  mafGps: number;
  throttlePosPct: number;
  ignitionTimingDeg: number;
  batteryVoltageV: number;
  alternatorVoltageV: number;
}

export interface OBDHealthReport {
  overallHealthScore: number;
  milTriggered: boolean;
  totalDtcsFound: number;
  criticalAnomalies: string[];
  recommendedActions: string[];
  generatedAt: string;
}

export type SensorCategory = 
  | 'ENGINE' 
  | 'ELECTRICAL' 
  | 'TRANSMISSION' 
  | 'BRAKE_CHASSIS' 
  | 'SAFETY' 
  | 'ENVIRONMENTAL' 
  | 'TPMS';

export interface SensorMetric {
  id: string;
  category: SensorCategory;
  name: string;
  currentValue: number;
  unit: string;
  expectedRange: { min: number; max: number };
  deviationPct: number;
  healthScore: number;
  confidenceScore: number;
  trend: 'STABLE' | 'RISING' | 'FALLING' | 'VOLATILE';
  historicalData: { time: string; val: number }[];
  anomalyScore: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  rootCause?: string;
}

export interface SensorCorrelationAnomaly {
  id: string;
  title: string;
  sensorsInvolved: string[];
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  confidencePct: number;
  impactScore: number;
}

export interface CANFrame {
  id: string;
  frameIdHex: string;
  timestampMs: number;
  payloadHex: string;
  priority: number;
  busLoadPct: number;
  signalFrequencyHz: number;
  ecuName: string;
  decodedSignal?: {
    speedKmh?: number;
    rpm?: number;
    steeringAngleDeg?: number;
    brakePedalPct?: number;
  };
}

export type CANAttackType = 'REPLAY_ATTACK' | 'SIGNAL_INJECTION' | 'BUS_FLOODING' | 'MESSAGE_SPOOFING' | 'UNEXPECTED_ECU';

export interface CANSecurityThreat {
  id: string;
  type: CANAttackType;
  frameIdHex: string;
  confidencePct: number;
  description: string;
  detectedAtMs: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface ECUProfile {
  id: string;
  ecuName: string;
  hardwarePartNumber: string;
  firmwareVersion: string;
  calibrationHash: string;
  softwareVersion: string;
  storedVin: string;
  chassisVin: string;
  vinMatch: boolean;
  programmingHistoryCount: number;
  lastFlashedAt: string;
  faultHistory: string[];
  integrityScore: number;
  tamperingDetected: boolean;
  tamperingType?: 'UNAUTHORIZED_FLASH' | 'ECU_SWAP' | 'CONFIG_MANIPULATION' | 'NONE';
}

export interface EDRPreCrashSample {
  timeSeconds: number;
  speedKmh: number;
  brakeSwitchActive: boolean;
  throttlePct: number;
  steeringAngleDeg: number;
  yawRateDegSec: number;
  longitudinalG: number;
  lateralG: number;
}

export interface EDRCrashRecord {
  id: string;
  impactDirectionDegrees: number;
  peakGForce: number;
  airbagDeployed: boolean;
  airbagDeploymentMs: number;
  driverSeatbeltBuckled: boolean;
  passengerSeatbeltBuckled: boolean;
  occupantDetected: boolean;
  collisionSeverityIndex: number;
  impactConfidenceScore: number;
  preCrashStream: EDRPreCrashSample[];
}

export interface GPSTripPoint {
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  speedKmh: number;
  timestamp: string;
  eventFlag?: 'HARSH_BRAKE' | 'RAPID_ACCEL' | 'STOP' | 'NORMAL';
}

export interface EvidenceArtifact {
  id: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: string;
  uploaderName: string;
  uploaderRole: string;
  caseNumber: string;
  evidenceNumber: string;
  hashes: {
    sha256: string;
    sha512: string;
    md5: string;
  };
  metadata: {
    exifDate?: string;
    gpsLocation?: { lat: number; lng: number };
    deviceModel?: string;
  };
  isLocked: boolean;
  verificationStatus: 'VALIDATED' | 'HASH_MISMATCH' | 'UNVERIFIED';
  chainOfCustody: { timestamp: string; action: string; actor: string }[];
}

export interface OCRDocumentResult {
  id: string;
  docType: 'INSURANCE_POLICY' | 'VEHICLE_REGISTRATION' | 'DRIVERS_LICENSE' | 'REPAIR_INVOICE' | 'POLICE_REPORT';
  fileName: string;
  extractedFields: Record<string, string | number>;
  confidencePct: number;
  forgeryDetected: boolean;
  forgeryType?: 'METADATA_EDITS' | 'FONT_ANOMALY' | 'DISCREPANCY_MISMATCH' | 'NONE';
  flaggedAnomalies: string[];
}

export interface DamageBoundingBox {
  id: string;
  label: string;
  confidencePct: number;
  severity: 'MAJOR' | 'MODERATE' | 'MINOR';
  affectedPart: string;
  estimatedCostUsd: number;
  box: { xPct: number; yPct: number; widthPct: number; heightPct: number };
}

export interface AIDamageAssessment {
  id: string;
  imageUrl: string;
  vehicleMakeModel: string;
  overallDamageSeverity: 'TOTAL_LOSS' | 'SEVERE' | 'MODERATE' | 'MINOR';
  totalEstimatedRepairCostUsd: number;
  detectedDamages: DamageBoundingBox[];
  airbagDeploymentDetected: boolean;
  floodWaterlineDetected: boolean;
  fireBurnDetected: boolean;
  confidenceScore: number;
}

export type AIAgentType = 
  | 'VEHICLE_IDENTITY' 
  | 'POLICY_VERIFICATION' 
  | 'OBD_ANALYSIS' 
  | 'SENSOR_INTELLIGENCE' 
  | 'CAN_BUS' 
  | 'ECU_INTEGRITY' 
  | 'CRASH_ANALYSIS' 
  | 'DAMAGE_VISION' 
  | 'OCR_DOCUMENT' 
  | 'TIMELINE' 
  | 'FRAUD_CORRELATION';

export interface AIAgentFinding {
  agentType: AIAgentType;
  agentName: string;
  confidencePct: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  reasoning: string[];
  evidenceUsed: string[];
  recommendations: string[];
}

export interface UnifiedInvestigationReport {
  id: string;
  claimId: string;
  overallFraudRiskScore: number;
  orchestrationSummary: string;
  agentFindings: AIAgentFinding[];
  generatedAt: string;
}

export interface ForensicEventTimelineItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  source: 'OBD' | 'CAN_BUS' | 'ECU' | 'EDR' | 'GPS' | 'EVIDENCE' | 'USER_ACTION';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  linkedEvidenceId?: string;
}
