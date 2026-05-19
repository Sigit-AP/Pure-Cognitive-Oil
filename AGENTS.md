# Deterministic-Cognitive-Infrastructure — Agent Instructions

## Runtime Rule

When working in this repo, treat DCI as a runtime framework, not prose.

## Required Flow

1. Read `SKILL.md`.
2. Read `references/REFERENCE_GRAPH.md` or `references/reference-graph.json` before changing references.
3. Preserve machine-readable graph behavior when editing `references/**/*.md`.
4. Run `python3 scripts/link_references.py` after reference changes.
5. Run validation locally before claiming completion.

## Prohibited Changes

Do not add placeholder skills, fake commands, or decorative scripts. Every script must perform a real runtime, packaging, validation, or integration function.
