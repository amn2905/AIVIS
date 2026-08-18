import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CommercialApiClient } from '../../services/commercialApiClient';
import { OEMConnectorStatus } from '../../types/commercial';
import { Cpu, Wifi, RefreshCw, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export const OEMIntegrationsPage: React.FC = () => {
  const [connectors, setConnectors] = useState<OEMConnectorStatus[]>([]);

  useEffect(() => {
    CommercialApiClient.getOEMConnectors().then(setConnectors);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Wifi className="w-5 h-5 text-brand-600" />
            OEM Telematics Gateway & Core Insurance System APIs
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Tesla, GM OnStar, FordPass, BMW ConnectedDrive, Geotab, and Guidewire integration connectors
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
          Test All Gateway Pings
        </Button>
      </div>

      {/* OEM Connector Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map(c => (
          <Card key={c.id} className="p-6 border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                {c.provider}
              </span>
              <Badge variant="success">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {c.status} ({c.lastPingMs}ms)
                </span>
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 font-mono">{c.name}</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Protocol: {c.protocol} • Auth: {c.authType}</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100 font-mono text-xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">CONNECTOR CAPABILITIES</span>
              {c.capabilities.map((cap, i) => (
                <div key={i} className="text-slate-700 flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> {cap}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t text-[11px] font-mono text-slate-500">
              <span>Payload Stream: {c.activePayloadsCount.toLocaleString()} / min</span>
              <button className="text-brand-600 font-bold hover:underline">View Stream Log →</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
