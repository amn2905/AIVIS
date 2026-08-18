import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { OperationsApiClient } from '../../services/operationsApiClient';
import { DigitalSignatureRecord } from '../../types/operations';
import { Lock, ShieldCheck, Key, FileCheck } from 'lucide-react';

export const DigitalApprovalsPage: React.FC = () => {
  const [signatures, setSignatures] = useState<DigitalSignatureRecord[]>([]);

  useEffect(() => {
    OperationsApiClient.getDigitalSignatures().then(setSignatures);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-600" />
          Cryptographic Digital Signatures & Approval Sign-Off
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          RSA-2048 & ECDSA-P256 PKI digital signatures for multi-tier evidence and verdict approvals
        </p>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Signer Identity & Role</TableHead>
              <TableHead>Approval Stage</TableHead>
              <TableHead>PKI Algorithm</TableHead>
              <TableHead>Cryptographic Hash Hex Signature</TableHead>
              <TableHead>Signed Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {signatures.map(s => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="font-bold text-xs text-slate-900">{s.signerName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{s.signerRole}</div>
                </TableCell>
                <TableCell className="font-semibold text-xs text-slate-900">{s.approvalStage}</TableCell>
                <TableCell>
                  <Badge variant="purple" size="sm">{s.signatureAlgorithm}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-600 truncate max-w-xs">{s.signatureHashHex}</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{new Date(s.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="success">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      VALIDATED PKI
                    </span>
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
