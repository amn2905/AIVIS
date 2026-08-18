export type ExpertRole = 
  | 'CHIEF_INVESTIGATOR'
  | 'OBD_EXPERT'
  | 'CAN_BUS_EXPERT'
  | 'VEHICLE_DYNAMICS_EXPERT'
  | 'CRASH_RECONSTRUCTION_EXPERT'
  | 'INSURANCE_COMPLIANCE_EXPERT'
  | 'FRAUD_ANALYST'
  | 'DIGITAL_EVIDENCE_EXAMINER'
  | 'DOCUMENT_EXAMINER'
  | 'COMPUTER_VISION_EXPERT'
  | 'LEGAL_ADVISOR';

export interface ExpertAgentOpinion {
  role: ExpertRole;
  agentTitle: string;
  avatarIconName: string;
  confidencePct: number; // 0 - 100
  verdict: 'FRAUDULENT' | 'HIGH_RISK' | 'SUSPICIOUS' | 'LEGITIMATE' | 'INCONCLUSIVE';
  findingsSummary: string;
  reasoningChain: string[];
  supportingEvidenceIds: string[];
  actionableRecommendations: string[];
  dissentingOpinion?: string;
}

export interface MultiAgentConflictResolution {
  claimId: string;
  consensusScore: number; // 0 - 100
  conflictsIdentified: {
    agentsInvolved: ExpertRole[];
    topic: string;
    resolution: string;
  }[];
  finalUnifiedVerdict: 'FRAUDULENT' | 'HIGH_RISK' | 'APPROVED' | 'REJECTED';
  executiveSummary: string;
  investigatorNarrative: string;
}

export interface SHAPFeatureAttribution {
  featureName: string;
  category: 'TELEMATICS' | 'IMAGE_EXIF' | 'CAN_BUS' | 'DOCUMENT' | 'CLAIM_HISTORY';
  shapValue: number; // + positive risk contribution, - negative risk
  featureValue: string | number;
  description: string;
}

export interface LIMEExplanation {
  claimId: string;
  baseRiskScore: number;
  predictedRiskScore: number;
  topAttributions: SHAPFeatureAttribution[];
}

export interface CopilotChatMessage {
  id: string;
  sender: 'USER' | 'COPILOT_AI';
  message: string;
  timestamp: string;
  referencedEvidence?: string[];
  suggestedFollowups?: string[];
}

export type SupportedLanguage = 'EN' | 'ES' | 'DE' | 'FR' | 'SE' | 'JA';

export interface MultilingualReport {
  claimId: string;
  language: SupportedLanguage;
  title: string;
  executiveSummary: string;
  findingsSection: string;
  legalConclusion: string;
  generatedAt: string;
}
