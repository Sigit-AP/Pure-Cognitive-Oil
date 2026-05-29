# Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure

> **"The fool applies maximum effort to every problem, exhausting themselves before the real battle begins. The master scales their cognitive exertion perfectly to the structural importance of the problem. A typo requires a glance; an architectural decision requires a war room. Treating trivial problems as profound is a waste of genius; treating profound problems as trivial is a recipe for disaster."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure
- **Path:** `references/core/adaptive-depth.md`
- **Folder:** `core`
- **Document type:** Core operating doctrine
- **Primary audience:** Agents, reviewers, maintainers, and automation harnesses.
- **Purpose:** Define non-negotiable operating rules, execution phases, and depth controls.
- **Standard used:** Policy documentation plus operational runbook structure.

## When to Use

Use before planning, implementation, verification, or high-risk decisions.

## Inputs

Task request, risk level, system context, evidence, constraints, and failure signals.

## Expected Outputs

A disciplined execution mode, explicit gates, and evidence-backed completion criteria.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Task is classified before action.
- [ ] Depth level is explicit.
- [ ] Phase gates are followed.
- [ ] Claims are backed by evidence.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Part 1: The Principle of Cognitive Economy

```
Cognitive load is a finite, highly constrained resource—both for human engineers and for AI inference limits. The Deterministic-Cognitive-Infrastructure engines run hot and consume massive computational and reasoning bandwidth. Applying a Level 5 Deterministic Cognitive Infrastructure protocol to a Level 1 trivial problem is not being "thorough"—it is inefficient, wasteful, and actively harmful to the velocity of the project.

THE THREE LAWS OF ADAPTIVE DEPTH:
1. The Law of Proportionality: The depth of the reasoning applied must be strictly, mathematically proportional to the blast radius of a potential failure.
2. The Law of Reversibility: If a decision is instantly and cheaply reversible (A Two-Way Door), think less, act faster, and measure the result. If a decision is irreversible (A One-Way Door), stop acting immediately and think deeply.
3. The Law of Diminishing Returns: Past a specific Action Threshold, further analysis yields exponentially less value while costing exponentially more time. At a certain point, execution *is* the analysis.
```

## Part 2: The 5 Levels of Cognitive Depth

```
Before writing a single line of code, assess every incoming task and explicitly assign it a Depth Level. This determines which Deterministic-Cognitive-Infrastructure engines to spool up.

LEVEL 1: AUTONOMIC (Reflexive Execution)
├─ Criteria: Trivial, completely isolated, perfectly understood, instantly reversible with zero side effects.
├─ Examples: Fixing a typo in a README, changing a CSS color hex code, updating an NPM package patch version, renaming a local variable.
├─ Engaged Engines: None. Use pure execution.
└─ Protocol: Execute immediately. Do not plan. Do not analyze. Do not write a 5-paragraph PR description. Just merge it and move on.

LEVEL 2: TACTICAL (Standard Operating Procedure)
├─ Criteria: Standard, daily engineering tasks, utilizing well-understood patterns, isolated to a single component or module. Reversible with minor effort.
├─ Examples: Adding a new CRUD endpoint following existing boilerplate patterns, creating a standard React component, writing a standard unit test for pure logic.
├─ Engaged Engines: Context Engine (lightly), Error Recovery Engine.
└─ Protocol: Briefly check the local context. Follow the established pattern exactly. Execute the code. Run the local tests. Move on. Do not reinvent the wheel here.

LEVEL 3: STRATEGIC (Deep Reasoning Required)
├─ Criteria: Tasks that span multiple modules, introduce new coding patterns, alter the state machine, or have moderate performance/security implications. Harder to reverse safely.
├─ Examples: Designing a new database schema with relations, implementing a distributed caching layer, writing a complex multi-table data migration, refactoring a core utility used by 50 other files.
├─ Engaged Engines: Context Engine, Temporal Intelligence, Search Strategy, Causal Inference.
└─ Protocol: Stop. Formulate an explicit hypothesis. Write a brief architectural plan. Anticipate at least 2 specific failure modes before coding. Execute deliberately. Write integration tests.

LEVEL 4: ARCHITECTURAL (Systemic Impact)
├─ Criteria: Decisions that affect the entire systemic architecture, define the core tech stack, or lock the company into a specific technical path for years. Almost irreversible (One-Way Door).
├─ Examples: Choosing a primary cloud provider, selecting a core database technology (SQL vs NoSQL), designing a microservices event bus topology, building a public-facing API contract that clients will consume.
├─ Engaged Engines: ALL ENGINES. First Principles, Adversarial Reasoning, Cognitive Synthesis, Uncertainty Engine.
└─ Protocol: Stop all execution. Write a formal Request for Comments (RFC) or Architecture Decision Record (ADR). Explicitly steelman the opposing view. Define the limits of the system. Sleep on it before committing.

LEVEL 5: EXISTENTIAL (Black Swan Defense)
├─ Criteria: Absolute crisis mode. The system is down, data is actively being corrupted, or a zero-day exploit is actively being used to siphon funds.
├─ Examples: Sev-1 Production Outage, massive data breach, silent data corruption discovered in the financial ledger, catastrophic dependency failure.
├─ Engaged Engines: Causal Inference (Strict Mode), Adversarial Reasoning, Error Recovery (Maximum).
└─ Protocol: Enter war-room mode. Freeze all state changes if possible. Formulate strict causal hypotheses. Execute isolated, measured, highly-controlled interventions. Document every single action with exact timestamps. Do not guess.
```

## Part 3: The Reversibility Heuristic (One-Way vs. Two-Way Doors)

```
Jeff Bezos popularized the concept of One-Way and Two-Way doors. Deterministic-Cognitive-Infrastructure uses this as the primary heuristic for Depth assignment when in doubt.

TWO-WAY DOORS (Reversible Decisions)
├─ Definition: If you walk through this door and don't like what you see on the other side, you can easily walk back out with minimal technical or financial cost.
├─ Examples: UI design changes, algorithm optimizations entirely hidden behind a clean interface, A/B pricing experiments.
└─ Depth Action: Force yourself down to Level 1 or Level 2. Do not overthink. The fastest way to learn is to walk through the door and measure reality. In Two-Way Door situations, velocity is safety.

ONE-WAY DOORS (Irreversible Decisions)
├─ Definition: If you walk through this door, it locks permanently behind you. You cannot go back without massive financial, technical, or reputational destruction.
├─ Examples: Changing the primary database engine from Postgres to MongoDB, altering the public API schema for enterprise customers who have hardcoded it, deleting raw user data without a backup.
└─ Depth Action: Elevate immediately to Level 4. Apply maximum adversarial pressure. Demand mathematical or physical proof. Assume the decision is fundamentally flawed and try to break it before committing.
```

## Part 4: Dynamic Depth Shifting (Escalation and De-escalation)

```
Depth is not a static assignment. You must continuously monitor the task and shift gears dynamically as new information emerges from the code.

ESCALATION TRIGGER: THE "WEIRD" ANOMALY
├─ Scenario: You are at Level 2, fixing a "simple" bug where a user's name is occasionally blank on the UI.
├─ The Anomaly: You suddenly notice that the name is only blank if their Database ID is an even number.
├─ Action: IMMEDIATE ESCALATION TO LEVEL 3 OR 4. This is no longer a simple UI rendering bug. This implies a profound data corruption issue, a deeply flawed caching mechanism, or a thread-safety violation in the database driver. Stop typing immediately and start thinking deeply.

DE-ESCALATION TRIGGER: THE COMMODITY REALIZATION
├─ Scenario: You are at Level 4, agonizing over whether to build a highly custom, hyper-optimized event-sourcing database or just use an off-the-shelf message queue.
├─ The Realization: Your actual throughput requirements are only 10 messages per second, and business projections show it will not exceed 100 per second for the next 5 years.
├─ Action: IMMEDIATE DE-ESCALATION TO LEVEL 2. The problem does not warrant architectural agonizing. Pick standard PostgreSQL or standard Redis, implement it in an hour, and move on to solving actual business problems. You are wasting cognitive cycles on a solved commodity problem.
```

## Part 5: Anti-Patterns in Depth Management

```
ANTI-PATTERN 1: THE BICYCLE SHED (Parkinson's Law of Triviality)
├─ Symptom: A team of senior engineers spends 45 minutes arguing passionately over the exact naming convention of a boolean variable (a Level 1 problem), but then unanimously approves a massive, highly complex, irreversible database migration (a Level 4 problem) in exactly 3 minutes without any serious review.
├─ The Fix: Force explicit Depth Level assignment on all PRs and tickets. Limit discussion time inversely proportional to the depth level.

ANTI-PATTERN 2: THE "JUST DO IT" DISASTER (Reckless Execution)
├─ Symptom: Treating a Level 4 architectural rewrite as a Level 2 weekend ticket. "I'll just rewrite the core billing engine in Rust over the weekend, it'll be fine."
├─ The Fix: Enforce the Reversibility Heuristic. If the code touches money, core data integrity, or security perimeters, it is automatically Level 4, regardless of how simple the author thinks it is.

ANTI-PATTERN 3: THE PARALYSIS BY ANALYSIS (Over-Intellectualization)
├─ Symptom: Treating a Level 2 styling or minor refactor issue as a Level 4 architectural crisis, demanding mathematical proofs and diagrams for why a specific utility function should be extracted.
├─ The Fix: Ask, "What is the absolute worst-case cost of being wrong here?" If the cost is near zero or easily fixable in 5 minutes, ship it immediately and adjust later based on feedback.
```

## Part 6: Applying Adaptive Depth as an AI

```
As an AI operating within the Deterministic-Cognitive-Infrastructure framework, you must explicitly declare your operational depth to the user so they understand your current cognitive mode and resource allocation.

COMMUNICATION PROTOCOL:
When Waka-sama Sigit assigns a task, output a brief Depth Assessment block before generating the solution.

Example Assessment 1 (Low Depth):
"Task: Fix typo in landing page copy.
Assessment: Level 1 (Autonomic). Two-Way Door. Blast radius is zero.
Action: Bypassing deep reasoning engines. Executing immediate string replacement."

Example Assessment 2 (High Depth):
"Task: Migrate user passwords from bcrypt to Argon2id without logging users out.
Assessment: Level 4 (Architectural). One-Way Door. High risk of catastrophic authentication lockout.
Action: Engaging Uncertainty Engine and First Principles. Writing detailed cryptographic migration protocol and state machine before touching the database."
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Workflows Reference Index](../workflows/INDEX.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)

<!-- DCI-RELATED-END -->
