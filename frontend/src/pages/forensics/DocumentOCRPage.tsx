import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ForensicsApiClient } from '../../services/forensicsApiClient';
import { OCRDocumentResult } from '../../types/forensics';
import { FileText, ShieldAlert, Upload, CheckCircle2, AlertTriangle, Search } from 'lucide-react';

export const DocumentOCRPage: React.FC = () => {
  const [doc, setDoc] = useState<OCRDocumentResult | null>(null);

  useEffect(() => {
    ForensicsApiClient.getOCRDocument().then(setDoc);
  }, []);

  if (!doc) return null;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            Document Intelligence & AI OCR Forgery Detector
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Automated text extraction, font splicing anomaly detection, and cross-verification
          </p>
        </div>
        <Button variant="primary" icon={<Upload className="w-4 h-4" />}>
          Run OCR Scan on Document
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-l-4 border-l-brand-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Document Type</span>
          <div className="mt-2 text-xl font-extrabold font-mono text-slate-900">{doc.docType}</div>
          <p className="text-xs text-slate-500 mt-1 font-mono">{doc.fileName}</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Forgery Detection Status</span>
          <div className="mt-2 text-xl font-extrabold font-mono text-rose-600 flex items-center gap-1.5">
            <ShieldAlert className="w-5 h-5" /> FORGERY DETECTED
          </div>
          <p className="text-xs text-rose-800 mt-1 font-mono">{doc.forgeryType}</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">OCR Extraction Confidence</span>
          <div className="mt-2 text-4xl font-extrabold font-mono text-purple-600">{doc.confidencePct}%</div>
        </Card>
      </div>

      {/* Flagged Font Anomalies */}
      {doc.forgeryDetected && (
        <Card className="p-4 bg-rose-50 border-rose-200">
          <h4 className="text-xs font-bold text-rose-900 font-mono uppercase flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            AI Document Verification Flags ({doc.flaggedAnomalies.length})
          </h4>
          <ul className="mt-2 space-y-1.5">
            {doc.flaggedAnomalies.map((anom, i) => (
              <li key={i} className="text-xs text-rose-800 font-mono p-2 bg-white/60 rounded border border-rose-200">
                • {anom}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Extracted Fields Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Extracted Document Key</TableHead>
              <TableHead>Extracted Value</TableHead>
              <TableHead>Verification Status</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {Object.entries(doc.extractedFields).map(([key, val]) => (
              <TableRow key={key}>
                <TableCell className="font-mono font-bold text-xs text-slate-900">{key}</TableCell>
                <TableCell className="font-mono text-xs text-brand-700">
                  {typeof val === 'number' ? val.toLocaleString() : val}
                </TableCell>
                <TableCell>
                  <Badge variant="success" size="sm" dot>OCR MATCHED</Badge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
