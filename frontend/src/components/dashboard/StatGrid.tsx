import React from 'react';
import { StatCard } from '../ui/StatCard';
import { FileText, Clock, ShieldAlert, AlertTriangle, DollarSign, Award } from 'lucide-react';
import { DashboardOverviewStats } from '../../types';

export const StatGrid: React.FC<{ stats: DashboardOverviewStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Total Claims"
        value={stats.totalClaims.toLocaleString()}
        change="+14.2%"
        changeType="increase"
        subtitle="vs prior quarter"
        icon={<FileText className="w-4 h-4" />}
        iconBg="bg-blue-50 text-blue-600"
      />
      <StatCard
        title="Pending Claims"
        value={stats.pendingClaims}
        change="-4.5%"
        changeType="decrease"
        subtitle="Faster processing"
        icon={<Clock className="w-4 h-4" />}
        iconBg="bg-amber-50 text-amber-600"
      />
      <StatCard
        title="Active Investigations"
        value={stats.activeInvestigations}
        change="+8"
        changeType="increase"
        subtitle="Field & AI teams"
        icon={<ShieldAlert className="w-4 h-4" />}
        iconBg="bg-indigo-50 text-indigo-600"
      />
      <StatCard
        title="Fraud Alerts"
        value={stats.fraudAlertsCount}
        change="+12%"
        changeType="increase"
        subtitle="High confidence"
        icon={<AlertTriangle className="w-4 h-4" />}
        iconBg="bg-rose-50 text-rose-600"
      />
      <StatCard
        title="Loss Prevented"
        value={`$${(stats.totalLossPreventedUsd / 1000000).toFixed(2)}M`}
        change="+$680K"
        changeType="increase"
        subtitle="Saved year-to-date"
        icon={<DollarSign className="w-4 h-4" />}
        iconBg="bg-emerald-50 text-emerald-600"
      />
      <StatCard
        title="AI Accuracy Rate"
        value={`${stats.fraudDetectionRatePct}%`}
        change="+1.8%"
        changeType="increase"
        subtitle="Validated by audit"
        icon={<Award className="w-4 h-4" />}
        iconBg="bg-purple-50 text-purple-600"
      />
    </div>
  );
};
