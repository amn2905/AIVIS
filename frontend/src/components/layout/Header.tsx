import React from 'react';
import { Search, Bell, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenCopilot: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onOpenSearch,
  onOpenNotifications,
  onOpenCopilot,
  unreadNotificationsCount = 3
}) => {
  const { user } = useAuth();

  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length === 0) return ['Command Center', 'SOC Dashboard'];

    const formatted = parts.map(p => {
      const clean = p.replace('-', ' ');
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    });
    return ['Command Center', ...formatted];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 backdrop-blur-xl bg-white/80 border border-[#E8EAF0] rounded-2xl mx-6 my-4 px-6 flex items-center justify-between sticky top-4 z-20 font-sans shadow-clay-sm">
      {/* Left Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
            <span className={idx === breadcrumbs.length - 1 ? "text-[#111827] font-bold tracking-tight" : "hover:text-slate-700"}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Center Command Search Bar */}
      <div className="flex-1 max-w-md mx-6">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-[#F4F5F7]/80 hover:bg-[#F4F5F7] text-slate-500 text-xs font-sans rounded-xl border border-[#E8EAF0] transition-all shadow-clay-inset group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span className="text-slate-500">Search claims, VINs, companies, users...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white border border-[#E8EAF0] rounded-md shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-3">
        {/* Ask AIVIS Trigger Button */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-mono font-bold rounded-xl shadow-clay-sm transition-all ring-2 ring-indigo-500/20 active:scale-95"
          title="Ask AIVIS — Your AI Vehicle Investigation Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
          <span>Ask AIVIS</span>
        </button>

        {/* Security Shield Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-mono font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>RBAC: {user?.role || 'SUPER_ADMIN'}</span>
        </div>

        {/* Notifications Trigger */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-colors"
          title="Open Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
          )}
        </button>

        <div className="h-6 w-px bg-[#E8EAF0] mx-1" />

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-[#111827] leading-none">{user?.companyName || 'Metropolitan Mutual'}</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{user?.fullName}</p>
          </div>
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-slate-300 object-cover"
          />
        </div>
      </div>
    </header>
  );
};
