import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CommercialApiClient } from '../../services/commercialApiClient';
import { SaaSLicenseQuota } from '../../types/commercial';
import { CreditCard, Shield, Users, FileText, CheckCircle2 } from 'lucide-react';

export const SaaSLicensingPage: React.FC = () => {
  const [quota, setQuota] = useState<SaaSLicenseQuota | null>(null);

  useEffect(() => {
    CommercialApiClient.getSaaSLicenseQuota().then(setQuota);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-600" />
          Multi-Tenant SaaS Licensing & Usage Analytics
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Enterprise Carrier tier management, monthly API limits, active seats, and billing status
        </p>
      </div>

      {quota && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 border-l-4 border-l-brand-600">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">SUBSCRIPTION TIER</span>
              <Badge variant="purple" size="sm">{quota.tier}</Badge>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-mono">{quota.companyName}</h3>
            <p className="text-xs text-slate-500 font-mono">Renewal: {new Date(quota.renewalDate).toLocaleDateString()}</p>
          </Card>

          <Card className="p-6 space-y-3 border-l-4 border-l-emerald-500">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">API VOLUME USAGE</span>
            <div className="text-2xl font-extrabold font-mono text-emerald-600">
              {(quota.currentApiRequestCount / 1000000).toFixed(2)}M / {(quota.monthlyApiRequestLimit / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-slate-500 font-mono">28.4% Monthly Quota Consumed</p>
          </Card>

          <Card className="p-6 space-y-3 border-l-4 border-l-purple-500">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">ACTIVE SEATS & CLAIMS</span>
            <div className="text-2xl font-extrabold font-mono text-slate-900">
              {quota.activeUsersCount} / {quota.userSeatLimit} Seats
            </div>
            <p className="text-xs text-slate-500 font-mono">Active Claims: {quota.activeClaimsCount} / {quota.claimLimit}</p>
          </Card>
        </div>
      )}
    </div>
  );
};
