import { 
  mock11ExpertOpinions,
  mockConflictResolution,
  mockSHAPAttributions,
  mockLIMEExplanation,
  mockCopilotChatHistory,
  mockMultilingualReports
} from './copilotData';
import { 
  ExpertAgentOpinion,
  MultiAgentConflictResolution,
  SHAPFeatureAttribution,
  LIMEExplanation,
  CopilotChatMessage,
  MultilingualReport,
  SupportedLanguage
} from '../types/copilot';

const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms));

export class CopilotApiClient {
  public static async get11ExpertOpinions(): Promise<ExpertAgentOpinion[]> {
    await delay();
    return mock11ExpertOpinions;
  }

  public static async getConflictResolution(): Promise<MultiAgentConflictResolution> {
    await delay();
    return mockConflictResolution;
  }

  public static async getSHAPAttributions(): Promise<SHAPFeatureAttribution[]> {
    await delay();
    return mockSHAPAttributions;
  }

  public static async getLIMEExplanation(): Promise<LIMEExplanation> {
    await delay();
    return mockLIMEExplanation;
  }

  public static async sendCopilotQuery(query: string): Promise<CopilotChatMessage> {
    await delay(400);

    let replyMessage = `Based on forensic evaluation of Case CLM-2026-8801, multi-agent consensus indicates high fraud risk (94/100). Key evidence points: EXIF timestamp mismatch on photo 'rear_bumper_impact_raw.jpg', 250Hz CAN Bus signal injection (Frame 0x7DF), and shared phone number with body shop.`;

    if (query.toLowerCase().includes('high risk')) {
      replyMessage = `Claim CLM-2026-8801 was marked HIGH RISK (94/100) due to 5 primary factors:\n1. EXIF capture date (July 4) vs reported crash date (July 28).\n2. CAN Bus signal injection 2h prior to claim.\n3. Odometer tamper alert (-15,900 mi).\n4. Shared phone number between policyholder and Tri-State Auto Body Shop.\n5. Policy bound 18 hours before first notice of loss.`;
    } else if (query.toLowerCase().includes('odometer')) {
      replyMessage = `Odometer tampering evidence: CAN-Bus telematics dump recorded an odometer rollback signal from 24,100 miles down to 8,200 miles on 2026-07-28T02:00:00Z. Microcontroller EEPROM reflash confirmed by ECU Integrity Agent.`;
    } else if (query.toLowerCase().includes('crash evidence')) {
      replyMessage = `Crash Evidence Summary: EDR record edr-8801 logged impact direction of 180° (rear) with peak G-force of only 0.18G. Airbags were NOT deployed. Pre-crash 5-second stream confirms vehicle was stationary at 0 km/h with brake switch active.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'COPILOT_AI',
      message: replyMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      referencedEvidence: ['ev-sha-1', 'can-3', 'edr-8801'],
      suggestedFollowups: [
        'Generate executive denial narrative.',
        'Show money flow links for Tri-State Auto Body Shop.'
      ]
    };
  }

  public static async generateMultilingualReport(lang: SupportedLanguage): Promise<MultilingualReport> {
    await delay();
    return mockMultilingualReports[lang] || mockMultilingualReports['EN'];
  }
}
