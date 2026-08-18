import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { CANFrame, CANSecurityThreat } from '../../types/forensics';
import { Cpu, ShieldAlert, Upload, Play, Terminal, Activity, AlertTriangle } from 'lucide-react';

export const CANBusForensicsPage: React.FC = () => {
  const [frames, setFrames] = useState<CANFrame[]>([]);
  const [threats, setThreats] = useState<CANSecurityThreat[]>([]);
  const [busLoad, setBusLoad] = useState(48.2);

  useEffect(() => {
    ForensicsApiClient.getCANBusData().then(res => {
      setFrames(res.frames);
      setThreats(res.threats);
    });
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-600" />
            CAN Bus Network Forensics & Signal Decoder
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            ASC, BLF, CSV, PCAP log parsing, frame payload inspection, and cyber attack vector detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
            Import CAN Log (ASC/BLF/PCAP)
          </Button>
          <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
            Replay Bus Traffic
          </Button>
        </div>
      </div>

      {/* Bus Status & Threat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-l-4 border-l-brand-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Bus Load Utilization</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-brand-600">{busLoad}%</div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-brand-600" style={{ width: `${busLoad}%` }} />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">CAN Threat Vector Alerts</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-rose-600">{threats.length} DETECTED</div>
          <p className="text-xs text-rose-700 mt-2 font-mono">Signal Injection & Replay Attack</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Primary Bus Protocol</span>
          <div className="mt-2 text-xl font-extrabold font-mono text-slate-900">CAN 2.0B / ISO 11898</div>
          <p className="text-xs text-slate-500 mt-2 font-mono">500 kbit/s High Speed CAN</p>
        </Card>
      </div>

      {/* CAN Security Threats List */}
      <Card>
        <CardHeader>
          <CardTitle>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Detected Cyber Attack Vectors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {threats.map(t => (
            <div key={t.id} className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="font-bold text-xs text-slate-900 font-mono">{t.type}</span>
                  <span className="text-[11px] font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    ID: {t.frameIdHex}
                  </span>
                </div>
                <RiskBadge level={t.severity} />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-mono">{t.description}</p>
              <div className="text-[10px] text-slate-400 font-mono">Confidence: {t.confidencePct}%</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CAN Bus Log Data Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp (ms)</TableHead>
              <TableHead>Frame ID</TableHead>
              <TableHead>Source ECU Module</TableHead>
              <TableHead>Payload (HEX Bytes)</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Freq (Hz)</TableHead>
              <TableHead>Decoded Signals</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {frames.map(f => (
              <TableRow key={f.id}>
                <TableCell className="font-mono text-xs text-slate-500">+{f.timestampMs} ms</TableCell>
                <TableCell className="font-mono font-bold text-xs text-brand-700">{f.frameIdHex}</TableCell>
                <TableCell className="font-semibold text-xs text-slate-900">{f.ecuName}</TableCell>
                <TableCell className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-800 tracking-wider">
                  {f.payloadHex}
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-700">P{f.priority}</TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{f.signalFrequencyHz} Hz</TableCell>
                <TableCell className="font-mono text-xs text-slate-700">
                  {f.decodedSignal ? (
                    <div>
                      {f.decodedSignal.rpm !== undefined && `RPM: ${f.decodedSignal.rpm} `}
                      {f.decodedSignal.speedKmh !== undefined && `Speed: ${f.decodedSignal.speedKmh}km/h `}
                      {f.decodedSignal.steeringAngleDeg !== undefined && `Steer: ${f.decodedSignal.steeringAngleDeg}°`}
                    </div>
                  ) : (
                    <span className="text-slate-400">Raw Data</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
