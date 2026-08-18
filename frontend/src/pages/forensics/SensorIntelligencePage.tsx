import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { SensorMetric, SensorCorrelationAnomaly, SensorCategory } from '../../types/forensics';
import { Activity, ShieldAlert, Cpu, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

export const SensorIntelligencePage: React.FC = () => {
  const [metrics, setMetrics] = useState<SensorMetric[]>([]);
  const [correlations, setCorrelations] = useState<SensorCorrelationAnomaly[]>([]);
  const [healthScore, setHealthScore] = useState(100);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    ForensicsApiClient.getSensorIntelligence().then(res => {
      setMetrics(res.metrics);
      setCorrelations(res.correlations);
      setHealthScore(res.healthScore);
    });
  }, []);

  const categories = ['ALL', 'ENGINE', 'ELECTRICAL', 'TRANSMISSION', 'BRAKE_CHASSIS', 'SAFETY', 'ENVIRONMENTAL', 'TPMS'];

  const filteredMetrics = metrics.filter(m => activeCategory === 'ALL' || m.category === activeCategory);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-600" />
          AI Sensor Intelligence Engine
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Real-time sensor metrics evaluation, anomaly scoring, and multi-sensor correlation rules
        </p>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-l-4 border-l-brand-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Vehicle Health Index</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-brand-600">{healthScore} / 100</div>
          <p className="text-xs text-slate-500 mt-2 font-mono">Computed from 32 live vehicle sensor PIDs.</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-500">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Correlated Anomalies</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-rose-600">{correlations.length} Active</div>
          <p className="text-xs text-rose-700 mt-2 font-mono">High confidence fraud triggers detected.</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">AI Confidence Score</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-purple-600">96.8%</div>
          <p className="text-xs text-slate-500 mt-2 font-mono">Neural sensor model validation.</p>
        </Card>
      </div>

      {/* Multi-Sensor Correlation Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Layers className="w-4 h-4 text-rose-600" />
            Multi-Sensor Anomaly Correlation Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {correlations.map(c => (
            <div key={c.id} className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h4 className="text-xs font-bold text-slate-900 font-mono">{c.title}</h4>
                </div>
                <Badge variant="danger">{c.severity}</Badge>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{c.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-rose-200/60 text-[11px] font-mono">
                <span className="text-slate-500">Sensors: {c.sensorsInvolved.join(' • ')}</span>
                <span className="font-bold text-rose-700">Confidence: {c.confidencePct}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md border transition-all ${
              activeCategory === cat
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sensor Metrics Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Sensor Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Expected Range</TableHead>
              <TableHead>Deviation %</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Root Cause Analysis</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredMetrics.map(m => (
              <TableRow key={m.id}>
                <TableCell className="font-bold text-xs text-slate-900">{m.name}</TableCell>
                <TableCell>
                  <Badge variant="purple" size="sm">{m.category}</Badge>
                </TableCell>
                <TableCell className="font-mono font-bold text-xs text-slate-900">
                  {m.currentValue} {m.unit}
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-500">
                  {m.expectedRange.min} - {m.expectedRange.max} {m.unit}
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-rose-600">
                  {m.deviationPct > 0 ? `+${m.deviationPct}%` : `${m.deviationPct}%`}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  <span className={`font-bold ${m.healthScore > 80 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {m.healthScore} / 100
                  </span>
                </TableCell>
                <TableCell>
                  <RiskBadge level={m.severity} />
                </TableCell>
                <TableCell className="text-xs text-slate-600 max-w-xs">{m.rootCause}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
