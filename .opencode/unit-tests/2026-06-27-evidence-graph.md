# Unit Test Record: evidence-graph

## Target Files
`scripts/pco/evidence-graph.mjs`
`docs/professional evolution-roadmap.md`
`docs/benchmark-methodology.md`
`docs/evidence-graph.md`
`tests/ai-benchmarks/tasks/*.md`

## Test File (DELETED)
No isolated temporary test file created; validation uses committed evidence scaffold validator because target is documentation plus CLI artifact structure.

## Test Code (Preserved)
```javascript
// Command-level regression coverage:
// npm run pco:evidence-graph
// Verifies required roadmap/methodology/evidence docs exist.
// Verifies tests/ai-benchmarks/tasks has at least 8 markdown tasks.
// Verifies each task includes Scenario, Repository Context, Expected Behavior, Hidden Traps, Evaluation Criteria.
// Verifies bounded-claim language exists in roadmap/methodology/evidence docs.
```

## Test Result
- Status: pass
- Session: ses_7
- Timestamp: 2026-06-27T15:49:00+07:00
- Evidence: `npm run pco:evidence-graph` -> `PCO evidence-graph passed: files=6, tasks=10`
- Additional gates: `npm test`, `npm run pco:index`, `npm run pco:validate`, `npm run validate:release`, `npm run pack:dry`, `npm exec tsc -- --noEmit`
