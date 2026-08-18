import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RoleType } from '../types';
import { ShieldAlert, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('alex.vance@aivis-sec.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    onSuccess();
  };

  const handlePresetLogin = async (presetEmail: string, role: RoleType) => {
    setIsLoading(true);
    await login(presetEmail, role);
    setIsLoading(false);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans select-none relative overflow-hidden">
      {/* Background glow matrix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        {/* Top Header */}
        <div className="p-8 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 ring-4 ring-brand-100">
            <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-mono">AIVIS FORENSICS</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Enterprise AI Vehicle Insurance Investigation System</p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Corporate Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full py-2.5 text-sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to SOC Command
            </Button>
          </form>

          {/* Quick Demo Presets */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
              <span>ONE-CLICK DEMO ROLES</span>
              <Sparkles className="w-3 h-3 text-brand-600" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handlePresetLogin('alex.vance@aivis-sec.io', 'SUPER_ADMIN')}
                className="p-2 text-left bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-lg transition-colors"
              >
                <div className="font-bold text-slate-900">Super Admin</div>
                <div className="text-[10px] text-slate-500 font-mono">Global Access</div>
              </button>
              <button
                type="button"
                onClick={() => handlePresetLogin('sarah.chen@metropolitan-ins.com', 'FRAUD_ANALYST')}
                className="p-2 text-left bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-lg transition-colors"
              >
                <div className="font-bold text-slate-900">Fraud Analyst</div>
                <div className="text-[10px] text-slate-500 font-mono">Neural Scans</div>
              </button>
              <button
                type="button"
                onClick={() => handlePresetLogin('marcus.reid@apex-assurance.com', 'CLAIMS_INVESTIGATOR')}
                className="p-2 text-left bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-lg transition-colors"
              >
                <div className="font-bold text-slate-900">Investigator</div>
                <div className="text-[10px] text-slate-500 font-mono">Field Reports</div>
              </button>
              <button
                type="button"
                onClick={() => handlePresetLogin('elena.rostova@nordic-shield.se', 'BRANCH_AUDITOR')}
                className="p-2 text-left bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-lg transition-colors"
              >
                <div className="font-bold text-slate-900">Branch Auditor</div>
                <div className="text-[10px] text-slate-500 font-mono">Compliance</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono">
          Encrypted Session • JWT + Audit Compliance • AIVIS v1.0
        </div>
      </div>
    </div>
  );
};
