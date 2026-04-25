# Error Recovery Protocol — APEX v1

> **"A system's intelligence is not defined by its ability to avoid errors—avoiding all errors requires moving too slowly to be useful. True intelligence is defined by the speed, depth, and structural learning achieved when errors inevitably occur."**

## Part 1: The 7 Levels of Error Severity

```
LEVEL 1: TRIVIAL (Mechanical / Typographical)
├─ Symptoms: Build fails immediately, linter complains, obvious typo, syntax error.
├─ Immediate Action: Fix in place.
├─ Recovery Time: < 1 minute.
├─ Trace Requirement: Visual inspection of immediate context only.
├─ Psychological Trap: Ignoring lint warnings because "it's just a warning."
└─ Systemic Learning: None required. These are statistical inevitabilities of typing.

LEVEL 2: MINOR (Logic Error in Isolated Context)
├─ Symptoms: A single unit test fails, unexpected output in a specific edge case, off-by-one error.
├─ Immediate Action: Write or update a test that captures the specific failure, then fix the code.
├─ Recovery Time: 2-10 minutes.
├─ Trace Requirement: Check all callers of that specific function to ensure the fix doesn't break them.
├─ Psychological Trap: Fixing the symptom (e.g., adding `if (x == null) return`) without understanding why it was null.
└─ Systemic Learning: Document the specific edge case. Why wasn't it considered originally?

LEVEL 3: MODERATE (Wrong Mental Model for a Single Component)
├─ Symptoms: Multiple tests fail, logic is fundamentally backward for a module, state management is leaking.
├─ Immediate Action: STOP. Do not apply band-aids. Revert the module to last known good state if necessary.
├─ Recovery Time: 10-30 minutes.
├─ Trace Requirement: Full review of all consumers of that component. Data flow analysis.
├─ Psychological Trap: The "Sunk Cost" fix—adding layers of complexity to force a bad mental model to work.
└─ Systemic Learning: Identify WHY the mental model was wrong. Was the documentation misleading? Were requirements ambiguous?

LEVEL 4: MAJOR (Fundamental Misunderstanding of Technology/API/Requirements)
├─ Symptoms: The chosen approach is fundamentally unworkable, violates physics/network constraints, or fundamentally misunderstands the user's request.
├─ Immediate Action: Revert all related changes. Wipe the slate clean. Return to the THINK and DESIGN phases.
├─ Recovery Time: 30-60 minutes.
├─ Trace Requirement: Review all architectural assumptions that were based on this misunderstood technology.
├─ Psychological Trap: Denial. Trying to "hack" the technology to do something it wasn't designed for instead of changing the approach.
└─ Systemic Learning: Major update to the knowledge base about this technology/API. Add explicit warnings for future use.

LEVEL 5: CRITICAL (Bad Changes Committed, Merged, or Deployed)
├─ Symptoms: System regression in main branch, data corruption, security vulnerability introduced.
├─ Immediate Action: INCIDENT RESPONSE. Immediate revert/rollback of the commit/deploy. Do not try to "fix forward" under pressure unless revert is impossible.
├─ Recovery Time: 1-4 hours (including mitigation, proper fix, and post-mortem).
├─ Trace Requirement: Full blast radius analysis. Has bad data been written to the database? Have users seen errors?
├─ Psychological Trap: Panic. Rushing a fix that introduces a worse secondary error.
└─ Systemic Learning: Why did the quality gates fail to catch this? Add pre-commit, CI, or pre-deploy checks to make this specific failure class impossible to merge again.

LEVEL 6: HALLUCINATION (False Facts Stated as Truth)
├─ Symptoms: Discovering a claim, API endpoint, or historical fact you stated earlier was entirely fabricated or confidently incorrect.
├─ Immediate Action: EXPLICIT RETRACTION. Stop all work based on the claim immediately.
├─ Recovery Time: Variable (depends entirely on how deep the hallucination propagated).
├─ Trace Requirement: Trace EVERY decision, every line of code, and every downstream assumption based on the false claim.
├─ Psychological Trap: Silent correction. Fixing the code but not acknowledging the hallucination, leaving the human with a flawed mental model.
└─ Systemic Learning: Identify the hallucination trigger. Were you working from memory instead of reading docs? Were you subject to availability bias? Update the Hallucination Defense engine.

LEVEL 7: CASCADING (Error Propagated Across Multiple Domains/Systems)
├─ Symptoms: Fixing one thing breaks three others. Deep architectural flaw. A security vulnerability that exists in 50 different microservices because of a shared flawed pattern.
├─ Immediate Action: Halt all active development on the feature. Declare a systemic freeze. Full system audit.
├─ Recovery Time: Days/Weeks.
├─ Trace Requirement: Complete dependency graph analysis. Exhaustive search of the entire codebase for the pattern.
├─ Psychological Trap: Hopelessness or "Not My Problem" syndrome.
└─ Systemic Learning: Fundamental framework or architectural paradigm shift required. The system design itself is conducive to errors.
```

## Part 2: The Universal Recovery Algorithm

```
When ANY error above Level 1 is detected, you MUST break your current flow and execute this algorithm immediately. Do not skip steps.

STEP 1: HALT AND SECURE
├─ Stop making forward progress. Writing more code on top of broken code squares the technical debt.
├─ Do not apply "quick fixes" (Band-Aids over bullet holes).
├─ Secure the current state (commit WIP, stash, or note the exact error and stack trace).
└─ Mentally shift from "Builder" mode (optimistic, generative) to "Investigator" mode (skeptical, analytical).

STEP 2: PRECISE DIAGNOSIS
├─ State the EXPECTED behavior explicitly (e.g., "The function should return a User object").
├─ State the ACTUAL behavior explicitly with evidence (e.g., "The function returned null, per log line 42").
├─ State the DELTA exactly.
└─ Formulate a falsifiable hypothesis for the root cause before touching the code.

STEP 3: ROOT CAUSE ANALYSIS (The 5 Whys Method)
├─ Example Flow:
│  ├─ Why did the system crash? → NullReferenceException at `user.getName()`.
│  ├─ Why was `user` null? → The database query returned no results.
│  ├─ Why did it return no results? → The ID passed to the query was undefined.
│  ├─ Why was the ID undefined? → The frontend sent the payload as `user_id` but the backend expected `userId`.
│  └─ Why was there a mismatch? → No shared type contract between frontend and backend.
├─ Fixing the crash (adding a null check) solves the symptom.
└─ Fixing the root cause (adding shared TypeScript interfaces) solves the disease.

STEP 4: IMPACT TRACING (Blast Radius)
├─ If the root cause is [X], what else relies on [X]?
├─ List all files, modules, and tests potentially affected by the root cause AND the proposed fix.
├─ Did this bug write corrupt data to a database? (If yes, you must write a migration to fix the data, not just fix the code).
└─ Expand the search radius beyond the immediate failure point.

STEP 5: REPAIR AND VERIFY (Test-Driven Fix)
├─ Write a test that specifically targets and reproduces the failure condition. (Watch it fail).
├─ Implement the fix for the root cause.
├─ Run the specific test. (Watch it pass).
└─ Run the FULL regression suite to verify the fix didn't break anything else.

STEP 6: STRUCTURAL IMMUNIZATION
├─ Ask: "How do we make this entire class of error impossible in the future?"
├─ Hierarchy of Immunization (Best to Worst):
│  1. Type System / Compiler: Make the invalid state unrepresentable (e.g., Rust's Option instead of null).
│  2. Linter Rules: Catch the bad pattern at write-time.
│  3. Automated Tests: Catch it at build-time.
│  4. Runtime Assertions: Catch it at execution-time (fail fast).
│  5. Documentation: Tell developers not to do it (weakest defense).
└─ Implement the highest level of immunization feasible.
```

## Part 3: The "Undo" Hierarchy

```
When an approach fails, how do you back out? Preference is strictly top-to-bottom.

PREFERENCE 1: REVERT (Cleanest, Fastest, Safest)
├─ Mechanism: `git revert`, `git reset --hard`, or manual deletion of the entire new approach.
├─ Use when: The entire approach is flawed, multiple files are entangled, or you are lost in a refactor.
├─ Advantage: Guarantees a return to a known, working baseline immediately. Zero mental overhead to verify.
└─ Cost: Loss of potentially salvageable work (which is usually a sunk cost fallacy anyway).

PREFERENCE 2: FIX FORWARD (Surgical, Continuous)
├─ Mechanism: Address the root cause directly in the current state by adding new commits.
├─ Use when: The architecture is sound, the tests pass mostly, but a specific implementation detail or edge case is wrong.
├─ Advantage: Preserves progress and maintains forward momentum.
└─ Cost: High risk of compounding errors if the root cause isn't fully understood. You might be building on sand.

PREFERENCE 3: PATCH (Mitigation / Tactical)
├─ Mechanism: Apply a focused, minimal change to stop the immediate bleeding (e.g., adding a null check, disabling a feature flag).
├─ Use when: In an active production incident where MTTR (Mean Time To Recovery) is critical and a full fix will take hours.
├─ Advantage: Fast symptom relief. Stops user impact immediately.
└─ Cost: Accrues technical debt. MUST be followed by a Jira ticket/TODO for the structural fix later.

PREFERENCE 4: WORKAROUND (Avoidance)
├─ Mechanism: Change the execution path to avoid the broken code entirely without fixing it.
├─ Use when: The broken code is a third-party dependency, a closed-source system, or a deep legacy system you don't own.
├─ Advantage: Isolates the problem without needing to understand the black box fully.
└─ Cost: High technical debt, cognitive overhead for future maintainers ("Why are we doing this weird thing?").

PREFERENCE 5: DOCUMENT (Acceptance)
├─ Mechanism: Document the failure as a known limitation, bug, or constraint in the README or issue tracker.
├─ Use when: The cost of fixing exceeds the business value, fixing is mathematically impossible, or it's a fundamental limitation of the platform.
├─ Advantage: Zero implementation cost, sets clear expectations for users.
└─ Cost: User friction, permanent defect in the product.
```

## Part 4: Specific Failure Recovery Scenarios

### 4.1 Test Suite Failure (The "Red Build" Protocol)
```
When a test fails, do not panic and do not guess.

1. READ THE ENTIRE ERROR.
   ├─ Do not just look at the last line.
   ├─ Read the expected vs. actual values.
   └─ Read the stack trace to find where YOUR code intersects the framework code.
2. CLASSIFY THE FAILURE.
   ├─ Compilation Error: Syntax, type mismatch, missing import.
   ├─ Runtime Exception: Null pointer, out of bounds, network timeout.
   └─ Assertion Failure: The code ran, but the logic is wrong (Expected 5, got 4).
3. BREADTH CHECK.
   ├─ Did ONE test fail? Look at the specific logic of that test's target.
   └─ Did MANY tests fail? Look for a shared setup issue, a broken database connection, an environment variable change, or a core dependency failure.
4. FLAKINESS CHECK.
   ├─ Does the test pass if you run it again?
   ├─ If YES: You have a race condition, state leakage between tests, or a timing dependency.
   └─ DO NOT ignore flaky tests. A test that lies 10% of the time is worse than no test.
5. THE GOLDEN RULE OF TESTING:
   ├─ NEVER modify the test to "make it pass" unless you have explicitly proven (and documented) that the test itself was flawed or outdated.
   └─ If you change a test to match broken code, you have codified a bug.
```

### 4.2 Hallucination Recovery (The Trust Rebuild Protocol)
```
Hallucinations destroy trust instantly. Recovery requires extreme transparency.

1. EXPLICIT RETRACTION.
   ├─ "I previously stated that the `fetchUser` API takes a `userId` parameter. This was incorrect."
   └─ Do not soften it ("I may have been slightly off"). Own the error.
2. TRACE THE POISON.
   ├─ List EVERY conclusion you reached based on that false fact.
   ├─ List EVERY plan you made based on it.
   └─ List EVERY line of code you wrote based on it.
3. QUARANTINE.
   ├─ Treat all traced items as mathematically invalid until re-verified.
4. RE-SOURCE.
   ├─ Find the ACTUAL truth using a Level 1 (Live) source. Go read the actual API documentation or the source code.
5. RE-EVALUATE.
   ├─ Does the new truth invalidate the entire approach? If yes, go to Level 4 Error Recovery (Major).
```

### 4.3 The "Shotgun Debugging" Anti-Pattern Recovery
```
Symptom: You have made 5+ small changes, restarted the server 5+ times, added console.logs everywhere, and it still doesn't work. You are no longer engineering; you are guessing.

1. ACKNOWLEDGE THE LOOP.
   ├─ "I am shotgun debugging. I am changing things blindly because I do not understand the problem."
2. HARD RESET.
   ├─ `git stash` or `git checkout .` to return to the baseline state before you started guessing. Delete your random console.logs.
3. RE-HYPOTHESIZE.
   ├─ You must formulate a testable hypothesis BEFORE changing a single line of code again.
   └─ "If the issue is X, then checking log Y should show Z."
4. ISOLATE (The Crucible).
   ├─ If the system is too complex to reason about, write a minimal reproduction script outside the main codebase.
   └─ Strip away all middleware, UI, and external systems until you have 10 lines of code that reproduce the exact error.
5. PROVE.
   ├─ Only apply the fix to the main codebase once you have proven it works in isolation.
```

### 4.4 Git Chaos Recovery (Merge Conflicts, Detached HEAD, Lost Commits)
```
Git errors induce panic. Panic induces catastrophic data loss.

1. STOP. DO NOT TYPE `git push -f`.
   ├─ Do not run random git commands you found on StackOverflow without understanding them.
2. ASSESS STATE.
   ├─ Run `git status`. Read every word of the output. Git usually tells you exactly how to fix the current state.
3. THE SAFETY NET.
   ├─ `git reflog` is your ultimate safety net. It records every time the tip of a branch was updated. You can almost always reset to a state from 10 minutes ago, even if you "deleted" the commit.
4. ABORT WHEN LOST.
   ├─ If you are in the middle of a complex, horrifying merge conflict and don't know what's happening:
   ├─ `git merge --abort`
   └─ `git rebase --abort`
5. THE PARANOIA BACKUP.
   ├─ When in doubt, literally copy-paste the entire project directory to a backup folder (e.g., `project_backup_pre_rebase`) before attempting complex git recovery. Disk space is cheap; your time is not.
```
