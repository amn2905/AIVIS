import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, RiskBadge } from '../../components/ui/Badge';
import { IntelligenceApiClient } from '../../services/intelligenceApiClient';
import { GraphNode, GraphEdge, GraphNodeType } from '../../types/intelligence';
import { Network, Search, Filter, Cpu, Layers, Sparkles, ZoomIn, ZoomOut, RefreshCw, AlertTriangle } from 'lucide-react';

export const FraudNetworkExplorerPage: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedNodeType, setSelectedNodeType] = useState<string>('ALL');

  useEffect(() => {
    IntelligenceApiClient.getKnowledgeGraph().then(res => {
      setNodes(res.nodes);
      setEdges(res.edges);
      setSelectedNode(res.nodes[0]);
    });
  }, []);

  const filteredNodes = nodes.filter(n => selectedNodeType === 'ALL' || n.type === selectedNodeType);

  const getNodeColor = (type: GraphNodeType) => {
    switch (type) {
      case 'VEHICLE': return '#0979f6';
      case 'OWNER': return '#8b5cf6';
      case 'REPAIR_SHOP': return '#ef4444';
      case 'SURVEYOR': return '#f59e0b';
      case 'BANK_ACCOUNT': return '#10b981';
      case 'PHONE_NUMBER': return '#ec4899';
      default: return '#64748b';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Network className="w-5 h-5 text-brand-600" />
            Fraud Knowledge Graph & Entity Network Explorer
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Neo4j graph analytics, entity resolution, and AI Fraud Network Score evaluation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Run Graph Analytics
          </Button>
          <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Detect Syndicates
          </Button>
        </div>
      </div>

      {/* Node Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['ALL', 'VEHICLE', 'OWNER', 'REPAIR_SHOP', 'SURVEYOR', 'BANK_ACCOUNT', 'PHONE_NUMBER', 'IP_ADDRESS'].map(t => (
          <button
            key={t}
            onClick={() => setSelectedNodeType(t)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md border transition-all ${
              selectedNodeType === t
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Graph Visualizer & Inspector Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Knowledge Graph SVG Canvas */}
        <Card className="lg:col-span-2 p-0 overflow-hidden relative">
          <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-bold text-slate-900 font-mono">Interactive Knowledge Graph View</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 bg-white border rounded text-slate-600 hover:bg-slate-100">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 bg-white border rounded text-slate-600 hover:bg-slate-100">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="w-full h-[520px] bg-slate-950 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-15" />

            <svg className="w-full h-full">
              {/* Edges */}
              {edges.map(edge => {
                const source = nodes.find(n => n.id === edge.sourceId);
                const target = nodes.find(n => n.id === edge.targetId);
                if (!source || !target) return null;

                return (
                  <g key={edge.id}>
                    <line
                      x1={source.x || 200}
                      y1={source.y || 200}
                      x2={target.x || 400}
                      y2={target.y || 300}
                      stroke={edge.isSuspicious ? '#ef4444' : '#475569'}
                      strokeWidth={edge.isSuspicious ? 2.5 : 1.5}
                      strokeDasharray={edge.isSuspicious ? '4 2' : undefined}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map(node => {
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x || 200}, ${node.y || 200})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Ring for high risk */}
                    {node.riskScore > 80 && (
                      <circle r="22" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping opacity-60" />
                    )}

                    <circle
                      r="16"
                      fill={nodeColor}
                      stroke={isSelected ? '#ffffff' : '#1e293b'}
                      strokeWidth={isSelected ? 3 : 1.5}
                    />

                    <text
                      y="28"
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize="10 font-sans"
                      fontWeight="bold"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Card>

        {/* Node Inspection Details Panel */}
        {selectedNode && (
          <Card className="p-5 space-y-4 border-l-4 border-l-brand-600">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 font-mono uppercase">Entity Inspector</span>
              <Badge variant="purple" size="sm">{selectedNode.type}</Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{selectedNode.label}</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedNode.subLabel}</p>
            </div>

            {/* AI Fraud Network Score */}
            <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">AI Fraud Network Score</span>
                <span className="text-2xl font-extrabold font-mono text-rose-400">{selectedNode.fraudNetworkScore} / 100</span>
              </div>
              <RiskBadge level={selectedNode.riskScore > 85 ? 'CRITICAL' : 'HIGH'} />
            </div>

            {/* Metadata key-value list */}
            <div className="space-y-2 text-xs font-mono">
              <span className="font-bold text-slate-700 block uppercase">Metadata Attributes</span>
              {Object.entries(selectedNode.metadata).map(([k, v]) => (
                <div key={k} className="p-2 bg-slate-50 border rounded flex items-center justify-between">
                  <span className="text-slate-500">{k}:</span>
                  <span className="font-bold text-slate-900">{String(v)}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" className="w-full text-xs">
              Trace Full Network Connections
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
