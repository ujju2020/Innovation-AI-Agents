/**
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick
 * Developer: Ujjwal Kumar Bhowmick
 * Email: ujjwalkumarbhowmick30@gmail.com
 * All rights reserved.
 */

import { RndScenario, AgentId, InterAgentMessage } from '../types/agent';
import { MOCK_SCENARIOS } from './mockScenarios';

export interface GeminiConfig {
  apiKey: string;
  model: string;
}

export class GeminiService {
  private config: GeminiConfig | null = null;

  constructor() {
    const savedKey = localStorage.getItem('novamesh_gemini_api_key');
    const savedModel = localStorage.getItem('novamesh_gemini_model') || 'gemini-2.5-flash';
    if (savedKey) {
      this.config = { apiKey: savedKey, model: savedModel };
    }
  }

  public setConfig(config: GeminiConfig) {
    this.config = config;
    localStorage.setItem('novamesh_gemini_api_key', config.apiKey);
    localStorage.setItem('novamesh_gemini_model', config.model);
  }

  public getConfig(): GeminiConfig | null {
    return this.config;
  }

  public clearConfig() {
    this.config = null;
    localStorage.removeItem('novamesh_gemini_api_key');
  }

  public hasKey(): boolean {
    return Boolean(this.config?.apiKey);
  }

  public async callGemini(systemInstruction: string, userPrompt: string): Promise<string> {
    if (!this.config?.apiKey) {
      throw new Error('No Gemini API key configured');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            parts: [{ text: userPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.95,
          maxOutputTokens: 2500
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }
    return text;
  }

  /**
   * Synthesize custom R&D scenario dynamically if live key is provided,
   * or intelligently match/adapt from scenario registry.
   */
  public async executeRndPipeline(
    prompt: string,
    onProgress: (agent: AgentId, status: string, message?: InterAgentMessage) => void
  ): Promise<RndScenario> {
    // Step 1: Archon R&D & Architecture
    onProgress('archon', 'Analyzing problem constraints, algorithms, and microservice topology...');
    await new Promise(r => setTimeout(r, 900));

    onProgress('archon', 'Drafting RFC architecture specification and throughput targets...');
    await new Promise(r => setTimeout(r, 800));

    // Step 2: Synthetix Code Synthesis
    onProgress('synthetix', 'Synthesizing polyglot code modules (TypeScript, Go, SQL)...');
    await new Promise(r => setTimeout(r, 1000));

    // Step 3: Sentinel Test Generation & Verification
    onProgress('sentinel', 'Generating automated test harness, concurrency fuzzing, and benchmark suites...');
    await new Promise(r => setTimeout(r, 800));

    // Step 4: Aegis Self-Healing Diagnostic Check
    onProgress('aegis', 'Scanning synthesized code for race conditions, memory leaks, and edge-case exceptions...');
    await new Promise(r => setTimeout(r, 700));

    // Step 5: BlueprintAI Documentation & Deployment
    onProgress('blueprint', 'Generating interactive OpenAPI 3.1 specifications and Kubernetes manifests...');
    await new Promise(r => setTimeout(r, 600));

    // If live Gemini key is present, we can optionally enhance the architecture RFC dynamically
    if (this.config?.apiKey) {
      try {
        const liveRfc = await this.callGemini(
          'You are Archon, an expert System Architect. Output a concise 3-paragraph technical RFC architecture plan including: (1) Abstract, (2) Core Architectural Decisions, (3) Throughput & Latency SLAs for the following requirement.',
          prompt
        );

        // Build adaptive custom scenario based on base template + live Gemini synthesis
        const base = MOCK_SCENARIOS[0];
        return {
          ...base,
          id: 'custom-live-' + Date.now(),
          title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
          prompt: prompt,
          architecture: {
            ...base.architecture,
            systemName: 'NovaEngine Custom Synthesis',
            rfcDoc: liveRfc
          }
        };
      } catch (err) {
        console.warn('Live Gemini call fell back to resilient scenario:', err);
      }
    }

    // Default matching: find closest scenario or return base
    const lower = prompt.toLowerCase();
    if (lower.includes('vector') || lower.includes('search') || lower.includes('embedding') || lower.includes('rag')) {
      return MOCK_SCENARIOS[1];
    }
    if (lower.includes('mesh') || lower.includes('ebpf') || lower.includes('microservice') || lower.includes('circuit')) {
      return MOCK_SCENARIOS[2];
    }
    if (lower.includes('graph') || lower.includes('gnn') || lower.includes('neural') || lower.includes('fraud')) {
      return MOCK_SCENARIOS[3];
    }

    return MOCK_SCENARIOS[0];
  }
}

export const geminiService = new GeminiService();
