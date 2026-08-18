import { 
  OBDVehicleIdentity, 
  OBDDiagnosticCodes, 
  OBDSensorLiveReading, 
  OBDHealthReport,
  SensorMetric, 
  SensorCorrelationAnomaly,
  CANFrame, 
  CANSecurityThreat,
  ECUProfile, 
  EDRCrashRecord, 
  GPSTripPoint, 
  EvidenceArtifact, 
  OCRDocumentResult, 
  AIDamageAssessment, 
  UnifiedInvestigationReport, 
  ForensicEventTimelineItem 
} from '../types/forensics';

export const mockOBDIdentity: OBDVehicleIdentity = {
  vin: '1G1YC2D75H5104821',
  ecuId: 'ECU-CHEV-CORVETTE-Z51-0982',
  protocol: 'ISO 15765-4 (CAN 11-bit ID, 500 kbit/s)',
  calibrationId: 'CAL-GM-8849102-V4',
  hardwareVersion: 'HW-882910-GM-A'
};

export const mockOBDDiagnostics: OBDDiagnosticCodes = {
  activeDtc: ['P0300 — Random/Multiple Cylinder Misfire Detected', 'P0101 — MAF Sensor Range/Performance Problem'],
  pendingDtc: ['P0420 — Catalyst System Efficiency Below Threshold'],
  permanentDtc: ['P0300'],
  freezeFrameData: {
    'Engine RPM': 4850,
    'Calculated Load': '84.5%',
    'Vehicle Speed': '94 km/h',
    'Coolant Temp': '108 °C',
    'Fuel Pressure': '380 kPa'
  },
  readinessMonitors: {
    'Misfire': true,
    'Fuel System': true,
    'Components': true,
    'Catalyst': false,
    'Evaporative System': false,
    'Oxygen Sensor': true
  },
  milStatus: true
};

export const mockOBDSensorReading: OBDSensorLiveReading = {
  timestamp: 'Just now',
  rpm: 4850,
  engineLoadPct: 84.5,
  runtimeSeconds: 1420,
  fuelRateLph: 14.2,
  fuelLevelPct: 42.0,
  coolantTempC: 108,
  intakeAirTempC: 38,
  mapKpa: 140,
  mafGps: 42.8,
  throttlePosPct: 68.0,
  ignitionTimingDeg: 14.5,
  batteryVoltageV: 11.4, // Low voltage warning
  alternatorVoltageV: 12.1
};

export const mockOBDHealthReport: OBDHealthReport = {
  overallHealthScore: 62,
  milTriggered: true,
  totalDtcsFound: 3,
  criticalAnomalies: [
    'Battery voltage drop to 11.4V while engine under 84% load',
    'Mass Air Flow (MAF) sensor reading deviates by 32% from expected volumetric flow'
  ],
  recommendedActions: [
    'Inspect alternator diode bridge for ripple current leak',
    'Verify intake manifold vacuum seals for unmetered air intake'
  ],
  generatedAt: '2026-08-02T12:00:00Z'
};

export const mockSensorMetrics: SensorMetric[] = [
  {
    id: 'sen-1',
    category: 'ENGINE',
    name: 'Engine RPM',
    currentValue: 4850,
    unit: 'RPM',
    expectedRange: { min: 650, max: 3500 },
    deviationPct: 38.5,
    healthScore: 58,
    confidenceScore: 94,
    trend: 'VOLATILE',
    historicalData: [
      { time: '12:00', val: 750 },
      { time: '12:01', val: 2400 },
      { time: '12:02', val: 4850 },
      { time: '12:03', val: 4850 }
    ],
    anomalyScore: 82,
    severity: 'HIGH',
    rootCause: 'High RPM detected while transmission sensor indicated Neutral gear position.'
  },
  {
    id: 'sen-2',
    category: 'ELECTRICAL',
    name: 'Battery Voltage',
    currentValue: 11.4,
    unit: 'V',
    expectedRange: { min: 13.6, max: 14.8 },
    deviationPct: -18.2,
    healthScore: 42,
    confidenceScore: 98,
    trend: 'FALLING',
    historicalData: [
      { time: '12:00', val: 14.2 },
      { time: '12:01', val: 13.1 },
      { time: '12:02', val: 11.8 },
      { time: '12:03', val: 11.4 }
    ],
    anomalyScore: 91,
    severity: 'CRITICAL',
    rootCause: 'Electrical system voltage drop prior to crash event timestamp.'
  },
  {
    id: 'sen-3',
    category: 'BRAKE_CHASSIS',
    name: 'Longitudinal G-Force',
    currentValue: 0.02,
    unit: 'G',
    expectedRange: { min: -0.5, max: 0.5 },
    deviationPct: 0.0,
    healthScore: 95,
    confidenceScore: 99,
    trend: 'STABLE',
    historicalData: [
      { time: '12:00', val: 0.01 },
      { time: '12:01', val: 0.02 },
      { time: '12:02', val: 0.02 }
    ],
    anomalyScore: 88,
    severity: 'CRITICAL',
    rootCause: 'Zero G-force collision impulse recorded during claimed rear-end impact.'
  }
];

export const mockSensorCorrelations: SensorCorrelationAnomaly[] = [
  {
    id: 'corr-1',
    title: 'High RPM Engine Rev with Zero Wheel Speed',
    sensorsInvolved: ['Engine RPM', 'Wheel Speed FL/FR', 'Vehicle Speed'],
    description: 'Engine revved to 4850 RPM for 18 seconds while vehicle speed sensor recorded 0 km/h. Indicates stationary free revving.',
    severity: 'CRITICAL',
    confidencePct: 96.8,
    impactScore: 92
  },
  {
    id: 'corr-2',
    title: 'Claimed Hard Impact without Airbag Sensor Trigger',
    sensorsInvolved: ['Impact Accelerometer', 'Airbag Deployment Module', 'Seatbelt Pretensioner'],
    description: 'Claimant reported 60 MPH collision, but airbag control unit registered <0.2G peak deceleration and zero pyro deployment.',
    severity: 'CRITICAL',
    confidencePct: 98.4,
    impactScore: 95
  }
];

export const mockCANFrames: CANFrame[] = [
  {
    id: 'can-1',
    frameIdHex: '0x0C4',
    timestampMs: 142010,
    payloadHex: '02 48 20 00 00 00 FF 12',
    priority: 1,
    busLoadPct: 48.2,
    signalFrequencyHz: 100,
    ecuName: 'ECM (Engine Control Module)',
    decodedSignal: { speedKmh: 0, rpm: 4850, steeringAngleDeg: 12.4, brakePedalPct: 0 }
  },
  {
    id: 'can-2',
    frameIdHex: '0x1A0',
    timestampMs: 142020,
    payloadHex: '00 00 00 00 FE 88 12 00',
    priority: 2,
    busLoadPct: 48.2,
    signalFrequencyHz: 50,
    ecuName: 'ABS / ESC Module',
    decodedSignal: { speedKmh: 0, rpm: 0, steeringAngleDeg: 12.4, brakePedalPct: 100 }
  },
  {
    id: 'can-3',
    frameIdHex: '0x7DF',
    timestampMs: 142050,
    payloadHex: '02 01 0C 00 00 00 00 00',
    priority: 7,
    busLoadPct: 88.5, // High bus load
    signalFrequencyHz: 250,
    ecuName: 'UNKNOWN / External Injector Tool',
    decodedSignal: { speedKmh: 0, rpm: 0 }
  }
];

export const mockCANThreats: CANSecurityThreat[] = [
  {
    id: 'th-1',
    type: 'SIGNAL_INJECTION',
    frameIdHex: '0x7DF',
    confidencePct: 94.2,
    description: 'High-frequency (250Hz) OBD diagnostic query flooding detected from unauthenticated hardware tool.',
    detectedAtMs: 142050,
    severity: 'CRITICAL'
  },
  {
    id: 'th-2',
    type: 'REPLAY_ATTACK',
    frameIdHex: '0x0C4',
    confidencePct: 89.5,
    description: 'Exact payload byte repetition pattern matched to synthetic log replay.',
    detectedAtMs: 142100,
    severity: 'HIGH'
  }
];

export const mockECUProfile: ECUProfile = {
  id: 'ecu-101',
  ecuName: 'Primary Engine Control Module (ECM-1)',
  hardwarePartNumber: 'PN-12699210-GM',
  firmwareVersion: 'v4.18.2-PROD',
  calibrationHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  softwareVersion: 'SW-GM-2024-REL3',
  storedVin: '1G1YC2D75H5104821',
  chassisVin: '1G1YC2D75H5104821',
  vinMatch: true,
  programmingHistoryCount: 4,
  lastFlashedAt: '2026-07-26T18:22:00Z (2 days before incident)',
  faultHistory: ['FLASH_CHECKSUM_RECOMPUTED', 'UNAUTHORIZED_BENCH_READ'],
  integrityScore: 48,
  tamperingDetected: true,
  tamperingType: 'UNAUTHORIZED_FLASH'
};

export const mockEDRRecord: EDRCrashRecord = {
  id: 'edr-8801',
  impactDirectionDegrees: 180, // Rear impact
  peakGForce: 1.8,
  airbagDeployed: false,
  airbagDeploymentMs: 0,
  driverSeatbeltBuckled: true,
  passengerSeatbeltBuckled: false,
  occupantDetected: true,
  collisionSeverityIndex: 18, // Low severity
  impactConfidenceScore: 92.4,
  preCrashStream: [
    { timeSeconds: -5.0, speedKmh: 42, brakeSwitchActive: false, throttlePct: 35, steeringAngleDeg: 0, yawRateDegSec: 0.1, longitudinalG: 0.05, lateralG: 0.01 },
    { timeSeconds: -4.0, speedKmh: 40, brakeSwitchActive: false, throttlePct: 30, steeringAngleDeg: 0, yawRateDegSec: 0.1, longitudinalG: 0.04, lateralG: 0.01 },
    { timeSeconds: -3.0, speedKmh: 35, brakeSwitchActive: true, throttlePct: 0, steeringAngleDeg: -2, yawRateDegSec: -0.2, longitudinalG: -0.25, lateralG: 0.02 },
    { timeSeconds: -2.0, speedKmh: 12, brakeSwitchActive: true, throttlePct: 0, steeringAngleDeg: -4, yawRateDegSec: -0.4, longitudinalG: -0.65, lateralG: 0.03 },
    { timeSeconds: -1.0, speedKmh: 0, brakeSwitchActive: true, throttlePct: 0, steeringAngleDeg: 0, yawRateDegSec: 0, longitudinalG: 0.00, lateralG: 0.00 },
    { timeSeconds: 0.0, speedKmh: 0, brakeSwitchActive: true, throttlePct: 0, steeringAngleDeg: 0, yawRateDegSec: 0, longitudinalG: 0.18, lateralG: 0.02 },
  ]
};

export const mockGPSTripPoints: GPSTripPoint[] = [
  { latitude: 40.6782, longitude: -73.9442, altitudeMeters: 12, speedKmh: 48, timestamp: '2026-07-28T02:05:00Z', eventFlag: 'NORMAL' },
  { latitude: 40.6795, longitude: -73.9410, altitudeMeters: 12, speedKmh: 62, timestamp: '2026-07-28T02:08:00Z', eventFlag: 'RAPID_ACCEL' },
  { latitude: 40.6810, longitude: -73.9380, altitudeMeters: 14, speedKmh: 0, timestamp: '2026-07-28T02:10:00Z', eventFlag: 'STOP' },
  { latitude: 40.6810, longitude: -73.9380, altitudeMeters: 14, speedKmh: 0, timestamp: '2026-07-28T02:14:00Z', eventFlag: 'NORMAL' },
];

export const mockEvidenceArtifacts: EvidenceArtifact[] = [
  {
    id: 'ev-sha-1',
    fileName: 'rear_bumper_impact_raw.jpg',
    fileSizeBytes: 4820190,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-07-28T08:45:12Z',
    uploaderName: 'Robert Sterling',
    uploaderRole: 'Policyholder',
    caseNumber: 'CLM-2026-8801',
    evidenceNumber: 'EVD-99201-A',
    hashes: {
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      sha512: 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd165708ce85f4da99da16baa7f22960712483b',
      md5: '5d41402abc4b2a76b9719d911017c592'
    },
    metadata: {
      exifDate: '2026-07-04T14:22:00Z', // Mismatch!
      gpsLocation: { lat: 40.7128, lng: -74.0060 },
      deviceModel: 'iPhone 14 Pro'
    },
    isLocked: true,
    verificationStatus: 'VALIDATED',
    chainOfCustody: [
      { timestamp: '2026-07-28T08:45:12Z', action: 'EVIDENCE_UPLOAD', actor: 'Robert Sterling' },
      { timestamp: '2026-07-28T08:46:00Z', action: 'CRYPTOGRAPHIC_HASH_GENERATED', actor: 'AIVIS Security Vault' },
      { timestamp: '2026-07-28T09:15:00Z', action: 'EVIDENCE_LOCKED', actor: 'Sarah Chen (Analyst)' }
    ]
  }
];

export const mockOCRDocument: OCRDocumentResult = {
  id: 'ocr-101',
  docType: 'REPAIR_INVOICE',
  fileName: 'bodyshop_repair_estimate_july2026.pdf',
  extractedFields: {
    'Invoice Number': 'INV-88201',
    'Body Shop Name': 'Tri-State Auto Restoration',
    'VIN': '1G1YC2D75H5104821',
    'Subtotal Parts': 42500.00,
    'Labor Hours': 180,
    'Total Estimate USD': 68500.00
  },
  confidencePct: 98.2,
  forgeryDetected: true,
  forgeryType: 'FONT_ANOMALY',
  flaggedAnomalies: [
    'Font embedding mismatch detected on line "Total Estimate USD: $68,500.00"',
    'Invoice number sequence matched to known fraudulent repair ring template'
  ]
};

export const mockDamageAssessment: AIDamageAssessment = {
  id: 'dmg-901',
  imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
  vehicleMakeModel: '2023 Chevrolet Corvette Stingray',
  overallDamageSeverity: 'MODERATE',
  totalEstimatedRepairCostUsd: 14200, // Contradicts claimant $68,500 bill!
  detectedDamages: [
    {
      id: 'box-1',
      label: 'Bumper Cover Dent',
      confidencePct: 94.5,
      severity: 'MINOR',
      affectedPart: 'Rear Polyurethane Bumper',
      estimatedCostUsd: 1800,
      box: { xPct: 20, yPct: 40, widthPct: 35, heightPct: 25 }
    },
    {
      id: 'box-2',
      label: 'Taillight Lens Scratch',
      confidencePct: 91.2,
      severity: 'MINOR',
      affectedPart: 'Left Rear LED Lamp Assembly',
      estimatedCostUsd: 650,
      box: { xPct: 60, yPct: 35, widthPct: 20, heightPct: 15 }
    }
  ],
  airbagDeploymentDetected: false,
  floodWaterlineDetected: false,
  fireBurnDetected: false,
  confidenceScore: 95.8
};

export const mockUnifiedReport: UnifiedInvestigationReport = {
  id: 'rep-8801',
  claimId: 'clm-8801',
  overallFraudRiskScore: 94,
  orchestrationSummary: 'Comprehensive multi-agent forensic analysis completed. High probability of staged collision and inflated loss claim.',
  generatedAt: '2026-08-02T12:30:00Z',
  agentFindings: [
    {
      agentType: 'VEHICLE_IDENTITY',
      agentName: 'Vehicle Identity Agent',
      confidencePct: 99.0,
      riskLevel: 'LOW',
      summary: 'VIN 1G1YC2D75H5104821 matches ECU stored identity.',
      reasoning: ['OBD-II ECU Query returned matching VIN across all 3 modules.'],
      evidenceUsed: ['OBD-II PID 0x09'],
      recommendations: ['Identity verified. Proceed to sensor checks.']
    },
    {
      agentType: 'OBD_ANALYSIS',
      agentName: 'OBD Diagnostics Agent',
      confidencePct: 96.0,
      riskLevel: 'HIGH',
      summary: 'Freeze frame data shows high RPM stationary revving.',
      reasoning: ['Speed was 0 km/h while Engine RPM was 4850.'],
      evidenceUsed: ['OBD-II Freeze Frame 0x03'],
      recommendations: ['Flag for intentional mechanical strain.']
    },
    {
      agentType: 'CAN_BUS',
      agentName: 'CAN Bus Forensics Agent',
      confidencePct: 94.2,
      riskLevel: 'CRITICAL',
      summary: 'Signal Injection attack detected from unauthenticated hardware tool.',
      reasoning: ['250Hz diagnostic flooding frame 0x7DF injected into bus 2 hours before claim.'],
      evidenceUsed: ['CAN Log ASC File'],
      recommendations: ['Inspect OBD port for hardware dongle tampered pigtail.']
    },
    {
      agentType: 'ECU_INTEGRITY',
      agentName: 'ECU Integrity Agent',
      confidencePct: 98.0,
      riskLevel: 'CRITICAL',
      summary: 'Unauthorized ECU firmware reflash 2 days prior to reported crash.',
      reasoning: ['Checksum recomputed on 2026-07-26T18:22:00Z.'],
      evidenceUsed: ['ECU Memory Dump'],
      recommendations: ['Deny claim on terms of policy tampering clause.']
    },
    {
      agentType: 'DAMAGE_VISION',
      agentName: 'AI Damage Vision Agent',
      confidencePct: 95.8,
      riskLevel: 'CRITICAL',
      summary: 'Actual damage is minor cosmetic dent ($2,450). Invoice claiming $68,500 total loss is inflated.',
      reasoning: ['Computer Vision detected minor bumper scratch with zero structural frame bend.'],
      evidenceUsed: ['Image rear_bumper_impact_raw.jpg'],
      recommendations: ['Refer body shop to insurance fraud task force.']
    }
  ]
};

export const mockForensicTimeline: ForensicEventTimelineItem[] = [
  {
    id: 'ftl-1',
    timestamp: '2026-07-26T18:22:00Z',
    title: 'ECU Firmware Reflashed',
    description: 'Unauthorized ECM flash memory checksum updated via bench tool.',
    source: 'ECU',
    severity: 'CRITICAL'
  },
  {
    id: 'ftl-2',
    timestamp: '2026-07-28T02:05:00Z',
    title: 'Engine Started & Stationary Revving',
    description: 'RPM reached 4850 RPM while speed sensor held at 0 km/h.',
    source: 'OBD',
    severity: 'HIGH'
  },
  {
    id: 'ftl-3',
    timestamp: '2026-07-28T02:10:00Z',
    title: 'CAN Signal Injection Detected',
    description: 'Unauthenticated diagnostic frame 0x7DF injected at 250Hz.',
    source: 'CAN_BUS',
    severity: 'CRITICAL'
  },
  {
    id: 'ftl-4',
    timestamp: '2026-07-28T02:14:00Z',
    title: 'Claimed Collision Timestamp',
    description: 'EDR recorded minor 0.18G bump. Zero airbag deployment.',
    source: 'EDR',
    severity: 'MEDIUM'
  },
  {
    id: 'ftl-5',
    timestamp: '2026-07-28T08:45:12Z',
    title: 'Evidence Uploaded & Cryptographically Locked',
    description: 'Photo uploaded with SHA-256 hash 9f86d08188... Exif timestamp mismatch flagged.',
    source: 'EVIDENCE',
    severity: 'HIGH'
  }
];
