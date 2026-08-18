import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { UserCheck, ShieldCheck, Check, X } from 'lucide-react';

export const RolesPage: React.FC = () => {
  const roles = [
    { code: 'SUPER_ADMIN', name: 'Super Administrator', desc: 'Full uncontrolled access to all tenant organizations & security logs' },
    { code: 'FRAUD_ANALYST', name: 'Fraud Forensic Analyst', desc: 'Can escalate claims, run AI vision scans, and inspect telematics dumps' },
    { code: 'CLAIMS_INVESTIGATOR', name: 'Claims Field Investigator', desc: 'Can upload field evidence, record statements, and update dossier statuses' },
    { code: 'BRANCH_AUDITOR', name: 'Branch Compliance Auditor', desc: 'Read-only access to branch level claims and compliance audit trails' },
    { code: 'INSURANCE_ADMIN', name: 'Insurance Tenant Admin', desc: 'Manage carrier branch offices and assign local investigators' },
  ];

  const permissions = [
    { key: 'claims:read', label: 'Read Claims Dossiers' },
    { key: 'claims:write', label: 'Create & Edit Claims' },
    { key: 'claims:investigate', label: 'Escalate to Fraud Suspected' },
    { key: 'evidence:upload', label: 'Upload Digital & EXIF Evidence' },
    { key: 'fraud:score', label: 'Trigger Neural Fraud Scoring' },
    { key: 'audit:read', label: 'View System Audit Logs' },
    { key: 'roles:manage', label: 'Configure RBAC Matrix' },
    { key: 'companies:manage', label: 'Onboard Insurance Carriers' },
  ];

  // Helper matrix mapper
  const hasPerm = (roleCode: string, permKey: string): boolean => {
    if (roleCode === 'SUPER_ADMIN') return true;
    if (roleCode === 'FRAUD_ANALYST' && ['claims:read', 'claims:write', 'claims:investigate', 'evidence:upload', 'fraud:score', 'audit:read'].includes(permKey)) return true;
    if (roleCode === 'CLAIMS_INVESTIGATOR' && ['claims:read', 'claims:write', 'evidence:upload'].includes(permKey)) return true;
    if (roleCode === 'BRANCH_AUDITOR' && ['claims:read', 'audit:read'].includes(permKey)) return true;
    if (roleCode === 'INSURANCE_ADMIN' && ['claims:read', 'claims:write', 'audit:read'].includes(permKey)) return true;
    return false;
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-brand-600" />
            RBAC Roles & Permissions Matrix
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Role-Based Access Control policies and security scope definitions
          </p>
        </div>
        <Button variant="primary" icon={<ShieldCheck className="w-4 h-4" />}>
          Define Custom Role
        </Button>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead className="w-64">Permission Scope</TableHead>
              {roles.map(r => (
                <TableHead key={r.code} className="text-center font-mono text-xs">
                  {r.code}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <tbody>
            {permissions.map((p) => (
              <TableRow key={p.key}>
                <TableCell>
                  <div className="font-semibold text-xs text-slate-900">{p.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{p.key}</div>
                </TableCell>
                {roles.map(r => {
                  const allowed = hasPerm(r.code, p.key);
                  return (
                    <TableCell key={r.code} className="text-center">
                      {allowed ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                          <X className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
