# Deterministic-Cognitive-Infrastructure

Deterministic-Cognitive-Infrastructure (DCI) is a portable cognitive framework for AI agent harnesses. It gives an agent a structured operating layer for deep thinking, rigorous reasoning, agentic execution, contextual knowledge use, reliability, and higher-order intelligence.

DCI is not a single prompt. It is a repository of coordinated skills, references, workflows, routing maps, verification gates, bootstrap context, and plugin-style integration surfaces that can be loaded by any compatible agent runtime.

## Purpose

Modern AI agents often fail in predictable ways:

- they answer before understanding the real task;
- they make confident claims without evidence;
- they skip verification;
- they act without a rollback path;
- they overfit to the immediate prompt and ignore system-level consequences;
- they produce plausible text instead of operationally safe outcomes.

DCI addresses those failures by turning cognition into an explicit infrastructure layer. It provides deterministic routing, resource selection, workflow discipline, quality gates, and evidence-bound finalization.

## Core Idea

DCI separates an agent's work into two layers:

1. **Cognitive infrastructure** — how the agent thinks, routes, reasons, validates, and decides.
2. **Execution tools** — how the agent edits files, runs commands, searches, calls APIs, or interacts with external systems.

DCI does not replace tools. It governs when and how tools should be used.

The framework forces this loop:

```text
Understand → Route → Load Context → Plan → Execute → Verify → Audit → Finalize
```

No serious task should move directly from prompt to answer without passing through the appropriate DCI resources.

## Six Cognitive Axes

Every meaningful DCI file maps to one or more cognitive axes.

| Axis | Role |
|---|---|
| Thinking | Problem framing, decomposition, depth control, trade-off analysis |
| Reasoning | Evidence, inference, causal logic, adversarial checks, uncertainty |
| Agentic | Planning, tool use, execution loops, fallback handling, progress control |
| Knowledge | Mental models, anti-patterns, domain references, contextual retrieval |
| Reliability | Verification, quality gates, hallucination defense, recovery protocols |
| Intelligence | Synthesis, abstraction, adaptation, creativity, meta-cognition |

These axes are used by the resource index, routing system, context pack, validation scripts, and generated load plans.

## Repository Architecture

```text
Deterministic-Cognitive-Infrastructure/
├── SKILL.md                         # Master framework skill
├── README.md                        # Main operating guide
├── PLUGIN.md                        # Portable plugin integration guide
├── PRD.md                           # Product requirements and readiness gates
├── plugin.json                      # Generic plugin manifest
├── package.json                     # CLI/package metadata
├── bin/
│   └── dci.mjs                      # Cross-harness CLI entrypoint
├── hooks/
│   ├── session-start                # JSON bootstrap hook
│   └── run-dci-hook.cmd             # Windows hook wrapper
├── skills/
│   ├── using-dci/                   # Usage discipline
│   ├── dci-routing/                 # Route/resource selection
│   └── dci-verification/            # Final validation discipline
├── scripts/dci/
│   ├── index.ts                     # Resource graph/index builder
│   ├── audit.ts                     # Audit report command
│   ├── context.ts                   # Context pack generator
│   ├── bootstrap.ts                 # Text/JSON bootstrap generator
│   ├── validate.ts                  # Validation gates
│   ├── parity.ts                    # Readiness gate implementation
│   ├── schema.ts                    # Typed DCI schema
│   └── install-hermes.mjs           # Hermes skill installer
├── tests/dci/                       # Acceptance and readiness tests
└── references/
    ├── core/                        # Core laws, pipeline, depth control
    ├── cognitive-engines/           # Reasoning and synthesis engines
    ├── workflows/                   # Operational workflows
    ├── knowledge-bases/             # Mental models, anti-patterns, decisions
    ├── quality-safety/              # Gates, recovery, ethics, verification
    └── advanced/                    # Meta-level optimization and adaptation
```

## Core Resources

### `SKILL.md`

The master skill defines how the framework should be activated. It establishes the operating mindset, the six-layer structure, the route-before-action discipline, and the requirement that evidence and verification come before completion claims.

### `references/core/`

Core files define the invariant operating rules:

- iron laws for safe and disciplined execution;
- pipeline phases for moving from understanding to verified outcome;
- adaptive depth controls for matching effort to task complexity.

### `references/cognitive-engines/`

Cognitive engines provide specialized reasoning modules:

- causal inference;
- first-principles analysis;
- adversarial reasoning;
- hallucination defense;
- uncertainty modeling;
- context awareness;
- search strategy;
- analogical transfer;
- creative synthesis;
- self-correction;
- meta-cognition.

### `references/workflows/`

Workflows translate cognition into action. They cover operational task classes such as:

- architecture;
- bug fixing;
- code review;
- security audit;
- incident response;
- migration;
- refactoring;
- performance optimization;
- research spikes;
- technical writing;
- greenfield development;
- legacy rescue.

### `references/quality-safety/`

Quality and safety files define the immune system of the framework:

- quality gates;
- verification checklist;
- error recovery;
- ethical framework;
- meta-learning.

### `references/knowledge-bases/`

Knowledge bases provide reusable cognitive substrate:

- mental models;
- anti-patterns;
- decision trees;
- extended reference material.

### `references/advanced/`

Advanced resources cover cross-cutting concerns:

- communication optimization;
- resource optimization;
- cognitive load;
- temporal intelligence;
- collaborative intelligence;
- emergent complexity;
- failure patterns.

## Plugin Model

DCI is packaged as a portable plugin-style framework.

It provides:

- `plugin.json` for generic plugin discovery;
- `bin/dci.mjs` as the CLI entrypoint;
- `dci bootstrap --json` for session context injection;
- `hooks/session-start` for hook-based loaders;
- `skills/` for skill-aware runtimes;
- validation and readiness commands for installation checks.

A compatible harness only needs one of these capabilities:

- read local files;
- run a CLI command;
- inject bootstrap context into a session;
- load `SKILL.md`-style skill files;
- call validation scripts before activation.

## Installation From GitHub

```bash
git clone https://github.com/Sigit-AP/Deterministic-Cognitive-Infrastructure.git
cd Deterministic-Cognitive-Infrastructure
npm install
npm test
```

## Installation as CLI Package

```bash
npm install -g github:Sigit-AP/Deterministic-Cognitive-Infrastructure
dci help
dci bootstrap --json
```

## Installation From Downloaded ZIP

```bash
npm install
npm test
npm link
dci bootstrap --json
```

## CLI Commands

```bash
dci help                 # Show CLI help
dci bootstrap            # Print text bootstrap context
dci bootstrap --json     # Print JSON context for hooks/harnesses
dci index                # Generate resource map and manifest
dci audit                # Run audit report
dci context              # Generate context pack
dci validate             # Run validation gates
dci readiness            # Run readiness gate
dci test                 # Run full test suite
dci install-hermes DIR   # Copy DCI skills into a Hermes skills directory
```

## Harness Integration

### Generic Agent Runtime

1. Clone or install the repository.
2. Run `dci bootstrap --json`.
3. Inject `additionalContext` into the agent session.
4. Load `SKILL.md` and relevant `skills/*/SKILL.md` files.
5. Use `dci validate` and `dci readiness` as preflight checks.

### Hermes

```bash
dci install-hermes ~/.hermes/skills/dci
```

Then configure the runtime to load the copied skills.

### Cursor or IDE Agents

Add a rule similar to:

```text
For complex planning, coding, debugging, review, verification, or research tasks, load Deterministic-Cognitive-Infrastructure/SKILL.md first. Route the task through the relevant files in references/workflows, references/cognitive-engines, and references/quality-safety before acting.
```

### Custom Multi-Agent Systems

Use DCI as the cognitive controller:

```text
Planner Agent: loads DCI bootstrap and creates the execution plan.
Worker Agent: executes tool actions according to the plan.
Reviewer Agent: loads DCI verification and quality-safety resources.
Coordinator: accepts completion only after validation gates pass.
```

## Runtime Discipline

DCI uses a strict operating contract.

### Before Acting

The agent should establish:

- actual user intent;
- task category;
- risk level;
- relevant workflow;
- required cognitive engines;
- required evidence;
- validation path;
- stop condition.

### During Execution

The agent should maintain:

- explicit assumptions;
- evidence references;
- tool-output grounding;
- rollback or recovery options;
- progress state;
- uncertainty classification.

### Before Final Answer

The agent should verify:

- the requested artifact exists;
- claims are evidence-bound;
- commands/tests were actually run if claimed;
- failures are disclosed;
- limitations are stated;
- next steps are clear;
- quality gates are satisfied.

## Generated Artifacts

Running DCI commands creates cache files under `.dci/cache/`:

```text
manifest.json          # Indexed files, sections, concepts, graph edges
resource-map.json      # Axis/kind/workflow/concept/capability maps
agent-routing.json     # Route triggers and required files
audit-report.json      # Coverage and readiness report
context-pack.json      # Summarized context pack for agents
parity-report.json     # Readiness gate report
```

The cache is generated output and is ignored by git.

## Validation Gates

A valid DCI installation must pass:

```bash
npm test
dci validate
dci readiness
```

Expected result:

```text
PASS: all DCI ecosystem tests
DCI validation pass
DCI readiness pass
```

Validation checks include:

- full file indexing;
- markdown section extraction;
- concept graph creation;
- six-axis coverage;
- professional load plans;
- workflow routing;
- quality/safety routing;
- bootstrap generation;
- skill triggering;
- readiness scoring.

## Operating Modes

DCI can be used at different depths.

| Mode | Use When | Behavior |
|---|---|---|
| Direct | Simple low-risk questions | Short answer, minimal context loading |
| Analytical | Ambiguous or strategic problems | Decomposition, assumptions, trade-offs |
| Engineering | Code, architecture, migration, debugging | Workflow routing, tests, rollback planning |
| Adversarial | Security, review, risk, reliability | Attack assumptions, search for failure modes |
| Agentic | Multi-step execution | Plan, act, verify, iterate, stop on criteria |
| Research | Current or uncertain information | Source discipline and uncertainty disclosure |

## Completion States

DCI discourages vague completion claims. Work should end in one of these states:

```text
Complete              All stated criteria satisfied.
Complete with limits  Result delivered, known uncertainty remains.
Partial               Some work done, blocker remains.
Blocked               Cannot proceed without input/tool/permission/data.
Failed                Attempted and failed; recovery path required.
Refused               Unsafe or disallowed request; safe alternative provided.
```

## Design Principles

1. **Route before action** — choose the relevant workflow and context before tool use.
2. **Evidence before claim** — no strong claim without a source, file, log, or derivation.
3. **Verification before completion** — do not claim done without validation.
4. **Depth should match risk** — trivial tasks should not trigger full heavy processing.
5. **Failure must be visible** — tool errors, partial results, and uncertainty must not be hidden.
6. **Context must be explicit** — load the relevant resources instead of relying on memory.
7. **The framework is portable** — DCI should work across harnesses through files, CLI, hooks, and JSON context.

## What DCI Is Not

DCI is not:

- a marketplace-specific package;
- a replacement for shell, browser, editor, or API tools;
- a guarantee of perfect answers;
- a reason to skip human review in high-risk domains;
- a static prompt that works without context loading and validation.

DCI is an operating framework for making agent cognition more structured, inspectable, testable, and transferable.

## Development

```bash
npm install
npm run dci:index
npm run dci:audit
npm run dci:context
npm run dci:validate
npm run dci:readiness
npm test
```

## Versioning

The package version in `package.json` represents the portable plugin package version. Readiness is determined by validation gates, not by version number alone.

## License

MIT
