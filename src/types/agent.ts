/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

export type AgentId = 'archon' | 'synthetix' | 'sentinel' | 'aegis' | 'blueprint';

export type AgentStatus = 'idle' | 'thinking' | 'running' | 'completed' | 'warning' | 'error';

export interface AgentInfo {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
  capabilities: string[];
}

export interface DAGNode {
  id: AgentId;
  label: string;
  status: AgentStatus;
  progress: number; // 0 - 100
  latencyMs: number;
  tokensUsed: number;
  currentActivity?: string;
  dependencies: AgentId[];
}

export interface InterAgentMessage {
  id: string;
  fromAgent: AgentId;
  toAgent: AgentId | 'broadcast';
  timestamp: string;
  action: string;
  payloadSummary: string;
  status: 'transmitting' | 'received';
  detail?: string;
}

export interface CodeFile {
  name: string;
  path: string;
  language: 'typescript' | 'python' | 'go' | 'sql' | 'yaml' | 'json' | 'markdown';
  content: string;
  lines: number;
  description: string;
}

export interface TestCase {
  id: string;
  title: string;
  category: 'unit' | 'integration' | 'edge_case' | 'fuzz';
  status: 'passed' | 'failed' | 'running';
  durationMs: number;
  assertion: string;
  log?: string;
}

export interface FaultScenario {
  id: string;
  title: string;
  errorType: string;
  stackTrace: string;
  fileAffected: string;
  line: number;
  originalSnippet: string;
  patchedSnippet: string;
  diagnosticSummary: string;
  healedVerification: string;
}

export interface RndScenario {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  domain: string;
  prompt: string;
  architecture: {
    systemName: string;
    summary: string;
    throughputGoal: string;
    targetLatency: string;
    components: {
      name: string;
      tech: string;
      role: string;
      throughput: string;
    }[];
    rfcDoc: string;
  };
  files: CodeFile[];
  testSuite: {
    totalTests: number;
    passedTests: number;
    coveragePct: number;
    tests: TestCase[];
  };
  fault: FaultScenario;
  blueprint: {
    openApiSpec: string;
    deploymentManifest: string;
    systemDiagramAscii: string;
  };
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  agentId: AgentId;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
}
