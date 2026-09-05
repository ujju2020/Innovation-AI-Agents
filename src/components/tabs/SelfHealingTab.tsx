/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { RndScenario } from '../../types/agent';
import { Flame, CheckCircle2, AlertTriangle, RefreshCw, ShieldAlert, Sparkles, Activity } from 'lucide-react';

interface SelfHealingTabProps {
  scenario: RndScenario;
  isHealingActive: boolean;
  onTriggerFault: () => void;
  onResetFault: () => void;
}

export const SelfHealingTab: React.FC<SelfHealingTabProps> = ({
  scenario,
  isHealingActive,
  onTriggerFault,
  onResetFault,
}) => {
  const { fault } = scenario;
  const [isPatching, setIsPatching] = useState(false);
  const [isHealed, setIsHealed] = useState(isHealingActive);

  const handleInjectFault = () => {
    onTriggerFault();
    setIsHealed(false);
  };

  const handleApplyAutonomousPatch = () => {
    setIsPatching(true);
    setTimeout(() => {
      setIsPatching(false);
      setIsHealed(true);
      onResetFault();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Sandbox Controller Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Aegis Autonomous Fault Injection & Self-Healing Sandbox
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Demonstrates closed-loop autonomous debugging, AST root-cause analysis, and dynamic code hotpatching.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleInjectFault}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition shadow-lg shadow-rose-600/25 cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>Simulate Runtime Fault</span>
            </button>
            <button
              onClick={handleApplyAutonomousPatch}
              disabled={isPatching}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/25 cursor-pointer disabled:opacity-50"
            >
              {isPatching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Synthesizing Patch...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Autonomous Hotpatch</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Alert Banner */}
        {isHealingActive ? (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-rose-300">
                Active Anomaly Intercepted: {fault.title}
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Fault detected in file <span className="text-rose-400 font-semibold">{fault.fileAffected}:{fault.line}</span>. Automated feedback loop dispatched to Aegis for AST repair.
              </p>
            </div>
          </div>
        ) : isHealed ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-300">
                Self-Healing Verification Succeeded: Zero Regressions
              </div>
              <p className="text-xs text-slate-300 font-mono">
                {fault.healedVerification}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            System running in stable baseline state. Click <span className="text-rose-400 font-semibold">"Simulate Runtime Fault"</span> to test Aegis's autonomous fault intercept and hotfix generation loop.
          </div>
        )}
      </div>

      {/* Stack Trace Decompilation Card */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Intercepted Production Stack Trace
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {fault.errorType}
          </span>
        </div>

        <div className="p-4 bg-[#05080f] rounded-xl border border-slate-900 font-mono text-xs text-rose-300/90 whitespace-pre-wrap">
          {fault.stackTrace}
        </div>

        <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1">
          <span className="font-bold text-cyan-400 font-mono">Aegis AST Diagnostic Summary:</span>
          <p className="text-slate-300 leading-relaxed">{fault.diagnosticSummary}</p>
        </div>
      </div>

      {/* Side-by-Side Visual Diff Viewer */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Visual AST Diff: Original Vulnerable Code vs. Aegis Autonomous Hotfix
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Target: <span className="text-cyan-400">{fault.fileAffected}:{fault.line}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before: Vulnerable */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-semibold text-rose-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Original Vulnerable Code
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Pre-Incident</span>
            </div>
            <div className="p-3.5 bg-[#120709] border border-rose-500/30 rounded-xl font-mono text-xs text-rose-200 overflow-x-auto min-h-[140px] whitespace-pre-wrap">
              {fault.originalSnippet}
            </div>
          </div>

          {/* After: Patched by Aegis */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Aegis Autonomous Hotfix Patch
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Verified Zero-Loss</span>
            </div>
            <div className="p-3.5 bg-[#051510] border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-200 overflow-x-auto min-h-[140px] whitespace-pre-wrap">
              {fault.patchedSnippet}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
