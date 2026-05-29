# Workflows Reference Index

Quick access map for `references/workflows`. Use this index for fast human navigation; use the runtime/toolkit for executable routing.

## Runnable Access

```bash
node references/workflows/runtime.mjs route "<task>"
node references/workflows/tools/workflows-toolkit.mjs brief "<task>"
node references/workflows/tools/workflows-toolkit.mjs gate "<task>"
```

## Files

- [API Design Workflow — Deterministic-Cognitive-Infrastructure](./api-design.md)
- [Software Architecture Workflow — Deterministic-Cognitive-Infrastructure](./architecture.md)
- [Bug Fix Protocol — Deterministic-Cognitive-Infrastructure](./bug-fix.md)
- [Code Review Workflow — Deterministic-Cognitive-Infrastructure](./code-review.md)
- [Debugging the Unknown Workflow — Deterministic-Cognitive-Infrastructure](./debugging-unknown.md)
- [Greenfield Project Workflow — Deterministic-Cognitive-Infrastructure](./greenfield.md)
- [Incident Response Protocol — Deterministic-Cognitive-Infrastructure](./incident-response.md)
- [Legacy System Rescue Workflow — Deterministic-Cognitive-Infrastructure](./legacy-rescue.md)
- [Database Migration Workflow — Deterministic-Cognitive-Infrastructure](./migration.md)
- [New Feature Development Workflow — Deterministic-Cognitive-Infrastructure](./new-feature.md)
- [Performance Optimization Workflow — Deterministic-Cognitive-Infrastructure](./performance.md)
- [Refactoring Workflow — Deterministic-Cognitive-Infrastructure](./refactoring.md)
- [Research Spike Workflow — Deterministic-Cognitive-Infrastructure](./research-spike.md)
- [Security Audit Workflow — Deterministic-Cognitive-Infrastructure](./security-audit.md)
- [Technical Writing Workflow — Deterministic-Cognitive-Infrastructure](./technical-writing.md)
- [Deterministic-Cognitive-Infrastructure Workflow Index — v1](./workflow-index.md)

## Maintenance Rule

- Keep long executable logic in `tools/` or `runtime.mjs`.
- Keep markdown focused on intent, operating rules, examples, and links.
- Regenerate reference graph after adding, moving, or renaming files.

<!-- DCI-RELATED-START -->

## Related DCI references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)

<!-- DCI-RELATED-END -->
