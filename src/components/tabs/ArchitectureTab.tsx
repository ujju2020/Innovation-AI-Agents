/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { RndScenario } from '../../types/agent';
import { FileText, Cpu, Check, Copy, Database, Server, Zap } from 'lucide-react';

interface ArchitectureTabProps {
  scenario: RndScenario;
}

export const ArchitectureTab: React.FC<ArchitectureTabProps> = ({ scenario }) => {
  const [copied, setCopied] = useState(false);
  const { architecture } = scenario;

  const handleCopyRfc = () => {
    navigator.clipboard.writeText(architecture.rfcDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* System Topology Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">System Architecture</span>
          </div>
          <div className="text-lg font-bold text-white">{architecture.systemName}</div>
          <p className="text-xs text-slate-400 mt-1">{architecture.summary}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-2 text-violet-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Target Throughput</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{architecture.throughputGoal}</div>
          <p className="text-xs text-slate-400 mt-1">Autonomous sharding & horizontal load balancing</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Server className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Latency SLA Guarantee</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{architecture.targetLatency}</div>
          <p className="text-xs text-slate-400 mt-1">Zero-copy memory mapped ring buffers</p>
        </div>
      </div>

      {/* Microservice Components Grid */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Synthesized Subsystem Components & Responsibilities
            </h3>
          </div>
          <span className="text-xs text-slate-400">Designed by Archon (System Architect)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {architecture.components.map((comp, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{comp.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {comp.throughput}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{comp.role}</p>
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <span className="text-slate-400">Tech Stack:</span>
                <span className="text-violet-400">{comp.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formal RFC Blueprint Document */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Archon Autonomous RFC Specification Document
            </h3>
          </div>
          <button
            onClick={handleCopyRfc}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy RFC</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-[#05080f] rounded-xl border border-slate-900 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
          {architecture.rfcDoc}
        </div>
      </div>
    </div>
  );
};
