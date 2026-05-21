---
name: using-dci
description: Use when starting any serious task or whenever DCI resources may apply; bootstraps deterministic cognitive routing before action.
---

<EXTREMELY-IMPORTANT>
If there is even a 1% chance any DCI resource applies, use DCI before responding or acting.

This is not optional for planning, coding, debugging, auditing, research, architecture, reasoning, or verification.
</EXTREMELY-IMPORTANT>

## Priority

1. User instructions are highest priority.
2. DCI skills/resources define HOW to think and execute.
3. Default model habits are lowest priority.

## Mandatory Startup

DCI starts with an AMT-native boot contract, not blind copying:

1. **Amati** — detect task intent, risk, uncertainty, and applicable cognitive resources.
2. **Tiru** — reuse the proven first-use discipline: boot context first, route before action, avoid duplicate injection.
3. **Modifikasi** — make it DCI-specific: executable graph routing, evidence gates, full-read coverage, and runtime audit.

Use zero-dependency bootstrap and executable runtime first:

```bash
node scripts/dci/bootstrap.mjs --json
node references/runtime/dci-reference-runtime.mjs route "<task>" --limit 8 --depth 1
node references/runtime/dci-reference-runtime.mjs context "<task>" --limit 8 --depth 1
```

Folder-specific runtimes exist for targeted loading:

```bash
node references/core/runtime.mjs route "<task>"
node references/cognitive-engines/runtime.mjs route "<task>"
node references/quality-safety/runtime.mjs route "<task>"
node references/knowledge-bases/runtime.mjs route "<task>"
node references/advanced/runtime.mjs route "<task>"
node references/workflows/runtime.mjs route "<task>"
```

Generated `.dci/cache/*.json` files are compatibility artifacts only. Do not route from JSON when the executable runtime is available.

## Rule

Before acting:

1. Identify task type.
2. Run the reference runtime route for the task.
3. Load startup files returned by the route.
4. Load required route files and folder runtime outputs.
5. Expand via prerequisites, concepts, sections, and graph neighbors.
6. Execute with the DCI phase pipeline.
7. Verify through quality/safety gates.

## Red Flags

| Thought | Reality |
|---|---|
| "This is simple" | Simple tasks still need skill check. |
| "I remember the framework" | Runtime graph changes; run current route. |
| "I can answer first" | DCI runtime route check comes before output. |
| "I'll inspect later" | Context selection is the first step. |
| "One file is enough" | DCI is graph-based; expand by neighbors and dependencies. |

## Completion Gate

Do not finish until:

- `npm run dci:validate` passes,
- `npm run dci:healthcheck` passes for infrastructure changes,
- `npm run dci:scorecard` passes before any 2x infrastructure claim,
- evidence exists for all claims,
- quality/safety resources were considered,
- the selected route and loaded resources are known.
