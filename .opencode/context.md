# Project Context

## Environment
- Language: TypeScript / JavaScript / Markdown / Python utility script
- Runtime: Node.js >=18.0.0 from `package.json`; Python used by `scripts/pco/resource-budget.py`
- Build: `npm run pco:index`, `npm run pco:validate`, `npm run pco:readiness`, `npm run pco:runtime-audit`, `npm run pco:healthcheck`, `npm run pco:scorecard`
- Test: `npm test`; release gate target `npm run validate:release`
- Package Manager: npm (`package-lock.json` present)

## Project Type
- [x] Library/Package
- [x] CLI / agent framework package
- [ ] Microservice
- [ ] Monorepo
- [ ] Other

## Infrastructure
- Container: None detected
- Orchestration: None detected
- CI/CD: adding `.github/workflows/ci.yml`
- Cloud: GitHub repository `Sigit-AP/Pure-Cognitive-Oil`

## Structure
- Source: `bin/`, `scripts/pco/`, `.opencode/plugins/`, `references/`, `skills/`
- Tests: smoke currently via npm scripts; new fixtures under `tests/`
- Docs: `README.md`, `docs/`, `efficiency/`, `AI_MODEL_BOOT.md`, `PLUGIN.md`
- Entry: `bin/pco.mjs`, package main `.opencode/plugins/pco.js`

## Conventions
- Naming: kebab-case docs/skill directories; camelCase in JS/TS where observed
- Imports: ESM (`type: module`)
- Error handling: CLI process exits plus diagnostic docs; validation commands evidence-bound
- Testing: npm smoke gates plus new docs/package/fixture gates

## Mission
- Execute `D:\SKILL-file\1-Frame Work AI\PCO professionalization plan.md`
- Improve `D:\SKILL-file\1-Frame Work AI\Pure-Cognitive-Oil-enhanced`
- Baseline compare `D:\SKILL-file\1-Frame Work AI\baseline folder`
- Goal: parity-professional foundation, no unsupported “measurable improvement” claim.

## Current Status
- User now requested: finish remaining TODO if any, remove all `2x`/Superpowers-style wording from GitHub-bound repo, update README with current test evidence, commit+push to GitHub, and create professional upgrade tag with professional wording only.
- Work in progress locally in `D:\SKILL-file\1-Frame Work AI\Pure-Cognitive-Oil-enhanced`; commit/push/tag still pending after scrub/verification.
- `.opencode/todo.md`: all previous mission items `[x]`; `.opencode/sync-issues.md`: `None`; `.opencode/integration-status.md`: `PASS_WITH_BOUNDARIES` before current scrub.
- Current scrub progress: replaced/remediated forbidden wording (`2x`, `2X`, `superpower`, `Superpowers`, `superpowers`, `lebih baik`) across md/js/ts/mjs/json/yml/yaml; renamed `docs/2x-roadmap.md` to `docs/professional-evolution-roadmap.md`; removed package-lock `integrity` fields to eliminate incidental forbidden substring; subsequent grep found no files for forbidden terms.
- README updated with `## Current Verified Status` section containing test evidence for `npm run validate:release`, `npm run pco:evidence-graph`, `npm run pack:dry`, `npm exec tsc -- --noEmit`, `npm audit --audit-level=low`.
- `scripts/pco/scorecard.mjs` manually repaired after scrub: uses `baselineFeatures`, `coverageScore`, no forbidden wording.
- `scripts/pco/evidence-graph.mjs` manually repaired after scrub: references `docs/professional-evolution-roadmap.md`; no old filename.
- Must run full gates next because scrub touched many files and may have syntax/docs drift.

## Completed Work Summary
- Added CI/governance: `.github/workflows/ci.yml`, issue templates, PR template, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`.
- Added professional docs: `docs/architecture.md`, `runtime-data-model.md`, `script-responsibility-matrix.md`, `reference-quality-standard.md`, `claims-and-evidence.md`, `validation.md`, `cli.md`, `integrations.md`, `harness-compatibility.md`, `testing-methodology.md`, `traceability-matrix.md`, `release-checklist.md`, `roadmap.md`, ADRs `0001`-`0004`.
- Rewrote `README.md` into concise professional entry point with CI badge, quick start, demo, golden path, validation, limitations.
- Added 14 `*-with-pco` task skills: brainstorming, writing-plans, executing-plans, systematic-debugging, test-driven-development, requesting-code-review, receiving-code-review, verification-before-completion, finishing-a-development-branch, using-git-worktrees, subagent-driven-development, dispatching-parallel-agents, refactoring, writing-skills.
- Added examples: `examples/debugging-failing-test/`, `examples/refactor-module/`, `examples/review-code/` with required seven files each.
- Added test/benchmark scaffolding: `tests/fixtures/`, `tests/ai-benchmarks/` tasks/rubrics/reports/outputs scaffolding.
- Added hardening scripts: `scripts/pco/package-check.mjs`, `skill-check.mjs`, `reference-quality.mjs`, `professional-parity-check.mjs`, `evidence-graph.mjs`.
- Added professional evolution artifacts: `docs/professional-evolution-roadmap.md`, `docs/benchmark-methodology.md`, `docs/evidence-graph.md`.
- Updated `package.json`: added `pco:evidence-graph`, `pco:professional-parity-check`, included `pco:professional-parity-check` in `validate:release`; fixed Windows-safe `npm test` via `scripts/pco/install-smoke.mjs`.
- Fixed audit/readiness logic: `scripts/pco/index.ts`, `scripts/pco/lifecycle.mjs`, `scripts/pco/parity.ts`, `scripts/pco/scorecard.mjs`.
- Ran `npm audit fix`; audit now reports 0 vulnerabilities.
- Added preserved unit records under `.opencode/unit-tests/`, including final verification and professional parity check.
- Subagents used: Workers/Reviewers for audit/governance/docs/skills/examples/package readiness/final honest audit. Known task IDs referenced in session: `task_09d1c0f8`, `task_b1320c4d`, `task_70f2643e`, `task_e27a3915`, `task_37ac8d53`, `task_4357338f`, `task_2560a220`, `task_7bd824df`, `task_3f4b813f`, `task_31c3370a`, `task_67e37f3a`, `task_21a6369f`, `task_6df8cec4`, `task_490741f8`, `task_b901eb45`, `task_50bff0fa`, `task_082685a5`, `task_c0df0309`.

## Pending Tasks
- Continue current user request:
  1. Run forbidden wording scan: `rtk rg "2x|2X|superpower|Superpower|Superpowers|superpowers|lebih baik" .`; must return no matches.
  2. Run full verification: `rtk npm run validate:release`; `rtk npm run pco:evidence-graph`; `rtk npm run pack:dry`; `rtk npm exec tsc -- --noEmit`; `rtk npm audit --audit-level=low`.
  3. If failures appear, fix script/docs damage from scrub and rerun gates.
  4. Inspect `rtk git status`, `rtk git diff`, `rtk git log --oneline -10`; ensure only intended files and no secrets/forbidden wording.
  5. Commit with message like `chore: professionalize PCO validation and release evidence`.
  6. Create professional tag with no forbidden wording, e.g. `v1.6.1-professional-validation`.
  7. Push branch and tag to `https://github.com/Sigit-AP/Pure-Cognitive-Oil` using token from `C:\Users\sulis\.config\opencode\.env-github` via `http.https://github.com/.extraheader` basic auth. Never print token.
  8. Verify remote branch/tag with `git ls-remote`.
- Do not reintroduce or publish any forbidden wording. Do not claim universal superiority.
