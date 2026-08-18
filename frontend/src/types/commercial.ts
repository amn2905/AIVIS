export type OEMProvider = 'TESLA' | 'GM_ONSTAR' | 'FORDPASS' | 'BMW_CONNECTED' | 'GEOTAB' | 'GUIDEWIRE' | 'NMVTIS';

export interface OEMConnectorStatus {
  id: string;
  provider: OEMProvider;
  name: string;
  protocol: string; // REST API, gRPC, MQTT, Webhook
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  lastPingMs: number;
  activePayloadsCount: number;
  authType: 'OAUTH2' | 'API_KEY' | 'MTLS';
  capabilities: string[];
}

export interface PredictiveModelScore {
  claimId: string;
  fraudProbabilityPct: number; // 0 - 100
  failureRiskPct: number; // Component failure risk
  predictedComponent: string; // ECU, Transmission, Turbocharger
  estimatedRepairCostUsd: number;
  marketAverageCostUsd: number;
  costInflationPct: number;
  predictedRepairDurationDays: number;
  confidenceScore: number;
}

export interface APIKeyRecord {
  id: string;
  keyName: string;
  apiKeyMasked: string; // e.g. aivis_live_sk_...4912
  ownerTenant: string;
  createdAt: string;
  lastUsedAt: string;
  rateLimitRpm: number;
  status: 'ACTIVE' | 'REVOKED';
}

export interface SaaSLicenseQuota {
  tenantId: string;
  companyName: string;
  tier: 'ENTERPRISE_CARRIER' | 'FLEET_OPERATOR' | 'REGIONAL_BRANCH';
  monthlyApiRequestLimit: number;
  currentApiRequestCount: number;
  activeUsersCount: number;
  userSeatLimit: number;
  activeClaimsCount: number;
  claimLimit: number;
  renewalDate: string;
  billingStatus: 'ACTIVE' | 'OVERDUE' | 'TRIAL';
}

export interface ExecutivePortfolioMetrics {
  totalInsuredVehicles: number;
  totalActiveClaimsValueUsd: number;
  flaggedFraudValueUsd: number;
  portfolioRiskScore: number;
  aiModelAccuracy: {
    precisionPct: number;
    recallPct: number;
    f1ScorePct: number;
  };
  operationalHealth: {
    apiLatencyMs: number;
    activePodsCount: number;
    cpuUtilizationPct: number;
    ramUtilizationPct: number;
  };
}
