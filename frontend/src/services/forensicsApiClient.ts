import { 
  mockOBDIdentity,
  mockOBDDiagnostics,
  mockOBDSensorReading,
  mockOBDHealthReport,
  mockSensorMetrics,
  mockSensorCorrelations,
  mockCANFrames,
  mockCANThreats,
  mockECUProfile,
  mockEDRRecord,
  mockGPSTripPoints,
  mockEvidenceArtifacts,
  mockOCRDocument,
  mockDamageAssessment,
  mockUnifiedReport,
  mockForensicTimeline
} from './forensicsData';
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms));

export class ForensicsApiClient {
  public static async getOBDSession(): Promise<{
    identity: OBDVehicleIdentity;
    diagnostics: OBDDiagnosticCodes;
    liveReading: OBDSensorLiveReading;
    healthReport: OBDHealthReport;
  }> {
    await delay();
    return {
      identity: mockOBDIdentity,
      diagnostics: mockOBDDiagnostics,
      liveReading: mockOBDSensorReading,
      healthReport: mockOBDHealthReport
    };
  }

  public static async getSensorIntelligence(): Promise<{
    metrics: SensorMetric[];
    correlations: SensorCorrelationAnomaly[];
    healthScore: number;
  }> {
    await delay();
    return {
      metrics: mockSensorMetrics,
      correlations: mockSensorCorrelations,
      healthScore: 58
    };
  }

  public static async getCANBusData(): Promise<{
    frames: CANFrame[];
    threats: CANSecurityThreat[];
  }> {
    await delay();
    return {
      frames: mockCANFrames,
      threats: mockCANThreats
    };
  }

  public static async getECUProfile(): Promise<ECUProfile> {
    await delay();
    return mockECUProfile;
  }

  public static async getEDRRecord(): Promise<EDRCrashRecord> {
    await delay();
    return mockEDRRecord;
  }

  public static async getGPSTelematics(): Promise<GPSTripPoint[]> {
    await delay();
    return mockGPSTripPoints;
  }

  public static async getEvidenceLocker(): Promise<EvidenceArtifact[]> {
    await delay();
    return mockEvidenceArtifacts;
  }

  public static async getOCRDocument(): Promise<OCRDocumentResult> {
    await delay();
    return mockOCRDocument;
  }

  public static async getAIDamageAssessment(): Promise<AIDamageAssessment> {
    await delay();
    return mockDamageAssessment;
  }

  public static async getUnifiedAIReport(): Promise<UnifiedInvestigationReport> {
    await delay();
    return mockUnifiedReport;
  }

  public static async getForensicTimeline(): Promise<ForensicEventTimelineItem[]> {
    await delay();
    return mockForensicTimeline;
  }
}
