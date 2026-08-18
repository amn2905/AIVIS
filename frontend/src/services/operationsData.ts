import { 
  InvestigationTask, 
  SLARecord, 
  DigitalSignatureRecord, 
  ComplianceStandardScore, 
  ChainOfCustodyReport, 
  CaseComment, 
  CaseVersionHistory 
} from '../types/operations';

export const mockTasks: InvestigationTask[] = [
  {
    id: 'task-101',
    claimId: 'clm-8801',
    title: 'Extract & Decode High-Speed CAN Bus ASC Log',
    description: 'Parse 250Hz CAN payload 0x7DF for injection frames and frequency spikes.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    assigneeName: 'Alex Vance',
    assigneeRole: 'Lead Cyber Investigator',
    dueDate: '2026-08-03T18:00:00Z',
    category: 'CAN_DUMP',
    checklistItems: [
      { id: 'c1', text: 'Verify PCAP log SHA-256 hash', isDone: true },
      { id: 'c2', text: 'Filter Frame ID 0x7DF injection burst', isDone: true },
      { id: 'c3', text: 'Cross-reference ECU programming timestamp', isDone: false }
    ]
  },
  {
    id: 'task-102',
    claimId: 'clm-8801',
    title: 'Verify EXIF Header Metadata & GPS Tags',
    description: 'Confirm camera serial number and EXIF capture timestamp mismatch.',
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    assigneeName: 'Elena Rostova',
    assigneeRole: 'Digital Evidence Examiner',
    dueDate: '2026-08-03T14:00:00Z',
    category: 'EXIF_VERIFICATION',
    checklistItems: [
      { id: 'c4', text: 'Extract EXIF offset date 2026-07-04', isDone: true },
      { id: 'c5', text: 'Lock evidence in immutable vault', isDone: true }
    ]
  },
  {
    id: 'task-103',
    claimId: 'clm-8801',
    title: 'Draft Formal Insurance Fraud Denial Letter',
    description: 'Synthesize 11 multi-agent AI findings into statutory denial document.',
    status: 'BACKLOG',
    priority: 'HIGH',
    assigneeName: 'Marcus Sterling',
    assigneeRole: 'Senior Legal Counsel',
    dueDate: '2026-08-04T12:00:00Z',
    category: 'LEGAL_DENIAL',
    checklistItems: [
      { id: 'c6', text: 'Attach Cryptographic Chain of Custody certificate', isDone: false }
    ]
  }
];

export const mockSLARecords: SLARecord[] = [
  {
    id: 'sla-1',
    claimId: 'clm-8801',
    claimNumber: 'CLM-2026-8801',
    stageName: '48h Telematics Audit Stage',
    slaDeadline: '2026-08-02T16:00:00Z',
    remainingMinutes: 42,
    isBreached: false,
    priorityScore: 94,
    assignedInvestigator: 'Alex Vance',
    escalationStatus: 'WARNED'
  },
  {
    id: 'sla-2',
    claimId: 'clm-9920',
    claimNumber: 'CLM-2026-9920',
    stageName: '72h Legal Notice Stage',
    slaDeadline: '2026-08-01T10:00:00Z',
    remainingMinutes: -420,
    isBreached: true,
    priorityScore: 98,
    assignedInvestigator: 'Marcus Sterling',
    escalationStatus: 'ESCALATED_TO_CRO'
  }
];

export const mockDigitalSignatures: DigitalSignatureRecord[] = [
  {
    id: 'sig-901',
    claimId: 'clm-8801',
    evidenceId: 'ev-sha-1',
    signerName: 'Chief Alex Vance',
    signerRole: 'Lead Forensic Examiner',
    signatureAlgorithm: 'RSA-2048',
    signatureHashHex: 'a9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    timestamp: '2026-08-02T10:30:00Z',
    verificationStatus: 'VALIDATED',
    approvalStage: 'FORENSIC_VERDICT'
  }
];

export const mockComplianceScores: ComplianceStandardScore[] = [
  {
    standardCode: 'ISO_27001',
    standardName: 'ISO/IEC 27001 — Information Security Management System (ISMS)',
    compliancePct: 98.4,
    passedControls: 112,
    totalControls: 114,
    status: 'COMPLIANT',
    lastAuditedAt: '2026-08-01T00:00:00Z'
  },
  {
    standardCode: 'ISO_21434',
    standardName: 'ISO/SAE 21434 — Road Vehicles Cybersecurity Engineering',
    compliancePct: 96.2,
    passedControls: 84,
    totalControls: 87,
    status: 'COMPLIANT',
    lastAuditedAt: '2026-08-01T00:00:00Z'
  },
  {
    standardCode: 'NIST_CSF',
    standardName: 'NIST Cybersecurity Framework v2.0 (Identify, Protect, Detect, Respond, Recover)',
    compliancePct: 99.1,
    passedControls: 108,
    totalControls: 109,
    status: 'COMPLIANT',
    lastAuditedAt: '2026-08-01T00:00:00Z'
  },
  {
    standardCode: 'ISO_27037',
    standardName: 'ISO/IEC 27037 — Guidelines for Identification, Collection, Acquisition & Preservation of Digital Evidence',
    compliancePct: 100.0,
    passedControls: 45,
    totalControls: 45,
    status: 'COMPLIANT',
    lastAuditedAt: '2026-08-02T00:00:00Z'
  }
];

export const mockChainOfCustody: ChainOfCustodyReport = {
  evidenceId: 'ev-sha-1',
  evidenceName: 'rear_bumper_impact_raw.jpg',
  sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  sha512Hash: 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd165d',
  custodyEvents: [
    { timestamp: '2026-07-28T09:14:00Z', actor: 'Elena Rostova', role: 'Evidence Tech', action: 'Acquired & Vault Locked' },
    { timestamp: '2026-07-28T10:00:00Z', actor: 'Alex Vance', role: 'Lead Examiner', action: 'EXIF Metadata Analysis' },
    { timestamp: '2026-08-02T10:30:00Z', actor: 'Marcus Sterling', role: 'Legal Counsel', action: 'Digital Signature Signed' }
  ],
  complianceVerified: true
};

export const mockCaseComments: CaseComment[] = [
  {
    id: 'comm-1',
    claimId: 'clm-8801',
    authorName: 'Elena Rostova',
    authorRole: 'Digital Evidence Examiner',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    commentText: '@alex.vance I verified EXIF tag 0x9003. Capture date was 2026-07-04 in Miami, FL. Clear date manipulation.',
    mentions: ['@alex.vance'],
    timestamp: '2 hours ago'
  },
  {
    id: 'comm-2',
    claimId: 'clm-8801',
    authorName: 'Alex Vance',
    authorRole: 'Lead Cyber Investigator',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    commentText: '@marcus.sterling CAN bus signal injection confirmed on 0x7DF. Proceeding with statutory denial draft.',
    mentions: ['@marcus.sterling'],
    timestamp: '1 hour ago'
  }
];

export const mockVersionHistory: CaseVersionHistory[] = [
  {
    versionId: 'v3.2',
    timestamp: '2026-08-02T10:30:00Z',
    actorName: 'Alex Vance',
    changeSummary: 'Signed forensic verdict with RSA-2048 digital signature',
    fieldsModified: ['approvalStage', 'verdictStatus']
  },
  {
    versionId: 'v3.1',
    timestamp: '2026-07-28T14:20:00Z',
    actorName: 'Elena Rostova',
    changeSummary: 'Uploaded cryptographic evidence asset rear_bumper_impact_raw.jpg',
    fieldsModified: ['evidenceVaultCount']
  }
];
