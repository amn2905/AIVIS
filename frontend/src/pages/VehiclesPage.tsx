import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ApiClient } from '../services/apiClient';
import { Vehicle } from '../types';
import { Car, Search, ShieldAlert, Cpu } from 'lucide-react';

export const VehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    ApiClient.getVehicles().then(setVehicles);
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = 
      v.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Car className="w-5 h-5 text-brand-600" />
          Vehicle Telematics & VIN Registry
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          National vehicle database, stolen check registry, and CAN-Bus sensor diagnostics
        </p>
      </div>

      <Card className="p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search VIN, License Plate, Make/Model, or Owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          <Select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { label: 'All Categories', value: 'ALL' },
              { label: 'Sedan', value: 'Sedan' },
              { label: 'SUV', value: 'SUV' },
              { label: 'Commercial Truck', value: 'Commercial Truck' },
              { label: 'EV / Hybrid', value: 'EV / Hybrid' },
            ]}
          />
          <div className="flex items-end">
            <Button variant="outline" className="w-full text-xs" onClick={() => { setSearchTerm(''); setCategoryFilter('ALL'); }}>
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>VIN & Plate</TableHead>
              <TableHead>Vehicle Specs</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Registered Owner</TableHead>
              <TableHead>Stolen Registry Check</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Telematics Signals</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredVehicles.map((v) => (
              <TableRow key={v.id}>
                <TableCell>
                  <div className="font-mono font-bold text-slate-900 text-xs">{v.vin}</div>
                  <div className="text-[11px] text-slate-500 font-mono">Plate: {v.licensePlate} ({v.registrationState})</div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-xs text-slate-900">{v.year} {v.make} {v.model}</div>
                  <div className="text-[11px] text-slate-500 font-mono">Color: {v.color}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="purple" size="sm">{v.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium text-slate-900">{v.ownerName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{v.ownerNationalId}</div>
                </TableCell>
                <TableCell>
                  {v.stolenCheckStatus === 'FLAGGED' ? (
                    <Badge variant="danger" dot>STOLEN ALERT</Badge>
                  ) : (
                    <Badge variant="success" dot>CLEAR</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`font-mono font-bold text-xs ${v.riskScore > 80 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {v.riskScore} / 100
                  </span>
                </TableCell>
                <TableCell>
                  {v.telematics ? (
                    <div className="text-[11px] font-mono text-slate-600 space-y-0.5">
                      <div>Hard brakes: {v.telematics.hardBrakingEvents}</div>
                      {v.telematics.odometerTamperAlert && (
                        <div className="text-rose-600 font-bold">Tamper signal</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-mono">No active OBD-II</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
