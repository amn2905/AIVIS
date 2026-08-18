import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { GPSTripPoint } from '../../types/forensics';
import { Navigation, Play, Pause, MapPin, Upload, Activity } from 'lucide-react';

export const GPSTelematicsPage: React.FC = () => {
  const [points, setPoints] = useState<GPSTripPoint[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    ForensicsApiClient.getGPSTelematics().then(setPoints);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Navigation className="w-5 h-5 text-brand-600" />
            GPS Route Replay & Fleet Telematics Engine
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            GPX/JSON telematics log replay, vehicle stops, harsh braking, and speed profile
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
            Import GPX / JSON Log
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            icon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {isPlaying ? 'Pause Replay' : 'Play Route Replay'}
          </Button>
        </div>
      </div>

      {/* Interactive Map Visualizer Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Route & Stop Timeline</CardTitle>
          <span className="text-xs font-mono text-slate-400">Brooklyn, NY (40.6782° N, 73.9442° W)</span>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="text-center space-y-2 z-10">
              <MapPin className="w-8 h-8 text-brand-500 mx-auto animate-bounce" />
              <p className="text-xs font-mono text-slate-200">Interactive Map Stream Active</p>
              <p className="text-[11px] font-mono text-slate-400">Total Route Distance: 14.8 km • Avg Speed: 42 km/h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GPS Waypoints Data Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Coordinates (Lat, Lng)</TableHead>
              <TableHead>Altitude (m)</TableHead>
              <TableHead>Speed (km/h)</TableHead>
              <TableHead>Telematics Event Flag</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {points.map((p, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-mono text-xs text-slate-500">{new Date(p.timestamp).toLocaleTimeString()}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{p.latitude}, {p.longitude}</TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{p.altitudeMeters} m</TableCell>
                <TableCell className="font-mono text-xs font-bold text-brand-700">{p.speedKmh} km/h</TableCell>
                <TableCell>
                  {p.eventFlag === 'RAPID_ACCEL' && <Badge variant="warning" size="sm">RAPID ACCEL</Badge>}
                  {p.eventFlag === 'HARSH_BRAKE' && <Badge variant="danger" size="sm">HARSH BRAKE</Badge>}
                  {p.eventFlag === 'STOP' && <Badge variant="info" size="sm">STOP (4m)</Badge>}
                  {p.eventFlag === 'NORMAL' && <Badge variant="default" size="sm">NORMAL</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
