---
name: dci-routing
description: Use when deciding which DCI files, sections, concepts, or workflows to load for a task.
---

## Procedure

1. Run or trust fresh generated cache:
   ```bash
   npm run dci:all
   ```
2. Read `.dci/cache/agent-routing.json`.
3. Select route by task intent:
   - `need-thinking`
   - `need-reasoning`
   - `need-agentic`
   - `need-knowledge`
   - `need-reliability`
   - `need-intelligence`
   - `any-professional-task`
4. Load route `requiredFiles` first.
5. Expand with:
   - `resource-map.prerequisites[file]`
   - `resource-map.neighbors[file]`
   - `resource-map.byConcept[term]`
   - `resource-map.byCapability[capability]`
6. Use section IDs from `manifest.files[].sections[]` for targeted context.

## Routing Discipline

Never route only by filename. Route by:

```text
task intent → axis → workflow → concept → dependency → graph neighbor → section
```

## Failure Modes

- If route is ambiguous, choose `any-professional-task`.
- If concept match is weak, load core + quality-safety + workflow index.
- If graph has too many neighbors, sort by weight and load top 5 first.
