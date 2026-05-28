# Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure
- **Path:** `references/advanced/agentic-auto-runtime.md`
- **Folder:** `advanced`
- **Document type:** Advanced operating system reference
- **Primary audience:** Agents handling complex, ambiguous, multi-agent, high-context, or optimization-heavy tasks.
- **Purpose:** Provide higher-order controls for collaboration, complexity, resource use, timing, and adaptation.
- **Standard used:** Operational excellence playbook plus systems-thinking reference structure.

## When to Use

Use when ordinary task execution is insufficient due to scale, ambiguity, coordination, or risk.

## Inputs

Task complexity, context load, constraints, collaborators, failure patterns, and optimization goals.

## Expected Outputs

Operating strategy, coordination model, risk controls, and optimization priorities.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Complexity driver is identified.
- [ ] Operating strategy is explicit.
- [ ] Coordination/risk boundary is defined.
- [ ] Optimization target is measurable.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Purpose

`/DCI-agentic-auto` is the full autonomous DCI operating mode. It is not a normal prompt shortcut and not a planning-only wrapper. It is a runtime contract for selecting context, eliciting missing intent, planning, building, delegating, auditing, repairing, optimizing, and finalizing with evidence.

## Scope

The mode applies only when explicitly invoked through `/DCI-agentic-auto` or `dci agentic-auto "<task>"`.

The interview skill in this document is command-scoped. It must not become the default behavior for every DCI invocation because many tasks are already clear enough to execute directly.

## Operating Loop

1. INTERVIEW — activate only when missing information materially changes the plan, risk, verification, or output.
2. SENSE — identify true goal, constraints, success evidence, risk, and bad outcomes.
3. ROUTE — select DCI workflows, cognitive engines, knowledge bases, advanced systems, gates, and context depth.
4. PLAN — produce atomic units with verification and rollback notes.
5. PARALLELIZE — delegate independent architecture, implementation, audit, and verification work when complexity justifies overhead.
6. BUILD — execute safe changes directly in minimal coherent patches.
7. AUDIT — run tests, lint, runtime checks, and adversarial review; read the output.
8. REPAIR — fix root causes and rerun failed and regression gates.
9. OPTIMIZE — compare alternatives by user-fit, correctness, safety, evidence, maintainability, performance, cost, speed, reversibility, and elegance.
10. FINALIZE — report evidence, tradeoffs, residual risk, and next safest action.

## Interview Skill

The interview phase is professional elicitation, not casual conversation.

Activate interview when the missing answer would change one of these decisions:

- definition of done,
- blast radius,
- destructive or irreversible action,
- production or credential boundary,
- architecture path,
- verification method,
- tradeoff priority,
- user-facing behavior,
- acceptance threshold.

Do not activate interview for information that can be discovered safely through files, tests, commands, documentation, or current DCI context.

### Interview Quality Gate

Each question must pass all checks:

- It has a stated decision impact.
- It is not answerable by local inspection.
- It does not contain an unsupported premise.
- It reduces ambiguity, risk, or rework.
- It is grouped with related questions instead of scattered.

### Professional Question Types

- Outcome question: what result proves success?
- Tradeoff question: what wins when quality, speed, cost, simplicity, and maintainability conflict?
- Boundary question: what actions require explicit approval?
- Negative-space question: what must not happen?
- History question: what has failed before and why?
- Audience question: who consumes the output and how?
- Evidence question: what verification matters most?

## Delegation And Parallelism

Use delegation when it improves outcome more than it costs.

Good parallel tracks:

- Architect: constraints, alternatives, risk, rollback.
- Implementer: patch and local verification.
- Adversarial auditor: assumptions, edge cases, security, user-fit.
- Verifier: commands, outputs, evidence, residual risk.

Do not delegate when:

- the task is trivial,
- shared state would create conflict,
- the cost exceeds likely quality gain,
- user explicitly asked not to delegate,
- the next action requires user authority.

Merge rule: accept only evidence-backed findings. Resolve conflicts by user goal, safety, reversibility, and verification strength.

## Optimization Matrix

Default priority:

1. user-fit,
2. correctness,
3. safety,
4. evidence,
5. maintainability,
6. reversibility,
7. performance,
8. cost,
9. speed,
10. elegance.

The runtime may reweight priorities when the user explicitly states a preference or when risk requires it.

## Safety Boundary

The agent can proceed autonomously through read-only discovery, non-destructive edits, tests, docs, and local validation.

Ask first before destructive changes, production deploys, external sends, credential use, force pushes, or scope decisions not implied by the user.

## Verification

A completed `/DCI-agentic-auto` implementation must prove:

- CLI runtime emits full autonomous contract,
- slash command prompt contains interview, delegation, build, audit, repair, and optimization loops,
- manifest exposes command surface,
- tests cover runtime and command file,
- DCI validation and ecosystem tests pass.

<!-- DCI-RELATED-START -->

## Related DCI references

- [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](../advanced/cognitive-load.md)
- [Collaborative Intelligence System — Deterministic-Cognitive-Infrastructure](../advanced/collaborative-intelligence.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)
- [Software Architecture Workflow — Deterministic-Cognitive-Infrastructure](../workflows/architecture.md)

<!-- DCI-RELATED-END -->
