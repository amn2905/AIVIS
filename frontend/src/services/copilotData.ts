import { 
  ExpertAgentOpinion, 
  MultiAgentConflictResolution, 
  SHAPFeatureAttribution, 
  LIMEExplanation, 
  CopilotChatMessage, 
  MultilingualReport 
} from '../types/copilot';

export const mock11ExpertOpinions: ExpertAgentOpinion[] = [
  {
    role: 'CHIEF_INVESTIGATOR',
    agentTitle: 'Chief Forensic Investigator Agent',
    avatarIconName: 'ShieldAlert',
    confidencePct: 96.5,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Overwhelming evidence indicates a coordinated staged collision with pre-arranged workshop billing.',
    reasoningChain: [
      'Multi-agent evidence alignment confirms stationary free-revving prior to reported impact.',
      'EXIF image timestamps mismatch official incident notice by 3 weeks.',
      'CAN Bus log reveals unauthenticated diagnostic injection 2 hours before claim intake.'
    ],
    supportingEvidenceIds: ['ev-sha-1', 'can-3', 'edr-8801'],
    actionableRecommendations: [
      'Deny claim under Section 4B (Policy Misrepresentation).',
      'Issue referral to State Insurance Fraud Bureau.'
    ]
  },
  {
    role: 'OBD_EXPERT',
    agentTitle: 'OBD Diagnostics Expert',
    avatarIconName: 'Cpu',
    confidencePct: 94.0,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Freeze-frame data confirms 4850 RPM engine rev at 0 km/h vehicle speed.',
    reasoningChain: ['PID 0x0C engine RPM reached 4850 with 0 vehicle motion.', 'Low battery voltage warning logged under load.'],
    supportingEvidenceIds: ['obd-freeze-frame-1'],
    actionableRecommendations: ['Inspect OBD port pigtail for hardware tap.']
  },
  {
    role: 'CAN_BUS_EXPERT',
    agentTitle: 'CAN Bus Cyber Expert',
    avatarIconName: 'Terminal',
    confidencePct: 98.2,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Signal Injection attack detected on high-speed CAN bus at 250Hz frequency.',
    reasoningChain: ['Frame ID 0x7DF injected from unauthenticated OBD dongle.'],
    supportingEvidenceIds: ['can-log-asc'],
    actionableRecommendations: ['Extract CAN log payload for criminal prosecution.']
  },
  {
    role: 'VEHICLE_DYNAMICS_EXPERT',
    agentTitle: 'Vehicle Dynamics Expert',
    avatarIconName: 'Activity',
    confidencePct: 92.5,
    verdict: 'SUSPICIOUS',
    findingsSummary: 'G-force accelerometers recorded zero side or rear impact deceleration vectors.',
    reasoningChain: ['0.02G peak acceleration contradicts reported 45 MPH collision impact.'],
    supportingEvidenceIds: ['telemetry-g-dump'],
    actionableRecommendations: ['Cross-reference bumper deformation elasticity.']
  },
  {
    role: 'CRASH_RECONSTRUCTION_EXPERT',
    agentTitle: 'Crash Reconstruction Expert',
    avatarIconName: 'Navigation',
    confidencePct: 95.0,
    verdict: 'FRAUDULENT',
    findingsSummary: 'EDR pre-crash 5-second stream shows zero brake switch actuation prior to stop.',
    reasoningChain: ['Vehicle brought to gradual stop 2 minutes before claimed rear impact timestamp.'],
    supportingEvidenceIds: ['edr-pre-crash-5s'],
    actionableRecommendations: ['Reconstruct collision trajectory in 3D physics solver.']
  },
  {
    role: 'INSURANCE_COMPLIANCE_EXPERT',
    agentTitle: 'Insurance Compliance Expert',
    avatarIconName: 'FileCheck',
    confidencePct: 98.0,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Policy bind date preceded first notice of loss by only 18 hours.',
    reasoningChain: ['Comprehensive coverage tier bound on July 27; claim filed July 28.'],
    supportingEvidenceIds: ['policy-bind-doc'],
    actionableRecommendations: ['Enforce 30-day pre-existing damage exclusion clause.']
  },
  {
    role: 'FRAUD_ANALYST',
    agentTitle: 'Syndicate Fraud Analyst',
    avatarIconName: 'Users',
    confidencePct: 96.8,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Policyholder phone number matched to Tri-State Fraud Ring Syndicate #881.',
    reasoningChain: ['Phone +1 555-019-9941 shared between policyholder and body shop owner.'],
    supportingEvidenceIds: ['syndicate-graph-ring-881'],
    actionableRecommendations: ['Cross-reference all 14 linked claims in graph.']
  },
  {
    role: 'DIGITAL_EVIDENCE_EXAMINER',
    agentTitle: 'Digital Evidence Examiner',
    avatarIconName: 'Lock',
    confidencePct: 99.0,
    verdict: 'FRAUDULENT',
    findingsSummary: 'EXIF metadata header edited; photo taken 3 weeks prior in different state.',
    reasoningChain: ['SHA-256 vault lock verified EXIF original capture date of July 4.'],
    supportingEvidenceIds: ['ev-sha-1'],
    actionableRecommendations: ['Lock evidence in immutable vault.']
  },
  {
    role: 'DOCUMENT_EXAMINER',
    agentTitle: 'Document OCR Examiner',
    avatarIconName: 'FileText',
    confidencePct: 98.2,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Repair shop invoice contains spliced font embeddings on estimate line items.',
    reasoningChain: ['Total bill line item font mismatch identified by OCR vision parser.'],
    supportingEvidenceIds: ['ocr-invoice-88201'],
    actionableRecommendations: ['Subpoena body shop accounting ledgers.']
  },
  {
    agentTitle: 'Computer Vision Damage Expert',
    role: 'COMPUTER_VISION_EXPERT',
    avatarIconName: 'Eye',
    confidencePct: 95.8,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Visual damage is cosmetic $1,800 bumper dent; $68,500 total loss bill is inflated.',
    reasoningChain: ['Bounding box vision model detected zero frame or quarter-panel crumple.'],
    supportingEvidenceIds: ['vision-bbox-901'],
    actionableRecommendations: ['Re-appraise vehicle using independent AI estimate.']
  },
  {
    role: 'LEGAL_ADVISOR',
    agentTitle: 'Enterprise Legal Advisor',
    avatarIconName: 'Scale',
    confidencePct: 99.5,
    verdict: 'FRAUDULENT',
    findingsSummary: 'Case file meets statutory burden of proof for criminal insurance fraud denial.',
    reasoningChain: ['Multi-agent consensus + cryptographic evidence guarantees litigation readiness.'],
    supportingEvidenceIds: ['full-dossier-clm-8801'],
    actionableRecommendations: ['Draft formal denial letter with anti-fraud warning.']
  }
];

export const mockConflictResolution: MultiAgentConflictResolution = {
  claimId: 'clm-8801',
  consensusScore: 97.2,
  conflictsIdentified: [
    {
      agentsInvolved: ['VEHICLE_DYNAMICS_EXPERT', 'CHIEF_INVESTIGATOR'],
      topic: 'Impact G-Force Magnitude Interpretation',
      resolution: 'Vehicle Dynamics Expert noted low 0.02G force while Chief Investigator confirmed zero physical impact occurred. Conflict resolved: Zero impact event occurred.'
    }
  ],
  finalUnifiedVerdict: 'FRAUDULENT',
  executiveSummary: 'Multi-agent AI orchestration reached 97.2% consensus on fraudulent claim intent. Staged collision with fake workshop invoice confirmed.',
  investigatorNarrative: 'On July 28, 2026, policyholder Robert Sterling reported total loss collision claim CLM-2026-8801 for $68,500 USD. Multi-agent forensic evaluation revealed that the vehicle was stationary free-revved at 4850 RPM, CAN signal injection was performed via OBD dongle, EXIF image capture preceded the claim by 3 weeks, and the body shop shares a private phone number with the claimant. Claim recommended for full denial.'
};

export const mockSHAPAttributions: SHAPFeatureAttribution[] = [
  { featureName: 'EXIF Image Capture Date Mismatch', category: 'IMAGE_EXIF', shapValue: 0.34, featureValue: '24 days prior', description: 'Photo taken 3 weeks before reported crash' },
  { featureName: 'CAN Bus Diagnostic Signal Injection', category: 'CAN_BUS', shapValue: 0.28, featureValue: '0x7DF @ 250Hz', description: 'Unauthenticated diagnostic flooding' },
  { featureName: 'Odometer Rollback Signal', category: 'TELEMATICS', shapValue: 0.22, featureValue: '-15,900 miles', description: 'Odometer altered before claim' },
  { featureName: 'Shared Phone Number with Body Shop', category: 'CLAIM_HISTORY', shapValue: 0.18, featureValue: '+1 (555) 019-9941', description: 'Claimant & workshop share phone' },
  { featureName: 'Policy Binding Proximity', category: 'CLAIM_HISTORY', shapValue: 0.12, featureValue: '18 hours', description: 'Policy bound 18h before claim' }
];

export const mockLIMEExplanation: LIMEExplanation = {
  claimId: 'clm-8801',
  baseRiskScore: 15,
  predictedRiskScore: 94,
  topAttributions: mockSHAPAttributions
};

export const mockCopilotChatHistory: CopilotChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'COPILOT_AI',
    message: 'Hello Analyst Vance. I have analyzed Case CLM-2026-8801 across 11 AI Forensic Agents. High fraud risk (94/100) detected due to EXIF timestamp mismatch and CAN signal injection. How can I assist your investigation?',
    timestamp: '12:00 PM',
    suggestedFollowups: [
      'Why was this claim marked high risk?',
      'Show evidence supporting odometer tampering.',
      'Summarize crash evidence.',
      'Generate executive denial narrative.'
    ]
  }
];

export const mockMultilingualReports: Record<string, MultilingualReport> = {
  EN: {
    claimId: 'clm-8801',
    language: 'EN',
    title: 'AIVIS FORENSIC INVESTIGATION REPORT — CLM-2026-8801',
    executiveSummary: 'Investigation confirms 97.2% consensus on fraudulent claim staging.',
    findingsSection: '1. EXIF Mismatch\n2. CAN Signal Injection\n3. Inflated Body Shop Invoice',
    legalConclusion: 'Claim recommended for total denial under statutory insurance fraud provisions.',
    generatedAt: '2026-08-02T12:45:00Z'
  },
  ES: {
    claimId: 'clm-8801',
    language: 'ES',
    title: 'INFORME DE INVESTIGACIÓN FORENSE AIVIS — CLM-2026-8801',
    executiveSummary: 'La investigación confirma un consenso del 97,2% sobre simulación de colisión fraudulenta.',
    findingsSection: '1. Discrepancia EXIF\n2. Inyección de señal CAN\n3. Factura de taller inflada',
    legalConclusion: 'Recomendación de denegación total según cláusulas de fraude de seguro.',
    generatedAt: '2026-08-02T12:45:00Z'
  },
  DE: {
    claimId: 'clm-8801',
    language: 'DE',
    title: 'AIVIS FORENSISCHER UNTERSUCHUNGSBERICHT — CLM-2026-8801',
    executiveSummary: 'Die Untersuchung bestätigt eine 97,2%ige Übereinstimmung hinsichtlich vorgetäuschtem Unfall.',
    findingsSection: '1. EXIF-Zeitstempel-Abweichung\n2. CAN-Bus Signal-Injektion\n3. Überhöhte Werkstattrechnung',
    legalConclusion: 'Empfehlung zur vollständigen Ablehnung gemäß Versicherungsbetrugsklausel.',
    generatedAt: '2026-08-02T12:45:00Z'
  }
};
