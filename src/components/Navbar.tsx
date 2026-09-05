/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React from 'react';
import { Cpu, Key, Sparkles, Layers, Zap } from 'lucide-react';
import { RndScenario } from '../types/agent';
import { MOCK_SCENARIOS } from '../services/mockScenarios';
import { geminiService } from '../services/geminiService';

interface NavbarProps {
  currentScenario: RndScenario;
  onSelectScenario: (scenario: RndScenario) => void;
  onOpenApiKeyModal: () => void;
  isRunning: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScenario,
  onSelectScenario,
  onOpenApiKeyModal,
  isRunning,
}) => {
  const hasKey = geminiService.hasKey();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-emerald-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white font-mono">
                Nova<span className="text-cyan-400">Mesh</span>
                <span className="text-violet-400">.AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Innovation Track
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Autonomous Multi-Agent Software R&D & Self-Healing Orchestration
            </p>
          </div>
        </div>

        {/* Center: Scenario Selector */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
          <Layers className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Scenario:</span>
          <select
            value={currentScenario.id}
            onChange={(e) => {
              const selected = MOCK_SCENARIOS.find((s) => s.id === e.target.value);
              if (selected) onSelectScenario(selected);
            }}
            disabled={isRunning}
            className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-2"
          >
            {MOCK_SCENARIOS.map((scenario) => (
              <option key={scenario.id} value={scenario.id} className="bg-slate-900 text-slate-200">
                {scenario.title}
              </option>
            ))}
          </select>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Engine Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <Zap className={`w-3.5 h-3.5 ${hasKey ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="text-slate-300 font-medium">
              {hasKey ? 'Gemini Live' : 'Resilience Mode'}
            </span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">API Config</span>
          </button>

          {/* Track Badge */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30 text-xs text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-semibold hidden lg:inline">BITSom Vertex Fest</span>
          </div>
        </div>
      </div>
    </header>
  );
};
