import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { Branch } from '../types';
import { GitBranch, Plus } from 'lucide-react';

export const BranchesPage: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    ApiClient.getBranches().then(setBranches);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-brand-600" />
            Regional Branch Offices
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Geographic branch offices and local field investigation units
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Regional Branch
        </Button>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Branch Code & Name</TableHead>
              <TableHead>Insurance Carrier</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Field Investigators</TableHead>
              <TableHead>Active Claims</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {branches.map((br) => (
              <TableRow key={br.id}>
                <TableCell>
                  <div className="font-bold text-xs text-slate-900">{br.name}</div>
                  <div className="text-[11px] text-brand-600 font-mono">{br.code}</div>
                </TableCell>
                <TableCell className="text-xs text-slate-800">{br.companyName}</TableCell>
                <TableCell>
                  <div className="text-xs text-slate-800">{br.city}, {br.state}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{br.country}</div>
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{br.investigatorsCount} Investigators</TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{br.activeClaimsCount} Active</TableCell>
                <TableCell>
                  <Badge variant="success" dot>{br.status}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{br.phone}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
