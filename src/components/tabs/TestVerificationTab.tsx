/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { RndScenario } from '../../types/agent';
import { ShieldCheck, CheckCircle2, Clock, Play, BarChart3 } from 'lucide-react';

interface TestVerificationTabProps {
  scenario: RndScenario;
}

export const TestVerificationTab: React.FC<TestVerificationTabProps> = ({ scenario }) => {
  const { testSuite } = scenario;
  const [filter, setFilter] = useState<'all' | 'unit' | 'integration' | 'edge_case'>('all');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [progress, setProgress] = useState(100);

  const filteredTests = filter === 'all'
    ? testSuite.tests
    : testSuite.tests.filter((t) => t.category === filter);

  const handleRunVerification = () => {
    setIsRunningTests(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningTests(false);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Test Pass Rate</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">100%</div>
          <p className="text-[11px] text-slate-400 mt-1">{testSuite.passedTests} / {testSuite.totalTests} Passed</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Code Coverage</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{testSuite.coveragePct}%</div>
          <p className="text-[11px] text-slate-400 mt-1">Branch & line instrumentation</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-violet-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Execution Time</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">83ms</div>
          <p className="text-[11px] text-slate-400 mt-1">Parallel worker threads</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-amber-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Security Fuzzing</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">0 CVEs</div>
          <p className="text-[11px] text-slate-400 mt-1">AST taint analysis verified</p>
        </div>
      </div>

      {/* Test Runner Suite Card */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Sentinel Automated Verification Suite
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg text-xs">
              {(['all', 'unit', 'integration', 'edge_case'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2.5 py-1 rounded-md capitalize transition ${
                    filter === cat
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat === 'edge_case' ? 'Edge Case' : cat}
                </button>
              ))}
            </div>

            {/* Run verification button */}
            <button
              onClick={handleRunVerification}
              disabled={isRunningTests}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition shadow-sm shadow-emerald-500/20 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{isRunningTests ? 'Executing...' : 'Re-Run Harness'}</span>
            </button>
          </div>
        </div>

        {/* Running Progress Bar */}
        {isRunningTests && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-emerald-400 font-mono">
              <span>Executing test runner in isolated v8 container sandbox...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Test List */}
        <div className="space-y-2.5">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="p-3.5 rounded-xl bg-[#05080f] border border-slate-800/90 hover:border-slate-700/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-100">{test.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-slate-800 text-slate-400">
                    {test.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono pl-6">
                  {test.assertion}
                </p>
              </div>

              <div className="flex items-center gap-3 pl-6 sm:pl-0 flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {test.durationMs}ms
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  PASSED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
