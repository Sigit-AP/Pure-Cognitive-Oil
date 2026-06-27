# Validation

Run before release or completion claims:

```bash
npm test
npm run pco:validate
npm run pco:readiness
npm run pco:runtime-audit
npm run pco:healthcheck
npm run pco:scorecard
npm run validate:release
npm pack --dry-run
```

Passing these commands supports scoped release readiness. It does not prove universal quality.
