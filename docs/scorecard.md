# DCI 2x Infrastructure Scorecard

This scorecard measures DCI against the inspected Superpowers baseline for infrastructure coverage, not universal answer quality.

## Baseline

The Superpowers baseline is represented as 16 first-use/runtime infrastructure features:

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

## DCI Target

DCI must pass at least 32 audited infrastructure checks, giving `>=2.0x` coverage against the 16-feature baseline.

The target spans the full lifecycle:

- first use: hook, boot contract, plugin injection, JSON envelopes, dedupe, cache;
- mid use: executable reference graph, folder runtimes, route/context commands, lifecycle checkpoint;
- finish: validation, runtime audit, healthcheck, parity, scorecard, package dry-run.

## Command

```bash
node scripts/dci/scorecard.mjs
npm run dci:scorecard
```

Expected pass condition:

```text
claimValid: true
ratio: >=2x
```

## Caveat

A repository scorecard can prove infrastructure coverage. It cannot prove every future task, answer, model run, or integration is objectively 2x better. Claims must stay tied to command output.
