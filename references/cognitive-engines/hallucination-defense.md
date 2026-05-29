# Hallucination Defense System — Deterministic-Cognitive-Infrastructure

> **"A hallucination is not a bug in an LLM; it is a fundamental feature of its architecture. It is a probabilistic text generator, not a relational database of truth. To rely on an LLM for factual recall without a rigid, deterministic grounding mechanism is engineering malpractice. You must build systems and workflows that assume the model will confidently lie."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Hallucination Defense System — Deterministic-Cognitive-Infrastructure
- **Path:** `references/cognitive-engines/hallucination-defense.md`
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

## Part 1: The Anatomy of a Hallucination

```
To defend against hallucinations, you must understand exactly why and how they occur. LLMs do not "know" things; they predict the next statistically likely token based on their training data and current context. When probability overrides reality, a hallucination is born.

TYPE 1: THE PLAUSIBLE FABRICATION (The Most Dangerous)
├─ Mechanism: The model generates an API endpoint, a function signature, or a library name that looks exactly like how the creators *would* have designed it, but they didn't.
├─ Example: Generating `db.users.findByEmail()` instead of `db.users.findOne({ where: { email } })` in an ORM that doesn't support magic methods.
└─ Why it's dangerous: It bypasses human intuition because it "looks right." It conforms to standard naming conventions, so the human reviewer skips over it.

TYPE 2: THE VERSION BLENDING (The Chimera)
├─ Mechanism: The model mixes syntax, features, or constraints from React 16, React 18, and React 19 into a single, uncompilable chimera.
├─ Example: Using the React 19 `use()` hook inside a React 16 Class Component lifecycle method.
└─ Why it's dangerous: It relies on facts that are true in isolation, but mathematically false in combination.

TYPE 3: THE OVERCONFIDENT EXTRAPOLATION
├─ Mechanism: The model takes a recognized pattern and applies it far beyond its domain of validity.
├─ Example: Assuming a massive 100GB dataset can be processed using `Array.map()` in memory because that pattern worked on a 10-item array in the training data.
└─ Why it's dangerous: It leads to catastrophic performance failures in production that pass unit tests perfectly.

TYPE 4: THE SATELLITE HALLUCINATION
├─ Mechanism: The model accurately solves the core algorithmic problem, but hallucinates the surrounding structural context (e.g., the import statement, the CSS class names, the file path).
├─ Example: Correctly writing a complex sorting algorithm, but importing a helper from `import { sortHelper } from 'lodash/math'` (which doesn't exist).
└─ Why it's dangerous: It breaks the build despite the core logic being sound, leading developers on wild goose chases for missing dependencies.

TYPE 5: THE "YES-MAN" COMPLIANCE (Sycophancy)
├─ Mechanism: The model agrees with a false premise provided by the human to avoid contradicting the user.
├─ Example: Human: "How do I use the `crypto.encrypt()` method in Node.js?" Model: "To use the `crypto.encrypt()` method..." (It doesn't exist; the human meant `crypto.createCipheriv`).
└─ Why it's dangerous: It reinforces the human's incorrect mental model.
```

## Part 2: The Grounding Protocol

```
Grounding is the process of forcing the probabilistic model to anchor its generation to deterministic, verifiable reality (files, command outputs, official docs).

GROUNDING RULE 1: THE "JUST READ IT" IMPERATIVE
Never ask the model to recall an API signature, a database schema, or a configuration file from memory if you have access to the actual file.
├─ ❌ Prompt: "Write a query to update the user's password based on Prisma." (Relies on model memory of Prisma, which might be outdated or mixed with TypeORM).
├─ ✅ Prompt: "Read `schema.prisma`. Read the `User` model specifically. Then write a query to update the password." (Grounded in local reality).

GROUNDING RULE 2: THE RAG (Retrieval-Augmented Generation) PATTERN
If you do not have the file locally, you must fetch the documentation before generating code.
├─ ❌ Prompt: "How do I implement Stripe webhooks in Node.js?" (Relies on potentially stale 2021 training data, missing recent API version changes).
├─ ✅ Prompt: "Use web search to find the latest Stripe Webhook documentation for Node.js. Read the exact implementation example. Then apply it to my code."

GROUNDING RULE 3: THE "CITE YOUR SOURCES" CONSTRAINT
Force the model to explicitly link its generated code to the context window.
├─ Constraint: "For every function you call from the external library, add an inline comment citing the exact line number or section from the provided documentation where that function is defined."
└─ Mechanism: If the model cannot find the line number, the attention mechanism will flag the hallucination internally, drastically reducing the probability of generating it.

GROUNDING RULE 4: ZERO-SHOT TO FEW-SHOT
Do not expect the model to invent the correct pattern from a blank slate.
├─ Provide an existing, verified example from the current codebase.
└─ "Here is how we implemented the Auth controller. Using this exact same pattern, dependency injection structure, and error-handling format, implement the Billing controller."
```

## Part 3: Hallucination Detection (The Skeptic's Lens)

```
When reviewing generated code (either your own output as an AI, or output from another model), apply the Skeptic's Lens. Assume every external reference is a hallucination until proven otherwise by a compiler or direct verification.

DETECTION VECTOR 1: THE "TOO GOOD TO BE TRUE" API
├─ Did the model generate an API endpoint that perfectly solves your highly specific business problem in exactly one line of code?
├─ Example: `import { handleComplexSubscriptionProration } from 'stripe'`
└─ Action: Immediately verify this function exists in the official docs. It almost certainly does not. The model invented a function to solve your problem because you asked it to solve your problem.

DETECTION VECTOR 2: THE INCONSISTENT IMPORT
├─ Do the imports at the top of the file mathematically match the usage at the bottom?
├─ Did the model import `useEffect` but never use it? Did it use `useRef` but never import it?
└─ Action: Run a linter immediately. Linters are deterministic and immune to hallucinations.

DETECTION VECTOR 3: THE PHANTOM DEPENDENCY
├─ Did the model suggest running `npm install some-perfect-library-name`?
├─ Action: Run `npm view some-perfect-library-name` before installing it. Hallucinated package names are a major security risk. Attackers monitor AI outputs and register hallucinated package names with malicious payloads (Package Planting/Typosquatting attacks).

DETECTION VECTOR 4: THE CONFIDENCE TO TRUTH MISMATCH
├─ LLMs are trained (via RLHF) to sound authoritative and helpful, even when guessing wildly. Extreme confidence ("This is the absolute correct way to do it") is often a mask for low-probability generation.
└─ Action: Whenever you see extreme confidence regarding a complex, nuanced architectural decision, lower your trust. Complex decisions always have trade-offs. If trade-offs aren't explicitly mentioned and weighed, it is a shallow, ungrounded generation.
```

## Part 4: The 5-Step Defabrication Workflow

```
When a hallucination is detected, you must defabricate the context window. If you do not explicitly purge the lie, the model will double down on it in subsequent turns to maintain conversational consistency.

STEP 1: HARD HALT
Do not politely write "That didn't work." The model will often apologize profusely and then generate a slightly different hallucinated API to appease you.

STEP 2: EXPLICIT CONTRADICTION
"Stop. The function `db.users.findByEmail()` does not exist in our Prisma client. You hallucinated it."

STEP 3: PROVIDE THE GROUND TRUTH
"Here is the actual output of the `PrismaClient` type definition. Read it carefully."

STEP 4: FORCE STATE RESET
"Discard your previous approach entirely. Do not attempt to modify or 'fix' the `findByEmail` function. Start over from scratch using the `findOne` method shown in the type definition."

STEP 5: VERIFICATION LOCK
"Write the new code, and explain exactly why it works based ONLY on the type definition I just provided. Do not reference external knowledge."
```

## Part 5: Architectural Defenses Against AI

```
You can build your software architecture to be naturally resistant to LLM hallucinations, ensuring that even if the AI lies, the system catches it instantly.

DEFENSE 1: STRONG TYPING (The Ultimate Shield)
├─ TypeScript, Rust, Go, and Java are highly resistant to hallucinations because the compiler acts as an absolute, deterministic truth oracle. The AI cannot lie about a struct definition if the compiler enforces it.
├─ Python (without typing) and vanilla JavaScript are highly vulnerable because hallucinations survive the build step and explode at runtime.
└─ Strategy: When using LLMs, rely heavily on strict type definitions. Pass the `.d.ts` or interface files directly into the context window as grounding material.

DEFENSE 2: TDD (Test-Driven Development) Separation
├─ If you ask an LLM to generate tests AND the implementation code simultaneously, it will hallucinate tests that perfectly pass its own hallucinated code. It is grading its own homework.
├─ Strategy: Write the tests yourself (or have the LLM write them based strictly on a verified spec), verify the tests fail (Red), and ONLY THEN ask the LLM to write the implementation to make the tests pass (Green).

DEFENSE 3: CONTEXT WINDOW CONSTRICTION
├─ The larger the context window, the more "attention dilution" occurs. If you pass 100,000 tokens of code to an LLM, the model will start hallucinating connections between completely unrelated files.
└─ Strategy: Keep the context window tight and surgically precise. Pass only the 3 files that actually matter for the specific function being modified.

DEFENSE 4: THE "I DON'T KNOW" BAIT (Prompt Engineering)
├─ Models are heavily penalized in training for saying "I don't know," which encourages guessing. You must explicitly give them permission to admit ignorance to override their training.
└─ System Prompt Addition: "If the provided context does not contain the answer, or if you are unsure of the exact API signature, output exactly: 'INSUFFICIENT CONTEXT. REQUESTING DOCUMENTATION.' Do not guess under any circumstances."
```

## Part 6: Measuring Hallucination Rates

```
You must track how often the system generates ungrounded claims.

METRIC 1: THE REVERIFICATION BOUNCE RATE
How many times per session do you have to tell the AI "That function doesn't exist" or "That threw a syntax error"? If this number is greater than 2 per hour, your context window is polluted, your grounding prompts are weak, or you are operating in a domain the model doesn't understand.

METRIC 2: THE COMPILER REJECTION RATE
If you are using a strongly typed language, how often does the first copy-paste from the AI fail the compiler? A high compiler rejection rate means the AI is hallucinating types or imports.

RESOLUTION:
If hallucination rates are high, do not ask the AI to "try harder." It cannot. You must provide it with higher-density grounding material (schemas, types, documentation) and reduce the scope of its autonomy to smaller chunks.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Advanced Reference Index](../advanced/INDEX.md)
- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [🦾✨ DRAFT: Deterministic-Cognitive-Infrastructure - Context Integrity & Zero-Hallucination Protocol](../cognitive-engines/zero-hallucination.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)

<!-- DCI-RELATED-END -->
