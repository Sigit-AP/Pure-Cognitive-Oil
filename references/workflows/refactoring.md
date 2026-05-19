# Refactoring Workflow — Deterministic-Cognitive-Infrastructure

> **"Refactoring is a controlled, mathematical operation. It is not 'rewriting.' It is not 'cleaning up.' It is a strict series of behavior-preserving transformations. If the external behavior changes, even slightly, you are not refactoring; you are rewriting, and you have lost control of the system. Refactoring without tests is just changing code and praying."**

## Part 1: The Definition of Refactoring

```
Refactoring is the disciplined process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure.

THE THREE INVIOLABLE RULES OF REFACTORING:
1. Tests Must Exist: You cannot mathematically refactor without a test suite. If you do not have automated tests, you are just editing text and hoping. You must lock the behavior in place with tests before altering the structure.
2. Behavior Must Not Change: Refactoring does not fix bugs. Refactoring does not add features. Refactoring does not improve performance (that is optimization). It only changes internal structure to make future changes safer and faster.
3. Tiny Steps: Refactoring is done in micro-commits. If a refactor takes longer than 15 minutes without a green test suite, you have taken too large a step. Revert the code and take a smaller step.

THE TWO HATS (Kent Beck's Principle):
Software development requires wearing two distinct hats, but NEVER at the same time.
├─ Hat 1: Adding a Feature. (You add tests, you add new code, the internal structure might get messy).
└─ Hat 2: Refactoring. (You do NOT add features, you do NOT add tests. You only restructure existing code to make it clean).
If you try to wear both hats simultaneously—fixing a bug while renaming variables and extracting classes—you will inevitably break the system and lose track of what caused the regression.
```

## Part 2: The Refactoring Protocol (Micro-Cycles)

```
When undertaking a refactor, follow this strict operational protocol. Do not rely on your memory or intuition.

STEP 1: THE SAFETY NET (Verification)
├─ Run the test suite. It MUST be 100% green. If it is red, fix the bug first (wear the Feature Hat) or revert your local changes.
├─ Check test coverage on the specific module you are about to touch.
└─ If coverage is low, write "Characterization Tests". These are tests that lock in the CURRENT behavior, even if the current behavior is technically a bug. Your goal is to preserve the exact current state.

STEP 2: IDENTIFY THE CODE SMELL
├─ Do not just "clean things up." Name the exact, formal code smell you are trying to eliminate.
├─ "I am extracting this method because it violates the Single Responsibility Principle."
└─ "I am introducing a Parameter Object because this function takes 7 arguments, which is a Data Clump smell."

STEP 3: THE MICRO-TRANSFORMATION
├─ Apply a known, named refactoring pattern (e.g., "Extract Variable", "Inline Class", "Replace Conditional with Polymorphism").
├─ Do not combine transformations. Do them exactly one at a time. Do not rename a variable AND extract a method in the same keystroke.

STEP 4: VERIFY AND COMMIT
├─ Run the test suite again.
├─ If green: Commit immediately. `git commit -m "refactor: extract variable for threshold calculation"`
└─ If red: Do not try to debug it for more than 60 seconds. Run `git checkout .` (Revert the change). You took too big a step. Find a smaller, safer step.

STEP 5: REPEAT
├─ Continue the cycle: Transform, Test, Commit. Transform, Test, Commit.
└─ When the structure is clean enough to easily add the new feature you were planning, stop refactoring. Switch back to the Feature Hat.
```

## Part 3: Common Architectural Refactoring Patterns

```
Moving beyond line-level refactoring (like renaming variables) to massive architectural refactoring.

PATTERN 1: THE STRANGLER FIG (Replacing Legacy Systems)
├─ Problem: You have a massive monolithic legacy system that cannot be rewritten all at once because it generates revenue.
├─ Solution: Build a new system around the edges of the old system, slowly starving it.
├─ Step A: Put an API Gateway, Reverse Proxy, or Load Balancer in front of the legacy system.
├─ Step B: Build ONE new feature or rewrite ONE small module in the new modern system.
├─ Step C: Configure the proxy to route traffic for that specific route/module to the new system.
└─ Step D: Repeat until the legacy system is totally starved of traffic, then power it off and delete it.

PATTERN 2: BRANCH BY ABSTRACTION (Large Scale Structural Changes)
├─ Problem: You need to replace a core dependency (e.g., the ORM, the UI framework, or a payment provider) but the work will take 6 weeks.
├─ Solution: Do not create a long-lived feature branch. It will become a merge-conflict nightmare.
├─ Step A: Create an Abstraction Layer (Interface) directly over the current dependency in the `main` branch.
├─ Step B: Update all client code to use the new Abstraction Layer instead of the direct dependency. (Commit and deploy this).
├─ Step C: Build the new implementation of the Abstraction Layer alongside the old one.
├─ Step D: Flip a feature flag or configuration value to route traffic to the new implementation in production.
└─ Step E: Once proven stable, delete the old implementation and the feature flag.

PATTERN 3: DECOUPLE VIA EVENTS (Breaking Procedural Chains)
├─ Problem: The User Service directly calls the Email Service, the Billing Service, and the Analytics Service when a user signs up. The code is a massive, brittle procedural script.
├─ Solution: Introduce an Event Bus or Message Queue.
├─ Step A: Have the User Service emit a single domain event: `UserCreatedEvent`.
└─ Step B: Have the other services subscribe to that event. The User Service no longer knows they exist. The architecture is now decoupled.
```

## Part 4: Recognizing the "Refactoring Trap"

```
Refactoring can easily become a destructive, obsessive compulsion if not strictly managed by business value.

TRAP 1: THE "CLEAN CODE" OBSESSION (Polishing the Turd)
├─ Symptom: An engineer spends three days refactoring a working, tested, 50-line utility function because the aesthetic "isn't elegant enough" or it doesn't use the absolute latest ECMAScript features.
├─ Diagnosis: You have lost sight of business value. Code is a tool to generate value, not poetry to be admired.
└─ Cure: If the code works, has tests, and isn't being actively modified for a new feature, leave it alone. Only refactor code that you actively need to change right now.

TRAP 2: THE "REWRITE DISGUISED AS A REFACTOR"
├─ Symptom: "I'm just going to quickly refactor the billing engine." The engineer deletes 500 lines of code, breaks 40 tests, and spends 2 weeks trying to get it compiling again.
├─ Diagnosis: You broke the rules. You did not take micro-steps. You did not keep the tests green. You executed a massive, risky rewrite and called it a refactor.
└─ Cure: Force a `git hard reset` to main. Start over using the strict Transform-Test-Commit protocol. If you cannot do it in small steps, you do not understand the system well enough to refactor it.

TRAP 3: REFACTORING WITHOUT TESTS (The Cowboy Maneuver)
├─ Symptom: Changing a core algorithm and just "clicking around the UI" or running a few manual CURL commands to see if it still works.
├─ Diagnosis: Reckless endangerment of the production system.
└─ Cure: Write the tests first. If the legacy code is too tangled to test directly, use the highly controlled "Extract Method" refactoring to isolate a seam, test that seam, and then proceed with the larger refactoring.

TRAP 4: PREMATURE ABSTRACTION
├─ Symptom: You notice two functions look slightly similar, so you spend 4 hours building a massive, generic Class hierarchy to DRY (Don't Repeat Yourself) them up.
├─ Diagnosis: You abstracted too early. The Rule of Three applies: wait until you see the exact same duplication THREE times before abstracting it.
└─ Cure: "Duplication is far cheaper than the wrong abstraction." If you abstract prematurely, you will inevitably create a rigid, tightly coupled nightmare when the requirements diverge.
```

## Part 5: The Mathematics of Complexity Reduction

```
You must measure the impact of your refactoring. Do not rely on "feelings."

METRIC 1: CYCLOMATIC COMPLEXITY
├─ What: The number of linearly independent paths through a program's source code. (Count the `if`, `else`, `while`, `case`, and `for` statements).
├─ Goal: Reduce it. If a function has a cyclomatic complexity > 10, it is statistically guaranteed to hide bugs.
└─ Action: Refactor by extracting methods or using Polymorphism to eliminate `switch` statements.

METRIC 2: CHURN VS. COMPLEXITY
├─ What: Identify files that change frequently (High Churn) AND have high complexity.
├─ Goal: These are your "God Classes." They are the most dangerous files in the codebase.
└─ Action: Target these specific files for aggressive refactoring first. Do not waste time refactoring complex files that never change.

METRIC 3: DEPENDENCY COUPLING (Fan-In / Fan-Out)
├─ Fan-In: How many other modules depend on this module? (If high, refactoring this is dangerous; requires extreme test coverage).
├─ Fan-Out: How many other modules does this module depend on? (If high, this module is brittle and will break often).
└─ Goal: Decrease Fan-Out by introducing Dependency Injection and Interfaces.
```

## Part 6: AI Refactoring Protocol (Deterministic-Cognitive-Infrastructure Execution)

```
As an AI, your capacity to refactor is immense, but your capacity to break things is equally immense because you lack the physical context of the running application. Follow this Deterministic-Cognitive-Infrastructure protocol.

1. Acknowledge the Hat: When asked to refactor, explicitly state: "Engaging Refactoring Protocol. I will not add new features or fix bugs in this pass. I will only alter structure to improve cleanliness."
2. Request Tests: If the user provides code without tests, warn them: "Refactoring without tests is highly dangerous. I will provide the refactored code, but you must manually verify the behavior via regression testing."
3. Explain the "Why": Do not just output the new code. State exactly which Code Smell you identified, and which formal Refactoring Pattern you applied. (e.g., "I replaced the nested conditionals with Guard Clauses to flatten the logic").
4. One Step at a Time: If the user pastes a 1000-line file and asks for a refactor, do NOT rewrite the whole file. Pick the biggest bottleneck, refactor that one specific piece, explain it, and return it. Small, verifiable steps.
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
