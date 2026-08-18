import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FraudAlert } from '../../types';
import { ShieldAlert, AlertCircle, ArrowUpRight } from 'lucide-react';
import { RiskBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface FraudAlertsWidgetProps {
  alerts: FraudAlert[];
  onNavigate: (path: string) => void;
}

export const FraudAlertsWidget: React.FC<FraudAlertsWidgetProps> = ({ alerts, onNavigate }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
          <CardTitle>High Fraud Risk Feed</CardTitle>
        </div>
        <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
          {alerts.length} CRITICAL
        </span>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3.5 bg-slate-50/70 border border-slate-200 hover:border-brand-300 rounded-lg transition-all space-y-2 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{alert.title}</h4>
              </div>
              <RiskBadge level={alert.severity} />
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{alert.description}</p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-500">{alert.timestamp}</span>
                <span className="font-mono font-semibold text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded">
                  {alert.confidencePct}% Confidence
                </span>
              </div>
              <button
                onClick={() => onNavigate(`/claims/${alert.claimId}`)}
                className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 group-hover:underline"
              >
                Inspect <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => onNavigate('/claims')}
        >
          View All Flagged Investigations
        </Button>
      </CardContent>
    </Card>
  );
};
