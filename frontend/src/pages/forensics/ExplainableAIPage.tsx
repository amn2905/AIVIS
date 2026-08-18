import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { CopilotApiClient } from '../../services/copilotApiClient';
import { SHAPFeatureAttribution, LIMEExplanation } from '../../types/copilot';
import { Cpu, Activity, BarChart2, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ExplainableAIPage: React.FC = () => {
  const [attributions, setAttributions] = useState<SHAPFeatureAttribution[]>([]);
  const [lime, setLime] = useState<LIMEExplanation | null>(null);

  useEffect(() => {
    CopilotApiClient.getSHAPAttributions().then(setAttributions);
    CopilotApiClient.getLIMEExplanation().then(setLime);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-brand-600" />
          Explainable AI (SHAP & LIME Attribution Matrix)
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Shapley Additive Explanations (SHAP) and LIME feature importance attributions for risk scoring
        </p>
      </div>

      {/* SHAP Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle>SHAP Waterfall Feature Risk Contributions</CardTitle>
          <span className="text-xs font-mono text-slate-400">Positive values increase fraud risk score</span>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-64 w-full text-xs font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attributions} layout="vertical" margin={{ left: 140 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="featureName" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="shapValue" name="SHAP Risk Weight (+)" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feature Importance Data Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Feature Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Recorded Value</TableHead>
              <TableHead>SHAP Risk Weight</TableHead>
              <TableHead>Attribution Description</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {attributions.map((att, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-bold text-xs text-slate-900">{att.featureName}</TableCell>
                <TableCell>
                  <Badge variant="purple" size="sm">{att.category}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-brand-700">{att.featureValue}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-rose-600">
                  +{(att.shapValue * 100).toFixed(0)}%
                </TableCell>
                <TableCell className="text-xs text-slate-600">{att.description}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
