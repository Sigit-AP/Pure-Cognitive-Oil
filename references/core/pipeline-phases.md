# The 10-Phase Execution Pipeline — APEX v1

## CRITICAL: This Pipeline is NON-LINEAR

```
The phases are not a waterfall. They are a NETWORK.

VALID MOVES:
├─ Forward: Normal progression (SENSE → THINK → EXPLORE → ...)
├─ Backward: New evidence invalidates earlier phase (BUILD → EXPLORE)
├─ Loop: Need more data (HYPOTHESIZE → EXPLORE → HYPOTHESIZE)
├─ Skip: Trivial task doesn't need all phases (SENSE → BUILD)
├─ Parallel: Run phases simultaneously (EXPLORE + HYPOTHESIZE)
├─ Jump: Late-stage revelation (VERIFY → SENSE — I misunderstood)
├─ Recursive: A phase spawns a sub-pipeline (DESIGN → mini-pipeline)
└─ Interrupt: Any continuous gate failure pauses current phase

THE CONSTRAINT: You must always know WHICH phase you're in and WHY.
Transitions are conscious decisions with documented rationale.
Backward transitions are NOT failures — they are signs of integrity.
```

---

## Phase 0: SENSE — Raw Signal Processing

**Purpose:** Before thinking, perceive. Strip away noise, identify the actual signal, detect anomalies in the request itself.

```
SIGNAL EXTRACTION:
├─ What did the user literally say? (verbatim)
├─ What words carry the most information? (signal)
├─ What words are noise? (filler, politeness, repetition)
├─ What is NOT said but implied? (hidden requirements)
├─ What is the emotional register? (urgent? curious? frustrated?)
└─ Are there contradictions within the request itself?

ANOMALY DETECTION:
├─ Does this request contradict previous requests?
├─ Does this request assume something that isn't true?
├─ Is the scope realistic given the constraints?
├─ Are there impossible requirements hiding in the request?
└─ Is this actually two different requests disguised as one?

PATTERN RECOGNITION:
├─ What category does this request fall into?
├─ Have I seen similar requests before?
├─ What went wrong with similar requests historically?
├─ What patterns from the decision tree apply?
└─ What is the expected complexity level?

NOISE FILTERING:
├─ Separate requirements from preferences
├─ Separate constraints from wishes
├─ Separate facts from opinions
├─ Separate the problem from the proposed solution
└─ Identify "XY problems" (user asks for X but needs Y)
```

**GATE 0→1:** Signal isolated? Anomalies detected? Request classified?

---

## Phase 1: THINK — Deep Cognitive Engagement

**Purpose:** Achieve genuine understanding before any action.

```
1.1 PROBLEM RECEPTION & REFRAMING:
├─ Restate in 5 different ways (not 3 — force deeper abstraction)
├─ Identify the core abstraction
├─ Map to known problem categories
├─ Check: "Am I solving the right problem?"
└─ Apply inversion: "What would make this problem WORSE?"

1.2 KNOWLEDGE STATE ASSESSMENT:
├─ KNOWN: Facts confirmed by evidence
├─ UNKNOWN: Facts not yet verified
├─ ASSUMPTIONS: Explicitly labeled with falsification conditions
├─ META-UNKNOWN: Things I don't know that I don't know
└─ CONTESTED: Facts with conflicting evidence

1.3 CONSTRAINT MAPPING:
├─ Technical constraints (hard/soft classification)
├─ Business constraints
├─ User constraints
├─ Security constraints
├─ Operational constraints
├─ Temporal constraints (deadlines, decay, urgency)
├─ Resource constraints (budget, team, compute)
└─ Ethical constraints (stakeholder impact)

1.4 TEMPORAL REASONING:
├─ PAST: What led to this state? Previous attempts?
├─ PRESENT: Current system state? Available resources?
├─ NEAR FUTURE: What does this look like in 1 month?
├─ FAR FUTURE: What does this look like in 1 year?
└─ COUNTER-TEMPORAL: What if we had infinite time? What would change?
```

**GATE 1→2:** Problem restated 5 ways? Knowledge state mapped? Constraints classified?

---

## Phase 2: EXPLORE — Context Discovery & Evidence Gathering

**Purpose:** Ground all reasoning in reality. Zero assumptions treated as facts.

```
2.1 SYSTEMATIC EXPLORATION:
├─ Step 1: Topography (project structure)
├─ Step 2: Configuration (build, test, lint, CI/CD)
├─ Step 3: Source code (entry points → relevant → dependent)
├─ Step 4: Change history (git log, blame, recent diffs)
├─ Step 5: Documentation (README, docs, comments, issues)
├─ Step 6: Runtime behavior (logs, metrics, error rates)
└─ Step 7: Environment (dependencies, infrastructure, secrets)

2.2 EVIDENCE QUALITY CLASSIFICATION:
├─ TIER 1: Direct observation (code, test output, command result)
├─ TIER 2: Documented fact (README, API docs, comments)
├─ TIER 3: Inferred from pattern (similar code works this way)
├─ TIER 4: Expert opinion (blog post, StackOverflow answer)
├─ TIER 5: Assumption (no evidence, explicitly labeled)
└─ RULE: Never treat Tier 3-5 as Tier 1 without verification

2.3 DEPENDENCY MAPPING:
├─ Upstream: What does this depend on?
├─ Downstream: What depends on this?
├─ Lateral: What else changes when this changes?
├─ External: What external services/APIs are involved?
└─ Impact radius: How many files/modules/teams affected?

2.4 MULTI-COMPONENT DIAGNOSTICS (for debugging):
├─ Add instrumentation at EVERY component boundary
├─ Log: Input → State → Output → Error at each boundary
├─ Run once to gather evidence
├─ Identify the failing component from evidence
└─ THEN investigate that specific component
```

**GATE 2→3:** All exploration steps done? Evidence classified? Dependencies mapped?

---

## Phase 3: HYPOTHESIZE — Formal Hypothesis Generation

**Purpose:** Separate hypothesis generation from general thinking. Apply Bayesian reasoning.

```
3.1 GENERATE MINIMUM 4 HYPOTHESES:

Hypothesis A (Obvious):
├─ Prior probability: P(A) = ?
├─ Evidence for: List + strength
├─ Evidence against: List + strength
├─ Posterior probability: P(A|evidence) = ?
├─ Falsification test: What observation would disprove this?
└─ Cost to test: How expensive is verification?

Hypothesis B (Alternative):
├─ [same structure]

Hypothesis C (Unconventional):
├─ [same structure]

Hypothesis D (Inversion — what if the OPPOSITE is true?):
├─ [same structure]

Hypothesis E (Composite — combination of above):
├─ [same structure]

3.2 HYPOTHESIS RANKING:
├─ Rank by posterior probability (highest first)
├─ Rank by cost to test (cheapest first)
├─ Compute: Expected Information Value = P(learning) × cost_to_test
├─ Test hypotheses in order of highest EIV first
└─ Update ALL hypotheses after each test (Bayesian updating)

3.3 EVIDENCE WEIGHTING:
├─ Direct code evidence > Documentation > Inference > Memory
├─ Recent evidence > Old evidence (for evolving systems)
├─ Multiple independent sources > Single source
├─ Reproducible evidence > One-time observation
└─ Contradictory evidence INCREASES uncertainty (don't dismiss)

3.4 CONVERGENCE CHECK:
├─ Do multiple independent lines of evidence converge?
├─ If YES → confidence increases legitimately
├─ If NO → there's a hidden variable or incorrect assumption
├─ If MIXED → decompose: which part converges, which doesn't?
└─ Never manufacture convergence by ignoring contradictions
```

**GATE 3→4:** 4+ hypotheses generated? Bayesian ranking computed? Best hypothesis testable?

---

## Phase 4: DESIGN — Solution Architecture

**Purpose:** Explore the solution space and design the optimal approach.

```
4.1 SOLUTION SPACE EXPLORATION:
├─ Approach A: Conservative (build on existing patterns)
├─ Approach B: Optimal (best balance of quality and effort)
├─ Approach C: Innovative (reimagined, potentially transformative)
├─ Approach D: Hybrid (best parts of multiple approaches)
└─ For each: Pros, Cons, Complexity, Risk, Timeline

4.2 ARCHITECTURE DESIGN:
├─ Single Responsibility: One sentence per component
├─ Interface Design: What goes in, what comes out
├─ Error Path Design: What happens when it fails?
├─ Test Strategy: How is each component tested independently?
└─ Migration Path: How do we get from current to new?

4.3 DATA FLOW DESIGN:
├─ Origin → Transformation → Validation → Storage → Consumption
├─ Error paths at each step
├─ Security implications at each boundary
└─ Performance implications at each step

4.4 ADVERSARIAL DESIGN REVIEW:
├─ How would a hostile user break this?
├─ How would a junior developer misuse this API?
├─ What happens at 10x the expected load?
├─ What happens when the database is slow?
├─ What is the most embarrassing failure mode?

4.5 INCREMENTAL APPROVAL:
├─ Present architecture overview → "Does this direction look right?"
├─ Present component breakdown → "Do these responsibilities make sense?"
├─ Present data flow → "Does the data flow look correct?"
├─ Present error handling → "Are the error paths adequate?"
├─ Present testing strategy → "Does this cover the risks?"
└─ GET USER APPROVAL after each section
```

**GATE 4→5:** 3+ approaches presented? Design approved section by section? Adversarial review done?

---

## Phase 5: PLAN — Strategic Implementation Blueprint

```
5.1 FILE STRUCTURE MAP:
├─ Files to CREATE (exact paths, responsibility)
├─ Files to MODIFY (exact paths, line ranges, what changes)
├─ Files to DELETE (exact paths, why, what replaces them)
└─ Files to REVIEW (impact analysis — may need updates)

5.2 TASK DECOMPOSITION:
├─ Each task: Atomic, Independent, Testable, Bite-sized (2-5 min)
├─ Each task: Has exact file paths, commands, expected output
├─ Each task: Has a specific test that proves completion
└─ Each task: Produces a clean, committable unit of work

5.3 DEPENDENCY ORDERING:
├─ Level 0: Foundation (no dependencies)
├─ Level 1: Core (depends on Level 0)
├─ Level 2: Integration (depends on Level 1)
├─ Level 3: Polish (depends on Level 2)
└─ RULE: Never start a task before its dependencies complete

5.4 RISK ASSESSMENT:
├─ Highest risk item identified
├─ Mitigation strategy defined
├─ Rollback plan with exact commands
├─ Maximum acceptable blast radius
└─ Escalation criteria (when to stop and ask for help)
```

**GATE 5→6:** Every file mapped? Every task atomic? Risk assessed? Rollback defined?

---

## Phase 6: BUILD — Test-Driven Implementation

```
THE TDD CYCLE:
1. RED: Write failing test (test describes behavior)
2. VERIFY RED: Watch it fail for the RIGHT reason
3. GREEN: Write minimal implementation
4. VERIFY GREEN: Watch it pass, run full suite
5. REFACTOR: Clean up (only after green)
6. COMMIT: One concern per commit
7. REPEAT

ANTI-PATTERNS:
❌ Writing code before test
❌ Test passes immediately (testing existing behavior)
❌ Mocking everything (testing mocks, not code)
❌ "While I'm here" improvements
❌ Fixing test instead of code
❌ Skipping regression tests
❌ Bundling multiple fixes
```

**GATE 6→7:** Every test written before implementation? All tests green? No regressions?

---

## Phase 7: VERIFY — Evidence-Based Completion

```
VERIFICATION SEQUENCE:
1. Unit Tests → all pass, 0 failures
2. Integration Tests → all pass
3. Build → exit code 0, no errors
4. Linter → 0 errors, 0 warnings
5. Type Checker → no errors
6. Original Symptom re-test (for bug fixes)
7. Full Test Suite → all pass (regression check)
8. Requirements Checklist → line-by-line comparison
9. Hallucination Check → every claim has evidence source
10. Adversarial Challenge → strongest counter-argument survived

EVIDENCE LOG:
├─ For each check: Command, Output, Exit Code, Status
├─ For each requirement: Met / Not Met with evidence
├─ For each claim: Source of evidence
└─ CONCLUSION: All checks passed / X checks failed
```

**GATE 7→8:** All verification commands RUN (not assumed)? All output READ? Evidence logged?

---

## Phase 8: REFLECT — Post-Completion Learning

**Purpose:** Extract learnings before moving on. This is how the framework improves.

```
REFLECTION PROTOCOL:
├─ What went well? (specific, not generic)
├─ What went wrong? (be brutally honest)
├─ What surprised me? (unexpected discoveries)
├─ What took longer than expected? (estimation calibration)
├─ What would I do differently next time?
├─ What new pattern did I discover?
├─ What new anti-pattern did I encounter?
├─ What assumption turned out to be wrong?
├─ What mental model was most useful?
├─ What mental model was misleading?
└─ What should I add to the framework?

KNOWLEDGE CRYSTALLIZATION:
├─ Turn learnings into reusable patterns
├─ Add new anti-patterns with detection criteria
├─ Update mental model effectiveness ratings
├─ Identify blind spots that need attention
└─ Document for future sessions
```

**GATE 8→9:** Learnings extracted? Patterns identified? Anti-patterns documented?

---

## Phase 9: EVOLVE — Self-Improvement

**Purpose:** Feed learnings back into the framework itself.

```
EVOLUTION PROTOCOL:
├─ UPDATE mental models (add new, refine existing, deprecate broken)
├─ UPDATE anti-patterns (add from experience, sharpen detection)
├─ UPDATE quality gates (add new criteria from failures)
├─ UPDATE verification checklists (add checks for new failure modes)
├─ UPDATE workflows (refine based on what worked/didn't)
├─ CALIBRATE confidence (compare predictions to outcomes)
├─ IDENTIFY blind spots (what did I miss and why?)
└─ DOCUMENT evolution (what changed and why)

EVOLUTION CRITERIA:
├─ Only add changes backed by specific experience
├─ Only remove elements proven unhelpful in practice
├─ Prefer refinement over replacement
├─ Test changes against historical cases
└─ Roll back changes that don't improve outcomes
```

**GATE 9→DONE:** Framework updated? Changes documented? Calibration improved?
