# Debugging the Unknown Workflow — Deterministic-Cognitive-Infrastructure

> **"When you have eliminated the impossible, whatever remains, however improbable, must be the truth. When debugging an alien, undocumented system, trust absolutely nothing. Measure absolutely everything. Reading code is guessing. Running code is knowing."**

## Part 1: The Epistemology of the Unknown

```
You are tasked with fixing a critical Sev-1 bug in a massive, 10-year-old system you did not write, in a programming language you barely know, using an obscure proprietary framework you have never seen, and the original author left the company 4 years ago.

THE THREE LAWS OF ALIEN DEBUGGING:
1. Do Not Read the Code: Reading 100,000 lines of unfamiliar, undocumented spaghetti code will instantly destroy your working memory and cause cognitive overload. The code is a labyrinth designed to trap you. Do not enter it without a mathematical thread.
2. Follow the Data (The Plumber's Rule): Programs, no matter how complex, are ultimately just physical pipes moving bytes from Point A to Point B. Find the data at A. Find the data at B. Measure where the data mutates along the pipe. The bug is the mutation.
3. Trust the Logs, Not the Comments: Human comments lie. Variable names lie. Outdated Confluence wiki pages lie aggressively. The ONLY things in the universe that do not lie are the physical stack trace, the raw network payload, and the database transaction log.
```

## Part 2: Phase 1 - The Black Box (Observation)

```
Treat the alien system entirely as a black box. At this stage, you do not care how it works internally. You only care about its physical inputs and outputs.

STEP 1: CAPTURE THE I/O (The Trigger)
├─ Network: Open the browser dev tools (Network tab). Find the exact HTTP request that triggers the failure. Right-click and "Copy as cURL".
├─ Database: Turn on strict SQL query logging at the database level. What exact, literal SQL query was fired into the engine the millisecond the error occurred?
└─ The Goal: You now have a 100% reproducible, command-line trigger for the bug that bypasses the massive frontend UI entirely. You control the trigger.

STEP 2: IDENTIFY THE ENTRY POINT (The Front Door)
├─ Look at the `cURL` URL (e.g., `/api/v2/orders/finalize`).
├─ Search the entire alien codebase globally (using `rg` or `grep`) for that exact string or route definition syntax.
└─ You have found the front door. You now have a starting line for your tracer bullet.
```

## Part 3: Phase 2 - The Tracer Bullet (Mapping the Labyrinth)

```
You have found the front door. Now you must trace the exact execution path through the alien codebase without getting lost in the weeds.

TECHNIQUE 1: THE LOG BOMB (Sonar Ping)
├─ If you cannot attach an interactive debugger (due to complex Docker setups or production environments), scatter aggressive, highly visible `console.log` (or `logger.error`) statements at the absolute beginning of every major function the route seems to call.
├─ Example: `console.log(">>>>>>>> [TRACER] ENTERED processOrder. Input:", JSON.stringify(order));`
├─ Run your isolated `cURL` trigger.
└─ Look at the logs. You now have an exact, linear map of which path the code took through the massive `if/else` maze.

TECHNIQUE 2: THE FORCED CRASH (Stack Trace Harvesting)
├─ If you are deep in a utility file and you don't know where a specific, weird function is actually being called from in the larger app, do not try to search for it (dynamic languages hide references).
├─ Instead, throw a hard, fatal error directly inside it: `throw new Error("TRACE_ME_NOW");`.
├─ Run the app. The system will crash violently and generate a beautiful, perfect, multi-layered stack trace pointing exactly to the file, line number, and caller sequence that led to that function.
└─ You just mapped the dependency tree in 5 seconds.

TECHNIQUE 3: THE PROXY MAN-IN-THE-MIDDLE
├─ If the alien system talks to a third-party API that is failing, do not trust the system's own logging of what it sent.
└─ Change the API URL to point to `localhost:8080`, spin up a local Netcat (`nc -l 8080`) or use `ngrok`/`Webhook.site`, and intercept the raw, unencrypted HTTP payload. You will often find the system is sending malformed XML when it claimed it was sending JSON.
```

## Part 4: Phase 3 - The State Inspection (Bisection)

```
You know the exact linear path the code takes. Now you must find the exact physical line where the data becomes mathematically corrupted.

THE BINARY ISOLATION PROTOCOL:
├─ You know the input payload is 100% correct at Step 1 (The Entry Point).
├─ You know the output is 100% corrupted or crashing at Step 10 (The Database Save).
├─ Do not check Step 2. Check the data exactly in the middle: at Step 5. Is it correct?
├─ If Yes, the mutation/bug occurred between Step 5 and 10.
├─ If No, the mutation/bug occurred between Step 1 and 5.
└─ Halve the remaining space again. Check Step 3 or Step 7. You will find the exact line that mutates the data incorrectly in O(log N) steps.
```

## Part 5: Anti-Patterns in Alien Debugging

```
Debugging unknown systems induces panic and frustration, leading to irrational, destructive behaviors.

ANTI-PATTERN 1: THE "GUESS AND CHECK" (Voodoo Programming)
├─ Symptom: The engineer changes a random variable from `true` to `false`, saves the file, and refreshes the browser to see if it magically fixed the bug.
└─ Cure: This is programming by random permutation. You will eventually "fix" it, but you will have absolutely no idea WHY it works, and you will have silently broken 3 other critical systems. You MUST formulate a mechanical hypothesis before changing code.

ANTI-PATTERN 2: FALLING DOWN THE RABBIT HOLE (Scope Creep)
├─ Symptom: You are looking for a simple UI rendering bug, but you notice the database connection pool logic looks highly inefficient, so you spend 3 hours refactoring the database driver.
└─ Cure: Stick strictly to the tracer bullet path. Ignore absolutely everything that is not on the direct critical path of the specific bug you are hunting. You are a sniper, not a janitor. Leave the cleanup for a separate Jira ticket.

ANTI-PATTERN 3: THE ARROGANT REWRITE
├─ Symptom: "This alien code is absolute garbage. I can't even read it. I'm just going to rewrite this entire 5,000-line module from scratch my way."
└─ Cure: You do not understand the historical constraints, the weird edge cases, or the bizarre enterprise requirements that forced the original author to write that "garbage." (Chesterton's Fence). If you rewrite it without fully mapping it, you will just introduce 10 new catastrophic bugs. Fix the exact bug surgically. Refactor later when you have tests.
```

## Part 6: The "It Works on My Machine" Syndrome

```
The most common and frustrating bug in an alien system is an environment disparity.

THE PHYSICS OF THE SYNDROME:
├─ If the code works locally but crashes in production, the code itself is mathematically sound. The bug is entirely in the state of the environment.
└─ Variables to isolate: Node/Python version differences, missing Environment Variables (`.env`), Database schema drift (missing a column locally), File System case-sensitivity (Mac vs Linux), or Network firewalls blocking outbound API calls in prod.

THE RESOLUTION:
├─ Do not change the code to fix an environment bug.
└─ Dump the environment variables (safely) in both systems and diff them mathematically. Ensure the Docker image tags match perfectly. Check the physical machine timezone settings (UTC vs Local).
```

## Part 7: The "Gremlin" Heuristic (Non-Deterministic Bugs)

```
Some bugs only happen 5% of the time. These are the hardest to debug.

THE 4 CAUSES OF NON-DETERMINISM:
1. Time: The code relies on the system clock or arbitrary `setTimeout` delays. (If the server is under load, the timeout expires before the data arrives).
2. Concurrency: Race conditions. Two threads or async functions are modifying the same variable at the exact same time without a lock.
3. Network: Unhandled API timeouts or dropped packets.
4. Randomness: Unseeded RNGs or unordered database queries (`SELECT * FROM users LIMIT 1` without an `ORDER BY` clause will return a random user depending on disk sectors).

THE CURE:
You must freeze time, lock concurrency, mock the network, and seed the RNG. Once the system is deterministic, the Gremlin becomes a standard bug.
```

## Part 8: Memory Leaks and Heap Analysis

```
In long-running alien processes (Node.js, JVM), the application might crash every 48 hours for seemingly no reason with an Out of Memory (OOM) error.

THE HEAP DUMP PROTOCOL:
├─ Do not guess what is leaking.
├─ Trigger a Heap Dump when memory is at 20% (Baseline).
├─ Trigger a Heap Dump when memory is at 90% (Saturated).
└─ Diff the two heap dumps using a profiler (like Chrome DevTools for V8). The delta will point exactly to the retained objects (e.g., an un-cleared array of websocket connections or event listeners that were never unmounted).
```

## Part 9: Deterministic-Cognitive-Infrastructure AI Execution Protocol (The Alien Interface)

```
When an AI operating within the Deterministic-Cognitive-Infrastructure framework is asked to debug a massive, alien codebase provided piecemeal by a human:

1. Demand the Stack Trace: Do not attempt to guess what is wrong based on a 50-line code snippet. Demand the exact error log and stack trace.
2. Demand the Trigger: Ask the user: "What exact input or curl command triggers this? Provide the JSON."
3. Guide the Human Tracer: Do not hallucinate fixes in code you cannot fully see. Provide the human user with exact `console.log` or debugger statements to physically insert into their local code, and ask them to report back the output. You are directing the human to act as your physical probe.
4. Declare Ignorance: If the context is missing, the AI MUST explicitly say: "I do not have enough context to mathematically guarantee a fix. Based on the snippet, my hypothesis is X, but you MUST log the value of `variable_Y` at line 42 to prove it before applying my patch."
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Self-Correction Protocol — Deterministic-Cognitive-Infrastructure](../cognitive-engines/self-correction.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)

<!-- DCI-RELATED-END -->
