# 150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** 150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework
- **Path:** `references/knowledge-bases/anti-patterns.md`
- **Folder:** `knowledge-bases`
- **Document type:** Knowledge base reference
- **Primary audience:** Agents and maintainers needing reusable heuristics, patterns, and decision support.
- **Purpose:** Convert general knowledge into structured models, traps, decisions, and reusable checks.
- **Standard used:** Reference documentation with decision-support and checklist structure.

## When to Use

Use during planning, trade-off analysis, pattern recognition, and review.

## Inputs

Problem class, observed symptoms, constraints, options, anti-patterns, and domain assumptions.

## Expected Outputs

Selected model, recommended path, known traps, and review questions.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Model or pattern is named.
- [ ] Use case is clear.
- [ ] Anti-patterns or traps are stated.
- [ ] Decision aid is actionable.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Category 1: THINK Phase Traps (1-20)

### 1. Jumping to Implementation
**Trap:** Coding before understanding. **Fix:** THINK first. Restate problem 5 ways.
### 2. Single Hypothesis Trap
**Trap:** "It's definitely X." **Fix:** Generate minimum 4 hypotheses.
### 3. Premature Conclusion
**Trap:** Treating symptoms, not causes. **Fix:** Ask WHY five times.
### 4. Analysis Paralysis
**Trap:** Overthinking trivial decisions. **Fix:** Match depth to complexity.
### 5. Surface Reading
**Trap:** Taking requests literally without probing. **Fix:** Identify underlying goal.
### 6. Assumption Infection
**Trap:** Unlabeled assumptions treated as facts. **Fix:** Label EVERY assumption.
### 7. Constraint Blindness
**Trap:** Designing without considering constraints. **Fix:** Map ALL constraints.
### 8. Temporal Myopia
**Trap:** Only thinking about now. **Fix:** Apply past/present/future reasoning.
### 9. Core Abstraction Failure
**Trap:** Treating every problem as unique. **Fix:** Identify the underlying pattern.
### 10. Scope Creep Acceptance
**Trap:** Silently accepting expanding scope. **Fix:** Re-negotiate scope explicitly.
### 11. XY Problem
**Trap:** User asks for X but needs Y. Solving X without questioning. **Fix:** Ask "what are you trying to achieve?"
### 12. Bikeshedding
**Trap:** Spending time on trivial decisions, avoiding hard ones. **Fix:** Prioritize by impact.
### 13. Golden Hammer
**Trap:** "When you have a hammer, everything looks like a nail." **Fix:** Evaluate multiple tools/approaches.
### 14. Not Invented Here
**Trap:** Rejecting existing solutions because you didn't build them. **Fix:** Evaluate existing solutions first.
### 15. Cargo Cult Thinking
**Trap:** Copying patterns without understanding why they work. **Fix:** Understand the mechanism, not just the ritual.
### 16. Anchoring to First Idea
**Trap:** The first idea dominates thinking. **Fix:** Generate alternatives BEFORE evaluating.
### 17. Wishful Thinking
**Trap:** Assuming the best case is the likely case. **Fix:** Consider realistic and worst cases.
### 18. Complexity Addiction
**Trap:** Preferring complex solutions over simple ones. **Fix:** Start simple, add complexity only when needed.
### 19. Perfect-is-Enemy-of-Good
**Trap:** Refusing to ship until perfect. **Fix:** Define "done" criteria upfront.
### 20. False Dichotomy
**Trap:** Seeing only two options when more exist. **Fix:** Always ask "what's the third option?"

## Category 2: EXPLORE Phase Traps (21-35)

### 21. Assumption-Based Exploration
**Trap:** "I know this codebase" without reading. **Fix:** READ the actual code.
### 22. Partial Reading
**Trap:** Reading the first few lines and assuming the rest. **Fix:** Read the COMPLETE function.
### 23. Stale Knowledge
**Trap:** Using info from a previous session. **Fix:** Re-read files each session.
### 24. Ignoring Tests
**Trap:** Not reading test files. **Fix:** Tests ARE documentation — read them.
### 25. Missing Downstream
**Trap:** Checking what code DOES but not what USES it. **Fix:** Always find callers.
### 26. Ignoring Git History
**Trap:** Not checking recent changes. **Fix:** git log, git blame, recent PRs.
### 27. Config Blindness
**Trap:** Ignoring configuration files. **Fix:** Read ALL config files.
### 28. Environment Assumptions
**Trap:** Assuming local behavior = production behavior. **Fix:** Check environment config.
### 29. Survivor Sample Bias
**Trap:** Only looking at working examples. **Fix:** Also study failures and edge cases.
### 30. Copy-Paste Exploration
**Trap:** Finding one example and replicating without understanding. **Fix:** Understand the WHY.
### 31. Tunnel Vision Search
**Trap:** Searching only where you expect to find the answer. **Fix:** Broaden search systematically.
### 32. Documentation Trust
**Trap:** Trusting docs over runtime behavior. **Fix:** Code is truth. Docs can be outdated.
### 33. Ignoring Error Paths
**Trap:** Only reading the happy path. **Fix:** Trace error paths explicitly.
### 34. Depth Without Breadth
**Trap:** Deep-diving one area while ignoring adjacent areas. **Fix:** Map the whole landscape first.
### 35. Missing Runtime Context
**Trap:** Reading code without understanding runtime behavior. **Fix:** Run it, observe, add logging.

## Category 3: HYPOTHESIZE Phase Traps (36-50)

### 36. Confirmation Bias
**Trap:** Only seeking evidence that supports your hypothesis. **Fix:** Actively seek disconfirming evidence.
### 37. Anchoring to Prior
**Trap:** Prior belief overwhelms new evidence. **Fix:** Bayesian updating — let evidence dominate.
### 38. Base Rate Neglect
**Trap:** Ignoring how common something is in general. **Fix:** Consider base rates.
### 39. Conjunction Fallacy
**Trap:** A+B seems more likely than A alone. **Fix:** P(A∩B) ≤ P(A) always.
### 40. Narrative Fallacy
**Trap:** Creating compelling stories that aren't true. **Fix:** Require evidence for each causal link.
### 41. Post Hoc Reasoning
**Trap:** "After X, therefore because of X." **Fix:** Apply counterfactual test.
### 42. Correlation Causation
**Trap:** Assuming correlated events are causally linked. **Fix:** Check confounders, reverse causation.
### 43. Survivorship Bias
**Trap:** Only studying successes, not failures. **Fix:** Ask "where are the failures?"
### 44. Availability Cascade
**Trap:** Something repeated often feels true. **Fix:** Check original sources.
### 45. Neglecting Priors
**Trap:** Starting every hypothesis at 50%. **Fix:** Use domain knowledge for informative priors.
### 46. Over-Fitting Hypotheses
**Trap:** Hypothesis explains THIS case perfectly but nothing else. **Fix:** Test against other cases.
### 47. Phantom Pattern
**Trap:** Seeing patterns in random noise. **Fix:** Require statistical significance.
### 48. Escalation of Commitment
**Trap:** Doubling down on failing hypothesis. **Fix:** Pre-commit to abandonment criteria.
### 49. Information Bias
**Trap:** Gathering more data when you already have enough to decide. **Fix:** Act on sufficient evidence.
### 50. Clustering Illusion
**Trap:** Seeing meaningful clusters in random data. **Fix:** Check statistical significance.

## Category 4: Hallucination Traps (51-65)

### 51. Confabulation
**Trap:** Inventing plausible facts that aren't true. **Fix:** Source-check every factual claim.
### 52. False Precision
**Trap:** "Exactly 37.5% faster." **Fix:** State measurement method or qualify as estimate.
### 53. Phantom References
**Trap:** Citing documents or resources that don't exist. **Fix:** Verify every reference.
### 54. Confident Ignorance
**Trap:** Being certain about uncertain things. **Fix:** Calibrate confidence with evidence.
### 55. Pattern Completion
**Trap:** Generating what "should" be in the code vs what IS. **Fix:** READ, don't predict.
### 56. Temporal Hallucination
**Trap:** Mixing past and present truths. **Fix:** Verify currency of claims.
### 57. Authority Hallucination
**Trap:** Attributing statements to experts who never said them. **Fix:** Verify attributions.
### 58. Specificity Hallucination
**Trap:** Adding specific but invented details to sound credible. **Fix:** Question specifics.
### 59. Consensus Hallucination
**Trap:** "Everyone agrees..." when they don't. **Fix:** Check actual consensus.
### 60. History Hallucination
**Trap:** Misremembering previous conversations or decisions. **Fix:** Re-read actual history.
### 61. Code Hallucination
**Trap:** Describing code behavior without reading it. **Fix:** Always read the actual code.
### 62. Config Hallucination
**Trap:** Assuming config values without checking. **Fix:** Read the actual config file.
### 63. Version Hallucination
**Trap:** Stating wrong version numbers. **Fix:** Check package.json/Cargo.toml/etc.
### 64. API Hallucination
**Trap:** Describing API behavior that doesn't match reality. **Fix:** Read official docs, test.
### 65. Performance Hallucination
**Trap:** Making performance claims without benchmarks. **Fix:** Measure, don't guess.

## Category 5: BUILD Phase Traps (66-85)

### 66. Writing Code Before Test
**Trap:** Implementation first, test after. **Fix:** Test first. Always.
### 67. Test That Always Passes
**Trap:** Test passes before implementation. **Fix:** Watch it FAIL first.
### 68. Mock Everything
**Trap:** Testing mocks instead of real code. **Fix:** Use real code where possible.
### 69. While-I'm-Here
**Trap:** Making extra changes during a focused task. **Fix:** One concern per commit.
### 70. Fixing Tests Instead of Code
**Trap:** Changing tests to match wrong behavior. **Fix:** Tests are the spec. Fix the code.
### 71. Skipping Regression Tests
**Trap:** Only running the new test. **Fix:** Run FULL suite after every change.
### 72. Bundled Fixes
**Trap:** Multiple fixes in one commit. **Fix:** One fix per commit.
### 73. Keeping Reference Code
**Trap:** Commented-out old code "for reference." **Fix:** Git has the history. Delete.
### 74. Debug Code in Production
**Trap:** console.log, print statements left in. **Fix:** Remove before commit.
### 75. Copy-Paste Programming
**Trap:** Duplicating code instead of abstracting. **Fix:** DRY after third occurrence.
### 76. Premature Optimization
**Trap:** Optimizing before profiling. **Fix:** Profile first, optimize bottlenecks.
### 77. Clever Code
**Trap:** Writing code that's impressive but unreadable. **Fix:** Clear > clever.
### 78. Silent Failures
**Trap:** Catching exceptions and doing nothing. **Fix:** Handle, log, or propagate.
### 79. Stringly Typed
**Trap:** Using strings where enums or types should be used. **Fix:** Use the type system.
### 80. God Object
**Trap:** One class/module that does everything. **Fix:** Single responsibility.
### 81. Shotgun Surgery
**Trap:** One change requires modifying many files. **Fix:** Better encapsulation.
### 82. Leaky Abstraction
**Trap:** Implementation details leaking through the interface. **Fix:** Clean interfaces.
### 83. Circular Dependencies
**Trap:** A depends on B depends on A. **Fix:** Extract shared interface.
### 84. Magic Numbers
**Trap:** Unexplained literal values in code. **Fix:** Named constants.
### 85. Boolean Trap
**Trap:** Functions with boolean parameters that obscure meaning. **Fix:** Use enums or named options.

## Category 6: VERIFY Phase Traps (86-100)

### 86. Assuming Success
**Trap:** "It should work" without running. **Fix:** RUN the verification command.
### 87. Skimming Output
**Trap:** Glancing at output instead of reading. **Fix:** Read FULL output.
### 88. Ignoring Warnings
**Trap:** "It's just a warning." **Fix:** Warnings become errors. Address them.
### 89. Partial Verification
**Trap:** Only checking one aspect. **Fix:** Full verification sequence.
### 90. Stale Verification
**Trap:** Using old test results. **Fix:** Run FRESH each time.
### 91. Happy Path Only
**Trap:** Only testing the success case. **Fix:** Test error paths too.
### 92. "Works on My Machine"
**Trap:** Not accounting for environment differences. **Fix:** Test in target environment.
### 93. Unchecked Exit Code
**Trap:** Not checking if commands succeeded. **Fix:** Always check exit codes.
### 94. Regression Blindness
**Trap:** Not noticing existing tests that broke. **Fix:** Run FULL suite.
### 95. Completion Bias
**Trap:** Wanting to be done so badly that you cut corners. **Fix:** Follow the checklist.
### 96. Confidence Without Evidence
**Trap:** "I'm confident" without running checks. **Fix:** Evidence first, confidence second.
### 97. Selective Testing
**Trap:** Only running tests you expect to pass. **Fix:** Run ALL tests, especially ones you're unsure about.
### 98. Ignoring Performance
**Trap:** Functionally correct but performance-destroying. **Fix:** Include performance checks.
### 99. Security Afterthought
**Trap:** Not checking security implications. **Fix:** Include security review in verification.
### 100. Missing Edge Cases
**Trap:** Not testing boundary conditions. **Fix:** Test at boundaries: 0, 1, max, empty, null.

## Category 7: Communication Traps (101-115)

### 101. Jargon Overload
**Trap:** Using technical terms with non-technical audience. **Fix:** Calibrate to audience.
### 102. Information Dump
**Trap:** Giving all information at once. **Fix:** Progressive disclosure.
### 103. Burying the Lead
**Trap:** Most important info hidden in the middle. **Fix:** Lead with the key message.
### 104. False Certainty in Language
**Trap:** "This will definitely work." **Fix:** "I'm X% confident because..."
### 105. Answering Unasked Questions
**Trap:** Providing information nobody requested. **Fix:** Answer what was asked.
### 106. Defensive Communication
**Trap:** Justifying before explaining. **Fix:** Explain first, justify if asked.
### 107. Ambiguous Pronouns
**Trap:** "It" and "this" without clear referents. **Fix:** Be specific.
### 108. Missing Context
**Trap:** Assuming shared context. **Fix:** Provide enough context for the reader.
### 109. Wall of Text
**Trap:** Long unstructured paragraphs. **Fix:** Use headers, lists, structure.
### 110. Premature Abstraction in Explanation
**Trap:** Starting with theory instead of examples. **Fix:** Concrete example first, then generalize.
### 111. Curse of Knowledge
**Trap:** Explaining as if the reader knows what you know. **Fix:** Explain from their perspective.
### 112. Passive Voice Evasion
**Trap:** "Mistakes were made" instead of owning errors. **Fix:** "I made an error in..."
### 113. Over-Qualifying
**Trap:** So many caveats that the message is lost. **Fix:** State clearly, caveat briefly.
### 114. Premature Solution
**Trap:** Proposing solutions before establishing shared understanding. **Fix:** Align on problem first.
### 115. Monologue Mode
**Trap:** Long output without checking understanding. **Fix:** Check in periodically.

## Category 8: System/Architecture Traps (116-135)

### 116. Distributed Monolith
**Trap:** Microservices that must deploy together. **Fix:** True independence or merge.
### 117. Resume-Driven Development
**Trap:** Choosing tech for CV, not for the problem. **Fix:** Choose what solves the problem best.
### 118. Second System Effect
**Trap:** Rewrite is always over-designed. **Fix:** Incremental migration.
### 119. Lava Flow
**Trap:** Dead code/systems nobody dares remove. **Fix:** Document, deprecate, remove.
### 120. Platform Trap
**Trap:** Building a platform when you need a feature. **Fix:** Build the feature, extract later.
### 121. Inner Platform Effect
**Trap:** Reimplementing the runtime inside your app. **Fix:** Use the language/platform features.
### 122. Astronaut Architecture
**Trap:** Over-abstracted to the point of uselessness. **Fix:** Concrete requirements first.
### 123. Big Ball of Mud
**Trap:** No architecture, everything depends on everything. **Fix:** Define boundaries.
### 124. Vendor Lock-In Blindness
**Trap:** Deep integration without abstraction layer. **Fix:** Adapter pattern for external dependencies.
### 125. Shiny Object Syndrome
**Trap:** Adopting new technology without evaluation. **Fix:** Proven > new unless proven advantage.
### 126. Normalization of Deviance
**Trap:** Gradually accepting worse standards. **Fix:** Regularly audit against original standards.
### 127. Technical Debt Denial
**Trap:** Refusing to acknowledge growing debt. **Fix:** Track and prioritize debt explicitly.
### 128. Integration Test Pyramid Inversion
**Trap:** Many integration tests, few unit tests. **Fix:** Pyramid: many unit, fewer integration, fewest E2E.
### 129. Microservice Envy
**Trap:** Splitting into microservices prematurely. **Fix:** Start monolith, split when needed.
### 130. YOLO Deployment
**Trap:** Deploying without rollback plan. **Fix:** Canary deployment, feature flags, rollback procedure.
### 131. Configuration Sprawl
**Trap:** Config spread across files, env vars, databases, flags. **Fix:** Centralize, document.
### 132. Observability Gap
**Trap:** Can't tell what's happening in production. **Fix:** Logging, metrics, tracing from day one.
### 133. Single Point of Failure
**Trap:** One component whose failure takes down everything. **Fix:** Redundancy, failover.
### 134. Blast Radius Ignorance
**Trap:** Not knowing the impact of a failure. **Fix:** Map blast radii for all critical components.
### 135. Feature Flag Cemetery
**Trap:** Old feature flags never cleaned up. **Fix:** Expiration dates for all flags.

## Category 9: Decision/Process Traps (136-155)

### 136. Decision by Committee
**Trap:** Everyone has a voice, nobody has authority. **Fix:** DACI (Driver, Approver, Contributors, Informed).
### 137. Infinite Planning
**Trap:** Planning endlessly instead of starting. **Fix:** Plan enough to start, refine as you learn.
### 138. Status Quo Bias
**Trap:** Keeping current approach because "it works." **Fix:** Regularly evaluate alternatives.
### 139. Outcome Bias
**Trap:** Judging decisions by outcomes, not process. **Fix:** Good process > lucky outcomes.
### 140. Recency Bias in Post-Mortems
**Trap:** Focusing on the last failure, not the pattern. **Fix:** Aggregate across incidents.
### 141. Hero Culture
**Trap:** Relying on one person for critical knowledge. **Fix:** Document, cross-train, bus factor > 1.
### 142. Artificial Urgency
**Trap:** Everything is "urgent" so nothing is prioritized. **Fix:** True priority = impact × time-sensitivity.
### 143. Metric Fixation
**Trap:** Optimizing for the metric instead of the goal. **Fix:** Metrics are proxies, not goals (Goodhart).
### 144. Lack of Exit Criteria
**Trap:** No definition of "done." **Fix:** Define done before starting.
### 145. Premature Consensus
**Trap:** Agreement without genuine discussion. **Fix:** Explicitly request disagreement.
### 146. Process Theater
**Trap:** Following process rituals without genuine engagement. **Fix:** Challenge process regularly.
### 147. Tool Over Process
**Trap:** Adopting tools without fixing underlying process issues. **Fix:** Fix process first, then tool.
### 148. Silo Thinking
**Trap:** Optimizing your area at the expense of the whole. **Fix:** System-level thinking.
### 149. The Rewrite Trap
**Trap:** "Let's just rewrite it from scratch." **Fix:** Incremental improvement almost always wins.
### 150. Not My Problem
**Trap:** Ignoring issues outside your immediate scope. **Fix:** Flag and communicate, even if not your fix.
### 151. Phantom Requirements
**Trap:** Building for requirements nobody actually stated. **Fix:** Trace every requirement to its source.
### 152. Gold Plating
**Trap:** Adding polish beyond what's needed. **Fix:** Ship when requirements are met.
### 153. Fear of Shipping
**Trap:** Endless refinement instead of deploying. **Fix:** Define acceptance criteria. Meet them. Ship.
### 154. Herd Mentality
**Trap:** Doing what everyone else does without evaluation. **Fix:** Independent analysis.
### 155. Risk Avoidance vs Risk Management
**Trap:** Avoiding all risk instead of managing it. **Fix:** Accept calculated risks with mitigation.

<!-- DCI-RELATED-START -->

## Related DCI references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [Workflows Reference Index](../workflows/INDEX.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)

<!-- DCI-RELATED-END -->
