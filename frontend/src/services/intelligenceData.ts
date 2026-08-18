import { 
  GraphNode, 
  GraphEdge, 
  PageRankScore, 
  LouvainCommunity, 
  VINCloneAlert, 
  GhostPolicyAlert, 
  WorkshopRiskProfile, 
  SurveyorRiskProfile, 
  FraudSyndicate, 
  MoneyFlowLink 
} from '../types/intelligence';

export const mockGraphNodes: GraphNode[] = [
  // Vehicles
  { id: 'n-v1', type: 'VEHICLE', label: '2023 Corvette Stingray', subLabel: 'VIN: 1G1YC2D75H5104821', riskScore: 89, fraudNetworkScore: 94, isSuspect: true, metadata: { Plate: '7XYZ890', State: 'NY' }, x: 200, y: 150 },
  { id: 'n-v2', type: 'VEHICLE', label: '2024 Tesla Model S Plaid', subLabel: 'VIN: 5YJSA1E28MF984210', riskScore: 88, fraudNetworkScore: 91, isSuspect: true, metadata: { Plate: 'EV-882-99', State: 'CA' }, x: 450, y: 150 },

  // Owners & Drivers
  { id: 'n-o1', type: 'OWNER', label: 'Robert Sterling', subLabel: 'SSN-***-**-4912', riskScore: 92, fraudNetworkScore: 96, isSuspect: true, metadata: { ClaimsCount: 3, Address: 'Brooklyn, NY' }, x: 200, y: 300 },
  { id: 'n-o2', type: 'OWNER', label: 'David K. Miller', subLabel: 'SSN-***-**-8120', riskScore: 84, fraudNetworkScore: 88, isSuspect: true, metadata: { ClaimsCount: 2, Address: 'Los Angeles, CA' }, x: 450, y: 300 },

  // Policies & Claims
  { id: 'n-p1', type: 'INSURANCE_POLICY', label: 'Policy #POL-9920194', subLabel: 'Metropolitan Mutual', riskScore: 78, fraudNetworkScore: 82, isSuspect: false, metadata: { Premium: '$4,200/yr' }, x: 100, y: 220 },
  { id: 'n-c1', type: 'CLAIM', label: 'CLM-2026-8801', subLabel: 'Loss: $68,500 USD', riskScore: 92, fraudNetworkScore: 95, isSuspect: true, metadata: { Status: 'FRAUD_SUSPECTED' }, x: 320, y: 220 },

  // Entities: Workshop, Surveyor, Bank, Phone, IP
  { id: 'n-w1', type: 'REPAIR_SHOP', label: 'Tri-State Auto Body Shop', subLabel: 'Lic #NY-BODY-8821', riskScore: 96, fraudNetworkScore: 98, isSuspect: true, metadata: { InflationRatio: '280%' }, x: 320, y: 380 },
  { id: 'n-s1', type: 'SURVEYOR', label: 'Inspector James Vance', subLabel: 'Lic #SURV-9901', riskScore: 90, fraudNetworkScore: 94, isSuspect: true, metadata: { ApprovalRate: '98.5%' }, x: 450, y: 380 },
  { id: 'n-b1', type: 'BANK_ACCOUNT', label: 'Chase Bank (****4912)', subLabel: 'Payout Node', riskScore: 94, fraudNetworkScore: 97, isSuspect: true, metadata: { TotalPayouts: '$420,000' }, x: 200, y: 450 },
  { id: 'n-ph1', type: 'PHONE_NUMBER', label: '+1 (555) 019-9941', subLabel: 'Shared Telephony', riskScore: 95, fraudNetworkScore: 98, isSuspect: true, metadata: { LinkedEntities: 6 }, x: 320, y: 480 },
  { id: 'n-ip1', type: 'IP_ADDRESS', label: '192.168.1.104', subLabel: 'Shared ISP Gateway', riskScore: 88, fraudNetworkScore: 92, isSuspect: true, metadata: { SubmissionsCount: 14 }, x: 100, y: 380 }
];

export const mockGraphEdges: GraphEdge[] = [
  { id: 'e-1', sourceId: 'n-o1', targetId: 'n-v1', relationType: 'OWNS', weight: 1, isSuspicious: false },
  { id: 'e-2', sourceId: 'n-v1', targetId: 'n-p1', relationType: 'INSURED_BY', weight: 1, isSuspicious: false },
  { id: 'e-3', sourceId: 'n-o1', targetId: 'n-c1', relationType: 'FILED_CLAIM', weight: 3, isSuspicious: true },
  { id: 'e-4', sourceId: 'n-c1', targetId: 'n-w1', relationType: 'REPAIRED_BY', weight: 5, isSuspicious: true },
  { id: 'e-5', sourceId: 'n-c1', targetId: 'n-s1', relationType: 'INSPECTED_BY', weight: 4, isSuspicious: true },
  { id: 'e-6', sourceId: 'n-w1', targetId: 'n-b1', relationType: 'PAYOUT_TO', weight: 5, isSuspicious: true },
  { id: 'e-7', sourceId: 'n-o1', targetId: 'n-ph1', relationType: 'SHARED_PHONE', weight: 4, isSuspicious: true },
  { id: 'e-8', sourceId: 'n-w1', targetId: 'n-ph1', relationType: 'SHARED_PHONE', weight: 5, isSuspicious: true }, // Workshop sharing phone with policyholder!
  { id: 'e-9', sourceId: 'n-o1', targetId: 'n-ip1', relationType: 'SHARED_IP', weight: 3, isSuspicious: true },
  { id: 'e-10', sourceId: 'n-s1', targetId: 'n-ph1', relationType: 'SHARED_PHONE', weight: 4, isSuspicious: true } // Surveyor sharing phone with ring!
];

export const mockPageRankScores: PageRankScore[] = [
  { nodeId: 'n-w1', nodeLabel: 'Tri-State Auto Body Shop', nodeType: 'REPAIR_SHOP', pageRankScore: 0.284, centralityRank: 1, isMastermindCandidate: true },
  { nodeId: 'n-ph1', nodeLabel: '+1 (555) 019-9941', nodeType: 'PHONE_NUMBER', pageRankScore: 0.241, centralityRank: 2, isMastermindCandidate: true },
  { nodeId: 'n-b1', nodeLabel: 'Chase Bank (****4912)', nodeType: 'BANK_ACCOUNT', pageRankScore: 0.198, centralityRank: 3, isMastermindCandidate: true },
  { nodeId: 'n-s1', nodeLabel: 'Inspector James Vance', nodeType: 'SURVEYOR', pageRankScore: 0.142, centralityRank: 4, isMastermindCandidate: false },
  { nodeId: 'n-o1', nodeLabel: 'Robert Sterling', nodeType: 'OWNER', pageRankScore: 0.135, centralityRank: 5, isMastermindCandidate: false }
];

export const mockLouvainCommunities: LouvainCommunity[] = [
  {
    id: 'comm-1',
    communityName: 'Tri-State Phantom Collision Syndicate',
    memberNodeIds: ['n-v1', 'n-o1', 'n-c1', 'n-w1', 'n-s1', 'n-b1', 'n-ph1', 'n-ip1'],
    primaryTerritory: 'Brooklyn & Tri-State NY Metro',
    syndicateRiskScore: 96,
    totalFraudValueUsd: 1480000
  }
];

export const mockVINCloneAlerts: VINCloneAlert[] = [
  {
    id: 'vc-1',
    vin: '1G1YC2D75H5104821',
    makeModel: '2023 Chevrolet Corvette Stingray',
    registeredStates: ['NY (Active)', 'FL (Active)', 'TX (Active)'],
    activePoliciesCount: 3,
    carriersInvolved: ['Metropolitan Mutual', 'Apex Assurance', 'Suncoast Risk'],
    fraudRiskScore: 98,
    detectedAt: '2026-08-01T14:20:00Z'
  }
];

export const mockGhostPolicyAlerts: GhostPolicyAlert[] = [
  {
    id: 'gp-1',
    policyNumber: 'POL-9920194',
    vin: '1G1YC2D75H5104821',
    ownerName: 'Robert Sterling',
    duplicateCarrierCodes: ['MMI-US', 'AVA-UK'],
    totalPremiumUsd: 8400,
    fraudRiskScore: 94
  }
];

export const mockWorkshopProfiles: WorkshopRiskProfile[] = [
  {
    id: 'w-101',
    shopName: 'Tri-State Auto Body Shop',
    registrationNumber: 'NY-BODY-8821',
    city: 'Brooklyn, NY',
    totalClaimsHandled: 142,
    totalLossClaimsPct: 68.5,
    averageEstimateUsd: 58400,
    inflationRatioPct: 280,
    fraudRiskScore: 96,
    flaggedSyndicatesCount: 3
  }
];

export const mockSurveyorProfiles: SurveyorRiskProfile[] = [
  {
    id: 'surv-201',
    surveyorName: 'Inspector James Vance',
    licenseNumber: 'SURV-NY-9901',
    totalClaimsInspected: 88,
    approvalRatePct: 98.5,
    aiDiscrepancyOverridePct: 42.0,
    fraudRiskScore: 92,
    associatedWorkshops: ['Tri-State Auto Body Shop', 'Metro Crash Restoration']
  }
];

export const mockFraudSyndicates: FraudSyndicate[] = [
  {
    id: 'synd-1',
    ringName: 'Tri-State Phantom Collision Ring #881',
    codeName: 'OPERATION PHANTOM IMPACT',
    riskScore: 96,
    memberCount: 14,
    totalClaimLossUsd: 1480000,
    primaryLocation: 'New York / New Jersey',
    sharedAttributes: ['Shared Phone (+1 555-019-9941)', 'Shared IP 192.168.1.104', 'Common Bank Account'],
    keyNodeIds: ['n-w1', 'n-ph1', 'n-b1']
  }
];

export const mockMoneyFlowLinks: MoneyFlowLink[] = [
  {
    id: 'mf-1',
    sourceEntity: 'Metropolitan Mutual Payout Escrow',
    targetEntity: 'Tri-State Auto Body Shop',
    bankAccountMasked: 'Chase Bank (****4912)',
    amountUsd: 68500,
    timestamp: '2026-07-28T10:00:00Z',
    isFlagged: true,
    flagReason: 'Rapid payout to high-risk workshop sharing policyholder phone number'
  },
  {
    id: 'mf-2',
    sourceEntity: 'Tri-State Auto Body Shop',
    targetEntity: 'Inspector James Vance (Surveyor)',
    bankAccountMasked: 'Wells Fargo (****8820)',
    amountUsd: 5000,
    timestamp: '2026-07-28T11:30:00Z',
    isFlagged: true,
    flagReason: 'Unexplained kickback payment to field surveyor 90 mins after claim approval'
  }
];
