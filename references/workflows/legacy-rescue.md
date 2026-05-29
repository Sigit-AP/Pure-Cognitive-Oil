# Legacy System Rescue Workflow — Pure Cognitive Oil

> **"A legacy system is not 'bad code.' A legacy system is simply code that generates revenue but lacks automated tests. Rewriting it from scratch is the fastest way to bankrupt a company. You do not rewrite a legacy system; you strangulate it, refactor it safely, and meticulously map its alien physics."**


<!-- PCO-DOC-STANDARD-START -->

## Overview

This document is part of the Pure Cognitive Oil reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Legacy System Rescue Workflow — Pure Cognitive Oil
- **Path:** `references/workflows/legacy-rescue.md`
- **Folder:** `workflows`
- **Document type:** Workflow runbook
- **Primary audience:** Agents executing software engineering tasks and reviewers auditing their work.
- **Purpose:** Translate PCO principles into step-by-step execution for a specific task class.
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
4. Cross-check related PCO references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Entry condition is clear.
- [ ] Procedure is ordered.
- [ ] Verification command or evidence is defined.
- [ ] Final handoff/reporting criteria are explicit.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve PCO-specific terminology while keeping examples readable for non-PCO maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- PCO-DOC-STANDARD-END -->

## Part 1: The Epistemology of Legacy Code (Chesterton's Fence)

```
Do not insult the legacy codebase. It survived. It makes the company money. Your new, perfectly clean, unproven microservice architecture has done neither.

CHESTERTON'S FENCE PRINCIPLE:
Do not remove a fence until you know exactly why it was put up in the first place. That bizarre, 400-line `if/else` block that looks like garbage was likely written at 3 AM to handle a critical edge case for your biggest enterprise customer. If you delete it for "cleanliness" without understanding it, you will destroy the business.

THE THREE LAWS OF LEGACY RESCUE:
1. Tests First, Changes Second: You cannot mathematically refactor without a test suite. If you change legacy code without characterization tests, you are just guessing and praying.
2. The Big Rewrite is a Fatal Trap: Attempting to pause all new feature development for a year to rewrite the system from scratch in Go or Rust will take 3 times longer than estimated, the business will lose market share, and the new system will inevitably fail to capture undocumented legacy business rules.
3. Behavior Preservation: The goal of Phase 1 is NOT to make the code beautiful. The singular goal is to make the code testable while perfectly preserving its exact current (even buggy) behavior.
```

## Part 2: Phase 1 - Containment (Stopping the Bleeding)

```
Before you can improve the system, you must stop it from actively getting worse. You must establish a perimeter.

STEP 1: THE CI/CD BASELINE
├─ Ensure the legacy code can be built, tested, and deployed entirely automatically via a single pipeline execution.
└─ If deployment currently requires a human SSHing into a production server and running a bash script from memory, automate that script into a CI pipeline immediately. Human deployments are the enemy of stability.

STEP 2: ENFORCE THE BOY SCOUT RULE
├─ Implement strict linting and automated formatting (Prettier, ESLint, Black). Do not format the entire legacy codebase at once (it ruins `git blame`). Format files only as you touch them.
├─ Require that all NEW code added to the system MUST have 100% test coverage, even if the surrounding legacy code has 0%.
└─ Leave the campground (the specific file you are editing) slightly cleaner than you found it.

STEP 3: TRUNCATE THE TAIL (Dead Code Assassination)
├─ Identify dead code aggressively. Run a code coverage tool in production (if safe) or use deep static analysis to find unused files, orphaned endpoints, and dead functions.
└─ Delete dead code mercilessly. Less code means less cognitive load, smaller search surfaces during debugging, and fewer security vulnerabilities.
```

## Part 4: Phase 2 - Characterization (Mapping the Physics)

```
You cannot fix what you do not mathematically understand. You must map the territory before altering it.

THE CHARACTERIZATION TEST (Golden Master Testing):
├─ Definition: A test designed not to check what the code *should* do, but to lock in exactly what the code *currently* does.
├─ Goal: To establish a highly brittle, rigid safety net around the legacy monolith.
├─ How: Feed the legacy function 10,000 random or historical inputs from production logs. Save the 10,000 outputs to a giant JSON file (The Golden Master).
└─ Write a test that asserts the function still produces those exact 10,000 outputs. If a bug currently exists in the logic, you have now explicitly locked the bug in place. If your refactor changes the output (even fixing the bug), the test fails, warning you that behavior shifted.

THE SEAM IDENTIFICATION:
├─ A "seam" is a place where you can alter behavior in the program without editing the code in that specific place (e.g., using Dependency Injection or monkey-patching).
└─ Find the seams to isolate the database and the network so you can run the characterization tests in milliseconds, not minutes. If a legacy class has `db = new Database()` hardcoded inside it, extract it to the constructor `constructor(db)`.
```

## Part 5: Phase 3 - The Strangler Fig Architecture

```
Do not attempt to rewrite the monolith from the inside out. Rewrite it from the outside in, slowly starving it of traffic.

STEP 1: THE PROXY LAYER
├─ Place a highly resilient API Gateway, Nginx proxy, or Envoy sidecar directly in front of the legacy monolith.
└─ Initially, configure the proxy to pass 100% of all traffic directly to the monolith.

STEP 2: ISOLATE A DOMAIN
├─ Pick ONE small, isolated, low-risk domain (e.g., "User Avatars" or "Email Notification Preferences").
└─ Do NOT pick the core "Payment Processing" or "Authentication" domains first. Start small to prove the pipeline.

STEP 3: BUILD THE MICROSERVICE
├─ Build the new service for that specific domain using modern architecture, strict TDD, and CI/CD.
└─ Ensure it connects to the same database (or uses a strictly synchronized read-replica via Debezium CDC).

STEP 4: ROUTE AND STRANGLE
├─ Configure the proxy to intercept traffic for `/api/avatars` and route it to the NEW service.
├─ Leave all other traffic routing to the legacy monolith.
└─ If the new service fails or exhibits bugs, you can flip the proxy routing rule back to the monolith instantly, resulting in zero downtime.

STEP 5: REPEAT UNTIL DEATH
├─ Repeat this process, domain by domain, month by month.
└─ Eventually, the monolith handles 0% of the traffic. At that point, you power it down and delete the repository.
```

## Part 6: Breaking Dependencies (The Sprout & Wrap Techniques)

```
When a legacy class is 5,000 lines long and the business demands a new feature today, do not inject the new feature directly into the middle of the spaghetti code.

TECHNIQUE 1: THE SPROUT METHOD
├─ Problem: You need to add complex EU tax calculation to a massive, untested `OrderProcessor` class.
├─ Bad Action: Injecting 150 lines of tax logic directly into the 2000-line `process()` method.
├─ Good Action (Sprout): Create a brand new, pristine, fully-tested class called `EUTaxCalculator`.
└─ Then, in the legacy `OrderProcessor`, add a single line that calls `new EUTaxCalculator().calculate(order)`. You are keeping the new logic isolated, testable, and clean.

TECHNIQUE 2: THE WRAP METHOD
├─ Problem: You need to log every time a specific legacy function is called, but the function is called in 50 different places.
├─ Action: Do not edit all 50 places. Rename the legacy function from `saveUser` to `old_saveUser`.
└─ Create a new function called `saveUser` that logs the action, and then immediately calls `old_saveUser`. You have wrapped the legacy code without touching its internal logic.
```

## Part 7: Managing the Human Element and Cognitive Load

```
Legacy rescue is grueling, unglamorous work. It burns engineers out faster than any other type of project. It must be managed with psychological precision.

1. Celebrate the Deletions: Make a massive deal out of deleting legacy code. Track "Lines Deleted" as a primary metric of success. Ring a bell when a legacy module is fully strangled and retired.
2. Avoid the "Legacy Team" Trap: Do not create a team dedicated solely to maintaining the legacy code while another team builds the "cool new microservices." The legacy team will quit within 6 months. Rotate all engineers through both the rescue effort and the greenfield work.
3. Establish the Architectural Vision: Ensure the entire team understands that strangling the monolith IS the absolute critical path to the company's future survival. It is not "maintenance work"; it is systemic architectural surgery.
4. Stop the Bleeding (Feature Freeze): If the legacy system is truly unstable, management must agree to a strict feature freeze on the legacy code. New features can ONLY be built in the new architectural paradigm.
```

## Part 8: Database Resuscitation (The Data Legacy)

```
The code is often just the surface; the real legacy nightmare lives in the database.

1. The Untouchable Table: You will find tables with 50 columns, no foreign keys, and JSON blobs shoved into VARCHAR fields.
2. The View Abstraction: Do not attempt to refactor the legacy table immediately. Create a SQL `VIEW` that presents the data in a clean, modern format. Have the new microservice read from the `VIEW`.
3. The Trigger Sync: If you must split a legacy table into two modern tables, use database triggers during the transition phase to automatically keep the old table and the new tables in sync, ensuring the legacy code continues to function while the new code operates on the clean schema.
4. The Zombie Data: Run queries to find records that have not been accessed in 5 years. Archive them to cold storage (S3) to reduce the active table size and speed up queries.
```

## Part 9: Pure Cognitive Oil AI Execution Protocol

```
When an AI operating under the Pure Cognitive Oil framework is asked to modify a legacy file, it must strictly adhere to preservation protocols.

1. Refuse the Rewrite: If the user pastes a 2000-line file and asks "make this clean," the AI MUST warn against massive rewrites, explain the risk of losing undocumented business rules, and suggest extracting one specific method instead using the Sprout technique.
2. Generate Characterization Tests: The AI should proactively offer to generate a test suite that mathematically locks down the current input/output pairs before attempting any refactoring.
3. Identify Seams: Point out hardcoded dependencies (`new Database()`) and suggest injecting them via constructor parameters to enable mock testing.
4. Highlight Chesterton's Fence: If the AI sees a confusing, massive block of code, it should warn the user: "This block appears illogical, but it likely handles an edge case. Do not remove it without verifying its exact purpose in production logs."
```

<!-- PCO-RELATED-START -->

## Related PCO references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Pure Cognitive Oil](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Pure Cognitive Oil](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [150+ Anti-Patterns — Pure Cognitive Oil Framework](../knowledge-bases/anti-patterns.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Pure Cognitive Oil](../quality-safety/error-recovery.md)

<!-- PCO-RELATED-END -->

<!-- PCO-RELATED-START -->

## Related PCO references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Pure Cognitive Oil](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Pure Cognitive Oil](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [150+ Anti-Patterns — Pure Cognitive Oil Framework](../knowledge-bases/anti-patterns.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Pure Cognitive Oil](../quality-safety/error-recovery.md)

<!-- PCO-RELATED-END -->
