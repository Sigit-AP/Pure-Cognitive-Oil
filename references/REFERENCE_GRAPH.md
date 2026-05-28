# DCI Reference Graph


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** DCI Reference Graph
- **Path:** `references/REFERENCE_GRAPH.md`
- **Folder:** `.`
- **Document type:** Reference map
- **Primary audience:** Agent runtimes, maintainers, and documentation readers.
- **Purpose:** Describe the executable relationship graph between DCI references.
- **Standard used:** Architecture decision record style plus documentation information architecture.

## When to Use

Use when navigating the reference corpus or checking graph connectivity.

## Inputs

Reference titles, file paths, graph neighbors, and runtime-generated links.

## Expected Outputs

A readable map of reference relationships and traversal targets.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Graph source and runtime loader are identified.
- [ ] Links resolve to existing reference files.
- [ ] Relationships are useful for routing, not decorative.
- [ ] Generated content remains reproducible.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

Executable graph: [`reference-graph.mjs`](reference-graph.mjs). Runtime loader: [`runtime/dci-reference-runtime.mjs`](runtime/dci-reference-runtime.mjs).

## advanced

- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Collaborative Intelligence System — Deterministic-Cognitive-Infrastructure](advanced/collaborative-intelligence.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Collaborative Intelligence System — Deterministic-Cognitive-Infrastructure](advanced/collaborative-intelligence.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Collaborative Intelligence System — Deterministic-Cognitive-Infrastructure](advanced/collaborative-intelligence.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Communication Optimization System — Deterministic-Cognitive-Infrastructure](advanced/communication-optimization.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Emergent Complexity Engine — Deterministic-Cognitive-Infrastructure](advanced/emergent-complexity.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Failure Pattern Database — Deterministic-Cognitive-Infrastructure](advanced/failure-patterns.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Resource Optimization System — Deterministic-Cognitive-Infrastructure](advanced/resource-optimization.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Temporal Intelligence System — Deterministic-Cognitive-Infrastructure](advanced/temporal-intelligence.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)

## cognitive-engines

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Causal Inference Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/causal-inference.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Causal Inference Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/causal-inference.md)
- [Causal Inference Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/causal-inference.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Cognitive Synthesis Protocol — Deterministic-Cognitive-Infrastructure](cognitive-engines/cognitive-synthesis.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Context Awareness Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/context-engine.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Creative Synthesis Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/creative-synthesis.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [First Principles Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/first-principles.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Hallucination Defense System — Deterministic-Cognitive-Infrastructure](cognitive-engines/hallucination-defense.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Meta-Cognitive Framework — Deterministic-Cognitive-Infrastructure](cognitive-engines/meta-cognition.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Intelligent Search Strategy — Deterministic-Cognitive-Infrastructure](cognitive-engines/search-strategy.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Self-Correction Protocol — Deterministic-Cognitive-Infrastructure](cognitive-engines/self-correction.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Bayesian Uncertainty Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/uncertainty-engine.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [🦾✨ DRAFT: Deterministic-Cognitive-Infrastructure - Context Integrity & Zero-Hallucination Protocol](cognitive-engines/zero-hallucination.md)
  - connects to [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](advanced/agentic-auto-runtime.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)

## core

- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
  - connects to [The 10-Phase Execution Pipeline — Deterministic-Cognitive-Infrastructure](core/pipeline-phases.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 10-Phase Execution Pipeline — Deterministic-Cognitive-Infrastructure](core/pipeline-phases.md)
- [The 10-Phase Execution Pipeline — Deterministic-Cognitive-Infrastructure](core/pipeline-phases.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)

## knowledge-bases

- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](knowledge-bases/anti-patterns.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](knowledge-bases/decision-tree.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Causal Inference Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/causal-inference.md)
  - connects to [First Principles Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/first-principles.md)
- [150+ Mental Models — Deterministic-Cognitive-Infrastructure Framework](knowledge-bases/mental-models.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Extended Reference — Deterministic-Cognitive-Infrastructure Framework](knowledge-bases/reference.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)

## quality-safety

- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](quality-safety/error-recovery.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](quality-safety/ethical-framework.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Meta-Learning System — Deterministic-Cognitive-Infrastructure](quality-safety/meta-learning.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Unified Gate System — Deterministic-Cognitive-Infrastructure](quality-safety/quality-gates.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Verification & Validation System — Deterministic-Cognitive-Infrastructure](quality-safety/verification-checklist.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)

## workflows

- [API Design Workflow — Deterministic-Cognitive-Infrastructure](workflows/api-design.md)
  - connects to [Communication Optimization System — Deterministic-Cognitive-Infrastructure](advanced/communication-optimization.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
- [Software Architecture Workflow — Deterministic-Cognitive-Infrastructure](workflows/architecture.md)
  - connects to [Emergent Complexity Engine — Deterministic-Cognitive-Infrastructure](advanced/emergent-complexity.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
- [Bug Fix Protocol — Deterministic-Cognitive-Infrastructure](workflows/bug-fix.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Code Review Workflow — Deterministic-Cognitive-Infrastructure](workflows/code-review.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Hallucination Defense System — Deterministic-Cognitive-Infrastructure](cognitive-engines/hallucination-defense.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
- [Debugging the Unknown Workflow — Deterministic-Cognitive-Infrastructure](workflows/debugging-unknown.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Self-Correction Protocol — Deterministic-Cognitive-Infrastructure](cognitive-engines/self-correction.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
- [Greenfield Project Workflow — Deterministic-Cognitive-Infrastructure](workflows/greenfield.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Incident Response Protocol — Deterministic-Cognitive-Infrastructure](workflows/incident-response.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Legacy System Rescue Workflow — Deterministic-Cognitive-Infrastructure](workflows/legacy-rescue.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Database Migration Workflow — Deterministic-Cognitive-Infrastructure](workflows/migration.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [New Feature Development Workflow — Deterministic-Cognitive-Infrastructure](workflows/new-feature.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Performance Optimization Workflow — Deterministic-Cognitive-Infrastructure](workflows/performance.md)
  - connects to [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](advanced/cognitive-load.md)
  - connects to [Resource Optimization System — Deterministic-Cognitive-Infrastructure](advanced/resource-optimization.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
- [Refactoring Workflow — Deterministic-Cognitive-Infrastructure](workflows/refactoring.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Research Spike Workflow — Deterministic-Cognitive-Infrastructure](workflows/research-spike.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Security Audit Workflow — Deterministic-Cognitive-Infrastructure](workflows/security-audit.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Technical Writing Workflow — Deterministic-Cognitive-Infrastructure](workflows/technical-writing.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
- [Deterministic-Cognitive-Infrastructure Workflow Index — v1](workflows/workflow-index.md)
  - connects to [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](cognitive-engines/adversarial-reasoning.md)
  - connects to [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](cognitive-engines/analogical-transfer.md)
  - connects to [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](core/adaptive-depth.md)
  - connects to [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](core/iron-laws.md)
