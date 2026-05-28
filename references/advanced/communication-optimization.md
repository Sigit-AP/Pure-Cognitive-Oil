# Communication Optimization System — Deterministic-Cognitive-Infrastructure

> **"Code is read ten times more often than it is written. Therefore, optimizing for human readability is not a stylistic preference; it is a hard economic requirement. If a system is perfectly efficient for the machine but incomprehensible to the human, its maintenance cost will eventually exceed its value, and it will be rewritten. You are not writing code for the compiler; you are writing code for the next human to maintain it."**

## Part 1: The Principle of Least Astonishment (PoLA)

```
The core tenet of communication in software engineering is predictability. A system should behave in a way that least surprises the person reading it, using it, or maintaining it. Every surprise is a cognitive tax.

APPLICATION 1: NAMING CONVENTIONS
├─ A function named `getUser()` should get a user. It should NOT also update the user's last login time. (That is a hidden side effect, a massive violation of PoLA).
├─ A boolean variable should read like a true/false question: `isReady`, `hasPermission`, `canExecute`. (Not `readyStatus` or `checkPermission`).
├─ Arrays/Collections should be plural: `users`, `activeConnections`.
├─ Single items should be singular: `user`, `connection`.
└─ Consistency across boundaries: If the database column is `user_id`, the API payload should be `user_id`, and the frontend variable should be `userId`. Do not rename concepts arbitrarily across layers.

APPLICATION 2: UNIFORMITY
├─ If you use `fetchUser()` in one file, do not use `retrieveAccount()` in another file to mean the exact same thing. Pick one verb and stick to it universally.
├─ If configuration is done via environment variables for one module, do not use a bespoke JSON config file for another module without a strong, documented architectural reason.
└─ The codebase should look like it was written by one single, disciplined entity, even if a hundred people contributed. Run formatters (Prettier/gofmt) automatically to eliminate stylistic debates.

APPLICATION 3: THE "GOTO" EXPECTATION
├─ In a web framework (like NestJS or Spring), controllers should look like controllers. Services should look like services.
├─ Do not invent a bespoke, "clever" dependency injection framework or routing mechanism if a standard one exists and works.
└─ You are not optimizing for your own cleverness or demonstrating your computer science degree; you are optimizing for the junior developer who joins the team 6 months from now and has to debug this at 2 AM under pressure.
```

## Part 2: Code as Communication (Self-Documenting Code)

```
Your code is your primary medium of communication. Comments are secondary (they compensate for expressive failures in the code). External documentation is tertiary.

RULE 1: EXPRESSIVE VARIABLES OVER COMMENTS
If you need a comment to explain what a variable is, the variable is named incorrectly.
❌ Bad:
`const d = 86400; // seconds in a day`
✅ Good:
`const SECONDS_IN_A_DAY = 86400;`

RULE 2: ENCAPSULATE COMPLEX CONDITIONALS
Do not force the reader to parse boolean algebra in their head while reading business logic.
❌ Bad:
`if (user.age > 18 && user.subscription.status === 'active' && !user.isBanned) { ... }`
✅ Good:
`const isPremiumAdultUser = user.age > 18 && user.subscription.status === 'active' && !user.isBanned;`
`if (isPremiumAdultUser) { ... }`

RULE 3: EARLY RETURNS (Guard Clauses)
Deep nesting causes exponential cognitive load. Human working memory cannot easily hold 4 levels of nested `if` statements. Flatten your logic.
❌ Bad:
```javascript
function processOrder(order) {
  if (order != null) {
    if (order.status === 'PENDING') {
      if (order.items.length > 0) {
        // Do the actual work (nested 3 levels deep)
        return true;
      } else {
        return false; // No items
      }
    } else {
      return false; // Not pending
    }
  }
  return false; // Null order
}
```
✅ Good:
```javascript
function processOrder(order) {
  // Guard clauses reject invalid states immediately
  if (order == null) return false;
  if (order.status !== 'PENDING') return false;
  if (order.items.length === 0) return false;

  // The "Happy Path" is completely flat and immediately readable
  // Do the actual work
  return true;
}
```

RULE 4: THE "WHY" IN COMMENTS, NOT THE "WHAT"
The code explains WHAT is happening. The comment explains WHY it is happening.
❌ Bad (Explaining what):
`// Increment i by 1`
`i++;`
✅ Good (Explaining why):
`// API limits us to 50 requests per batch, so we offset by 1 to handle the header row.`
`i++;`

RULE 5: MAGIC NUMBERS AND STRINGS
Never use raw numbers or strings in logic without defining them as constants.
❌ Bad:
`if (status === 4)`
✅ Good:
`const STATUS_SHIPPED = 4;`
`if (status === STATUS_SHIPPED)`
```

## Part 3: The Documentation Hierarchy

```
Documentation must be layered. Not everyone needs to know everything at once. Providing a 100-page manual to someone who just wants to run the tests is a communication failure.

LAYER 1: THE README (The Elevator Pitch)
├─ Audience: Anyone looking at the repository for the first time.
├─ Content: What does this do? Why does it exist? How do I start it? How do I run the tests?
└─ Metric: A new developer should be able to clone the repo, install dependencies, and get the project running locally within 15 minutes by blindly copying and pasting commands from the README. If they can't, your onboarding is broken.

LAYER 2: ARCHITECTURE DECISION RECORDS (ADRs)
├─ Audience: Current and future maintainers; technical leadership.
├─ Content: Why did we choose Postgres over Mongo? Why did we build a custom auth system instead of using Auth0? Why did we switch to GraphQL?
├─ Structure: Context -> Decision -> Consequences -> Status (Accepted/Deprecated).
└─ Metric: Prevents "Chesterton's Fence" violations. Stops the team from having the exact same architectural argument every 6 months.

LAYER 3: API SPECIFICATIONS (OpenAPI/Swagger)
├─ Audience: Consumers of your system (Frontend devs, external clients, mobile teams).
├─ Content: Exact endpoints, request payloads, response schemas, error codes, authentication requirements.
└─ Metric: The frontend team should be able to build the complete UI against your spec, using mock servers generated from the spec, before the backend implementation is even finished.

LAYER 4: INLINE COMMENTS (JSDoc, Docstrings)
├─ Audience: Developers modifying or calling the specific function within the IDE.
├─ Content: Parameter types, return types, edge-case warnings, exceptions thrown.
└─ Metric: Modern IDEs will display this documentation on hover, preventing the developer from having to context-switch to read the implementation details.
```

## Part 4: Commit Messages and PR Descriptions

```
Git history is the permanent, unalterable record of your project's evolution. It is not a save-state. Treat it as a communication medium to developers 5 years in the future.

THE ANATOMY OF A PERFECT COMMIT MESSAGE:
1. The Subject Line (50 characters or less).
   ├─ Imperative mood ("Fix bug", not "Fixed bug" or "Fixes bug"). Imagine it completing the sentence: "If applied, this commit will..."
   └─ Capitalized, no period at the end.
2. The Blank Line. (Crucial for parsing tools like `git log --oneline`).
3. The Body (Wrap at 72 characters).
   ├─ Explain the context: Why is this change necessary? What was wrong with the previous state?
   ├─ Explain the implementation: How does it address the issue?
   └─ Explain the side effects: What else might this impact? Are there breaking changes?

EXAMPLE:
```
Refactor user authentication flow to use JWTs

Previously, we used stateful session cookies stored in Redis, which caused 
scaling issues and high latency when load balancing across multiple API instances.

This commit replaces the session store with stateless JWTs signed
via RS256. The token payload includes user roles to prevent unnecessary
database lookups on protected routes.

Breaking Changes:
- The `/api/login` endpoint now returns a `token` field instead of setting a cookie.
- Clients must include the `Authorization: Bearer <token>` header on all requests.
```

PULL REQUEST (PR) DESCRIPTIONS:
A PR description is your written argument to the reviewer that your code is safe, correct, and ready to merge.
├─ 1. Context: Link to the Jira/Linear ticket. What business problem does this solve?
├─ 2. Approach: High-level summary of the technical strategy used.
├─ 3. Testing: "How did I verify this works?" Provide the exact steps for the reviewer to reproduce the success locally.
└─ 4. Visual Proof (Crucial): If it's a UI change, a "Before/After" screenshot is mandatory. A video is better. Reviewers should not have to pull your branch and run the build just to see what the button looks like.
```

## Part 5: Asynchronous Communication (Slack, Teams, Discord)

```
Software engineering is a team sport. How you communicate your issues determines how fast they get solved and how much goodwill you retain with your colleagues.

ANTI-PATTERN 1: THE NAKED PING
❌ "Hi." / "Are you there?" / "Quick question." / "Got a minute?"
(This forces a synchronous interruption, breaks the recipient's flow state, and demands their attention without providing any context so they can prioritize it. It is incredibly rude in an async culture).

ANTI-PATTERN 2: THE VAGUE ERROR
❌ "The build is broken." / "It's not working on my machine." / "I'm getting an error."
(This shifts the entire burden of investigation onto the recipient. It forces them to interrogate you to drag the details out).

THE PERFECT ASYNC REQUEST (The "Actionable Ping"):
Provide all necessary context in the very first message so the recipient can read it, understand the urgency, and solve it immediately upon reading it, even if they read it 3 hours later.

✅ "Hi @DevOpsTeam, the staging build is failing in CI.
Symptom: The `checkout_test.js` is throwing a 500 Server Error on the payment mock.
Context: It started failing after commit `a1b2c3d` (the new Stripe integration merged this morning).
What I've tried: I re-ran the pipeline, cleared the cache, and verified the Stripe API keys in staging. They appear correct. I've attached the full stack trace in the thread below.
Ask: Does anyone know if the Stripe sandbox environment is currently down, or if the mock payload format changed?"

WHY THIS WORKS:
1. The immediate symptom is clear.
2. The exact location of the failure is specified.
3. The temporal context (when it started) gives a clue to the cause.
4. The Proof of Effort (what you already tried) proves you aren't being lazy and stops them from suggesting obvious, insulting fixes like "did you clear the cache?".
5. A specific, targeted question is asked, minimizing the cognitive load to answer.

THE PROOF OF WORK STANDARD:
When you tell someone "I verified it" or "It works", you must provide Proof of Work.
❌ Bad: "I checked the code and it looks good. The tests pass."
✅ Good: "I ran the test suite locally (`npm run test:auth`). All 42 tests passed. Here is the output for the specific edge case test I added..." (Attach snippet).
This builds immense trust. If the human sees the proof, they don't have to verify it themselves.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](../advanced/cognitive-load.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)
- [Software Architecture Workflow — Deterministic-Cognitive-Infrastructure](../workflows/architecture.md)

<!-- DCI-RELATED-END -->
