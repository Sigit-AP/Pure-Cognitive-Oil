---
name: pco-routing
description: Use when deciding which PCO files, sections, concepts, or workflows to load for a task.
---

## Procedure

1. Run the executable reference runtime:
   ```bash
   node references/runtime/pco-reference-runtime.mjs route "<task>" --limit 8 --depth 1
   ```
2. For deeper context, generate an embedded context block:
   ```bash
   node references/runtime/pco-reference-runtime.mjs context "<task>" --limit 8 --depth 1
   ```
3. If the task is subsystem-specific, use that folder runtime:
   ```bash
   node references/workflows/runtime.mjs route "<task>"
   node references/quality-safety/runtime.mjs route "<task>"
   node references/cognitive-engines/runtime.mjs route "<task>"
   ```
4. Load selected startup files first.
5. Expand with runtime neighbors, concepts, axes, and section IDs.
6. Use `.pco/cache/*.json` only as compatibility output when a harness cannot import/run the executable runtime.

## Routing Discipline

Never route only by filename. Route by:

```text
task intent → axis → workflow → concept → dependency → graph neighbor → section
```

## Failure Modes

- If route is ambiguous, choose `any-professional-task`.
- If concept match is weak, load core + quality-safety + workflow index.
- If graph has too many neighbors, sort by weight and load top 5 first.
