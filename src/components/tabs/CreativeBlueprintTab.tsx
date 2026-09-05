/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { RndScenario } from '../../types/agent';
import { Layers, Copy, Check, Terminal, FileCode, Box } from 'lucide-react';

interface CreativeBlueprintTabProps {
  scenario: RndScenario;
}

export const CreativeBlueprintTab: React.FC<CreativeBlueprintTabProps> = ({ scenario }) => {
  const { blueprint } = scenario;
  const [activeSubTab, setActiveSubTab] = useState<'openapi' | 'k8s' | 'topology'>('openapi');
  const [copied, setCopied] = useState(false);

  const getCurrentContent = () => {
    switch (activeSubTab) {
      case 'openapi':
        return blueprint.openApiSpec;
      case 'k8s':
        return blueprint.deploymentManifest;
      case 'topology':
        return blueprint.systemDiagramAscii;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveSubTab('openapi')}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            activeSubTab === 'openapi'
              ? 'bg-slate-900/90 border-amber-500 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4" /> OpenAPI 3.1
            </span>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">Spec</span>
          </div>
          <div className="text-sm font-bold text-white">REST & gRPC Contracts</div>
          <p className="text-xs text-slate-400 mt-1">Machine-readable API schemas ready for client SDK codegen.</p>
        </div>

        <div
          onClick={() => setActiveSubTab('k8s')}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            activeSubTab === 'k8s'
              ? 'bg-slate-900/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Box className="w-4 h-4" /> Cloud Manifest
            </span>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">K8s / Helm</span>
          </div>
          <div className="text-sm font-bold text-white">Kubernetes & Docker</div>
          <p className="text-xs text-slate-400 mt-1">Rolling update deployment manifests with CPU/RAM guarantees.</p>
        </div>

        <div
          onClick={() => setActiveSubTab('topology')}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            activeSubTab === 'topology'
              ? 'bg-slate-900/90 border-violet-500 shadow-lg shadow-violet-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> System Topology
            </span>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">Diagram</span>
          </div>
          <div className="text-sm font-bold text-white">ASCII Architecture Map</div>
          <p className="text-xs text-slate-400 mt-1">Data pipeline dataflow from ingress to persistent state store.</p>
        </div>
      </div>

      {/* Main Spec Content Card */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              {activeSubTab === 'openapi' && 'OpenAPI 3.1 Service Specification'}
              {activeSubTab === 'k8s' && 'Production Kubernetes Deployment Manifest'}
              {activeSubTab === 'topology' && 'High-Level Dataflow Topology'}
            </h3>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Blueprint</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-[#05080f] rounded-xl border border-slate-900 font-mono text-xs text-slate-300 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
          {getCurrentContent()}
        </div>
      </div>
    </div>
  );
};
