# Deterministic-Cognitive-Infrastructure — Agent Instructions

## Runtime Rule

When working in this repo, treat DCI as a runtime framework, not prose.

## Required Flow

1. Read `SKILL.md`.
2. Read `references/REFERENCE_GRAPH.md` or executable graph `references/reference-graph.mjs` before changing references.
3. Preserve executable machine-readable graph behavior when editing `references/**/*.md`.
4. Run `python3 scripts/link_references.py` after reference changes.
5. Use `node references/runtime/dci-reference-runtime.mjs route "<task>"` for fast graph access.
6. Run `dci lifecycle` when claiming sustained DCI readiness across first-use, mid-use, runtime, and final-use.
7. Run validation locally before claiming completion.

## Prohibited Changes

Do not add empty/demo skills, fake commands, or decorative scripts. Every script must perform a real runtime, packaging, validation, or integration function.
