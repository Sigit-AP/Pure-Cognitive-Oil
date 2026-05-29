# Failure Pattern Database — Deterministic-Cognitive-Infrastructure

> **"Those who do not study the specific failure modes of their discipline are doomed to repeat them. A professional does not just learn from their own mistakes; they study the graveyard of previous projects to learn the contours of systemic failure."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Failure Pattern Database — Deterministic-Cognitive-Infrastructure
- **Path:** `references/advanced/failure-patterns.md`
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

## Part 1: Cognitive Failure Patterns

```
PATTERN C1: THE "SHOTGUN DEBUGGING" SPREAD
├─ Symptoms:
│  ├─ Making 5+ small code changes simultaneously without testing in between.
│  ├─ Adding `console.log()` to 20 different files.
│  ├─ Restarting the server/rebuilding the app repeatedly hoping the error goes away.
│  └─ "I don't know why it works now, but it works."
├─ Root Cause: Total loss of mental model. Panic response to an incomprehensible error state.
├─ Why it fails: You cannot isolate the variable that actually fixed the problem, meaning you likely introduced 4 new bugs with the other changes.
└─ Prevention: The One-Variable Rule. Revert to baseline. Formulate a hypothesis. Change exactly one line. Test.

PATTERN C2: PREMATURE ABSTRACTION (The Astronaut Architecture)
├─ Symptoms:
│  ├─ Creating an `AbstractBaseFactoryManager` for a feature that only has one implementation.
│  ├─ Anticipating requirements ("We might need to support Oracle DB in the future" — you won't).
│  └─ Code is extremely DRY (Don't Repeat Yourself) but completely unreadable because logic is fragmented across 15 files.
├─ Root Cause: Over-application of DRY principles. Optimizing for "elegance" over readability.
├─ Why it fails: The wrong abstraction is higher-scale more expensive to maintain and dismantle than duplicated code.
└─ Prevention: The Rule of Three (WET - Write Everything Twice). Wait until a pattern appears exactly three times before extracting it into a shared abstraction.

PATTERN C3: CHESTERTON'S FENCE VIOLATION
├─ Symptoms:
│  ├─ Finding a weird, seemingly useless block of code.
│  ├─ "This looks stupid, let me delete it."
│  └─ System crashes in production 3 days later under a specific edge case.
├─ Root Cause: Assuming previous developers were idiots rather than assuming they were solving a problem you don't understand yet.
├─ Why it fails: Code is rarely added for no reason. Usually, it's a workaround for a horrific edge case.
└─ Prevention: You are not allowed to remove a fence until you can explicitly explain why it was put there in the first place (use `git blame`).

PATTERN C4: SUNK COST FIXATION
├─ Symptoms:
│  ├─ "I've spent 3 days fighting this library, I just need to get it to work."
│  ├─ Writing layers of adapters to force a tool to do something it wasn't designed for.
│  └─ Ignoring alternative, simpler approaches because "we're already so close."
├─ Root Cause: Emotional attachment to time invested. Refusal to admit defeat.
├─ Why it fails: Patches over bad architecture compound technical debt exponentially.
└─ Prevention: Time-box exploration. If it takes >4 hours to bend a tool to your will, stop. Step back. Re-evaluate the entire approach. The 3 days are gone; don't waste 3 more weeks.
```

## Part 2: Process & Communication Failure Patterns

```
PATTERN P1: THE "XY PROBLEM" TRAP
├─ Symptoms:
│  ├─ User: "How do I extract the last 3 characters of a string in Bash?"
│  ├─ Dev: Provides complex `sed`/`awk` command.
│  └─ Reality: The user actually just wanted to get the file extension, which has a dedicated, safer command.
├─ Root Cause: Answering the literal question (the method) instead of interrogating the goal (the outcome).
├─ Why it fails: You provide a perfect solution to the wrong problem.
└─ Prevention: Always ask "What is the ultimate goal you are trying to achieve with this?" before providing the technical solution.

PATTERN P2: SUCCESS THEATER (Watermelon Status)
├─ Symptoms:
│  ├─ Project status is reported as "Green" for 5 months.
│  ├─ One week before launch, the status turns "Red".
│  └─ "The code is done, we just need to integrate it" (Integration takes 3 months).
├─ Root Cause: Fear of delivering bad news. Equating "lines of code written" with "value delivered."
├─ Why it fails: Delays are hidden until it's too late to mitigate them or pivot the strategy.
└─ Prevention: Code is not done until it is deployed and integrated. Demo working software, not slide decks.

PATTERN P3: SILENT DEGRADATION (The Boiling Frog)
├─ Symptoms:
│  ├─ The test suite takes 10 seconds, then 1 minute, then 15 minutes.
│  ├─ CI/CD pipeline fails 10% of the time, so developers just hit "Retry" until it passes.
│  └─ The UI stutters slightly, but developers get used to it.
├─ Root Cause: Slow, incremental accrual of technical debt that never triggers an acute crisis.
├─ Why it fails: By the time the pain is unbearable, the cost to fix it is astronomical.
└─ Prevention: Hard thresholds. "If the test suite exceeds 3 minutes, the build fails." Fix the broken window immediately.

PATTERN P4: THE HERO DEVELOPER
├─ Symptoms:
│  ├─ One developer works 80-hour weeks.
│  ├─ They fix all the critical prod bugs at 2 AM.
│  └─ Nobody else understands how the core system works.
├─ Root Cause: Misaligned incentives. Rewarding firefighting instead of fire prevention.
├─ Why it fails: The hero eventually burns out and quits, leaving the team with an unmaintainable black box. The bus factor is 1.
└─ Prevention: Reward developers who build boring, stable systems. Enforce mandatory PTO. Require comprehensive documentation and cross-training.
```

## Part 3: Architectural Failure Patterns

```
PATTERN A1: THE DISTRIBUTED MONOLITH
├─ Symptoms:
│  ├─ Breaking a monolith into 20 microservices.
│  ├─ To render the homepage, Service A calls Service B, which calls C, which calls D.
│  └─ Deploying a single feature requires coordinating deployments across 5 different services simultaneously.
├─ Root Cause: Decomposing by technical layers (e.g., "The User Service") rather than bounded business contexts.
├─ Why it fails: You get all the latency, network unreliability, and debugging nightmare of microservices, with none of the independent deployment benefits.
└─ Prevention: Domain-Driven Design (DDD). A service should own its data completely. Avoid synchronous HTTP calls between services in the hot path.

PATTERN A2: THE GOD OBJECT
├─ Symptoms:
│  ├─ A `Utils.js` or `Helper.ts` file that is 10,000 lines long.
│  ├─ A `User` model that handles authentication, billing, profile data, and sending emails.
│  └─ Every other class in the system imports this one object.
├─ Root Cause: Laziness in boundary definition. Putting things where they are "easy to find."
├─ Why it fails: Any change to the God Object breaks unrelated parts of the system. Merge conflicts are constant.
└─ Prevention: Single Responsibility Principle (SRP). If a class description includes the word "and", it is doing too much.

PATTERN A3: LEAKY ABSTRACTIONS
├─ Symptoms:
│  ├─ You use an ORM to avoid writing SQL.
│  ├─ The ORM generates a massively inefficient N+1 query.
│  └─ To fix it, you have to write raw SQL anyway, bypassing the ORM.
├─ Root Cause: Believing that an abstraction completely shields you from the underlying complexity.
├─ Why it fails: "All non-trivial abstractions, to some degree, are leaky." (Joel Spolsky). When the abstraction leaks, you must understand the layer below it to fix it.
└─ Prevention: Use abstractions, but study the layer beneath them. Know what your ORM is doing under the hood.

PATTERN A4: RESUME-DRIVEN DEVELOPMENT (Hype Driven)
├─ Symptoms:
│  ├─ Adopting Kubernetes, Kafka, and GraphQL for a blog that gets 100 visits a day.
│  ├─ Rewriting the backend in Rust because it's fast, even though the team only knows Python.
│  └─ The architecture diagram looks like a CNCF sponsor board.
├─ Root Cause: Engineers optimizing their own resumes (learning hyped tech) instead of optimizing for the business constraints.
├─ Why it fails: The complexity of the infrastructure exceeds the complexity of the business logic. The team spends 90% of their time managing config files.
└─ Prevention: Choose "Boring Technology" for 80% of the stack. Only use "Innovation Tokens" on the 20% that provides a unique competitive advantage.
```

## Part 4: Production / Operational Failure Patterns

```
PATTERN O1: ALERT FATIGUE
├─ Symptoms:
│  ├─ The `#alerts` Slack channel gets 5,000 messages a day.
│  ├─ Developers mute the channel.
│  └─ A critical database failure is ignored because it looked like the other 4,999 warnings.
├─ Root Cause: Alerting on symptoms (CPU is at 80%) instead of user impact (Checkout is failing).
├─ Why it fails: The Boy Who Cried Wolf. Real incidents are buried in noise.
└─ Prevention: Delete all warnings. Alerts must only trigger if action is required IMMEDIATELY. Everything else is just telemetry for dashboards.

PATTERN O2: THE "RESTART IT" MITIGATION
├─ Symptoms:
│  ├─ The app crashes with an Out Of Memory (OOM) error every 3 days.
│  ├─ Instead of finding the memory leak, ops sets up a cron job to restart the app every 2 days.
│  └─ The leak gets worse, now it crashes every 12 hours.
├─ Root Cause: Treating the symptom instead of curing the disease.
├─ Why it fails: It masks the problem until the problem scales beyond the mitigation's capacity to hide it.
└─ Prevention: Mitigations are acceptable for exactly one sprint. A Jira ticket must be created to fix the root cause, and prioritized.

PATTERN O3: NO ROLLBACK PLAN (The Point of No Return)
├─ Symptoms:
│  ├─ A deployment includes a destructive database migration (e.g., dropping a column).
│  ├─ The new code crashes in production.
│  └─ Reverting the code fails because the database schema no longer matches the old code.
├─ Root Cause: Coupling irreversible state changes with code deployments.
├─ Why it fails: You are trapped in a broken state. You must "fix forward" under massive pressure.
└─ Prevention: The Expand/Contract Pattern. 
   1. Deploy DB change (add new column). 
   2. Deploy code that writes to both columns. 
   3. Migrate old data. 
   4. Deploy code that reads from new column. 
   5. Drop old column. (Each step is fully reversible).
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Advanced Reference Index](../advanced/INDEX.md)
- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Workflows Reference Index](../workflows/INDEX.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)

<!-- DCI-RELATED-END -->
