# Code Review Workflow — Deterministic-Cognitive-Infrastructure

> **"A code review is not a formatting check; the compiler and the linter do that automatically. A code review is a mathematical proof of correctness, a rigorous architectural boundary defense, and a transfer of deep systemic knowledge between engineers. If you rubber-stamp a Pull Request, you legally and morally inherit all of its technical debt, security flaws, and performance bottlenecks."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Code Review Workflow — Deterministic-Cognitive-Infrastructure
- **Path:** `references/workflows/code-review.md`
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

## Part 1: The Epistemology of Code Review

```
Code review is the primary, indispensable defense mechanism against software entropy and architectural collapse. It is the gatekeeper of production.

THE THREE LAWS OF CODE REVIEW:
1. Automate the Trivial: Humans are biologically terrible at spotting missing semicolons, incorrect indentation, or unused variables. Machines are flawless at it. Never argue about code style in a PR. Let Prettier, ESLint, and SonarQube fight that battle in the CI pipeline. If a human is checking formatting, the pipeline is broken.
2. Review the Physics, Not the Syntax: Focus your finite cognitive energy on system physics. Look for race conditions, O(N^2) loops inside highly-trafficked API endpoints, missing database indexes, memory leaks, and IDOR (Insecure Direct Object Reference) vulnerabilities.
3. Review Speed is Team Velocity: A PR sitting unreviewed for 3 days kills team momentum, causes severe merge conflicts, and destroys the author's context. Review code immediately. Delaying reviews is a massive organizational and managerial failure.
```

## Part 2: The Reviewer's Protocol (How to Read)

```
Do not read a PR top-to-bottom sequentially. A PR is not a novel; it is a structural modification to a complex machine.

STEP 1: THE CONTEXT CHECK (The "Why")
├─ Read the PR description, the linked Jira ticket, and the actual business requirements.
├─ If the description is just "fixes bug" or "updates UI" with no context, REJECT the PR immediately. Do not read the code.
└─ You cannot mathematically verify correctness if you do not know the exact business intent of the author.

STEP 2: THE ARCHITECTURE CHECK (The "Where")
├─ Look strictly at the file list first, not the code inside them.
├─ Did they add a massive new dependency to `package.json` for a trivial function? Why?
├─ Did they put complex database transactional logic inside a React UI component?
└─ If the macroscopic architecture is wrong, do not bother reviewing the line-by-line micro-logic. The PR must be structurally rewritten. Comment on the architecture and stop the review.

STEP 3: THE TEST CHECK (The Proof)
├─ Did they write automated tests for the new logic?
├─ Do the tests actually probe the mathematical failure modes (nulls, massive strings, network timeouts), or do they just superficially test the "Happy Path"?
└─ If there are no tests for a new feature or a bug fix, REJECT the PR. "No tests, no merge" is an absolute law.

STEP 4: THE LOGIC CHECK (The "How")
├─ Now, and only now, read the execution logic.
├─ Look for off-by-one boundary errors.
├─ Look for unhandled null/undefined values passing through strict boundaries.
└─ Look for missing transaction blocks (`BEGIN/COMMIT`) around multi-table database inserts.
```

## Part 3: The Author's Protocol (How to Submit)

```
A Pull Request is an explicit demand for someone else's highly expensive, highly constrained cognitive time. Treat it with immense respect.

STEP 1: THE SELF-REVIEW (The Mirror)
├─ Never ask a colleague for a review before explicitly reviewing your own code first.
└─ Read your own diff directly in the GitHub/GitLab UI. You will catch 30% of your own mistakes, forgotten `console.log`s, and typos simply by changing the visual context from your IDE to the web browser.

STEP 2: KEEP IT SMALL (The Cognitive Limit)
├─ A 50-line PR will receive a deep, 30-minute intense review that finds 2 subtle, critical architectural bugs.
├─ A 1,000-line PR will receive a 2-minute panicked review and a "Looks Good To Me" (LGTM) rubber stamp, silently hiding 15 catastrophic bugs that will bring down production.
└─ Break massive features into multiple small, verifiable, atomic PRs. (e.g., PR 1: Database Schema. PR 2: Backend API. PR 3: Frontend UI).

STEP 3: ANNOTATE THE PR (The Guide)
├─ Leave inline comments on your own PR before assigning a reviewer to explain complex decisions.
└─ "I chose this bizarre, ugly regex specifically because the legacy Mainframe API returns a malformed string here. See Issue #402." (This saves the reviewer from asking and saves you from defending it).
```

## Part 4: Code Review Anti-Patterns

```
Code reviews can easily become toxic battlegrounds if not governed by strict professional empathy and technical focus.

ANTI-PATTERN 1: THE NITPICKER (The Pedant)
├─ Symptom: Leaving 15 distinct comments about variable naming conventions, file casing, and blank lines, while leaving 0 comments about the missing SQL index that will crash the database.
└─ Cure: Automate the pedantry using strict CI linters. Focus human cognitive energy entirely on system physics and security boundaries.

ANTI-PATTERN 2: THE RUBBER STAMP (The LGTM Illusion)
├─ Symptom: Approving a massive 500-line architectural PR in exactly 3 minutes.
└─ Cure: If you do not fully understand the code or the domain, you mathematically cannot approve it. Have the humility to say, "I don't understand this billing domain enough to approve this safely," and route it to someone who does.

ANTI-PATTERN 3: THE EGO BATTLE (The Gatekeeper)
├─ Symptom: Arguing fiercely for 3 days about a minor implementation detail or a stylistic functional programming choice.
└─ Cure: If the code is mathematically correct, secure, performant, and fully tested, but written slightly differently than *you* would write it, approve it. You do not own the code. The team owns the code. Do not block progress for subjective aesthetics.

ANTI-PATTERN 4: THE "WHILE YOU'RE AT IT" (Scope Creep)
├─ Symptom: "Hey, while you're in this file fixing the typo, can you also refactor this massive 200-line legacy function above it?"
└─ Cure: No. PRs must remain strictly atomic. If you expand the scope, you invalidate the tests and delay the immediate fix. Create a new Jira ticket for the refactor.
```

## Part 5: The Security Audit Checklist

```
Every single code review is a mini-security audit. You are the last line of defense before the exploit reaches production.

MANDATORY SECURITY CHECKS:
1. Input Validation: Are raw user inputs mathematically validated using a strict schema (e.g., Zod, Joi) before touching any business logic?
2. SQL Injection: Does the database query use strict parameterized inputs, or is it concatenating raw strings?
3. IDOR (Insecure Direct Object Reference): Does the API endpoint explicitly verify that the authenticated user *mathematically owns* the resource being requested or modified?
4. XSS (Cross-Site Scripting): Is user-generated content being directly injected into the DOM (e.g., `dangerouslySetInnerHTML`) without sanitization?
5. Secrets Leakage: Are any API keys, JWT secrets, or AWS credentials accidentally hardcoded in the diff? (If yes, revoke them immediately; do not just ask the author to remove them from the commit).
```

## Part 6: Performance Review Checklist

```
Bad performance code often looks exactly like good performance code until it hits scale.

MANDATORY PERFORMANCE CHECKS:
1. The N+1 Query: Is there a database call inside a `for` or `map` loop? (This will destroy the database under load. Force them to use a `JOIN` or `DataLoader`).
2. Unbounded Pagination: Is the API returning a `SELECT *` without a strict `LIMIT` clause? (This will cause an OOM crash as the table grows).
3. Memory Leaks: Are event listeners (in React `useEffect` or Node.js event emitters) properly cleaned up and detached when the component unmounts or the request ends?
4. Blocking the Event Loop: Is there a massive synchronous JSON parse or mathematical calculation happening on the main thread in Node.js?
```

## Part 7: The Communication Interface

```
Code review is human communication. Be kind, be clear, be explicit.

THE TONE RULES:
├─ Do not use "You". (e.g., "You forgot the index here.") It induces defensive ego responses.
├─ Use "We" or refer to the code itself. (e.g., "We need an index here to prevent a full table scan" or "This query lacks an index.")
└─ Ask questions rather than making demands. "What happens to this variable if the network drops?" instead of "Fix this network logic."

THE SEVERITY LABELS:
When leaving a comment, prefix it to indicate its severity to the author:
├─ **[BLOCKER]**: This is a security flaw, a major bug, or a fundamental architectural failure. The PR cannot be merged until this is fixed.
├─ **[SUGGESTION]**: A better way to do something. The author can choose to ignore it and merge if they prefer.
└─ **[NIT]**: A minor, trivial issue (like a typo in a comment). Do not block the PR for this.
```

## Part 8: Deterministic-Cognitive-Infrastructure AI Execution Protocol (The Architect Reviewer)

```
When an AI operating under the Deterministic-Cognitive-Infrastructure framework is asked to review a Pull Request, it must emulate an aggressive, Senior Principal Engineer, but with flawless politeness.

1. Be Brutal but Objective: The AI must aggressively and relentlessly flag architectural flaws, security risks, and O(N^2) complexity, but it must use completely neutral, objective, mathematical language. No emotion.
2. Provide the Exact Fix: Do not just point out a flaw by saying "This is an N+1 query. Fix it." The AI must provide the exact optimized DataLoader, SQL JOIN, or Map/Reduce code snippet required to fix it instantly.
3. Check for Tests: The AI must loudly flag if complex business logic or a bug fix is added without accompanying unit tests. "SECURITY RISK: Business logic mutated without regression test coverage."
4. Prioritize System Physics: The AI must strictly prioritize identifying IDOR, SQLi, XSS, and Database Locks over minor stylistic suggestions.
5. Summarize Risk: The AI must begin the review with a "Risk Assessment Score" (Low, Medium, Critical) based on the files touched (e.g., modifying `auth.ts` is automatically Critical Risk).
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Hallucination Defense System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/hallucination-defense.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)

<!-- DCI-RELATED-END -->
