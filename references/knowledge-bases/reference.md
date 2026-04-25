# Extended Reference — APEX Framework

> **"The depth of your reference determines the ceiling of your output."**

## Part 1: Evidence Hierarchy

```
TIER 1: MATHEMATICAL PROOF (Highest certainty)
├─ Formal verification, type system guarantees, logical proofs
├─ Example: "This function is pure — no side effects by construction"
├─ Confidence: 99%+
└─ When available: Algorithm correctness, type safety

TIER 2: EMPIRICAL OBSERVATION (High certainty)
├─ Direct observation of runtime behavior, test results, benchmarks
├─ Example: "Test suite passes with 100% coverage on all branches"
├─ Confidence: 90-99%
└─ When available: Testing, debugging, performance analysis

TIER 3: DOCUMENTED SPECIFICATION (Good certainty)
├─ Official docs, RFCs, language specs, API contracts
├─ Example: "RFC 7231 section 6.5.1 defines 400 status code as..."
├─ Confidence: 80-95%
└─ Caveat: Docs can be outdated or wrong. Cross-reference with T2.

TIER 4: EXPERT CONSENSUS (Moderate certainty)
├─ Established best practices, widely-accepted patterns
├─ Example: "OWASP top 10 recommends parameterized queries"
├─ Confidence: 70-85%
└─ Caveat: Consensus can be wrong. Context matters.

TIER 5: COMMUNITY KNOWLEDGE (Lower certainty)
├─ Stack Overflow answers, blog posts, tutorials, conference talks
├─ Example: "This SO answer with 500 upvotes suggests..."
├─ Confidence: 50-75%
└─ Caveat: Popularity ≠ correctness. Verify independently.

TIER 6: REASONING BY ANALOGY (Lowest certainty)
├─ "Similar systems do X, so this should too"
├─ Example: "Redis handles this pattern well, so this cache might too"
├─ Confidence: 30-60%
└─ Caveat: Analogies break. Use as starting point, not conclusion.

RULE: Always cite your evidence tier. Never present T5 evidence with T1 confidence.
```

## Part 2: Domain-Specific Reference Indices

### Software Architecture Patterns
```
CREATIONAL: Factory, Builder, Singleton, Prototype, Pool
STRUCTURAL: Adapter, Bridge, Composite, Decorator, Facade, Proxy, Flyweight
BEHAVIORAL: Chain, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template, Visitor
ARCHITECTURAL: MVC, MVP, MVVM, Clean Architecture, Hexagonal, CQRS, Event Sourcing, Saga, Sidecar
DISTRIBUTED: Circuit Breaker, Bulkhead, Retry, Timeout, Rate Limiter, Service Mesh, API Gateway
DATA: Repository, Unit of Work, Data Mapper, Active Record, Identity Map, Lazy Loading, Specification
MESSAGING: Pub/Sub, Message Queue, Event Bus, Dead Letter Queue, Competing Consumers, Message Router
DEPLOYMENT: Blue/Green, Canary, Rolling, Feature Flag, A/B Testing, Dark Launch
```

### Security Reference
```
OWASP TOP 10 (2021):
├─ A01: Broken Access Control → Enforce least privilege, deny by default
├─ A02: Cryptographic Failures → Use strong encryption, protect data at rest/transit
├─ A03: Injection → Parameterized queries, input validation, output encoding
├─ A04: Insecure Design → Threat modeling, secure design patterns, abuse cases
├─ A05: Security Misconfiguration → Hardened defaults, no defaults in production
├─ A06: Vulnerable Components → SCA scanning, dependency updates, SBOM
├─ A07: Authentication Failures → MFA, rate limiting, credential rotation
├─ A08: Software/Data Integrity → Signed pipelines, integrity checks, SLSA
├─ A09: Logging/Monitoring Failures → Audit logs, anomaly detection, alerting
└─ A10: SSRF → URL validation, allowlists, network segmentation

ADDITIONAL THREATS:
├─ Supply chain attacks → Pin dependencies, verify checksums
├─ Timing attacks → Constant-time comparisons
├─ Race conditions → Proper locking, atomic operations
├─ Information leakage → Minimal error messages, no stack traces in production
├─ Privilege escalation → Principle of least privilege throughout
└─ Denial of service → Rate limiting, resource quotas, input size limits
```

### Performance Reference
```
LATENCY NUMBERS EVERY PROGRAMMER SHOULD KNOW:
├─ L1 cache reference: ~1 ns
├─ Branch mispredict: ~3 ns
├─ L2 cache reference: ~4 ns
├─ Mutex lock/unlock: ~17 ns
├─ Main memory reference: ~100 ns
├─ Compress 1KB (Snappy): ~3,000 ns
├─ Send 2KB over 1 Gbps: ~20,000 ns
├─ Read 1MB from memory: ~250,000 ns
├─ Round trip in datacenter: ~500,000 ns
├─ Read 1MB from SSD: ~1,000,000 ns
├─ Disk seek: ~10,000,000 ns
├─ Read 1MB from disk: ~20,000,000 ns
├─ Send packet CA→NL→CA: ~150,000,000 ns
└─ Note: These are approximate and vary by hardware generation

OPTIMIZATION PRIORITIES (in order):
├─ 1. Algorithmic complexity (O(n) vs O(n²) matters more than anything)
├─ 2. I/O reduction (fewer network/disk calls)
├─ 3. Caching (don't recompute what you can store)
├─ 4. Batching (amortize overhead across multiple operations)
├─ 5. Parallelism (use all available cores/connections)
├─ 6. Data structure choice (hash map vs tree vs array for your access pattern)
├─ 7. Memory layout (cache-friendly data structures)
└─ 8. Micro-optimizations (only after profiling proves the bottleneck)
```

### Complexity Analysis Reference
```
TIME COMPLEXITIES (Common operations):
O(1)      → Hash lookup, array index, stack push/pop
O(log n)  → Binary search, balanced BST lookup, skip list
O(n)      → Linear search, single pass, array copy
O(n lg n) → Merge sort, heap sort, efficient sorting
O(n²)     → Bubble sort, nested loops, naive string matching
O(n³)     → Matrix multiplication (naive), Floyd-Warshall
O(2^n)    → Power set, naive recursive Fibonacci, subset enumeration
O(n!)     → Permutations, brute-force TSP

SPACE COMPLEXITIES:
├─ In-place: O(1) extra space (swap-based)
├─ Linear: O(n) extra space (copy, hash set)
├─ Quadratic: O(n²) extra space (adjacency matrix)
└─ RULE: Memory is cheap but not free. Consider working set vs total allocation.
```

## Part 3: Code Quality Standards

```
NAMING:
├─ Variables: descriptive, contextual (userCount, not n)
├─ Functions: verb + noun (calculateTotal, not calc)
├─ Classes: noun (UserRepository, not UserHelper)
├─ Constants: SCREAMING_SNAKE_CASE (MAX_RETRY_COUNT)
├─ Booleans: question form (isActive, hasPermission, canRetry)
└─ Avoid: temp, data, info, handler, manager, processor (too vague)

FUNCTION DESIGN:
├─ Single responsibility (one reason to change)
├─ Pure when possible (same input → same output, no side effects)
├─ Small (aim for <20 lines, hard limit at 50)
├─ Few parameters (≤3 positional, use options object for more)
├─ Return early (guard clauses at top, avoid deep nesting)
├─ Fail explicitly (throw/return error, never silently swallow)
└─ Document the WHY, not the WHAT (code shows what, comments show why)

ERROR HANDLING:
├─ Use the type system (Result<T,E>, Optional<T>, Either<L,R>)
├─ Fail fast: detect and report at the earliest point
├─ Never catch and ignore: log, handle, or propagate
├─ Typed errors: different error types for different failure modes
├─ Retry with backoff: exponential backoff with jitter for transient failures
├─ Circuit breaker: stop calling failing services
└─ Graceful degradation: serve reduced functionality rather than crash
```

## Part 4: Problem Classification Taxonomy

```
TYPE 1: DIAGNOSTIC (Something is broken)
├─ Subtype A: Crash/Error → Read error, reproduce, trace, fix
├─ Subtype B: Wrong Output → Compare expected vs actual, find divergence
├─ Subtype C: Performance → Profile, find bottleneck, optimize
├─ Subtype D: Intermittent → Race condition, resource, timing → add logging
└─ Workflow: Bug Fix or Debugging Unknown

TYPE 2: CONSTRUCTIVE (Something needs to be built)
├─ Subtype A: Greenfield → From scratch, full architecture decisions
├─ Subtype B: Feature Addition → Extend existing system
├─ Subtype C: Integration → Connect two systems
├─ Subtype D: Prototype → Exploratory, throwaway allowed
└─ Workflow: New Feature or Greenfield

TYPE 3: TRANSFORMATIVE (Something needs to change)
├─ Subtype A: Refactoring → Same behavior, better structure
├─ Subtype B: Migration → Same function, different platform
├─ Subtype C: Optimization → Same function, better performance
├─ Subtype D: Modernization → Update to current standards
└─ Workflow: Refactoring, Migration, or Performance

TYPE 4: EVALUATIVE (Something needs assessment)
├─ Subtype A: Code Review → Assess someone else's work
├─ Subtype B: Security Audit → Find vulnerabilities
├─ Subtype C: Architecture Review → Assess system design
├─ Subtype D: Technology Evaluation → Compare options
└─ Workflow: Code Review, Security Audit, or Research Spike

TYPE 5: STRATEGIC (Direction needs deciding)
├─ Subtype A: Technology Choice → Which tool/framework/language
├─ Subtype B: Architecture Decision → How to structure the system
├─ Subtype C: Prioritization → What to build next
├─ Subtype D: Trade-off Resolution → Conflicting goals
└─ Workflow: Architecture Design or Research Spike
```

## Part 5: Reasoning Pattern Library

### Pattern 1: Divide and Conquer
```
WHEN: Problem is too large to solve directly
HOW:
1. Decompose into independent sub-problems
2. Solve each sub-problem
3. Combine solutions
WATCH OUT: Sub-problems may not be truly independent
```

### Pattern 2: Reduction
```
WHEN: Problem looks unique but might map to a known problem
HOW:
1. Abstract away domain-specific details
2. Identify the underlying structure
3. Search for known solutions to that structure
4. Adapt the known solution back to your domain
WATCH OUT: The mapping may not be perfect
```

### Pattern 3: Constraint Propagation
```
WHEN: Multiple constraints must be satisfied simultaneously
HOW:
1. List all constraints
2. Start with the tightest constraint
3. Each constraint eliminates options
4. Propagate: applying one constraint may tighten others
5. Solution emerges from intersection of all constraints
WATCH OUT: Over-constrained problems have no solution — relax a constraint
```

### Pattern 4: Working Backward
```
WHEN: You know what the output should be but not how to get there
HOW:
1. Start from the desired end state
2. Ask: "What must be true immediately before this?"
3. Repeat: "What must be true before THAT?"
4. Continue until you reach the current state
5. Reverse the chain: current → step 1 → step 2 → ... → goal
WATCH OUT: Multiple valid paths may exist — explore alternatives
```

### Pattern 5: Hypothesis-Driven
```
WHEN: The cause is unknown (debugging, investigation)
HOW:
1. Observe the symptoms
2. Generate multiple hypotheses (minimum 3)
3. For each: design a test that distinguishes it from others
4. Run tests, eliminate hypotheses
5. Strongest surviving hypothesis = working theory
WATCH OUT: Don't fall in love with your first hypothesis
```

### Pattern 6: Iterative Refinement
```
WHEN: Perfect solution unknown upfront
HOW:
1. Build the simplest version that could work
2. Evaluate: does it meet the requirements?
3. If NO: identify the biggest gap
4. Improve the biggest gap
5. Repeat from step 2
WATCH OUT: Know when to stop iterating (diminishing returns)
```

## Part 6: Estimation Reference

```
SOFTWARE ESTIMATION HEURISTICS:

1. REFERENCE CLASS FORECASTING
   "How long did similar tasks ACTUALLY take in the past?"
   ├─ Find 3+ comparable past tasks
   ├─ Use the average as your estimate
   ├─ This is more accurate than bottom-up estimation
   └─ If no comparable tasks: your estimate is unreliable (say so)

2. PLANNING POKER CALIBRATION
   ├─ 1 point = trivial (< 30 min)
   ├─ 2 points = simple (30 min - 2 hours)
   ├─ 3 points = moderate (2-4 hours)
   ├─ 5 points = complex (4-8 hours)
   ├─ 8 points = very complex (1-2 days)
   ├─ 13 points = massive (2-5 days → should be broken down)
   └─ 21+ points = epic (1+ week → MUST be broken down)

3. MULTIPLICATION FACTORS
   ├─ "How long will this take?" × 2 = likely actual time
   ├─ New technology? × 3
   ├─ Team coordination needed? × 1.5
   ├─ External dependency? × 2
   └─ First time doing this? × 3

4. CONE OF UNCERTAINTY
   ├─ Initial concept: 0.25x to 4x actual
   ├─ Approved product definition: 0.5x to 2x actual
   ├─ Requirements complete: 0.67x to 1.5x actual
   ├─ UI design complete: 0.8x to 1.25x actual
   └─ Detailed design complete: 0.9x to 1.1x actual
```
