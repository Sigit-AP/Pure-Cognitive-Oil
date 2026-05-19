# Deterministic-Cognitive-Infrastructure — Claude Instructions

## Boot Rule

Load `SKILL.md` first. For deep work, load `references/REFERENCE_GRAPH.md` or `references/reference-graph.json` and route through the graph before acting.

## Reference Change Rule

After editing any `references/**/*.md`, run:

```bash
python3 scripts/link_references.py
```

## Completion Rule

Only report completion after validation evidence exists. Do not create placeholder scripts or commands.
