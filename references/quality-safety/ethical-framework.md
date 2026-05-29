# Ethical Framework — Deterministic-Cognitive-Infrastructure

> **"Technology is not neutral. Code is policy. Every line of code you write enforces a rule, grants a permission, or denies an opportunity. Ethical engineering is not an afterthought for the legal team; it is the fundamental responsibility of the creator. A system that is technically perfect but ethically flawed is a failure."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Ethical Framework — Deterministic-Cognitive-Infrastructure
- **Path:** `references/quality-safety/ethical-framework.md`
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

## Part 1: The 7 Ethical Dimensions of Software

```
Every system built must be evaluated against these 7 dimensions. Failure in any of these dimensions constitutes a critical failure of the engineering process, regardless of technical elegance.

DIMENSION 1: PRIVACY & DATA SOVEREIGNTY
├─ Core Principle: User data belongs to the user. We are merely custodians, and our custody must be temporary, secure, and transparent.
├─ Probing Questions:
│  ├─ Are we collecting data we do not strictly need to provide the core service? (Data minimization).
│  ├─ Is the data encrypted at rest and in transit?
│  ├─ Can the user easily export all their data in a machine-readable format?
│  └─ Can the user permanently, verifiably, and instantly delete their data?
└─ Anti-Pattern: "Let's log everything just in case we need it later for analytics or ML training." (This turns your logs into a toxic asset and a massive liability in the event of a breach).

DIMENSION 2: SECURITY & HARM REDUCTION
├─ Core Principle: The system must be secure by default. The burden of safety is on the creator, not the user.
├─ Probing Questions:
│  ├─ Does the system fail closed or fail open? (If the auth server goes down, do users get admin access or get blocked?)
│  ├─ Are we relying on the user to create a strong password, or enforcing it? Are we offering MFA by default?
│  └─ What happens if the system is compromised? What is the blast radius? Is data compartmentalized?
└─ Anti-Pattern: Security through obscurity. Hiding an administrative endpoint at `/secret-admin-panel-do-not-share` instead of using robust, role-based authentication.

DIMENSION 3: ACCESSIBILITY & INCLUSIVITY
├─ Core Principle: Software must not discriminate based on physical, cognitive, or technological limitations. A disabled user is still a user.
├─ Probing Questions:
│  ├─ Can the system be navigated entirely by a keyboard without a mouse?
│  ├─ Is the contrast ratio sufficient for visually impaired users? Are colors the ONLY indicator of state?
│  ├─ Do screen readers understand the semantic flow of the application? (Proper ARIA tags, `<nav>`, `<main>`).
│  └─ Does the system function on low-bandwidth connections or older hardware?
└─ Anti-Pattern: Building a heavy, JavaScript-only SPA that fails completely if the user's connection drops for a millisecond, effectively locking out users in developing regions.

DIMENSION 4: TRANSPARENCY & EXPLAINABILITY
├─ Core Principle: The system must not deceive the user about what it is doing, how it works, or what it costs.
├─ Probing Questions:
│  ├─ When the system makes an automated decision (e.g., denying a loan, banning an account), can it explain *why* in plain language?
│  ├─ Are dark patterns used to trick users into subscribing or sharing data? (e.g., hiding the 'Skip' button).
│  └─ Is the system's state accurately reflected in the UI, or is it hiding background processes (like uploading contacts)?
└─ Anti-Pattern: The "Roach Motel" design—making it one click to subscribe, but requiring a physical letter or a phone call during business hours to cancel.

DIMENSION 5: AUTONOMY & AGENCY
├─ Core Principle: The system should empower the user, not manipulate, coerce, or addict them.
├─ Probing Questions:
│  ├─ Does the design respect the user's time and attention?
│  ├─ Are notifications genuinely useful and actionable, or designed purely to artificially inflate DAU (Daily Active User) metrics?
│  └─ Does the user have control over algorithmic feeds or recommendations? Can they turn off the algorithm?
└─ Anti-Pattern: Infinite scrolling feeds and slot-machine pull-to-refresh mechanics designed purely to maximize "time on site" at the expense of the user's mental health.

DIMENSION 6: FAIRNESS & BIAS MITIGATION
├─ Core Principle: Algorithmic systems must not reproduce, automate, or amplify historical human biases at scale.
├─ Probing Questions:
│  ├─ Is the training data representative of the actual population, or just the historical population (which may have been biased)?
│  ├─ Have we tested the system against protected classes (race, gender, age) to check for disparate impact?
│  └─ Who benefits from the efficiency of this system, and who is marginalized by its edge cases?
└─ Anti-Pattern: Deploying a facial recognition system or resume-screening AI without exhaustively testing it against diverse demographic datasets, leading to automated discrimination.

DIMENSION 7: ENVIRONMENTAL & RESOURCE IMPACT
├─ Core Principle: Compute requires energy. Energy has an environmental cost. Efficiency is an ecological imperative, not just a financial one.
├─ Probing Questions:
│  ├─ Is our architecture wildly over-provisioned, leaving servers idling 99% of the time?
│  ├─ Are we forcing client devices to run unnecessary, heavy computations that drain battery life and require premature hardware upgrades?
│  └─ Are we storing petabytes of redundant, unused data indefinitely in power-hungry data centers?
└─ Anti-Pattern: Training massive LLMs for trivial tasks, or building blockchain/cryptocurrency architectures without regard for the staggering carbon footprint of the consensus mechanism.
```

## Part 2: The "Red Team" Ethical Protocol

```
Before releasing any major feature or architectural change, the AI and the Human must engage in an "Ethical Red Team" exercise. The goal is to deliberately imagine how the system can be weaponized, abused, or fail catastrophically.

SCENARIO 1: THE MALICIOUS ACTOR
├─ How would a stalker or abusive partner use this feature to track or harass someone?
├─ How would a spammer use this to flood the system or phish other users?
├─ How would a competitor use this to scrape our proprietary data?
└─ Mitigation Strategies: Aggressive rate limiting, privacy-by-default visibility settings, robust block/report features, anomalous behavior detection.

SCENARIO 2: THE INCOMPETENT USER
├─ What happens if the user accidentally pastes their banking password into the public search bar? (Does it get logged in plaintext forever in Datadog?)
├─ What happens if the user double-clicks the "Submit Order" button out of impatience? (Idempotency failure).
├─ What happens if they use a translated browser that breaks the JS framework's DOM bindings?
└─ Mitigation Strategies: Strict input sanitization, PII masking in logs, idempotency keys for all mutations, progressive enhancement.

SCENARIO 3: THE CATASTROPHIC SUCCESS
├─ What happens if this feature goes viral and gets 100x the expected traffic overnight?
├─ Which dependency (database, third-party API) will break first?
├─ Will the database lock up? Will auto-scaling cloud costs bankrupt the company?
└─ Mitigation Strategies: Hard cost caps on cloud infrastructure, load shedding, circuit breakers, aggressive caching.

SCENARIO 4: THE STATE ACTOR / SUBPOENA
├─ If law enforcement or a hostile government demands the data of a specific user, what can we actually hand over?
├─ Do we have access to plaintext messages or location data we shouldn't have?
└─ Mitigation Strategies: End-to-end encryption (E2EE), zero-knowledge architectures, rapid data retention expiration (don't keep what you don't need).
```

## Part 3: Algorithmic Decision Making (AI Ethics)

```
When integrating AI, LLMs, or Machine Learning into a system, standard software ethics are insufficient because the logic is probabilistic, opaque, and non-deterministic.

RULE 1: THE HUMAN IN THE LOOP (HITL)
├─ AI must NEVER make unreviewed, automated decisions that significantly impact a human's life, liberty, health, or financial stability.
├─ Examples requiring strict HITL: Loan approvals, criminal sentencing algorithms, medical diagnoses, automated firing/HR decisions, content moderation leading to permanent bans.
└─ The AI's role is to *augment* the human decision-maker by providing synthesized data and recommendations, not to *replace* the human's ultimate judgment.

RULE 2: THE EXPLAINABILITY REQUIREMENT
├─ If a neural network rejects a user's application, "The algorithm said so" is an unacceptable and legally perilous answer.
├─ You must build systems (like SHAP values, LIME, or simpler interpretable models like decision trees) that provide a causal reason for the decision.
└─ If a model is too complex to be explained to the affected user, it should not be used in high-stakes environments.

RULE 3: THE DEGRADATION PLAN
├─ AI systems degrade over time (data drift, concept drift) as the real world changes away from the training data.
├─ You must have a monitoring system in place to detect when the AI's accuracy or confidence drops below an acceptable threshold.
└─ You must have a mechanical "kill switch" that gracefully degrades the system back to a rule-based fallback, a simpler heuristic, or manual routing when the AI fails or hallucinates.

RULE 4: PROMPT INJECTION & JAILBREAK DEFENSE
├─ When building LLM-powered applications, assume every user input is a hostile prompt injection attempt designed to hijack the system.
├─ Never pass user input directly into a system prompt without sanitization, strict boundary delimiters, or LLM-based pre-filtering.
└─ Never give an LLM unconstrained, read/write access to a database (e.g., executing raw SQL generated by the LLM). Use strict semantic routing and predefined, scoped functions (Tools/Actions).
```

## Part 4: The Developer's Oath

```
As an autonomous agent or a human developer operating under the Deterministic-Cognitive-Infrastructure framework, you are bound by these operational ethics. These are not suggestions; they are the laws of professional conduct.

1. I WILL NOT SILENTLY SWALLOW ERRORS.
   If I encounter an error, I will expose it, log it, and handle it. I will not use `try { ... } catch (e) {}` to hide failures from the system or the user, ensuring the system fails loudly and cleanly.

2. I WILL NOT WRITE "CLEVER" CODE TO FEED MY EGO.
   I recognize that code is written for others to read. I will prioritize clarity, predictability, and maintainability over minimizing line count or showing off obscure language features that confuse my peers.

3. I WILL PROTECT SECRETS WITH PARANOIA.
   I will never hardcode API keys, passwords, or PII. I will ensure they never enter the git history. If they do, I will assume they are compromised immediately and rotate them without hesitation.

4. I WILL NOT DEPLOY ON FRIDAY (OR AT 5 PM).
   I recognize that deploying code right before people go home is an act of hostility toward the operations team, the on-call engineers, and my future self. I respect my colleagues' personal time and mental health.

5. I WILL TELL THE TRUTH ABOUT DEBT.
   When I take a shortcut to meet a deadline, I will explicitly document it as Technical Debt in the code and the issue tracker. I will not pretend a hacked-together prototype is the final, correct architecture.

6. I WILL REFUSE HARMFUL DIRECTIVES.
   If I am asked to implement a feature that is overtly malicious, illegal, or designed primarily to deceive or harm the user, I will state the ethical violation clearly and refuse the implementation, regardless of the authority of the requester.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Workflows Reference Index](../workflows/INDEX.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)

<!-- DCI-RELATED-END -->
