# Traceability Matrix

| Requirement | Files | Command | Evidence Status |
|---|---|---|---|
| CI present | `.github/workflows/ci.yml` | GitHub Actions after push | pending remote run |
| Governance present | `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md` | repository browse | local present |
| Formal docs present | `docs/*.md`, `docs/adr/*.md` | `npm run pco:validate` | local present |
| Skills parity present | `skills/*-with-pco/SKILL.md` | `npm run pco:validate` | local present |
| Examples present | `examples/*` | manual/docs review | local present |
| Package gate present | `npm run pack:dry`, `npm run validate:release` | npm scripts | local present |
