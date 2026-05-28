# Deterministic-Cognitive-Infrastructure Workflow Index — v1

> **"A cognitive framework is only as powerful as its execution paths. The Deterministic-Cognitive-Infrastructure Cognitive Engines dictate *how* to think deeply about a problem. The Workflows dictate *what* explicit physical actions to take to solve it. Without workflows, Deterministic Cognitive Infrastructure degrades into useless, paralyzing philosophy. Without Deterministic Cognitive Infrastructure, workflows degrade into mindless, bureaucratic checklist-following. You must marry the Engine to the Workflow."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Deterministic-Cognitive-Infrastructure Workflow Index — v1
- **Path:** `references/workflows/workflow-index.md`
- **Folder:** `workflows`
- **Document type:** Workflow runbook
- **Primary audience:** Agents executing software engineering tasks and reviewers auditing their work.
- **Purpose:** Translate DCI principles into step-by-step execution for a specific task class.
- **Standard used:** Runbook/SOP format with task, procedure, verification, and handoff sections.

## When to Use

Use when a user request matches the workflow domain or when routing selects this file.

## Inputs

Task scope, repo context, affected files, constraints, tests, risks, and acceptance criteria.

## Expected Outputs

Plan, implementation path, validation evidence, rollback notes, and final report.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Entry condition is clear.
- [ ] Procedure is ordered.
- [ ] Verification command or evidence is defined.
- [ ] Final handoff/reporting criteria are explicit.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## The Architecture of Execution

```
The Deterministic-Cognitive-Infrastructure framework is strictly divided into Engines (the brain/heuristics) and Workflows (the hands/execution). 

When you encounter a new engineering task, a bug, or an architectural request, you do not just "start coding." That is amateur behavior. You must first classify the task into one of the 16 strict Workflows defined below. 

Each Workflow is a highly optimized, inherently adversarial, and deeply defensive protocol designed specifically to prevent the most common catastrophic failure modes associated with that specific type of software engineering task. They are not suggestions; they are rules written in the blood of production outages and lost corporate revenue.
```

---

## 1. Core Development Workflows (The Creation Phase)

These workflows explicitly govern the introduction of *new* complexity into a software system. Because new code is inherently a new liability, these workflows are heavily weighted toward upfront planning, strict schema definition, and architectural restraint.

### [New Feature Development](./new-feature.md)
The end-to-end protocol for taking a vague business hypothesis, mathematically verifying it via strict schema design (OpenAPI/Zod), vertically slicing the implementation to avoid massive Waterfall development bottlenecks, and deploying it safely behind boolean feature flags. It rigidly enforces the rule that the UI is merely a superficial delivery detail for the core mathematical Domain logic.

### [Greenfield Project Bootstrapping](./greenfield.md)
How to start a brand new software project from an absolute blank slate without instantly filling the void with Accidental Complexity (Resume-Driven Architecture). Emphasizes strict CI/CD pipeline discipline on Day 1, iron-fisted tooling baselines (linters/formatters that fail the build), and early architectural constraint enforcement before a single line of business logic is written.

### [API Design & Contract Creation](./api-design.md)
The strict, inflexible laws of RESTful resource modeling, strict JSON schema validation, HTTP status code semantic enforcement, and security hardening at the external boundary layer. It treats the public API as a legally binding, mathematically backwards-compatible contract that cannot be broken or altered once published without causing a Sev-1 incident for your consumers.

---

## 2. System Maintenance & Evolution (The Mutation Phase)

These workflows strictly govern how to change a complex system that is already running in production and actively generating revenue. The primary, overriding goal here is absolute behavior preservation, zero-downtime execution, and extreme risk mitigation.

### [Refactoring Protocol](./refactoring.md)
The mathematical, micro-step rules for transforming existing code structure without altering its external behavior. It strictly enforces Kent Beck's "Two Hats" rule (never, ever add a new feature while simultaneously refactoring existing code) and requires 100% automated test coverage as a safety net before a single variable is renamed or a method is extracted.

### [Database Migration Execution](./migration.md)
The highly delicate, zero-downtime "Expand-and-Contract" (Parallel Run) protocol for altering live production database schemas without locking active tables, dropping live connections, or causing cascading connection pool exhaustion across the application tier. It treats data gravity with extreme paranoia and rejects the myth of the "rollback script" for massive datasets.

### [Legacy System Rescue](./legacy-rescue.md)
How to physically and psychologically survive inside a massive, untested, monolithic 10-year-old codebase without triggering a Sev-1 outage. Emphasizes Golden Master Characterization Testing to mathematically lock in existing bugs, the Strangler Fig architectural pattern to route traffic away safely, and surgical dependency breaking using the Sprout and Wrap techniques.

### [Architecture Decision Making](./architecture.md)
When and how to mathematically and organizationally choose between a Monolith, a Modular Monolith (The Citadel), and a heavily Distributed Microservices architecture based on Conway's Law. Enforces the strict creation of Architecture Decision Records (ADRs) to document historical trade-offs and constraints for future engineers, preventing endless architectural re-litigation.

---

## 3. Quality Assurance & Verification (The Defense Phase)

These workflows act as the adversarial immune system of the codebase. They fundamentally assume the code submitted is flawed, mathematically insecure, and unacceptably slow, and they provide the exact tools to prove it before it merges.

### [Code Review Protocol](./code-review.md)
The adversarial framework for reviewing pull requests. It strictly shifts focus away from trivial syntax formatting (which MUST be automated by machines) toward systemic physics, performance bottlenecks, boundary defense, and IDOR vulnerabilities. It enforces that rubber-stamping an approval means you legally inherit the debt.

### [Security Auditing](./security-audit.md)
The absolute "Assume Breach" protocol. Actively scans architecture and code for IDORs, cryptographic failures, JWT leakages, SSRF, and injection vectors using a zero-trust mindset. It assumes the frontend is totally compromised, the network is actively tapped, and the database will eventually be dumped to the dark web.

### [Performance Optimization](./performance.md)
The scientific, metric-driven method for finding and breaking application speed bottlenecks. Rejects human intuition entirely in favor of strict profiling, flame graphs, EXPLAIN ANALYZE, and calculating the theoretical physical limits of the hardware and network before writing a single line of optimization code.

### [Technical Writing & Documentation](./technical-writing.md)
The rigid rules for creating the four explicit types of documentation (Tutorials, How-Tos, Reference, Explanation), writing the perfect 3-command README, and treating Docs-as-Code. It recognizes that documentation is the primary interface between machine complexity and human working memory, and that an undocumented system is a dead system.

---

## 4. Crisis & Unknowns (The War Room Phase)

These workflows are explicitly designed for high-stress, low-information environments where the system is failing. They replace human panic, guessing, and voodoo programming with rigid, military-style execution and mathematical isolation.

### [Bug Fix Protocol](./bug-fix.md)
The deterministic method for isolating a logical failure in a system you understand. Emphasizes finding the absolute Minimal Reproducible Example (MRE) first, using Binary Bisection to find the exact offending git commit, and writing explicit, automated regression tests before applying the surgical code fix.

### [Debugging the Unknown](./debugging-unknown.md)
How to survive and fix bugs in a massive, undocumented alien codebase you have never seen before. Uses Tracer Bullets, aggressive Bisection, and I/O payload isolation rather than attempting the mathematically impossible task of reading and comprehending thousands of lines of spaghetti code.

### [Incident Response Protocol](./incident-response.md)
The military-style Incident Command System (ICS) for surviving a Sev-1 production outage at 3 AM. Strictly prioritizes immediate bleeding mitigation (tourniquets and rollbacks) over root-cause analysis, followed days later by a Blameless, system-focused Post-Mortem to fix the architectural flaws that allowed the human error to occur.

### [Research Spikes](./research-spike.md)
The strict protocol for writing highly disposable code to map the physical constraints, latencies, and failure modes of a completely new, unproven technology. Enforces strict physical timeboxing and the mandatory, immediate incineration of the spike code to prevent it from ever leaking into the production `main` branch.

### [Heuristic Debugging (The Gremlin Protocol)](./debugging-unknown.md)
*Merged into Debugging the Unknown.* The specialized physics of tracking down non-deterministic, highly intermittent bugs caused by race conditions, timezone drifting, network packet loss, or unseeded random number generators. Requires freezing time and mocking network layers to force determinism.

---

## 5. Continuous Mastery (The Evolution Phase)

These workflows dictate how the engineering team upgrades itself over time. They are the mechanisms by which the team learns from its own failures.

### [Post-Mortem Analysis](./technical-writing.md#part-6-incident-post-mortems-the-most-valuable-documents)
The rigorous, blameless protocol for deconstructing a production failure into actionable, systemic improvements. If a post-mortem does not generate tickets, it was useless.

### [Architecture Decision Records (ADRs)](./technical-writing.md#part-7-architecture-decision-records-adrs)
The formal process for logging why a specific technology was chosen, capturing the historical constraints that justify "weird" code, and preventing circular technical debates when new engineers join the team.

### [The Tech Radar Review](./architecture.md)
A quarterly, highly structured process to evaluate the current tech stack against the industry standard, explicitly deciding to ADOPT, TRIAL, ASSESS, or HOLD specific technologies to prevent the codebase from slowly decaying into an unmaintainable museum of obsolete tools. The Deterministic-Cognitive-Infrastructure model demands constant vigilance against technological stagnation and cognitive decay.

---

## 6. Execution Rules for the AI Persona (Sunny-kun)

When operating within the Deterministic-Cognitive-Infrastructure framework, the AI assistant MUST strictly adhere to the following routing heuristics:

1. **Classify Immediately:** Upon receiving a new task from the user, immediately map it to one of the 16 workflows above. Do not execute ad-hoc.
2. **State the Protocol:** Start the response by explicitly stating which protocol is being activated (e.g., "Activating Deterministic-Cognitive-Infrastructure Legacy Rescue Protocol. Proceeding with Strangler Fig strategy.").
3. **Enforce the Constraints:** If the user asks for something that violates the workflow constraints (e.g., asking to rewrite a legacy module without tests), the AI must firmly push back, citing the specific Deterministic-Cognitive-Infrastructure rule.
4. **Demand Context:** Refuse to debug blind. Demand the stack trace, the raw JSON payload, or the specific commit hash before offering "guess" solutions.

<!-- DCI-RELATED-START -->

## Related DCI references

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)

<!-- DCI-RELATED-END -->
