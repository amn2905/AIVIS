import { 
  mockOEMConnectors,
  mockPredictiveModelScore,
  mockAPIKeys,
  mockSaaSLicenseQuota,
  mockExecutivePortfolioMetrics
} from './commercialData';
import { 
  OEMConnectorStatus, 
  PredictiveModelScore, 
  APIKeyRecord, 
  SaaSLicenseQuota, 
  ExecutivePortfolioMetrics 
} from '../types/commercial';

const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms));

export class CommercialApiClient {
  public static async getOEMConnectors(): Promise<OEMConnectorStatus[]> {
    await delay();
    return mockOEMConnectors;
  }

  public static async getPredictiveModelScore(): Promise<PredictiveModelScore> {
    await delay();
    return mockPredictiveModelScore;
  }

  public static async getAPIKeys(): Promise<APIKeyRecord[]> {
    await delay();
    return mockAPIKeys;
  }

  public static async generateAPIKey(name: string): Promise<APIKeyRecord> {
    await delay(300);
    return {
      id: `key-${Date.now()}`,
      keyName: name,
      apiKeyMasked: `aivis_live_sk_${Math.random().toString(36).substring(2, 8)}...8821`,
      ownerTenant: 'Metropolitan Mutual Insurance',
      createdAt: new Date().toISOString(),
      lastUsedAt: 'Never',
      rateLimitRpm: 5000,
      status: 'ACTIVE'
    };
  }

  public static async getSaaSLicenseQuota(): Promise<SaaSLicenseQuota> {
    await delay();
    return mockSaaSLicenseQuota;
  }

  public static async getExecutivePortfolioMetrics(): Promise<ExecutivePortfolioMetrics> {
    await delay();
    return mockExecutivePortfolioMetrics;
  }
}
