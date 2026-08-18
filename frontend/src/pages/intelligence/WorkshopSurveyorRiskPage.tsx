import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { IntelligenceApiClient } from '../../services/intelligenceApiClient';
import { WorkshopRiskProfile, SurveyorRiskProfile } from '../../types/intelligence';
import { Building2, UserCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export const WorkshopSurveyorRiskPage: React.FC = () => {
  const [workshops, setWorkshops] = useState<WorkshopRiskProfile[]>([]);
  const [surveyors, setSurveyors] = useState<SurveyorRiskProfile[]>([]);

  useEffect(() => {
    IntelligenceApiClient.getWorkshopAndSurveyorRisk().then(res => {
      setWorkshops(res.workshops);
      setSurveyors(res.surveyors);
    });
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand-600" />
          High-Risk Workshops & Compromised Surveyor Audit
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Body shop estimate inflation ratios, total-loss claim anomalies, and surveyor override rates
        </p>
      </div>

      {/* High-Risk Workshops Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Building2 className="w-4 h-4 text-rose-600" />
            Top Fraud-Flagged Repair Workshops
          </CardTitle>
          <Badge variant="danger">{workshops.length} HIGH RISK</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <TableContainer className="border-0">
            <TableHeader>
              <TableRow>
                <TableHead>Workshop Name & Reg #</TableHead>
                <TableHead>City Location</TableHead>
                <TableHead>Claims Handled</TableHead>
                <TableHead>Total Loss %</TableHead>
                <TableHead>Avg Estimate USD</TableHead>
                <TableHead>Inflation Ratio</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {workshops.map(w => (
                <TableRow key={w.id}>
                  <TableCell>
                    <div className="font-bold text-xs text-slate-900">{w.shopName}</div>
                    <div className="text-[11px] text-brand-600 font-mono">{w.registrationNumber}</div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-800">{w.city}</TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-900">{w.totalClaimsHandled}</TableCell>
                  <TableCell className="font-mono text-xs text-rose-600 font-bold">{w.totalLossClaimsPct}%</TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-900">${w.averageEstimateUsd.toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-xs text-rose-600 font-bold">{w.inflationRatioPct}% vs Market</TableCell>
                  <TableCell>
                    <RiskBadge level="CRITICAL" />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
        </CardContent>
      </Card>

      {/* High-Risk Surveyors Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            <UserCheck className="w-4 h-4 text-amber-600" />
            High Risk Field Surveyors Auditor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TableContainer className="border-0">
            <TableHeader>
              <TableRow>
                <TableHead>Surveyor Name & License</TableHead>
                <TableHead>Claims Inspected</TableHead>
                <TableHead>Approval Rate</TableHead>
                <TableHead>AI Override %</TableHead>
                <TableHead>Associated Workshops</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {surveyors.map(s => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="font-bold text-xs text-slate-900">{s.surveyorName}</div>
                    <div className="text-[11px] text-brand-600 font-mono">{s.licenseNumber}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-900">{s.totalClaimsInspected}</TableCell>
                  <TableCell className="font-mono text-xs text-emerald-600 font-bold">{s.approvalRatePct}%</TableCell>
                  <TableCell className="font-mono text-xs text-rose-600 font-bold">{s.aiDiscrepancyOverridePct}% Overridden</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{s.associatedWorkshops.join(', ')}</TableCell>
                  <TableCell>
                    <RiskBadge level="HIGH" />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};
