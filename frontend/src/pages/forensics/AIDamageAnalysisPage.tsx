import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { AIDamageAssessment } from '../../types/forensics';
import { Eye, ShieldAlert, Upload, Cpu, DollarSign, Image } from 'lucide-react';

export const AIDamageAnalysisPage: React.FC = () => {
  const [dmg, setDmg] = useState<AIDamageAssessment | null>(null);

  useEffect(() => {
    ForensicsApiClient.getAIDamageAssessment().then(setDmg);
  }, []);

  if (!dmg) return null;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-600" />
            AI Computer Vision Damage Assessment
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Automated image bounding box detection, damage severity rating, and repair cost calculation
          </p>
        </div>
        <Button variant="primary" icon={<Upload className="w-4 h-4" />}>
          Analyze Vehicle Image / Dashcam
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-brand-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">AI EST. REPAIR COST</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-1">
            ${dmg.totalEstimatedRepairCostUsd.toLocaleString()} USD
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Claimant Invoiced: $68,500</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">DAMAGE SEVERITY</span>
          <div className="text-xl font-extrabold font-mono text-amber-700 mt-1">{dmg.overallDamageSeverity}</div>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">AI VISION CONFIDENCE</span>
          <div className="text-2xl font-extrabold font-mono text-purple-600 mt-1">{dmg.confidenceScore}%</div>
        </Card>

        <Card className="p-4 border-l-4 border-l-rose-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">DISCREPANCY ALERT</span>
          <div className="text-xs font-extrabold font-mono text-rose-600 mt-1">INFLATED BILL DETECTED</div>
        </Card>
      </div>

      {/* Bounding Box Image Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Computer Vision Bounding Box Overlay</CardTitle>
          <span className="text-xs font-mono text-slate-400">{dmg.vehicleMakeModel}</span>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-80 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
            <img src={dmg.imageUrl} alt="Vehicle Impact" className="w-full h-full object-cover opacity-80" />

            {/* Bounding Box 1 */}
            <div className="absolute border-2 border-amber-500 bg-amber-500/20 rounded p-1 text-[10px] font-mono font-bold text-amber-300" style={{ left: '20%', top: '40%', width: '35%', height: '25%' }}>
              Bumper Cover Dent (94.5%)
            </div>

            {/* Bounding Box 2 */}
            <div className="absolute border-2 border-emerald-500 bg-emerald-500/20 rounded p-1 text-[10px] font-mono font-bold text-emerald-300" style={{ left: '60%', top: '35%', width: '20%', height: '15%' }}>
              Taillight Scratch (91.2%)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Damage Breakdown Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Detected Defect</TableHead>
              <TableHead>Affected Vehicle Part</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Confidence %</TableHead>
              <TableHead className="text-right">Estimated Repair Cost</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {dmg.detectedDamages.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono font-bold text-xs text-slate-900">{b.label}</TableCell>
                <TableCell className="text-xs text-slate-800">{b.affectedPart}</TableCell>
                <TableCell>
                  <Badge variant="warning" size="sm">{b.severity}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-700">{b.confidencePct}%</TableCell>
                <TableCell className="text-right font-mono font-bold text-xs text-slate-900">
                  ${b.estimatedCostUsd.toLocaleString()} USD
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
