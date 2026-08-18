import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { CopilotApiClient } from '../../services/copilotApiClient';
import { ExpertAgentOpinion, MultiAgentConflictResolution, MultilingualReport, SupportedLanguage } from '../../types/copilot';
import { Sparkles, Cpu, ShieldAlert, CheckCircle2, Globe, FileText, Scale, Download } from 'lucide-react';

export const AICopilotWorkbenchPage: React.FC = () => {
  const [opinions, setOpinions] = useState<ExpertAgentOpinion[]>([]);
  const [resolution, setResolution] = useState<MultiAgentConflictResolution | null>(null);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('EN');
  const [report, setReport] = useState<MultilingualReport | null>(null);

  useEffect(() => {
    CopilotApiClient.get11ExpertOpinions().then(setOpinions);
    CopilotApiClient.getConflictResolution().then(setResolution);
    CopilotApiClient.generateMultilingualReport('EN').then(setReport);
  }, []);

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    const rep = await CopilotApiClient.generateMultilingualReport(lang);
    setReport(rep);
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-600" />
          Ask AIVIS — 11 Specialized AI Experts & Debating Chamber
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Ask questions about any vehicle investigation using natural language. Multi-agent debate & consensus.
        </p>
      </div>

      {/* Landing Hero Screen Card */}
      <Card className="p-8 bg-slate-900 text-white border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 border border-brand-400/30 rounded-full text-brand-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AIVIS — Your AI Vehicle Investigation Assistant</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight font-mono text-slate-100">
            Ask AIVIS
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Ask AIVIS is the conversational AI interface for the AIVIS platform. It enables investigators to query vehicle data, digital evidence, sensor telemetry, OBD diagnostics, CAN Bus logs, ECU analysis, EDR crash data, GPS history, OCR results, fraud indicators, timelines, and investigation reports using natural language.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {[
              'Why was this claim marked as High Risk?',
              'Show all OBD fault codes.',
              'Explain the ECU integrity score.',
              'Was the odometer likely tampered with?',
              'Compare damage assessment with repair estimate.',
              'Summarize the crash timeline.',
              'Show evidence supporting fraud detection.',
              'Generate an executive investigation summary.'
            ].map((eg, idx) => (
              <div key={idx} className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-slate-300 font-medium flex items-center gap-2 cursor-pointer transition-colors">
                <span className="text-brand-400">⚡</span>
                <span className="truncate">{eg}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Conflict Resolution Banner */}
      {resolution && (
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-brand-600" />
                <h3 className="text-base font-bold font-mono text-slate-900">Ask AIVIS Multi-Agent Conflict Resolution Synthesis</h3>
                <Badge variant="danger">VERDICT: {resolution.finalUnifiedVerdict}</Badge>
              </div>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed mt-1">{resolution.executiveSummary}</p>
            </div>

            <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 text-center shrink-0">
              <span className="text-[10px] font-bold text-brand-700 font-mono block uppercase">AGENT CONSENSUS</span>
              <span className="text-4xl font-extrabold font-mono text-brand-700">{resolution.consensusScore}%</span>
            </div>
          </div>
        </Card>
      )}

      {/* Multilingual Report Generator Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-600" />
            <CardTitle>Ask AIVIS Multilingual Executive Report Generator</CardTitle>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            {(['EN', 'ES', 'DE', 'FR', 'SE', 'JA'] as SupportedLanguage[]).map(lang => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded border transition-all ${
                  selectedLang === lang
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </CardHeader>
        {report && (
          <CardContent className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-50 border rounded-lg space-y-2">
              <h4 className="text-sm font-bold text-slate-900">{report.title}</h4>
              <p className="text-slate-700 leading-relaxed font-sans">{report.executiveSummary}</p>
              <div className="pt-2 text-slate-600 whitespace-pre-line font-sans">{report.findingsSection}</div>
            </div>
            <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
              Export Multilingual Report ({selectedLang})
            </Button>
          </CardContent>
        )}
      </Card>

      {/* 11 Expert Opinions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opinions.map(op => (
          <Card key={op.role} className="p-5 border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                {op.role}
              </span>
              <RiskBadge level={op.verdict === 'FRAUDULENT' ? 'CRITICAL' : 'HIGH'} />
            </div>

            <h4 className="text-xs font-bold text-slate-900 font-mono">{op.agentTitle}</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">{op.findingsSummary}</p>

            <div className="space-y-1 pt-2 border-t border-slate-100 font-mono text-[11px]">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Reasoning Chain</span>
              {op.reasoningChain.map((r, i) => (
                <div key={i} className="text-slate-600">• {r}</div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t">
              <span>Evidences: {op.supportingEvidenceIds.join(', ')}</span>
              <span className="font-bold text-brand-600">Conf: {op.confidencePct}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
