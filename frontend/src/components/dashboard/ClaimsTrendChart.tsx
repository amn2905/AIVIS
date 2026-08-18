import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { MonthlyClaimStat } from '../../types';
import { TrendingUp } from 'lucide-react';

export const ClaimsTrendChart: React.FC<{ data: MonthlyClaimStat[] }> = ({ data }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>
            <TrendingUp className="w-4 h-4 text-brand-600" />
            Claims Volume & Fraud Detection Trend
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">Monthly breakdown of filed vs AI-detected fraud cases</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Total Claims
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Fraud Detected
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-72 w-full font-sans text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0979f6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#0979f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '8px', 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  fontFamily: 'Inter'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="totalClaims" 
                name="Total Claims"
                stroke="#0979f6" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
              <Area 
                type="monotone" 
                dataKey="fraudDetected" 
                name="Fraud Cases"
                stroke="#ef4444" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorFraud)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
