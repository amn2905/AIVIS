import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { OBDVehicleIdentity, OBDDiagnosticCodes, OBDSensorLiveReading, OBDHealthReport, OBDConnectionMode } from '../../types/forensics';
import { Cpu, Usb, Bluetooth, Wifi, Upload, ShieldCheck, Activity, AlertTriangle, FileText, Play, RefreshCw } from 'lucide-react';

export const OBDAcquisitionPage: React.FC = () => {
  const [connectionMode, setConnectionMode] = useState<OBDConnectionMode>('USB');
  const [isConnected, setIsConnected] = useState(true);
  const [identity, setIdentity] = useState<OBDVehicleIdentity | null>(null);
  const [diagnostics, setDiagnostics] = useState<OBDDiagnosticCodes | null>(null);
  const [reading, setReading] = useState<OBDSensorLiveReading | null>(null);
  const [health, setHealth] = useState<OBDHealthReport | null>(null);

  useEffect(() => {
    ForensicsApiClient.getOBDSession().then(res => {
      setIdentity(res.identity);
      setDiagnostics(res.diagnostics);
      setReading(res.liveReading);
      setHealth(res.healthReport);
    });
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-600" />
            OBD-II Acquisition & Diagnostic Workspace
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Hardware interface acquisition, ECU PIDs, DTC fault codes, and live engine stream
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
            Import Log (CSV/JSON/XML)
          </Button>
          <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
            Start Acquisition Dump
          </Button>
        </div>
      </div>

      {/* Connection & Protocol Settings Card */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase font-mono">Adapter Interface:</span>
            <div className="flex items-center gap-1.5">
              {[
                { mode: 'USB', icon: Usb },
                { mode: 'BLUETOOTH', icon: Bluetooth },
                { mode: 'WIFI', icon: Wifi },
                { mode: 'FILE_IMPORT', icon: Upload }
              ].map(item => {
                const Icon = item.icon;
                const active = connectionMode === item.mode;
                return (
                  <button
                    key={item.mode}
                    onClick={() => setConnectionMode(item.mode as OBDConnectionMode)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-md border flex items-center gap-1.5 transition-all ${
                      active
                        ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.mode}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              {isConnected ? 'PORT CONNECTED (COM3 @ 500kbit/s)' : 'DISCONNECTED'}
            </span>
          </div>
        </div>
      </Card>

      {/* Vehicle Identity & Diagnostic DTCs */}
      {identity && diagnostics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Info */}
          <Card>
            <CardHeader>
              <CardTitle>
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                ECU Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-mono text-xs">
              <div className="p-2.5 bg-slate-50 border rounded">
                <span className="text-slate-400 text-[10px] block">STORED VIN</span>
                <span className="font-bold text-slate-900">{identity.vin}</span>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded">
                <span className="text-slate-400 text-[10px] block">ECU IDENTIFIER</span>
                <span className="font-bold text-slate-900">{identity.ecuId}</span>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded">
                <span className="text-slate-400 text-[10px] block">BUS PROTOCOL</span>
                <span className="font-bold text-slate-900">{identity.protocol}</span>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded">
                <span className="text-slate-400 text-[10px] block">CALIBRATION ID</span>
                <span className="font-bold text-slate-900">{identity.calibrationId}</span>
              </div>
            </CardContent>
          </Card>

          {/* Diagnostic DTC Codes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Diagnostic Trouble Codes (DTC)
              </CardTitle>
              <Badge variant="danger" dot>MIL LAMP ACTIVE</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 font-mono uppercase">Confirmed Active DTCs</h4>
                {diagnostics.activeDtc.map((dtc, i) => (
                  <div key={i} className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs font-mono text-rose-900">
                    <span className="font-bold">{dtc}</span>
                    <Badge variant="danger" size="sm">ACTIVE</Badge>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg text-xs font-mono">
                  <span className="font-bold text-amber-900 block mb-1">Pending DTCs</span>
                  {diagnostics.pendingDtc.map((p, idx) => (
                    <div key={idx} className="text-amber-800">{p}</div>
                  ))}
                </div>
                <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-lg text-xs font-mono">
                  <span className="font-bold text-purple-900 block mb-1">Permanent DTCs</span>
                  {diagnostics.permanentDtc.map((p, idx) => (
                    <div key={idx} className="text-purple-800">{p}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live Sensors Grid & Health Report */}
      {reading && health && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sensors Live Stream */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                <Activity className="w-4 h-4 text-brand-600" />
                Live Telemetry PIDs Stream
              </CardTitle>
              <span className="text-xs font-mono text-slate-400">Sample Rate: 10Hz</span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">ENGINE RPM</span>
                  <span className="text-xl font-extrabold text-slate-900">{reading.rpm}</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">ENGINE LOAD</span>
                  <span className="text-xl font-extrabold text-slate-900">{reading.engineLoadPct}%</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">COOLANT TEMP</span>
                  <span className="text-xl font-extrabold text-rose-600">{reading.coolantTempC} °C</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">BATTERY VOLTAGE</span>
                  <span className="text-xl font-extrabold text-amber-600">{reading.batteryVoltageV} V</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">MAF FLOW</span>
                  <span className="text-lg font-bold text-slate-900">{reading.mafGps} g/s</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">MAP PRESSURE</span>
                  <span className="text-lg font-bold text-slate-900">{reading.mapKpa} kPa</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">THROTTLE POS</span>
                  <span className="text-lg font-bold text-slate-900">{reading.throttlePosPct}%</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-400 text-[10px] block">TIMING ADVANCE</span>
                  <span className="text-lg font-bold text-slate-900">{reading.ignitionTimingDeg}°</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OBD Health Report */}
          <Card className="p-5 border-l-4 border-l-brand-600">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">OBD Health Score</span>
              <FileText className="w-5 h-5 text-brand-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-brand-600 font-mono">{health.overallHealthScore}</span>
              <span className="text-sm font-semibold text-slate-500">/ 100 Health Index</span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <span className="font-bold text-slate-700 block uppercase font-mono">Critical Anomalies:</span>
              <ul className="space-y-1.5">
                {health.criticalAnomalies.map((anom, idx) => (
                  <li key={idx} className="p-2 bg-rose-50 text-rose-900 rounded border border-rose-200 font-mono text-[11px]">
                    {anom}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
