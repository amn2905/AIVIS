import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { IntelligenceApiClient } from '../../services/intelligenceApiClient';
import { VINCloneAlert, GhostPolicyAlert } from '../../types/intelligence';
import { ShieldAlert, Car, FileText, AlertTriangle } from 'lucide-react';

export const VINPolicyDuplicationPage: React.FC = () => {
  const [vinClones, setVinClones] = useState<VINCloneAlert[]>([]);
  const [ghostPolicies, setGhostPolicies] = useState<GhostPolicyAlert[]>([]);

  useEffect(() => {
    IntelligenceApiClient.getVINAndPolicyDuplications().then(res => {
      setVinClones(res.vinClones);
      setGhostPolicies(res.ghostPolicies);
    });
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Car className="w-5 h-5 text-brand-600" />
          VIN Cloning & Duplicate Ghost Policy Detector
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Cross-carrier registration audit, duplicate policy pings, and stolen VIN cloning flags
        </p>
      </div>

      {/* VIN Cloning Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Detected VIN Cloning Alerts
          </CardTitle>
          <Badge variant="danger">{vinClones.length} CRITICAL</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <TableContainer className="border-0">
            <TableHeader>
              <TableRow>
                <TableHead>VIN Number</TableHead>
                <TableHead>Vehicle Specs</TableHead>
                <TableHead>Registered States</TableHead>
                <TableHead>Active Policies</TableHead>
                <TableHead>Carriers Involved</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {vinClones.map(vc => (
                <TableRow key={vc.id}>
                  <TableCell className="font-mono font-bold text-xs text-slate-900">{vc.vin}</TableCell>
                  <TableCell className="font-semibold text-xs text-slate-900">{vc.makeModel}</TableCell>
                  <TableCell className="font-mono text-xs text-rose-600 font-bold">
                    {vc.registeredStates.join(' • ')}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-900">{vc.activePoliciesCount} Policies</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{vc.carriersInvolved.join(', ')}</TableCell>
                  <TableCell>
                    <RiskBadge level="CRITICAL" />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Ghost Policies Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <FileText className="w-4 h-4 text-amber-600" />
            Duplicate Ghost Policies Across Carriers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TableContainer className="border-0">
            <TableHeader>
              <TableRow>
                <TableHead>Policy Number</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Policyholder Owner</TableHead>
                <TableHead>Duplicate Carriers</TableHead>
                <TableHead>Total Premium USD</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {ghostPolicies.map(gp => (
                <TableRow key={gp.id}>
                  <TableCell className="font-mono font-bold text-xs text-slate-900">{gp.policyNumber}</TableCell>
                  <TableCell className="font-mono text-xs text-brand-700">{gp.vin}</TableCell>
                  <TableCell className="font-semibold text-xs text-slate-900">{gp.ownerName}</TableCell>
                  <TableCell className="font-mono text-xs text-amber-800 font-bold">{gp.duplicateCarrierCodes.join(' & ')}</TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-900">${gp.totalPremiumUsd.toLocaleString()}</TableCell>
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
