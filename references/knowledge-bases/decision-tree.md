# Decision Engine — APEX Framework

> **"A decision without a framework is a coin flip with extra steps."**

## Part 1: Decision Classification Matrix

```
┌──────────────────────┬───────────────────────┬──────────────────────┐
│                      │ LOW IMPACT             │ HIGH IMPACT          │
├──────────────────────┼───────────────────────┼──────────────────────┤
│ REVERSIBLE           │ TYPE 1: Just Do It     │ TYPE 2: Timebox      │
│                      │ Decide in <2 min       │ Decide in <30 min    │
│                      │ No approval needed     │ Light analysis       │
│                      │ Examples:              │ Examples:            │
│                      │ • Variable naming      │ • Library selection  │
│                      │ • Code formatting      │ • API structure      │
│                      │ • Test approach         │ • DB schema draft    │
├──────────────────────┼───────────────────────┼──────────────────────┤
│ IRREVERSIBLE         │ TYPE 3: Careful        │ TYPE 4: Full Process │
│                      │ Decide in <1 hour      │ Full APEX pipeline   │
│                      │ Document rationale     │ Multi-hypothesis     │
│                      │ Examples:              │ Examples:            │
│                      │ • Delete old data      │ • Architecture shift │
│                      │ • Remove feature       │ • Platform migration │
│                      │ • Breaking API change  │ • Language choice    │
└──────────────────────┴───────────────────────┴──────────────────────┘
```

## Part 2: Decision Tree Protocol

### Step 1: Frame the Decision
```
TEMPLATE:
├─ Decision statement: "Should we [option A] or [option B]?"
├─ Stakeholders: Who is affected? Who decides?
├─ Deadline: When must this be decided?
├─ Reversibility: Can we undo this? At what cost?
├─ Impact: What happens if we get this wrong?
└─ Type: 1 (just do it) / 2 (timebox) / 3 (careful) / 4 (full process)
```

### Step 2: Generate Options (Minimum 3)
```
RULE: Never evaluate less than 3 options.

Option A: [The obvious choice]
Option B: [The opposite of A]
Option C: [A creative alternative that doesn't fit A vs B framing]
Option D: [Do nothing — always evaluate the null option]

FOR EACH OPTION:
├─ Pros (list 3+)
├─ Cons (list 3+)
├─ Risks (what could go wrong?)
├─ Cost (time, money, complexity)
├─ Opportunity cost (what do we give up?)
├─ Second-order effects (what happens after the immediate effect?)
└─ Reversibility (how hard to undo?)
```

### Step 3: Apply Evaluation Criteria
```
WEIGHTED CRITERIA MATRIX:

Criterion         │ Weight │ Option A │ Option B │ Option C
──────────────────┼────────┼──────────┼──────────┼────────
Correctness       │ 30%    │ 8/10     │ 7/10     │ 9/10
Maintainability   │ 25%    │ 6/10     │ 8/10     │ 7/10
Performance       │ 20%    │ 9/10     │ 5/10     │ 7/10
Simplicity        │ 15%    │ 4/10     │ 9/10     │ 6/10
Extensibility     │ 10%    │ 7/10     │ 6/10     │ 8/10
──────────────────┼────────┼──────────┼──────────┼────────
WEIGHTED TOTAL    │ 100%   │ 7.05     │ 7.05     │ 7.55

Note: Criteria and weights should be set BEFORE evaluating options (prevent bias).
```

### Step 4: Apply Decision Checks
```
[ ] Have I generated at least 3 options (including "do nothing")?
[ ] Have I evaluated each option on the same criteria?
[ ] Have I checked for confirmation bias (am I favoring what I already wanted)?
[ ] Have I considered second-order effects for each option?
[ ] Have I identified the worst-case scenario for each option?
[ ] Can I survive the worst case of my chosen option?
[ ] Have I consulted someone who would disagree with my choice?
[ ] Is the decision reversible? If not, have I given it sufficient analysis?
[ ] Am I deciding under time pressure? (If so, flag potential for error)
[ ] Have I documented the decision rationale for future reference?
```

### Step 5: Post-Decision Protocol
```
AFTER DECIDING:
├─ Document: decision, rationale, alternatives considered, date
├─ Communicate: inform all stakeholders
├─ Monitor: define signals that indicate the decision was wrong
├─ Pre-commit: "If [signal X] occurs within [timeframe], I will reconsider"
├─ Review: schedule a decision review for [1 week / 1 month / 1 quarter]
└─ Learn: after review, update decision criteria based on outcome
```

## Part 3: Common Decision Traps

```
TRAP 1: FALSE URGENCY
"We need to decide NOW!" → Check: Do we really? What happens if we wait 24h?

TRAP 2: ANCHORING TO FIRST OPTION
The first option proposed dominates thinking. → Fix: Generate all options before evaluating any.

TRAP 3: HIDDEN THIRD OPTION
A vs B framing hides option C. → Fix: Always ask "What would C be?"

TRAP 4: SUNK COST INFLUENCE
"We already invested X in this approach." → Fix: Only future costs and benefits matter.

TRAP 5: AUTHORITY DEFERENCE
"The senior person wants X." → Fix: Authority doesn't change the evidence.

TRAP 6: GROUPTHINK
Everyone agrees too quickly. → Fix: Appoint a devil's advocate.

TRAP 7: DECISION AVOIDANCE
"Let's gather more data." → Fix: Set a decision deadline. Not deciding IS deciding.

TRAP 8: FRAMING EFFECT
How the question is framed changes the answer. → Fix: Reframe the question 3 ways.
```

## Part 4: Rapid Decision Heuristics

```
FOR TYPE 1 DECISIONS (Low impact, reversible):
├─ Use your first instinct
├─ Flip a mental coin if torn — your reaction to the result reveals preference
└─ Timebox: 2 minutes max

FOR TYPE 2 DECISIONS (High impact, reversible):
├─ Two-way door test: "Can I walk back through?"
├─ 10/10/10: How will I feel about this in 10 minutes / 10 months / 10 years?
└─ Timebox: 30 minutes max

FOR TYPE 3 DECISIONS (Low impact, irreversible):
├─ Regret minimization: "Which choice will I regret less?"
├─ Check with one other person
└─ Timebox: 1 hour

FOR TYPE 4 DECISIONS (High impact, irreversible):
├─ Full APEX pipeline (all 10 phases)
├─ Multiple hypotheses, adversarial review, pre-mortem
├─ Sleep on it (if timeline allows)
└─ Get external review before committing
```

## Part 5: Multi-Criteria Decision Analysis (MCDA)

### Analytical Hierarchy Process (AHP) Simplified
```
STEP 1: Define criteria (max 7 — human cognitive limit)
  Example: Performance, Maintainability, Security, Cost, Time-to-Ship

STEP 2: Pairwise comparison of criteria
  "Is Performance more important than Maintainability?"
  Scale: 1 = Equal, 3 = Moderate, 5 = Strong, 7 = Very Strong, 9 = Extreme
  
STEP 3: Derive weights from pairwise matrix
  (Normalize columns, average rows)

STEP 4: Score each option against each criterion (1-10)

STEP 5: Weighted score = Σ weight_i × score_i

STEP 6: Sensitivity analysis
  "If I change the weight of [criterion] by ±20%, does the winner change?"
  If YES → Decision is sensitive to this criterion → Verify the weight carefully
  If NO → Decision is robust
```

### Decision Matrix for Technology Selection
```
┌─────────────────┬────────┬──────────────┬──────────────┬──────────────┐
│ Criterion       │ Weight │ Option A     │ Option B     │ Option C     │
├─────────────────┼────────┼──────────────┼──────────────┼──────────────┤
│ Team expertise  │ 25%    │ 9 (2.25)     │ 5 (1.25)     │ 7 (1.75)     │
│ Ecosystem       │ 20%    │ 8 (1.60)     │ 9 (1.80)     │ 6 (1.20)     │
│ Performance     │ 20%    │ 6 (1.20)     │ 9 (1.80)     │ 8 (1.60)     │
│ Learning curve  │ 15%    │ 9 (1.35)     │ 4 (0.60)     │ 6 (0.90)     │
│ Hiring pool     │ 10%    │ 8 (0.80)     │ 6 (0.60)     │ 7 (0.70)     │
│ Long-term viab. │ 10%    │ 7 (0.70)     │ 8 (0.80)     │ 5 (0.50)     │
├─────────────────┼────────┼──────────────┼──────────────┼──────────────┤
│ TOTAL           │ 100%   │ 7.90         │ 6.85         │ 6.65         │
└─────────────────┴────────┴──────────────┴──────────────┴──────────────┘
```

## Part 6: Reversibility Assessment Framework

```
FULLY REVERSIBLE (Cost < 1 hour):
├─ Variable/function naming
├─ Code formatting
├─ Adding a dependency (can remove)
├─ Feature flag on/off
└─ DECISION SPEED: Fast. Iterate.

PARTIALLY REVERSIBLE (Cost 1 hour - 1 week):
├─ API endpoint design (clients may have adapted)
├─ Database schema changes (migration needed)
├─ Framework/library choice within a module
├─ Test strategy change
└─ DECISION SPEED: Moderate analysis. Timebox 30 min.

DIFFICULT TO REVERSE (Cost > 1 week):
├─ Programming language choice
├─ Database technology (SQL vs NoSQL vs Graph)
├─ Architecture pattern (monolith vs microservices)
├─ Authentication/authorization model
├─ Public API design (external consumers depend on it)
└─ DECISION SPEED: Full analysis. Multiple hypotheses. Adversarial review.

IRREVERSIBLE:
├─ Data deletion without backup
├─ Public communication (emails, tweets, announcements)
├─ Legal/compliance commitments
├─ Breaking changes to published APIs
└─ DECISION SPEED: Maximum analysis. Sleep on it. Get external review.
```

## Part 7: Decision Documentation Template

```
# Decision Record: [Title]

## Status: [Proposed | Accepted | Deprecated | Superseded by DR-XXX]
## Date: [YYYY-MM-DD]
## Decision Maker: [Who decided]

## Context
[What is the situation that requires a decision?]

## Decision
[What was decided, stated clearly in 1-2 sentences]

## Options Considered
### Option A: [Name]
- Pros: [...]
- Cons: [...]
- Risk: [...]

### Option B: [Name]
- Pros: [...]
- Cons: [...]
- Risk: [...]

### Option C: [Name]
- Pros: [...]
- Cons: [...]
- Risk: [...]

## Rationale
[Why this option was chosen over others]

## Consequences
- Positive: [...]
- Negative: [...]
- Neutral: [...]

## Review Date
[When should this decision be revisited?]
```
