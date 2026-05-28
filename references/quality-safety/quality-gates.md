# Unified Gate System — Deterministic-Cognitive-Infrastructure

> **"A gate that passes everything protects nothing. A gate that blocks everything prevents progress. The art of cognitive architecture is the calibration of gates—knowing exactly when to pause, what to verify, and what to let flow."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Unified Gate System — Deterministic-Cognitive-Infrastructure
- **Path:** `references/quality-safety/quality-gates.md`
- **Folder:** `quality-safety`
- **Document type:** Quality and safety control
- **Primary audience:** Agents, reviewers, release owners, and human supervisors.
- **Purpose:** Define gates that prevent hallucination, unsafe actions, weak evidence, and incomplete work.
- **Standard used:** Quality management checklist plus incident-control runbook structure.

## When to Use

Use before claiming completion, publishing outputs, changing critical systems, or escalating risk.

## Inputs

Claims, evidence, test results, risk class, assumptions, and rollback conditions.

## Expected Outputs

Pass/fail decisions, required repairs, residual risks, and completion evidence.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Gate criteria are objective.
- [ ] Failure response is stated.
- [ ] Evidence requirement is clear.
- [ ] Residual risk is documented.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Part 1: Gate Architecture and Philosophy

```
THE TWO CLASSES OF GATES:

1. PHASE GATES (G1-G10): Checkpoints.
   ├─ Location: At the boundary between two pipeline phases.
   ├─ Mechanism: Blocking. You must explicitly pass the gate to proceed.
   ├─ Failure: If a gate fails, you return to the previous phase to fix the deficiency.
   └─ Purpose: Prevents cascading errors (e.g., building a perfect solution to the wrong problem).

2. CONTINUOUS GATES (G11-G20): Guardrails.
   ├─ Location: Always active, running in the background across all phases.
   ├─ Mechanism: Interruptive. A violation at any point triggers an immediate halt.
   ├─ Failure: Triggers the Self-Correction Protocol immediately.
   └─ Purpose: Catches cognitive errors, biases, and hallucinations the moment they occur.

THE "QUESTIONS, NOT CHECKBOXES" RULE:
A checklist is a mental shortcut that leads to complacency. ("Yes, yes, yes, done.")
Gates in the Deterministic-Cognitive-Infrastructure framework are formulated as specific, probing QUESTIONS that demand evidence, not binary checkmarks. If you cannot cite the specific evidence, you fail the gate.
```

---

## Part 2: The Phase Gates (G1-G10)

### G1: SENSE → THINK — "Do I actually understand the signal?"
```
PURPOSE: Prevents solving the wrong problem.

THE PROBING QUESTIONS:
├─ 1. Can I explain this problem/request to a non-expert in exactly one paragraph?
├─ 2. Have I explicitly separated the user's *stated request* from their *actual underlying need*?
├─ 3. Have I checked if this is an "XY Problem"? (User asks how to do X, because they think X is the way to achieve Y, but Z is actually the best way to achieve Y).
├─ 4. Do I know the explicit severity, urgency, and constraints of this request?
└─ 5. What exactly does "done" look like? (What is the measurable success criterion?)

EVIDENCE REQUIRED TO PASS:
A restatement of the problem that is simpler, clearer, and more constrained than the original request.

FAILURE PROTOCOL:
If you are guessing at intent, STOP. Return to SENSE. Ask the user clarifying questions. Never write code based on a guessed requirement.
```

### G2: THINK → EXPLORE — "Have I mapped the cognitive terrain?"
```
PURPOSE: Prevents blind exploration and ensures structured investigation.

THE PROBING QUESTIONS:
├─ 1. Have I restated the core problem using at least 3 different mental models or frames?
├─ 2. Have I explicitly listed my assumptions? (What do I believe is true but haven't proven?)
├─ 3. Have I mapped my knowledge state? (What do I know I know? What do I know I don't know?)
├─ 4. Have I identified the physical, temporal, and technical constraints bounding the solution?
└─ 5. Has this exact problem, or a structurally identical one, been solved before in this codebase or industry?

EVIDENCE REQUIRED TO PASS:
A categorized list of Knowns, Unknowns, and Assumptions to be verified during exploration.

FAILURE PROTOCOL:
If your understanding is still at the surface level, think deeper. Extract the core abstractions.
```

### G3: EXPLORE → HYPOTHESIZE — "Is my evidence fresh, deep, and real?"
```
PURPOSE: Prevents building theories on stale memory or shallow reading.

THE PROBING QUESTIONS:
├─ 1. Have I READ the actual code files involved, rather than relying on my memory of what they do?
├─ 2. Have I traced the execution path both backward (who calls this?) and forward (what does this call?)
├─ 3. Have I checked the recent git history for the files involved to establish temporal context?
├─ 4. Have I read the test suite for this module? (Because tests are the only documentation that executes).
└─ 5. Am I basing ANY part of my current understanding on an assumption that I could have verified with a simple search or read?

EVIDENCE REQUIRED TO PASS:
Specific citations (File paths, line numbers, command outputs) that form the baseline truth.

FAILURE PROTOCOL:
If you are operating on memory or assumptions, STOP. Go execute the `read`, `grep`, or `find` commands immediately.
```

### G4: HYPOTHESIZE → DESIGN — "Do I have genuine, falsifiable hypotheses?"
```
PURPOSE: Prevents tunnel vision and confirmation bias early in the process.

THE PROBING QUESTIONS:
├─ 1. Have I generated at least 3 genuinely different hypotheses (not just minor variations of the same idea)?
├─ 2. Is each hypothesis ranked by probability, backed by specific evidence?
├─ 3. For each hypothesis, have I defined the *falsification criteria*? (What specific evidence would prove this hypothesis WRONG?)
├─ 4. Have I explicitly considered the "Null Hypothesis"? (Maybe nothing is wrong, maybe the bug is in the environment, not the code).
└─ 5. Have I designed a quick, cheap test to eliminate the weakest hypotheses?

EVIDENCE REQUIRED TO PASS:
A list of multiple hypotheses with specific tests designed to disprove them.

FAILURE PROTOCOL:
If you only have one guess, you are not hypothesizing; you are jumping to conclusions. Generate alternatives.
```

### G5: DESIGN → PLAN — "Have I rigorously compared the alternatives?"
```
PURPOSE: Prevents adopting the first plausible design without considering trade-offs.

THE PROBING QUESTIONS:
├─ 1. Have I generated at least 3 distinct design approaches (e.g., Quick Hack, Standard Fix, Architectural Refactor)?
├─ 2. Have I evaluated each approach against the constraints established in G2?
├─ 3. Have I explicitly documented the trade-offs (Time vs. Space, Speed vs. Safety, Elegance vs. Pragmatism) for each approach?
├─ 4. Have I performed Adversarial Analysis on the chosen design? (How will this fail under load, bad input, or malicious use?)
└─ 5. Is the chosen design appropriately scaled to the problem? (Not over-engineered, not under-engineered).

EVIDENCE REQUIRED TO PASS:
A formalized comparison matrix or list of trade-offs, concluding with a justified selection.

FAILURE PROTOCOL:
If you cannot explain the drawbacks of your chosen design, you don't understand it well enough. Every design has drawbacks. Find them.
```

### G6: PLAN → BUILD — "Is the execution strategy safe, atomic, and verifiable?"
```
PURPOSE: Prevents monolithic, risky "big bang" implementations.

THE PROBING QUESTIONS:
├─ 1. Is the execution plan broken down into atomic steps?
├─ 2. Can each step be independently verified or tested before moving to the next?
├─ 3. Are the steps ordered strictly by dependency? (Building the foundation before the roof).
├─ 4. Have I identified the riskiest, most uncertain step? (Is it front-loaded to fail fast, or hidden at the end?)
└─ 5. Do I have a specific rollback plan if step N fails? (How do I undo it?)

EVIDENCE REQUIRED TO PASS:
A step-by-step checklist where every step includes a verification action.

FAILURE PROTOCOL:
If your plan is just "1. Write the code. 2. Test it," break it down into modular, testable increments.
```

### G7: BUILD → VERIFY — "Did I write testable, defensive code?"
```
PURPOSE: Prevents throwing untested, fragile code over the wall.

THE PROBING QUESTIONS:
├─ 1. Did I write the tests BEFORE or ALONGSIDE the implementation, rather than as an afterthought?
├─ 2. Did I actually watch the tests FAIL before making them pass? (Verifying the test actually tests something).
├─ 3. Is the code defensive? (Does it validate inputs, handle nulls, catch exceptions gracefully?)
├─ 4. Is the commit strictly single-concern? (Did I mix a bug fix with a whitespace refactor?)
└─ 5. Did I resist the "while I'm in here" temptation to change unrelated code?

EVIDENCE REQUIRED TO PASS:
Code that compiles/runs cleanly, accompanied by passing tests.

FAILURE PROTOCOL:
If you wrote the feature but skipped the tests "to save time," you have accrued toxic debt. Write the tests.
```

### G8: VERIFY → REFLECT — "Did I actually run the verification, or just assume it?"
```
PURPOSE: Prevents the "It works on my machine (in my head)" syndrome.

THE PROBING QUESTIONS:
├─ 1. Did I actually RUN the verification commands, or am I just assuming they will pass?
├─ 2. Did I READ the full output of the verification, or just glance at the last line?
├─ 3. Do ALL tests pass, or just the ones I touched? (Full regression check).
├─ 4. Do the linters and type-checkers pass with ZERO warnings?
└─ 5. Have I manually verified the primary user-facing flow, not just the unit tests?

EVIDENCE REQUIRED TO PASS:
Actual terminal output showing passing tests, clean builds, and successful execution.

FAILURE PROTOCOL:
Do not assume success. Execute the commands. Read the logs.
```

### G9: REFLECT → EVOLVE — "Did I extract a structural lesson from this cycle?"
```
PURPOSE: Prevents wasted experience. Converts episodic memory into structural knowledge.

THE PROBING QUESTIONS:
├─ 1. What went exactly as planned? (Identify the strengths to replicate).
├─ 2. What surprised me or went wrong? (Be brutally honest, no defensiveness).
├─ 3. Were any of my initial assumptions (from G2) proven false?
├─ 4. What would I do differently if I had to do this exact task again?
└─ 5. Did I discover a new cognitive bias, failure pattern, or anti-pattern in my own process?

EVIDENCE REQUIRED TO PASS:
A specific, articulated learning that can be generalized to future tasks.

FAILURE PROTOCOL:
If your reflection is just "It went well," you are rushing. Dig deeper. Even perfect executions have lessons in efficiency.
```

### G10: EVOLVE → DONE — "Have I fed the learning back into the system?"
```
PURPOSE: Ensures the framework itself improves over time.

THE PROBING QUESTIONS:
├─ 1. Do I need to update the `anti-patterns.md` or `failure-patterns.md` databases?
├─ 2. Do I need to update my confidence calibration? (Was I overconfident at the start?)
├─ 3. Have I documented the architectural decisions made during this task for future maintainers?
├─ 4. Have I left the codebase cleaner than I found it? (The Boy Scout Rule).
└─ 5. Could a future version of me (or another developer) look at this work 6 months from now and understand exactly what was done and WHY?

EVIDENCE REQUIRED TO PASS:
Updates to documentation, framework files, or clear, contextual commit messages.

FAILURE PROTOCOL:
Do not close the loop until the learning is fossilized into the system's memory.
```

---

## Part 3: The Continuous Gates (G11-G20)

```
These gates are background processes. If you violate one of these at ANY time, in ANY phase, you must halt and correct immediately.
```

### G11: THE HALLUCINATION GATE
├─ **The Trigger:** You are about to state a fact, an API signature, or a historical detail.
├─ **The Gate:** "Can I point to the exact file, URL, or command output that proves this, right now?"
└─ **The Correction:** If the answer is "It's from memory," you must stop and run a `read` or search command to verify it before speaking.

### G12: THE ADVERSARIAL GATE
├─ **The Trigger:** You have reached a firm conclusion or decided on a specific approach.
├─ **The Gate:** "What is the absolute strongest argument against the conclusion I just reached?"
└─ **The Correction:** If you cannot articulate a strong counter-argument, your analysis is biased. Argue against yourself until you find the flaw.

### G13: THE CAUSATION GATE
├─ **The Trigger:** You are about to claim that X caused Y (e.g., "This commit caused the memory leak").
├─ **The Gate:** "Have I ruled out coincidental correlation, reverse causation, and hidden third variables?"
└─ **The Correction:** If you only have temporal proximity (X happened before Y), you must find the actual mechanical link that proves X causes Y.

### G14: THE UNCERTAINTY GATE
├─ **The Trigger:** You are about to make a prediction, an estimate, or a confidence statement.
├─ **The Gate:** "Have I quantified my uncertainty, and what specific evidence supports that exact percentage?"
└─ **The Correction:** Replace vague statements ("I'm pretty sure") with calibrated percentages ("I am 80% confident because of [Evidence A and B]").

### G15: THE ASSUMPTION GATE
├─ **The Trigger:** You are writing a plan based on how you *think* the system behaves.
├─ **The Gate:** "Have I explicitly labeled this belief as an assumption, and what test would disprove it?"
└─ **The Correction:** Never let an assumption masquerade as a fact. Label it: `[ASSUMPTION: The DB connection pool is 10]`.

### G16: THE CONFIRMATION BIAS GATE
├─ **The Trigger:** You have been investigating a single hypothesis for more than 10 minutes.
├─ **The Gate:** "Am I actively searching for evidence that proves me wrong, or only evidence that proves me right?"
└─ **The Correction:** Stop searching for confirmation. Spend the next 3 minutes deliberately trying to destroy your own hypothesis.

### G17: THE STAKEHOLDER GATE
├─ **The Trigger:** You are making a decision that changes system behavior, UI, or architecture.
├─ **The Gate:** "Have I considered how this affects the End User, the Future Maintainer, the Ops Team, and Security?"
└─ **The Correction:** If you only optimized for yourself (e.g., "This is easiest to write"), re-evaluate from the perspective of the person who has to maintain it in 3 years.

### G18: THE REVERSIBILITY GATE (Rollback)
├─ **The Trigger:** You are about to execute a command that modifies state (write, delete, deploy, drop).
├─ **The Gate:** "If this command fails catastrophically, exactly how do I undo it, and how long will that take?"
└─ **The Correction:** Never execute a destructive or state-altering command without a verified, explicit rollback plan in place first.

### G19: THE ETHICAL GATE
├─ **The Trigger:** You are making a decision regarding user data, security, authentication, or external communication.
├─ **The Gate:** "Does this approach respect user privacy, ensure security by default, and align with the ethical framework?"
└─ **The Correction:** If the approach relies on dark patterns, weak security for convenience, or data exploitation, reject it immediately and propose a principled alternative.

### G20: THE SYNTHESIS GATE
├─ **The Trigger:** You are consolidating information from multiple searches, files, or engines into a final answer.
├─ **The Gate:** "Have I integrated all contradictory signals, or did I just average them out?"
└─ **The Correction:** Do not compromise or average contradictory data. Synthesize it. Find the higher-order truth that explains why the data *appears* contradictory.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)
- [Software Architecture Workflow — Deterministic-Cognitive-Infrastructure](../workflows/architecture.md)

<!-- DCI-RELATED-END -->
