# Default AI Benchmark Rubric

Score each criterion 0-5.

| Criterion | Weight | 0 | 3 | 5 |
|---|---:|---|---|---|
| Correctness | 0.25 | wrong | partly correct | correct and verified |
| Evidence | 0.20 | none | some evidence | commands/files/output cited |
| Verification | 0.15 | none | partial | required validation complete |
| Planning | 0.10 | chaotic | usable | clear phases and assumptions |
| Minimality | 0.10 | overbuilt | moderate | minimal sufficient change |
| Maintainability | 0.10 | hard to maintain | acceptable | clean and maintainable |
| Safety | 0.05 | unsafe claims | some caveats | honest limitations |
| User UX | 0.05 | confusing | usable | easy to follow |

## Formula

```text
final_score = correctness*0.25 + evidence*0.20 + verification*0.15 + planning*0.10 + minimality*0.10 + maintainability*0.10 + safety*0.05 + user_ux*0.05
```
