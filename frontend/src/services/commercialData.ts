import { 
  OEMConnectorStatus, 
  PredictiveModelScore, 
  APIKeyRecord, 
  SaaSLicenseQuota, 
  ExecutivePortfolioMetrics 
} from '../types/commercial';

export const mockOEMConnectors: OEMConnectorStatus[] = [
  {
    id: 'oem-1',
    provider: 'TESLA',
    name: 'Tesla Fleet Telematics API',
    protocol: 'REST / Fleet WebSocket',
    status: 'ONLINE',
    lastPingMs: 14,
    activePayloadsCount: 4120,
    authType: 'OAUTH2',
    capabilities: ['Telemetry Data', 'Autopilot Log Stream', 'Battery SOC', 'Drive Vector']
  },
  {
    id: 'oem-2',
    provider: 'GM_ONSTAR',
    name: 'GM OnStar Vehicle Insights API',
    protocol: 'gRPC / MQTT',
    status: 'ONLINE',
    lastPingMs: 18,
    activePayloadsCount: 2890,
    authType: 'MTLS',
    capabilities: ['AACN Crash Telemetry', 'Airbag Deployment', 'Diagnostic DTC Stream']
  },
  {
    id: 'oem-3',
    provider: 'FORDPASS',
    name: 'FordPass Connect Telematics Gateway',
    protocol: 'REST API',
    status: 'ONLINE',
    lastPingMs: 22,
    activePayloadsCount: 1940,
    authType: 'OAUTH2',
    capabilities: ['SYNC Diagnostic Dump', 'Odometer Reading', 'Fuel Consumption Rate']
  },
  {
    id: 'oem-4',
    provider: 'GEOTAB',
    name: 'Geotab Enterprise Fleet Connector',
    protocol: 'REST / Webhook',
    status: 'ONLINE',
    lastPingMs: 12,
    activePayloadsCount: 8400,
    authType: 'API_KEY',
    capabilities: ['Engine Diagnostics', 'Driver Behavior', 'GPS Route Stream']
  },
  {
    id: 'oem-5',
    provider: 'GUIDEWIRE',
    name: 'Guidewire ClaimCenter Integration Bus',
    protocol: 'REST API',
    status: 'ONLINE',
    lastPingMs: 16,
    activePayloadsCount: 620,
    authType: 'OAUTH2',
    capabilities: ['Claim Auto-Creation', 'Policy Binding Sync', 'Denial Notice Trigger']
  }
];

export const mockPredictiveModelScore: PredictiveModelScore = {
  claimId: 'clm-8801',
  fraudProbabilityPct: 94.2,
  failureRiskPct: 88.5,
  predictedComponent: 'Primary Engine Transmission & ECU',
  estimatedRepairCostUsd: 68500,
  marketAverageCostUsd: 18200,
  costInflationPct: 276.3,
  predictedRepairDurationDays: 4.5,
  confidenceScore: 97.8
};

export const mockAPIKeys: APIKeyRecord[] = [
  {
    id: 'key-1',
    keyName: 'Metropolitan Production Backend API Key',
    apiKeyMasked: 'aivis_live_sk_9018...4912',
    ownerTenant: 'Metropolitan Mutual Insurance',
    createdAt: '2026-06-01T00:00:00Z',
    lastUsedAt: '2026-08-02T12:50:00Z',
    rateLimitRpm: 10000,
    status: 'ACTIVE'
  }
];

export const mockSaaSLicenseQuota: SaaSLicenseQuota = {
  tenantId: 'tenant-meta-01',
  companyName: 'Metropolitan Mutual Insurance',
  tier: 'ENTERPRISE_CARRIER',
  monthlyApiRequestLimit: 5000000,
  currentApiRequestCount: 1420800,
  activeUsersCount: 42,
  userSeatLimit: 100,
  activeClaimsCount: 89,
  claimLimit: 1000,
  renewalDate: '2027-01-01T00:00:00Z',
  billingStatus: 'ACTIVE'
};

export const mockExecutivePortfolioMetrics: ExecutivePortfolioMetrics = {
  totalInsuredVehicles: 142500,
  totalActiveClaimsValueUsd: 14850000,
  flaggedFraudValueUsd: 3420000,
  portfolioRiskScore: 82,
  aiModelAccuracy: {
    precisionPct: 98.2,
    recallPct: 96.5,
    f1ScorePct: 97.3
  },
  operationalHealth: {
    apiLatencyMs: 14,
    activePodsCount: 12,
    cpuUtilizationPct: 24.5,
    ramUtilizationPct: 41.2
  }
};
