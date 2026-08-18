import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, RiskBadge, ClaimStatusBadge } from '../components/ui/Badge';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { ApiClient } from '../services/apiClient';
import { Claim } from '../types';
import { 
  FileSearch, 
  ShieldAlert, 
  Car, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  ArrowUpRight, 
  Download,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const mockSparklineData = [
  { name: 'Mon', claims: 12, fraud: 3 },
  { name: 'Tue', claims: 19, fraud: 5 },
  { name: 'Wed', claims: 15, fraud: 4 },
  { name: 'Thu', claims: 28, fraud: 9 },
  { name: 'Fri', claims: 22, fraud: 6 },
  { name: 'Sat', claims: 14, fraud: 2 },
  { name: 'Sun', claims: 18, fraud: 4 }
];

export const DashboardPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    ApiClient.getClaims().then(setClaims);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-indigo-600" />
            Executive SOC Dashboard & Command Center
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Real-time fraud intelligence, vehicle diagnostics, and multi-agent risk scoring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export SOC Report
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('/forensics/copilot')} icon={<Sparkles className="w-3.5 h-3.5 text-indigo-200" />}>
            Ask AIVIS Assistant
          </Button>
        </div>
      </div>

      {/* Top White Claymorphic KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5 space-y-3 border-l-4 border-l-indigo-600">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">ACTIVE CLAIM DOSSIERS</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-[#111827]">89</span>
            <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">Under Active Forensics</p>
        </Card>

        <Card className="p-5 space-y-3 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">CRITICAL FRAUD ALERTS</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-rose-600">14</span>
            <span className="text-xs font-mono font-bold text-rose-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +4 High Risk
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">$3.42M USD Prevented Loss</p>
        </Card>

        <Card className="p-5 space-y-3 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">VEHICLE HEALTH SCORE</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-[#111827]">68.4%</span>
            <span className="text-xs font-mono font-bold text-amber-600 flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" /> -3.1%
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">Telemetry Anomaly Index</p>
        </Card>

        <Card className="p-5 space-y-3 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">AI MODEL ACCURACY F1</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-emerald-600">97.3%</span>
            <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 11 Agents
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">Precision: 98.2% • Recall: 96.5%</p>
        </Card>
      </div>

      {/* Chart & Trend Section */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Claims Volume vs Fraud Risk Detections</CardTitle>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Total Claims</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Fraud Flagged</span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSparklineData}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="claims" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorClaims)" />
                <Area type="monotone" dataKey="fraud" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorFraud)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Claims DataGrid */}
      <Card hoverEffect={false} className="p-0">
        <CardHeader>
          <CardTitle>Recent Claim Investigation Dossiers</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onNavigate('/claims')}>
            View All Claims ({claims.length})
          </Button>
        </CardHeader>
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID & VIN</TableHead>
              <TableHead>Vehicle Specs</TableHead>
              <TableHead>Claimant Name</TableHead>
              <TableHead>Claim Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {claims.slice(0, 5).map(c => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="font-bold text-xs text-[#111827] font-mono">{c.claimNumber || c.id}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{c.vehicle?.vin || 'VIN-UNAVAIL'}</div>
                </TableCell>
                <TableCell className="font-semibold text-xs text-slate-800">{c.vehicle ? `${c.vehicle.year || ''} ${c.vehicle.make || ''} ${c.vehicle.model || ''}`.trim() : 'N/A'}</TableCell>
                <TableCell className="text-xs text-slate-700">{c.vehicle?.ownerName || 'Unknown Policyholder'}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#111827]">${(c.estimatedLossUsd ?? 0).toLocaleString()} USD</TableCell>
                <TableCell>
                  <ClaimStatusBadge status={c.status} />
                </TableCell>
                <TableCell>
                  <RiskBadge level={c.riskLevel} score={c.fraudScore} />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => onNavigate(`/claims/${c.id}`)}
                    className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors font-mono text-xs font-bold flex items-center gap-1"
                  >
                    Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
