---
name: pco-verification
description: Use before claiming a PCO task is complete, especially after changing scripts, mappings, hooks, skills, or generated context.
---

## Mandatory Checks

Run:

```bash
npm run pco:all
npm run pco:healthcheck
npm run pco:scorecard
npm run pco:runtime-audit
npm exec tsc -- --noEmit
node scripts/pco/bootstrap.mjs --json >/tmp/pco-bootstrap.json
python -m json.tool /tmp/pco-bootstrap.json >/dev/null
```

## Required Pass Conditions

- all files indexed,
- all `.md` files sectioned,
- six-axis coverage passes,
- concept graph is built,
- professional load plans exist,
- bootstrap JSON parses,
- healthcheck passes,
- professional scorecard passes before any expanded infrastructure claim,
- runtime audit passes,
- TypeScript passes,
- no generated cache is accidentally required as committed source.

## Completion Statement

When reporting completion, include:

```text
files indexed
sections extracted
concepts mapped
graph edges
audit status
readiness score
commit hash
push status
```
