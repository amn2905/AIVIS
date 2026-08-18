import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { IntelligenceApiClient } from '../../services/intelligenceApiClient';
import { PageRankScore, LouvainCommunity } from '../../types/intelligence';
import { Cpu, Network, Layers, Sparkles, AlertTriangle } from 'lucide-react';

export const GraphAlgorithmsPage: React.FC = () => {
  const [pageRank, setPageRank] = useState<PageRankScore[]>([]);
  const [communities, setCommunities] = useState<LouvainCommunity[]>([]);

  useEffect(() => {
    IntelligenceApiClient.getGraphAlgorithms().then(res => {
      setPageRank(res.pageRank);
      setCommunities(res.communities);
    });
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-600" />
          Graph Algorithms Engine & Network Centrality
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          PageRank centrality, Louvain community modularity, shortest path tracing, and Jaccard similarity
        </p>
      </div>

      {/* PageRank Centrality Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Sparkles className="w-4 h-4 text-purple-600" />
            PageRank Centrality — Mastermind Candidate Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TableContainer className="border-0">
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Entity Label</TableHead>
                <TableHead>Entity Type</TableHead>
                <TableHead>PageRank Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {pageRank.map(pr => (
                <TableRow key={pr.nodeId}>
                  <TableCell className="font-mono font-bold text-xs text-slate-900">#{pr.centralityRank}</TableCell>
                  <TableCell className="font-bold text-xs text-slate-900">{pr.nodeLabel}</TableCell>
                  <TableCell>
                    <Badge variant="purple" size="sm">{pr.nodeType}</Badge>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-xs text-brand-700">
                    {(pr.pageRankScore * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {pr.isMastermindCandidate ? (
                      <Badge variant="danger" dot>MASTERMIND NODE</Badge>
                    ) : (
                      <Badge variant="default">PERIPHERAL</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Louvain Communities / Syndicate Clusters */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Layers className="w-4 h-4 text-rose-600" />
            Louvain Community Detection — Modularity Clusters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {communities.map(c => (
            <div key={c.id} className="p-5 bg-rose-50/50 border border-rose-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-mono">{c.communityName}</h3>
                <RiskBadge level="CRITICAL" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-white border rounded">
                  <span className="text-slate-400 text-[10px] block">MEMBER ENTITIES</span>
                  <span className="font-bold text-slate-900">{c.memberNodeIds.length} Connected Nodes</span>
                </div>
                <div className="p-2.5 bg-white border rounded">
                  <span className="text-slate-400 text-[10px] block">PRIMARY TERRITORY</span>
                  <span className="font-bold text-slate-900">{c.primaryTerritory}</span>
                </div>
                <div className="p-2.5 bg-white border rounded">
                  <span className="text-slate-400 text-[10px] block">TOTAL FRAUD VALUE</span>
                  <span className="font-bold text-rose-600">${c.totalFraudValueUsd.toLocaleString()} USD</span>
                </div>
                <div className="p-2.5 bg-white border rounded">
                  <span className="text-slate-400 text-[10px] block">SYNDICATE RISK INDEX</span>
                  <span className="font-bold text-rose-600">{c.syndicateRiskScore} / 100</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
