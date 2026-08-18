import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RiskBadge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { NotificationItem } from '../types';
import { Bell, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const NotificationsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    ApiClient.getNotifications().then(setItems);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-600" />
            Security Notification Hub
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            System alert stream, neural risk triggers, and fraud escalations
          </p>
        </div>
        <Button variant="outline" onClick={() => setItems(prev => prev.map(i => ({ ...i, read: true })))}>
          Mark All Read
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4 border-slate-200/90">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0 mt-0.5">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <RiskBadge level={item.severity} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{item.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-2 block">{item.timestamp}</span>
                </div>
              </div>

              {item.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(item.link!)}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Inspect
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
