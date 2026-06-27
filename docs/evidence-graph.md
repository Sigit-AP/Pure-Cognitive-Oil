# Evidence Graph

The evidence graph maps PCO claims to source artifacts, validation commands, benchmark artifacts, and explicit limitations. It exists to prevent unsupported public claims.

## Current Graph

| Claim ID | Claim | Evidence Artifacts | Validation | Limitation |
|---|---|---|---|---|
| C-001 | PCO has professional parity foundation artifacts. | `docs/`, `.github/`, governance files, `examples/`, `skills/` | `npm run validate:release`, `npm run pack:dry`, `npm exec tsc -- --noEmit` | Public GitHub CI must run after push. |
| C-002 | PCO has AI benchmark scaffold for future evaluation. | `docs/benchmark-methodology.md`, `tests/ai-benchmarks/` | `npm run pco:evidence-graph` | Scaffold does not prove task quality. |
| C-003 | PCO professional evolution roadmap is evidence-bound. | `docs/professional evolution-roadmap.md`, this file | `npm run pco:evidence-graph` | Roadmap is a plan, not achieved professional evolution result. |
| C-004 | PCO forbids unscoped professional evolution superiority claims. | `docs/claims-and-evidence.md`, benchmark methodology, task hidden traps | `npm run pco:evidence-graph` | Text checks cannot catch every semantic overclaim. |

## Evidence Types

- Source: code, docs, configuration, examples.
- Command: local verification output or CI output.
- Benchmark: task, raw output, evaluator score, report.
- Limitation: explicit scope boundary or non-claim.

## Maintenance Rules

- Add one row for each public comparison claim.
- Every row needs at least one evidence artifact and one limitation.
- Benchmark claims need raw outputs and evaluator records, not report summary only.
- If evidence is missing, downgrade claim to roadmap or remove it.

## Validation

Run:

```bash
npm run pco:evidence-graph
```

The validator checks required roadmap, methodology, task, rubric, and claim-boundary artifacts exist. It does not prove claim truth by itself.
