import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'increase',
  subtitle,
  icon,
  iconBg = 'bg-brand-50 text-brand-600',
  className
}) => {
  return (
    <Card className={clsx("p-5 relative border-slate-200/90", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
            {value}
          </div>
        </div>
        {icon && (
          <div className={clsx("p-2.5 rounded-lg border border-slate-100 shrink-0", iconBg)}>
            {icon}
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {change && (
            <span className={clsx(
              "inline-flex items-center gap-1 font-semibold font-mono px-1.5 py-0.5 rounded",
              changeType === 'increase' && "text-emerald-700 bg-emerald-50 border border-emerald-200",
              changeType === 'decrease' && "text-rose-700 bg-rose-50 border border-rose-200",
              changeType === 'neutral' && "text-slate-600 bg-slate-100 border border-slate-200"
            )}>
              {changeType === 'increase' && <TrendingUp className="w-3 h-3" />}
              {changeType === 'decrease' && <TrendingDown className="w-3 h-3" />}
              {changeType === 'neutral' && <Minus className="w-3 h-3" />}
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500 truncate">{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};
