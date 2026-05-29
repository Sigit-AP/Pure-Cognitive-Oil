# Pure Cognitive Oil — Claude Instructions

## Boot Rule

Load `SKILL.md` first. For deep work, load `references/REFERENCE_GRAPH.md` or `references/reference-graph.mjs`, then run `node references/runtime/pco-reference-runtime.mjs route "<task>"` before acting.

## Reference Change Rule

After editing any `references/**/*.md`, run:

```bash
python3 scripts/link_references.py
```

## Completion Rule

Only report completion after validation evidence exists. Run `pco lifecycle` for sustained first-use, mid-use, runtime, and final-use evidence before claiming strong PCO readiness. Do not create empty/demo scripts or fake commands.
