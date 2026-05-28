# Deterministic-Cognitive-Infrastructure

Deterministic-Cognitive-Infrastructure (DCI) is a portable cognitive framework for AI agent harnesses. It gives agents a repeatable operating layer for task routing, context loading, planning, execution, verification, and final audit.

DCI is not a single prompt and not a replacement for tools. It is a set of skills, references, runtime scripts, hooks, and validation gates that tells an agent when and how to think before it acts.

## Quick Start

```bash
git clone https://github.com/Sigit-AP/Deterministic-Cognitive-Infrastructure.git
cd Deterministic-Cognitive-Infrastructure
npm install
npm test
```

Use the CLI:

```bash
npm link
dci help
dci bootstrap --json
dci references route "debug a failing test"
dci references capsule "debug a failing test"
dci agentic-auto "ship a verified feature safely"
dci validate
dci readiness
```

## Operating Loop

```text
Understand → Route → Load Context → Plan → Execute → Verify → Audit → Finalize
```

For serious work, DCI expects the agent to:

1. identify the real task and risk level;
2. route the task through the reference runtime;
3. load the relevant skill/reference/workflow files;
4. execute with evidence, assumptions, and recovery paths visible;
5. run validation before claiming completion.

## What DCI Provides

| Area | Purpose |
|---|---|
| `SKILL.md` | Master boot discipline for using DCI. |
| `skills/` | Small runtime skills: using DCI, routing, verification. |
| `references/` | Core laws, cognitive engines, workflows, knowledge bases, quality gates, advanced systems. |
| `references/runtime/dci-reference-runtime.mjs` | Executable router/search/context builder over the reference corpus. |
| `bin/dci.mjs` | CLI entrypoint. |
| `hooks/` | Session-start hook assets for compatible harnesses. |
| `scripts/dci/` | Indexing, audit, context, lifecycle, validation, readiness, scorecard, healthcheck. |
| `tests/dci/` | Acceptance and regression tests. |

## Repository Layout

```text
.
├── SKILL.md
├── README.md
├── PLUGIN.md
├── PRD.md
├── package.json
├── plugin.json
├── bin/dci.mjs
├── hooks/
├── skills/
├── scripts/dci/
├── tests/dci/
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

DCI resources are organized around six axes:

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
| `dci help` | Show CLI help. |
| `dci bootstrap --json` | Emit session bootstrap context for harness injection. |
| `dci references route "<task>"` | Select relevant DCI references for a task. |
| `dci references capsule "<task>"` | Build a full-depth professional map that preserves graph coverage while avoiding repeated prose dumps. |
| `dci references context "<task>"` | Build a bounded context pack from selected references. |
| `dci agentic-auto "<task>"` | Generate a full autonomous DCI contract: interview, route, plan, delegate/parallelize, build, audit, repair, optimize, and finalize. |
| `dci index` | Generate manifest/resource-map cache. |
| `dci audit` | Generate repository audit report. |
| `dci context` | Generate context pack cache. |
| `dci lifecycle` | Check first-use, mid-use, runtime, and final-use lifecycle gates. |
| `dci healthcheck` | Check hook/runtime/readiness infrastructure. |
| `dci scorecard` | Validate audited coverage claims. |
| `dci runtime-audit` | Verify runtime scripts and reference coverage. |
| `dci validate` | Run DCI validation gates. |
| `dci readiness` | Run readiness/parity gate. |
| `dci test` | Run full DCI test suite. |
| `dci install-hermes DIR` | Copy DCI skills into a Hermes skills directory. |

## Agentic Auto Runtime

`dci agentic-auto "<task>"` turns a raw user request into an executable autonomous work contract. It is designed for agent harnesses that need a deterministic plan before touching tools or files.

The command emits:

- task classification, risk level, and assumptions;
- interview questions for missing requirements;
- routed DCI references and graph neighbors;
- execution phases from understanding to finalization;
- delegation and parallelization candidates;
- verification commands and evidence requirements;
- repair, self-correction, and optimization loops;
- a final response contract for completion reporting.

Example:

```bash
dci agentic-auto "debug failing checkout tests and ship the fix"
```

Use it when the request is complex, risky, ambiguous, multi-file, or likely to need planning, testing, and audit. For simple lookups, use `dci references route` or `dci bootstrap --json` instead.

## Claude and OpenCode Integration

The repository includes plugin surfaces for harnesses that support slash commands or command plugins:

- Claude plugin command: `/DCI-agentic-auto <task>`
- OpenCode plugin command: `DCI-agentic-auto <task>`
- Generic CLI command: `dci agentic-auto "<task>"`

All three paths route to the same DCI agentic-auto contract so behavior stays consistent across harnesses.

## Harness Integration

Generic runtime:

```bash
dci bootstrap --json
```

Then inject the returned context into the agent session and load `SKILL.md` plus relevant files from `skills/` and `references/`.

Hermes:

```bash
dci install-hermes ~/.hermes/skills/dci
```

OpenCode, Claude/Codex/Cursor-style hooks, and custom harnesses should use `plugin.json`, `hooks/`, `.opencode/`, or the CLI depending on what the host supports. See `PLUGIN.md` for integration details.

## Validation

A healthy checkout should pass:

```bash
npm test
dci validate
dci readiness
dci lifecycle
dci healthcheck
dci scorecard
dci runtime-audit
```

Generated outputs are written under `.dci/cache/` and are ignored by git. They are rebuildable artifacts, not source files.

## Claims and Limits

DCI improves agent discipline by making routing, context loading, validation, and completion gates explicit. It does not guarantee perfect answers, replace human review, or remove the need for domain expertise.

The scorecard validates DCI infrastructure coverage against the inspected baseline files. It is an evidence boundary for this repository, not a universal claim that every future answer is automatically better.

## Development Notes

- Node.js `>=18` is required.
- `package-lock.json` is tracked for reproducible installs.
- `node_modules/`, `.dci/cache/`, `dist/`, `.env`, and `.DS_Store` are ignored.
- Keep runtime behavior executable; do not add decorative or fake scripts.
- After changing references, preserve graph behavior and rerun validation.

## License

MIT
