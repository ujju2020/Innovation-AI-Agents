/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React from 'react';
import { DAGNode, AgentId } from '../types/agent';
import { AGENT_REGISTRY } from '../services/mockScenarios';
import { CheckCircle2, Clock, Cpu, Sparkles, Activity, AlertCircle, ArrowRight } from 'lucide-react';

interface DAGOrchestrationGraphProps {
  nodes: DAGNode[];
  activeAgentId: AgentId | null;
  onSelectAgent: (id: AgentId) => void;
  isHealingActive: boolean;
}

export const DAGOrchestrationGraph: React.FC<DAGOrchestrationGraphProps> = ({
  nodes,
  activeAgentId,
  onSelectAgent,
  isHealingActive,
}) => {
  const getNode = (id: AgentId): DAGNode => {
    return nodes.find((n) => n.id === id) || {
      id,
      label: id,
      status: 'idle',
      progress: 0,
      latencyMs: 0,
      tokensUsed: 0,
      dependencies: [],
    };
  };

  const archon = getNode('archon');
  const synthetix = getNode('synthetix');
  const sentinel = getNode('sentinel');
  const aegis = getNode('aegis');
  const blueprint = getNode('blueprint');

  const getStatusBadge = (node: DAGNode) => {
    switch (node.status) {
      case 'running':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/30 animate-pulse">
            <Activity className="w-3 h-3 animate-spin" /> Processing
          </span>
        );
      case 'thinking':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-400 bg-violet-500/15 px-2 py-0.5 rounded-full border border-violet-500/30 animate-pulse">
            <Cpu className="w-3 h-3" /> Reasoning
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Synthesized
          </span>
        );
      case 'warning':
      case 'error':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-full border border-rose-500/30">
            <AlertCircle className="w-3 h-3" /> Anomaly
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-medium text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/60">
            Standby
          </span>
        );
    }
  };

  const renderNodeCard = (node: DAGNode, stepNumber: number) => {
    const info = AGENT_REGISTRY[node.id];
    const isSelected = activeAgentId === node.id;
    const isNodeActive = node.status === 'running' || node.status === 'thinking';

    return (
      <div
        onClick={() => onSelectAgent(node.id)}
        className={`relative flex-1 min-w-[200px] p-3.5 rounded-2xl cursor-pointer transition-all duration-300 border ${
          isSelected
            ? 'bg-slate-900/95 border-cyan-500 shadow-xl shadow-cyan-500/20 scale-[1.02]'
            : isNodeActive
            ? 'bg-slate-900/90 border-cyan-400/80 shadow-lg shadow-cyan-400/10'
            : 'bg-slate-900/60 hover:bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
        }`}
      >
        {/* Node Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-slate-800 text-[11px] font-bold text-slate-400 font-mono">
              0{stepNumber}
            </span>
            <span className="text-sm">{info.avatar}</span>
            <div>
              <h4 className="text-xs font-bold text-white tracking-tight">{info.name}</h4>
              <p className="text-[10px] text-slate-400 truncate max-w-[90px]">{info.role.split('&')[0]}</p>
            </div>
          </div>
          {getStatusBadge(node)}
        </div>

        {/* Current Activity Message */}
        <div className="text-[11px] text-slate-300 font-mono truncate mb-2.5 h-4">
          {node.currentActivity || info.description}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              node.id === 'archon'
                ? 'bg-cyan-400'
                : node.id === 'synthetix'
                ? 'bg-violet-400'
                : node.id === 'sentinel'
                ? 'bg-emerald-400'
                : node.id === 'aegis'
                ? 'bg-rose-400'
                : 'bg-amber-400'
            }`}
            style={{ width: `${node.progress}%` }}
          />
        </div>

        {/* Footer Metrics */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {node.latencyMs > 0 ? `${node.latencyMs}ms` : '--'}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-500" />
            {node.tokensUsed > 0 ? `${node.tokensUsed.toLocaleString()} tkn` : '--'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
      {/* Title & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
            Autonomous DAG Orchestration Graph
          </h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            5 Collaborating Agents
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">Live Inter-Agent Bus</span>
          </span>
          {isHealingActive && (
            <span className="flex items-center gap-1 text-rose-400 font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Self-Healing Loop Active
            </span>
          )}
        </div>
      </div>

      {/* Horizontal DAG Nodes Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {renderNodeCard(archon, 1)}
        {renderNodeCard(synthetix, 2)}
        {renderNodeCard(sentinel, 3)}
        {renderNodeCard(aegis, 4)}
        {renderNodeCard(blueprint, 5)}
      </div>

      {/* Dynamic Edge Connector Visualization */}
      <div className="hidden md:flex items-center justify-around px-8 pt-1 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-1">
          <span className="text-cyan-400">RFC Spec</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400/80" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-violet-400">Codebase</span>
          <ArrowRight className="w-3.5 h-3.5 text-violet-400/80" />
        </div>
        <div className="flex items-center gap-1">
          <span className={isHealingActive ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
            {isHealingActive ? 'Fault Intercept & Patch' : 'Test Harness'}
          </span>
          <ArrowRight className={`w-3.5 h-3.5 ${isHealingActive ? 'text-rose-400 animate-pulse' : 'text-emerald-400/80'}`} />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-400">Production Bundle</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400/80" />
        </div>
      </div>
    </div>
  );
};
