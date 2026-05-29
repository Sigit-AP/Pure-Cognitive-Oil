# Superpowers Baseline Audit

This file records the baseline used by `scripts/pco/scorecard.mjs`.

## Inspected baseline features

The baseline is counted as 16 infrastructure features:

1. session-start hook
2. bootstrap skill loaded at first use
3. platform-specific JSON envelopes
4. Claude hook manifest
5. Cursor hook manifest
6. Windows/Unix hook wrapper
7. OpenCode plugin
8. skills path registration
9. bootstrap content cache
10. duplicate injection guard
11. plugin loading test
12. bootstrap caching test
13. packaged skills directory
14. zero-dependency first-use hook
15. first-message injection
16. skill ecosystem documentation

## PCO extension principle

PCO does not copy Superpowers content. It uses AMT:

- Amati: inspect the first-use reliability pattern.
- Tiru: keep boot, hook, cache, and dedupe discipline.
- Modifikasi: add executable graph runtime, full-read reference audit, lifecycle gates, healthcheck, and 2x scorecard.

## Valid claim boundary

The valid claim is:

> PCO has at least 2x audited infrastructure coverage against this Superpowers baseline across first-use, runtime, and finish stages.

The invalid claim is:

> PCO is universally 2x better for every model output or every possible user task.
