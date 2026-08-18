import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { InsuranceCompany } from '../types';
import { Building2, Plus } from 'lucide-react';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<InsuranceCompany[]>([]);

  useEffect(() => {
    ApiClient.getCompanies().then(setCompanies);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-600" />
            Insurance Tenant Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Multi-tenant insurance carriers onboarded to AIVIS Forensics
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Onboard New Carrier
        </Button>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Code & Carrier Name</TableHead>
              <TableHead>Headquarters</TableHead>
              <TableHead>Tax ID</TableHead>
              <TableHead>Branches</TableHead>
              <TableHead>Total Claims</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Security Contact</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {companies.map((comp) => (
              <TableRow key={comp.id}>
                <TableCell>
                  <div className="font-bold text-xs text-slate-900">{comp.name}</div>
                  <div className="text-[11px] text-brand-600 font-mono">{comp.code}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-slate-800">{comp.headquarters}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{comp.country}</div>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-700">{comp.taxId}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{comp.activeBranches} Active</TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{comp.totalClaimsCount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="success" dot>{comp.status}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{comp.contactEmail}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
