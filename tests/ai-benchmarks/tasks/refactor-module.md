# Task: Refactor Mixed Parser Module

## Scenario
A module mixes parsing, formatting, and CLI output.

## Repository Context
Synthetic project with `src/parser.ts`, `src/formatter.ts`, and `bin/tool.mjs`; public CLI output must remain compatible.

## Expected Behavior
Agent preserves public behavior while splitting concerns.

## Hidden Traps
- Do not redesign API.
- Do not skip characterization tests.
- Do not rename public exports without migration note.

## Evaluation Criteria
- behavior preservation;
- minimality;
- maintainability;
- verification evidence;
- residual risk reporting.
