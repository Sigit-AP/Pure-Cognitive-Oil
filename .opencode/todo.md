# Mission: PCO audited checklist Parity & Professionalization

## M1: Audit and Trust Foundation
### T1.1: Repository truth audit | agent:Worker
- [x] S1.1.1: Run baseline gates and package dry-run; record results in `docs/professionalization-report.md` | size:M | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low
### T1.2: CI and governance | agent:Worker
- [x] S1.2.1: Add GitHub CI workflow, governance files, issue templates, PR template | size:M | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low

## M2: Documentation Architecture
### T2.1: Formal docs suite | agent:Worker
- [x] S2.1.1: Add architecture, runtime model, CLI, validation, integrations, compatibility, testing, traceability, ADR docs | size:L | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low

## M3: README and UX
### T3.1: README simplification | agent:Worker | depends:T2.1
- [x] S3.1.1: Rewrite README as entry point with quick start, demo, golden path, docs links, status limits | size:M | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low

## M4: Task-Based Skills Parity
### T4.1: PCO workflow skills | agent:Worker
- [x] S4.1.1: Add at least 14 operational `*-with-pco` skills with required metadata/sections | size:L | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low

## M5: Examples, Runtime Hardening, Benchmarks
### T5.1: Examples and golden outputs | agent:Worker
- [x] S5.1.1: Add at least 3 end-to-end examples with real/labelled outputs | size:M | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low
### T5.2: Runtime/package hardening | agent:Worker
- [x] S5.2.1: Add fixture/package validation scripts and release gate scripts | size:L | verified 2026-06-27T15:05+07:00 | evidence: npm test; npm run validate:release; npm exec tsc -- --noEmit; pco:skill-check/package-check/reference-quality pass
### T5.3: AI benchmark artifacts | agent:Worker
- [x] S5.3.1: Add benchmark task/rubric/report scaffolding without false public-user claims | size:M | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low

## M6: Verification and Integration
### T6.1: Full system verification | agent:Reviewer | depends:M1,M2,M3,M4,M5
- [x] S6.1.1: Run lint/type/test/PCO gates/pack dry-run and mark TODO complete only with evidence | size:M | verified 2026-06-27T15:13+07:00 | evidence: npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low; runtime audit 26/26 no warnings

## M7: Evidence-Based professional evolution roadmap
### T7.1: Roadmap and benchmark scaffold | agent:Worker
- [x] S7.1.1: Add bounded professional evolution roadmap, benchmark methodology, evidence graph, and expanded AI benchmark task scaffold without claiming achieved measured task quality | size:M | verified 2026-06-27T15:56+07:00 | evidence: npm run pco:evidence-graph; npm run validate:release; npm run pack:dry; npm exec tsc -- --noEmit; npm audit --audit-level=low; lsp_diagnostics unavailable in harness
