# Pure Cognitive Oil

[![CI](https://github.com/Sigit-AP/Pure-Cognitive-Oil/actions/workflows/ci.yml/badge.svg)](https://github.com/Sigit-AP/Pure-Cognitive-Oil/actions/workflows/ci.yml)

Pure Cognitive Oil is a portable operating layer that helps AI coding agents route complex tasks, load bounded context, plan execution, verify work, and report evidence honestly.

## Why PCO Exists

AI agents often skip context, overclaim, or finish without verification. PCO gives them a repeatable loop:

```text
Understand → Route → Load Context → Plan → Execute → Verify → Audit → Finalize
```

PCO is not a guarantee of correctness. It is an evidence-first operating layer with bounded claims, explicit validation gates, and documented limitations.

## Quick Start

```bash
git clone https://github.com/Sigit-AP/Pure-Cognitive-Oil.git
cd Pure-Cognitive-Oil
npm ci
npm test
```

## 60-Second Demo

```bash
npm run pco:bootstrap -- --json
node references/runtime/pco-reference-runtime.mjs route "debug a failing test" --limit 4 --depth 0
node scripts/pco/mode-selector.mjs "debug a failing test" --json
npm run pco:healthcheck
```

## Golden Path

1. Read `AI_MODEL_BOOT.md` for direct model use.
2. Read `SKILL.md` for master operating discipline.
3. Route task through `pco references route` or runtime fallback.
4. Pick a task skill from `skills/`.
5. Execute with evidence.
6. Run validation before completion claims.

## Core Workflow

| Phase | Purpose | Evidence |
|---|---|---|
| Understand | Clarify task, scope, risk. | task summary |
| Route | Select references and skills. | route output |
| Load Context | Keep context bounded. | compact index/resource budget |
| Plan | Make steps verifiable. | plan or TODO |
| Execute | Change only needed files. | diff |
| Verify | Run gates. | command output |
| Audit | Check claims and residual risk. | report |
| Finalize | State result honestly. | evidence links |

## Main Commands

```bash
pco help
pco bootstrap --json
pco references route "debug a failing test"
pco references capsule "debug a failing test"
pco agentic-auto "ship a verified feature safely"
pco validate
pco readiness
npm run validate:release
```

## Integrations

PCO includes OpenCode, Claude-style, Codex-style, Cursor-style, and direct model surfaces. See `docs/integrations.md` and `docs/harness-compatibility.md` for status and limits.

## Validation

Release gate:

```bash
npm test
npm run pco:validate
npm run pco:readiness
npm run pco:runtime-audit
npm run pco:healthcheck
npm run pco:scorecard
npm run validate:release
npm pack --dry-run
```

## Current Verified Status

Latest local verification before this release:

```text
npm run validate:release
PASS: test, validate, readiness, runtime-audit, healthcheck, scorecard, skill-check, package-check, reference-quality, professional-parity-check

npm run pco:evidence-graph
PASS: evidence graph check passed

npm run pack:dry
PASS: package dry-run produced pure-cognitive-oil-1.6.1-direct-use.1.tgz

npm exec tsc -- --noEmit
PASS: ok

npm audit --audit-level=low
PASS: found 0 vulnerabilities
```

This evidence proves repository validation, packaging, runtime checks, skill checks, and documentation checks inside the current audit boundary. It does not prove universal correctness for every future task.

## Status and Limitations

- Local scripts and docs provide professional-grade scaffolding.
- GitHub Actions badge reflects remote CI only after workflow runs on GitHub.
- AI-assisted benchmarks are supporting evidence only, not real-user adoption proof.
- Public claims must stay tied to command output, repository evidence, and documented limitations.

## Documentation

- `docs/architecture.md`
- `docs/runtime-data-model.md`
- `docs/script-responsibility-matrix.md`
- `docs/claims-and-evidence.md`
- `docs/validation.md`
- `docs/cli.md`
- `docs/integrations.md`
- `docs/harness-compatibility.md`
- `docs/testing-methodology.md`
- `docs/traceability-matrix.md`
- `docs/release-checklist.md`
- `examples/`
- `skills/`
