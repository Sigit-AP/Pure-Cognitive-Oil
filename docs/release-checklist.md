# Release Checklist

- [ ] Review claims in `README.md` and `docs/claims-and-evidence.md`.
- [ ] Run `npm ci`.
- [ ] Run `npm test`.
- [ ] Run `npm run validate:release`.
- [ ] Run `npm pack --dry-run`.
- [ ] Confirm `CHANGELOG.md` updated.
- [ ] Confirm examples still match current commands.
- [ ] Confirm no secrets in git diff.
- [ ] Push branch and wait for CI.
- [ ] Tag only after CI passes.
