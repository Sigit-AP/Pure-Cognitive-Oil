# Contributing

## Development Flow

1. Fork or branch from `main`.
2. Run `npm ci`.
3. Make focused changes only.
4. Run required validation before opening PR:

```bash
npm test
npm run pco:validate
npm run pco:readiness
npm run pco:runtime-audit
npm run pco:healthcheck
npm run pco:scorecard
npm run validate:release
```

## Evidence Rule

Do not claim a command passes unless you ran it and can cite output. If a check fails, include failure and follow-up in PR notes.

## Documentation Rule

Changes to CLI, skills, references, validation, package files, or harness behavior must update relevant docs under `docs/`.
