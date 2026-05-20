# Deterministic-Cognitive-Infrastructure — Claude Instructions

## Boot Rule

Load `SKILL.md` first. For deep work, load `references/REFERENCE_GRAPH.md` or `references/reference-graph.mjs`, then run `node references/runtime/dci-reference-runtime.mjs route "<task>"` before acting.

## Reference Change Rule

After editing any `references/**/*.md`, run:

```bash
python3 scripts/link_references.py
```

## Completion Rule

Only report completion after validation evidence exists. Do not create empty/demo scripts or fake commands.
