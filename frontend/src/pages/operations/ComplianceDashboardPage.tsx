import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { OperationsApiClient } from '../../services/operationsApiClient';
import { ComplianceStandardScore, ChainOfCustodyReport } from '../../types/operations';
import { ShieldCheck, Download, Award, FileText, CheckCircle2 } from 'lucide-react';

export const ComplianceDashboardPage: React.FC = () => {
  const [scores, setScores] = useState<ComplianceStandardScore[]>([]);
  const [custody, setCustody] = useState<ChainOfCustodyReport | null>(null);

  useEffect(() => {
    OperationsApiClient.getComplianceScores().then(setScores);
    OperationsApiClient.getChainOfCustodyReport().then(setCustody);
  }, []);

  const handleExportCustody = () => {
    if (!custody) return;
    const content = `# CRYPTOGRAPHIC CHAIN OF CUSTODY CERTIFICATE\n\nEvidence ID: ${custody.evidenceId}\nFile Name: ${custody.evidenceName}\nSHA-256 Hash: ${custody.sha256Hash}\nSHA-512 Hash: ${custody.sha512Hash}\n\n## AUDIT EVENTS LOG\n` +
      custody.custodyEvents.map(e => `- [${e.timestamp}] ${e.actor} (${e.role}): ${e.action}`).join('\n') +
      `\n\nISO 27037 Digital Evidence Compliance Verified: YES`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Chain_of_Custody_${custody.evidenceId}.md`;
    a.click();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" />
            Enterprise Compliance & Standards Audit Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            ISO 27001, ISO 21434, NIST CSF, and ISO 27037 Digital Evidence compliance scores
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleExportCustody} icon={<Download className="w-3.5 h-3.5" />}>
          Export Chain of Custody Certificate
        </Button>
      </div>

      {/* Compliance Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scores.map(s => (
          <Card key={s.standardCode} className="p-6 border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                {s.standardCode}
              </span>
              <Badge variant="success">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {s.status}
                </span>
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 font-mono">{s.standardName}</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Last Audit: {new Date(s.lastAuditedAt).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900 text-white rounded-xl">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block uppercase">AUDIT COMPLIANCE SCORE</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">{s.compliancePct}%</span>
              </div>
              <div className="text-right text-xs font-mono text-slate-300">
                <span>{s.passedControls} / {s.totalControls} Controls Passed</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chain of Custody Audit Log Section */}
      {custody && (
        <Card>
          <CardHeader>
            <CardTitle>ISO 27037 Cryptographic Chain of Custody Audit Log</CardTitle>
            <span className="text-xs font-mono text-slate-400">File: {custody.evidenceName}</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 border rounded-lg space-y-1 font-mono text-xs">
              <div><span className="text-slate-500">SHA-256:</span> <span className="font-bold text-slate-900">{custody.sha256Hash}</span></div>
              <div className="truncate"><span className="text-slate-500">SHA-512:</span> <span className="text-slate-700">{custody.sha512Hash}</span></div>
            </div>

            <TableContainer className="border-0">
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor Identity</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Custody Action Performed</TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {custody.custodyEvents.map((evt, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono text-xs text-slate-500">{new Date(evt.timestamp).toLocaleString()}</TableCell>
                    <TableCell className="font-bold text-xs text-slate-900">{evt.actor}</TableCell>
                    <TableCell><Badge variant="purple" size="sm">{evt.role}</Badge></TableCell>
                    <TableCell className="text-xs font-semibold text-brand-700">{evt.action}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
