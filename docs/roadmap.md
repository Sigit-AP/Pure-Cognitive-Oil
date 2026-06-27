# Roadmap

## Parity Milestone

- CI-backed validation.
- Governance files.
- Formal docs.
- Task-based skills.
- Examples.
- Package/release validation.

## Post-Parity professional evolution Research

Only after parity gates pass, explore measurable improvements: broader benchmark categories, stronger traceability, more harness tests, more examples, and fewer missing validation steps on controlled tasks.

This section is a roadmap, not a claim that PCO has achieved measured real-world task quality.

### Bounded professional evolution Pillars

| Pillar | Deliverable | Evidence Gate |
|---|---|---|
| Evidence graph | `docs/evidence-graph.md`, `scripts/pco/evidence-graph.mjs` | `npm run pco:evidence-graph` |
| Benchmark harness | `docs/benchmark-methodology.md`, `tests/ai-benchmarks/` | task/rubric/report artifacts with blind scoring |
| Adaptive skill router | future `scripts/pco/skill-router.mjs` | fixture-backed routing decisions |
| Reference quality enforcement | `scripts/pco/reference-quality.mjs`, `docs/reference-quality-standard.md` | `npm run pco:reference-quality` |
| Multi-harness conformance | harness compatibility docs and future tests | CI-backed harness fixtures |
| Release automation | CI, release checklist, package dry-run | `npm run validate:release`, `npm run pack:dry` |
| Anti-overclaim layer | claims docs, claim/evidence checks | forbidden-claim checks and reviewer audit |
| Examples as tests | `examples/`, future verifier | example validation output from real commands |

### Phases

1. Benchmark foundation: expand task set, keep runner outputs, score blind, report losses.
2. Skill expansion: add skills only when benchmark failures show missing workflow coverage.
3. Evidence automation: enforce claim traceability before public comparisons.
4. Advanced runtime: add deterministic mode, budget, route explanation, and graph-output tests.
5. Multi-agent evaluation: add red-team, security, packaging, and UX evaluator prompts.
6. Public positioning: publish only bounded, benchmark-backed claims with limitations.

### Forbidden Until Reproducible Benchmark Results Exist

- “PCO is unsupported superiority claim.”
- “PCO guarantees correct reasoning.”
- “PCO has no weaknesses.”
- “PCO benchmark scaffolds prove user adoption.”
