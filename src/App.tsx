/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PromptInputSection } from './components/PromptInputSection';
import { DAGOrchestrationGraph } from './components/DAGOrchestrationGraph';
import { AgentMessageBus } from './components/AgentMessageBus';
import { ArchitectureTab } from './components/tabs/ArchitectureTab';
import { CodeStudioTab } from './components/tabs/CodeStudioTab';
import { TestVerificationTab } from './components/tabs/TestVerificationTab';
import { SelfHealingTab } from './components/tabs/SelfHealingTab';
import { CreativeBlueprintTab } from './components/tabs/CreativeBlueprintTab';
import { ApiKeyModal } from './components/ApiKeyModal';
import { MOCK_SCENARIOS } from './services/mockScenarios';
import { RndScenario, DAGNode, InterAgentMessage, AgentId } from './types/agent';
import {
  FileText,
  Code2,
  ShieldCheck,
  Flame,
  Layers
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<RndScenario>(MOCK_SCENARIOS[0]);
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'tests' | 'healing' | 'blueprint'>('architecture');
  const [isRunning, setIsRunning] = useState(false);
  const [isHealingActive, setIsHealingActive] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'full' | 'chaos'>('full');
  const [activeAgentId, setActiveAgentId] = useState<AgentId | null>('archon');
  const [agentFilter, setAgentFilter] = useState<AgentId | 'all'>('all');

  // Initial DAG Nodes state
  const [dagNodes, setDagNodes] = useState<DAGNode[]>([
    {
      id: 'archon',
      label: 'Archon',
      status: 'completed',
      progress: 100,
      latencyMs: 740,
      tokensUsed: 2150,
      currentActivity: 'RFC Specification & Topology Ready',
      dependencies: [],
    },
    {
      id: 'synthetix',
      label: 'Synthetix',
      status: 'completed',
      progress: 100,
      latencyMs: 1420,
      tokensUsed: 4620,
      currentActivity: 'Multi-File Codebase Synthesized',
      dependencies: ['archon'],
    },
    {
      id: 'sentinel',
      label: 'Sentinel',
      status: 'completed',
      progress: 100,
      latencyMs: 380,
      tokensUsed: 1840,
      currentActivity: '12/12 Automated Tests Verified (100%)',
      dependencies: ['synthetix'],
    },
    {
      id: 'aegis',
      label: 'Aegis',
      status: 'completed',
      progress: 100,
      latencyMs: 510,
      tokensUsed: 1290,
      currentActivity: 'Zero-Debt Self-Healing Guard Active',
      dependencies: ['sentinel'],
    },
    {
      id: 'blueprint',
      label: 'BlueprintAI',
      status: 'completed',
      progress: 100,
      latencyMs: 620,
      tokensUsed: 2310,
      currentActivity: 'OpenAPI 3.1 & K8s Manifests Generated',
      dependencies: ['sentinel', 'aegis'],
    },
  ]);

  // Initial Message stream
  const [messages, setMessages] = useState<InterAgentMessage[]>([
    {
      id: 'msg-1',
      fromAgent: 'archon',
      toAgent: 'synthetix',
      timestamp: '14:02:11',
      action: 'TRANSMIT_RFC_SPEC',
      payloadSummary: 'Sent RFC-0104 double-entry ledger specification with UUIDv7 schema',
      status: 'received',
      detail: 'Throughput goal: 50,000 tx/sec, p99 SLA: <12ms, Redis distributed locking fencing token.',
    },
    {
      id: 'msg-2',
      fromAgent: 'synthetix',
      toAgent: 'sentinel',
      timestamp: '14:02:12',
      action: 'DISPATCH_CODEBASE',
      payloadSummary: 'Compiled 3 production modules: ledger_service.ts, payment_worker.go, schema.sql',
      status: 'received',
      detail: 'Strict zero-copy concurrency patterns implemented.',
    },
    {
      id: 'msg-3',
      fromAgent: 'sentinel',
      toAgent: 'aegis',
      timestamp: '14:02:13',
      action: 'VERIFICATION_PASSED',
      payloadSummary: 'Executed 12 automated unit & integration tests with 94.8% code coverage',
      status: 'received',
      detail: 'Zero memory leaks, cryptographic audit hashes valid.',
    },
    {
      id: 'msg-4',
      fromAgent: 'blueprint',
      toAgent: 'broadcast',
      timestamp: '14:02:14',
      action: 'PUBLISH_ARTIFACTS',
      payloadSummary: 'Published OpenAPI 3.1 contract and 8-replica Kubernetes deployment manifest',
      status: 'received',
    },
  ]);

  const handleSelectScenario = (scenario: RndScenario) => {
    setCurrentScenario(scenario);
    setIsHealingActive(false);

    // Refresh default completed node states for new scenario
    setDagNodes((prev) =>
      prev.map((node) => ({
        ...node,
        status: 'completed',
        progress: 100,
        currentActivity:
          node.id === 'archon'
            ? 'RFC Architecture Synthesized'
            : node.id === 'synthetix'
            ? `${scenario.files.length} Source Modules Synthesized`
            : node.id === 'sentinel'
            ? `${scenario.testSuite.totalTests}/${scenario.testSuite.totalTests} Tests Passed (${scenario.testSuite.coveragePct}%)`
            : node.id === 'aegis'
            ? 'Self-Healing Shield Active'
            : 'OpenAPI & K8s Manifests Ready',
      }))
    );
  };

  const handleRunMesh = async (prompt: string, mode: 'full' | 'chaos') => {
    setIsRunning(true);
    setIsHealingActive(mode === 'chaos');

    // Reset nodes to standby
    setDagNodes((prev) =>
      prev.map((node) => ({
        ...node,
        status: 'idle',
        progress: 0,
        currentActivity: 'Awaiting execution...',
      }))
    );

    const now = () => new Date().toLocaleTimeString();

    // Step 1: Archon
    setActiveAgentId('archon');
    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'archon'
          ? { ...n, status: 'running', progress: 40, currentActivity: 'Analyzing R&D requirements & designing RFC...' }
          : n
      )
    );
    await new Promise((r) => setTimeout(r, 600));

    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'archon'
          ? { ...n, status: 'completed', progress: 100, latencyMs: 650, tokensUsed: 1980, currentActivity: 'RFC Architecture Formulated' }
          : n
      )
    );
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-1`,
        fromAgent: 'archon',
        toAgent: 'synthetix',
        timestamp: now(),
        action: 'TRANSMIT_RFC_SPEC',
        payloadSummary: `Architecture blueprint for: ${prompt.slice(0, 45)}...`,
        status: 'received',
      },
    ]);

    // Step 2: Synthetix
    setActiveAgentId('synthetix');
    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'synthetix'
          ? { ...n, status: 'running', progress: 50, currentActivity: 'Synthesizing polyglot source code & schemas...' }
          : n
      )
    );
    await new Promise((r) => setTimeout(r, 700));

    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'synthetix'
          ? { ...n, status: 'completed', progress: 100, latencyMs: 1280, tokensUsed: 4210, currentActivity: 'Multi-File Codebase Generated' }
          : n
      )
    );
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-2`,
        fromAgent: 'synthetix',
        toAgent: 'sentinel',
        timestamp: now(),
        action: 'DISPATCH_MODULES',
        payloadSummary: `Compiled ${currentScenario.files.length} polyglot files with type assertions`,
        status: 'received',
      },
    ]);

    // Step 3: Sentinel
    setActiveAgentId('sentinel');
    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'sentinel'
          ? { ...n, status: 'running', progress: 60, currentActivity: 'Synthesizing test harness & running benchmarks...' }
          : n
      )
    );
    await new Promise((r) => setTimeout(r, 600));

    if (mode === 'chaos') {
      // Trigger fault in chaos mode
      setDagNodes((prev) =>
        prev.map((n) =>
          n.id === 'sentinel'
            ? { ...n, status: 'warning', progress: 80, currentActivity: 'Anomaly Detected on Thread 412!' }
            : n
        )
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-3`,
          fromAgent: 'sentinel',
          toAgent: 'aegis',
          timestamp: now(),
          action: 'FAULT_INTERCEPTED',
          payloadSummary: `Runtime failure: ${currentScenario.fault.errorType}`,
          status: 'received',
          detail: currentScenario.fault.stackTrace.split('\n')[0],
        },
      ]);

      // Step 4: Aegis self-heals
      setActiveAgentId('aegis');
      setDagNodes((prev) =>
        prev.map((n) =>
          n.id === 'aegis'
            ? { ...n, status: 'running', progress: 50, currentActivity: 'Decompiling AST & synthesizing hotfix patch...' }
            : n
        )
      );
      await new Promise((r) => setTimeout(r, 800));

      setDagNodes((prev) =>
        prev.map((n) =>
          n.id === 'aegis'
            ? { ...n, status: 'completed', progress: 100, latencyMs: 740, tokensUsed: 1540, currentActivity: 'Autonomous Hotfix Patch Applied' }
            : n
        )
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-4`,
          fromAgent: 'aegis',
          toAgent: 'synthetix',
          timestamp: now(),
          action: 'HOTFIX_DEPLOYED',
          payloadSummary: `Injected AST patch into ${currentScenario.fault.fileAffected}`,
          status: 'received',
          detail: 'All regression tests verified green.',
        },
      ]);

      // Sentinel marks completed
      setDagNodes((prev) =>
        prev.map((n) =>
          n.id === 'sentinel'
            ? { ...n, status: 'completed', progress: 100, latencyMs: 420, tokensUsed: 1650, currentActivity: 'Re-verification Passed (100% Green)' }
            : n
        )
      );
    } else {
      // Normal flow
      setDagNodes((prev) =>
        prev.map((n) =>
          n.id === 'sentinel'
            ? { ...n, status: 'completed', progress: 100, latencyMs: 380, tokensUsed: 1620, currentActivity: `${currentScenario.testSuite.totalTests}/${currentScenario.testSuite.totalTests} Tests Verified` }
            : n
        )
      );
      setDagNodes((prev) =>
        prev.map((n) =>
          n.id === 'aegis'
            ? { ...n, status: 'completed', progress: 100, latencyMs: 310, tokensUsed: 890, currentActivity: 'Zero-Debt Self-Healing Guard Active' }
            : n
        )
      );
    }

    // Step 5: BlueprintAI
    setActiveAgentId('blueprint');
    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'blueprint'
          ? { ...n, status: 'running', progress: 70, currentActivity: 'Generating OpenAPI 3.1 & Kubernetes manifests...' }
          : n
      )
    );
    await new Promise((r) => setTimeout(r, 600));

    setDagNodes((prev) =>
      prev.map((n) =>
        n.id === 'blueprint'
          ? { ...n, status: 'completed', progress: 100, latencyMs: 580, tokensUsed: 2190, currentActivity: 'Production Manifests Published' }
          : n
      )
    );
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-5`,
        fromAgent: 'blueprint',
        toAgent: 'broadcast',
        timestamp: now(),
        action: 'DEPLOYMENT_READY',
        payloadSummary: 'Generated complete deployment bundle with zero errors',
        status: 'received',
      },
    ]);

    setIsRunning(false);
  };

  const handleNodeClick = (id: AgentId) => {
    setActiveAgentId(id);
    if (id === 'archon') setActiveTab('architecture');
    if (id === 'synthetix') setActiveTab('code');
    if (id === 'sentinel') setActiveTab('tests');
    if (id === 'aegis') setActiveTab('healing');
    if (id === 'blueprint') setActiveTab('blueprint');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        currentScenario={currentScenario}
        onSelectScenario={handleSelectScenario}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        isRunning={isRunning}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Section 1: Prompt Input & Scenario Controls */}
        <PromptInputSection
          currentScenario={currentScenario}
          onSelectScenario={handleSelectScenario}
          onRunMesh={handleRunMesh}
          isRunning={isRunning}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
        />

        {/* Section 2: Visual Dynamic DAG Orchestrator */}
        <DAGOrchestrationGraph
          nodes={dagNodes}
          activeAgentId={activeAgentId}
          onSelectAgent={handleNodeClick}
          isHealingActive={isHealingActive}
        />

        {/* Section 3: Live Inter-Agent Message Bus */}
        <AgentMessageBus
          messages={messages}
          activeAgentFilter={agentFilter}
          onFilterChange={setAgentFilter}
        />

        {/* Section 4: Tabbed Output Surfaces */}
        <div className="space-y-4">
          {/* Tabs Navigation Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveTab('architecture'); setActiveAgentId('archon'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>R&D Architecture RFC</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">Archon</span>
              </button>

              <button
                onClick={() => { setActiveTab('code'); setActiveAgentId('synthetix'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-sm shadow-violet-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4 text-violet-400" />
                <span>Synthesized Codebase ({currentScenario.files.length})</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400">Synthetix</span>
              </button>

              <button
                onClick={() => { setActiveTab('tests'); setActiveAgentId('sentinel'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'tests'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verification Harness ({currentScenario.testSuite.passedTests}/{currentScenario.testSuite.totalTests})</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Sentinel</span>
              </button>

              <button
                onClick={() => { setActiveTab('healing'); setActiveAgentId('aegis'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'healing'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Self-Healing Sandbox</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400">Aegis</span>
              </button>

              <button
                onClick={() => { setActiveTab('blueprint'); setActiveAgentId('blueprint'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'blueprint'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Creative Blueprints & Ops</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">BlueprintAI</span>
              </button>
            </div>
          </div>

          {/* Active Tab Body */}
          <div className="pt-2">
            {activeTab === 'architecture' && <ArchitectureTab scenario={currentScenario} />}
            {activeTab === 'code' && <CodeStudioTab scenario={currentScenario} />}
            {activeTab === 'tests' && <TestVerificationTab scenario={currentScenario} />}
            {activeTab === 'healing' && (
              <SelfHealingTab
                scenario={currentScenario}
                isHealingActive={isHealingActive}
                onTriggerFault={() => setIsHealingActive(true)}
                onResetFault={() => setIsHealingActive(false)}
              />
            )}
            {activeTab === 'blueprint' && <CreativeBlueprintTab scenario={currentScenario} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-300">NovaMesh AI</span>
            <span>•</span>
            <span>Pushing technical boundaries with autonomous multi-agent systems</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-cyan-400 font-mono">Google Vertex AI & Gemini Powered</span>
            <span>BITSom Vertex Fest Hackathon</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSaved={() => {}}
      />
    </div>
  );
};
