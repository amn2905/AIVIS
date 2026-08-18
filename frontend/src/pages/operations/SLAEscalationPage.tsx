import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { OperationsApiClient } from '../../services/operationsApiClient';
import { SLARecord } from '../../types/operations';
import { Clock, ShieldAlert, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const SLAEscalationPage: React.FC = () => {
  const [slas, setSlas] = useState<SLARecord[]>([]);

  useEffect(() => {
    OperationsApiClient.getSLARecords().then(setSlas);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          SLA Breach Monitoring & Escalation Engine
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Real-time countdown tickers, priority scoring matrix, and automated Chief Risk Officer escalations
        </p>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Claim Number</TableHead>
              <TableHead>Stage Name</TableHead>
              <TableHead>SLA Deadline</TableHead>
              <TableHead>Remaining Time</TableHead>
              <TableHead>Priority Score</TableHead>
              <TableHead>Assigned Investigator</TableHead>
              <TableHead>Escalation Status</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {slas.map(s => (
              <TableRow key={s.id}>
                <TableCell className="font-mono font-bold text-xs text-slate-900">{s.claimNumber}</TableCell>
                <TableCell className="font-semibold text-xs text-slate-800">{s.stageName}</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{new Date(s.slaDeadline).toLocaleString()}</TableCell>
                <TableCell className="font-mono font-bold text-xs">
                  {s.remainingMinutes > 0 ? (
                    <span className="text-amber-600">{s.remainingMinutes} mins remaining</span>
                  ) : (
                    <span className="text-rose-600 font-extrabold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> BREACHED ({Math.abs(s.remainingMinutes)}m overdue)
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{s.priorityScore} / 100</TableCell>
                <TableCell className="text-xs text-slate-800">{s.assignedInvestigator}</TableCell>
                <TableCell>
                  {s.escalationStatus === 'ESCALATED_TO_CRO' && (
                    <Badge variant="danger" dot>ESCALATED TO CRO</Badge>
                  )}
                  {s.escalationStatus === 'WARNED' && (
                    <Badge variant="warning" dot>SLA WARNING</Badge>
                  )}
                  {s.escalationStatus === 'NORMAL' && (
                    <Badge variant="success">ON SCHEDULE</Badge>
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
