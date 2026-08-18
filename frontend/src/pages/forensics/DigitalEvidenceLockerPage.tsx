import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { EvidenceArtifact } from '../../types/forensics';
import { Lock, FileCheck, Shield, Key, History, Upload, CheckCircle2 } from 'lucide-react';

export const DigitalEvidenceLockerPage: React.FC = () => {
  const [evidence, setEvidence] = useState<EvidenceArtifact[]>([]);

  useEffect(() => {
    ForensicsApiClient.getEvidenceLocker().then(setEvidence);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-600" />
            Cryptographic Digital Evidence Locker
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            SHA-256 / SHA-512 cryptographic verification, EXIF inspection, and chain of custody audit trail
          </p>
        </div>
        <Button variant="primary" icon={<Upload className="w-4 h-4" />}>
          Lock New Digital Artifact
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Items List */}
        <div className="lg:col-span-2 space-y-4">
          {evidence.map(ev => (
            <Card key={ev.id} className="p-5 border-slate-200/90 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 font-mono">{ev.fileName}</h3>
                    <Badge variant="purple" size="sm">{ev.evidenceNumber}</Badge>
                    <Badge variant="success" dot>{ev.verificationStatus}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Case #{ev.caseNumber} • Uploaded by {ev.uploaderName}</p>
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-1 text-xs font-mono font-bold border border-emerald-200">
                  <Lock className="w-3.5 h-3.5" /> VAULT LOCKED
                </div>
              </div>

              {/* Hashes Section */}
              <div className="p-3 bg-slate-900 text-slate-200 rounded-lg space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                  <span>Cryptographic Signatures</span>
                  <span>IMMUTABLE</span>
                </div>
                <div>
                  <span className="text-brand-400 font-bold">SHA-256: </span>
                  <span className="break-all">{ev.hashes.sha256}</span>
                </div>
                <div>
                  <span className="text-purple-400 font-bold">MD5: </span>
                  <span>{ev.hashes.md5}</span>
                </div>
              </div>

              {/* Chain of Custody Audit Trail */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 font-mono uppercase flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-brand-600" /> Chain of Custody History
                </span>
                <div className="space-y-1.5">
                  {ev.chainOfCustody.map((coc, i) => (
                    <div key={i} className="p-2 bg-slate-50 border rounded text-xs font-mono flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{coc.action}</span>
                      <span className="text-slate-500">{coc.actor} • {new Date(coc.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Security & Verification Card */}
        <div>
          <Card className="p-5 space-y-4 border-l-4 border-l-emerald-600">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Locker Compliance Guarantee</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every evidence file uploaded to AIVIS is automatically signed with double SHA-256 / SHA-512 hashes and bound to an immutable blockchain ledger timestamp.
            </p>
            <Button variant="outline" className="w-full text-xs">
              Verify Hash Integrity
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
