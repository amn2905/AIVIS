import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileSearch, Car, Building2, User as UserIcon, ArrowRight, X } from 'lucide-react';
import { mockClaims, mockVehicles, mockCompanies, mockUsers } from '../../services/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent state
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredClaims = mockClaims.filter(c => 
    c.claimNumber.toLowerCase().includes(query.toLowerCase()) ||
    c.policyNumber.toLowerCase().includes(query.toLowerCase()) ||
    c.vehicle.vin.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVehicles = mockVehicles.filter(v => 
    v.vin.toLowerCase().includes(query.toLowerCase()) ||
    v.make.toLowerCase().includes(query.toLowerCase()) ||
    v.model.toLowerCase().includes(query.toLowerCase()) ||
    v.licensePlate.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCompanies = mockCompanies.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(u =>
    u.fullName.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10"
        >
          {/* Input Box */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/70">
            <Search className="w-5 h-5 text-brand-600 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type claim #, VIN, policy, company or investigator name..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results section */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {/* Claims section */}
            {filteredClaims.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileSearch className="w-3.5 h-3.5" /> Claims ({filteredClaims.length})
                </div>
                {filteredClaims.map(claim => (
                  <button
                    key={claim.id}
                    onClick={() => {
                      onNavigate(`/claims/${claim.id}`);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-brand-50/60 border border-transparent hover:border-brand-200 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 font-mono">{claim.claimNumber}</span>
                        <span className="text-[11px] text-slate-500 font-mono">VIN: {claim.vehicle.vin}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{claim.vehicle.year} {claim.vehicle.make} {claim.vehicle.model}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Vehicles section */}
            {filteredVehicles.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" /> Vehicles ({filteredVehicles.length})
                </div>
                {filteredVehicles.map(veh => (
                  <button
                    key={veh.id}
                    onClick={() => {
                      onNavigate('/vehicles');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-brand-50/60 border border-transparent hover:border-brand-200 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{veh.year} {veh.make} {veh.model}</span>
                        <span className="text-[11px] text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded font-mono">Plate: {veh.licensePlate}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">VIN: {veh.vin}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600" />
                  </button>
                ))}
              </div>
            )}

            {/* Companies */}
            {filteredCompanies.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Insurance Tenants ({filteredCompanies.length})
                </div>
                {filteredCompanies.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      onNavigate('/companies');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-brand-50/60 border border-transparent hover:border-brand-200 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900">{comp.name}</span>
                      <p className="text-xs text-slate-500 font-mono">{comp.code} • {comp.country}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600" />
                  </button>
                ))}
              </div>
            )}

            {/* Users */}
            {filteredUsers.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5" /> Platform Users ({filteredUsers.length})
                </div>
                {filteredUsers.map(usr => (
                  <button
                    key={usr.id}
                    onClick={() => {
                      onNavigate('/users');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-brand-50/60 border border-transparent hover:border-brand-200 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900">{usr.fullName}</span>
                      <p className="text-xs text-slate-500 font-mono">{usr.email} • {usr.role}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600" />
                  </button>
                ))}
              </div>
            )}

            {query && filteredClaims.length === 0 && filteredVehicles.length === 0 && filteredCompanies.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs font-sans">
                No matching investigation records found for "{query}".
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Press ESC to exit search</span>
            <span>AIVIS Global Search Protocol</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
