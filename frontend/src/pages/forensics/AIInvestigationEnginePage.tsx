import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { UnifiedInvestigationReport } from '../../types/forensics';
import { Cpu, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const AIInvestigationEnginePage: React.FC = () => {
  const [report, setReport] = useState<UnifiedInvestigationReport | null>(null);

  useEffect(() => {
    ForensicsApiClient.getUnifiedAIReport().then(setReport);
  }, []);

  if (!report) return null;

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-600" />
          Multi-Agent AI Investigation Engine Orchestration
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Unified synthesis across 11 specialized AI forensic agents
        </p>
      </div>

      {/* Fraud Risk Index Banner */}
      <Card className="p-6 bg-slate-900 text-white border-slate-800 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <h3 className="text-base font-bold font-mono text-slate-100">Unified Orchestration Report</h3>
              <Badge variant="danger">HIGH RISK CASE</Badge>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">{report.orchestrationSummary}</p>
          </div>

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center shrink-0">
            <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">OVERALL FRAUD RISK INDEX</span>
            <span className="text-5xl font-extrabold font-mono text-rose-500">{report.overallFraudRiskScore}</span>
            <span className="text-xs text-slate-400 font-mono block mt-1">/ 100 Risk Score</span>
          </div>
        </div>
      </Card>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {report.agentFindings.map(agent => (
          <Card key={agent.agentType} className="p-5 border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-600" />
                <h4 className="text-xs font-bold text-slate-900 font-mono">{agent.agentName}</h4>
              </div>
              <RiskBadge level={agent.riskLevel} />
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed">{agent.summary}</p>

            {/* Reasoning list */}
            <div className="space-y-1 pt-2 border-t border-slate-100 text-xs font-mono">
              <span className="text-slate-400 text-[10px] block uppercase font-bold">Reasoning Chain</span>
              {agent.reasoning.map((r, idx) => (
                <div key={idx} className="text-slate-600 text-[11px]">• {r}</div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t">
              <span>Evidence: {agent.evidenceUsed.join(', ')}</span>
              <span className="font-bold text-brand-700">Confidence: {agent.confidencePct}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
