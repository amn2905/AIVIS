import { 
  mockGraphNodes,
  mockGraphEdges,
  mockPageRankScores,
  mockLouvainCommunities,
  mockVINCloneAlerts,
  mockGhostPolicyAlerts,
  mockWorkshopProfiles,
  mockSurveyorProfiles,
  mockFraudSyndicates,
  mockMoneyFlowLinks
} from './intelligenceData';
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms));

export class IntelligenceApiClient {
  public static async getKnowledgeGraph(): Promise<{
    nodes: GraphNode[];
    edges: GraphEdge[];
  }> {
    await delay();
    return {
      nodes: mockGraphNodes,
      edges: mockGraphEdges
    };
  }

  public static async getGraphAlgorithms(): Promise<{
    pageRank: PageRankScore[];
    communities: LouvainCommunity[];
  }> {
    await delay();
    return {
      pageRank: mockPageRankScores,
      communities: mockLouvainCommunities
    };
  }

  public static async getVINAndPolicyDuplications(): Promise<{
    vinClones: VINCloneAlert[];
    ghostPolicies: GhostPolicyAlert[];
  }> {
    await delay();
    return {
      vinClones: mockVINCloneAlerts,
      ghostPolicies: mockGhostPolicyAlerts
    };
  }

  public static async getWorkshopAndSurveyorRisk(): Promise<{
    workshops: WorkshopRiskProfile[];
    surveyors: SurveyorRiskProfile[];
  }> {
    await delay();
    return {
      workshops: mockWorkshopProfiles,
      surveyors: mockSurveyorProfiles
    };
  }

  public static async getFraudSyndicates(): Promise<FraudSyndicate[]> {
    await delay();
    return mockFraudSyndicates;
  }

  public static async getMoneyFlows(): Promise<MoneyFlowLink[]> {
    await delay();
    return mockMoneyFlowLinks;
  }
}
