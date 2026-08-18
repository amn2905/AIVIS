import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { EDRCrashRecord } from '../../types/forensics';
import { ShieldAlert, Activity, Navigation, Upload, CheckCircle2, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const EDRAnalysisPage: React.FC = () => {
  const [edr, setEdr] = useState<EDRCrashRecord | null>(null);

  useEffect(() => {
    ForensicsApiClient.getEDRRecord().then(setEdr);
  }, []);

  if (!edr) return null;

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-600" />
          Event Data Recorder (EDR Black Box) Reconstruction
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          CDR crash data analysis, pre-collision 5-second telematics stream, and airbag deployment logs
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-brand-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">IMPACT ANGLE</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">{edr.impactDirectionDegrees}° (REAR)</div>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">PEAK IMPACT G-FORCE</span>
          <div className="text-2xl font-extrabold font-mono text-purple-600 mt-1">{edr.peakGForce} G</div>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">AIRBAG DEPLOYMENT</span>
          <div className="text-lg font-bold font-mono text-amber-700 mt-1 flex items-center gap-1">
            <XCircle className="w-4 h-4 text-amber-600" /> ZERO DEPLOYMENT
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">DRIVER SEATBELT</span>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> BUCKLED
          </div>
        </Card>
      </div>

      {/* Pre-Crash Telematics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-Collision 5-Second Telematics Stream</CardTitle>
          <span className="text-xs font-mono text-slate-400">Speed (km/h) vs Throttle (%) vs Braking</span>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-64 w-full text-xs font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={edr.preCrashStream}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="timeSeconds" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="speedKmh" name="Speed (km/h)" stroke="#0979f6" fill="#0979f6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="throttlePct" name="Throttle (%)" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Crash Data Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Time to Impact (s)</TableHead>
              <TableHead>Speed (km/h)</TableHead>
              <TableHead>Brake Switch</TableHead>
              <TableHead>Throttle %</TableHead>
              <TableHead>Steering Angle</TableHead>
              <TableHead>Longitudinal G</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {edr.preCrashStream.map((s, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{s.timeSeconds}s</TableCell>
                <TableCell className="font-mono text-xs font-bold text-brand-700">{s.speedKmh} km/h</TableCell>
                <TableCell className="font-mono text-xs">
                  {s.brakeSwitchActive ? <Badge variant="danger" size="sm">ACTIVE</Badge> : <Badge variant="default" size="sm">OFF</Badge>}
                </TableCell>
                <TableCell className="font-mono text-xs">{s.throttlePct}%</TableCell>
                <TableCell className="font-mono text-xs">{s.steeringAngleDeg}°</TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-800">{s.longitudinalG} G</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
