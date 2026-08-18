import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { VehicleCategoryStat } from '../../types';
import { Car } from 'lucide-react';

const COLORS = ['#0979f6', '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export const VehicleCategoryChart: React.FC<{ data: VehicleCategoryStat[] }> = ({ data }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div>
          <CardTitle>
            <Car className="w-4 h-4 text-brand-600" />
            Vehicle Categories
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">Taxonomy breakdown of registered claims</p>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-52 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="count"
                nameKey="category"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          {data.map((item, idx) => (
            <div key={item.category} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="truncate text-slate-700 font-medium">{item.category}</span>
              </div>
              <span className="font-mono text-slate-500 text-[11px]">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
