# PCO Resource Budget System

Purpose: make PCO complex and professional without unnecessary token, CPU, file-read, or validation cost.

## Budget dimensions

| Dimension | Budget question | Control |
|---|---|---|
| Context | How many chars/tokens are loaded? | `--max-chars`, compact index, exact section drilldown |
| Breadth | How many files are selected? | `--limit`, `--max-selected`, mode selector |
| Graph depth | How far neighbors expand? | `--depth` |
| Runtime | How many commands run? | validation tiers |
| Human attention | How much final reporting? | evidence-bound concise reports |

## Tiered validation

### Lightweight validation

Use when no npm dependencies are available or task is low risk.

Checks: JSON parse, required files exist, direct boot present, plugin resources resolve, runtime route works, bootstrap JSON parses, no absolute perfection claims.

### Runtime validation

Use when Node is available.

Checks: route, capsule, bootstrap, mode selector, compact index generation, direct-use audit, benchmark suite.

### Full repository validation

Use only when dependencies and permission exist.

Checks: `npm test`, `npm run pco:validate`, `npm run pco:readiness`, `npm run pco:healthcheck`, `npm run pco:runtime-audit`, and direct-use audit. If registry access fails, state the boundary instead of pretending full validation ran.

## Default budgets

Quick: max 4 selected files, max 8k chars, depth 0.

Standard: max 8 selected files, max 18k chars, depth 1.

Deep: max 14 selected files, max 28k chars, depth 2.

Critical: max 24 selected files, max 45k chars, depth 2 plus adversarial review.

## Efficiency law

PCO must spend resources only when the extra context changes decisions, risk, verification, or user outcome. If extra loading does not change any of those, keep the smaller mode.
