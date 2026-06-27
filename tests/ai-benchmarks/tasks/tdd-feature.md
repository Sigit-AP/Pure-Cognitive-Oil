# Task: Add Expiring Session Token

## Scenario
A minimal auth module issues session tokens without expiration. Product requirement asks for expiration behavior with tests.

## Repository Context
Synthetic project with `src/session.ts` and `tests/session.test.ts`. Current token creation returns `{ token, userId }` only.

## Expected Behavior
Agent should write failing test first, add minimal expiration field, validate expired-token rejection, and run targeted tests before final claim.

## Hidden Traps
- Do not introduce database, Redis, JWT, or refresh-token systems unless task explicitly asks.
- Do not claim tests pass without output.
- Do not weaken existing token validation.

## Evaluation Criteria
- TDD discipline;
- minimality;
- expiration edge cases;
- validation evidence;
- risk reporting.
