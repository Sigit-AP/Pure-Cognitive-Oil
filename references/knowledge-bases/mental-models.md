# 150+ Mental Models — Deterministic-Cognitive-Infrastructure Framework

## Domain 1: Core Reasoning (1-15)

### 1. First Principles
**What:** Decompose to fundamental truths, rebuild from there.
**When:** Novel problems, architecture decisions. **Anti-pattern:** Reasoning by analogy alone.

### 2. Inversion
**What:** Ask "how to fail" then prevent each failure mode.
**When:** Risk assessment, security, design. **Anti-pattern:** Only thinking about success.

### 3. Second-Order Thinking
**What:** Beyond immediate effects — what happens AFTER the first effect?
**When:** API changes, migrations. **Example:** "Add required field → existing clients break → need migration → need backward compat."

### 4. Occam's Razor
**What:** Simplest explanation is usually correct. Test simple hypotheses first.
**When:** Debugging. **Anti-pattern:** Jumping to exotic explanations.

### 5. Hanlon's Razor
**What:** Attribute to mistake before malice. **When:** Code review, incident analysis.

### 6. Probabilistic Thinking
**What:** Think in probabilities, not certainties. Assign likelihoods. **When:** Risk, prioritization.

### 7. Margin of Safety
**What:** Build buffer beyond what you think you need. **When:** Capacity planning, timeouts, resource limits.

### 8. Map vs Territory
**What:** The model is not the reality. Docs can be wrong. Code is truth.
**When:** Always. **Anti-pattern:** Trusting documentation over runtime behavior.

### 9. Reductio ad Absurdum
**What:** Take an argument to its logical extreme to test validity.
**When:** Design review. **Example:** "If we apply this pattern everywhere, does the codebase become better or worse?"

### 10. Falsifiability
**What:** A useful hypothesis must be disprovable. If nothing could prove it wrong, it's useless.
**When:** Hypothesis generation. **Anti-pattern:** Unfalsifiable explanations ("it's intermittent").

### 11. Bayesian Reasoning
**What:** Update beliefs proportionally to evidence strength.
**When:** Every hypothesis evaluation. Prior × Likelihood = Posterior.

### 12. Abductive Reasoning
**What:** Inference to the best explanation. Which hypothesis best explains ALL evidence?
**When:** Debugging complex issues. **Anti-pattern:** Picking the first explanation that fits SOME evidence.

### 13. Steelmanning
**What:** Construct the strongest possible version of an opposing argument before countering.
**When:** Design debates, code review, evaluating alternatives.

### 14. Satisficing vs Optimizing
**What:** Sometimes "good enough" beats "perfect." Know which situation you're in.
**When:** Time-constrained decisions. **Anti-pattern:** Optimizing trivial choices.

### 15. Chesterton's Fence
**What:** Before removing something, understand why it was put there.
**When:** Refactoring, removing code/features. **Anti-pattern:** Deleting "unnecessary" code without understanding its purpose.

## Domain 2: Systems Thinking (16-30)

### 16. Feedback Loops
**What:** Output becomes input. Positive loops amplify, negative loops stabilize.
**Example:** Bug → Quick fix → Technical debt → More bugs (positive loop).

### 17. Emergence
**What:** System behavior not predictable from individual components.
**Example:** Individual microservices work fine; together they create cascading failures.

### 18. Bottleneck Theory (Theory of Constraints)
**What:** System throughput is limited by the narrowest point. Optimize ONLY the bottleneck.
**Anti-pattern:** Optimizing non-bottleneck components.

### 19. Leverage Points
**What:** Small changes in the right place produce large system effects.
**When:** Optimization, architecture. Find where 1% effort yields 50% improvement.

### 20. Homeostasis
**What:** Systems resist change and return to equilibrium.
**Example:** Teams adopt new tools, then drift back to old habits without sustained effort.

### 21. Cascading Failures
**What:** One failure triggers another, creating a chain reaction.
**When:** System design. **Prevention:** Circuit breakers, bulkheads, graceful degradation.

### 22. Non-Linear Dynamics
**What:** Small inputs can produce disproportionately large outputs (and vice versa).
**Example:** One extra database index removes 99% of query latency.

### 23. Carrying Capacity
**What:** Every system has a maximum sustainable load. Exceeding it causes degradation.
**When:** Capacity planning. **Anti-pattern:** Assuming linear scaling.

### 24. Phase Transitions
**What:** Gradual changes accumulate until a sudden shift occurs.
**Example:** Tech debt accumulates slowly, then suddenly makes development higher-scale slower.

### 25. Antifragility
**What:** Systems that get stronger from stress (opposite of fragile).
**Example:** Chaos engineering — injecting failures to build resilience.

### 26. Dead Man's Switch
**What:** Default action when no signal received. **When:** Monitoring, health checks, timeouts.

### 27. Redundancy
**What:** Duplicate critical components so failure of one doesn't cause system failure.
**When:** High-availability design. **Trade-off:** Cost vs reliability.

### 28. Graceful Degradation
**What:** When partial failure occurs, serve reduced functionality rather than total failure.
**When:** Every user-facing system.

### 29. Back Pressure
**What:** When a system is overwhelmed, signal upstream to slow down.
**When:** Message queues, API rate limiting, stream processing.

### 30. Hysteresis
**What:** System behavior depends on history, not just current input.
**Example:** Auto-scaler scales up at 80% CPU but scales down at 60% (prevents oscillation).

## Domain 3: Decision Making (31-45)

### 31. Reversible vs Irreversible Decisions
**What:** Reversible → decide fast, iterate. Irreversible → invest in analysis.

### 32. Expected Value
**What:** EV = Σ P(outcome) × Value(outcome). Choose highest EV.
**When:** Comparing options with uncertain outcomes.

### 33. Opportunity Cost
**What:** The value of the best alternative you didn't choose. Every choice has one.

### 34. Sunk Cost Awareness
**What:** Past investment is irrelevant to future decisions. Only future costs and benefits matter.

### 35. Pareto Principle (80/20)
**What:** 80% of effects come from 20% of causes. Find the vital few.
**When:** Optimization, bug prioritization, feature selection.

### 36. Minimax Regret
**What:** Choose the option that minimizes the maximum regret across all scenarios.
**When:** High-stakes irreversible decisions.

### 37. Decision Fatigue
**What:** Decision quality degrades with the number of decisions made.
**Prevention:** Automate routine decisions. Make important decisions early.

### 38. OODA Loop
**What:** Observe → Orient → Decide → Act. Speed of loop determines advantage.
**When:** Incident response, competitive situations.

### 39. Eisenhower Matrix
**What:** Urgent/Important matrix. Do important+urgent. Schedule important+not-urgent. Delegate urgent+not-important. Eliminate neither.

### 40. Pre-Commitment
**What:** Decide in advance what you'll do in specific situations.
**Example:** "If tests fail, I will NOT deploy" (decided before the pressure hits).

### 41. Option Value
**What:** Keeping options open has value. Don't commit prematurely.
**When:** Architecture decisions. Prefer flexible designs that can evolve.

### 42. Regret Minimization
**What:** "In 10 years, which decision will I regret less?"
**When:** Career and strategic decisions.

### 43. Cost of Delay
**What:** The value lost per unit of time a feature/fix is delayed.
**When:** Prioritization. Higher CoD items should be done first.

### 44. Wicked Problems
**What:** Problems where the problem definition changes as you solve it.
**When:** Novel feature design. **Strategy:** Iterate, don't plan exhaustively.

### 45. Cynefin Framework
**What:** Classify problems: Clear (best practice) → Complicated (expert analysis) → Complex (probe, sense, respond) → Chaotic (act, sense, respond).

## Domain 4: Physics Analogies (46-55)

### 46. Entropy (Second Law of Thermodynamics)
**What:** Disorder increases without energy input. Code rots without maintenance.

### 47. Conservation Laws
**What:** Complexity doesn't disappear — it moves. Simplifying here adds complexity there.

### 48. Resonance
**What:** Small periodic forces at the right frequency cause large oscillations.
**Analogy:** Small repeated issues at the right timing can crash a system.

### 49. Friction
**What:** Energy lost at boundaries. Integration costs between systems.

### 50. Inertia
**What:** Systems in motion stay in motion. Changing direction requires force.
**Analogy:** Large codebases resist architectural changes.

### 51. Critical Mass
**What:** Minimum amount needed for a self-sustaining reaction.
**Analogy:** Platform adoption — below critical mass, no network effects.

### 52. Signal-to-Noise Ratio
**What:** The ratio of useful information to irrelevant information. Maximize signal.

### 53. Observer Effect
**What:** Measuring a system changes it. Adding logging affects performance.

### 54. Superposition
**What:** A system can be in multiple states until observed (measured).
**Analogy:** A race condition — the state depends on observation timing.

### 55. Path Dependence
**What:** Where you end up depends on the path taken, not just the destination.
**Analogy:** Migration order matters. Same end state, different paths, different bugs.

## Domain 5: Biology (56-65)

### 56. Natural Selection
**What:** Variation + selection + inheritance = evolution. A/B test, measure, keep winners.

### 57. Immune System
**What:** Detect anomalies, remember past threats, adapt to new ones. Security model.

### 58. Symbiosis vs Parasitism
**What:** Mutual benefit vs one-sided extraction. Some dependencies help; some drain.

### 59. Adaptation
**What:** Organisms change to fit their environment. Software must adapt to changing requirements.

### 60. Genetic Drift
**What:** Random changes accumulate in small populations. Small teams accumulate random practices.

### 61. Extinction Events
**What:** Major disruptions that eliminate most existing species/approaches.
**Analogy:** Technology paradigm shifts (mainframe → PC → cloud → serverless).

### 62. Niche Specialization
**What:** Survive by being the best at something specific.
**When:** Product strategy, library design.

### 63. Red Queen Effect
**What:** Must keep running just to stay in place. Security threats evolve continuously.

### 64. Apoptosis (Programmed Cell Death)
**What:** Sometimes killing a component is healthy for the organism.
**Analogy:** Sunsetting features, killing zombie services.

### 65. Co-evolution
**What:** Species evolve together in response to each other.
**Analogy:** API producer and consumer evolve together.

## Domain 6: Economics (66-80)

### 66. Marginal Thinking
**What:** Decisions at the margin. The next unit matters, not the average.

### 67. Network Effects
**What:** Each additional user makes the product more valuable for all users.

### 68. Moral Hazard
**What:** When protected from consequences, people take more risks.
**Analogy:** If "someone else will fix it," code quality drops.

### 69. Tragedy of the Commons
**What:** Shared resources degrade when everyone optimizes for themselves.
**Example:** Shared databases, global state, common CI pipeline.

### 70. Comparative Advantage
**What:** Even if A is better at everything, both benefit if each focuses on relative strengths.

### 71. Diminishing Returns
**What:** Each additional unit of effort produces less improvement.
**When:** Performance optimization (the last 5% costs more than the first 80%).

### 72. Externalities
**What:** Costs or benefits that affect parties not involved in the transaction.
**Example:** Fast code that's unreadable creates externalities for future maintainers.

### 73. Price Discovery
**What:** The true cost is revealed through interaction, not estimation.
**Analogy:** The true complexity of a feature is discovered during implementation, not planning.

### 74. Gresham's Law
**What:** "Bad money drives out good." Bad practices drive out good ones if not actively prevented.

### 75. Veblen Good
**What:** Demand increases with price. **Analogy:** Some "enterprise" features succeed because they're expensive (perceived quality).

### 76. Asymmetric Information
**What:** One party knows more than the other. **When:** Code review (author knows more than reviewer).

### 77. Principal-Agent Problem
**What:** Agent's incentives differ from principal's. **When:** Outsourcing, delegation.

### 78. Economies of Scale
**What:** Unit cost decreases with volume. **Analogy:** Shared infrastructure, reusable libraries.

### 79. Creative Destruction
**What:** New innovations destroy old ones. **When:** Technology adoption decisions.

### 80. Dutch Disease
**What:** One successful sector crowds out others. **Analogy:** One feature consuming all engineering resources.

## Domain 7: Psychology (81-95)

### 81. Cognitive Load Theory
**What:** Working memory is limited (~4 chunks). Reduce cognitive load by chunking and abstraction.

### 82. Dual Process Theory
**What:** System 1 (fast, intuitive) vs System 2 (slow, analytical). Know which you're using.

### 83. Mere Exposure Effect
**What:** Familiarity breeds preference, not quality. Don't confuse "I know this" with "this is best."

### 84. Peak-End Rule
**What:** People judge experiences by the peak and the end, not the average.
**When:** UX design, error messages, onboarding.

### 85. Zeigarnik Effect
**What:** Uncompleted tasks occupy mental space. Close tasks to free cognitive bandwidth.

### 86. Dunning-Kruger Effect
**What:** Low competence → overconfidence. High competence → underconfidence.

### 87. Curse of Knowledge
**What:** Once you know something, you can't un-know it. Hard to explain to someone who doesn't.

### 88. Ikea Effect
**What:** People overvalue things they built. Watch for attachment to your own code.

### 89. Planning Fallacy
**What:** People underestimate time for tasks. **Fix:** Use reference class forecasting (how long did similar tasks ACTUALLY take?).

### 90. Hindsight Bias
**What:** After knowing the outcome, it seems "obvious." Not useful for learning.

### 91. Focusing Illusion
**What:** "Nothing is as important as you think it is when you're thinking about it."

### 92. Framing Effect
**What:** How a problem is framed affects the solution. Reframe to find new approaches.

### 93. Endowment Effect
**What:** Overvaluing what you already have. Resistance to replacing existing code.

### 94. Halo Effect
**What:** Good impression in one area influences judgment in unrelated areas.
**Example:** "This developer writes clean code, so their architecture must be good."

### 95. Reactance
**What:** People resist being told what to do. In code review: suggest, don't dictate.

## Domain 8: Mathematics (96-110)

### 96. Normal Distribution
**What:** Most values cluster around the mean. Outliers are rare but impactful.

### 97. Power Law Distribution
**What:** A few items dominate. 1% of functions cause 99% of bugs.

### 98. Regression to the Mean
**What:** Extreme results tend to be followed by more average results. Not every spike is a trend.

### 99. Game Theory (Nash Equilibrium)
**What:** Stable state where no player benefits from changing strategy alone.

### 100. Combinatorial Explosion
**What:** Options multiply exponentially. 10 boolean configs = 1024 combinations to test.

### 101. Law of Large Numbers
**What:** Average of many samples converges to expected value. Single measurements are unreliable.

### 102. Central Limit Theorem
**What:** Average of any distribution approaches normal. Useful for performance benchmarking.

### 103. Monte Carlo Method
**What:** Use random sampling to estimate complex outcomes. Useful when analytical solution is impossible.

### 104. Bayes' Theorem
**What:** P(A|B) = P(B|A)·P(A) / P(B). Update probability based on new evidence.

### 105. Graph Theory
**What:** Nodes and edges. Dependencies are graphs. Detect cycles, find shortest paths.

### 106. Dimensional Analysis
**What:** Check that units are consistent. In code: types serve the same purpose.

### 107. Pigeonhole Principle
**What:** If N items in M slots and N>M, at least one slot has >1 item. Hash collisions are inevitable.

### 108. Little's Law
**What:** L = λ × W. Items in system = arrival rate × time in system. Queue theory.

### 109. Amdahl's Law
**What:** Speedup limited by the non-parallelizable fraction. 10% sequential = max higher-scale speedup.

### 110. Benford's Law
**What:** In natural datasets, 1 is the most frequent leading digit. Useful for fraud detection.

## Domain 9: Military/Strategy (111-125)

### 111. Center of Gravity
**What:** The one thing everything depends on. Protect yours, target theirs.

### 112. Fog of War
**What:** Information in real-time is incomplete and unreliable. Design for uncertainty.

### 113. Mission Command
**What:** Set objectives, give autonomy on methods. Trust teams to figure out how.

### 114. Defense in Depth
**What:** Multiple independent layers of defense. If one fails, others protect.

### 115. Schwerpunkt (Focus Point)
**What:** Concentrate resources at the decisive point. Don't spread thin.

### 116. Maneuver Warfare
**What:** Speed and surprise over brute force. Get inside the opponent's decision cycle.

### 117. Force Multiplier
**What:** Something that makes existing forces more effective (tools, automation, training).

### 118. Clausewitz's Trinity
**What:** Strategy balances Reason (government/leadership), Chance (friction/fog), and Passion (people/culture).

### 119. Sun Tzu's Five Factors
**What:** Way (purpose), Heaven (timing), Earth (terrain), Commander (leadership), Method (process).

### 120. Culmination Point
**What:** The point where your offensive loses momentum. Know when to consolidate.
**Analogy:** Feature creep — know when to stop adding and start stabilizing.

### 121. Strategic Reserve
**What:** Keep resources uncommitted for unexpected opportunities or threats.
**Analogy:** Don't allocate 100% of capacity. Keep slack for emergencies.

### 122. Lines of Communication
**What:** Protect supply lines. In software: deployment pipelines, monitoring, on-call rotation.

### 123. Flank Attack
**What:** Attack where the opponent isn't prepared. In competition: innovate where incumbents are weak.

### 124. Attrition vs Maneuver
**What:** Attrition grinds down (brute force debugging). Maneuver outthinks (hypothesis-driven debugging).

### 125. Coup d'Oeil
**What:** The ability to see the whole battlefield at a glance. Pattern recognition under pressure.

## Domain 10: Philosophy (126-140)

### 126. Epistemic Humility
**What:** Knowing the limits of your knowledge. Saying "I don't know" when you don't.

### 127. Is-Ought Gap (Hume)
**What:** What IS doesn't tell you what OUGHT to be. Current implementation isn't necessarily correct.

### 128. Popper's Falsificationism
**What:** Science progresses by disproving, not proving. Design tests that CAN fail.

### 129. Kuhn's Paradigm Shifts
**What:** Knowledge progresses through revolutions, not gradual accumulation.

### 130. Wittgenstein's Language Games
**What:** Words mean different things in different contexts. "Performance" means different things to DBA vs UX designer.

### 131. Ship of Theseus
**What:** If you replace every component, is it still the same system? Identity and migration.

### 132. Trolley Problem (Applied)
**What:** Sometimes all options cause harm. Minimize total harm, document the trade-off.

### 133. Veil of Ignorance (Rawls)
**What:** Design as if you don't know which role you'll play. Fair API design.

### 134. Categorical Imperative (Kant)
**What:** Act as if your practice would become universal law. Write code as if everyone would follow your pattern.

### 135. Pragmatism (James/Dewey)
**What:** Truth is what works. If the theory doesn't match practice, fix the theory.

### 136. Dialectics (Hegel)
**What:** Thesis + Antithesis → Synthesis. Combine opposing approaches into something better.

### 137. Phenomenology (Husserl)
**What:** Study the experience itself, not just the object. UX is about the user's experience, not the feature list.

### 138. Existentialism (Sartre)
**What:** You are defined by your choices, not your labels. Code quality is determined by actions, not intentions.

### 139. Stoicism (Epictetus)
**What:** Focus on what you can control. Ignore what you can't. Don't worry about the impossible — mitigate what you can.

### 140. Socratic Method
**What:** Learn by asking questions, not by stating answers. Ask "why?" five times.

## Domain 11: Engineering/Software Specific (141-155)

### 141. Conway's Law
**What:** System architecture mirrors team communication structure.

### 142. Goodhart's Law
**What:** When a measure becomes a target, it ceases to be a good measure. Optimizing for code coverage ≠ optimizing for quality.

### 143. Hyrum's Law
**What:** With enough users, every observable behavior becomes a dependency. Even bugs become features.

### 144. Postel's Law (Robustness Principle)
**What:** Be conservative in what you send, liberal in what you accept.

### 145. Kernighan's Law
**What:** Debugging is twice as hard as writing code. Write code at half your skill level so you can debug it.

### 146. Brooks's Law
**What:** Adding people to a late project makes it later.

### 147. Lehman's Laws of Software Evolution
**What:** Software must continually adapt or become progressively less satisfactory.

### 148. Two-Pizza Rule
**What:** Teams should be small enough to be fed by two pizzas. Communication overhead scales quadratically.

### 149. Worse is Better (Gabriel)
**What:** Simple, incomplete solutions that ship beat perfect solutions that don't.

### 150. YAGNI (You Aren't Gonna Need It)
**What:** Don't build features for imagined future requirements. Build for known current needs.

### 151. DRY vs WET
**What:** Don't Repeat Yourself vs Write Everything Twice. Sometimes duplication is cheaper than the wrong abstraction.

### 152. Rule of Three
**What:** Don't abstract until you've seen the pattern three times. First time: just do it. Second: note similarity. Third: abstract.

### 153. Separation of Concerns
**What:** Each module/function/class should address a single concern.

### 154. Principle of Least Astonishment
**What:** Software should behave as users expect. Surprises are bugs.

### 155. Fail Fast
**What:** Detect and report errors at the earliest possible point. Don't let invalid state propagate.

<!-- DCI-RELATED-START -->

## Related DCI references

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)
- [Software Architecture Workflow — Deterministic-Cognitive-Infrastructure](../workflows/architecture.md)

<!-- DCI-RELATED-END -->
