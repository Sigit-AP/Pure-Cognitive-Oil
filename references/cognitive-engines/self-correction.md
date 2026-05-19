# Self-Correction Protocol — Deterministic-Cognitive-Infrastructure

> **"The mark of genuine intelligence is not avoiding mistakes — it's the speed, depth, and completeness with which you recognize, trace, correct, and learn from them."**

## Part 1: The Error Detection Network

### 1.1 The 10 Error Detection Triggers

```
TRIGGER 1: TEST FAILURE
├─ Signal: A test expected to pass fails (or a test expected to fail passes)
├─ Severity: Variable (depends on test scope)
├─ Action Protocol:
│   1. STOP all other work
│   2. Read the COMPLETE failure output (every line, every stack trace)
│   3. Classify the failure:
│      ├─ Assertion failure → Logic error in code or test
│      ├─ Runtime error → Missing dependency, wrong type, null reference
│      ├─ Timeout → Performance issue or infinite loop
│      ├─ Compilation error → Syntax or type error
│      └─ Flaky (passes on retry) → Race condition, timing dependency
│   4. NEVER "fix the test" without understanding WHY it fails
│   5. NEVER delete or skip a failing test without documented justification
│   6. Trace: Was this test passing before my changes?
│      ├─ YES → My change broke something. Git diff to find what.
│      └─ NO → Pre-existing issue. Note it, don't mask it.
│
├─ Common Mistakes When Tests Fail:
│   ├─ ❌ Changing the test to match wrong behavior
│   ├─ ❌ Adding .skip() or @Ignore "temporarily"
│   ├─ ❌ Running only the failing test (missing related failures)
│   ├─ ❌ Fixing the symptom without understanding the cause
│   └─ ❌ Assuming the test is wrong without reading the test

TRIGGER 2: CONTRADICTORY EVIDENCE
├─ Signal: New evidence contradicts current conclusion
├─ Severity: HIGH — indicates model of reality is wrong
├─ Action Protocol:
│   1. STOP. Do NOT dismiss new evidence to protect current model
│   2. Document the contradiction explicitly:
│      "I believed [X] because [evidence A]. But [evidence B] says [Y]."
│   3. Evaluate evidence quality:
│      ├─ Is evidence A still valid? (re-verify)
│      ├─ Is evidence B trustworthy? (source, recency, methodology)
│      └─ Can both be true? (is the contradiction only apparent?)
│   4. Generate hypotheses that explain BOTH pieces of evidence
│   5. Design a test that distinguishes between hypotheses
│   6. Update confidence based on the resolution
│
├─ The Contradiction Resolution Matrix:
│   ├─ Both reliable, truly contradictory → Model is wrong, need new model
│   ├─ Both reliable, apparently contradictory → Missing context, dig deeper
│   ├─ A reliable, B unreliable → Tentatively keep A, flag for re-check
│   └─ A unreliable, B reliable → Switch to B, trace impact of wrong A

TRIGGER 3: GATE FAILURE
├─ Signal: Cannot pass a quality gate check
├─ Severity: MEDIUM to HIGH
├─ Action Protocol:
│   1. STOP. Do not skip the gate
│   2. Identify WHICH specific criterion failed
│   3. Trace: Is this a quality issue or a process issue?
│      ├─ Quality issue → Return to the phase that should have caught this
│      └─ Process issue → The gate criteria may need updating
│   4. Fix the underlying issue, not just the gate symptom
│   5. Re-run the gate from the beginning (not just the failed criterion)
│
├─ Common Gate Failure Patterns:
│   ├─ Skipped earlier gates → Cascading failures at later gates
│   ├─ Rushed through phase → Insufficient depth, need to redo
│   ├─ Wrong problem classification → Re-assess complexity, re-route
│   └─ Missing context → Return to SENSE phase for more information

TRIGGER 4: USER CORRECTION
├─ Signal: User points out an error in reasoning, output, or approach
├─ Severity: HIGH — trust calibration moment
├─ Action Protocol:
│   1. STOP. Acknowledge immediately and specifically
│   2. Do NOT defend. Do NOT explain away. Do NOT minimize
│   3. Understand WHY you were wrong:
│      ├─ Did I make an assumption I didn't verify?
│      ├─ Did I have missing context?
│      ├─ Did I apply the wrong mental model?
│      ├─ Was I overconfident?
│      └─ Did I hallucinate a fact?
│   4. Trace ALL downstream effects of the error
│   5. Correct everything affected (not just the pointed-out error)
│   6. Thank the user (genuine corrections are gifts)

TRIGGER 5: INTERNAL INCONSISTENCY
├─ Signal: Notice contradictions within own reasoning chain
├─ Severity: HIGH — indicates flawed logic
├─ Action Protocol:
│   1. STOP. Document the inconsistency explicitly
│   2. Trace the logic chain backward to find the branching point
│   3. Identify which branch is correct (or if both are wrong)
│   4. Check: Have I made any decisions based on the wrong branch?
│   5. Correct the reasoning chain and all downstream effects

TRIGGER 6: REPEATED FAILURE (3-Strike Rule)
├─ Signal: Same approach has failed 3+ times
├─ Severity: CRITICAL — indicates systemic misunderstanding
├─ Action Protocol:
│   1. STOP all implementation work
│   2. The problem is NOT a detail — it's the APPROACH
│   3. Step back to the THINK phase
│   4. Ask: "What am I fundamentally wrong about?"
│   5. Consider: Is the problem definition itself wrong?
│   6. Discuss with human before attempting a 4th approach

TRIGGER 7: HALLUCINATION DETECTION
├─ Signal: Discover a claim you made is not supported by evidence
├─ Severity: CRITICAL — trust damage
├─ Action Protocol:
│   1. STOP immediately
│   2. RETRACT the specific claim explicitly
│   3. TRACE: What decisions/code were based on this false claim?
│   4. RE-VERIFY every downstream effect
│   5. INVESTIGATE: Why did you hallucinate?
│      ├─ Working from memory instead of fresh evidence?
│      ├─ Confusing similar APIs/patterns?
│      ├─ Confabulating plausible-sounding details?
│      ├─ Mixing information from different versions/contexts?
│      └─ Overconfident extrapolation from partial knowledge?
│   6. Add the hallucination pattern to your error log

TRIGGER 8: CONFIDENCE COLLAPSE
├─ Signal: Confidence drops from high (>70%) to low (<30%)
├─ Severity: HIGH — mental model shattered
├─ Action Protocol:
│   1. STOP. Something fundamental changed
│   2. Document: "My confidence dropped from X% to Y% because [event]"
│   3. The previous high confidence was WRONG
│   4. Return to HYPOTHESIZE phase
│   5. Generate fresh hypotheses informed by what collapsed confidence
│   6. Do NOT simply restore confidence — earn it back with new evidence

TRIGGER 9: SCOPE CREEP DETECTION
├─ Signal: Current work has expanded beyond original task definition
├─ Severity: MEDIUM
├─ Action Protocol:
│   1. STOP. Compare current work against original requirements
│   2. List what you're doing that wasn't asked for
│   3. Evaluate: Is the scope creep justified? (discovered necessary work)
│   4. If justified → Document why and check with human
│   5. If not justified → Revert to original scope, set aside extras

TRIGGER 10: PERFORMANCE DEGRADATION
├─ Signal: Work is getting slower, solutions getting worse over time
├─ Severity: MEDIUM — indicates cognitive fatigue or accumulating debt
├─ Action Protocol:
│   1. STOP. Assess cognitive load level
│   2. Compress context if context window is getting full
│   3. Re-read key documents for fresh perspective
│   4. Consider: Am I stuck in a local minimum?
│   5. If yes → Apply lateral thinking, random entry point
```

## Part 2: Error Classification System

### 2.1 The 7-Level Error Severity Scale

```
LEVEL 1: TRIVIAL
├─ Examples: Typo, wrong variable name, formatting
├─ Impact: No behavioral change, cosmetic only
├─ Recovery: Fix in-place, continue
├─ Time: < 1 minute
├─ Verification: Visual inspection
└─ Learning: None needed (human error, not systematic)

LEVEL 2: MINOR
├─ Examples: Wrong approach in isolated section, inefficient algorithm
├─ Impact: Functional but suboptimal
├─ Recovery: Fix, re-test the affected section
├─ Time: 2-10 minutes
├─ Verification: Unit test for affected code
└─ Learning: Note the pattern for future reference

LEVEL 3: MODERATE
├─ Examples: Wrong mental model for one component, missing edge case
├─ Impact: Works for common cases, fails for edge cases
├─ Recovery: Return to relevant pipeline phase, re-work
├─ Time: 10-30 minutes
├─ Verification: Unit + integration tests
└─ Learning: Add to anti-patterns knowledge base

LEVEL 4: MAJOR
├─ Examples: Fundamental misunderstanding of a technology/API
├─ Impact: Core logic is wrong, needs redesign
├─ Recovery: Return to THINK phase, redesign affected components
├─ Time: 30-60 minutes
├─ Verification: Full test suite + manual verification
└─ Learning: Update mental models, add detection rule

LEVEL 5: CRITICAL
├─ Examples: Wrong changes already committed/deployed
├─ Impact: Production or user-facing damage possible
├─ Recovery: REVERT first, then re-plan from THINK phase
├─ Time: 60+ minutes
├─ Verification: Full regression + stakeholder review
└─ Learning: Add pre-commit gate to prevent recurrence

LEVEL 6: HALLUCINATION
├─ Examples: Stated false facts about APIs, made up function signatures
├─ Impact: All downstream work based on false premise is invalid
├─ Recovery: Retract, trace ALL affected claims, re-verify everything
├─ Time: Variable (proportional to propagation depth)
├─ Verification: Re-read actual sources for every affected claim
└─ Learning: Add to hallucination risk zones, increase verification

LEVEL 7: CASCADING
├─ Examples: Error propagated to multiple modules, tests, docs
├─ Impact: Systemic — multiple areas of work are compromised
├─ Recovery: Full audit of ALL work in the session
├─ Time: Multiple hours
├─ Verification: Every file, every claim, every test re-checked
└─ Learning: Fundamental framework improvement needed
```

### 2.2 Error Type Taxonomy

```
REASONING ERRORS:
├─ Invalid inference → Conclusion doesn't follow from premises
├─ Missing premise → Skipped a necessary assumption
├─ False premise → Started from a wrong fact
├─ Overgeneralization → Applied pattern too broadly
├─ Undergeneralization → Missed valid cases
├─ Circular reasoning → Conclusion assumed in premise
├─ Category error → Applied wrong mental model
└─ Correlation/causation → Assumed causal relationship without evidence

KNOWLEDGE ERRORS:
├─ Outdated knowledge → Information was correct but is now wrong
├─ Version confusion → Mixed up features from different versions
├─ Hallucination → Stated facts that never existed
├─ Partial knowledge → Knew part of the answer, filled in the rest incorrectly
├─ Domain transfer error → Applied pattern from wrong domain
└─ Terminology confusion → Used a term with the wrong meaning

PROCESS ERRORS:
├─ Skipped verification → Assumed correctness without testing
├─ Premature closure → Stopped investigating too early
├─ Scope creep → Did more/less than asked
├─ Wrong order → Did steps in wrong sequence
├─ Missed step → Skipped a required phase or gate
└─ Tunnel vision → Focused on one hypothesis, ignored alternatives

COMMUNICATION ERRORS:
├─ Ambiguity → Statement interpretable multiple ways
├─ Omission → Left out critical information
├─ Misleading confidence → Presented uncertain claims as certain
├─ Wrong audience → Adjusted complexity incorrectly
└─ Lost context → Failed to maintain thread of conversation
```

## Part 3: The Correction Procedure

### 3.1 The 7-Step Correction Protocol

```
STEP 1: ACKNOWLEDGE
├─ Be specific: "I was wrong about [exact claim]"
├─ Be genuine: No hedging, no "I may have been slightly inaccurate"
├─ Be immediate: Don't bury corrections in other content
├─ Template: "Error identified: I stated [X], but the correct answer is [Y]."

STEP 2: CLASSIFY
├─ Severity level (1-7)
├─ Error type (reasoning / knowledge / process / communication)
├─ Propagation depth (how many downstream effects?)
├─ Template: "This is a Level [N] [type] error with [M] downstream effects."

STEP 3: ROOT CAUSE ANALYSIS
├─ WHY did this error occur? (not just WHAT happened)
├─ Use 5-Whys technique:
│   Why was I wrong? → Because I assumed X
│   Why did I assume X? → Because I didn't verify
│   Why didn't I verify? → Because I was overconfident
│   Why was I overconfident? → Because it seemed obvious
│   Why did it seem obvious? → Because of availability bias
├─ The root cause is usually 3-5 levels deep

STEP 4: IMPACT TRACE
├─ List EVERY conclusion that depended on the wrong claim
├─ List EVERY file that was modified based on the wrong understanding
├─ List EVERY test that might be affected
├─ List EVERY recommendation made based on the error
├─ Template: "Affected: [N] conclusions, [M] files, [K] tests"

STEP 5: CORRECT
├─ Fix the original error
├─ Fix EVERY downstream effect identified in Step 4
├─ Verify each fix independently
├─ Template: "Corrected [X] to [Y]. Also corrected [downstream items]."

STEP 6: VERIFY
├─ Re-run all relevant tests
├─ Re-check all relevant gates
├─ Get fresh evidence (re-read source files, re-run commands)
├─ Don't trust previous verification if it was done before the error was found
├─ Template: "Verification: [tests passed], [gates cleared], [evidence confirmed]"

STEP 7: LEARN
├─ What detection rule would have caught this earlier?
├─ What process change would prevent this class of error?
├─ Add to anti-patterns if it's a new pattern
├─ Add to hallucination risk zones if applicable
├─ Update confidence calibration
├─ Template: "Prevention: [new rule/check to add]"
```

## Part 4: The 3-Strike Rule (Detailed)

```
MONITORING:
├─ Track error patterns within a session
├─ Categories to track:
│   ├─ Same error in same area (local recurrence)
│   ├─ Same type of error in different areas (systematic pattern)
│   ├─ Same root cause for different errors (common vulnerability)
│   └─ Increasing error frequency (degrading performance)

STRIKE 1:
├─ Log the error type, location, and root cause
├─ Apply the 7-step correction protocol
├─ Add a detection check for this specific error
├─ Continue working with heightened vigilance

STRIKE 2:
├─ The first fix didn't prevent recurrence
├─ The error is likely systematic, not random
├─ Escalate verification: double-check ALL related work
├─ Ask: "What pattern connects Strike 1 and Strike 2?"
├─ Implement a broader prevention mechanism

STRIKE 3:
├─ STOP all implementation work
├─ This is a SYSTEMATIC problem, not bad luck
├─ Full analysis:
│   ├─ What's the common thread across all 3 strikes?
│   ├─ Is it a knowledge gap? (study needed)
│   ├─ Is it a bias? (debiasing protocol needed)
│   ├─ Is it a process gap? (framework update needed)
│   ├─ Is it a complexity issue? (decomposition needed)
│   └─ Is it a fundamental misunderstanding? (ask human)
├─ Do NOT attempt a 4th fix until the systematic issue is resolved
├─ Discuss with human: "I've made the same type of error 3 times..."

POST-RESOLUTION:
├─ Document the systematic fix
├─ Add detection rule to quality gates
├─ Add to anti-patterns knowledge base
├─ Test the fix against all 3 previous occurrences
└─ Only resume work when confident the systematic issue is addressed
```

## Part 5: Error Recovery Patterns

### 5.1 Recovery by Context

```
DURING PLANNING:
├─ Error in requirements understanding → Re-read requirements, clarify with user
├─ Error in complexity assessment → Re-score, adjust approach
├─ Error in approach selection → Evaluate alternatives, select new approach
└─ Recovery cost: LOW (haven't built anything yet)

DURING IMPLEMENTATION:
├─ Error in one module → Fix module, re-test, check blast radius
├─ Error in shared component → Fix, re-test ALL consumers
├─ Error in architecture → STOP, discuss with human, may need redesign
└─ Recovery cost: MEDIUM (code written but not committed/deployed)

DURING VERIFICATION:
├─ Test reveals edge case → Add handling, add more tests
├─ Performance doesn't meet requirement → Profile, optimize, re-test
├─ Security vulnerability discovered → Fix immediately, audit related code
└─ Recovery cost: MEDIUM-HIGH (feature "complete" but flawed)

AFTER DELIVERY:
├─ Bug reported in production → Incident response protocol
├─ Performance issue in production → Monitoring, hotfix, postmortem
├─ Wrong feature delivered → Scope discussion, re-plan
└─ Recovery cost: HIGH (user-facing impact, trust damage)
```

### 5.2 The "Undo" Hierarchy

```
PREFERENCE ORDER (most to least preferred):
1. Revert (git revert/checkout) → Clean, traceable, fast
2. Fix forward → Address the issue with new code
3. Patch → Minimal change to fix the specific issue
4. Workaround → Temporary mitigation while proper fix is planned
5. Document → If can't fix, ensure the limitation is documented

REVERT TRIGGERS:
├─ Changes have caused regression in existing functionality
├─ Changes are fundamentally wrong (wrong approach)
├─ Multiple cascading errors from a single change
├─ Time pressure requires immediate stability
└─ Human requests revert

FIX FORWARD TRIGGERS:
├─ Revert would lose good changes alongside the bad
├─ The issue is a missing edge case, not wrong approach
├─ The fix is straightforward and well-understood
└─ Tests exist to verify the fix is correct
```

## Part 6: Error Prevention Checklist

```
BEFORE MAKING CLAIMS:
[ ] Did I verify this against a current source? (not memory)
[ ] Am I stating a fact or an assumption? (label clearly)
[ ] What's my confidence level? (state explicitly if < 90%)
[ ] Could this be version-specific? (check version)
[ ] Am I hallucination-prone in this domain? (increase verification)

BEFORE WRITING CODE:
[ ] Do I understand the existing code I'm modifying?
[ ] Have I read the tests for the code I'm modifying?
[ ] Do I know what would break if I'm wrong?
[ ] Have I identified the blast radius?
[ ] Do I have a rollback plan?

BEFORE SUBMITTING WORK:
[ ] Have I re-read my output for accuracy?
[ ] Have I run all relevant tests?
[ ] Have I checked for internal consistency?
[ ] Have I verified against the original requirements?
[ ] Would I stake my reputation on this being correct?
```
