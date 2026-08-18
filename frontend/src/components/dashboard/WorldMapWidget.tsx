import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Globe, MapPin } from 'lucide-react';
import { IncidentLocationMarker } from '../../types';

export const WorldMapWidget: React.FC<{ markers: IncidentLocationMarker[] }> = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<IncidentLocationMarker | null>(markers[0]);

  // Convert lat/lng to SVG percentage coordinates
  const getCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>
            <Globe className="w-4 h-4 text-brand-600" />
            Global Investigation Heatmap
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">Geographic cluster analysis of high-risk vehicle incidents</p>
        </div>
        {selectedMarker && (
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-brand-50 border border-brand-200 rounded-md text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span className="font-semibold text-brand-900">{selectedMarker.locationName}:</span>
            <span className="text-slate-600">{selectedMarker.claimCount} claims ({selectedMarker.highRiskCount} high risk)</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-4">
        <div className="relative w-full h-72 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
          {/* Subtle World Map Grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          {/* Stylized World Map SVG outline */}
          <svg className="w-full h-full opacity-35 text-slate-500 fill-current" viewBox="0 0 1000 500">
            {/* North America */}
            <path d="M150,120 Q200,80 300,100 T350,220 Q250,280 180,220 Z" />
            {/* South America */}
            <path d="M280,260 Q340,260 360,340 T300,440 Q250,380 270,300 Z" />
            {/* Europe */}
            <path d="M480,90 Q540,80 580,120 T520,200 Q460,180 480,90 Z" />
            {/* Africa */}
            <path d="M480,210 Q580,200 600,320 T520,420 Q460,320 480,210 Z" />
            {/* Asia */}
            <path d="M600,100 Q780,60 850,150 T750,280 Q640,240 600,100 Z" />
            {/* Australia */}
            <path d="M780,320 Q880,310 860,400 T780,410 Q740,360 780,320 Z" />
          </svg>

          {/* Interactive Incident Pulsing Pins */}
          {markers.map((marker) => {
            const { x, y } = getCoordinates(marker.lat, marker.lng);
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <div
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              >
                {/* Outer Ring Animation */}
                <div className={`w-6 h-6 rounded-full absolute -inset-1 animate-ping opacity-75 ${
                  marker.highRiskCount > 20 ? 'bg-rose-500' : 'bg-brand-500'
                }`} />

                {/* Marker Dot */}
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform ${
                  isSelected ? 'scale-125 ring-4 ring-brand-400/50' : 'group-hover:scale-110'
                } ${marker.highRiskCount > 20 ? 'bg-rose-600' : 'bg-brand-600'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Hover Tooltip Popover */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 bg-slate-950 text-white rounded-lg shadow-xl border border-slate-700 text-xs z-30">
                  <p className="font-bold text-slate-100">{marker.locationName}</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>Total Claims:</span>
                    <span className="font-bold text-brand-400">{marker.claimCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>High Risk:</span>
                    <span className="font-bold text-rose-400">{marker.highRiskCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
