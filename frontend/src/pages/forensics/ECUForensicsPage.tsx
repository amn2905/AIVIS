import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { ECUProfile } from '../../types/forensics';
import { Cpu, ShieldAlert, CheckCircle2, AlertTriangle, Key, History, FileCode } from 'lucide-react';

export const ECUForensicsPage: React.FC = () => {
  const [ecu, setEcu] = useState<ECUProfile | null>(null);

  useEffect(() => {
    ForensicsApiClient.getECUProfile().then(setEcu);
  }, []);

  if (!ecu) return null;

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-600" />
          ECU Firmware Integrity & Calibration Forensics
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Engine Control Unit memory dump analysis, checksum verification, and reflash history
        </p>
      </div>

      {/* ECU Integrity Meter & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-l-4 border-l-rose-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">ECU Integrity Score</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-rose-600">{ecu.integrityScore} / 100</div>
          <p className="text-xs text-rose-700 mt-2 font-mono">CRITICAL: Checksum verification warning</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Stored VIN vs Chassis VIN</span>
          <div className="mt-2 text-lg font-bold font-mono text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" /> MATCH VERIFIED
          </div>
          <p className="text-xs text-slate-500 mt-2 font-mono">{ecu.storedVin}</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Programming History Count</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-purple-600">{ecu.programmingHistoryCount} Flashes</div>
          <p className="text-xs text-slate-500 mt-2 font-mono">Last Flash: {ecu.lastFlashedAt}</p>
        </Card>
      </div>

      {/* Tamper Warning Banner if present */}
      {ecu.tamperingDetected && (
        <Card className="p-4 bg-rose-50 border-rose-200">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-900 font-mono uppercase">
                UNAUTHORIZED FIRMWARE REFLASH DETECTED ({ecu.tamperingType})
              </h4>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed font-mono">
                The Engine Control Module was reflashed 2 days prior to the reported collision timestamp. Checksum hash mismatch confirms bench tool execution.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Firmware Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <FileCode className="w-4 h-4 text-brand-600" />
              ECU Calibration & Memory Signatures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 border rounded">
              <span className="text-slate-400 text-[10px] block">HARDWARE PART NUMBER</span>
              <span className="font-bold text-slate-900">{ecu.hardwarePartNumber}</span>
            </div>
            <div className="p-3 bg-slate-50 border rounded">
              <span className="text-slate-400 text-[10px] block">FIRMWARE VERSION</span>
              <span className="font-bold text-slate-900">{ecu.firmwareVersion}</span>
            </div>
            <div className="p-3 bg-slate-50 border rounded">
              <span className="text-slate-400 text-[10px] block">CALIBRATION HASH (SHA-256)</span>
              <span className="font-bold text-brand-700 text-[11px] break-all">{ecu.calibrationHash}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <History className="w-4 h-4 text-brand-600" />
              Diagnostic Fault Memory Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-mono text-xs">
            {ecu.faultHistory.map((f, idx) => (
              <div key={idx} className="p-3 bg-amber-50 border border-amber-200 rounded flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
