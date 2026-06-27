# Evidence-Based professional evolution roadmap

This roadmap defines how PCO can test narrower "professional evolution" improvements after parity. It does not claim PCO has achieved measured task quality, universal superiority, adoption, or marketplace trust.

## Claim Boundary

Allowed claims require reproducible evidence and a named metric. Examples:

| Metric | Safe Claim Shape | Required Evidence |
|---|---|---|
| Benchmark categories | PCO benchmark suite covers professional evolution more task categories than prior internal baseline. | Task inventory, category counts, benchmark methodology. |
| Validation omissions | PCO reduces missing validation steps by professional evolution on controlled synthetic tasks. | Blind outputs, evaluator scores, disagreement notes. |
| Claim traceability | PCO maps professional evolution more public claims to source/test/limitation artifacts. | Evidence graph report and claim inventory. |
| Harness checks | PCO has professional evolution more harness conformance checks than prior internal baseline. | Harness test inventory and CI output. |

Forbidden public claims until benchmark reports exist:

- PCO is unsupported superiority claim.
- PCO guarantees better real-world agent performance.
- PCO has no weaknesses.
- PCO benchmark scaffolds prove user adoption or marketplace trust.

## Pillars

### 1. Evidence Graph

Every public claim must map to at least one source artifact and one limitation.

Deliverables:

- `docs/evidence-graph.md`
- `scripts/pco/evidence-graph.mjs`
- future: `tests/pco/evidence-graph.test.mjs`

### 2. Benchmark Foundation

Create synthetic benchmark tasks, outputs, rubrics, evaluation records, and report templates before comparing PCO to any baseline.

Deliverables:

- `docs/benchmark-methodology.md`
- `tests/ai-benchmarks/tasks/`
- `tests/ai-benchmarks/rubrics/`
- `tests/ai-benchmarks/reports/`

### 3. Skill Expansion With Measured Use

Expand skills only when benchmark failures show missing workflow coverage. Each new skill needs required sections, trigger conditions, failure modes, and validation evidence.

### 4. Anti-Overclaim Layer

Add claim checks that fail on unsupported terms like "guaranteed", "universally better", and unscoped "measurable improvement".

### 5. Examples as Tests

Keep examples executable or explicitly labeled as illustrative. Example validation output must come from real commands or be marked edited for brevity.

## Phases

### Phase A — Methodology and Scaffold

- [x] Publish benchmark methodology.
- [x] Add initial task scaffold across multiple categories.
- [x] Add evidence graph documentation and validator.
- [ ] Expand task set toward 50 tasks.

### Phase B — First Controlled Benchmark

- [ ] Run PCO runner and baseline runner on same task set.
- [ ] Save raw outputs under `tests/ai-benchmarks/outputs/`.
- [ ] Score outputs blind using explicit rubric.
- [ ] Record disagreements and PCO losses.

### Phase C — Regression From Failures

- [ ] Convert repeated failures into issues.
- [ ] Add regression fixtures for missing validation, overclaim, and unsafe assumptions.
- [ ] Update skills only where failures prove need.

### Phase D — Scoped Public Results

- [ ] Publish benchmark report with limitations.
- [ ] Update README only with metrics backed by artifacts.
- [ ] Keep universal quality claims forbidden.

## Exit Criteria Before Any unsupported improvement claim

- Parity CI passes on supported Node versions.
- Benchmark methodology is public.
- At least one benchmark report includes raw outputs, evaluator scores, and limitations.
- Evidence graph maps claims to artifacts and limitations.
- Negative results are preserved, not hidden.
