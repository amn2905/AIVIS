export type TaskStatus = 'BACKLOG' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED';

export type TaskPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface InvestigationTask {
  id: string;
  claimId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeName: string;
  assigneeRole: string;
  dueDate: string;
  checklistItems: { id: string; text: string; isDone: boolean }[];
  category: 'OBD_SWEEP' | 'CAN_DUMP' | 'EXIF_VERIFICATION' | 'SURVEYOR_AUDIT' | 'LEGAL_DENIAL';
}

export interface SLARecord {
  id: string;
  claimId: string;
  claimNumber: string;
  stageName: string;
  slaDeadline: string;
  remainingMinutes: number;
  isBreached: boolean;
  priorityScore: number;
  assignedInvestigator: string;
  escalationStatus: 'NORMAL' | 'WARNED' | 'ESCALATED_TO_CRO';
}

export interface DigitalSignatureRecord {
  id: string;
  claimId: string;
  evidenceId: string;
  signerName: string;
  signerRole: string;
  signatureAlgorithm: 'RSA-2048' | 'ECDSA-P256';
  signatureHashHex: string;
  timestamp: string;
  verificationStatus: 'VALIDATED' | 'REVOKED' | 'EXPIRED';
  approvalStage: 'PRELIMINARY_EVIDENCE' | 'FORENSIC_VERDICT' | 'LEGAL_DENIAL_APPROVAL';
}

export interface ComplianceStandardScore {
  standardCode: 'ISO_27001' | 'ISO_21434' | 'NIST_CSF' | 'ISO_27037';
  standardName: string;
  compliancePct: number; // 0 - 100
  passedControls: number;
  totalControls: number;
  status: 'COMPLIANT' | 'NEEDS_REVIEW' | 'NON_COMPLIANT';
  lastAuditedAt: string;
}

export interface ChainOfCustodyReport {
  evidenceId: string;
  evidenceName: string;
  sha256Hash: string;
  sha512Hash: string;
  custodyEvents: { timestamp: string; actor: string; role: string; action: string }[];
  complianceVerified: boolean;
}

export interface CaseComment {
  id: string;
  claimId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  commentText: string;
  mentions: string[]; // e.g. ['@alex.vance', '@legal.lead']
  timestamp: string;
}

export interface CaseVersionHistory {
  versionId: string;
  timestamp: string;
  actorName: string;
  changeSummary: string;
  fieldsModified: string[];
}
