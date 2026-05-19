# Product Requirements Document: DCI Superpowers-Level Cognitive Infrastructure

## 1. Product Summary

Deterministic Cognitive Infrastructure (DCI) must become a Superpowers-level cognitive operating framework while preserving DCI's own purpose: deterministic, deep, multi-axis cognition for advanced AI agents.

This PRD defines the required end state for a non-marketplace DCI ecosystem: resource graph, bootstrap, skills, hooks, tests, validation, audit reports, parity analysis, and 6-axis cognitive excellence.

## 2. Goals

1. Make every DCI file discoverable, routable, auditable, and usable.
2. Match Superpowers' ecosystem pattern without copying marketplace packaging.
3. Improve six cognitive axes to the highest practical level:
   - thinking
   - reasoning
   - agentic
   - knowledge
   - reliability
   - intelligence
4. Make completion impossible without automated validation.
5. Produce machine-readable evidence of coverage, parity, and readiness.

## 3. Non-Goals

- Do not add Claude Code marketplace plugin packaging in this phase.
- Do not copy Superpowers content verbatim.
- Do not weaken DCI's APEX framework identity.
- Do not claim mathematical perfection; verify practical readiness through gates.

## 4. Users

- Human owner maintaining DCI.
- AI agents using DCI for reasoning and execution.
- Future plugin/harness wrappers.

## 5. Superpowers-Inspired Requirements

| Area | Superpowers Pattern | DCI Requirement |
|---|---|---|
| Bootstrap | session-start hook injects usage skill | DCI hook injects DCI bootstrap/context |
| Skills | modular SKILL.md workflows | DCI modular skills for usage, routing, verification |
| Tests | shell-based acceptance/eval tests | DCI tests for bootstrap, routing, validation, triggering |
| Discipline | skill invocation before action | DCI route/context before action |
| Quality | PR/eval/testing expectations | DCI strict validation + score gates |
| Portability | cross-harness files | DCI non-plugin hooks + JSON/text bootstrap |
| Versioning | package metadata | DCI versioned package scripts |

## 6. Functional Requirements

### FR1: Full Resource Indexing

- Index all non-ignored files.
- Extract markdown sections.
- Extract keywords, links, dependencies, concepts, graph edges.
- Include shell/cmd hooks/tests as text resources.

### FR2: Cognitive Axis Mapping

Every meaningful file must map to one or more axes:

1. thinking
2. reasoning
3. agentic
4. knowledge
5. reliability
6. intelligence

### FR3: Routing System

Generate routes:

- need-thinking
- need-reasoning
- need-agentic
- need-knowledge
- need-reliability
- need-intelligence
- any-professional-task

Each route must include required files, optional files, concepts, and instructions.

### FR4: Bootstrap System

Generate text and JSON bootstrap context with:

- DCI activation rules,
- startup files,
- audit status,
- routing hints,
- selected startup content.

### FR5: Skills System

Provide modular DCI skills:

- using-dci
- dci-routing
- dci-verification

Each skill must include frontmatter and action discipline.

### FR6: Hooks

Provide non-plugin hooks:

- `hooks/session-start`
- `hooks/run-dci-hook.cmd`

### FR7: Tests and Evals

Provide automated tests:

- bootstrap JSON test,
- routing test,
- validation test,
- skill-triggering test,
- parity/report test.

### FR8: Parity Audit

Generate a Superpowers-style parity report comparing ecosystem categories:

- skills,
- hooks,
- tests,
- scripts,
- docs/core resources,
- package scripts,
- bootstrap/context.

### FR9: Completion Gates

Completion requires:

- `npm test` pass,
- `npm exec tsc -- --noEmit` pass,
- audit score 100,
- all gates pass,
- parity readiness pass.

## 7. Non-Functional Requirements

- Deterministic outputs.
- Zero runtime network dependency.
- Works on Node >=18.
- Generated cache ignored from git.
- No marketplace packaging in this phase.
- No hidden manual steps for validation.

## 8. Success Metrics

Minimum success:

- files indexed: 100%
- markdown section coverage: 100%
- audit readiness score: 100
- route coverage: 7/7
- ecosystem tests: pass
- parity gates: pass
- TypeScript check: pass

## 9. 10x Enhancement Criteria

DCI is considered 10x improved when it has:

1. resource graph + sections + concepts,
2. bootstrap injection,
3. modular skills,
4. hooks,
5. tests/evals,
6. strict validation,
7. parity audit,
8. generated reports,
9. package scripts,
10. repeatable one-command validation.

## 10. Review Log

### 2026-05-19

- PRD created.
- Baseline audit: Superpowers has broader ecosystem and plugin packaging; DCI already has stronger deep resource graph.
- Required build items: parity audit script, report generation, parity test, stricter package workflow.
- Implemented `scripts/dci/parity.ts` and `tests/dci/test-parity.sh`.
- Updated `npm run dci:all` to include parity gate.
- Validation evidence: 75 files indexed, 879 sections, 240 concepts, 6905 graph edges, audit score 100, parity score 100.
- Review result: non-marketplace DCI ecosystem now meets PRD gates for Superpowers-style parity while preserving DCI identity.
