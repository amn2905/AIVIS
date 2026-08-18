import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TimelineItem } from '../../types';
import { Activity, Zap, UserCheck, ShieldCheck, Clock } from 'lucide-react';

export const TimelineWidget: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'AI_TRIGGER':
        return <Zap className="w-3.5 h-3.5 text-purple-600" />;
      case 'INVESTIGATOR':
        return <UserCheck className="w-3.5 h-3.5 text-brand-600" />;
      case 'STATUS_CHANGE':
        return <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-600" />
          <CardTitle>Live Incident Feed</CardTitle>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase">REAL-TIME</span>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="relative pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {items.map((item) => (
            <div key={item.id} className="relative flex items-start gap-3 text-xs">
              {/* Dot */}
              <div className="absolute -left-4 top-0.5 w-4 h-4 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-xs shrink-0">
                {getIcon(item.type)}
              </div>

              {/* Content */}
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-semibold text-slate-900 truncate">{item.title}</h5>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{item.description}</p>
                <p className="text-[10px] text-slate-400 font-mono">Actor: {item.actor}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
