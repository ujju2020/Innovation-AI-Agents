/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import { AgentInfo, RndScenario } from '../types/agent';

export const AGENT_REGISTRY: Record<string, AgentInfo> = {
  archon: {
    id: 'archon',
    name: 'Archon',
    role: 'R&D & Architecture Agent',
    avatar: '📐',
    color: '#06b6d4', // Cyan
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    borderColor: 'border-cyan-500',
    description: 'Deconstructs requirements, evaluates algorithmic trade-offs, and designs system architecture RFCs.',
    capabilities: ['Algorithmic Modeling', 'System Topology RFC', 'State Space Analysis', 'Tech Stack Evaluation']
  },
  synthetix: {
    id: 'synthetix',
    name: 'Synthetix',
    role: 'Code Synthesis Agent',
    avatar: '⚡',
    color: '#8b5cf6', // Violet
    badgeBg: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    borderColor: 'border-violet-500',
    description: 'Synthesizes clean, multi-file, production-grade source code conforming strictly to architectural specifications.',
    capabilities: ['Polyglot Synthesis', 'Interface Concurrency', 'Type Safety & Idempotency', 'Zero-Debt Generation']
  },
  sentinel: {
    id: 'sentinel',
    name: 'Sentinel',
    role: 'Verification & Test Agent',
    avatar: '🛡️',
    color: '#10b981', // Emerald
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500',
    description: 'Generates rigorous test harnesses, unit/integration suites, fuzzing profiles, and performance benchmarks.',
    capabilities: ['Unit & Integration Harnesses', 'Edge-Case Fuzzing', 'Race Condition Detection', 'Coverage Profiling']
  },
  aegis: {
    id: 'aegis',
    name: 'Aegis',
    role: 'Self-Healing & Diagnostics Agent',
    avatar: '🔮',
    color: '#f43f5e', // Rose
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    borderColor: 'border-rose-500',
    description: 'Intercepts test failures, performs AST-level root-cause analysis, and autonomously writes hotfix diffs.',
    capabilities: ['AST-Level Patching', 'Stack Trace Decompilation', 'Autonomous Hotfixing', 'Regression Shield']
  },
  blueprint: {
    id: 'blueprint',
    name: 'BlueprintAI',
    role: 'Creative Execution & Ops Agent',
    avatar: '🚀',
    color: '#f59e0b', // Amber
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500',
    description: 'Synthesizes visual sequence diagrams, OpenAPI specifications, cloud manifests, and developer documentation.',
    capabilities: ['OpenAPI 3.1 Spec Generator', 'Cloud Deployment Manifests', 'Interactive Diagrams', 'Living Developer Specs']
  }
};

export const MOCK_SCENARIOS: RndScenario[] = [
  {
    id: 'payment-gateway',
    title: 'Distributed Event-Driven Payment Gateway',
    subtitle: 'High-throughput transactional ledger with UUIDv7 idempotency, two-phase commits, and zero-loss failover.',
    tag: 'FinTech / Systems',
    domain: 'Distributed Systems & Financial Tech',
    prompt: 'Engineer an event-driven payment ledger capable of 50,000 tx/sec with strict idempotency, distributed Redis locking, and automatic dead-letter queue recovery.',
    architecture: {
      systemName: 'ApexLedger Core',
      summary: 'ApexLedger implements a dual-ledger write-ahead log (WAL) with Redis distributed redlock fencing tokens, PostgreSQL partitioned transactions, and Kafka event streaming.',
      throughputGoal: '50,000 tx/sec',
      targetLatency: 'p99 < 12ms',
      components: [
        { name: 'Ingress Gateway', tech: 'Node.js / Express / TypeScript', role: 'Idempotency key validation, signature verification, rate limiting', throughput: '60,000 req/s' },
        { name: 'Transaction Worker Pool', tech: 'Go (Goroutines + Worker Channel)', role: 'Distributed ledger posting, two-phase state machine transitions', throughput: '52,000 tx/s' },
        { name: 'Persistent Storage', tech: 'PostgreSQL 16 (Timescale Partitioned)', role: 'ACID double-entry ledger book, cryptographic audit hashes', throughput: '48,000 iops' },
        { name: 'Resilience Queue', tech: 'Apache Kafka + Redis Redlock', role: 'Event ordering buffer, deadlock detection, poison pill quarantine', throughput: '100,000 msg/s' }
      ],
      rfcDoc: `# RFC-0104: ApexLedger Autonomous Architecture Specification

## 1. Problem Context
Standard relational ledgers suffer write-contention during flash sales or multi-threaded account withdrawals. A multi-agent consensus system is needed to guarantee zero double-spends while retaining sub-15ms p99 latency.

## 2. Core Architectural Decisions
- **UUIDv7 Time-Ordered Idempotency**: Keys contain 48-bit UNIX timestamps providing natural B-tree index locality.
- **Distributed Redlock Fencing**: Account mutations obtain non-blocking leases with lease-expiry heartbeats.
- **Double-Entry Accounting Protocol**: Every debit has an immutable corresponding credit; balances are computed via materialized log snapshots.`
    },
    files: [
      {
        name: 'ledger_service.ts',
        path: 'services/ledger_service.ts',
        language: 'typescript',
        lines: 84,
        description: 'Primary transactional ledger processor with distributed mutex lock & idempotency check.',
        content: `import { createHash } from 'crypto';
import { v7 as uuidv7 } from 'uuid';

export interface LedgerTransaction {
  idempotencyKey: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amountCents: bigint;
  currency: 'USD' | 'EUR' | 'GBP';
  timestamp: number;
}

export interface LedgerResult {
  transactionId: string;
  status: 'COMMITTED' | 'REJECTED' | 'DUPLICATE_IGNORED';
  sourceBalanceRemaining: bigint;
  hashSignature: string;
}

export class DistributedLedgerEngine {
  private idempotencyStore = new Map<string, LedgerResult>();
  private accountBalances = new Map<string, bigint>();

  constructor() {
    // Seed initial test accounts
    this.accountBalances.set('acc_treasury_01', 50_000_000n);
    this.accountBalances.set('acc_user_99', 1_500_000n);
  }

  public async executeTransaction(tx: LedgerTransaction): Promise<LedgerResult> {
    // Step 1: Idempotency Key Check
    if (this.idempotencyStore.has(tx.idempotencyKey)) {
      const cached = this.idempotencyStore.get(tx.idempotencyKey)!;
      return { ...cached, status: 'DUPLICATE_IGNORED' };
    }

    // Step 2: Acquire Distributed Mutex for Source Account
    const currentBalance = this.accountBalances.get(tx.sourceAccountId) ?? 0n;
    if (currentBalance < tx.amountCents) {
      throw new Error(\`Insufficient funds in account \${tx.sourceAccountId}: available=\${currentBalance}\`);
    }

    // Step 3: Atomic Balance Deduction and Credit
    const newSourceBal = currentBalance - tx.amountCents;
    const destBal = (this.accountBalances.get(tx.destinationAccountId) ?? 0n) + tx.amountCents;

    this.accountBalances.set(tx.sourceAccountId, newSourceBal);
    this.accountBalances.set(tx.destinationAccountId, destBal);

    // Step 4: Cryptographic Block Hash
    const txId = 'tx_' + uuidv7();
    const hash = createHash('sha256')
      .update(\`\${txId}:\${tx.sourceAccountId}:\${tx.destinationAccountId}:\${tx.amountCents}\`)
      .digest('hex');

    const result: LedgerResult = {
      transactionId: txId,
      status: 'COMMITTED',
      sourceBalanceRemaining: newSourceBal,
      hashSignature: hash
    };

    // Step 5: Persist Idempotency State
    this.idempotencyStore.set(tx.idempotencyKey, result);
    return result;
  }
}`
      },
      {
        name: 'payment_worker.go',
        path: 'workers/payment_worker.go',
        language: 'go',
        lines: 68,
        description: 'High-throughput Go worker pool managing goroutine dispatch and retry backoff.',
        content: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type PaymentJob struct {
	ID        string
	Amount    int64
	Retries   int
	CreatedAt time.Time
}

type WorkerPool struct {
	JobQueue   chan PaymentJob
	MaxWorkers int
	WG         sync.WaitGroup
}

func NewWorkerPool(workers int, queueSize int) *WorkerPool {
	return &WorkerPool{
		JobQueue:   make(chan PaymentJob, queueSize),
		MaxWorkers: workers,
	}
}

func (wp *WorkerPool) Start(ctx context.Context) {
	for i := 0; i < wp.MaxWorkers; i++ {
		wp.WG.Add(1)
		go func(workerID int) {
			defer wp.WG.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case job, ok := <-wp.JobQueue:
					if !ok {
						return
					}
					wp.processJob(workerID, job)
				}
			}
		}(i)
	}
}

func (wp *WorkerPool) processJob(workerID int, job PaymentJob) {
	// Simulate zero-allocation lock acquisition
	start := time.Now()
	// Process transactional mutation...
	duration := time.Since(start)
	if duration.Milliseconds() > 50 {
		fmt.Printf("[ALERT] Worker %d: Latency spike detected on job %s (%v)\\n", workerID, job.ID, duration)
	}
}`
      },
      {
        name: 'schema.sql',
        path: 'database/schema.sql',
        language: 'sql',
        lines: 42,
        description: 'PostgreSQL partitioned tables with audit ledger trigger and version lock.',
        content: `-- Distributed Double-Entry Ledger Schema
CREATE TABLE IF NOT EXISTS accounts (
    id VARCHAR(64) PRIMARY KEY,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    balance_cents BIGINT NOT NULL CHECK (balance_cents >= 0),
    version BIGINT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ledger_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    source_account_id VARCHAR(64) REFERENCES accounts(id),
    destination_account_id VARCHAR(64) REFERENCES accounts(id),
    amount_cents BIGINT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'COMMITTED',
    hash_signature VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_ledger_idempotency ON ledger_entries (idempotency_key);
CREATE INDEX IF NOT EXISTS idx_ledger_source ON ledger_entries (source_account_id, created_at DESC);`
      }
    ],
    testSuite: {
      totalTests: 12,
      passedTests: 12,
      coveragePct: 94.8,
      tests: [
        { id: 't1', title: 'Idempotency Replay Invariance', category: 'unit', status: 'passed', durationMs: 4, assertion: 'Submitting duplicate key returns identical cached txId with DUPLICATE_IGNORED' },
        { id: 't2', title: 'Atomic Double-Entry Balances Balance Check', category: 'unit', status: 'passed', durationMs: 6, assertion: 'Sum of debits must mathematically equal sum of credits at all timestamps' },
        { id: 't3', title: 'Insufficient Funds Exception Rejection', category: 'edge_case', status: 'passed', durationMs: 3, assertion: 'Throws explicit InsufficientFunds error without mutating state' },
        { id: 't4', title: 'Concurrent 10,000 Thread Race Condition Test', category: 'integration', status: 'passed', durationMs: 48, assertion: 'Zero double-spend anomalies across 10,000 concurrent mutations' },
        { id: 't5', title: 'SHA256 Audit Trail Cryptographic Validation', category: 'unit', status: 'passed', durationMs: 5, assertion: 'Hash signature strictly matches content block digest' },
        { id: 't6', title: 'Dead-Letter Queue Poison Pill Routing', category: 'integration', status: 'passed', durationMs: 18, assertion: 'Malformed payload routes to DLQ after 3 failed retries' }
      ]
    },
    fault: {
      id: 'race-cond-01',
      title: 'Race Condition in High-Frequency Account Withdrawals',
      errorType: 'ConcurrentMutationError: NegativeBalanceViolation',
      stackTrace: `ConcurrentMutationError: Balance dropped below zero (-$42.00) under concurrent load
    at DistributedLedgerEngine.executeTransaction (services/ledger_service.ts:36:13)
    at async WorkerPool.processBatch (workers/payment_worker.ts:114:9)
    at async Promise.all (index 412)
    at runStressTest (test/concurrency_suite.ts:88:5)`,
      fileAffected: 'services/ledger_service.ts',
      line: 34,
      originalSnippet: `// Step 2: Non-locked balance check (VULNERABLE TO RACE CONDITION)
const currentBalance = this.accountBalances.get(tx.sourceAccountId) ?? 0n;
if (currentBalance < tx.amountCents) {
  throw new Error("Insufficient funds");
}
// Time-of-check to time-of-use vulnerability!
this.accountBalances.set(tx.sourceAccountId, currentBalance - tx.amountCents);`,
      patchedSnippet: `// Step 2: Atomic CAS with Mutex Lock (PATCHED BY AEGIS)
await this.accountLockManager.withLock(tx.sourceAccountId, async () => {
  const currentBalance = this.accountBalances.get(tx.sourceAccountId) ?? 0n;
  if (currentBalance < tx.amountCents) {
    throw new Error(\`Insufficient funds in \${tx.sourceAccountId}\`);
  }
  this.accountBalances.set(tx.sourceAccountId, currentBalance - tx.amountCents);
});`,
      diagnosticSummary: 'Aegis detected a TOCTOU (Time-of-Check to Time-of-Use) concurrency vulnerability where two parallel requests read the same balance prior to deduction, resulting in negative ledger balances.',
      healedVerification: 'Aegis injected an atomic mutex wrapper `withLock` guaranteeing single-flight mutation per account. 10,000 simulated parallel requests executed with 0 race violations and 100% test pass rate.'
    },
    blueprint: {
      openApiSpec: `openapi: 3.1.0
info:
  title: ApexLedger High-Throughput API
  version: 1.4.0
paths:
  /v1/ledger/transact:
    post:
      summary: Execute Idempotent Double-Entry Transaction
      headers:
        X-Idempotency-Key:
          schema:
            type: string
            format: uuid
          required: true
      responses:
        '200':
          description: Transaction Committed
        '409':
          description: Idempotency Conflict Detected`,
      deploymentManifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: apex-ledger-core
spec:
  replicas: 8
  strategy:
    type: RollingUpdate
  template:
    spec:
      containers:
      - name: ledger-engine
        image: ghcr.io/novamesh/apexledger:v1.4.0
        resources:
          limits:
            cpu: "4000m"
            memory: "8Gi"`,
      systemDiagramAscii: `+------------------+      +-------------------+      +--------------------+
|  Ingress Gateway | ---> | Kafka Queue (WAL) | ---> | Go Worker Pool     |
+------------------+      +-------------------+      +--------------------+
        |                                                      |
        v                                                      v
[Redis Idempotency]                                   [TimescaleDB Ledger]`
    }
  },
  {
    id: 'vector-search',
    title: 'Distributed Vector Search & Neural Reranker',
    subtitle: 'Hierarchical Navigable Small World (HNSW) vector index with product quantization and sub-5ms ANN search.',
    tag: 'AI Infrastructure / MLOps',
    domain: 'High-Performance Neural Information Retrieval',
    prompt: 'Synthesize a distributed vector search engine supporting 50 million 1536-dimensional embeddings with cosine distance, dynamic HNSW graphs, and a neural reranking layer.',
    architecture: {
      systemName: 'AuraVector Mesh',
      summary: 'AuraVector utilizes SIMD-accelerated AVX-512 distance computations, memory-mapped HNSW graph layers, and an asynchronous GPU batch reranker.',
      throughputGoal: '25,000 queries/sec',
      targetLatency: 'p99 < 6ms',
      components: [
        { name: 'Vector Index Core', tech: 'Python 3.12 / NumPy / C-Extensions', role: 'HNSW graph traversal, quantized vector storage, greedy search', throughput: '30,000 qps' },
        { name: 'Neural Reranker', tech: 'TypeScript / ONNX Runtime', role: 'Cross-encoder scoring, dynamic candidate truncation, relevance thresholding', throughput: '15,000 qps' },
        { name: 'Cluster Coordinator', tech: 'Raft / Etcd / gRPC', role: 'Shard routing, replica rebalancing, heartbeat telemetry', throughput: '50,000 ops' }
      ],
      rfcDoc: `# RFC-0210: AuraVector Distributed Architecture

## 1. Abstract
Real-time RAG (Retrieval-Augmented Generation) pipelines require sub-10ms semantic retrieval across tens of millions of documents. AuraVector delivers hierarchical graph partitioning with zero garbage-collection latency spikes.

## 2. Technical Specifications
- **Metric Space**: Cosine distance converted to inner-product over L2-normalized vectors.
- **Quantization**: 8-bit scalar quantization with asymptotic memory reduction of 75%.
- **Cross-Encoder Layer**: Async mini-batching with speculative pre-filtering.`
    },
    files: [
      {
        name: 'vector_index.py',
        path: 'core/vector_index.py',
        language: 'python',
        lines: 76,
        description: 'SIMD-optimized HNSW index implementation with neighbor graph pruning.',
        content: `import numpy as np
from typing import List, Tuple, Dict
import heapq

class HNSWVectorIndex:
    def __init__(self, dimension: int = 1536, m: int = 16, ef_construction: int = 200):
        self.dim = dimension
        self.m = m
        self.ef_construction = ef_construction
        self.vectors: np.ndarray = np.empty((0, dimension), dtype=np.float32)
        self.graph: Dict[int, List[int]] = {}
        self.entry_point: int = -1

    def add_vector(self, doc_id: int, vector: np.ndarray):
        norm_vec = vector / (np.linalg.norm(vector) + 1e-9)
        idx = len(self.vectors)
        self.vectors = np.vstack([self.vectors, norm_vec])
        
        if self.entry_point == -1:
            self.entry_point = idx
            self.graph[idx] = []
            return

        # Perform greedy HNSW layer search
        neighbors = self._search_layer(norm_vec, ef=self.ef_construction)
        self.graph[idx] = neighbors[:self.m]
        for neighbor in neighbors[:self.m]:
            self.graph[neighbor].append(idx)

    def query(self, query_vec: np.ndarray, top_k: int = 10) -> List[Tuple[int, float]]:
        norm_query = query_vec / (np.linalg.norm(query_vec) + 1e-9)
        candidates = self._search_layer(norm_query, ef=max(top_k * 2, 64))
        scored = [(doc_id, float(np.dot(self.vectors[doc_id], norm_query))) for doc_id in candidates]
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:top_k]

    def _search_layer(self, vec: np.ndarray, ef: int) -> List[int]:
        # Fast beam search across graph neighbors
        visited = {self.entry_point}
        candidates = [( -float(np.dot(self.vectors[self.entry_point], vec)), self.entry_point )]
        results = [candidates[0]]

        while candidates:
            dist, current = heapq.heappop(candidates)
            for neighbor in self.graph.get(current, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    sim = float(np.dot(self.vectors[neighbor], vec))
                    heapq.heappush(candidates, (-sim, neighbor))
                    results.append((-sim, neighbor))
                    if len(results) > ef:
                        break
        return [node for _, node in sorted(results)]`
      },
      {
        name: 'rerank_engine.ts',
        path: 'reranker/rerank_engine.ts',
        language: 'typescript',
        lines: 54,
        description: 'Cross-encoder neural reranking layer with dynamic batching.',
        content: `export interface CandidateDocument {
  id: string;
  vectorScore: number;
  textSnippet: string;
  rerankedScore?: number;
}

export class NeuralRerankerService {
  private batchLatencyMs: number[] = [];

  public async rerank(query: string, candidates: CandidateDocument[]): Promise<CandidateDocument[]> {
    const startTime = performance.now();
    
    // Speculative lightweight cross-attention scoring
    const reranked = candidates.map(doc => {
      const lexicalOverlap = this.calculateLexicalOverlap(query, doc.textSnippet);
      const combinedScore = (doc.vectorScore * 0.65) + (lexicalOverlap * 0.35);
      return {
        ...doc,
        rerankedScore: Math.min(1.0, Math.max(0.0, combinedScore))
      };
    });

    reranked.sort((a, b) => (b.rerankedScore ?? 0) - (a.rerankedScore ?? 0));
    this.batchLatencyMs.push(performance.now() - startTime);
    return reranked;
  }

  private calculateLexicalOverlap(query: string, text: string): number {
    const qWords = new Set(query.toLowerCase().split(/\\s+/));
    const tWords = text.toLowerCase().split(/\\s+/);
    let matches = 0;
    for (const w of tWords) {
      if (qWords.has(w)) matches++;
    }
    return Math.min(1.0, matches / Math.max(1, qWords.size));
  }
}`
      }
    ],
    testSuite: {
      totalTests: 10,
      passedTests: 10,
      coveragePct: 96.2,
      tests: [
        { id: 'v1', title: 'Cosine Metric Invariance [-1, 1] Range', category: 'unit', status: 'passed', durationMs: 2, assertion: 'All normalized dot products strictly bound between -1.0 and 1.0' },
        { id: 'v2', title: 'HNSW Graph Recall@10 >= 98.4%', category: 'integration', status: 'passed', durationMs: 24, assertion: 'Graph search matches brute-force exact KNN on 10,000 probe vectors' },
        { id: 'v3', title: 'Sub-6ms p99 Latency SLA Verification', category: 'integration', status: 'passed', durationMs: 14, assertion: '99th percentile query completion under 5.82ms' },
        { id: 'v4', title: 'Zero Vector Norm ZeroDivision Guard', category: 'edge_case', status: 'passed', durationMs: 1, assertion: 'Handling of all-zero embedding with epsilon fallback' }
      ]
    },
    fault: {
      id: 'mem-leak-02',
      title: 'Dangling C-Extension Tensor Buffer Memory Leak',
      errorType: 'ResourceExhaustion: MemoryLeakDetected (> 4GB Heap)',
      stackTrace: `ResourceExhaustion: Process memory usage exceeded 4096MB threshold (Current: 4410MB)
    at HNSWVectorIndex.batch_insert (core/vector_index.py:42)
    at worker_process_loop (daemon.py:89)
    at run_stress_benchmark (benchmarks/vector_bench.py:122)`,
      fileAffected: 'core/vector_index.py',
      line: 28,
      originalSnippet: `# Bug: Unbounded append without matrix pre-allocation
self.vectors = np.vstack([self.vectors, norm_vec]) # Creates new copy every single insert!`,
      patchedSnippet: `# Patch by Aegis: Pre-allocated contiguous block buffer with dynamic doubling
if len(self.vectors) >= self._allocated_capacity:
    self._realloc_buffer(double=True)
self.vectors[self._count] = norm_vec
self._count += 1`,
      diagnosticSummary: 'Aegis identified an exponential allocation flaw: using np.vstack in an inner loop created full array copies on every insertion, exhausting heap memory after 100k vectors.',
      healedVerification: 'Aegis replaced the quadratic copy pattern with a geometric capacity doubling strategy, reducing memory footprint by 84% and cutting insert latency by 12x.'
    },
    blueprint: {
      openApiSpec: `openapi: 3.1.0
info:
  title: AuraVector High-Performance Search
  version: 2.1.0
paths:
  /v1/vectors/search:
    post:
      summary: Approximate Nearest Neighbor Query
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                vector: { type: array, items: { type: number } }
                top_k: { type: integer, default: 10 }`,
      deploymentManifest: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: auravector-node
spec:
  serviceName: "auravector"
  replicas: 4
  template:
    spec:
      containers:
      - name: vector-engine
        image: ghcr.io/novamesh/auravector:v2.1.0
        resources:
          requests:
            memory: "16Gi"
            cpu: "8"`,
      systemDiagramAscii: `[Client Request] --> [gRPC Load Balancer]
                          |
             +------------+------------+
             |                         |
    [Shard 0: HNSW Index]     [Shard 1: HNSW Index]
             |                         |
             +------------+------------+
                          v
               [Neural Reranker (ONNX)]`
    }
  },
  {
    id: 'microservices-mesh',
    title: 'Autonomous Self-Healing Microservices Mesh',
    subtitle: 'eBPF-driven kernel telemetry with adaptive circuit breaking, traffic shedding, and auto-rollback.',
    tag: 'Cloud Native / DevOps',
    domain: 'Self-Healing Cloud Infrastructure',
    prompt: 'Design an autonomous microservices service mesh controller that detects cascading failure waves using eBPF, sheds load via adaptive PID circuit breaking, and synthesizes automatic hotfixes.',
    architecture: {
      systemName: 'KubeSentinel Mesh',
      summary: 'KubeSentinel fuses Linux eBPF kernel-level socket telemetry with an autonomous PID circuit breaker controller to prevent catastrophic cascading outages.',
      throughputGoal: '200,000 rps per node',
      targetLatency: 'eBPF overhead < 0.2%',
      components: [
        { name: 'eBPF Telemetry Probe', tech: 'C (BCC / libbpf) / Linux Kernel', role: 'Zero-overhead socket tracing, TCP SYN/RST tracking, HTTP status extraction', throughput: '1,000,000 pkt/s' },
        { name: 'Mesh Controller', tech: 'Go (Kubernetes Controller Runtime)', role: 'Reconciliation loop, dynamic Envoy filter injection, anomaly scoring', throughput: '500 reconcile/s' },
        { name: 'Adaptive Circuit Breaker', tech: 'TypeScript / Rust', role: 'Token bucket rate-limiting with exponential jitter shedding', throughput: '150,000 rps' }
      ],
      rfcDoc: `# RFC-0305: KubeSentinel Self-Healing Mesh

## 1. Motivation
Traditional health probes (HTTP GET /healthz) react after services have already degraded. KubeSentinel inspects TCP socket queues directly via eBPF to detect saturation 30 seconds before 5xx cascades erupt.

## 2. Dynamic Actions
- **Level 1 (Warning)**: Divert non-critical traffic (analytics/recommendations) to fallback mock responses.
- **Level 2 (Throttle)**: Apply dynamic PID-governed token bucket to reduce concurrency.
- **Level 3 (Heal)**: Trigger autonomous container restart or rolling canary rollback.`
    },
    files: [
      {
        name: 'mesh_controller.go',
        path: 'controller/mesh_controller.go',
        language: 'go',
        lines: 62,
        description: 'Reconciler monitoring error budgets and injecting Envoy rate limits.',
        content: `package main

import (
	"context"
	"fmt"
	"time"
)

type ServiceHealth struct {
	Namespace     string
	ServiceName   string
	ErrorRate     float64 // 0.0 to 1.0
	LatencyP99Ms  int64
	CircuitTripped bool
}

type MeshReconciler struct {
	thresholdErrorRate float64
}

func (r *MeshReconciler) Reconcile(ctx context.Context, health ServiceHealth) error {
	if health.ErrorRate > r.thresholdErrorRate {
		fmt.Printf("[TRIP] Anomaly detected in %s/%s (ErrorRate: %.2f%%). Triggering autonomous shedding.\\n",
			health.Namespace, health.ServiceName, health.ErrorRate*100)
		return r.applyCircuitBreaker(health)
	}
	return nil
}

func (r *MeshReconciler) applyCircuitBreaker(health ServiceHealth) error {
	// Dynamically inject Envoy HTTP filter to rate-limit 40% of non-essential traffic
	time.Sleep(10 * time.Millisecond)
	return nil
}`
      },
      {
        name: 'circuit_breaker.ts',
        path: 'traffic/circuit_breaker.ts',
        language: 'typescript',
        lines: 58,
        description: 'Adaptive token bucket with jitter and dynamic throttle factor.',
        content: `export class AdaptiveCircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly threshold = 5;
  private readonly resetTimeoutMs = 15000;

  public async execute<T>(action: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeoutMs) {
        this.state = 'HALF_OPEN';
      } else {
        return fallback();
      }
    }

    try {
      const result = await action();
      if (this.state === 'HALF_OPEN') {
        this.reset();
      }
      return result;
    } catch (err) {
      this.recordFailure();
      return fallback();
    }
  }

  private recordFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }

  public reset(): void {
    this.state = 'CLOSED';
    this.failureCount = 0;
  }
}`
      }
    ],
    testSuite: {
      totalTests: 14,
      passedTests: 14,
      coveragePct: 97.5,
      tests: [
        { id: 'm1', title: 'Circuit Trip on 5 Consecutive Downstream Failures', category: 'unit', status: 'passed', durationMs: 5, assertion: 'State cleanly switches from CLOSED to OPEN after 5th fault' },
        { id: 'm2', title: 'Half-Open Probe Recovery After 15s Cooldown', category: 'integration', status: 'passed', durationMs: 12, assertion: 'Successful probe in HALF_OPEN restores CLOSED state' },
        { id: 'm3', title: 'eBPF Kernel Socket Event Ring Buffer Overflow Guard', category: 'edge_case', status: 'passed', durationMs: 8, assertion: 'Zero packet drops when ring buffer reaches 90% capacity' }
      ]
    },
    fault: {
      id: 'deadlock-03',
      title: 'Unbuffered Channel Deadlock on Burst Telemetry Drain',
      errorType: 'FatalError: Goroutines Deadlocked on Sync Channel',
      stackTrace: `fatal error: all goroutines are asleep - deadlock!
goroutine 1 [chan send]:
main.(*MeshReconciler).streamEvents(0x14000118000, 0x14000100080)
    /mesh/controller/mesh_controller.go:48 +0x64
main.main()
    /mesh/main.go:24 +0x48`,
      fileAffected: 'controller/mesh_controller.go',
      line: 48,
      originalSnippet: `// Unbuffered channel blocks main scheduler during high traffic burst
telemetryChan := make(chan MetricEvent)
go func() { telemetryChan <- event }() // Blocked!`,
      patchedSnippet: `// Patched by Aegis: Non-blocking buffered ring channel with drop-oldest policy
telemetryChan := make(chan MetricEvent, 50000)
select {
case telemetryChan <- event:
default:
    metricDropCounter.Inc() // Record dropped telemetry instead of locking main thread
}`,
      diagnosticSummary: 'Aegis pinpointed an unbuffered channel write inside a critical event dispatcher. When telemetry spiked past 20k events/s, goroutines blocked waiting for a reader, halting the process.',
      healedVerification: 'Aegis converted the synchronizing channel into an asynchronous buffered ring with drop metrics. Sustained 100,000 events/s with 0 thread deadlocks.'
    },
    blueprint: {
      openApiSpec: `openapi: 3.1.0
info:
  title: KubeSentinel Controller Control-Plane
  version: 3.0.0
paths:
  /v1/mesh/status:
    get:
      summary: Retrieve cluster health matrix and circuit states`,
      deploymentManifest: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kubesentinel-ebpf-agent
spec:
  template:
    spec:
      hostNetwork: true
      containers:
      - name: ebpf-probe
        securityContext:
          privileged: true`,
      systemDiagramAscii: `[eBPF Socket Filter] ---> [Ring Buffer] ---> [Go Controller]
          |                                        |
          v                                        v
   (TCP RST Tracking)                    (Dynamic Envoy Rules)`
    }
  },
  {
    id: 'graph-neural-stream',
    title: 'Streaming Graph Neural Network Engine',
    subtitle: 'Dynamic temporal graph message passing with sub-20ms fraud syndicate detection.',
    tag: 'Deep Learning / Graph AI',
    domain: 'Real-time Graph Neural Networks',
    prompt: 'Build a streaming Graph Neural Network (GNN) engine that continuously ingests financial transaction edges, maintains temporal node states, and flags fraud clusters in real time.',
    architecture: {
      systemName: 'NeuroGraph Stream',
      summary: 'NeuroGraph Stream combines temporal random walks with spatial message passing (MPNN) to compute dynamic node embeddings on live transaction graphs.',
      throughputGoal: '40,000 edges/sec',
      targetLatency: 'Embedding generation < 15ms',
      components: [
        { name: 'Graph Ingestion Buffer', tech: 'Python / Cython / PyTorch', role: 'Temporal edge windowing, dynamic adjacency tracking', throughput: '45,000 edges/s' },
        { name: 'MPNN Message Passer', tech: 'PyTorch Geometric / CUDA', role: 'Relational feature aggregation and attention pooling', throughput: '20,000 nodes/s' },
        { name: 'Syndicate Alert API', tech: 'FastAPI / WebSocket', role: 'Sub-20ms fraud alert streaming to downstream decision engines', throughput: '50,000 req/s' }
      ],
      rfcDoc: `# RFC-0412: NeuroGraph Temporal Message Passing

## 1. Overview
Financial fraud syndicates distribute transactions across multiple intermediary accounts to evade threshold checks. NeuroGraph maintains multi-hop subgraph neighborhoods to identify synthetic identity rings in real time.`
    },
    files: [
      {
        name: 'graph_stream.py',
        path: 'gnn/graph_stream.py',
        language: 'python',
        lines: 66,
        description: 'Temporal edge stream aggregator with decay weighting.',
        content: `import time
from collections import defaultdict
from typing import Dict, List, Tuple

class TemporalGraphStream:
    def __init__(self, window_seconds: int = 3600, decay_rate: float = 0.001):
        self.window = window_seconds
        self.decay_rate = decay_rate
        self.adjacency: Dict[str, List[Tuple[str, float, float]]] = defaultdict(list)

    def add_edge(self, src: str, dst: str, weight: float):
        now = time.time()
        self.adjacency[src].append((dst, weight, now))
        self.adjacency[dst].append((src, weight, now))
        self._prune_expired(now)

    def _prune_expired(self, current_time: float):
        cutoff = current_time - self.window
        for node in list(self.adjacency.keys()):
            self.adjacency[node] = [
                (dst, w, t) for dst, w, t in self.adjacency[node] if t > cutoff
            ]
            if not self.adjacency[node]:
                del self.adjacency[node]`
      }
    ],
    testSuite: {
      totalTests: 11,
      passedTests: 11,
      coveragePct: 95.1,
      tests: [
        { id: 'g1', title: 'Temporal Window Expiry Purges Old Edges', category: 'unit', status: 'passed', durationMs: 4, assertion: 'Edges older than window are accurately purged from memory' },
        { id: 'g2', title: 'Multi-Hop Ring Detection Identifies 5-Node Cycle', category: 'integration', status: 'passed', durationMs: 16, assertion: 'Cycle detection accurately tags synthetic circular routing' }
      ]
    },
    fault: {
      id: 'out-of-bounds-04',
      title: 'Index Out of Bounds on Disconnected Graph Sub-Neighborhood',
      errorType: 'IndexError: Target node index [841] out of bounds for tensor with size [512, 64]',
      stackTrace: `IndexError: Target node index [841] out of bounds for tensor with size [512, 64]
    at MPNNLayer.forward (gnn/mpnn_layer.py:78)
    at TemporalGraphStream.compute_embeddings (gnn/graph_stream.py:112)
    at run_inference_stream (daemon.py:44)`,
      fileAffected: 'gnn/graph_stream.py',
      line: 78,
      originalSnippet: `# Missing bounds check when aggregating isolated nodes
target_features = node_tensor[target_indices] # Throws IndexError if index >= current batch size!`,
      patchedSnippet: `# Patched by Aegis: Masked bounds clamp with self-loop identity embedding
valid_indices = torch.clamp(target_indices, min=0, max=node_tensor.size(0) - 1)
target_features = node_tensor[valid_indices]`,
      diagnosticSummary: 'Aegis identified an out-of-bounds indexing error triggered when orphan nodes with dynamic new IDs were referenced prior to embedding tensor resizing.',
      healedVerification: 'Aegis implemented safe index clamping with an identity self-loop placeholder. Graph batch processing now handles discontinuous node IDs seamlessly.'
    },
    blueprint: {
      openApiSpec: `openapi: 3.1.0
info:
  title: NeuroGraph Real-Time Detection
  version: 1.0.0`,
      deploymentManifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: neurograph-worker`,
      systemDiagramAscii: `[Transaction Event] ---> [Temporal Edge Ingestion] ---> [MPNN Embeddings] ---> [Syndicate Alert]`
    }
  }
];
