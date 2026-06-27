# Runtime Data Model

## Resource Entry

```json
{
  "path": "references/workflows/security-audit.md",
  "axis": "Reliability",
  "kind": "workflow",
  "summary": "Security audit procedure",
  "tags": ["security", "audit"],
  "validation": "documented"
}
```

## Skill Object

```json
{
  "name": "systematic-debugging-with-pco",
  "description": "Use when debugging failures with PCO routing and evidence gates.",
  "path": "skills/systematic-debugging-with-pco/SKILL.md",
  "requiredSections": ["Overview", "Procedure", "Required Evidence"]
}
```

## Context Pack

Context packs should contain task summary, selected references, selected skills, constraints, validation plan, and residual risks. Context packs must be bounded by resource budget.

## Cache Artifacts

`.pco/cache/` may hold generated indexes. Cache is derived, not source of truth.
