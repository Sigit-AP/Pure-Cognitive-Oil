# Context Awareness Engine — Deterministic-Cognitive-Infrastructure

> **"Without context, every decision is a gamble. With deep context, even difficult decisions become clear. The quality of your context determines the quality of your work."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Context Awareness Engine — Deterministic-Cognitive-Infrastructure
- **Path:** `references/cognitive-engines/context-engine.md`
- **Folder:** `cognitive-engines`
- **Document type:** Reasoning engine reference
- **Primary audience:** Agents performing analysis, debugging, design, review, research, or synthesis.
- **Purpose:** Provide a reusable reasoning method with triggers, procedure, safeguards, and outputs.
- **Standard used:** Diataxis-inspired reference/how-to structure with decision-record rigor.

## When to Use

Use when the task requires disciplined inference, uncertainty handling, or specialized cognition.

## Inputs

Question, context, evidence, assumptions, candidate explanations, and validation signals.

## Expected Outputs

Reasoned conclusions, ranked hypotheses, decision criteria, and verification steps.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Trigger condition is present.
- [ ] Inputs and assumptions are explicit.
- [ ] Reasoning path is inspectable.
- [ ] Validation or falsification step is defined.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Runnable Tooling

Use the folder-local toolkit for fast operational extraction:

```bash
node references/cognitive-engines/tools/cognitive-engines-toolkit.mjs list
node references/cognitive-engines/tools/cognitive-engines-toolkit.mjs brief "<task>"
node references/cognitive-engines/tools/cognitive-engines-toolkit.mjs gate "<task>"
```

Keep executable logic in `tools/`; keep this markdown as the operational reference and command map. Long scripts belong in versioned files, not embedded inside reference prose.


## Part 1: The 6 Context Layers (Detailed)

### Layer 1: Project Context — The World You're Operating In

```
IDENTITY:
├─ Project name and purpose (what problem does this solve?)
├─ Domain (fintech, healthcare, gaming, SaaS, etc.)
├─ Maturity (greenfield / MVP / growth / mature / legacy)
├─ Team size and structure (solo / small team / large org)
├─ Business model (how does this make money?)
└─ Competitive context (who else solves this problem?)

TECHNOLOGY STACK:
├─ Languages: Primary and secondary (e.g., TypeScript + Python)
├─ Frameworks: Web, API, testing, build (e.g., Next.js, Express, Jest, Webpack)
├─ Database: Type, provider, ORM (e.g., PostgreSQL, Prisma)
├─ Infrastructure: Cloud, containers, CI/CD (e.g., AWS, Docker, GitHub Actions)
├─ Key dependencies: Critical third-party libraries and their versions
├─ Build/test/lint/deploy commands (EXACT commands, not guesses)
└─ Runtime: Node version, OS target, deployment environment

ARCHITECTURE:
├─ Pattern: Monolith / microservices / serverless / hybrid
├─ Directory structure: How code is organized (by feature / by layer / hybrid)
├─ Entry points: Where requests enter the system
├─ Module boundaries: What can depend on what
├─ Data flow: How data moves through the system
├─ External integrations: APIs, databases, queues, third-party services
└─ Infrastructure diagram: How services communicate

CONVENTIONS:
├─ Naming: camelCase/snake_case/PascalCase for files, functions, classes
├─ Imports: Absolute vs relative, order conventions
├─ Error handling: Exceptions vs result types vs error codes
├─ Testing: Unit vs integration vs e2e, file naming, test structure
├─ Git: Branch naming, commit messages, PR process, review requirements
├─ Documentation: Where docs live, what must be documented
├─ Code style: Tabs/spaces, line length, formatting tool
└─ Patterns: Established patterns for common operations (auth, logging, etc.)

CONSTRAINTS:
├─ Performance: Latency SLOs, throughput requirements, resource limits
├─ Security: Compliance requirements, data handling rules, auth requirements
├─ Compatibility: Browser support, OS support, API backward compatibility
├─ Accessibility: WCAG level, screen reader support
├─ Internationalization: Languages, RTL support, locale handling
├─ Legal: Licensing, GDPR, data residency
└─ Budget: Infrastructure cost limits, third-party service budgets

DISCOVERY PROTOCOL (when entering a new project):
1. Read README.md (project purpose, setup, conventions)
2. Read package.json / Cargo.toml / pyproject.toml (dependencies, scripts)
3. Read .eslintrc / tsconfig / prettier config (coding standards)
4. Explore directory structure (architecture pattern)
5. Read .env.example or config files (environment setup)
6. Read recent git log -20 (what's been happening recently?)
7. Read CI/CD config (build/test/deploy pipeline)
8. Run the test suite (get baseline state)
9. Read CONTRIBUTING.md if it exists (team conventions)
10. Read architecture docs if they exist (design decisions)

CAPTURE TEMPLATE:
├─ Build:    _______________
├─ Test:     _______________
├─ Lint:     _______________
├─ Deploy:   _______________
├─ Entry:    _______________
├─ Arch:     _______________
├─ Key deps: _______________
├─ Known issues: ___________
└─ Last verified: __________
```

### Layer 2: Task Context — What You're Trying to Do Right Now

```
TASK IDENTITY:
├─ Original request (exact user words, not paraphrased)
├─ My understanding (restated in my own words — verify with user)
├─ Task type: Bug fix / Feature / Refactor / Investigation / Architecture / Review
├─ Complexity score: Trivial (1) → Simple (2) → Moderate (3) → Complex (4) → Critical (5)
├─ Estimated effort: Quick (<30min) / Medium (30min-2h) / Large (2h-8h) / Epic (>8h)
└─ Success criteria: How do we know we're done? (explicit, measurable)

PIPELINE STATE:
├─ Current phase: _____ of 10
├─ Gates passed: G1 □  G2 □  G3 □  G4 □  G5 □  G6 □  G7 □  G8 □  G9 □  G10 □
├─ Next gate: G___
├─ Pipeline mode: Linear / Loop-back to _____ / Parallel (phases ___ and ___)
└─ Phase transitions logged with reasons

HYPOTHESIS TRACKER:
├─ H1: [hypothesis] — Status: Active/Eliminated — Confidence: ___% — Evidence: [list]
├─ H2: [hypothesis] — Status: Active/Eliminated — Confidence: ___% — Evidence: [list]
├─ H3: [hypothesis] — Status: Active/Eliminated — Confidence: ___% — Evidence: [list]
├─ Currently favored: H___ because [reason]
├─ Key test: What evidence would distinguish between active hypotheses?
└─ History: [H___ eliminated at [time] because [evidence]]

ASSUMPTION REGISTER:
├─ A1: [assumption] — Verified? Yes/No — Risk if wrong: High/Medium/Low
├─ A2: [assumption] — Verified? Yes/No — Risk if wrong: High/Medium/Low
├─ Unverified high-risk assumptions need immediate attention
└─ Rule: NEVER build on unverified high-risk assumptions

EVIDENCE LOG:
├─ E1: [evidence] — Source: [file/output/doc] — Tier: [1-5] — Supports: H___
├─ E2: [evidence] — Source: [file/output/doc] — Tier: [1-5] — Supports: H___
├─ Evidence that contradicts current hypothesis → FLAGGED for immediate review
└─ Rule: New evidence MUST be evaluated against ALL active hypotheses
```

### Layer 3: Reasoning Context — The State of Your Thinking

```
CONFIDENCE DASHBOARD:
├─ Overall confidence: ___% (↑/↓/→ from last check)
├─ Highest confidence area: [topic] at ___%
├─ Lowest confidence area: [topic] at ___%
├─ Biggest uncertainty: [specific gap]
├─ Biggest assumption: [specific assumption]
└─ Last calibration check: [timestamp]

EVIDENCE CHAIN:
├─ Current conclusion: [what I believe]
├─ Evidence for:
│   ├─ E1: [evidence] (Tier __, freshness __)
│   ├─ E2: [evidence] (Tier __, freshness __)
│   └─ E3: [evidence] (Tier __, freshness __)
├─ Evidence against:
│   ├─ E4: [counter-evidence] (Tier __, freshness __)
│   └─ If empty → RED FLAG: You haven't looked for disconfirming evidence
├─ Falsification criteria: "I would change my mind if [specific event]"
└─ Alternative explanations: [other hypotheses that explain the same evidence]

BIAS MONITORING:
├─ Confirmation bias risk: [current level: low/medium/high]
├─ Last disconfirmation search: [when]
├─ Anchoring risk: [what was my first impression? am I still anchored?]
├─ Sunk cost risk: [how much time invested? would I start fresh?]
├─ Availability risk: [am I working from memory or fresh evidence?]
└─ Overall bias threat level: [GREEN/YELLOW/RED]

HALLUCINATION RISK:
├─ Current domain familiarity: [expert/competent/novice]
├─ Working from memory? [yes/no] — if yes → VERIFY before stating
├─ Last file read: [file] at [when]
├─ Claims made without direct evidence: [list] → need verification
└─ Risk level: [LOW/MEDIUM/HIGH/CRITICAL]
```

### Layer 4: Change Context — What You've Done So Far

```
FILE MODIFICATION LOG:
├─ For EACH file modified:
│   ├─ File: [path]
│   ├─ What changed: [description]
│   ├─ Why: [rationale linked to requirement]
│   ├─ Tests: [which tests verify this change]
│   ├─ Blast radius: [what else could be affected by this change]
│   ├─ Rollback: [how to undo this specific change]
│   ├─ Verified: [YES/NO — has the change been tested?]
│   └─ Committed: [YES/NO — is it in version control?]

FILE CREATION LOG:
├─ For EACH file created:
│   ├─ File: [path]
│   ├─ Purpose: [why does this file exist?]
│   ├─ Depends on: [what files/modules does it depend on?]
│   ├─ Depended on by: [what files/modules will use it?]
│   └─ Tests: [which tests cover this file?]

CURRENT DIFF SUMMARY:
├─ Total files changed: ___
├─ Total lines added: ___
├─ Total lines removed: ___
├─ Uncommitted changes: [list]
├─ Risk assessment: [low/medium/high — based on blast radius]
└─ Rollback complexity: [simple revert / needs manual intervention]

COMMIT HISTORY (this session):
├─ C1: [hash] — [message] — [files affected]
├─ C2: [hash] — [message] — [files affected]
└─ Can all commits be safely reverted? [YES / NO — because ___]
```

### Layer 5: Temporal Context — When and How Long

```
SESSION TIMELINE:
├─ Session start: [timestamp]
├─ Time elapsed: [duration]
├─ Time on current sub-task: [duration]
├─ Estimated time remaining: [duration]
├─ Deadline (if any): [deadline]
├─ On track? [YES / NO — because ___]
└─ Progress rate: [accelerating / steady / decelerating / stuck]

INFORMATION FRESHNESS:
├─ Project context: Last verified [when] — Stale? [yes/no]
├─ File states: Last read [when] — Stale? [yes/no]
├─ Dependencies: Last checked [when] — Stale? [yes/no]
├─ Test results: Last run [when] — Stale? [yes/no]
└─ Rule: Re-read any context older than 30 minutes before using it

DIMINISHING RETURNS CHECK:
├─ Am I still making progress? [YES/NO]
├─ Is progress rate decreasing? [YES/NO]
├─ Have I been stuck > 15 minutes? [YES/NO → change approach]
├─ Would a break help? (cognitive fatigue check)
├─ Is perfectionism slowing me down? (good enough vs perfect)
└─ Should I ask for help? (after 30 minutes of no progress → yes)
```

### Layer 6: Stakeholder Context — Who Cares

```
STAKEHOLDER MAP:
├─ Primary user: [Who will USE this directly?]
│   ├─ Needs: [what do they need from this work?]
│   ├─ Constraints: [what limitations do they impose?]
│   └─ Communication: [how should I report to them?]
├─ Code reviewer: [Who will REVIEW this?]
│   ├─ Standards: [what do they look for?]
│   └─ Preferences: [known patterns they prefer?]
├─ Maintainer: [Who will MAINTAIN this long-term?]
│   ├─ Needs: [readability, documentation, tests]
│   └─ Skill level: [can they understand my code?]
├─ End user: [Who will be AFFECTED by this?]
│   ├─ Impact: [how does this change their experience?]
│   └─ Risk: [could this break their workflow?]
└─ Decision maker: [Who APPROVES the approach?]
    ├─ Criteria: [what do they care about most?]
    └─ Blockers: [what would cause them to reject?]

STAKEHOLDER CONFLICT RESOLUTION:
├─ When stakeholders have conflicting needs:
│   1. Identify the specific conflict
│   2. Prioritize by: Safety > Correctness > Maintainability > Performance > Features
│   3. If still ambiguous → Ask the decision maker
│   4. Document the trade-off and rationale
└─ Never resolve conflicts silently — make them visible
```

## Part 2: Context Update Protocol

### 2.1 Update Triggers (When to Refresh Context)

```
AUTOMATIC TRIGGERS (always update):
├─ After every file read → Update Layer 1 (Project) if new info discovered
├─ After every phase transition → Update Layer 2 (Task) pipeline state
├─ After every evidence discovery → Update Layer 3 (Reasoning) evidence chain
├─ After every file write → Update Layer 4 (Change) modification log
├─ Every 15 minutes → Update Layer 5 (Temporal) timeline
├─ Before every gate check → Update ALL 6 layers
└─ Before every major decision → Update ALL 6 layers

CONDITIONAL TRIGGERS (update when applicable):
├─ New hypothesis formed → Update Layer 2 hypothesis tracker
├─ Assumption verified or invalidated → Update Layer 2 assumption register
├─ Confidence changed significantly → Update Layer 3 confidence dashboard
├─ Bias risk detected → Update Layer 3 bias monitoring
├─ External change detected → Update Layer 1 project context
├─ Stakeholder feedback received → Update Layer 6 stakeholder map
└─ Error detected → Update ALL layers (error may have contaminated context)
```

### 2.2 Staleness Detection

```
STALENESS THRESHOLDS:
├─ File contents: > 30 minutes since last read → potentially stale
├─ Git state: > 5 commits since last check → definitely stale
├─ Test results: > 15 minutes or any code change → stale
├─ Dependencies: > 24 hours → check for updates
├─ External services: > 1 hour → check for status changes
└─ Human requirements: > conversation boundary → re-verify understanding

STALENESS RESPONSE:
├─ SUSPECTED stale: Note the suspicion, re-read if about to use
├─ CONFIRMED stale: Re-read immediately, update context, trace impact
├─ CRITICAL stale: Context used for decisions is stale → re-evaluate decisions
└─ Rule: NEVER use stale context for important decisions. Always re-verify
```

## Part 3: Context Compression for Long Sessions

```
WHEN CONTEXT GROWS TOO LARGE:
├─ Prioritize by recency and relevance
├─ COMPRESS (keep conclusions, drop intermediate reasoning):
│   ├─ Completed phases → Summary only (findings + decisions)
│   ├─ Eliminated hypotheses → "H3 eliminated because [one-line reason]"
│   ├─ Evidence chains → Keep final evidence, drop search steps
│   └─ File exploration → Keep findings, drop exploration path
│
├─ NEVER COMPRESS:
│   ├─ Active hypotheses and their evidence
│   ├─ All unverified assumptions
│   ├─ Current file modification log
│   ├─ Error traces and test results
│   ├─ User requirements (original words)
│   ├─ Decisions and their rationale
│   └─ Rollback plans
│
├─ COMPRESSION LEVELS:
│   Level 1: Drop intermediate search steps (keep findings)
│   Level 2: Summarize completed phases (keep conclusions + decisions)
│   Level 3: Compact evidence to "conclusion supported by N sources"
│   Level 4: Drop all context except: requirements, current state, next steps
│   Level 5: Emergency — ask human to re-state requirements, start fresh
│
└─ DECOMPRESSION: If compressed context becomes needed again,
    re-read the original sources rather than trying to reconstruct from summary
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Advanced Reference Index](../advanced/INDEX.md)
- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)

<!-- DCI-RELATED-END -->
