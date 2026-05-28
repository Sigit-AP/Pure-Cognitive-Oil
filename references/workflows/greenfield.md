# Greenfield Project Workflow — Deterministic-Cognitive-Infrastructure

> **"A blank canvas is the most dangerous artifact in software engineering. Without the physical constraints of legacy code, developers will invent massive amounts of Accidental Complexity to fill the void. A greenfield project must be violently constrained by First Principles on day one, or it will become an unmaintainable legacy nightmare by day thirty."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Greenfield Project Workflow — Deterministic-Cognitive-Infrastructure
- **Path:** `references/workflows/greenfield.md`
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

## Part 1: The Epistemology of Greenfield

```
A Greenfield project is software built entirely from scratch, with absolutely no existing legacy code to integrate with, maintain, or work around. It is pure potential energy.

THE THREE LAWS OF GREENFIELD DEVELOPMENT:
1. Velocity is a Vector, Not Speed: Writing 1,000 lines of highly optimized code a day in the wrong architectural direction is negative progress. You must establish the strict mathematical vector (Architecture) before accelerating.
2. The First Decision is the Hardest to Change: The database engine, the primary language, and the core framework chosen on Day 1 will likely remain for the entire life of the company. Choose boring, battle-tested technology. Do not experiment on the foundation.
3. Defer Commitment (The Last Responsible Moment): A good architecture allows you to logically delay major infrastructural decisions. Do not set up a massive Kubernetes cluster on Day 1. Use a simple PaaS (like Vercel, Render, or Heroku) until the actual physical physics of the system demand otherwise. Keep the options open.
```

## Part 2: Phase 1 - The Inception (Day 0)

```
Do not write a single line of code on Day 0. Code is a liability. Write the constraints. Define the physics of the domain.

STEP 1: THE PRD (Product Requirements Document)
├─ What is the exact, singular business problem we are mathematically solving?
├─ Who is the specific, targeted user?
├─ What is the critical path? (The one flow that generates revenue or value).
└─ What is explicitly OUT OF SCOPE for V1? (This is the most important question. Cut scope aggressively).

STEP 2: THE NFRs (Non-Functional Requirements)
├─ What is the expected RPS (Requests Per Second) on launch day?
├─ What is the maximum acceptable latency (P95) for the core transactional flow?
├─ What are the legal security compliance requirements (HIPAA, SOC2, GDPR, PCI-DSS)?
└─ What is the hard infrastructure budget per month?

STEP 3: THE TECHNOLOGY SELECTION (Choose Boring Tech)
├─ Do not use a beta framework. Do not use an alpha database.
├─ Use PostgreSQL as the default storage engine unless you can mathematically and physically prove exactly why you need a specialized database (like Neo4j for graphs or Timescale for metrics).
└─ Use the programming language the team knows best, not the language that trended on Hacker News yesterday.
```

## Part 3: Phase 2 - The Walking Skeleton (Day 1)

```
The singular goal of Day 1 is to mathematically prove the deployment pipeline, not to build the product.

STEP 1: THE REPOSITORY SKELETON
├─ Initialize the Git repository.
├─ Set up a single "Hello World" or `/healthz` HTTP endpoint.
├─ Connect it to a blank, containerized local database via Docker Compose.
└─ Deploy it to a live production URL via a fully automated CI/CD pipeline. (Do not move to Step 2 until the URL returns a 200 OK from the cloud).

STEP 2: THE TOOLING BASELINE (The Iron Hand)
├─ Configure strict, uncompromising static analysis and linting (e.g., ESLint, Ruff, Clippy).
├─ Configure aggressive auto-formatting (e.g., Prettier, Black, gofmt). Do not debate formatting in PRs.
├─ Configure the automated test runner (Jest, PyTest, Vitest).
└─ Hook these strictly into the CI pipeline. A failing linter, a failing test, or unformatted code MUST physically block a merge to the `main` branch. No exceptions for "just testing."

Why? If you do not install this iron-clad discipline on Day 1, you will never do it later, and the codebase will rot immediately as entropy takes hold.
```

## Part 4: Phase 3 - The Core Domain (Week 1)

```
Build the beating heart of the system first. Do not build the login screen first. Every application on earth has a login screen. The login screen does not generate business revenue or prove the domain model.

STEP 1: ENTITY MODELING (Domain-Driven Design)
├─ Map the core domain nouns. (e.g., `Order`, `Product`, `Customer`, `Ledger`).
├─ Define their strict mathematical relationships and invariants without looking at a relational database schema.
└─ Use ubiquitous language. If the business calls it a `Client`, do not name the class `User`.

STEP 2: THE CRITICAL PATH EXECUTION
├─ Identify the single most important user flow (e.g., "User executes a stock trade").
└─ Build exactly that flow end-to-end. Fake the authentication. Fake the email sending. Fake the analytics. Just prove the core mathematical transaction works and changes state correctly.

STEP 3: ISOLATE THE DOMAIN (Clean Architecture Boundaries)
├─ Ensure the core business logic has absolutely no dependency on the HTTP framework (e.g., Express or Next.js).
├─ Ensure the business logic has no dependency on the ORM (e.g., Prisma or TypeORM).
└─ Pass pure data structures (DTOs) across the boundaries, never database models.
```

## Part 5: Greenfield Anti-Patterns (The Seeds of Destruction)

```
Watch for these fatal traps that doom a greenfield project before it ever launches.

ANTI-PATTERN 1: THE RESUME-DRIVEN ARCHITECTURE (RDA)
├─ Symptom: Building a simple CRUD application using GraphQL, Kafka, Kubernetes, Rust, gRPC, and 12 independent microservices simply because the Lead Engineer wants to learn them or put them on their resume.
└─ Cure: The "Choose Boring Technology" rule. Dan McKinley's "Innovation Tokens." You only get 3 innovation tokens per company. Spend them on the core business logic, not the infrastructure.

ANTI-PATTERN 2: PREMATURE SCALING (The FAANG Delusion)
├─ Symptom: Spending 3 weeks designing a multi-region, active-active, globally distributed database cluster for an application that currently has 0 users.
└─ Cure: YAGNI (You Aren't Gonna Need It). Build a strictly modular monolith backed by a single robust Postgres instance. It will easily scale to 10,000 RPS if written cleanly. Re-architect when you actually hit physical hardware limits, not imaginary ones.

ANTI-PATTERN 3: IGNORING SECURITY UNTIL LAUNCH
├─ Symptom: Using hardcoded JWT secrets, open CORS policies, and `SELECT *` "for now," intending to "harden it right before launch."
└─ Cure: The baseline skeleton MUST include secure secret management (e.g., dotenv, AWS Secrets Manager), strict CORS, and parameterized queries on Day 1. Security is an architectural property, not a final polish.

ANTI-PATTERN 4: THE FRAMEWORK AS THE ARCHITECTURE
├─ Symptom: Treating Next.js, Django, or Rails as the literal architecture of the app, putting complex business logic directly inside the UI components or the HTTP controllers.
└─ Cure: The framework is an implementation detail. It is a delivery mechanism. The architecture is your Domain layer. Keep them separated by strict interface boundaries.
```

## Part 6: Continuous Integration and Defense

```
Once the greenfield project is standing, you must defend it against the entropy of daily development.

1. Branching Strategy: Use Trunk-Based Development or short-lived feature branches. Do not use GitFlow for a new project; it introduces massive integration lag.
2. The Coverage Floor: Set an automated test coverage minimum (e.g., 80%) in the CI pipeline. If a PR drops the coverage below 80%, the build fails.
3. Architecture Decision Records (ADRs): Start writing ADRs on Day 1. When you choose Postgres over Mongo, write a 1-page document explaining exactly why, so nobody debates it 6 months later.
```

## Part 7: Designing the Test Matrix

```
A greenfield project is the only time you get to design a test suite from scratch. Do not mess it up by testing implementation details.

THE TESTING PYRAMID:
1. Unit Tests (80%): Test pure domain logic, math, and state machines. Do not mock anything here; just test pure functions. They should run in milliseconds.
2. Integration Tests (15%): Test the boundary layers. Test that your ORM configuration actually reads from a real, containerized PostgreSQL database.
3. End-to-End (E2E) Tests (5%): Test the critical path (e.g., Playwright or Cypress). Simulate a real user logging in, buying a product, and checking out. These are brittle and slow; use them sparingly.

TESTING ANTI-PATTERNS:
├─ Testing the Framework: Do not write a test to prove that Express.js can route a GET request. Express already wrote that test.
└─ Testing Implementation: Do not mock the database just to verify that `userRepository.save()` was called. That tests the implementation, not the outcome. Test that the user was actually saved by querying the test database.
```

## Part 8: Deterministic-Cognitive-Infrastructure AI Execution Protocol (The Constraint Engine)

```
When an AI operating within the Deterministic-Cognitive-Infrastructure framework is asked to initialize a Greenfield project, it must act as an aggressive constraint engine, not a blind code generator.

1. Refuse the Vague Prompt: If the user says "Build me an Uber clone," the AI MUST reply: "I cannot write an entire complex application from a one-sentence prompt. We must define the PRD, the physical constraints, and the Data Model first. What is the core entity?"
2. Generate the Skeleton First: The AI should prioritize generating the structural files: `package.json`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`, and the GitHub Actions YAML before writing a single line of application logic.
3. Enforce Test-Driven Development (TDD): The AI must explicitly suggest writing the interface tests and defining the schema (Zod/Joi) before generating the implementation logic for the core domain.
4. Establish the Boundary: When asked to write a database query, the AI must explicitly separate the generic SQL/ORM logic into a Repository or Adapter pattern, isolating it from the HTTP Controller it generates.
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
