# Pure Cognitive Oil

Pure Cognitive Oil (PCO) is a portable cognitive framework for AI agent harnesses. It gives agents a repeatable operating layer for task routing, context loading, planning, execution, verification, and final audit.

PCO is not a single prompt and not a replacement for tools. It is a set of skills, references, runtime scripts, hooks, and validation gates that tells an agent when and how to think before it acts.

## Quick Start

```bash
git clone https://github.com/Sigit-AP/Pure-Cognitive-Oil.git
cd Pure-Cognitive-Oil
npm install
npm test
```

Use the CLI:

```bash
npm link
pco help
pco bootstrap --json
pco references route "debug a failing test"
pco references capsule "debug a failing test"
pco agentic-auto "ship a verified feature safely"
pco validate
pco readiness
```

## Operating Loop

```text
Understand → Route → Load Context → Plan → Execute → Verify → Audit → Finalize
```

For serious work, PCO expects the agent to:

1. identify the real task and risk level;
2. route the task through the reference runtime;
3. load the relevant skill/reference/workflow files;
4. execute with evidence, assumptions, and recovery paths visible;
5. run validation before claiming completion.

## What PCO Provides

| Area | Purpose |
|---|---|
| `SKILL.md` | Master boot discipline for using PCO. |
| `skills/` | Small runtime skills: using PCO, routing, verification. |
| `references/` | Core laws, cognitive engines, workflows, knowledge bases, quality gates, advanced systems. |
| `references/runtime/pco-reference-runtime.mjs` | Executable router/search/context builder over the reference corpus. |
| `bin/pco.mjs` | CLI entrypoint. |
| `hooks/` | Session-start hook assets for compatible harnesses. |
| `scripts/pco/` | Indexing, audit, context, lifecycle, validation, readiness, scorecard, healthcheck. |
| `tests/pco/` | Acceptance and regression tests. |

## Repository Layout

```text
.
├── SKILL.md
├── README.md
├── PLUGIN.md
├── package.json
├── plugin.json
├── bin/pco.mjs
├── hooks/
├── skills/
├── scripts/pco/
├── tests/pco/
├── docs/
└── references/
    ├── core/
    ├── cognitive-engines/
    ├── workflows/
    ├── knowledge-bases/
    ├── quality-safety/
    ├── advanced/
    └── runtime/
```

## Cognitive Axes

PCO resources are organized around six axes:

| Axis | Focus |
|---|---|
| Thinking | framing, decomposition, depth control |
| Reasoning | evidence, inference, uncertainty, adversarial checks |
| Agentic | planning, tool use, execution loops, fallback handling |
| Knowledge | references, mental models, anti-patterns, decisions |
| Reliability | verification, quality gates, hallucination defense, recovery |
| Intelligence | synthesis, adaptation, creativity, meta-cognition |

## Main Commands

| Command | Use |
|---|---|
| `pco help` | Show CLI help. |
| `pco bootstrap --json` | Emit session bootstrap context for harness injection. |
| `pco references route "<task>"` | Select relevant PCO references for a task. |
| `pco references capsule "<task>"` | Build a full-depth professional map that preserves graph coverage while avoiding repeated prose dumps. |
| `pco references context "<task>"` | Build a bounded context pack from selected references. |
| `pco agentic-auto "<task>"` | Generate a full autonomous PCO contract: interview, route, plan, delegate/parallelize, build, audit, repair, optimize, and finalize. |
| `pco index` | Generate manifest/resource-map cache. |
| `pco audit` | Generate repository audit report. |
| `pco context` | Generate context pack cache. |
| `pco lifecycle` | Check first-use, mid-use, runtime, and final-use lifecycle gates. |
| `pco healthcheck` | Check hook/runtime/readiness infrastructure. |
| `pco scorecard` | Validate audited coverage claims. |
| `pco runtime-audit` | Verify runtime scripts and reference coverage. |
| `pco validate` | Run PCO validation gates. |
| `pco readiness` | Run readiness/parity gate. |
| `pco test` | Run full PCO test suite. |
| `pco install-hermes DIR` | Copy PCO skills into a Hermes skills directory. |

## Agentic Auto Runtime

`pco agentic-auto "<task>"` turns a raw user request into an executable autonomous work contract. It is designed for agent harnesses that need a deterministic plan before touching tools or files.

The command emits:

- task classification, risk level, and assumptions;
- interview questions for missing requirements;
- routed PCO references and graph neighbors;
- execution phases from understanding to finalization;
- delegation and parallelization candidates;
- verification commands and evidence requirements;
- repair, self-correction, and optimization loops;
- a final response contract for completion reporting.

Example:

```bash
pco agentic-auto "debug failing checkout tests and ship the fix"
```

Use it when the request is complex, risky, ambiguous, multi-file, or likely to need planning, testing, and audit. For simple lookups, use `pco references route` or `pco bootstrap --json` instead.

## Claude Code, Codex, Cursor, and OpenCode Integration

The repository includes plugin surfaces for harnesses that support plugins, skills, slash commands, rules, or command plugins:

- Claude Code plugin manifest: `.claude-plugin/plugin.json`
- Claude Code command: `/PCO-agentic-auto <task>`
- Codex plugin manifest: `.codex-plugin/plugin.json`
- Codex repo marketplace manifest: `.agents/plugins/marketplace.json`
- Cursor plugin manifest: `.cursor-plugin/plugin.json`
- Cursor marketplace manifest: `.cursor-plugin/marketplace.json`
- Cursor rule/skill mirrors: `.cursor/rules/` and `.cursor/skills/`
- OpenCode plugin module: `.opencode/plugins/pco.js`
- OpenCode plugin command: `PCO-agentic-auto <task>`
- Generic CLI command: `pco agentic-auto "<task>"`

All paths route to the same PCO agentic-auto contract so behavior stays consistent across harnesses. Marketplace approval is platform-specific; see `docs/official-plugin-submission.md` for verified submission paths and manual approval gates.

## Harness Integration

Generic runtime:

```bash
pco bootstrap --json
```

Then inject the returned context into the agent session and load `SKILL.md` plus relevant files from `skills/` and `references/`.

Hermes:

```bash
pco install-hermes ~/.hermes/skills/pco
```

OpenCode, Claude/Codex/Cursor-style hooks, and custom harnesses should use `plugin.json`, `hooks/`, `.opencode/`, or the CLI depending on what the host supports. See `PLUGIN.md` for integration details.

## Validation

A healthy checkout should pass:

```bash
npm test
pco validate
pco readiness
pco lifecycle
pco healthcheck
pco scorecard
pco runtime-audit
```

Generated outputs are written under `.pco/cache/` and are ignored by git. They are rebuildable artifacts, not source files.

## Claims and Limits

PCO improves agent discipline by making routing, context loading, validation, and completion gates explicit. It does not guarantee perfect answers, replace human review, or remove the need for domain expertise.

The scorecard validates PCO infrastructure coverage against the inspected baseline files. It is an evidence boundary for this repository, not a universal claim that every future answer is automatically better.

## Development Notes

- Node.js `>=18` is required.
- `package-lock.json` is tracked for reproducible installs.
- `node_modules/`, `.pco/cache/`, `dist/`, `.env`, and `.DS_Store` are ignored.
- Keep runtime behavior executable; do not add decorative or fake scripts.
- After changing references, preserve graph behavior and rerun validation.

## License

MIT
