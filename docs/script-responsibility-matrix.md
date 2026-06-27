# Script Responsibility Matrix

| Command | Script | Purpose | Evidence |
|---|---|---|---|
| `npm test` | package script | Lean install/runtime smoke gate. | exit code |
| `npm run pco:validate` | `scripts/pco/validate.ts` | Validate package/docs/skills expectations. | exit code + diagnostics |
| `npm run pco:readiness` | `scripts/pco/parity.ts` | Readiness/parity checks. | exit code |
| `npm run pco:runtime-audit` | `scripts/pco/runtime-audit.mjs` | Runtime/reference audit. | exit code |
| `npm run pco:healthcheck` | `scripts/pco/healthcheck.mjs` | CLI/runtime healthcheck. | exit code |
| `npm run pco:scorecard` | `scripts/pco/scorecard.mjs` | Evidence-bounded scorecard. | docs/scorecard output |
| `npm run pack:dry` | npm pack | Package content dry run. | tarball manifest output |
| `npm run validate:release` | package script | Release gate aggregate. | all subcommands pass |

Do not collapse all failures into one generic “validation failed”; each gate should expose a distinct purpose.
