# Official Plugin Submission Pack

This document tracks what PCO needs for public/official plugin distribution across Claude Code, Codex, Cursor, and OpenCode. It separates verified official paths from aspirational status. Do not claim PCO is official on any platform until the relevant marketplace or review team has approved and listed it.

## Current Package Identity

- Name: `pure-cognitive-oil`
- Display name: `Pure Cognitive Oil`
- Version: `1.6.1`
- Repository: `https://github.com/Sigit-AP/Pure-Cognitive-Oil`
- License: MIT
- Main CLI: `pco`
- Node requirement: `>=18.0.0`

## Claude Code

### Verified official path

Claude Code has an official marketplace named `claude-plugins-official`, but Anthropic's docs say it is curated separately and that there is no application process for the official marketplace. The public submission path is the community marketplace.

Official docs checked:

- `https://code.claude.com/docs/en/discover-plugins.md`
  - Official marketplace: `claude-plugins-official`.
  - Install syntax: `/plugin install <name>@claude-plugins-official`.
  - Community submission is linked from the plugin creation guide.
- `https://code.claude.com/docs/en/plugins.md`
  - Required plugin manifest: `.claude-plugin/plugin.json`.
  - Components must live at plugin root, not inside `.claude-plugin/` except the manifest.
  - Community marketplace approvals are pinned to a commit SHA in `anthropics/claude-plugins-community`.
  - Official marketplace is curated separately by Anthropic; no application process.
- `https://code.claude.com/docs/en/plugin-marketplaces.md`
  - Marketplace file path: `.claude-plugin/marketplace.json`.
  - GitHub source supports `repo`, `ref`, and exact `sha`.
  - `version` in `plugin.json` must be bumped on release if using explicit versioning.
- `https://code.claude.com/docs/en/plugins-reference.md`
  - `claude plugin validate .` validates plugin manifests and components.
  - `claude plugin tag` creates plugin release tags.

### PCO readiness

Present:

- `.claude-plugin/plugin.json`
- `.claude-plugin/commands/PCO-agentic-auto.md`
- `skills/`
- `hooks/`
- `SKILL.md`
- CLI and validation commands

Needs before submission:

- Run `claude plugin validate .` in a Claude Code environment.
- Submit to Claude community marketplace first.
- Treat official Anthropic marketplace inclusion as discretionary, not directly requestable.

### Approval/status notification

- Community marketplace: watch the review/submission channel used by Anthropic's form and the catalog at `https://github.com/anthropics/claude-plugins-community/blob/main/.claude-plugin/marketplace.json`.
- Official marketplace: no public application process; if Anthropic contacts or lists it, status will appear in `claude-plugins-official` / `https://claude.com/plugins`.

## Codex

### Verified official path

Codex supports plugins and repo/personal marketplaces. Public directory distribution currently goes through OpenAI's dashboard-based app review flow; OpenAI creates the plugin for Codex distribution after app approval. Self-serve plugin publishing is documented as coming soon.

Official docs checked:

- `https://developers.openai.com/codex/plugins.md`
  - Codex plugins can be shared through marketplace sources.
  - Plugin Directory categories include `Curated by OpenAI`, `Shared with you`, and `Created by you`.
- `https://developers.openai.com/codex/plugins/build.md`
  - Required manifest: `.codex-plugin/plugin.json`.
  - Repo marketplace path: `$REPO_ROOT/.agents/plugins/marketplace.json`.
  - CLI command: `codex plugin marketplace add owner/repo`.
  - Marketplace entries use `source.path` and `interface.displayName`.
  - Self-serve plugin publishing and management are coming soon.
- `https://developers.openai.com/apps-sdk/deploy/submission.md`
  - Submit through dashboard-based review flow for public distribution.
  - Review status is notified as it moves through review.
  - After approval and publish, OpenAI creates the plugin for Codex distribution.
  - Publishing makes it listed in the App Directory and Codex Plugin Directory.
- `https://developers.openai.com/codex/skills.md`
  - Skills are the authoring format; plugins are installable distribution units.

### PCO readiness

Present:

- `.codex-plugin/plugin.json`
- `skills/`
- `AGENTS.md`
- CLI commands for bootstrap, route, capsule, context, and agentic-auto

Added for Codex marketplace readiness:

- `.agents/plugins/marketplace.json`

Needs before official/public submission:

- Test in Codex CLI/App: `codex /plugins` and `codex plugin marketplace add Sigit-AP/Pure Cognitive Oil`.
- If targeting public Codex Plugin Directory now, submit through OpenAI Platform Dashboard app review. This may require an app surface, not only a local plugin package.

### Approval/status notification

- OpenAI docs say status is notified through the dashboard-based review flow.
- Check `https://platform.openai.com/apps-manage` for submitted app/plugin review and publish status.

## Cursor

### Verified official path

Cursor has an official marketplace. Plugins are distributed as Git repositories, submitted through the Cursor team, and manually reviewed before listing.

Official docs checked:

- `https://cursor.com/docs/plugins.md`
  - Official plugins are in Cursor Marketplace.
  - Plugins are distributed as Git repositories.
  - Submit for review at `https://cursor.com/marketplace/publish`.
  - Every plugin is manually reviewed before listing.
  - For multi-plugin repos, add `.cursor-plugin/marketplace.json`.
- `https://cursor.com/docs/reference/plugins.md`
  - Required manifest: `.cursor-plugin/plugin.json`.
  - Components include `rules`, `skills`, `agents`, `commands`, MCP servers, and hooks.
  - Multi-plugin repository marketplace manifest path: `.cursor-plugin/marketplace.json`.
- `https://cursor.com/docs/rules.md`
  - Project rules live in `.cursor/rules` and should be concise and focused.
- `https://cursor.com/docs/skills.md`
  - Skills can be discovered from `.cursor/skills/`, `.agents/skills/`, `.claude/skills/`, and `.codex/skills/`.

### PCO readiness

Present:

- `.cursor-plugin/plugin.json`
- `skills/`
- `AGENTS.md`

Added for Cursor marketplace readiness:

- `.cursor-plugin/marketplace.json`
- `.cursor/rules/pco.mdc`
- `.cursor/skills/pco-using-pco/SKILL.md`
- `.cursor/skills/pco-routing/SKILL.md`
- `.cursor/skills/pco-verification/SKILL.md`

Needs before official submission:

- Open `https://cursor.com/marketplace/publish` while logged in.
- Submit the public GitHub repository.
- Monitor manual review result from Cursor.

### Approval/status notification

- Cursor review is manual through the Cursor team.
- Check the publishing page/account email/dashboard tied to `https://cursor.com/marketplace/publish`.

## OpenCode

### Verified distribution path

OpenCode loads plugins from local files or npm packages. The docs point users to the ecosystem page for available community plugins. I did not find a documented official-review form like Claude/Cursor/OpenAI.

Official docs checked:

- `https://opencode.ai/docs/plugins/`
  - Project plugin directory: `.opencode/plugins/`.
  - Global plugin directory: `~/.config/opencode/plugins/`.
  - npm plugins are listed in `opencode.json` under `plugin`.
  - npm packages are installed automatically using Bun at startup.
  - Available plugins are browsed in ecosystem docs.

### PCO readiness

Present:

- `.opencode/plugins/pco.js`
- `package.json` has `main` pointing to `.opencode/plugins/pco.js`
- npm package metadata is present

Needs for public ecosystem distribution:

- Publish to npm or keep GitHub installable.
- Add OpenCode usage snippet to docs.
- If OpenCode ecosystem listing accepts PRs or submissions, submit after npm publication. No official submission form was verified in the docs fetched here.

### Approval/status notification

- If npm is used, publication status is on npm.
- If ecosystem listing requires a PR/submission, approval status will be in the relevant OpenCode GitHub PR or maintainer channel.

## Release Gate

Before tagging/publishing a release:

```bash
npm run pco:all
npm run pco:healthcheck
npm run pco:scorecard
npm run pco:runtime-audit
npm exec tsc -- --noEmit
node scripts/pco/bootstrap.mjs --json >/tmp/pco-bootstrap.json
python -m json.tool /tmp/pco-bootstrap.json >/dev/null
npm test
npm pack --dry-run
```

If platform CLIs are available:

```bash
claude plugin validate .
codex plugin marketplace add Sigit-AP/Pure Cognitive Oil --ref main
```

Do not block repository release on unavailable local platform CLIs; report those as external manual validation gates.
