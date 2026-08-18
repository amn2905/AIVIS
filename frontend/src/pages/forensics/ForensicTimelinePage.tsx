import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { ForensicEventTimelineItem } from '../../types/forensics';
import { Clock, Cpu, Zap, Activity, ShieldAlert, Lock, UserCheck } from 'lucide-react';
import { RiskBadge } from '../../components/ui/Badge';

export const ForensicTimelinePage: React.FC = () => {
  const [timeline, setTimeline] = useState<ForensicEventTimelineItem[]>([]);
  const [filterSource, setFilterSource] = useState<string>('ALL');

  useEffect(() => {
    ForensicsApiClient.getForensicTimeline().then(setTimeline);
  }, []);

  const sources = ['ALL', 'OBD', 'CAN_BUS', 'EDR', 'GPS', 'EVIDENCE', 'USER_ACTION'];

  const filteredTimeline = timeline.filter(t => filterSource === 'ALL' || t.source === filterSource);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-600" />
          Automated Forensic Incident Event Timeline Reconstructor
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Unified chronological timeline uniting ECU logs, CAN signals, EDR black box, and evidence lockers
        </p>
      </div>

      {/* Filter Source Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {sources.map(src => (
          <button
            key={src}
            onClick={() => setFilterSource(src)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md border transition-all ${
              filterSource === src
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {src}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <Card className="p-6">
        <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {filteredTimeline.map(item => (
            <div key={item.id} className="relative flex items-start gap-4 text-xs">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-white border-2 border-brand-600 flex items-center justify-center shadow-xs shrink-0">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
              </div>

              <div className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{item.title}</span>
                    <span className="text-[10px] font-mono bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
                      SOURCE: {item.source}
                    </span>
                  </div>
                  <RiskBadge level={item.severity} />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{item.description}</p>
                <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200/60">
                  Timestamp: {item.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
