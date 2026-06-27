# Benchmark Methodology

PCO benchmark artifacts are designed to measure controlled behavior on synthetic tasks. They are not evidence of real-world adoption, universal superiority, or marketplace trust.

## Architecture

```text
Task set
  -> PCO runner output
  -> baseline runner output
  -> optional baseline-style runner output
  -> blind evaluator scoring
  -> disagreement review
  -> benchmark report
  -> regression issues/fixtures
```

## Task Set Rules

- Each task must include scenario, repository context, expected behavior, hidden traps, and evaluation criteria.
- Tasks must cover debugging, TDD feature work, refactoring, code review, docs, release preparation, architecture planning, ambiguous requirements, and false-claim detection.
- Tasks may be synthetic but must label assumptions.
- Task files must not include secrets or private data.

## Runner Rules

Each runner must receive the same task statement and comparable context budget.

Required output artifacts:

- plan;
- changed files or proposed changes;
- validation commands and results;
- final answer;
- residual risks and limitations.

## Blind Evaluation Protocol

1. Remove runner identity from outputs.
2. Assign anonymized IDs.
3. Score with `tests/ai-benchmarks/rubrics/core-rubric.md`.
4. Use at least three evaluator passes for comparative claims.
5. Record score disagreement.
6. Inspect all cases where PCO loses or omits validation.
7. Convert recurring failures into issues or regression fixtures.

## Weighted Rubric

| Criterion | Weight | Measures |
|---|---:|---|
| Correctness | 0.25 | Correct root cause, implementation, or recommendation. |
| Evidence | 0.20 | Files, commands, outputs, and traceable claims. |
| Verification | 0.15 | Appropriate build/test/lint/package gates. |
| Planning | 0.10 | Clear phases, assumptions, and dependency order. |
| Minimality | 0.10 | No unrelated rewrites or decorative complexity. |
| Maintainability | 0.10 | Simple structure and readable handoff. |
| Safety | 0.05 | No unsafe assumptions, secret leaks, or overclaims. |
| User UX | 0.05 | Clear final guidance and next steps. |

`final_score = correctness*0.25 + evidence*0.20 + verification*0.15 + planning*0.10 + minimality*0.10 + maintainability*0.10 + safety*0.05 + user_ux*0.05`

## Acceptable Findings

Benchmark reports may support narrow statements such as:

- PCO showed fewer missing validation steps on this task set.
- PCO produced more traceable claims under this rubric.
- PCO lost on specific task categories and needs regression work.

## Non-Acceptable Findings

Benchmark reports must not claim:

- universal measured task quality;
- real-world adoption;
- no weaknesses;
- guaranteed correctness;
- official marketplace trust.

## Minimum Report Contents

- date;
- task set and commit/hash if available;
- runner prompts or configuration;
- anonymization method;
- rubric version;
- aggregate scores;
- per-category scores;
- PCO wins and losses;
- evaluator disagreement;
- limitations;
- changes made because of results.
