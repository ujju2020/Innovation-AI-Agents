/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import React, { useState } from 'react';
import { RndScenario, CodeFile } from '../../types/agent';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeStudioTabProps {
  scenario: RndScenario;
}

export const CodeStudioTab: React.FC<CodeStudioTabProps> = ({ scenario }) => {
  const { files } = scenario;
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile: CodeFile = files[activeFileIndex] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Top File Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 bg-[#060a12] px-4 py-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {files.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition ${
                activeFileIndex === idx
                  ? 'bg-slate-800/90 text-cyan-300 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 ${
                file.language === 'typescript' ? 'text-blue-400' :
                file.language === 'go' ? 'text-cyan-400' :
                file.language === 'python' ? 'text-yellow-400' :
                'text-emerald-400'
              }`} />
              <span>{file.name}</span>
              <span className="text-[10px] text-slate-500">({file.lines}L)</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
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
                <span>Copy Code</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* File Metadata Info */}
      <div className="px-5 py-2.5 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-cyan-400">{activeFile.path}</span>
          <span className="text-slate-600">•</span>
          <span className="truncate">{activeFile.description}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300">
            {activeFile.language}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Synthesized Clean
          </span>
        </div>
      </div>

      {/* Code Viewer Body */}
      <div className="bg-[#05080f] p-4 overflow-x-auto max-h-[540px] overflow-y-auto">
        <pre className="font-mono text-xs text-slate-200 leading-relaxed">
          <code>
            {activeFile.content.split('\n').map((line, index) => (
              <div key={index} className="flex hover:bg-slate-900/50 px-2 rounded -mx-2">
                <span className="w-10 text-right pr-4 select-none text-slate-600 text-[11px]">
                  {index + 1}
                </span>
                <span className="flex-1 whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
