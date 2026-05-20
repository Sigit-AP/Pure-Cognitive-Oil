# Technical Writing Workflow — Deterministic-Cognitive-Infrastructure

> **"Code is read ten times more than it is written. Documentation is the critical interface between the machine's absolute complexity and the human's finite, easily overwhelmed working memory. If the documentation is wrong, missing, or misleading, the system is effectively unusable, regardless of how mathematically elegant the underlying code is. Documentation is code."**

## Part 1: The Epistemology of Documentation

```
Documentation is not an afterthought to be bolted on at the end of a sprint; it is a core architectural artifact. It is the physical manifestation of the system's intent. Code tells you *how* a system currently behaves. Documentation tells you *why* it was built that way.

THE THREE LAWS OF TECHNICAL WRITING:
1. Empathy for the Reader: The reader is almost certainly stressed, hurried, and trying to solve a specific, painful problem in production. They do not want to read a novel. They do not care about how clever you are. Get straight to the point.
2. The Curse of Knowledge: You know too much about the system you built. You assume the reader knows what a "Hydration Context" or a "Zookeeper Quorum" is. They do not. Define your acronyms explicitly. Start from First Principles. Assume the reader is highly intelligent but lacks the local context.
3. Code Rots, Docs Rot Faster: Code that doesn't compile throws a loud error. Documentation that is wrong silently misleads the reader for days, causing massive frustration. Documentation must be structurally tested or physically coupled to the codebase (Docs-as-Code).
```

## Part 2: The Four Types of Documentation (The Divio Framework)

```
The most common mistake in documentation is mixing different modes of learning. Do not mix these four types. They serve completely different psychological needs.

1. TUTORIALS (Learning-Oriented)
├─ Goal: Take the user by the hand from zero knowledge to a working "Hello World".
├─ Style: Sequential, step-by-step, reassuring, heavily prescriptive.
└─ Rule: It MUST mathematically work. If a tutorial fails on Step 3 because a dependency changed, the user will abandon the product forever. Test your tutorials in CI.

2. HOW-TO GUIDES (Task-Oriented)
├─ Goal: Solve a specific, real-world, bounded problem (e.g., "How to configure PostgreSQL connection pooling for Serverless environments").
├─ Style: Recipe-based, highly focused, completely practical.
└─ Rule: Assume the user already knows the basics of the system. Skip the philosophical introduction. Just give them the exact commands and configurations.

3. REFERENCE (Information-Oriented)
├─ Goal: Provide the exact, unvarnished, exhaustive facts about the machinery (e.g., API Specifications, CLI arguments, database schemas).
├─ Style: Dry, structured, highly indexed, comprehensive, and automatically generated if at all possible.
└─ Rule: Do not explain *why* here. Only explain *what*. (e.g., "The `--force` flag overrides the lockfile").

4. EXPLANATION (Understanding-Oriented)
├─ Goal: Explain the deep architectural philosophy, the trade-offs, and the "Why" behind the system (e.g., "Why we migrated from MongoDB to Event Sourcing").
├─ Style: Discursive, high-level, historical, theoretical.
└─ Rule: Keep it completely out of the How-To guides. People reading How-To guides are trying to fix bugs; people reading Explanations are trying to design architectures.
```

## Part 3: Writing the Perfect README.md

```
The `README.md` is the physical front door to your codebase. If the front door is broken, locked, or confusing, nobody will enter the house.

THE INVIOLABLE REQUIRED SECTIONS:
1. The 1-Sentence Pitch: What does this repository actually do? (No corporate jargon, no marketing speak). "A high-performance Rust microservice that resizes images from S3."
2. Prerequisites: What exact versions of software must be installed on the host machine? (Node 18.x, Docker 24+, Postgres 15).
3. Local Setup (The 3-Command Rule): Exactly how to boot the app locally. If it takes more than 3 commands, your developer experience is broken.
   ```bash
   git clone git@github.com:company/repo.git
   npm install
   npm run dev
   ```
4. Environment Variables: A markdown table of ALL required `.env` variables, what they mean, their data types, and where a new developer can securely obtain the secret keys.
5. Architecture Diagram (Mandatory for complex systems): A simple Mermaid.js diagram embedded in the markdown showing how the pieces (DB, Cache, Queue) connect.
```

## Part 4: Code Comments (The Micro-Docs)

```
Comments in code are a dangerous double-edged sword. A comment is a failure to express the intent purely through code syntax.

THE RULES OF COMMENTING:
├─ Rule 1: Do not comment the WHAT. The code syntax already tells you the "what."
│  ❌ `// Increment i by 1`
│  ❌ `i++;`
├─ Rule 2: Comment the WHY. Explain the business reason, the weird edge case, or the external constraint that forced you to write the code this way. (Chesterton's Fence).
│  ✅ `// We multiply by 1.05 to account for the legacy EU VAT discrepancy discovered in Jira Issue #402. Do not remove this until Q3.`
│  ✅ `price = base * 1.05;`
└─ Rule 3: If the code is so chaotic and complex that it requires a massive paragraph to explain the WHAT, you must stop writing the comment and refactor the code to be readable instead. Extract the logic into a well-named function. `const isUserEligibleForDiscount = ...`
```

## Part 5: API Documentation (OpenAPI / Docs-as-Code)

```
Never, ever write API documentation by hand in a Confluence Wiki or a Google Doc. It will be out of date the very day you publish it, actively lying to your frontend engineers.

THE DOCS-AS-CODE PHILOSOPHY:
├─ Define the API strictly using the OpenAPI (Swagger) specification in YAML or JSON.
├─ Store the OpenAPI file directly in the git repository right next to the backend code. It must go through the exact same PR review process as the code.
├─ Generate the beautiful, interactive HTML documentation automatically via the CI/CD pipeline (using tools like Redoc or Swagger UI) and host it on a static site.
└─ The Deterministic-Cognitive-Infrastructure Move: Generate the server-side TypeScript interfaces and the client-side SDKs directly from the OpenAPI spec. This mathematically guarantees that the executing code physically cannot drift from the published documentation. If they drift, the compiler fails.
```

## Part 6: Incident Post-Mortems (The Most Valuable Documents)

```
An incident post-mortem is the highest-value technical document a company can produce. It is written in blood and lost revenue. It must be brutally honest.

POST-MORTEM WRITING PROTOCOL:
1. Blamelessness: Never use names when describing the failure. "The engineer executed the script" not "Bob broke the database." The system failed to protect the engineer.
2. The Timeline: Provide a strict, minute-by-minute log of the incident. (03:00 - Alert fired. 03:05 - IC joined).
3. The 5 Whys: Drill down to the systemic root cause. (e.g., Why did the DB crash? -> Heavy query. Why was it heavy? -> Missing index. Why was the index missing? -> The ORM migration tool failed silently. Why did it fail silently? -> The CI pipeline ignored exit codes).
4. Action Items: Every post-mortem MUST result in strictly assigned Jira tickets to fix the systemic flaws. A post-mortem without action items is just complaining.
```

## Part 7: Architecture Decision Records (ADRs)

```
Every time a team makes a significant technical choice (e.g., "We are using GraphQL instead of REST"), it must be recorded. Human memory is highly volatile.

ADR STRUCTURE:
1. Title: The decision (e.g., "ADR 005: Adopt GraphQL for Mobile API").
2. Context: The situation forcing the decision. What constraints are we under?
3. Options Considered: What were the alternatives? (e.g., gRPC, REST, tRPC). Why were they rejected?
4. Decision: The final choice.
5. Consequences: The explicit trade-offs. "We get faster mobile iteration, but we now have to solve the N+1 query problem aggressively, which requires adding DataLoader to every resolver."
```

## Part 8: Runbooks (The Emergency Instructions)

```
A Runbook is a specific type of How-To guide designed to be read at 3:00 AM by a panicked engineer when production is critically down.

THE RUNBOOK LAWS:
├─ No Context: Do not explain the philosophical history of how the system works. Just give the literal commands.
├─ Copy-Paste Ready: Every bash command must be executable directly from the clipboard. Avoid `<insert_id_here>` stand-ins when possible; use pre-set environment variables.
├─ The Rollback: Every Runbook must have an explicit "How to revert this specific action" section immediately following the action, in case the mitigation makes things worse.
└─ Ownership: A Runbook must state exactly which team owns the service, and provide the exact escalation phone number for the on-call engineer.
```

## Part 9: AI Prompt Engineering (Writing for the Machine)

```
Writing technical documentation for AI consumption (like Deterministic-Cognitive-Infrastructure) is slightly different than writing for humans.

THE AI-OPTIMIZED DOC FORMAT:
├─ High Density: AI models have token limits. Remove all filler words, marketing fluff, and pleasantries.
├─ Explicit Constraints: Use words like MUST, NEVER, ALWAYS. AI models respond heavily to absolute language.
├─ Code Fences: Always enclose code examples in properly typed markdown fences (e.g., ` ```typescript `). The AI parser relies on these boundaries.
└─ Declarative Intent: Start files with a clear system prompt override: `> You are an expert in Rust. Follow these rules...`
```

## Part 10: Deterministic-Cognitive-Infrastructure AI Execution Protocol (The Scribe)

```
When an AI operating under the Deterministic-Cognitive-Infrastructure framework is asked to generate documentation, it must elevate the request from mere text generation to architectural structuring.

1. Identify the Audience: The AI must immediately adjust its tone. A highly technical architectural ADR (Architecture Decision Record) should be dense, precise, and adversarial. A user-facing tutorial should be simple, encouraging, and linear.
2. Structure Over Prose: The AI must use markdown headers, bolding, bullet points, and syntax-highlighted code blocks aggressively. Avoid massive walls of text. Engineers skim; they do not read.
3. Validate Commands: The AI must mathematically ensure that any bash commands or code snippets it provides in a README or Tutorial are syntactically correct, safe, and sequentially logical.
4. Enforce the "Why": If the user asks the AI to comment a block of code, the AI must deduce the *business logic* or the *architectural constraint* and write a comment explaining the WHY, explicitly refusing to write redundant comments about the WHAT.
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
