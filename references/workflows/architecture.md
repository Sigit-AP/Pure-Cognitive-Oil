# Software Architecture Workflow — APEX v1

> **"Architecture is about the important stuff. Whatever that is. It is the set of decisions that are exceptionally hard to change later. If a decision is easy to change, it is not architecture; it is just implementation design. Good architecture maximizes the number of decisions not made."**

## Part 1: The Epistemology of Architecture

```
Architecture is fundamentally the act of drawing strict boundaries. It is deciding what parts of the system are allowed to know about the existence of other parts of the system. It is the management of dependencies.

THE THREE LAWS OF ARCHITECTURE:
1. Conway's Law: Organizations design systems that perfectly mirror their own internal communication structures. If you have four isolated engineering teams, you will inevitably produce a four-tier architecture, regardless of what the software actually needs. To change the architecture, you must first change the org chart (The Inverse Conway Maneuver).
2. The Dependency Rule (Clean Architecture): Source code dependencies must point ONLY inward, toward higher-level policies (pure business logic). The business logic must NEVER depend on the database, the UI framework, or the third-party API. The outer layers are plugins to the core.
3. YAGNI (You Aren't Gonna Need It) / The Deferment Principle: Do not architect for a massive hyper-scale you do not currently have. Architect specifically for the *ease of replacing* components when you finally reach that scale. A good architecture allows you to defer major decisions (like which database to use) for as long as possible.
```

## Part 2: The Core Architectural Patterns

```
Choosing the right macroscopic pattern determines the physics of your entire engineering organization.

PATTERN 1: THE MONOLITH
├─ Structure: All code exists in one repository and is deployed as a single, unified process.
├─ Pros: Extremely easy to deploy, simple to debug locally, easy to refactor across boundaries (the compiler catches everything), high performance (in-memory function calls instead of network latency).
├─ Cons: Scales poorly organizationally. When 100 developers commit to the same repo daily, the CI/CD pipeline becomes a bottleneck, and a bug in the reporting module can crash the checkout module.
└─ Verdict: ALWAYS start here for a new product. A microservice architecture built before the business domain is fully understood will fail catastrophically because the boundaries will be drawn incorrectly.

PATTERN 2: THE MODULAR MONOLITH (The Citadel)
├─ Structure: One deployment unit, but strict, compiler-enforced internal boundaries between domains (e.g., using Nx, Turborepo, or strict Java packages).
├─ Pros: It provides the deployment and debugging simplicity of a monolith, but enforces the logical separation and discipline of microservices. It prevents the "Spaghetti Code" collapse.
└─ Verdict: This is the absolute sweet spot for 90% of medium-to-large tech companies. It provides all the benefits without the distributed systems tax. If a module eventually needs independent scaling, it is trivial to extract.

PATTERN 3: MICROSERVICES
├─ Structure: Independently deployable services communicating strictly over a network boundary (HTTP/gRPC/Events).
├─ Pros: Independent physical scaling, technology diversity (Team A uses Go, Team B uses Python), and massive organizational scaling.
├─ Cons: You are trading code complexity for operational complexity. You inherit distributed transactions, network latency, observability nightmares, eventual consistency, and complex CI/CD orchestrations.
└─ Verdict: Only use when the organization is literally too large to fit in a modular monolith without stepping on each other, or when physical scaling requirements for one specific component wildly outpace the rest of the system.

PATTERN 4: EVENT-DRIVEN ARCHITECTURE (EDA)
├─ Structure: Services do not call each other directly (RPC). Instead, they emit domain events to a central bus (Kafka/RabbitMQ), and other services subscribe to those events.
├─ Pros: Ultimate decoupling. The `CheckoutService` does not need to know the `EmailService` exists.
└─ Cons: The flow of the system is entirely invisible in the code. Tracing a request from start to finish requires complex distributed tracing tools (Jaeger/Zipkin). Debugging becomes hunting ghosts in the logs.
```

## Part 3: Drawing Boundaries (Clean Architecture)

```
How do you structure the folders and files inside a service? Use Clean Architecture (Ports and Adapters / Hexagonal Architecture).

LAYER 1: THE DOMAIN (The Core)
├─ What lives here: Pure business logic, Entities, and Value Objects.
├─ Dependencies: NOTHING. This layer cannot import any external library, not even the framework (e.g., no React, no Express, no TypeORM).
└─ Reason: Business rules do not change when you switch from MySQL to PostgreSQL. The code should reflect that immutability.

LAYER 2: THE USE CASES (The Application)
├─ What lives here: The orchestrators. "Get user from DB, calculate tax using Domain logic, save receipt to DB."
├─ Dependencies: Imports the Domain. Defines Interfaces (Ports) for the database, but does not implement them.
└─ Reason: It contains the application-specific workflow, completely decoupled from the delivery mechanism (HTTP vs. CLI).

LAYER 3: THE ADAPTERS (The Infrastructure)
├─ What lives here: Controllers, Database Repositories, Third-party API clients.
├─ Dependencies: Imports Use Cases and Domain. Implements the Interfaces defined in Layer 2.
└─ Reason: This is where the dirty stuff lives. This is where SQL queries are written. This is where HTTP requests are parsed. If you swap Express for Fastify, only this layer changes.
```

## Part 4: Architectural Smells (The Collapse)

```
Architectures do not fail overnight. They rot slowly. Watch for these systemic smells.

SMELL 1: THE DISTRIBUTED MONOLITH
├─ Symptom: You have 20 microservices. But to release a single new feature, you have to coordinate the deployment of 5 specific microservices simultaneously in an exact order.
└─ Diagnosis: You have completely failed to draw the boundaries correctly. Your services are tightly coupled by domain logic. You have all the pain of microservices with none of the independent deployment benefits.

SMELL 2: THE GOD CLASS / GOD SERVICE
├─ Symptom: The `UserService` or the `user` table handles authentication, billing history, email preferences, avatar processing, and shipping addresses.
└─ Diagnosis: Total failure of the Single Responsibility Principle. The system is highly brittle because a change to the avatar logic might accidentally break the billing logic.

SMELL 3: LEAKY ABSTRACTIONS
├─ Symptom: The React UI frontend component knows that the backend database is MongoDB because it parses a field called `_id` instead of a generic `id`.
└─ Diagnosis: The storage implementation details have leaked across the network boundary into the presentation layer. If the backend switches to PostgreSQL, the frontend breaks.

SMELL 4: THE ENTITY MIRROR
├─ Symptom: The JSON payload returned by the API is exactly identical to the SQL database schema, down to the foreign key IDs.
└─ Diagnosis: You have no architectural boundary between storage and transport. You cannot optimize the database schema without instantly breaking all mobile clients.
```

## Part 5: The Architecture Decision Record (ADR)

```
Every major architectural decision MUST be documented. If it is not written down, the team will re-litigate the exact same decision 6 months later, wasting weeks of time.

ADR FORMAT (Store in `docs/adr/` in the repository):
1. Title: Short, imperative noun phrase (e.g., "ADR 004: Use PostgreSQL for Core Billing Ledger").
2. Status: Proposed, Accepted, Rejected, Deprecated, Superseded.
3. Context: What are the physical and business forces at play? Why do we need to make a decision right now?
4. Decision: The exact technical choice we are making. Be explicit.
5. Consequences: The good AND the bad. What does this decision cost us? (e.g., "We gain strict ACID compliance and transaction safety, but we lose the flexible JSON schema ability we had in MongoDB, requiring strict migrations going forward").

WHY ADRs MATTER:
When a new engineer joins the team and asks, "Why on earth did you choose this weird technology?", you do not get defensive. You hand them the ADR. They read the constraints you were under at the time, and they understand.
```

## Part 6: Designing for Failure (Resilience Engineering)

```
A good architecture assumes that everything will fail eventually. The network will partition, the database will lock, the third-party API will go down. Architecture is about bounding the blast radius.

THE CIRCUIT BREAKER PATTERN:
├─ Concept: If an upstream service (like a payment gateway) fails 5 times in a row, the circuit "trips" and opens.
├─ Action: For the next 60 seconds, any request to that service instantly returns an error or a fallback response without actually making the network call.
└─ Value: This prevents your application from hanging waiting for a dead service, which would exhaust your own thread pool and bring down your entire system in a cascading failure.

THE BULKHEAD PATTERN:
├─ Concept: Like a submarine, partition the system into isolated segments so that if one fills with water (fails), the others remain operational.
├─ Action: Allocate separate database connection pools for critical operations (Checkout) vs. non-critical operations (Reporting).
└─ Value: A heavy, unoptimized reporting query can exhaust the reporting pool, but the checkout process continues unaffected because it has its own dedicated connection pool.
```

## Part 7: APEX AI Execution Protocol for Architecture

```
When an AI operating under the APEX framework is asked to "design the architecture" for a new system, it must follow these rigid steps:

1. Refuse Premature Microservices: If a user asks to design a microservice architecture for a new, unproven startup idea, the AI MUST strongly recommend a Modular Monolith first, explaining the cost of distributed systems.
2. Ask for the Non-Functional Requirements (NFRs): The AI must ask: "What is the expected read/write ratio? What is the peak RPS? What is the maximum acceptable latency? What is the budget?" Architecture cannot be designed without physical constraints.
3. Separate State from Logic: The AI must explicitly design the system so that the stateful components (Databases, Caches) are completely segregated from the stateless business logic components.
4. Define the Interfaces: Before generating any implementation code, the AI must output the exact Interfaces (Ports) that define the boundaries between the layers.
```
