# Bug Fix Protocol — Deterministic-Cognitive-Infrastructure

> **"A bug is not an anomaly; it is a perfectly logical execution of flawed instructions. The machine is not broken. Your mental model of the machine is broken. You cannot fix the code until you first fix your mental model. Guessing is for amateurs. Isolation is for professionals. If you fix a bug without understanding exactly WHY it works, you have merely masked the symptom, and it will return with a vengeance under load."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Bug Fix Protocol — Deterministic-Cognitive-Infrastructure
- **Path:** `references/workflows/bug-fix.md`
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

## Part 1: The Epistemology of a Bug

```
When a software system fails, it does so for a precise, deterministic, physical reason. There is no magic. There are no ghosts in the machine. Computers do not get tired, they do not have moods, and they do not make random mistakes (barring cosmic ray bit-flips, which are statistically irrelevant).

THE THREE LAWS OF DEBUGGING:
1. The machine did exactly what you told it to do. If the output is wrong, your instructions were objectively wrong.
2. The bug is almost always exactly where you are absolutely certain it is not. If you "know" it's not in the database query, it is probably in the database query. Your blind spots are where the bugs hide.
3. If you fix a bug without understanding the physical mechanism of WHY the fix worked, you have not fixed the bug. You have just added complexity that pushes the failure to a different part of the system.

THE 4 RIGID PHASES OF BUG RESOLUTION:
1. Reproduction (Seeing the bug physically manifest).
2. Isolation (Finding the exact mathematical line of code).
3. Hypothesis & Fix (Understanding the physics of the failure and patching it).
4. Prevention (Writing the automated test to ensure it never, ever happens again).
```

## Part 2: Phase 1 - Reproduction (The Trigger)

```
You cannot fix what you cannot see. Attempting to fix an irreproducible bug by blindly guessing and reading code is the fastest way to accidentally break a perfectly working system.

STEP 1: GATHER THE HARSH CONTEXT
├─ Do not accept vague reports like "It doesn't work" or "The screen went white."
├─ Demand the precise input payload, the exact sequence of clicks, the expected output, and the actual output.
└─ Gather the environmental metadata: OS, Browser version, exact Time of Day (for timezone bugs), and Network conditions (was it on 3G?).

STEP 2: THE MINIMAL REPRODUCIBLE EXAMPLE (MRE)
├─ Strip away the massive UI, strip away the authentication layers, strip away everything until you have the absolute smallest possible script that reliably triggers the error.
├─ If the bug only happens deep inside a giant React application, extract the core data-processing function to a plain Node.js script. Feed it the exact JSON payload. Does it still fail?
└─ The very act of creating the MRE often reveals the bug immediately by removing the noise of the framework.

STEP 3: LOCK THE STATE
├─ Once you can reproduce the bug reliably, freeze the environment.
├─ Do not change Git branches. Do not update NPM dependencies. Do not clear the database.
└─ You now have a stable, reliable test subject. You control the variables.
```

## Part 4: Phase 2 - Isolation (The Hunt)

```
Do not sit there reading 10,000 lines of code trying to "spot" the error. Human working memory cannot hold a complex system state. Use algorithmic isolation.

TECHNIQUE 1: THE BISECTION (Binary Search Debugging)
├─ If the bug didn't exist in production yesterday, but exists today, do not guess. Use `git bisect`.
├─ Pick a known good commit (A) and a known bad commit (Z). Git will automatically checkout the middle commit (M).
├─ Test it. If it fails, the bug is in the first half. If it passes, it's in the second half.
└─ This is mathematically deterministic. You can find a single bug across 10,000 commits in exactly 14 steps.

TECHNIQUE 2: THE WOLF FENCE (Half-Split Logging)
├─ If a massive 2,000-line procedural function is failing, do not read it top-to-bottom.
├─ Put a `console.log()` or a debugger breakpoint exactly in the middle (line 1,000).
├─ Check the state of the crucial variables at line 1,000. Are they correct?
├─ If Yes, the bug is in the bottom half. If No, the bug is in the top half.
└─ Repeat this halving process until you isolate the single failing line. Do not guess. Measure.

TECHNIQUE 3: TRACING THE DATA FLOW (Reverse Engineering)
├─ Start at the absolute bottom: the error message (the Symptom) and walk backward up the stack trace.
├─ At each step, ask: "What was the exact physical value of the input payload here?"
└─ Stop immediately when you find the architectural layer where the input was demonstrably correct, but the output generated was wrong. That layer contains the bug.
```

## Part 5: Phase 3 - Hypothesis and Fix (The Cure)

```
You have found the failing line of code. Do not just change variables randomly, add `if` statements, or add `await` keywords until it magically works (Voodoo Programming).

STEP 1: FORMULATE the MECHANICAL HYPOTHESIS
├─ State out loud: "This specific line is failing with a Null Pointer Exception because variable X is undefined when the database returns an empty array instead of a user object."
└─ Prove it before fixing it: Inject a null value manually into the test harness. Does it trigger the exact same error stack trace? If yes, your hypothesis is sound.

STEP 2: THE "WHY" NOT THE "WHAT" (Root Cause Analysis)
├─ Do not just add `if (!x) return;`. That fixes the Symptom, but leaves the system in a corrupted state.
├─ Ask the 5 Whys: WHY is X null? Was the database schema supposed to guarantee a default object? Was the API payload malformed by the client? Did a race condition overwrite it?
└─ Fix the Root Cause at the highest possible architectural level, not the localized symptom deep in a utility function.

STEP 3: APPLY THE SURGICAL FIX
├─ Make the absolute smallest possible code change required to fix the logic.
├─ Run the MRE. Does it pass?
└─ Run the entire global test suite. Did your "fix" break 4 other downstream systems? (Regression).
```

## Part 6: Phase 4 - Prevention (The Inoculation)

```
A bug fixed without an accompanying automated test is not a fixed bug. It is a bug that is taking a vacation and will return next month when someone refactors the file.

THE REGRESSION TEST MANDATE:
1. BEFORE applying the actual code fix, write an automated unit or integration test that explicitly triggers the exact bug scenario.
2. Run the test. Watch it FAIL (Red state). This proves your test is actually testing the bug.
3. Apply your surgical fix to the codebase.
4. Run the test again. Watch it PASS (Green state).
5. Commit both the test and the fix together in the same PR. The system is now permanently inoculated.

THE CAUSAL ARCHITECTURAL REVIEW:
├─ Why did our existing test suite not catch this bug before it hit production?
├─ Do we need to add fuzz testing or edge-case boundary testing to our CI/CD pipeline?
└─ Is there anywhere else in the entire codebase that uses this exact same flawed logical pattern? (If yes, grep for it and fix them all right now).
```

## Part 7: Psychological Traps in Debugging

```
Debugging is as much a psychological battle against your own biases as it is a technical battle against the code.

TRAP 1: THE ASSUMPTION TRAP (Blind Faith)
├─ Symptom: "I know for a fact the API is returning the right data, so the bug must be in the UI rendering."
├─ Cure: You do not "know" anything until you see the raw JSON payload flowing over the network tab or the proxy. Trust nothing. Verify everything mathematically.

TRAP 2: THE TUNNEL VISION (The Streetlight Effect)
├─ Symptom: Staring at the exact same 10 lines of code for 4 hours, utterly convinced the bug is there because you wrote it recently.
├─ Cure: The bug is not there. You are looking under the streetlight because the light is good. Get up. Go for a walk. Explain the code out loud line-by-line to a rubber duck or a coworker. The bug is in the module you are subconsciously ignoring.

TRAP 3: THE BLAME GAME (The Ego Defense)
├─ Symptom: "The TypeScript compiler is broken." "React has a core rendering bug." "AWS is dropping packets."
├─ Cure: It is mathematically possible, but statistically, it is a 0.0001% chance. 99.999% of the time, it is your code. Start by assuming you are wrong. Only blame the compiler when you have absolute, reproducible proof.
```

## Part 8: The Physics of Concurrency Bugs

```
Bugs involving time, race conditions, and asynchronous state are the most difficult to isolate because they violate determinism.

THE HEISENBUG:
├─ Definition: A bug that disappears or alters its behavior when you attempt to study it (e.g., by adding a debugger or `console.log`).
├─ Cause: The act of observing the system slows down the execution thread, perfectly altering the timing just enough to prevent the race condition from occurring.
└─ Cure: Do not use interactive debuggers for race conditions. Use high-speed, non-blocking telemetry (e.g., in-memory ring buffers) to log the exact microsecond sequence of events without altering the execution speed.

THE DEADLOCK:
├─ Definition: Thread A locks Resource 1 and waits for Resource 2. Thread B locks Resource 2 and waits for Resource 1. Both freeze forever.
└─ Cure: Always acquire locks in a globally strictly defined, alphabetical or numerical order. If every thread must lock Resource 1 before Resource 2, deadlocks are mathematically impossible.
```

## Part 9: AI Execution Protocol for Bug Fixing (Deterministic-Cognitive-Infrastructure)

```
When an AI operating under the Deterministic-Cognitive-Infrastructure framework is asked to fix a bug, it must strictly follow this sequence to avoid hallucinating false fixes.

1. Demand Context: If the user says "The login is broken," reply: "Provide the exact error message, the stack trace, and the input payload that caused it. I cannot debug without physical evidence."
2. Analyze the Trace: Locate the exact file, line number, and function in the provided stack trace.
3. State the Hypothesis: "Based on the stack trace, the error `Cannot read property 'id' of undefined` physically implies that the `user` object is null at line 45 of `auth.ts`."
4. Provide the Surgical Fix: Give the exact code change required, no more, no less.
5. Explain the Mechanism: Explain WHY the fix works in terms of system physics. "I added an explicit null check and an early return because the database driver returns `undefined` if the user is not found, rather than an empty object. Proceeding without this check causes the V8 engine to throw a TypeError."
```

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
