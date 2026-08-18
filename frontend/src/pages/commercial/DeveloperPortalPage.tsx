import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CommercialApiClient } from '../../services/commercialApiClient';
import { APIKeyRecord } from '../../types/commercial';
import { Code, Key, Plus, Copy, Check, FileText } from 'lucide-react';

export const DeveloperPortalPage: React.FC = () => {
  const [keys, setKeys] = useState<APIKeyRecord[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    CommercialApiClient.getAPIKeys().then(setKeys);
  }, []);

  const handleGenerateKey = async () => {
    if (!newKeyName.trim()) return;
    const key = await CommercialApiClient.generateAPIKey(newKeyName);
    setKeys(prev => [...prev, key]);
    setNewKeyName('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Code className="w-5 h-5 text-brand-600" />
          Developer Portal & API Gateway Key Management
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          REST & WebSocket API keys, OpenAPI documentation, and webhook subscriptions
        </p>
      </div>

      {/* Key Generator Card */}
      <Card className="p-6 space-y-4">
        <CardHeader>
          <CardTitle>Generate Production API Key</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Input
            placeholder="Key Description (e.g. Guidewire Integration Key)..."
            value={newKeyName}
            onChange={e => setNewKeyName(e.target.value)}
            className="text-xs"
          />
          <Button variant="primary" size="sm" onClick={handleGenerateKey} icon={<Plus className="w-3.5 h-3.5" />}>
            Generate API Key
          </Button>
        </CardContent>
      </Card>

      {/* Active API Keys Table */}
      <Card className="p-0">
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Key Name</TableHead>
              <TableHead>Masked API Key</TableHead>
              <TableHead>Rate Limit</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {keys.map(k => (
              <TableRow key={k.id}>
                <TableCell className="font-bold text-xs text-slate-900">{k.keyName}</TableCell>
                <TableCell className="font-mono text-xs text-brand-700 flex items-center gap-2">
                  <span>{k.apiKeyMasked}</span>
                  <button onClick={() => handleCopy(k.id, k.apiKeyMasked)} className="text-slate-400 hover:text-slate-700">
                    {copiedId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-600">{k.rateLimitRpm} RPM</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{new Date(k.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{k.lastUsedAt}</TableCell>
                <TableCell>
                  <Badge variant="success">ACTIVE</Badge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Card>
    </div>
  );
};
