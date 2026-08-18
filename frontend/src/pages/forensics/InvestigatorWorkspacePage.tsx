import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { 
  ShieldAlert, 
  Cpu, 
  Terminal, 
  Activity, 
  FileText, 
  Lock, 
  Eye, 
  Clock, 
  MessageSquare, 
  CheckSquare, 
  Paperclip, 
  Send 
} from 'lucide-react';

export const InvestigatorWorkspacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'OBD' | 'SENSORS' | 'CAN' | 'ECU' | 'EDR' | 'EVIDENCE' | 'OCR' | 'DAMAGE' | 'TIMELINE' | 'AI_AGENTS'>('OVERVIEW');
  const [notes, setNotes] = useState<string[]>(['Forensic vehicle inspection confirmed unauthenticated CAN injection at 250Hz.']);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([newNote, ...notes]);
    setNewNote('');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Workspace Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 rounded-xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold font-mono tracking-tight">INVESTIGATION WORKSPACE: CLM-2026-8801</h1>
            <Badge variant="danger">HIGH FRAUD RISK (94%)</Badge>
          </div>
          <p className="text-xs text-slate-300 font-mono mt-1">
            2023 Chevrolet Corvette Stingray • Policy #POL-9920194 • Lead: Sarah Chen
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="danger" size="sm">Deny Claim (Fraud Clause)</Button>
          <Button variant="primary" size="sm">Export Case File</Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 pb-2">
        {[
          { key: 'OVERVIEW', label: 'Case Summary' },
          { key: 'OBD', label: 'OBD-II' },
          { key: 'SENSORS', label: 'Sensor AI' },
          { key: 'CAN', label: 'CAN Bus' },
          { key: 'ECU', label: 'ECU Reflash' },
          { key: 'EDR', label: 'EDR Black Box' },
          { key: 'EVIDENCE', label: 'Evidence Locker' },
          { key: 'OCR', label: 'Document OCR' },
          { key: 'DAMAGE', label: 'Damage Vision' },
          { key: 'TIMELINE', label: 'Timeline' },
          { key: 'AI_AGENTS', label: '11 AI Agents' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all shrink-0 ${
              activeTab === t.key
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Workspace Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Dossier View */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-900 font-mono mb-2 uppercase">Unified Forensic Diagnosis Summary</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              Primary ECM reflash executed 48 hours prior to claimed collision timestamp. CAN Bus diagnostic frames injected at 250Hz. AI Computer Vision confirms damage is minor cosmetic scratch ($2,450) vs claimant repair bill ($68,500).
            </p>
          </Card>
        </div>

        {/* Right Col: Real-time Notes & Tasks */}
        <div className="space-y-6">
          {/* Notes & Comments */}
          <Card className="p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 font-mono uppercase flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-brand-600" /> Case Notes & Investigator Logs
            </h4>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <Input
                placeholder="Add real-time forensic note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="text-xs"
              />
              <Button variant="primary" size="sm" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
                Log
              </Button>
            </form>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notes.map((note, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-sans text-slate-800">
                  <p>{note}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">Sarah Chen • Just now</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
