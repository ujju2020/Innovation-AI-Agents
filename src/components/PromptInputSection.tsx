/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { Play, Sparkles, RefreshCw, Terminal, Flame, Sliders } from 'lucide-react';
import { RndScenario } from '../types/agent';
import { MOCK_SCENARIOS } from '../services/mockScenarios';

interface PromptInputSectionProps {
  currentScenario: RndScenario;
  onSelectScenario: (scenario: RndScenario) => void;
  onRunMesh: (prompt: string, mode: 'full' | 'chaos') => void;
  isRunning: boolean;
  activeMode: 'full' | 'chaos';
  setActiveMode: (mode: 'full' | 'chaos') => void;
}

export const PromptInputSection: React.FC<PromptInputSectionProps> = ({
  currentScenario,
  onSelectScenario,
  onRunMesh,
  isRunning,
  activeMode,
  setActiveMode,
}) => {
  const [prompt, setPrompt] = useState(currentScenario.prompt);

  const handleScenarioChange = (scenario: RndScenario) => {
    onSelectScenario(scenario);
    setPrompt(scenario.prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isRunning) {
      onRunMesh(prompt.trim(), activeMode);
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header / Track description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                Autonomous R&D Pipeline
              </span>
              <span className="text-xs text-slate-400">
                {currentScenario.domain}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              {currentScenario.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentScenario.subtitle}
            </p>
          </div>

          {/* SLA Performance metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Throughput Target</div>
              <div className="text-xs font-bold text-cyan-400 font-mono">
                {currentScenario.architecture.throughputGoal}
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Latency SLA</div>
              <div className="text-xs font-bold text-emerald-400 font-mono">
                {currentScenario.architecture.targetLatency}
              </div>
            </div>
          </div>
        </div>

        {/* Preset scenario pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Presets:
          </span>
          {MOCK_SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s)}
              className={`px-3 py-1 text-xs rounded-lg transition border flex items-center gap-1.5 ${
                currentScenario.id === s.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-medium'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{s.tag}</span>
            </button>
          ))}
        </div>

        {/* Interactive Prompt Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <div className="absolute top-3 left-3.5 text-slate-500 pointer-events-none">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              placeholder="Define an R&D engineering challenge, architecture constraint, or autonomous synthesis requirement..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0b111e]/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition resize-none font-mono"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Mode selection toggle */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveMode('full')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeMode === 'full'
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Full Auto DAG</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('chaos')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeMode === 'chaos'
                    ? 'bg-rose-500 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Chaos & Self-Healing</span>
              </button>
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              disabled={isRunning || !prompt.trim()}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs tracking-wide uppercase transition bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 text-white hover:opacity-95 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Mesh Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Execute Multi-Agent Mesh</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
