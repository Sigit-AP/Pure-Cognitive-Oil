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

Load or generate current DCI context:

```bash
npm run dci:all
npm run dci:bootstrap
```

Then use:

```text
.dci/cache/context-pack.json
.dci/cache/resource-map.json
.dci/cache/agent-routing.json
.dci/cache/audit-report.json
```

## Rule

Before acting:

1. Identify task type.
2. Choose route from `agent-routing.json`.
3. Load startup files.
4. Load required route files.
5. Expand via prerequisites, concepts, and graph neighbors.
6. Execute with the DCI phase pipeline.
7. Verify through quality/safety gates.

## Red Flags

| Thought | Reality |
|---|---|
| "This is simple" | Simple tasks still need skill check. |
| "I remember the framework" | Generated maps change; read current cache. |
| "I can answer first" | DCI route check comes before output. |
| "I'll inspect later" | Context selection is the first step. |
| "One file is enough" | DCI is graph-based; expand by neighbors and dependencies. |

## Completion Gate

Do not finish until:

- `npm run dci:validate` passes,
- evidence exists for all claims,
- quality/safety resources were considered,
- the selected route and loaded resources are known.
