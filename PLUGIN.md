# Pure Cognitive Oil Plugin

PCO is a portable plugin-style cognitive infrastructure package for AI agent harnesses. It is not limited to Claude Code. Any harness that can read files, run a CLI command, or inject bootstrap context can use it.

## What This Provides

- `plugin.json` manifest for generic plugin discovery.
- `pco` CLI entrypoint.
- `SKILL.md` master skill.
- Modular skills in `skills/`.
- Session-start hook in `hooks/session-start`.
- Bootstrap context in text or JSON.
- Resource indexing, routing, validation, and readiness gates.
- Cross-harness installation paths.
- Official submission readiness notes in `docs/official-plugin-submission.md`.

## Install From GitHub

```bash
git clone https://github.com/Sigit-AP/Pure-Cognitive-Oil.git
cd Pure-Cognitive-Oil
npm install
npm test
```

Use directly:

```bash
npm run pco:bootstrap
npm run pco:bootstrap:json
npm run pco:validate
npm run pco:readiness
```

Use as CLI:

```bash
npm link
pco help
pco bootstrap --json
pco validate
pco readiness
```

## Install Globally From GitHub

```bash
npm install -g github:Sigit-AP/Pure-Cognitive-Oil
pco help
pco bootstrap --json
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
pco bootstrap --json
```

## Generic Harness Integration

A harness should load PCO in this order:

1. Read `plugin.json`.
2. Run `pco bootstrap --json` or `npm run pco:bootstrap:json`.
3. Inject the returned `additionalContext` into the agent session.
4. Load `SKILL.md` and the modular skills in `skills/`.
5. Use `pco validate` and `pco readiness` as preflight checks.

## Hermes Integration

```bash
pco install-hermes ~/.hermes/skills/pco
```

Then configure Hermes or the host agent to load the copied skills.

## Cursor / IDE Integration

PCO ships Cursor-ready plugin metadata and project guidance:

- `.cursor-plugin/plugin.json` — Cursor plugin manifest.
- `.cursor-plugin/marketplace.json` — multi-plugin repository manifest for Cursor review.
- `.cursor/rules/pco.mdc` — focused project rule for when to activate PCO.
- `.cursor/skills/` — Cursor skill mirrors for PCO usage, routing, and verification.

Local use:

1. Clone or download this repo.
2. Import or open the repository in Cursor.
3. Verify rules and skills in Cursor Settings.
4. For marketplace review, submit the GitHub repository at `https://cursor.com/marketplace/publish`.

Do not claim Cursor official status until the marketplace review is approved and the listing appears in Cursor Marketplace.

## Custom Agent Integration

Use the CLI from any orchestrator:

```bash
pco bootstrap --json > pco-context.json
pco validate
pco readiness
```

Then pass `additionalContext` to the model or agent runtime.

## Validity Check

A valid plugin install must pass:

```bash
npm test
pco validate
pco readiness
```

Expected result:

```text
PASS: all PCO ecosystem tests
PCO validation pass
PCO parity/readiness pass
```

## Limits

This is a portable plugin framework, not a marketplace-specific package. Some harnesses may need a small adapter to map `plugin.json`, `SKILL.md`, and `pco bootstrap --json` into their native plugin format.
