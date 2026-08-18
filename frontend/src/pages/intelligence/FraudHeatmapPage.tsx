import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { MapPin, Globe, Activity } from 'lucide-react';

export const FraudHeatmapPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-600" />
          Geospatial Fraud Syndicate & Cluster Heatmap
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Spatial density analysis of coordinated collisions and fraudulent body shop locations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global / Regional Syndicate Density Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="text-center space-y-2 z-10">
              <MapPin className="w-8 h-8 text-rose-500 mx-auto animate-bounce" />
              <p className="text-xs font-mono text-slate-200">High Density Cluster Detected: Brooklyn, NY Metro</p>
              <p className="text-[11px] font-mono text-slate-400">14 Connected Claims • $1.48M USD Total Fraud Value</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
