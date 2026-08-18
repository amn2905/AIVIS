import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, ShieldAlert, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../../types';
import { RiskBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigate: (path: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onNavigate
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-100 text-brand-700 rounded-lg">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Notification Center</h3>
                    <p className="text-xs text-slate-500 font-mono">Live System Risk Stream</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-header controls */}
              <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono font-medium">{notifications.length} Alert Messages</span>
                <button
                  onClick={onMarkAllRead}
                  className="text-brand-600 hover:text-brand-700 font-semibold hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              {/* List items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      item.read
                        ? 'bg-white border-slate-200 opacity-75'
                        : 'bg-brand-50/30 border-brand-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.type === 'FRAUD_ALERT' && <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />}
                        {item.type === 'CLAIM_UPDATE' && <Info className="w-4 h-4 text-sky-600 shrink-0" />}
                        {item.type === 'SYSTEM_SECURITY' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">{item.title}</h4>
                      </div>
                      <RiskBadge level={item.severity} />
                    </div>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.message}</p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono">{item.timestamp}</span>
                      {item.link && (
                        <button
                          onClick={() => {
                            onNavigate(item.link!);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700"
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => {
                    onNavigate('/notifications');
                    onClose();
                  }}
                >
                  Manage All Security Feeds
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
