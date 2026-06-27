---
name: subagent-driven-development-with-pco
description: Use when performing subagent driven development work with PCO routing, bounded context, evidence gates, and honest completion language.
---

# subagent driven development with PCO

## Overview
Use this skill to apply PCO operating loop to subagent driven development work: understand, route, load bounded context, plan, execute, verify, audit, and finalize.

## When to Use
- Task matches subagent driven development workflow.
- Work has enough risk to need explicit evidence.
- Agent may need references, validation commands, or residual-risk reporting.

## When Not to Use
- Trivial one-line answers with no file or decision impact.
- Tasks where user explicitly forbids framework overhead.
- Work requiring protected secrets or destructive operations without permission.

## Inputs
- User task.
- Current repository state.
- Relevant route output from `pco references route` when available.
- Validation commands from `docs/validation.md`.

## Procedure
1. Restate task and risk boundary.
2. Route context with PCO runtime or file-only fallback.
3. Select minimal relevant references and docs.
4. Create verifiable steps.
5. Execute smallest useful change.
6. Run focused validation first, then release gate when needed.
7. Report evidence, gaps, and residual risk.

## Required Evidence
- Files read or changed.
- Commands run and exit status.
- Test, build, validation, or review output.
- Known limitations if validation is partial.

## Validation Commands
```bash
npm test
npm run pco:validate
npm run pco:readiness
npm run pco:runtime-audit
npm run pco:healthcheck
npm run pco:scorecard
npm run validate:release
```

## Output Contract
Return: task summary, route/context used, changes made, validation evidence, residual risks, and next action.

## Failure Modes
- Skipping route and loading too much context.
- Claiming pass without command evidence.
- Over-engineering beyond current task.
- Treating PCO as proof of correctness instead of process support.

## Red Flags
- Words like guaranteed, universally better, or measurable improvement without benchmark evidence.
- No validation command.
- Hidden dependency on local-only secrets.
- Large unrelated rewrites.

## Related References
- `AI_MODEL_BOOT.md`
- `SKILL.md`
- `docs/validation.md`
- `docs/claims-and-evidence.md`
- `references/runtime/pco-reference-runtime.mjs`
