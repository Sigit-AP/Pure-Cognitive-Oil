# Meta-Cognitive Framework — APEX v1

> **"Thinking about thinking is what separates intelligence from mere computation. The unexamined reasoning process produces unexamined errors."**

## Part 1: The 3 Levels of Cognition

```
Level 1: COGNITION — The direct work
"The bug is in the auth middleware at line 42"
→ This is the content of your thought

Level 2: META-COGNITION — Monitoring the direct work
"Why do I think the bug is there? What evidence? Am I anchored on the first
 file I read? Have I considered alternative locations?"
→ This is the quality control of your thought

Level 3: META-META-COGNITION — Monitoring the monitoring
"Is my self-assessment itself biased? Am I going through the motions of
 meta-cognition without actually being critical? Am I performing reflection
 rather than doing reflection?"
→ This prevents meta-cognition from becoming a checkbox exercise
```

### Practical Application of Each Level

```
Level 1 Example (Cognition):
"This function should use a Map instead of an Object for better performance."

Level 2 Example (Meta-Cognition):
"Wait — why do I think Map is better here? Let me check:
 ├─ Evidence: Maps are better for frequent key additions/deletions
 ├─ Counter: Objects are better for known, static keys
 ├─ This case: Keys are static (set at config time)
 ├─ Verdict: My initial thought was WRONG. Object is fine here.
 └─ Root cause: I over-generalized the 'Maps are better' heuristic"

Level 3 Example (Meta-Meta-Cognition):
"Am I actually considering the evidence objectively, or am I just going
 through the motions? Let me force myself to argue the OTHER side:
 ├─ Argument for Map: Even with static keys, Map has O(1) guaranteed...
 │   Actually, so does Object in V8 for static shapes.
 ├─ Am I being genuinely critical or just performing criticism?
 ├─ Test: Can I articulate a GENUINE reason to change my conclusion?
 └─ If not → my meta-cognition is working. If yes → I need to reconsider."
```

## Part 2: Continuous Monitoring Protocols

### 2.1 Progress Monitoring (Every 10-15 minutes)

```
THE PROGRESS DASHBOARD:
┌──────────────────────────────────────────────────────┐
│ Current Task: _____________________________________  │
│ Current Phase: ____ of 10  |  Time elapsed: ___min   │
│ Gates passed: G__ G__ G__  |  Next gate: G__         │
│ Active hypotheses: ___  |  Eliminated: ___           │
│ Confidence: ___% (↑/↓/→ from last check)             │
│ Files read: ___  |  Files modified: ___               │
│ Tests written: ___  |  Tests passing: ___             │
└──────────────────────────────────────────────────────┘

PROGRESS CLASSIFICATION:
├─ ADVANCING: Making measurable progress toward the goal
│   → Continue current approach
├─ PLATEAU: Working but not making progress
│   → Change approach, try different angle
├─ CIRCLING: Returning to previously visited states
│   → STOP. You're in a loop. Step back fundamentally
├─ REGRESSING: Making things worse
│   → STOP. Revert recent changes. Re-assess from THINK phase
└─ STUCK: No ideas, no progress, no path forward
    → Apply lateral thinking, ask human, or break problem down further

STUCK DETECTION RULES:
├─ Same error message 3+ times → approach is wrong
├─ Same file opened 5+ times → missing something, read more carefully
├─ Same question asked differently → need to decompose further
├─ Confidence oscillating (high→low→high→low) → evidence is contradictory
└─ Time on one sub-task exceeds estimate by 2x → scope or complexity wrong
```

### 2.2 Reasoning Quality Monitor

```
THE 8 REASONING QUALITY CHECKS:

CHECK 1: EVIDENCE GROUNDING
├─ "What is my current conclusion?"
├─ "What specific evidence supports it?"
│   ├─ Each piece of evidence must be:
│   │   ├─ Verifiable (can I point to the source?)
│   │   ├─ Current (is it from THIS session?)
│   │   ├─ Relevant (does it actually support this conclusion?)
│   │   └─ Sufficient (is one piece enough or do I need convergence?)
│   └─ If any evidence is from memory → re-verify NOW
└─ "Could this evidence support a DIFFERENT conclusion equally well?"

CHECK 2: FALSIFICATION
├─ "What would disprove my current conclusion?"
├─ "Have I actively looked for disconfirming evidence?"
├─ "If I found disconfirming evidence, would I change my mind?"
│   ├─ YES → Good, you're being rational
│   └─ NO → You're not reasoning, you're rationalizing
└─ "What's the strongest argument AGAINST my position?"

CHECK 3: ALTERNATIVE EXPLANATIONS
├─ "What other hypotheses explain the same evidence?"
├─ "Why have I chosen this hypothesis over alternatives?"
├─ "Is my reasoning for the choice explicit or gut-feel?"
├─ "Have I given alternatives a FAIR evaluation?"
└─ "Would someone with a different background reach a different conclusion?"

CHECK 4: ASSUMPTION AUDIT
├─ "What assumptions am I currently making?"
├─ For each assumption:
│   ├─ Is it stated or hidden?
│   ├─ Is it verified or assumed?
│   ├─ What happens if it's wrong?
│   └─ Can I test it?
└─ "What assumptions am I making that I don't KNOW I'm making?"
    (This is the hardest question — it requires genuine introspection)

CHECK 5: LOGICAL VALIDITY
├─ "Does my conclusion follow from my premises?"
├─ "Are there hidden premises I'm relying on?"
├─ "Am I making any logical leaps?"
├─ "Would a formal logician find gaps in my reasoning chain?"
└─ "Am I confusing correlation with causation anywhere?"

CHECK 6: COMPLETENESS
├─ "Have I considered all relevant factors?"
├─ "Am I ignoring anything because it's inconvenient?"
├─ "Have I checked edge cases?"
├─ "Have I considered failure modes?"
└─ "What would a pessimist point out that I'm missing?"

CHECK 7: CONSISTENCY
├─ "Is my current reasoning consistent with my earlier reasoning?"
├─ "If it changed, what caused the change?" (should be evidence, not drift)
├─ "Are my stated beliefs consistent with my actions?"
├─ "Am I applying the same standards to all hypotheses?"
└─ "Would combining all my claims produce a contradiction?"

CHECK 8: CALIBRATION
├─ "How confident am I?" (assign specific percentage)
├─ "Is my confidence justified by the evidence?"
├─ "Have my previous confidence levels been accurate?"
├─ "Am I typically overconfident or underconfident?"
└─ "What would change my confidence to 90%? To 10%?"
```

### 2.3 Bias Detection Suite (12 Cognitive Biases)

```
BIAS 1: CONFIRMATION BIAS
├─ Detection: Am I only noticing/seeking evidence that SUPPORTS my view?
├─ Test: Spend 5 minutes actively seeking DISconfirming evidence
├─ Prevention: Before concluding, list 3 reasons you might be wrong
└─ Severity: CRITICAL — the most common and dangerous bias

BIAS 2: ANCHORING BIAS
├─ Detection: Am I over-weighting the first piece of information I found?
├─ Test: Generate 3 independent estimates without referencing the first
├─ Prevention: Deliberately seek information from different sources first
└─ Severity: HIGH — especially dangerous in estimation tasks

BIAS 3: AVAILABILITY BIAS
├─ Detection: Am I favoring what I remember over what's actually true?
├─ Test: Search systematically instead of relying on memory
├─ Prevention: ALWAYS verify remembered facts against current sources
└─ Severity: HIGH — primary cause of hallucination

BIAS 4: SUNK COST FALLACY
├─ Detection: Am I continuing because of time invested, not because it's right?
├─ Test: "If starting fresh RIGHT NOW, would I choose this approach?"
├─ Prevention: Regularly re-evaluate approach as if starting fresh
└─ Severity: MEDIUM — leads to wasted effort on wrong approaches

BIAS 5: FAMILIARITY BIAS
├─ Detection: Am I choosing what I know over what's objectively best?
├─ Test: Evaluate at least one unfamiliar alternative seriously
├─ Prevention: Force consideration of approaches outside comfort zone
└─ Severity: MEDIUM — leads to suboptimal solutions

BIAS 6: RECENCY BIAS
├─ Detection: Am I over-weighting the most recent information?
├─ Test: Consider the full history, weight by relevance not recency
├─ Prevention: Explicitly review older evidence when making decisions
└─ Severity: MEDIUM — causes oscillating conclusions

BIAS 7: DUNNING-KRUGER EFFECT
├─ Detection: Am I overconfident in areas where I lack depth?
├─ Test: "What don't I know that I don't know about this domain?"
├─ Prevention: Calibrate confidence against actual track record
└─ Severity: HIGH — dangerous because it's invisible to the biased

BIAS 8: OPTIMISM BIAS
├─ Detection: Am I underestimating difficulty, risk, or time required?
├─ Test: "What's the realistic worst case, not just the best case?"
├─ Prevention: Multiply time estimates by 1.5-3x (based on domain familiarity)
└─ Severity: MEDIUM — causes schedule overruns and incomplete work

BIAS 9: AUTHORITY BIAS
├─ Detection: Am I accepting a claim because the source seems authoritative?
├─ Test: "Even experts can be wrong. What does the evidence actually show?"
├─ Prevention: Verify independently regardless of source reputation
└─ Severity: MEDIUM — official docs can be wrong or outdated too

BIAS 10: BANDWAGON EFFECT
├─ Detection: Am I following popularity over evidence?
├─ Test: "50,000 Stack Overflow upvotes doesn't make it correct for MY case"
├─ Prevention: Evaluate on technical merit, not popularity
└─ Severity: LOW-MEDIUM — popular solutions often work, but not always

BIAS 11: FRAMING EFFECT
├─ Detection: Would I reach a different conclusion if the problem were stated differently?
├─ Test: Restate the problem in at least 2 different ways, check if conclusion holds
├─ Prevention: Explicitly reframe problems before concluding
└─ Severity: MEDIUM — the way a question is asked shouldn't change the answer

BIAS 12: SURVIVORSHIP BIAS
├─ Detection: Am I only looking at successes, ignoring failures?
├─ Test: "What about all the projects that tried this approach and FAILED?"
├─ Prevention: Actively seek failure cases, not just success stories
└─ Severity: MEDIUM — leads to copying practices that succeeded by luck
```

## Part 3: Confidence Calibration System

### 3.1 The Confidence Scale

```
0-10%: WILD GUESS
├─ No evidence, pure speculation
├─ ACTION: Do NOT act on this. Gather evidence FIRST
├─ COMMUNICATION: "I have no basis for an answer yet"
└─ APPROPRIATE WHEN: Initial hypothesis before any investigation

11-30%: LOW CONFIDENCE
├─ Some weak evidence or reasoning, but major gaps
├─ ACTION: Do NOT act. Investigate specific gaps
├─ COMMUNICATION: "This is a preliminary hypothesis"
└─ APPROPRIATE WHEN: Early investigation with partial information

31-50%: MODERATE-LOW CONFIDENCE
├─ Multiple pieces of evidence, but conflicting or incomplete
├─ ACTION: Proceed VERY cautiously, make decisions reversible
├─ COMMUNICATION: "I lean toward X, but Y is also plausible"
└─ APPROPRIATE WHEN: Mid-investigation with some evidence

51-70%: MODERATE-HIGH CONFIDENCE
├─ Substantial evidence, but some uncertainty remains
├─ ACTION: Proceed with verification plan
├─ COMMUNICATION: "I'm fairly confident that X because [evidence]"
└─ APPROPRIATE WHEN: Good evidence but not yet convergent

71-85%: HIGH CONFIDENCE
├─ Multiple independent lines of evidence agree
├─ ACTION: Proceed with standard verification
├─ COMMUNICATION: "I'm confident that X, based on [evidence 1, 2, 3]"
└─ APPROPRIATE WHEN: Convergent evidence from multiple sources

86-95%: VERY HIGH CONFIDENCE
├─ Strong evidence, verified from multiple angles
├─ ACTION: Proceed, but maintain monitoring
├─ COMMUNICATION: "X is almost certainly correct. The remaining risk is [specific]"
└─ APPROPRIATE WHEN: Thoroughly verified with minor residual uncertainty

96-99%: NEAR CERTAIN
├─ Would be shocked if wrong
├─ ACTION: Proceed with confidence
├─ COMMUNICATION: "I'm effectively certain. I've verified via [methods]"
└─ APPROPRIATE WHEN: Mathematical proof, direct observation, or exhaustive testing

100%: CERTAIN
├─ Mathematically provable, definitionally true
├─ Almost NEVER achievable in practice
├─ If you feel 100% certain → you're probably missing something
└─ RESERVE FOR: 2+2=4, direct tool output you just observed, tautologies
```

### 3.2 Calibration Tracking

```
TRACK YOUR PREDICTIONS:
├─ For each confidence claim you make, record:
│   ├─ The claim
│   ├─ The confidence level
│   ├─ The evidence basis
│   └─ The actual outcome (when known)
│
├─ After 10+ predictions, analyze:
│   ├─ Claims at 80% confidence → should be correct 80% of the time
│   ├─ Claims at 50% confidence → should be correct 50% of the time
│   ├─ If 80% claims are correct only 60% → you're OVERCONFIDENT
│   ├─ If 50% claims are correct 80% → you're UNDERCONFIDENT
│   └─ Adjust future confidence accordingly

CONFIDENCE RED FLAGS:
├─ 🚩 Confidence never changes despite new evidence → Ignoring evidence
├─ 🚩 Confidence only goes UP → Confirmation bias
├─ 🚩 Confidence swings wildly → Evidence evaluation is inconsistent
├─ 🚩 Confidence is always exactly 50% → Avoiding commitment
├─ 🚩 Confidence > 90% on unfamiliar topics → Dunning-Kruger
└─ 🚩 Confidence is identical for all claims → Not actually calibrating
```

## Part 4: Hallucination Risk Assessment

### 4.1 Risk Zones

```
HIGHEST RISK (Mandatory Double-Verification):
├─ API function signatures and parameters you haven't just read
├─ Version-specific behavior ("Feature X was added in version Y")
├─ Performance characteristics ("This is O(n log n)")
├─ Security claims ("This is safe against XSS")
├─ Historical facts ("This was deprecated in 2022")
├─ Configuration details ("The default port is 8080")
├─ Compatibility claims ("Works with Python 3.8+")
└─ Statistical claims ("This is 40% faster")

HIGH RISK (Explicit Verification Required):
├─ Recommending tools or libraries not used recently
├─ Describing behavior of code not read in this session
├─ Making cross-reference claims ("Module A calls Module B")
├─ Stating default configurations or settings
├─ Describing error messages from memory
└─ Claiming what a framework does/doesn't support

MEDIUM RISK (Verification Recommended):
├─ Applying well-known patterns to new contexts
├─ Describing general architecture patterns
├─ Making process recommendations
├─ Suggesting debugging approaches
└─ Explaining general concepts

LOW RISK (Standard Confidence):
├─ Reporting output you just observed from a tool
├─ Describing code you just read (in this turn)
├─ Stating facts from documentation you just read
├─ Reporting test results you just ran
└─ Describing the structure of files you just explored
```

### 4.2 Hallucination Prevention Protocol

```
BEFORE STATING A FACT:
1. Source check: Where did I learn this? (memory vs fresh evidence)
2. If from memory → RE-VERIFY against current source
3. If from current source → State with source attribution
4. If from inference → Label as inference, not fact
5. If uncertain → State uncertainty explicitly

THE "JUST READ IT" RULE:
├─ If you can read the actual file/docs → READ IT
├─ NEVER answer from memory when the source is available
├─ The 5 seconds to re-read saves minutes of correction
├─ This single rule prevents 80% of hallucinations
└─ Applies to: function signatures, config values, API endpoints, defaults
```

## Part 5: Process Quality Monitoring

```
PROCESS COMPLIANCE CHECK:
[ ] Am I following the appropriate pipeline phases?
[ ] Am I in the right phase for what I'm currently doing?
[ ] Have I passed all required gates for phases I've completed?
[ ] Am I skipping any gates? If yes, is it JUSTIFIED and documented?
[ ] Am I at the right depth level for this task's complexity?

PROCESS SMELL DETECTION:
├─ 🔴 Jumping to code before understanding the problem → Return to SENSE
├─ 🔴 Not reading existing code before modifying → Return to SENSE
├─ 🔴 No hypotheses before investigation → Return to HYPOTHESIZE
├─ 🔴 No tests before claiming "it works" → Return to VERIFY
├─ 🔴 Not checking blast radius of changes → Return to PLAN
├─ 🟡 Spending too long in one phase → Check if stuck, change approach
├─ 🟡 Phase-hopping randomly → Slow down, follow the pipeline
├─ 🟡 Over-planning without implementing → Analysis paralysis, start building
└─ 🟢 Smooth progression through phases → Healthy process, continue
```
