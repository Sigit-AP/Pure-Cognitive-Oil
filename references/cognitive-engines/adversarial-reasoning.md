# Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure

> **"If you do not try to break your own system, someone else will. Adversarial reasoning is the deliberate, structured practice of adopting the mindset of an attacker, an incompetent user, or a chaotic environment to discover vulnerabilities before they manifest in reality. A system that has not been attacked by its creator is a system waiting to be destroyed."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure
- **Path:** `references/cognitive-engines/adversarial-reasoning.md`
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

## Part 1: The Core Philosophy of Adversarial Thinking

```
Standard engineering asks: "How do I make this work?" (Constructive)
Adversarial engineering asks: "How do I make this fail?" (Destructive)

You cannot build a resilient system using only constructive thinking. You must actively red-team your own designs.

THE 3 ADVERSARIAL PERSONAS:

1. THE MALICIOUS ACTOR (The Attacker)
   ├─ Motivation: Financial gain, chaos, data theft, reputation destruction, or pure intellectual curiosity.
   ├─ Method: Exploiting logic flaws, bypassing validation, exhausting resources, chaining small vulnerabilities into massive exploits.
   └─ Mindset: "Rules are suggestions. Input fields are attack vectors. If the system allows it, it is valid."

2. THE CHAOTIC USER (The Fool)
   ├─ Motivation: Completing a task with absolute minimum cognitive effort.
   ├─ Method: Double-clicking submit buttons, mashing the keyboard, ignoring explicit instructions, using obsolete browsers, copy-pasting rich text into plain text fields.
   └─ Mindset: "I don't care how it works, I just want my receipt. If it breaks, it's your fault."

3. THE HOSTILE ENVIRONMENT (The Universe)
   ├─ Motivation: Entropy. The laws of thermodynamics.
   ├─ Method: Network partitions, disk failure, CPU spikes, cosmic rays flipping bits, third-party API outages, leap seconds, DNS failures.
   └─ Mindset: "Anything that can go wrong will go wrong, exactly at the moment you are asleep."
```

## Part 2: Threat Modeling Techniques

```
Adversarial reasoning requires structured frameworks, not just random guessing.

TECHNIQUE 1: STRIDE METHODOLOGY
Analyze your system against these 6 specific threat categories:
├─ S - Spoofing: Can someone pretend to be someone else? (Auth bypass, session hijacking, JWT forging).
├─ T - Tampering: Can someone alter data in transit or at rest? (SQL injection, parameter manipulation, MITM attacks).
├─ R - Repudiation: Can someone perform a malicious action and deny they did it? (Lack of audit logging, shared admin accounts).
├─ I - Information Disclosure: Can someone see data they shouldn't? (IDOR, verbose error messages revealing stack traces, exposed S3 buckets).
├─ D - Denial of Service: Can someone crash or exhaust the system? (Rate limit bypass, algorithmic complexity attacks, massive payload uploads).
└─ E - Elevation of Privilege: Can a regular user become an admin? (Role manipulation, mass assignment vulnerabilities).

TECHNIQUE 2: ASSUMPTION INVERSION
List every explicit and implicit assumption your system makes, then mathematically invert it to see what breaks.
├─ Assumption: "The database will always respond within 50ms."
│  └─ Inversion: "The database hangs forever without throwing an error." -> Does the app crash? Do connection pool threads pile up until the server dies?
├─ Assumption: "The third-party payment API will return JSON."
│  └─ Inversion: "The API returns a 502 HTML error page." -> Does our JSON parser crash the Node process because it tried to parse `<html`?
└─ Assumption: "Users will upload JPEGs."
   └─ Inversion: "Users upload a 4GB ZIP file renamed to image.jpg." -> Does the memory buffer explode trying to resize it?

TECHNIQUE 3: THE EVIL GENIUS BRAINSTORM (Time-Boxed)
Set a timer for 5 minutes. Brainstorm the most creative, devastating ways to destroy the business using the system. Do not worry about likelihood; worry about impact.
├─ "What if I register 10,000 accounts and trigger the welcome email simultaneously to bankrupt our SendGrid account and ruin our IP reputation?"
├─ "What if I set my username to `<script>alert(document.cookie)</script>` and wait for an admin to view my profile on the internal dashboard?" (Stored XSS).
└─ "What if I exploit a race condition by sending two withdrawal requests in the exact same millisecond, bypassing the balance check?"
```

## Part 3: Defensive Architecture Patterns

```
Adversarial reasoning must translate into structural, codified defenses. Fear is not a strategy; architecture is.

PATTERN 1: DEFENSE IN DEPTH (The Swiss Cheese Model)
Never rely on a single layer of security. If one layer fails (and it will), the next layer must catch it.
├─ Layer 1: Client-side validation (UX only, easily bypassed by `curl`).
├─ Layer 2: API Gateway / WAF (Blocks known malicious patterns, bot nets, rate limiting).
├─ Layer 3: Controller-level validation (Zod/Joi schema validation—reject anything that isn't exactly the expected shape).
├─ Layer 4: Business logic authorization (Does THIS specific user have access to THIS specific record?).
└─ Layer 5: Database-level constraints (Foreign keys, unique constraints, Row-Level Security). Even if the code is entirely compromised, the DB rejects the bad data.

PATTERN 2: FAIL CLOSED (Default Deny)
When a system encounters an unexpected state, a timeout, or an error, it must default to the safest possible posture.
├─ ❌ Fail Open: If the authorization service times out, grant access so the user isn't blocked and UX remains good.
└─ ✅ Fail Closed: If the authorization service times out, deny access, return a 500, and log a critical alert. Security always supersedes convenience.

PATTERN 3: ZERO TRUST (Never Trust Input)
All input is evil until cryptographically proven otherwise. Boundaries are hostile.
├─ HTTP Headers: Can be spoofed trivially. (e.g., `X-Forwarded-For` cannot be trusted for IP bans).
├─ Cookies: Can be stolen or manipulated if not signed and HTTP-only.
├─ URL Parameters: Easily changed by the user. (e.g., changing `?userId=1` to `?userId=2`).
└─ Database Records: Even data YOU wrote to the database should be validated upon read, in case another microservice or a manual DB patch corrupted it.

PATTERN 4: IDEMPOTENCY (The Shield Against Chaos)
A system must be able to handle the exact same request multiple times without changing the result beyond the initial application.
├─ The Chaotic User double-clicks "Charge Credit Card".
├─ The Hostile Environment drops the HTTP response, so the client retries the request assuming it failed.
└─ Solution: The client generates a unique `Idempotency-Key` (UUID). The server checks if it has processed that key. If yes, it returns the cached success response without charging the card again.

PATTERN 5: PRINCIPLE OF LEAST PRIVILEGE
Processes, users, and microservices should only have the exact permissions they need to perform their function, and nothing more.
├─ A read-only analytical query should connect to the database using a user that only has `SELECT` privileges.
├─ A frontend service should not have access to the AWS master root key.
└─ A user shouldn't be granted full admin rights just because they need to edit one specific setting.
```

## Part 4: The Red Team Review Checklist

```
Run this exact checklist on any major PR, feature, or architectural design before approving it. If you cannot answer "Yes" to all of these, the code is vulnerable.

[ ] AUTHENTICATION: Is every new endpoint protected by the auth middleware? (Are there any forgotten debug/test endpoints?)
[ ] AUTHORIZATION (IDOR): Is it checking that the user owns the specific resource, not just that they possess a valid token? (e.g., User A requesting User B's invoice).
[ ] RATE LIMITING: Can a script hit this specific endpoint 10,000 times a second? What happens to the database/API quota if they do?
[ ] PAYLOAD SIZE: Is there a hard byte limit on the size of the request body? (Preventing memory exhaustion).
[ ] MASS ASSIGNMENT: If the user passes `{"role": "admin"}` or `{"balance": 999999}` in the JSON payload, does the ORM blindly update the database?
[ ] TIMEOUTS: Does every external network call (DB, Redis, 3rd party API) have a strict, short timeout defined?
[ ] LOGGING HYGIENE: Are we accidentally logging passwords, API keys, JWTs, or PII in the error handler or access logs?
[ ] RACE CONDITIONS: If two requests hit this exact logic simultaneously, will the database be corrupted? (Needs DB transactions, row-level locks, or optimistic concurrency control).
[ ] DEPENDENCIES: Did we just add a new npm package with 50 transitive dependencies? Have we audited it for known CVEs?
```

## Part 5: Cognitive Defenses for the Engineer

```
Adversarial reasoning isn't just about attacking the code; it's about attacking your own mental models and biases.

COGNITIVE ATTACK 1: THE HAPPY PATH FIXATION
├─ Vulnerability: You spend 95% of your time writing the code for when everything goes right, and 5% writing a generic `catch (e) { console.log(e) }` block.
└─ Defense: Write the error handling FIRST. Define exactly how the function fails before you define how it succeeds. Design the error payload before the success payload.

COGNITIVE ATTACK 2: THE "IT WORKS ON MY MACHINE" BIAS
├─ Vulnerability: Your local machine has 64GB of RAM, an M-series chip, 0ms network latency to the local DB container, and you are the only concurrent user. You assume production will behave similarly.
└─ Defense: Deliberately throttle your network to "Fast 3G" in Chrome DevTools. Limit your Docker container to 512MB of RAM. See how the app feels when it's suffocating. That is reality.

COGNITIVE ATTACK 3: AUTHORITY COMPLIANCE (The Halo Effect)
├─ Vulnerability: "The Senior Engineer / the AI / the Official Documentation said this is the best architecture, so I won't question it."
└─ Defense: Authority does not equal correctness. The Senior Engineer/AI does not have perfect context. Ask: "What are the trade-offs of this approach? In what specific scenario does this architecture catastrophically fail?" If they cannot answer, the architecture is not fully baked.

COGNITIVE ATTACK 4: THE SUNK COST DEFENSE
├─ Vulnerability: You realize your architecture is fundamentally vulnerable, but you've already spent 3 days building it, so you try to patch it with duct tape instead of tearing it down.
└─ Defense: Recognize that patches over flawed architecture create multiplicative tech debt. The 3 days are gone. Do not waste the next 3 weeks trying to maintain a broken foundation. Revert.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Advanced Reference Index](../advanced/INDEX.md)
- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)

<!-- DCI-RELATED-END -->
