# PCO Reference Toolchain Upgrade Plan

> **For Hermes:** Execute directly in this repo with PCO verification gates after each phase.

**Goal:** Upgrade PCO references from prose-only operational guidance into a professional reference+toolchain system: each reference folder gets nearby runnable helper scripts, each reference markdown advertises the exact helper command, and root/runtime docs explain when scripts belong inside markdown versus external files.

**Architecture:** Keep `.md` files as human/agent skill references with short command snippets only. Put executable logic in versioned JavaScript modules under each reference folder's `tools/` directory, plus one root dispatcher `references/tools/reference-toolkit.mjs`. This matches professional skill design: markdown explains intent and calls tools; scripts are testable, reusable, lintable, and fast.

**Tech Stack:** Node.js ESM, existing PCO runtime graph, existing npm test/validation gates. No Python/Go unless a future tool truly needs those runtimes.

---

## Design Decision

### Should scripts live inside `.md`?

No for PCO's main reference corpus.

Use markdown for:

- frontmatter and trigger description;
- when-to-use guidance;
- command examples;
- compact examples or pseudo-code;
- links to scripts and expected outputs.

Use external scripts for:

- repeated analysis;
- routing/tool selection;
- evidence extraction;
- quality gates;
- generated reports;
- anything that should be tested, versioned, or reused.

Why:

- external scripts can be executed by agents and humans;
- tests can assert behavior;
- reference files stay readable;
- no copy-pasted code blocks drift across 49 markdown files;
- folder-local tools make domain behavior discoverable.

## Target Layout

```text
references/
├── tools/
│   └── reference-toolkit.mjs
├── advanced/
│   ├── runtime.mjs
│   └── tools/
│       └── advanced-toolkit.mjs
├── cognitive-engines/
│   ├── runtime.mjs
│   └── tools/
│       └── cognitive-engines-toolkit.mjs
├── core/
│   ├── runtime.mjs
│   └── tools/
│       └── core-toolkit.mjs
├── knowledge-bases/
│   ├── runtime.mjs
│   └── tools/
│       └── knowledge-bases-toolkit.mjs
├── quality-safety/
│   ├── runtime.mjs
│   └── tools/
│       └── quality-safety-toolkit.mjs
└── workflows/
    ├── runtime.mjs
    └── tools/
        └── workflows-toolkit.mjs
```

## Phase 1 — Add folder-local toolkits

### Task 1: Add root dispatcher

Create `references/tools/reference-toolkit.mjs`.

Features:

- `list` — show available domains and commands.
- `domain <folder>` — call the folder toolkit list.
- `brief <folder> <task>` — summarize relevant docs in that folder using existing folder runtime.
- `gate <folder> <task>` — call folder-specific gates.

Verification:

```bash
node references/tools/reference-toolkit.mjs list
node references/tools/reference-toolkit.mjs brief workflows "publish npm package safely"
```

### Task 2: Add core toolkit

Create `references/core/tools/core-toolkit.mjs`.

Commands:

- `phase <task>` — recommend PCO pipeline phase and next gate.
- `laws <task>` — select relevant Iron Laws.
- `depth <task>` — recommend adaptive depth level.

Verification:

```bash
node references/core/tools/core-toolkit.mjs phase "refactor API without tests"
node references/core/tools/core-toolkit.mjs laws "ship release tag"
```

### Task 3: Add cognitive-engines toolkit

Create `references/cognitive-engines/tools/cognitive-engines-toolkit.mjs`.

Commands:

- `challenge <claim>` — generate adversarial questions.
- `hypotheses <problem>` — generate ranked hypothesis skeleton.
- `ground <claim>` — tell which evidence is needed before claiming.

Verification:

```bash
node references/cognitive-engines/tools/cognitive-engines-toolkit.mjs challenge "plugin is official"
```

### Task 4: Add quality-safety toolkit

Create `references/quality-safety/tools/quality-safety-toolkit.mjs`.

Commands:

- `check <task>` — produce verification checklist.
- `release <task>` — produce release readiness checklist.
- `claims <text>` — identify claims needing evidence.

Verification:

```bash
node references/quality-safety/tools/quality-safety-toolkit.mjs release "publish v1.6.1"
```

### Task 5: Add workflows toolkit

Create `references/workflows/tools/workflows-toolkit.mjs`.

Commands:

- `select <task>` — choose workflow file.
- `steps <task>` — produce execution skeleton.
- `handoff <task>` — produce final report skeleton.

Verification:

```bash
node references/workflows/tools/workflows-toolkit.mjs select "publish npm package"
```

### Task 6: Add advanced toolkit

Create `references/advanced/tools/advanced-toolkit.mjs`.

Commands:

- `optimize <task>` — suggest context/resource optimizations.
- `communicate <result>` — compress final report.
- `complexity <task>` — flag complexity risks.

Verification:

```bash
node references/advanced/tools/advanced-toolkit.mjs optimize "large PCO upgrade"
```

### Task 7: Add knowledge-bases toolkit

Create `references/knowledge-bases/tools/knowledge-bases-toolkit.mjs`.

Commands:

- `models <task>` — select mental models.
- `antipatterns <task>` — select anti-patterns.
- `decision <task>` — produce decision frame.

Verification:

```bash
node references/knowledge-bases/tools/knowledge-bases-toolkit.mjs decision "script inside markdown or external"
```

## Phase 2 — Document tool usage in markdown

### Task 8: Add a compact tool section to each folder index or primary file

Modify:

- `references/core/pipeline-phases.md`
- `references/cognitive-engines/context-engine.md`
- `references/quality-safety/verification-checklist.md`
- `references/workflows/workflow-index.md`
- `references/advanced/resource-optimization.md`
- `references/knowledge-bases/decision-tree.md`

Add section:

```markdown
## Runnable Tooling

Use the folder-local toolkit for fast operational extraction:

```bash
node references/<folder>/tools/<folder>-toolkit.mjs <command> "<task>"
```

Keep executable logic in `tools/`; keep this markdown as the operational reference and command map.
```

Verification:

```bash
grep -R "Runnable Tooling" references/{core,cognitive-engines,quality-safety,workflows,advanced,knowledge-bases}/*.md
```

## Phase 3 — Wire package scripts and CLI

### Task 9: Add npm scripts

Modify `package.json`:

```json
"pco:tools": "node references/tools/reference-toolkit.mjs list",
"pco:tools:workflows": "node references/workflows/tools/workflows-toolkit.mjs list",
"pco:tools:quality": "node references/quality-safety/tools/quality-safety-toolkit.mjs list"
```

Verification:

```bash
npm run pco:tools
```

### Task 10: Add CLI command if minimal-risk

Modify `bin/pco.mjs` to support:

```bash
pco tools list
pco tools brief workflows "<task>"
pco tools gate quality-safety "<task>"
```

Verification:

```bash
pco tools list
node bin/pco.mjs tools brief workflows "publish npm"
```

## Phase 4 — Tests and release

### Task 11: Add tests

Create `tests/pco/test-reference-toolkits.sh`.

Checks:

- every folder toolkit exists;
- `list` works;
- representative command works per folder;
- root dispatcher can list and brief.

Add to `tests/pco/run-all.sh`.

### Task 12: Run full gates

```bash
python3 scripts/link_references.py
npm run pco:all
npm run pco:healthcheck
npm run pco:scorecard
npm run pco:runtime-audit
npm exec tsc -- --noEmit
npm test
npm pack --dry-run
```

### Task 13: Commit and release

Version target: `1.7.0` because this is a feature-level architecture upgrade.

```bash
git add references package.json package-lock.json bin/pco.mjs tests/pco
npm version 1.7.0 --no-git-tag-version
git commit -m "feat: add PCO reference toolkits"
git tag -a v1.7.0 -m "v1.7.0 reference toolkits"
git push origin main
git push origin v1.7.0
```

## Acceptance Criteria

- Folder-local tools exist for all six reference folders.
- Markdown references include concise tool usage, not embedded long scripts.
- Root dispatcher works.
- `pco tools` or npm scripts expose the toolchain.
- PCO validation score remains 100.
- Runtime audit remains pass.
- npm package includes tool files.
- No false official marketplace claims.
