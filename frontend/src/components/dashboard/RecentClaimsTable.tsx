import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../ui/Table';
import { Claim } from '../../types';
import { ClaimStatusBadge } from '../ui/Badge';
import { FileSearch, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

interface RecentClaimsTableProps {
  claims: Claim[];
  onNavigate: (path: string) => void;
}

export const RecentClaimsTable: React.FC<RecentClaimsTableProps> = ({ claims, onNavigate }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>
            <FileSearch className="w-4 h-4 text-brand-600" />
            Recent Investigation Dossiers
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">Live stream of submitted vehicle insurance claims</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('/claims')}
          icon={<ExternalLink className="w-3.5 h-3.5" />}
        >
          Claims Manager
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <TableContainer className="border-0 rounded-none">
          <TableHeader>
            <TableRow>
              <TableHead>Claim Number</TableHead>
              <TableHead>Vehicle Details</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Fraud Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Est. Loss</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>
                  <div className="font-mono font-bold text-slate-900 text-xs">{claim.claimNumber}</div>
                  <div className="text-[11px] text-slate-500 font-mono">POL: {claim.policyNumber}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-xs text-slate-900">
                    {claim.vehicle.year} {claim.vehicle.make} {claim.vehicle.model}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">VIN: {claim.vehicle.vin}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-slate-700">{claim.incidentLocation.city}, {claim.incidentLocation.country}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{new Date(claim.incidentDate).toLocaleDateString()}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          claim.fraudScore > 80 ? 'bg-rose-500' : claim.fraudScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${claim.fraudScore}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-xs">{claim.fraudScore}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ClaimStatusBadge status={claim.status} />
                </TableCell>
                <TableCell className="text-right font-mono font-semibold text-xs text-slate-900">
                  ${claim.estimatedLossUsd.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(`/claims/${claim.id}`)}
                    className="text-xs text-brand-600 hover:text-brand-700"
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
