---
name: dci-verification
description: Use before claiming a DCI task is complete, especially after changing scripts, mappings, hooks, skills, or generated context.
---

## Mandatory Checks

Run:

```bash
npm run dci:all
npm exec tsc -- --noEmit
node scripts/dci/bootstrap.mjs --json >/tmp/dci-bootstrap.json
python -m json.tool /tmp/dci-bootstrap.json >/dev/null
```

## Required Pass Conditions

- all files indexed,
- all `.md` files sectioned,
- six-axis coverage passes,
- concept graph is built,
- professional load plans exist,
- bootstrap JSON parses,
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
