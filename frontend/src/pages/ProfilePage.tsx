import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Key } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-brand-600" />
          My Security Profile
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          User profile credentials, active session status, and security keys
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <img src={user?.avatarUrl} alt="" className="w-16 h-16 rounded-full border-2 border-brand-500 object-cover" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{user?.fullName}</h3>
                <p className="text-xs text-slate-500 font-mono">{user?.email}</p>
                <span className="text-[10px] font-mono font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200 mt-1 inline-block">
                  ROLE: {user?.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={user?.fullName} />
              <Input label="Email Address" defaultValue={user?.email} disabled />
            </div>

            <Input label="Company Tenant" defaultValue={user?.companyName} disabled />

            <Button variant="primary">Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Key className="w-4 h-4 text-brand-600" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Button variant="outline" className="w-full">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
