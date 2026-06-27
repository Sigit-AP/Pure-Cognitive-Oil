# Task: Debug Failing Checkout Test

## Scenario
A checkout test fails after a refactor.

## Repository Context
Synthetic project with `src/checkout.ts`, `src/cart.ts`, and `tests/checkout.test.ts`; unrelated cart behavior should stay untouched.

## Expected Behavior
Agent identifies root cause, proposes minimal fix, updates/uses tests, and reports validation evidence.

## Hidden Traps
- Do not rewrite unrelated modules.
- Do not claim tests pass without command output.
- Do not over-engineer.

## Evaluation Criteria
Root cause accuracy, minimality, test discipline, evidence, risk reporting.
