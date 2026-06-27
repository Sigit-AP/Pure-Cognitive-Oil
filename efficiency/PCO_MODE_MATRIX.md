# PCO Mode Matrix — Complex but Resource-Efficient Operation

Purpose: choose the smallest mode that preserves PCO's full graph-first discipline. This prevents PCO from wasting context on every task while still allowing deep, critical, and full-audit execution when evidence requires it.

PCO is not simplified by using modes. The modes control resource allocation, not cognitive rigor. Every mode keeps claim sourcing, assumption labeling, adversarial checks, uncertainty calibration, and completion evidence active.

## Mode selection summary

| Mode | Use when | Route depth | Route limit | Context budget | Validation level |
|---|---|---:|---:|---:|---|
| Quick | Low-risk direct answer, small file read, simple known task | 0 | 4 | 6k-8k chars | Lightweight checks only |
| Standard | Normal professional task, bounded edit, moderate reasoning | 1 | 8 | 12k-18k chars | Runtime route + targeted verification |
| Deep | Multi-file, architecture, research, framework, audit, ambiguity | 2 | 12-14 | 18k-28k chars | Route + capsule + direct-use audit where relevant |
| Critical | Security, production, destructive, migration, irreversible, high blast radius | 2 | 18-24 | 28k-45k chars | Full available validation + adversarial review |

## Mode contracts

### Quick

Use Quick when the task is clear, reversible, low-risk, and does not need broad graph traversal.

Load: `AI_MODEL_BOOT.md`, core instruction excerpt, one exact reference if needed.

Do not load the full reference corpus. Do not run npm validation. Verify only the specific claim or file output needed.

### Standard

Use Standard for most professional work.

Run or simulate:

```bash
node references/runtime/pco-reference-runtime.mjs route "<task>" --limit 8 --depth 1
```

Load startup files plus selected workflow/gates. Use exact section drilldown before full-file escalation.

### Deep

Use Deep for the user's current kind of work: framework upgrade, architecture, complex audit, multi-language tooling, and resource optimization.

Run or simulate:

```bash
node references/runtime/pco-reference-runtime.mjs route "<task>" --limit 12 --depth 2
node references/runtime/pco-reference-runtime.mjs capsule "<task>" --limit 12 --depth 2
```

Load compact index and exact sections. Run direct-use audit after changes.

### Critical

Use Critical only when stakes justify cost.

Add independent review, full available validation, rollback plan, destructive-action approval, and explicit residual-risk register. Do not claim universal absence of defects.

## Escalation rules

Escalate one mode when any of these occur: contradiction between sources, failed verification, unclear authority boundary, security/privacy concern, unknown runtime behavior, broad file mutation, or user asks for stronger evidence.

De-escalate when the active mode is spending resources without changing decisions, evidence, or risk posture.

## Evidence boundary language

Use: "passed Quick/Standard/Deep/Critical checks within the stated audit boundary."

Avoid universal perfection language. PCO should be honest by design.
