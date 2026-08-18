import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { ActivityLog } from '../types';
import { History, Search, Download, Shield } from 'lucide-react';

export const ActivityLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    ApiClient.getActivityLogs().then(setLogs);
  }, []);

  const filteredLogs = logs.filter(l =>
    l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.ipAddress.includes(searchTerm)
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-brand-600" />
            Audit Trail & Security Event Logs
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Immutable system operation record for compliance and SOC forensics
          </p>
        </div>
        <Button variant="outline" icon={<Download className="w-4 h-4" />}>
          Export CSV Audit Log
        </Button>
      </div>

      <Card className="p-4 bg-white">
        <Input
          placeholder="Filter logs by User, Action, Resource ID, or IP Address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </Card>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User & Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource Target</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Audit Details</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="font-bold text-xs text-slate-900">{log.userName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{log.userRole}</div>
                </TableCell>
                <TableCell className="font-mono font-bold text-xs text-brand-700">{log.action}</TableCell>
                <TableCell className="font-mono text-xs text-slate-800">{log.resource}</TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{log.ipAddress}</TableCell>
                <TableCell>
                  <Badge variant="success" size="sm" dot>{log.status}</Badge>
                </TableCell>
                <TableCell className="text-xs text-slate-600 line-clamp-1 max-w-xs">{log.details}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
