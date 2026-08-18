import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CommercialApiClient } from '../../services/commercialApiClient';
import { ExecutivePortfolioMetrics } from '../../types/commercial';
import { Shield, TrendingUp, Cpu, Activity, Globe, CheckCircle2 } from 'lucide-react';

export const ExecutivePortfolioDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ExecutivePortfolioMetrics | null>(null);

  useEffect(() => {
    CommercialApiClient.getExecutivePortfolioMetrics().then(setMetrics);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-600" />
          Executive Commercial Portfolio Dashboard & Model Accuracy
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Portfolio risk score, fraud trend forecast, AI precision/recall matrix, and operational pod health
        </p>
      </div>

      {metrics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-5 space-y-2 border-l-4 border-l-brand-600">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Insured Vehicles</span>
              <div className="text-3xl font-extrabold font-mono text-slate-900">{metrics.totalInsuredVehicles.toLocaleString()}</div>
              <p className="text-xs text-slate-500 font-mono">Carrier Enterprise Fleet</p>
            </Card>

            <Card className="p-5 space-y-2 border-l-4 border-l-purple-600">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Active Claims Portfolio Value</span>
              <div className="text-3xl font-extrabold font-mono text-purple-600">${(metrics.totalActiveClaimsValueUsd / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-slate-500 font-mono">Under Active Forensics</p>
            </Card>

            <Card className="p-5 space-y-2 border-l-4 border-l-rose-500">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Flagged Fraud Value</span>
              <div className="text-3xl font-extrabold font-mono text-rose-600">${(metrics.flaggedFraudValueUsd / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-slate-500 font-mono">Prevented Claim Loss</p>
            </Card>

            <Card className="p-5 space-y-2 border-l-4 border-l-emerald-500">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">AI Model F1 Score</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-600">{metrics.aiModelAccuracy.f1ScorePct}%</div>
              <p className="text-xs text-slate-500 font-mono">Precision: {metrics.aiModelAccuracy.precisionPct}% • Recall: {metrics.aiModelAccuracy.recallPct}%</p>
            </Card>
          </div>

          {/* System Health Section */}
          <Card className="p-6 bg-slate-900 text-white border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Cloud-Native Cluster & Pod Infrastructure Health
              </h3>
              <Badge variant="success">KUBERNETES ONLINE</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">API LATENCY</span>
                <span className="text-xl font-bold text-emerald-400">{metrics.operationalHealth.apiLatencyMs} ms</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">ACTIVE PODS</span>
                <span className="text-xl font-bold text-slate-100">{metrics.operationalHealth.activePodsCount} Pods</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">CPU UTILIZATION</span>
                <span className="text-xl font-bold text-slate-100">{metrics.operationalHealth.cpuUtilizationPct}%</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">RAM UTILIZATION</span>
                <span className="text-xl font-bold text-slate-100">{metrics.operationalHealth.ramUtilizationPct}%</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
