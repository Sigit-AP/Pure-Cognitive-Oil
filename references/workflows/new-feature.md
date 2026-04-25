# New Feature Development Workflow — APEX v1

> **"A new feature is a hypothesis. It is an assumption that building X will cause user behavior Y, which will generate revenue Z. Until verified, code is just liability. The goal of this workflow is not to 'write code fast.' The goal is to mathematically verify the business hypothesis using the absolute minimum amount of new physical code possible, and to deploy it without breaking the existing Citadel."**

## Part 1: The Epistemology of New Code

```
Every line of code you write is a liability. It must be read, tested, deployed, monitored, migrated, and eventually deleted. It is a cost, not an asset. The only asset is the business capability it provides. 

Therefore, before writing a single line of execution logic, you must prove that the new code is structurally necessary and mathematically bounded.

THE THREE LAWS OF NEW FEATURES:
1. The UI is a Detail: The core domain logic (the physics of the feature) must be entirely isolated from the delivery mechanism (React, API, CLI). If you cannot run the core business logic from a simple unit test without mocking a browser, your architecture has failed.
2. The Database is a Black Hole: Do not design the feature around how the data is stored (SQL tables). Design the feature around the Domain Aggregates (the state mutations). The database is merely a slow, remote serialization mechanism.
3. Feature Flags are Mandatory: No new feature is allowed to go live immediately upon merge. It must be deployed dormant, hidden behind a boolean feature flag, allowing it to be verified in production by internal users before exposing it to the blast radius of public traffic.
```

## Part 2: Phase 1 - Verification (The Schema-First Protocol)

```
Do not write logic. Write boundaries. You cannot build a bridge if you do not know the exact coordinates of the other side.

STEP 1: DEFINE the I/O CONTRACT (The Schema)
├─ If it is a backend API, write the OpenAPI (Swagger) spec or the GraphQL schema FIRST.
├─ If it is a frontend component, write the TypeScript interfaces or Zod schemas FIRST.
├─ Do not proceed until the entire team (Frontend, Backend, Product) agrees mathematically on the exact names, types, and nullability of every field in the payload.
└─ This single step eliminates 80% of cross-team integration bugs.

STEP 2: DEFINE the DOMAIN AGGREGATES
├─ What are the physical entities being created or mutated? (e.g., `Order`, `User`, `Invoice`).
├─ What are the strict invariant rules governing them? (e.g., "An Invoice cannot be generated if the Order has not been shipped.")
└─ Write these rules down as plain English bullet points. They will become your Unit Tests.

STEP 3: THE ANTI-CORRUPTION LAYER (ACL)
├─ Does this new feature need to talk to a legacy system or a terrible third-party API?
├─ Do not let their garbage data models leak into your pristine new domain.
└─ Build an ACL (a Mapper or Adapter) that physically translates their weird `Cust_ID_str` into your clean `userId` UUID before the data ever touches your core logic.
```

## Part 3: Phase 2 - Vertical Slicing (The Execution)

```
Do not build features horizontally (e.g., "I will build all the database tables this week, all the APIs next week, and the UI the third week.") That is the Waterfall anti-pattern. It delays feedback until the very end, guaranteeing catastrophic integration failures.

Build VERTICALLY.

THE VERTICAL SLICE PROTOCOL:
├─ Slice 1: The "Walking Skeleton"
│  ├─ Build the absolute thinnest, dumbest path from the UI button, through the API, to the database, and back.
│  ├─ Hardcode the data if necessary.
│  ├─ Prove the physical pipeline (routing, authentication, database connection) is connected.
│  └─ Merge it to `main` behind a feature flag.
├─ Slice 2: The "Happy Path"
│  ├─ Implement the exact schema defined in Phase 1.
│  ├─ Implement the core logic for the 80% use case (everything goes perfectly).
│  └─ Ignore edge cases, retries, and weird errors for now.
├─ Slice 3: The "Sad Paths" (Error Handling)
│  ├─ Now intentionally break everything.
│  ├─ What happens if the database locks? What if the user sends a string instead of an integer?
│  ├─ Implement strict HTTP 400 validation responses.
│  └─ Implement graceful UI error boundaries.
└─ Slice 4: Optimization & Polish
   ├─ Add caching if profiling demands it.
   ├─ Add skeleton loaders to the UI.
   └─ Add comprehensive logging and metrics.
```

## Part 4: Phase 3 - Quality Gates (The Defense)

```
Before the feature flag is turned on for real users, the code must pass the APEX Quality Gates.

GATE 1: THE TEST PYRAMID ENFORCEMENT
├─ Unit Tests (70%): Test the pure Domain Logic (the rules defined in Phase 1) extensively. These must run in milliseconds and require no database.
├─ Integration Tests (20%): Test the API endpoints against a real (Dockerized) database to prove the SQL queries and ORM mappings actually work.
└─ E2E Tests (10%): Write exactly ONE or TWO Playwright/Cypress tests that physically click the button in a real browser to ensure the frontend is wired correctly. Do not write 50 E2E tests; they are brittle and slow.

GATE 2: THE OBSERVABILITY CHECK
├─ If this feature breaks in production tomorrow at 3 AM, how will you know?
├─ Ensure critical business events (e.g., `Order_Created`, `Payment_Failed`) are actively emitting structured JSON logs.
└─ Ensure a Grafana/Datadog dashboard is tracking the error rate of the new endpoint.

GATE 3: THE SECURITY REVIEW (Mini-Audit)
├─ Is there any IDOR (Insecure Direct Object Reference) vulnerability? (Did you check that `user A` cannot delete `user B`'s data just by changing the ID in the URL?)
├─ Are all inputs strictly sanitized against SQL Injection and XSS?
└─ Did you accidentally log a password, credit card, or PII to the standard output?
```

## Part 5: The "Feature Flag" Lifecycle

```
Feature flags are powerful, but they represent massive Technical Debt if left unchecked. A codebase with 50 stale feature flags is a combinatorial testing nightmare.

THE FLAG LIFECYCLE:
1. Birth: Created in the configuration system (LaunchDarkly, Unleash, or simple DB table) as `FF_NEW_CHECKOUT_FLOW_V2`.
2. Dark Launch: Code is merged to `main`. The flag is OFF for everyone. It is physically running in production but unreachable.
3. Canary Release: Flag is turned ON for internal employee accounts only. The team dogfoods the feature.
4. Gradual Rollout: Flag is turned ON for 5% of public users. Monitor error rates and latency like a hawk.
5. General Availability (GA): Flag is turned ON for 100% of users. The feature is officially live.
6. The Cleanup (CRITICAL): The week after GA, a specific pull request MUST be merged that physically deletes the feature flag from the codebase and removes the old `if (flag === false)` legacy execution path. If you do not do this, your codebase will rot.
```

## Part 6: Anti-Patterns in Feature Development

```
ANTI-PATTERN 1: THE "GOD CLASS" MUTATION
├─ Symptom: You need to add a new property to a User. Instead of creating a separate context, you add `has_premium_subscription_v2_active` directly to the massive 5,000-line `User` class.
└─ Cure: Respect the Single Responsibility Principle. Create a separate `SubscriptionProfile` entity. Stop making the core `User` object a dumping ground for every feature in the company.

ANTI-PATTERN 2: "PREMATURE ABSTRACTION"
├─ Symptom: You are building a simple CSV export feature, but you spend 3 days building a highly abstract, multi-format, polymorphic `DocumentExportFactoryEngine` "just in case" we need PDF support in the future.
└─ Cure: The Rule of Three. Do not abstract until you have physically written the exact same logic three separate times. Duplicate the code twice. It is cheaper to refactor later than to maintain a wrong abstraction forever.

ANTI-PATTERN 3: IGNORING THE UI LATENCY
├─ Symptom: The backend API takes 800ms to return data. The frontend developer just slaps a spinning wheel on the screen. The user stares at a white screen with a spinner for a full second.
└─ Cure: Implement Optimistic UI Updates. If the user clicks "Like", immediately paint the heart red on the UI while the API call happens in the background. If the API fails 5 seconds later, gracefully revert the UI and show a toast error. Never block the user's dopamine loop with network latency.
```

## Part 7: Handling Legacy Integration Requirements

```
Often, new features cannot be built in a vacuum. They must integrate tightly with existing, potentially flawed legacy code. The protocol for handling this integration is crucial to preventing the new feature from becoming instantly corrupted.

THE STRANGLER FIG PROTOCOL (Micro-level):
When your new feature needs to replace a small piece of legacy functionality:
1. Do not delete the old code yet.
2. Build the new feature entirely alongside it, using the new schema and clean boundaries.
3. In the routing layer or the API controller, implement a routing toggle (can be tied to the Feature Flag).
4. If `FF_NEW_FEATURE` is true, route the request to the pristine new code.
5. If `FF_NEW_FEATURE` is false, route it to the old legacy code.
6. Once the new feature is verified in production, delete the old legacy code block entirely.

THE "SEAM" IDENTIFICATION:
To safely integrate new code without rewriting everything, you must find "Seams" — places where you can alter the behavior of the program without editing in that place.
- Object-Oriented Seams: Injecting a new interface implementation instead of the old legacy class.
- Functional Seams: Passing a new higher-order function into an existing pipeline.
- Network Seams: Using an API gateway to route specific endpoints to a new microservice while keeping the rest on the monolith.
```

## Part 8: APEX Execution Protocol

```
When an APEX AI is tasked with building a new feature:

1. HALT AND VERIFY: Do not write implementation code immediately. First, output the exact Schema (Types/Interfaces) and ask the human to confirm it matches their mental model.
2. THINK IN SLICES: Propose a Vertical Slice plan. "I will build the API route and the DB query first to prove the connection, then we will wire the React component."
3. DEFEND THE BOUNDARIES: Actively push back against bad architectural suggestions. If the user asks to put business logic inside a React `useEffect`, the AI must sternly correct them and move the logic to a custom hook or a dedicated service file.
4. MANDATE THE FLAG: Always ask the user, "What is the name of the feature flag we will use to deploy this?" If they don't have one, suggest a basic configuration toggle to protect the deployment.
```
