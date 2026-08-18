import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ClaimStatusBadge, RiskBadge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { Claim, ClaimStatus } from '../types';
import { Search, Plus, Filter, FileSearch, ShieldAlert } from 'lucide-react';

export const ClaimsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New claim form state
  const [newClaimNumber, setNewClaimNumber] = useState(`CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newPolicyNumber, setNewPolicyNumber] = useState('POL-9941029');
  const [newVin, setNewVin] = useState('1G1YC2D75H5109899');
  const [newMakeModel, setNewMakeModel] = useState('Porsche Taycan 4S');
  const [newLossEstimate, setNewLossEstimate] = useState('45000');
  const [newDescription, setNewDescription] = useState('Vehicle collision at intersection during heavy fog.');

  useEffect(() => {
    ApiClient.getClaims().then(setClaims);
  }, []);

  const filteredClaims = claims.filter(c => {
    const matchesSearch = 
      (c.claimNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.policyNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.vehicle?.vin || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.vehicle?.make || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.vehicle?.model || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Claim = {
      id: `clm-${Date.now()}`,
      claimNumber: newClaimNumber,
      policyNumber: newPolicyNumber,
      companyId: 'comp-1',
      companyName: 'Metropolitan Mutual Insurance',
      branchId: 'br-101',
      branchName: 'New York HQ Branch',
      vehicle: {
        id: `veh-${Date.now()}`,
        vin: newVin,
        make: newMakeModel.split(' ')[0] || 'Porsche',
        model: newMakeModel.split(' ').slice(1).join(' ') || 'Taycan',
        year: 2024,
        licensePlate: 'NY-8841',
        registrationState: 'NY',
        category: 'EV / Hybrid',
        engineNumber: 'ENG-9910',
        color: 'Jet Black Metallic',
        ownerName: 'Apex Fleet User',
        ownerNationalId: 'SSN-***-**-9910',
        stolenCheckStatus: 'CLEAR',
        riskScore: 78
      },
      incidentDate: new Date().toISOString(),
      reportedDate: new Date().toISOString(),
      incidentLocation: {
        city: 'New York',
        state: 'NY',
        country: 'United States',
        latitude: 40.7128,
        longitude: -74.0060
      },
      incidentDescription: newDescription,
      status: 'SUBMITTED',
      fraudScore: 68,
      riskLevel: 'HIGH',
      estimatedLossUsd: Number(newLossEstimate) || 45000,
      flaggedFactors: ['First notice of loss submitted under 24h of policy binding'],
      evidence: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Claim Created',
          description: 'Initial intake dossier logged in AIVIS.',
          actor: 'Claims Portal Intake',
          type: 'SYSTEM'
        }
      ]
    };

    setClaims([created, ...claims]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-brand-600" />
            Claim Investigations Manager
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Audit, escalate, and inspect AI fraud flags for active insurance dossiers
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Investigation Claim
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search claim #, policy #, VIN, or vehicle make..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          <Select
            label="Filter Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: 'All Claim Statuses', value: 'ALL' },
              { label: 'Fraud Suspected', value: 'FRAUD_SUSPECTED' },
              { label: 'Field Investigation', value: 'FIELD_INVESTIGATION' },
              { label: 'Under Review', value: 'UNDER_REVIEW' },
              { label: 'Submitted', value: 'SUBMITTED' },
              { label: 'Approved', value: 'APPROVED' },
              { label: 'Rejected', value: 'REJECTED' },
            ]}
          />
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
              icon={<Filter className="w-3.5 h-3.5" />}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Claims Data Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Claim / Policy #</TableHead>
              <TableHead>Vehicle & VIN</TableHead>
              <TableHead>Company & Branch</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Fraud Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Est. Loss</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredClaims.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="font-mono font-bold text-slate-900 text-xs">{c.claimNumber || c.id}</div>
                  <div className="text-[11px] text-slate-500 font-mono">POL: {c.policyNumber || 'N/A'}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-xs text-slate-900">{c.vehicle ? `${c.vehicle.year || ''} ${c.vehicle.make || ''} ${c.vehicle.model || ''}`.trim() : 'N/A'}</div>
                  <div className="text-[11px] text-slate-500 font-mono">VIN: {c.vehicle?.vin || 'N/A'}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-slate-800">{c.companyName || 'N/A'}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{c.branchName || 'N/A'}</div>
                </TableCell>
                <TableCell>
                  <RiskBadge level={c.riskLevel} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          (c.fraudScore || 0) > 80 ? 'bg-rose-500' : (c.fraudScore || 0) > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${c.fraudScore || 0}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-xs">{c.fraudScore || 0}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ClaimStatusBadge status={c.status} />
                </TableCell>
                <TableCell className="text-right font-mono font-semibold text-xs text-slate-900">
                  ${(c.estimatedLossUsd ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(`/claims/${c.id}`)}
                    className="text-xs text-brand-600 hover:text-brand-700"
                  >
                    Dossier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredClaims.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-slate-500 text-xs font-mono">
                  No matching claims found in the database.
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </TableContainer>
      </Card>

      {/* New Claim Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Investigation Claim Intake"
        subtitle="Log a new notice of vehicle loss to trigger AIVIS Neural Fraud Scoring"
      >
        <form onSubmit={handleCreateClaim} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Claim Number"
              value={newClaimNumber}
              onChange={(e) => setNewClaimNumber(e.target.value)}
              required
            />
            <Input
              label="Policy Number"
              value={newPolicyNumber}
              onChange={(e) => setNewPolicyNumber(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Vehicle VIN"
              value={newVin}
              onChange={(e) => setNewVin(e.target.value)}
              required
            />
            <Input
              label="Vehicle Make & Model"
              value={newMakeModel}
              onChange={(e) => setNewMakeModel(e.target.value)}
              required
            />
          </div>

          <Input
            label="Estimated Loss (USD)"
            type="number"
            value={newLossEstimate}
            onChange={(e) => setNewLossEstimate(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Incident Loss Summary
            </label>
            <textarea
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Run AI Fraud Assessment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
