import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { IntelligenceApiClient } from '../../services/intelligenceApiClient';
import { MoneyFlowLink } from '../../types/intelligence';
import { DollarSign, ArrowRight, ShieldAlert, CreditCard } from 'lucide-react';

export const MoneyFlowAnalysisPage: React.FC = () => {
  const [flows, setFlows] = useState<MoneyFlowLink[]>([]);

  useEffect(() => {
    IntelligenceApiClient.getMoneyFlows().then(setFlows);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          Money Flow & Bank Account Payout Tracer
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Tracking payout flows from insurance carriers through bank accounts, workshops, and kickbacks
        </p>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Source Payout Entity</TableHead>
              <TableHead>Target Recipient Entity</TableHead>
              <TableHead>Bank Account</TableHead>
              <TableHead>Amount USD</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Flow Audit Flag</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {flows.map(f => (
              <TableRow key={f.id}>
                <TableCell className="font-bold text-xs text-slate-900">{f.sourceEntity}</TableCell>
                <TableCell className="font-bold text-xs text-brand-700">{f.targetEntity}</TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{f.bankAccountMasked}</TableCell>
                <TableCell className="font-mono font-bold text-xs text-emerald-700">${f.amountUsd.toLocaleString()} USD</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{new Date(f.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  {f.isFlagged ? (
                    <Badge variant="danger" dot>{f.flagReason}</Badge>
                  ) : (
                    <Badge variant="success" dot>CLEAR</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
