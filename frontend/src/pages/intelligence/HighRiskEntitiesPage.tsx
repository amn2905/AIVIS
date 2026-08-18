import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { IntelligenceApiClient } from '../../services/intelligenceApiClient';
import { FraudSyndicate } from '../../types/intelligence';
import { ShieldAlert, Users, Layers, AlertTriangle } from 'lucide-react';

export const HighRiskEntitiesPage: React.FC = () => {
  const [syndicates, setSyndicates] = useState<FraudSyndicate[]>([]);

  useEffect(() => {
    IntelligenceApiClient.getFraudSyndicates().then(setSyndicates);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          Organized Fraud Syndicates & Repeat Offenders
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Syndicate dossiers, shared identity pings (phone, IP, bank), and operation territories
        </p>
      </div>

      <div className="space-y-4">
        {syndicates.map(syn => (
          <Card key={syn.id} className="p-6 border-slate-200/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-mono">{syn.ringName}</h3>
                  <Badge variant="purple" size="sm">{syn.codeName}</Badge>
                  <RiskBadge level="CRITICAL" />
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">Territory: {syn.primaryLocation}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">MEMBERS</span>
                  <span className="font-bold text-slate-900">{syn.memberCount} Suspects</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">TOTAL LOSS</span>
                  <span className="font-bold text-rose-600">${syn.totalClaimLossUsd.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            {/* Shared Attributes Tags */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Shared Entity Fingerprints</span>
              <div className="flex flex-wrap gap-2">
                {syn.sharedAttributes.map((attr, i) => (
                  <span key={i} className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-mono font-medium">
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
