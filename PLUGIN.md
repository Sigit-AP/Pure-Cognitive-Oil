# Deterministic-Cognitive-Infrastructure Plugin

DCI is a portable plugin-style cognitive infrastructure package for AI agent harnesses. It is not limited to Claude Code. Any harness that can read files, run a CLI command, or inject bootstrap context can use it.

## What This Provides

- `plugin.json` manifest for generic plugin discovery.
- `dci` CLI entrypoint.
- `SKILL.md` master skill.
- Modular skills in `skills/`.
- Session-start hook in `hooks/session-start`.
- Bootstrap context in text or JSON.
- Resource indexing, routing, validation, and readiness gates.
- Cross-harness installation paths.
- Official submission readiness notes in `docs/official-plugin-submission.md`.

## Install From GitHub

```bash
git clone https://github.com/Sigit-AP/Deterministic-Cognitive-Infrastructure.git
cd Deterministic-Cognitive-Infrastructure
npm install
npm test
```

Use directly:

```bash
npm run dci:bootstrap
npm run dci:bootstrap:json
npm run dci:validate
npm run dci:readiness
```

Use as CLI:

```bash
npm link
dci help
dci bootstrap --json
dci validate
dci readiness
```

## Install Globally From GitHub

```bash
npm install -g github:Sigit-AP/Deterministic-Cognitive-Infrastructure
dci help
dci bootstrap --json
```

## Install From Downloaded ZIP

1. Download ZIP from GitHub.
2. Extract it.
3. Open terminal in the extracted folder.
4. Run:

```bash
npm install
npm test
npm link
dci bootstrap --json
```

## Generic Harness Integration

A harness should load DCI in this order:

1. Read `plugin.json`.
2. Run `dci bootstrap --json` or `npm run dci:bootstrap:json`.
3. Inject the returned `additionalContext` into the agent session.
4. Load `SKILL.md` and the modular skills in `skills/`.
5. Use `dci validate` and `dci readiness` as preflight checks.

## Hermes Integration

```bash
dci install-hermes ~/.hermes/skills/dci
```

Then configure Hermes or the host agent to load the copied skills.

## Cursor / IDE Integration

DCI ships Cursor-ready plugin metadata and project guidance:

- `.cursor-plugin/plugin.json` — Cursor plugin manifest.
- `.cursor-plugin/marketplace.json` — multi-plugin repository manifest for Cursor review.
- `.cursor/rules/dci.mdc` — focused project rule for when to activate DCI.
- `.cursor/skills/` — Cursor skill mirrors for DCI usage, routing, and verification.

Local use:

1. Clone or download this repo.
2. Import or open the repository in Cursor.
3. Verify rules and skills in Cursor Settings.
4. For marketplace review, submit the GitHub repository at `https://cursor.com/marketplace/publish`.

Do not claim Cursor official status until the marketplace review is approved and the listing appears in Cursor Marketplace.

## Custom Agent Integration

Use the CLI from any orchestrator:

```bash
dci bootstrap --json > dci-context.json
dci validate
dci readiness
```

Then pass `additionalContext` to the model or agent runtime.

## Validity Check

A valid plugin install must pass:

```bash
npm test
dci validate
dci readiness
```

Expected result:

```text
PASS: all DCI ecosystem tests
DCI validation pass
DCI parity/readiness pass
```

## Limits

This is a portable plugin framework, not a marketplace-specific package. Some harnesses may need a small adapter to map `plugin.json`, `SKILL.md`, and `dci bootstrap --json` into their native plugin format.
