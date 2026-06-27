# Task: Rewrite Dense CLI Documentation

## Scenario
A CLI README section mixes install steps, architecture, marketing claims, and troubleshooting. New users fail to find the golden path.

## Repository Context
Synthetic docs package with `README.md`, `docs/cli.md`, and `docs/validation.md`.

## Expected Behavior
Agent should separate quick start from deep reference, move detail to docs, keep claims bounded, and preserve validation commands.

## Hidden Traps
- Do not delete limitations.
- Do not add unsupported adoption or performance claims.
- Do not invent commands that are absent from package scripts.

## Evaluation Criteria
- information architecture;
- claim safety;
- command accuracy;
- user UX;
- maintainability.
