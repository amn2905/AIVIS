import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { CommercialApiClient } from '../../services/commercialApiClient';
import { PredictiveModelScore } from '../../types/commercial';
import { Cpu, Activity, TrendingUp, AlertTriangle, Clock, DollarSign } from 'lucide-react';

export const PredictiveIntelligencePage: React.FC = () => {
  const [score, setScore] = useState<PredictiveModelScore | null>(null);

  useEffect(() => {
    CommercialApiClient.getPredictiveModelScore().then(setScore);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-600" />
          Predictive Intelligence & Failure Risk Engine
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Claim fraud probability prediction, component failure forecasts, repair cost inflation, and cycle duration
        </p>
      </div>

      {score && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-5 space-y-2 border-l-4 border-l-rose-500">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Predictive Fraud Probability</span>
            <div className="text-3xl font-extrabold font-mono text-rose-600">{score.fraudProbabilityPct}%</div>
            <p className="text-xs text-slate-500 font-mono">Confidence: {score.confidenceScore}%</p>
          </Card>

          <Card className="p-5 space-y-2 border-l-4 border-l-amber-500">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Component Failure Forecast</span>
            <div className="text-3xl font-extrabold font-mono text-amber-600">{score.failureRiskPct}%</div>
            <p className="text-xs text-slate-500 font-mono">Predicted: {score.predictedComponent}</p>
          </Card>

          <Card className="p-5 space-y-2 border-l-4 border-l-purple-500">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Cost Inflation Ratio</span>
            <div className="text-3xl font-extrabold font-mono text-purple-600">+{score.costInflationPct}%</div>
            <p className="text-xs text-slate-500 font-mono">${score.estimatedRepairCostUsd.toLocaleString()} vs ${score.marketAverageCostUsd.toLocaleString()}</p>
          </Card>

          <Card className="p-5 space-y-2 border-l-4 border-l-brand-500">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Repair Cycle Duration</span>
            <div className="text-3xl font-extrabold font-mono text-brand-700">{score.predictedRepairDurationDays} Days</div>
            <p className="text-xs text-slate-500 font-mono">Estimated Bodyshop Turnaround</p>
          </Card>
        </div>
      )}
    </div>
  );
};
