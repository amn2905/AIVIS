export type GraphNodeType = 
  | 'VEHICLE' 
  | 'OWNER' 
  | 'DRIVER' 
  | 'INSURANCE_POLICY' 
  | 'CLAIM' 
  | 'REPAIR_SHOP' 
  | 'SURVEYOR' 
  | 'INVESTIGATOR' 
  | 'PHONE_NUMBER' 
  | 'EMAIL' 
  | 'BANK_ACCOUNT' 
  | 'GPS_LOCATION' 
  | 'IP_ADDRESS' 
  | 'DEVICE' 
  | 'DOCUMENT';

export interface GraphNode {
  id: string;
  type: GraphNodeType;
  label: string;
  subLabel?: string;
  riskScore: number; // 0 - 100
  fraudNetworkScore: number; // 0 - 100
  isSuspect: boolean;
  metadata: Record<string, string | number | boolean>;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationType: string; // 'OWNS', 'INSURED_BY', 'FILED_CLAIM', 'REPAIRED_BY', 'INSPECTED_BY', 'SHARED_IP', 'SHARED_PHONE', 'PAYOUT_TO'
  weight: number;
  isSuspicious: boolean;
}

export interface PageRankScore {
  nodeId: string;
  nodeLabel: string;
  nodeType: GraphNodeType;
  pageRankScore: number; // 0.0 to 1.0
  centralityRank: number;
  isMastermindCandidate: boolean;
}

export interface LouvainCommunity {
  id: string;
  communityName: string;
  memberNodeIds: string[];
  primaryTerritory: string;
  syndicateRiskScore: number;
  totalFraudValueUsd: number;
}

export interface ShortestPathResult {
  sourceNodeId: string;
  targetNodeId: string;
  pathNodeIds: string[];
  pathLength: number;
  suspiciousHopsCount: number;
}

export interface VINCloneAlert {
  id: string;
  vin: string;
  makeModel: string;
  registeredStates: string[];
  activePoliciesCount: number;
  carriersInvolved: string[];
  fraudRiskScore: number;
  detectedAt: string;
}

export interface GhostPolicyAlert {
  id: string;
  policyNumber: string;
  vin: string;
  ownerName: string;
  duplicateCarrierCodes: string[];
  totalPremiumUsd: number;
  fraudRiskScore: number;
}

export interface WorkshopRiskProfile {
  id: string;
  shopName: string;
  registrationNumber: string;
  city: string;
  totalClaimsHandled: number;
  totalLossClaimsPct: number;
  averageEstimateUsd: number;
  inflationRatioPct: number; // e.g. 280% vs market avg
  fraudRiskScore: number;
  flaggedSyndicatesCount: number;
}

export interface SurveyorRiskProfile {
  id: string;
  surveyorName: string;
  licenseNumber: string;
  totalClaimsInspected: number;
  approvalRatePct: number;
  aiDiscrepancyOverridePct: number;
  fraudRiskScore: number;
  associatedWorkshops: string[];
}

export interface FraudSyndicate {
  id: string;
  ringName: string;
  codeName: string;
  riskScore: number;
  memberCount: number;
  totalClaimLossUsd: number;
  primaryLocation: string;
  sharedAttributes: string[];
  keyNodeIds: string[];
}

export interface MoneyFlowLink {
  id: string;
  sourceEntity: string;
  targetEntity: string;
  bankAccountMasked: string;
  amountUsd: number;
  timestamp: string;
  isFlagged: boolean;
  flagReason?: string;
}
