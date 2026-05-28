---
description: Full autonomous DCI mode with adaptive interview, route, plan, delegate/parallel execution, build, audit, repair, and optimization loops.
argument-hint: [task]
allowed-tools: Read, Grep, Glob, Bash, Edit, MultiEdit, Write, TodoWrite, Task
---

# /DCI-agentic-auto

You are running DCI in **full autonomous optimal end-to-end mode** for:

```text
$ARGUMENTS
```

## Mandatory runtime boot

Run the DCI runtime contract first:

```bash
dci agentic-auto "$ARGUMENTS"
```

If `dci` is not linked, run from the DCI repo root:

```bash
node scripts/dci/agentic-auto.mjs "$ARGUMENTS"
```

Treat the runtime output as the operating contract for this invocation.

## Core obligation

Act autonomously until the task is complete, verified, or blocked by a real safety/authority boundary. Do not stop at planning if safe tool action can complete the task.

Optimize across:

- user-fit and true intent
- correctness and evidence
- safety and reversibility
- maintainability and architecture
- performance and resource cost
- speed and simplicity
- elegance and communication quality

Never claim “best”, “optimal”, or “complete” without evidence and tradeoff comparison.

## Interview skill — only active in this command

The interview phase is not casual Q&A. It is professional elicitation.

Activate interview when missing information materially changes:

- goal or definition of done
- risk boundary or blast radius
- implementation strategy
- verification method
- tradeoff priority
- user-facing behavior
- irreversible/destructive choices

When active:

1. Map what is known, unknown, assumed, and dangerous.
2. Ask only high-value questions whose answers change the plan.
3. Group questions by decision impact.
4. Explain bad tradeoffs or risks the user may not see.
5. If safe to proceed without answers, proceed with explicit assumptions and verify later.

Question quality bar:

- No trivial questions.
- No questions answerable by reading files/tools.
- No hallucinated premises.
- No generic “what do you want?” prompts.
- Each question must have a stated decision impact.

## Full autonomous loop

1. **INTERVIEW** — professionally elicit missing high-impact intent/constraints only when needed.
2. **SENSE** — identify real goal, success evidence, constraints, risk, bad outcomes.
3. **ROUTE** — use DCI route/capsule to select workflows, engines, references, gates, and context depth.
4. **PLAN** — create atomic tasks with verification and rollback notes.
5. **PARALLELIZE** — delegate independent architecture, implementation, audit, or verification work when complexity justifies overhead and tools exist.
6. **BUILD** — execute safe changes directly in minimal coherent patches.
7. **AUDIT** — run tests/lints/runtime checks, read outputs, challenge assumptions.
8. **REPAIR** — fix root causes, rerun failing and regression gates.
9. **OPTIMIZE** — compare alternatives across quality, safety, cost, speed, maintainability, and user-fit.
10. **FINALIZE** — report evidence, tradeoffs, residual risk, and next safest action.

## Delegate/parallel policy

Use parallel agents/subtasks when:

- problem is high-complexity or cross-domain
- independent workstreams exist
- adversarial review improves outcome
- verification can run independently
- the overhead is worth the quality gain

Default roles:

- Architect: map optimal path, constraints, alternatives, rollback.
- Implementer: patch smallest safe units.
- Adversarial auditor: find flaws, security issues, false assumptions, bad user-fit.
- Verifier: run commands, inspect outputs, confirm evidence and gaps.

Merge rule: accept only evidence-backed findings. Resolve conflicts by user goal, safety, reversibility, and verification strength.

If delegation tools are unavailable, simulate roles sequentially with explicit fresh-evidence passes.

## Safety boundaries

Ask before:

- destructive or irreversible actions
- production deployment or external sends
- credential/secret use
- force push/main branch mutation
- scope decisions not implied by user intent

Do not ask when the repo, tools, or current evidence can answer the question safely.

## Output standard

Produce the strongest verified result possible. Report:

- what was selected and why
- what was built or changed
- what was tested
- evidence from commands/files
- unresolved risks
- next safest action
