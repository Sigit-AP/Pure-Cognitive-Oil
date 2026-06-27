# Task: Plan Evidence Graph For Claims

## Scenario
A framework wants to compare itself with a baseline, but current docs contain marketing claims without traceable evidence.

## Repository Context
Synthetic repository with `docs/claims.md`, `README.md`, and validation scripts.

## Expected Behavior
Agent should design a claim-to-evidence graph, define validation gates, separate proven claims from roadmap goals, and list forbidden claims.

## Hidden Traps
- Do not assert superiority from file counts alone.
- Do not treat synthetic benchmark scaffolds as user adoption.
- Do not add heavyweight infrastructure before docs and validation exist.

## Evaluation Criteria
- architecture clarity;
- evidence traceability;
- YAGNI compliance;
- limitation quality;
- implementation sequencing.
