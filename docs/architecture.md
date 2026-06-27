# Architecture

PCO is a portable operating layer for AI coding agents. It coordinates task intake, reference routing, bounded context loading, planning, execution, verification, audit, and honest final reporting.

## Layers

| Layer | Files | Responsibility | Failure Mode |
|---|---|---|---|
| Boot | `AI_MODEL_BOOT.md`, `SKILL.md`, `skills/using-pco/` | Tell models how to start PCO without plugin assumptions. | Agent skips routing or evidence rules. |
| CLI | `bin/pco.mjs` | Expose bootstrap, references, validation, readiness, healthcheck commands. | Bad command mapping or unsupported shell assumptions. |
| Runtime | `references/runtime/`, `scripts/pco/` | Route tasks, build indexes, audit references, validate package state. | Stale index, missing reference, noisy result. |
| Skills | `skills/` | Operational task workflows. | Skill too meta or lacks validation contract. |
| Docs | `docs/`, `efficiency/` | Explain architecture, commands, evidence, limits. | Docs overclaim or drift from implementation. |
| Harness | `.opencode/`, `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, `.agents/` | Adapter surfaces for compatible AI harnesses. | Harness behavior differs from documented status. |

## Operating Loop

`Understand → Route → Load Context → Plan → Execute → Verify → Audit → Finalize`

PCO improves consistency inside this boundary. It does not guarantee universal task quality.
