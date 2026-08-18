import React, { useState } from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  FileSearch, 
  Car, 
  Building2, 
  GitBranch, 
  Users, 
  UserCheck, 
  History, 
  Bell, 
  Settings, 
  User as UserIcon,
  ChevronRight,
  LogOut,
  Sparkles,
  Cpu,
  Activity,
  Terminal,
  FileCode,
  Navigation,
  Lock,
  FileText,
  Eye,
  Clock,
  Briefcase,
  Network,
  Globe,
  DollarSign,
  BarChart2,
  Bot,
  CheckSquare,
  Award,
  MessageSquare,
  Wifi,
  TrendingUp,
  Code,
  CreditCard,
  Shield,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleType } from '../../types';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: any;
  badge?: string;
  roleCheck?: RoleType[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activePath, onNavigate }) => {
  const { user, logout, hasRole } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationGroups: NavGroup[] = [
    {
      title: 'COMMAND CENTER',
      items: [
        { name: 'SOC Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'LIVE' },
        { name: 'Claim Investigations', path: '/claims', icon: FileSearch, badge: '89' },
        { name: 'Vehicle Registry', path: '/vehicles', icon: Car },
      ]
    },
    {
      title: 'ASK AIVIS & MULTI-AGENT',
      items: [
        { name: 'Ask AIVIS & 11 Experts', path: '/forensics/copilot', icon: Bot, badge: '11 AGENTS' },
        { name: 'Explainable AI (SHAP)', path: '/forensics/explainable-ai', icon: BarChart2, badge: 'XAI' },
      ]
    },
    {
      title: 'COMMERCIAL PLATFORM & OEM',
      items: [
        { name: 'OEM Telematics Gateway', path: '/commercial/oem', icon: Wifi, badge: 'TESLA' },
        { name: 'Predictive AI Intelligence', path: '/commercial/predictive', icon: TrendingUp },
        { name: 'Developer Portal & Keys', path: '/commercial/developer', icon: Code, badge: 'API' },
        { name: 'SaaS Licensing & Billing', path: '/commercial/licensing', icon: CreditCard },
        { name: 'Executive Portfolio Risk', path: '/commercial/portfolio', icon: Shield, badge: 'EXEC' },
      ]
    },
    {
      title: 'ENTERPRISE OPERATIONS & COMPLIANCE',
      items: [
        { name: 'Workflow & Task Matrix', path: '/operations/workflow', icon: CheckSquare, badge: 'KANBAN' },
        { name: 'SLA Breach Monitoring', path: '/operations/sla', icon: Clock, badge: 'SLA' },
        { name: 'Digital Signatures PKI', path: '/operations/approvals', icon: Lock },
        { name: 'Compliance Audit Dashboard', path: '/operations/compliance', icon: Award, badge: 'ISO' },
        { name: 'Team Collaboration Feed', path: '/operations/collaboration', icon: MessageSquare },
      ]
    },
    {
      title: 'FRAUD INTELLIGENCE & GRAPH',
      items: [
        { name: 'Fraud Knowledge Graph', path: '/intelligence/graph', icon: Network, badge: 'NEO4J' },
        { name: 'Graph Algorithms & PageRank', path: '/intelligence/algorithms', icon: Cpu },
        { name: 'VIN Cloning & Ghost Policies', path: '/intelligence/vin-policy', icon: Car, badge: 'ALERT' },
        { name: 'Workshops & Surveyors Risk', path: '/intelligence/workshops', icon: Building2 },
        { name: 'Organized Fraud Syndicates', path: '/intelligence/entities', icon: ShieldAlert, badge: 'RING' },
        { name: 'Money Flow Analysis', path: '/intelligence/money-flow', icon: DollarSign },
        { name: 'Geospatial Fraud Heatmap', path: '/intelligence/heatmap', icon: Globe },
      ]
    },
    {
      title: 'DIGITAL FORENSICS & AI',
      items: [
        { name: 'OBD-II Acquisition', path: '/forensics/obd', icon: Cpu },
        { name: 'Sensor Intelligence', path: '/forensics/sensors', icon: Activity, badge: 'AI' },
        { name: 'CAN Bus Forensics', path: '/forensics/canbus', icon: Terminal },
        { name: 'ECU Reflash Forensics', path: '/forensics/ecu', icon: FileCode },
        { name: 'EDR Black Box Crash', path: '/forensics/edr', icon: Activity },
        { name: 'GPS & Telematics', path: '/forensics/gps', icon: Navigation },
        { name: 'Digital Evidence Locker', path: '/forensics/evidence', icon: Lock, badge: 'SHA256' },
        { name: 'Document OCR', path: '/forensics/ocr', icon: FileText },
        { name: 'AI Damage Vision', path: '/forensics/damage', icon: Eye },
        { name: 'Forensic Timeline', path: '/forensics/timeline', icon: Clock },
        { name: 'Investigator Workspace', path: '/forensics/workspace', icon: Briefcase },
      ]
    },
    {
      title: 'ACCESS & GOVERNANCE',
      items: [
        { name: 'User Management', path: '/users', icon: Users, roleCheck: ['SUPER_ADMIN', 'INSURANCE_ADMIN'] },
        { name: 'Roles & RBAC Matrix', path: '/roles', icon: UserCheck, roleCheck: ['SUPER_ADMIN'] },
        { name: 'Audit Trail & Logs', path: '/activity-logs', icon: History },
      ]
    },
    {
      title: 'SYSTEM & PROFILE',
      items: [
        { name: 'Notifications', path: '/notifications', icon: Bell, badge: '3' },
        { name: 'System Settings', path: '/settings', icon: Settings },
        { name: 'My Profile', path: '/profile', icon: UserIcon },
      ]
    }
  ];

  return (
    <aside className={clsx(
      "bg-[#F4F5F7]/90 backdrop-blur-md border-r border-[#E8EAF0] shrink-0 flex flex-col h-screen select-none font-sans sticky top-0 z-30 transition-all duration-300 shadow-clay-sm",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[#E8EAF0] flex items-center justify-between bg-white/70">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-slate-800 flex items-center justify-center text-white shadow-clay-sm shrink-0 ring-2 ring-indigo-500/20">
            <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
          </div>
          {!isCollapsed && (
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#111827] font-mono">AIVIS</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-1.5 py-0.2 border border-indigo-200/80 rounded-full">v6.0</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">Enterprise Luxury SaaS</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Security Status Ribbon */}
      {!isCollapsed && (
        <div className="mx-3 my-3 px-3 py-2 bg-white/80 border border-[#E8EAF0] rounded-xl shadow-clay-sm flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700 text-[11px]">SOC Engine Active</span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {navigationGroups.map((group, idx) => {
          const visibleItems = group.items.filter(item => {
            if (!item.roleCheck) return true;
            return hasRole(item.roleCheck);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <h4 className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  {group.title}
                </h4>
              )}
              <nav className="space-y-0.5 mt-1">
                {visibleItems.map((item) => {
                  const isActive = activePath === item.path || (item.path !== '/' && activePath.startsWith(item.path));
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      title={isCollapsed ? item.name : undefined}
                      className={clsx(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group",
                        isActive
                          ? "bg-white text-indigo-700 font-semibold border border-indigo-200/80 shadow-clay-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={clsx(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isActive ? "bg-indigo-50 text-indigo-600 border border-indigo-200/60" : "bg-slate-200/60 text-slate-500 group-hover:text-slate-700 group-hover:bg-slate-200"
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5">
                          {item.badge && (
                            <span className={clsx(
                              "px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full border",
                              isActive
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-slate-200/80 text-slate-600 border-slate-300 group-hover:bg-slate-300"
                            )}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className={clsx(
                            "w-3 h-3 text-slate-300 group-hover:text-slate-400 transition-transform",
                            isActive && "rotate-90 text-indigo-600"
                          )} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#E8EAF0] bg-white/50">
        <div className="p-2.5 bg-white border border-[#E8EAF0] rounded-xl flex items-center justify-between shadow-clay-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user?.fullName || 'User Avatar'}
              className="w-8 h-8 rounded-full border border-slate-300 object-cover shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#111827] truncate">{user?.fullName || 'Alex Vance'}</p>
                <p className="text-[10px] text-slate-500 font-mono truncate">{user?.role || 'SUPER_ADMIN'}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
