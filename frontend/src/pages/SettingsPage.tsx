import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Settings, Key, Database, Shield, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-600" />
          AIVIS Platform Settings
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Neural engine thresholding, API keys, rate limits, and audit retention rules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Shield className="w-4 h-4 text-brand-600" />
                AI Fraud Engine Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Critical Fraud Trigger Score" defaultValue="85" type="number" />
              <Input label="EXIF Vision Authenticity Flag Threshold" defaultValue="50" type="number" />
              <Input label="CAN-Bus Telematics Anomaly Sensitivity" defaultValue="High" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Key className="w-4 h-4 text-brand-600" />
                API Integration Security Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Telematics Ingestion Token" defaultValue="aivis_live_tk_99182049102" type="password" />
              <Input label="National Stolen Vehicle Registry Key" defaultValue="nsvr_sec_88291048" type="password" />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <Database className="w-4 h-4 text-brand-600" />
                Audit Log Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Security event logs are preserved for 7 years per insurance compliance standards.
              </p>
              <Button variant="primary" className="w-full" icon={<Save className="w-4 h-4" />}>
                Save System Config
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
