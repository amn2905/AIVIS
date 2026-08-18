import { 
  mockTasks,
  mockSLARecords,
  mockDigitalSignatures,
  mockComplianceScores,
  mockChainOfCustody,
  mockCaseComments,
  mockVersionHistory
} from './operationsData';
import { 
  InvestigationTask, 
  SLARecord, 
  DigitalSignatureRecord, 
  ComplianceStandardScore, 
  ChainOfCustodyReport, 
  CaseComment, 
  CaseVersionHistory 
} from '../types/operations';

const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms));

export class OperationsApiClient {
  public static async getTasks(): Promise<InvestigationTask[]> {
    await delay();
    return mockTasks;
  }

  public static async getSLARecords(): Promise<SLARecord[]> {
    await delay();
    return mockSLARecords;
  }

  public static async getDigitalSignatures(): Promise<DigitalSignatureRecord[]> {
    await delay();
    return mockDigitalSignatures;
  }

  public static async getComplianceScores(): Promise<ComplianceStandardScore[]> {
    await delay();
    return mockComplianceScores;
  }

  public static async getChainOfCustodyReport(): Promise<ChainOfCustodyReport> {
    await delay();
    return mockChainOfCustody;
  }

  public static async getComments(): Promise<CaseComment[]> {
    await delay();
    return mockCaseComments;
  }

  public static async postComment(text: string): Promise<CaseComment> {
    await delay(300);
    const mentions = text.match(/@\w+(\.\w+)?/g) || [];
    return {
      id: `comm-${Date.now()}`,
      claimId: 'clm-8801',
      authorName: 'Alex Vance',
      authorRole: 'Lead Cyber Investigator',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      commentText: text,
      mentions,
      timestamp: 'Just now'
    };
  }

  public static async getVersionHistory(): Promise<CaseVersionHistory[]> {
    await delay();
    return mockVersionHistory;
  }
}
