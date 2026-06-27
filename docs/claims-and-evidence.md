# Claims and Evidence

| Claim | Evidence | Limit |
|---|---|---|
| PCO provides a portable agent operating layer. | `SKILL.md`, `AI_MODEL_BOOT.md`, harness folders, CLI. | Harness adapters may differ. |
| PCO can route references for tasks. | `references/runtime/pco-reference-runtime.mjs`, `pco references route`. | Route quality depends on corpus and task clarity. |
| PCO has validation gates. | `npm test`, `pco:validate`, `pco:readiness`, `pco:runtime-audit`, `pco:healthcheck`. | Gates do not prove absence of all defects. |
| PCO has professionalization artifacts. | CI workflow, governance files, docs, examples, skills. | Public CI must run on GitHub after push. |
| PCO has an evidence-based professional evolution roadmap. | `docs/professional evolution-roadmap.md`, `docs/benchmark-methodology.md`, `docs/evidence-graph.md`, `tests/ai-benchmarks/`. | Roadmap and scaffolds do not prove achieved measured task quality. |
| PCO can validate benchmark/evidence scaffolds. | `scripts/pco/evidence-graph.mjs`, `npm run pco:evidence-graph`. | Validator checks artifact structure and claim boundaries, not real-world performance. |

## Forbidden Claims

- “unsupported superiority claim” without benchmark methodology and reproducible results.
- “Guaranteed correct.”
- “All vulnerabilities impossible.”
