import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { User } from '../types';
import { Users, UserPlus } from 'lucide-react';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    ApiClient.getUsers().then(setUsers);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            Platform User Directory
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Manage investigators, analysts, auditors, and security personnel
          </p>
        </div>
        <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>
          Invite User
        </Button>
      </div>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>User Name & Email</TableHead>
              <TableHead>Assigned Role</TableHead>
              <TableHead>Company & Branch</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {users.map((usr) => (
              <TableRow key={usr.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={usr.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">{usr.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{usr.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="purple" size="sm">{usr.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-slate-800">{usr.companyName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{usr.branchName || 'Global Level'}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="success" dot>{usr.status}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{usr.lastActive}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" className="text-xs text-brand-600">
                    Edit Permissions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
