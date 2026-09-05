/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState, useRef, useEffect } from 'react';
import { InterAgentMessage, AgentId } from '../types/agent';
import { AGENT_REGISTRY } from '../services/mockScenarios';
import { Terminal, Send, Filter, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AgentMessageBusProps {
  messages: InterAgentMessage[];
  activeAgentFilter: AgentId | 'all';
  onFilterChange: (filter: AgentId | 'all') => void;
}

export const AgentMessageBus: React.FC<AgentMessageBusProps> = ({
  messages,
  activeAgentFilter,
  onFilterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredMessages = activeAgentFilter === 'all'
    ? messages
    : messages.filter(
        (m) => m.fromAgent === activeAgentFilter || m.toAgent === activeAgentFilter
      );

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3 font-mono">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white tracking-wider uppercase">
            Inter-Agent Message Bus & Event Stream
          </h3>
          <span className="text-[10px] text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            {messages.length} Events Logged
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-500 flex items-center gap-1 pr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            onClick={() => onFilterChange('all')}
            className={`px-2 py-0.5 rounded-md transition ${
              activeAgentFilter === 'all'
                ? 'bg-slate-700 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          {(['archon', 'synthetix', 'sentinel', 'aegis', 'blueprint'] as AgentId[]).map((id) => (
            <button
              key={id}
              onClick={() => onFilterChange(id)}
              className={`px-2 py-0.5 rounded-md transition flex items-center gap-1 ${
                activeAgentFilter === id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{AGENT_REGISTRY[id].avatar}</span>
              <span className="capitalize">{id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Stream Container */}
      <div
        ref={scrollRef}
        className={`bg-[#05080f] rounded-xl p-3 border border-slate-900 overflow-y-auto space-y-2 text-xs transition-all ${
          isExpanded ? 'max-h-96' : 'max-h-48'
        }`}
      >
        {filteredMessages.length === 0 ? (
          <div className="text-center py-6 text-slate-500 italic">
            Waiting for agent execution. Select a scenario and execute the mesh to stream inter-agent transactions.
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const sender = AGENT_REGISTRY[msg.fromAgent];
            const isErrorAlert = msg.action.toLowerCase().includes('fault') || msg.action.toLowerCase().includes('fail');
            const isPatchAlert = msg.action.toLowerCase().includes('patch') || msg.action.toLowerCase().includes('heal');

            return (
              <div
                key={msg.id}
                className={`p-2 rounded-lg border transition ${
                  isErrorAlert
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : isPatchAlert
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="text-white">{sender?.avatar} {sender?.name}</span>
                    <span className="text-slate-600">➔</span>
                    <span className="text-cyan-400 capitalize">{msg.toAgent}</span>
                  </div>
                  <span className="text-slate-500 font-mono">{msg.timestamp}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isErrorAlert ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  ) : isPatchAlert ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Send className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  )}
                  <span className="font-bold text-white">{msg.action}:</span>
                  <span className="text-slate-300 truncate">{msg.payloadSummary}</span>
                </div>

                {msg.detail && (
                  <div className="mt-1 pt-1 border-t border-slate-800/60 text-[11px] text-slate-400 pl-5">
                    {msg.detail}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span>Autonomous WebSocket Message Broker v2.4 (Simulated Zero-Latency)</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:underline cursor-pointer"
        >
          {isExpanded ? 'Collapse Stream' : 'Expand Stream (Show More)'}
        </button>
      </div>
    </div>
  );
};
