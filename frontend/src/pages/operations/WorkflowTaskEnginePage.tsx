import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { OperationsApiClient } from '../../services/operationsApiClient';
import { InvestigationTask, TaskStatus } from '../../types/operations';
import { CheckSquare, Clock, User, Plus, Filter, CheckCircle2 } from 'lucide-react';

export const WorkflowTaskEnginePage: React.FC = () => {
  const [tasks, setTasks] = useState<InvestigationTask[]>([]);

  useEffect(() => {
    OperationsApiClient.getTasks().then(setTasks);
  }, []);

  const columns: { status: TaskStatus; title: string; badgeColor: string }[] = [
    { status: 'BACKLOG', title: 'Task Backlog', badgeColor: 'bg-slate-200 text-slate-700' },
    { status: 'IN_PROGRESS', title: 'In Progress', badgeColor: 'bg-brand-100 text-brand-700' },
    { status: 'UNDER_REVIEW', title: 'Under Review', badgeColor: 'bg-amber-100 text-amber-800' },
    { status: 'COMPLETED', title: 'Completed', badgeColor: 'bg-emerald-100 text-emerald-800' }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-600" />
            Investigation Workflow Engine & Task Matrix
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            KanBan task board, forensic checklist enforcement, and auto-assignment engine
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Create Forensic Task
        </Button>
      </div>

      {/* KanBan Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.status);

          return (
            <div key={col.status} className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-mono">{col.title}</span>
                <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full ${col.badgeColor}`}>
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {colTasks.map(t => (
                  <Card key={t.id} className="p-4 bg-white border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                        {t.category}
                      </span>
                      <RiskBadge level={t.priority} />
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{t.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>

                    {/* Checklist Items */}
                    <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">Checklist Enforcement</span>
                      {t.checklistItems.map(item => (
                        <div key={item.id} className="flex items-center gap-1.5 text-slate-600">
                          <CheckCircle2 className={`w-3 h-3 ${item.isDone ? 'text-emerald-600' : 'text-slate-300'}`} />
                          <span className={item.isDone ? 'line-through text-slate-400' : ''}>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t">
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-500" /> {t.assigneeName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {new Date(t.dueDate).toLocaleDateString()}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
