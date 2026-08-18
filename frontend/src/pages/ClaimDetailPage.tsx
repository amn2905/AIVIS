import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RiskBadge, ClaimStatusBadge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { Claim, ClaimStatus } from '../types';
import { 
  ShieldAlert, 
  Car, 
  FileText, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Cpu, 
  Activity, 
  FileCheck,
  ArrowLeft
} from 'lucide-react';

export const ClaimDetailPage: React.FC<{
  claimId: string;
  onNavigate: (path: string) => void;
}> = ({ claimId, onNavigate }) => {
  const [claim, setClaim] = useState<Claim | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    ApiClient.getClaimById(claimId).then(setClaim);
  }, [claimId]);

  const handleStatusChange = async (newStatus: ClaimStatus) => {
    if (!claim) return;
    setIsUpdating(true);
    const updated = await ApiClient.updateClaimStatus(claim.id, newStatus);
    setClaim(updated);
    setIsUpdating(false);
  };

  if (!claim) {
    return (
      <div className="py-20 text-center text-slate-500 font-mono text-xs">
        Loading Claim Investigation Dossier...
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Dossier Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/claims')}
              className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 font-mono tracking-tight">{claim.claimNumber}</h1>
            <ClaimStatusBadge status={claim.status} />
            <RiskBadge level={claim.riskLevel} />
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Policy #{claim.policyNumber} • {claim.companyName} ({claim.branchName})
          </p>
        </div>

        {/* Status Mutators */}
        <div className="flex items-center gap-2">
          <Button
            variant="danger"
            size="sm"
            isLoading={isUpdating}
            onClick={() => handleStatusChange('FRAUD_SUSPECTED')}
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
          >
            Flag Fraud Suspected
          </Button>
          <Button
            variant="secondary"
            size="sm"
            isLoading={isUpdating}
            onClick={() => handleStatusChange('FIELD_INVESTIGATION')}
            icon={<Activity className="w-3.5 h-3.5" />}
          >
            Dispatch Field Unit
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isUpdating}
            onClick={() => handleStatusChange('APPROVED')}
            icon={<CheckCircle className="w-3.5 h-3.5" />}
          >
            Approve Claim
          </Button>
        </div>
      </div>

      {/* Overview Matrix Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fraud Risk Score Card */}
        <Card className="p-5 border-l-4 border-l-rose-500 bg-gradient-to-br from-white via-white to-rose-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AIVIS Fraud Neural Score</span>
            <Cpu className="w-5 h-5 text-rose-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-rose-600 font-mono">{claim.fraudScore}</span>
            <span className="text-sm font-semibold text-slate-500">/ 100 Risk Index</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-rose-600" style={{ width: `${claim.fraudScore}%` }} />
          </div>
          <p className="text-xs text-rose-700 font-medium mt-2">High confidence anomaly detected across telemetry & EXIF image scans.</p>
        </Card>

        {/* Claim Summary */}
        <Card className="p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Financial Loss</span>
          <div className="text-3xl font-bold font-mono text-slate-900">${claim.estimatedLossUsd.toLocaleString()} USD</div>
          <div className="pt-2 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Incident Date: {new Date(claim.incidentDate).toLocaleString()}</div>
            <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Location: {claim.incidentLocation.city}, {claim.incidentLocation.country}</div>
          </div>
        </Card>

        {/* Investigator Assignment */}
        <Card className="p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Investigator</span>
          <div className="text-base font-bold text-slate-900">{claim.assignedInvestigatorName || 'Unassigned'}</div>
          <p className="text-xs text-slate-500 font-mono">Role: Senior Forensic Analyst</p>
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Reassign Investigator
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Vehicle & Flagged Anomalies & Evidence */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Information & Telematics */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Car className="w-4 h-4 text-brand-600" />
                Vehicle Registry & Telematics Diagnostic
              </CardTitle>
              <span className="text-xs font-mono text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
                VIN: {claim.vehicle.vin}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">MAKE & MODEL</span>
                  <span className="font-bold text-slate-900">{claim.vehicle.year} {claim.vehicle.make} {claim.vehicle.model}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">PLATE & STATE</span>
                  <span className="font-bold text-slate-900">{claim.vehicle.licensePlate} ({claim.vehicle.registrationState})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">THEFT CHECK</span>
                  <span className={`font-bold ${claim.vehicle.stolenCheckStatus === 'FLAGGED' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {claim.vehicle.stolenCheckStatus}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">OWNER</span>
                  <span className="font-bold text-slate-900 truncate block">{claim.vehicle.ownerName}</span>
                </div>
              </div>

              {/* Telematics summary if present */}
              {claim.vehicle.telematics && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 font-mono">CAN-Bus Telematics Sensors Dump</span>
                    {claim.vehicle.telematics.odometerTamperAlert && (
                      <span className="text-rose-600 font-mono font-bold text-[11px] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> ODOMETER TAMPER SIGNAL
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-white border rounded">
                      <span className="text-slate-400 text-[10px] block">HARD BRAKES</span>
                      <span className="font-bold text-slate-900">{claim.vehicle.telematics.hardBrakingEvents} Events</span>
                    </div>
                    <div className="p-2 bg-white border rounded">
                      <span className="text-slate-400 text-[10px] block">SPEEDING</span>
                      <span className="font-bold text-slate-900">{claim.vehicle.telematics.speedingIncidents} Incidents</span>
                    </div>
                    <div className="p-2 bg-white border rounded">
                      <span className="text-slate-400 text-[10px] block">NIGHT DRIVING</span>
                      <span className="font-bold text-slate-900">{claim.vehicle.telematics.nighttimeMilesPct}% Miles</span>
                    </div>
                    <div className="p-2 bg-white border rounded">
                      <span className="text-slate-400 text-[10px] block">ODOMETER</span>
                      <span className="font-bold text-slate-900">{claim.vehicle.telematics.lastKnownOdometer.toLocaleString()} Mi</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Flagged Factors */}
          <Card>
            <CardHeader>
              <CardTitle>
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                AI Neural Fraud Detection Audit Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {claim.flaggedFactors.map((factor, idx) => (
                  <li key={idx} className="p-3 bg-rose-50/50 border border-rose-200/70 rounded-lg flex items-start gap-2.5 text-xs text-rose-900 font-medium">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Evidence Files */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FileCheck className="w-4 h-4 text-brand-600" />
                Evidence & Visual Audits ({claim.evidence.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {claim.evidence.map((ev) => (
                <div key={ev.id} className="p-3.5 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{ev.title}</span>
                      <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">{ev.type}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ev.notes}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-slate-400 block">AI AUTHENTICITY</span>
                      <span className={`text-xs font-bold ${ev.aiAuthenticityScore > 70 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {ev.aiAuthenticityScore}%
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
              {claim.evidence.length === 0 && (
                <p className="text-xs text-slate-500 font-mono py-4 text-center">No digital evidence uploaded yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Timeline & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Clock className="w-4 h-4 text-brand-600" />
                Dossier Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {claim.timeline.map((tl) => (
                  <div key={tl.id} className="relative flex items-start gap-3 text-xs">
                    <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-white" />
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900">{tl.title}</p>
                      <p className="text-slate-600 text-[11px]">{tl.description}</p>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                        <span>{tl.timestamp}</span>
                        <span>•</span>
                        <span>{tl.actor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
