# Resource Optimization System — Deterministic-Cognitive-Infrastructure

> **"Inefficiency is not just a cost; it is a limit on capability. A system that squanders CPU cycles, memory, bandwidth, or developer time will eventually collapse under its own weight. Optimization is the discipline of treating resources as finite and precious."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Resource Optimization System — Deterministic-Cognitive-Infrastructure
- **Path:** `references/advanced/resource-optimization.md`
- **Folder:** `advanced`
- **Document type:** Advanced operating system reference
- **Primary audience:** Agents handling complex, ambiguous, multi-agent, high-context, or optimization-heavy tasks.
- **Purpose:** Provide higher-order controls for collaboration, complexity, resource use, timing, and adaptation.
- **Standard used:** Operational excellence playbook plus systems-thinking reference structure.

## When to Use

Use when ordinary task execution is insufficient due to scale, ambiguity, coordination, or risk.

## Inputs

Task complexity, context load, constraints, collaborators, failure patterns, and optimization goals.

## Expected Outputs

Operating strategy, coordination model, risk controls, and optimization priorities.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Complexity driver is identified.
- [ ] Operating strategy is explicit.
- [ ] Coordination/risk boundary is defined.
- [ ] Optimization target is measurable.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Runnable Tooling

Use the folder-local toolkit for fast operational extraction:

```bash
node references/advanced/tools/advanced-toolkit.mjs list
node references/advanced/tools/advanced-toolkit.mjs brief "<task>"
node references/advanced/tools/advanced-toolkit.mjs gate "<task>"
```

Keep executable logic in `tools/`; keep this markdown as the operational reference and command map. Long scripts belong in versioned files, not embedded inside reference prose.


## Part 1: The Resource Hierarchy (What to Optimize)

```
Not all resources are equally scarce or expensive. Optimization must be prioritized based on the true cost of the resource, not just the technical elegance of the solution.

PRIORITY 1: DEVELOPER COGNITIVE CAPACITY (The Most Expensive Resource)
├─ Cost: Hundreds of dollars per hour, highly prone to fatigue and burnout.
├─ Optimization Target: Code readability, architectural simplicity, fast feedback loops (CI/CD), clear documentation.
├─ Anti-Pattern: Writing a highly clever, "optimized" one-liner that takes the next developer 4 hours to decipher.
└─ Rule: Optimize for human reading speed before CPU execution speed, UNLESS it is in a mathematically proven hot-path.

PRIORITY 2: SYSTEM RELIABILITY / UPTIME (The Existential Resource)
├─ Cost: Thousands of dollars per minute of downtime, permanent loss of user trust.
├─ Optimization Target: Redundancy, failovers, circuit breakers, graceful degradation.
├─ Anti-Pattern: Removing error handling or retry logic to make the code run 5ms faster.
└─ Rule: Never trade reliability for speed. A fast system that crashes is useless.

PRIORITY 3: I/O AND NETWORK LATENCY (The Slowest Resource)
├─ Cost: Milliseconds to seconds per operation (orders of magnitude slower than CPU).
├─ Optimization Target: Database queries (N+1), network payloads (over-fetching), asset sizes.
├─ Anti-Pattern: Optimizing a JavaScript loop while ignoring that the page makes 45 sequential database queries.
└─ Rule: The fastest network request is the one you don't make. Cache, batch, and compress.

PRIORITY 4: MEMORY (The Finite Resource)
├─ Cost: Out-of-Memory (OOM) crashes, unpredictable Garbage Collection pauses.
├─ Optimization Target: Object allocation in loops, loading massive datasets into memory at once, memory leaks (unclosed connections, lingering event listeners).
├─ Anti-Pattern: Loading a 2GB log file into a single string variable instead of streaming it.
└─ Rule: Stream data whenever possible. Keep the memory footprint flat regardless of data size.

PRIORITY 5: CPU CYCLES (The Cheapest Resource)
├─ Cost: Nanoseconds to microseconds. Compute is incredibly cheap and scales easily.
├─ Optimization Target: Complex algorithms (O(N^2) vs O(N log N)), tight inner loops, cryptographic hashing.
├─ Anti-Pattern: Pre-optimizing a simple data transformation that runs once a day on a 100-item array.
└─ Rule: Only optimize CPU usage when a profiler definitively proves it is the bottleneck.
```

## Part 2: The Optimization Protocol (How to Optimize)

```
Do not guess what is slow. Do not guess what uses memory. Human intuition about system performance is notoriously, disastrously wrong. Follow the protocol.

STEP 1: ESTABLISH THE BASELINE (Measurement)
├─ Action: Measure the current performance under realistic load BEFORE making any changes.
├─ Tools: Profilers, tracing (Datadog/Honeycomb), APM, Chrome DevTools, `time` command.
└─ Metric: Define the exact metric you are tracking (e.g., P99 latency, heap size, bundle size).

STEP 2: IDENTIFY THE BOTTLENECK (Targeting)
├─ Action: Find the single component responsible for the largest percentage of the delay or resource usage.
├─ The Pareto Principle: 80% of the execution time is usually spent in 20% of the code (the "hot path").
└─ Rule: Optimizing anything outside the bottleneck is a waste of time. Making a 5ms operation take 1ms is useless if the database query takes 2000ms.

STEP 3: FORMULATE A HYPOTHESIS (Planning)
├─ Action: "If I add an index to the `user_id` column, the query time will drop from 500ms to < 10ms."
└─ Action: "If I switch from `.map()` to a classic `for` loop here, CPU usage will drop by 15%."

STEP 4: IMPLEMENT AND ISOLATE (Execution)
├─ Action: Apply the optimization. Do not change ANY other logic or features simultaneously.
└─ Rule: An optimization commit should contain ONLY the optimization.

STEP 5: VERIFY THE DELTA (Validation)
├─ Action: Measure the performance again using the exact same test from Step 1.
├─ Did it improve? By how much? Did it meet the hypothesis?
├─ Did it regress something else? (e.g., CPU went down, but Memory went up).
└─ Rule: If the optimization makes the code harder to read but only yields a 2% improvement, REVERT IT. The cognitive cost outweighs the technical benefit.
```

## Part 3: Algorithmic & Architectural Optimization Patterns

### 3.1 Big O Notation (Time Complexity)
```
You must understand how your code scales as the input data (N) grows.

├─ O(1) - Constant Time: Hash map lookups, array index access. (The holy grail. Does not scale with data).
├─ O(log N) - Logarithmic Time: Binary search, tree traversal. (Excellent. Scales beautifully to millions of records).
├─ O(N) - Linear Time: Iterating through an array once. (Acceptable. Scales directly with data size).
├─ O(N log N) - Linearithmic Time: Efficient sorting algorithms (Merge Sort, Quick Sort). (The theoretical limit for sorting).
├─ O(N^2) - Quadratic Time: Nested loops iterating over the same data. (DANGER. Works fine for 100 items, crashes the server for 100,000 items).
└─ O(2^N) - Exponential Time: Naive recursive algorithms (e.g., naive Fibonacci). (CATASTROPHIC. Will halt the universe for small inputs).

THE OPTIMIZATION HEURISTIC:
If you see a nested loop (`for` inside a `for`), you have an O(N^2) algorithm. Can you convert the inner loop into a Hash Map lookup? If yes, you just reduced the complexity to O(N). This is the single most common and effective algorithmic optimization in software engineering.
```

### 3.2 The Caching Hierarchy
```
The fastest way to do something is to not do it at all. Caching stores the result of an expensive operation so it can be reused cheaply.

LEVEL 1: IN-MEMORY CACHE (Variables, LRU Cache)
├─ Speed: Nanoseconds.
├─ Scope: Local to the specific application instance/process.
└─ Use Case: Memoizing expensive function calls, storing static configuration.

LEVEL 2: DISTRIBUTED CACHE (Redis, Memcached)
├─ Speed: Milliseconds.
├─ Scope: Shared across all instances of the application.
└─ Use Case: User sessions, frequent database query results, rate limiting counters.

LEVEL 3: CDN / EDGE CACHE (Cloudflare, CloudFront)
├─ Speed: Tens of Milliseconds (served geographically close to the user).
├─ Scope: Global.
└─ Use Case: Static assets (images, CSS, JS), completely static HTML pages.

THE CACHE INVALIDATION PROBLEM:
"There are only two hard things in Computer Science: cache invalidation and naming things."
├─ Time-To-Live (TTL): The data expires after X seconds. (Simple, but data might be stale).
├─ Event-Driven Invalidation: When the database updates, publish an event to clear the cache. (Complex, but ensures fresh data).
└─ Rule: Never implement a cache without implementing its exact invalidation strategy first.
```

### 3.3 Database Query Optimization
```
The database is almost always the bottleneck in a standard web application.

PATTERN 1: THE N+1 QUERY PROBLEM
├─ Symptom: Fetching a list of 100 posts, then running a separate query in a loop to fetch the author for each post (101 queries total).
├─ Solution: Use `JOIN`s, or use a tool like DataLoader (GraphQL) or `Eager Loading` (ORMs) to fetch all authors in a single secondary query (2 queries total).

PATTERN 2: MISSING INDEXES
├─ Symptom: Queries checking `WHERE email = '...'` take seconds as the table grows. The DB is doing a "Full Table Scan".
├─ Solution: Add a B-Tree index to the `email` column. The query now takes milliseconds (O(log N) lookup).
└─ Warning: Indexes speed up READS, but slow down WRITES (because the index must be updated). Do not index every column.

PATTERN 3: OVER-FETCHING
├─ Symptom: `SELECT * FROM users` when you only need the user's name. You are pulling megabytes of unused data across the network and filling up memory.
├─ Solution: `SELECT id, name FROM users`. Only fetch exactly what you need.
```

### 3.4 Memory Management & Streaming
```
Memory is bounded. If you exceed it, the process dies instantly.

PATTERN 1: BATCH PROCESSING (Pagination)
├─ Anti-Pattern: `users = db.getAllUsers()` -> Tries to load 1,000,000 users into a single array. OOM crash.
├─ Solution: Fetch users in chunks (limit 1000, offset N). Process the chunk, release it, fetch the next chunk.

PATTERN 2: STREAMING (Pipelines)
├─ Anti-Pattern: Reading a 5GB CSV file using `fs.readFileSync()`. Node.js process crashes.
├─ Solution: Use Streams (`fs.createReadStream()`). Pipe the data through a transform stream (parsing CSV lines) into a write stream (inserting into DB). Memory usage stays flat at ~50MB regardless of file size.

PATTERN 3: AVOIDING MEMORY LEAKS
├─ Concept: The Garbage Collector frees memory when an object has no more references pointing to it.
├─ Common Leaks:
│  ├─ Uncleared `setInterval()` timers.
│  ├─ Event listeners added but never removed (`emitter.on()` without `emitter.off()`).
│  └─ Storing data in a global array/object that grows infinitely.
```

## Part 4: Frontend-Specific Optimizations

```
Frontend performance is unique because it happens on the user's device, which you do not control. You must optimize for the weakest mobile device on the slowest 3G network.

OPTIMIZATION 1: BUNDLE SIZE (Network Transfer)
├─ Problem: Shipping a 5MB JavaScript bundle means the user stares at a blank screen for 10 seconds.
├─ Solution 1: Tree-Shaking. Ensure your bundler removes unused code.
├─ Solution 2: Code Splitting. Do not load the code for the "Settings" page until the user actually navigates to the "Settings" page.
└─ Solution 3: Dependency Auditing. Do you really need the entire `lodash` library, or just one function? Do you really need `moment.js` (massive), or can you use `date-fns` or native `Intl`?

OPTIMIZATION 2: THE CRITICAL RENDERING PATH
├─ Problem: The browser cannot draw the page until certain resources block the main thread.
├─ Solution: Inline critical CSS. Defer non-critical JavaScript (`<script defer>`). Load fonts asynchronously.

OPTIMIZATION 3: RENDERING PERFORMANCE (Frames Per Second)
├─ Problem: The page stutters when scrolling or animating.
├─ Cause: JavaScript is executing heavy logic on the Main Thread, blocking the browser from painting the screen (which must happen every 16ms to achieve 60fps).
├─ Solution 1: Debounce/Throttle scroll and resize event listeners.
├─ Solution 2: Move heavy computation to Web Workers (background threads).
└─ Solution 3: Use CSS transforms (`transform: translate`) for animation instead of altering layout properties (`margin`, `top`), as transforms are GPU-accelerated.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Advanced Reference Index](../advanced/INDEX.md)
- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Workflows Reference Index](../workflows/INDEX.md)
- [API Design Workflow — Deterministic-Cognitive-Infrastructure](../workflows/api-design.md)

<!-- DCI-RELATED-END -->
