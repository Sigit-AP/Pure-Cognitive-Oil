# Intelligent Search Strategy — Deterministic-Cognitive-Infrastructure

> **"The quality of your answer is bounded by the quality of your search. Garbage in, garbage out."**

## Part 1: The 6-Level Search Hierarchy

### Level 1: Local Project Search (Fastest, Highest Trust)
```
TOOLS:
├─ grep/ripgrep → Find text patterns in code
├─ find/glob → Find files by name pattern
├─ Read tool → Read specific files (ALWAYS read, NEVER assume content)
├─ ls/dir → Explore directory structure
├─ AST tools → Find structural patterns (function definitions, imports)

STRATEGY:
├─ Start specific, broaden if no results
├─ Read FULL context of any match (not just the matching line)
├─ When reading code: read the WHOLE function, not just the relevant line
├─ Cross-reference: if you find X, also search for who calls X
├─ Check: imports, exports, configs that reference this code
└─ Search both the name AND common misspellings/aliases

SEARCH PATTERNS BY INTENT:
├─ "Where is X defined?" → grep for "function X\|class X\|const X\|def X"
├─ "Who calls X?" → grep for "X(" or "X." — read each caller's context
├─ "Where is X configured?" → search config files, env files, constants
├─ "What does X depend on?" → read X's imports and referenced modules
├─ "What depends on X?" → grep for import/require of X's module
├─ "When did X change?" → git log --follow -p path/to/X
└─ "Why was X written this way?" → git blame, then read commit message and PR

COMMON SEARCH MISTAKES:
├─ ❌ Searching from memory instead of actually searching
├─ ❌ Reading only the matching line instead of full context
├─ ❌ Not searching for callers after finding the definition
├─ ❌ Assuming the first match is the only one
├─ ❌ Not checking test files (tests document behavior)
└─ ❌ Not checking config files (behavior often controlled by config)
```

### Level 2: Local Documentation
```
PRIORITY ORDER:
├─ README.md → Project overview, setup, conventions
├─ docs/ directory → Detailed documentation
├─ API docs (if generated) → Endpoint/function reference
├─ Comments in code → Inline documentation (WHY, not WHAT)
├─ Config files → Behavior documentation (what settings exist)
├─ Test files → Behavior specification (tests ARE documentation)
├─ Commit messages → Change rationale and context
├─ PR/MR descriptions → Design decisions and trade-offs
├─ CHANGELOG.md → Version history and breaking changes
└─ .env.example → Environment variable documentation

DOCUMENTATION TRUST LEVELS:
├─ Code behavior (run it) → HIGHEST trust (code doesn't lie)
├─ Test assertions → HIGH trust (verified behavior)
├─ Comments near code → MEDIUM trust (may be outdated)
├─ README → MEDIUM trust (often lags behind code)
├─ Wiki/confluence → LOW trust (frequently outdated)
└─ RULE: When docs contradict code, CODE IS TRUTH
```

### Level 3: Version Control History
```
TOOLS AND TECHNIQUES:
├─ git log --oneline -20 → Recent activity overview
├─ git log --all --oneline --graph → Branch structure
├─ git diff → What changed since last commit
├─ git diff HEAD~5 → What changed in last 5 commits
├─ git blame <file> → Who changed what and when
├─ git log -p --follow <file> → Full history of a file (including renames)
├─ git log --author="name" → Changes by specific person
├─ git log --since="2 weeks ago" → Recent changes
├─ git bisect → Binary search for the commit that introduced a bug
├─ git stash list → Check for stashed changes
└─ git reflog → Recovery of lost commits

WHAT TO LEARN FROM HISTORY:
├─ Why was this code written? (commit message context)
├─ Who knows this code best? (most frequent author)
├─ When was this last touched? (staleness indicator)
├─ What was the original intent? (first commit of this code)
├─ Has this been a problem area? (many changes = instability)
├─ Was there a related fix that might be relevant? (nearby commits)
└─ Is there a pattern of bugs here? (regression history)

GIT HISTORY ANTI-PATTERNS:
├─ ❌ Not checking git history at all (missing crucial context)
├─ ❌ Checking only recent commits (missing original intent)
├─ ❌ Ignoring merge commits (may contain important context)
├─ ❌ Not using git blame (missing per-line attribution)
└─ ❌ Not following renames (git log --follow is essential)
```

### Level 4: External Documentation
```
PRIORITY ORDER:
├─ Official documentation → Authoritative, version-specific
│   ├─ Check the VERSION of docs matches your version
│   ├─ Check the DATE (may be outdated even if official)
│   ├─ Read the "Limitations" and "Known Issues" sections
│   └─ Read the migration guides (reveal breaking changes)
├─ GitHub/GitLab source code → Ground truth for OSS
│   ├─ Read the actual source when docs are ambiguous
│   ├─ Check the issue tracker for known bugs
│   ├─ Check recent PRs for upcoming changes
│   └─ Read the test suite for intended behavior
├─ API reference → Endpoint behavior, limits, errors
│   ├─ Check rate limits
│   ├─ Check authentication requirements
│   ├─ Check error response formats
│   └─ Check deprecation notices
├─ Package registry (npm, PyPI, crates.io) → Version info
│   ├─ Check latest version vs your version
│   ├─ Check download counts (popularity indicator)
│   ├─ Check last publish date (maintenance indicator)
│   └─ Check dependency count (complexity indicator)
└─ Standards/RFCs → Protocol-level behavior
    ├─ HTTP: RFC 7230-7235, RFC 9110
    ├─ JSON: RFC 8259
    ├─ JWT: RFC 7519
    └─ Always cite the specific section number
```

### Level 5: Community Knowledge
```
SOURCES BY RELIABILITY (descending):
├─ Stack Overflow (accepted + high-vote answers) → 70% reliable
│   ├─ CHECK: When was the answer written? (older = less reliable)
│   ├─ CHECK: What version does it reference? (may be outdated)
│   ├─ CHECK: Are there comments correcting the answer?
│   └─ NEVER copy-paste without understanding
├─ GitHub Issues/Discussions → 65% reliable
│   ├─ Often contains workarounds for known bugs
│   ├─ Check if the issue is closed/resolved
│   └─ Read the entire thread (resolution may be at the bottom)
├─ Blog posts / tutorials → 50% reliable
│   ├─ CHECK: Author credentials
│   ├─ CHECK: Date published (>1 year = questionable)
│   ├─ CHECK: Does the code actually work? (many don't)
│   └─ TREAT as starting point, not truth
├─ Social media (Twitter, Reddit) → 30% reliable
│   ├─ Latest developments and opinions
│   ├─ Very low signal-to-noise ratio
│   └─ Good for discovering what exists, not for learning how it works
└─ AI-generated content (ChatGPT answers, Copilot) → 20% reliable
    ├─ May hallucinate APIs, functions, or behaviors
    ├─ May mix information from different versions
    ├─ ALWAYS verify against official sources
    └─ NEVER treat as authoritative

RELIABILITY RANKING:
Official docs > Source code > GitHub Issues > SO answers > Blog posts > Social > AI
```

### Level 6: Human Partner
```
WHEN TO ASK:
├─ After exhausting levels 1-5 (never ask first)
├─ For domain knowledge not in the codebase
├─ For architectural decisions not documented
├─ For priority/trade-off decisions
├─ For access to resources you can't reach
├─ When requirements are genuinely ambiguous
└─ When you've been stuck >30 minutes with no progress

HOW TO ASK:
├─ One question at a time (not a list of 5)
├─ Provide context: "I was trying to [X]. I found [Y]. I'm stuck because [Z]."
├─ Show what you already know: "I checked [A], [B], and [C]."
├─ Propose options: "I think it's either [X] or [Y]. My reasoning for X is..."
├─ Be specific: "Does the auth middleware run before or after rate limiting?"
│   NOT: "How does auth work?"
└─ Respect time: Bundle related questions if you have multiple

NEVER:
├─ ❌ Ask something you could find by reading the code
├─ ❌ Ask open-ended questions ("How does this work?")
├─ ❌ Ask without showing your research effort
├─ ❌ Ask the same question twice
└─ ❌ Ask during a clearly inappropriate time
```

## Part 2: Search Strategy by Task Type

```
DEBUGGING:
├─ 1. Read the error message completely (every word)
├─ 2. Search codebase for the error message text
├─ 3. Read the function that generates the error
├─ 4. Trace the call chain that reaches the error
├─ 5. Check git blame for recent changes near the error
├─ 6. Search issues/PRs for the error message
└─ 7. If still stuck: add logging and reproduce

UNDERSTANDING CODE:
├─ 1. Read the file header/module docs
├─ 2. Read the public API (exports/interface)
├─ 3. Read the main function/entry point
├─ 4. Read helper functions as needed
├─ 5. Read tests for this module
├─ 6. Read callers of this module
└─ 7. Read git history for evolution context

CHOOSING A LIBRARY:
├─ 1. Define criteria (what MUST it do?)
├─ 2. Search npm/PyPI/crates for candidates
├─ 3. Compare: stars, downloads, last update, issue count
├─ 4. Read README and docs for each candidate
├─ 5. Check: license compatibility
├─ 6. Check: bundle size / dependency count
├─ 7. Build a minimal proof of concept with the top candidate
├─ 8. Check: can you read the source code? Is it maintainable?
└─ 9. Decision: Does it actually solve your specific problem?

VERIFYING A CLAIM:
├─ 1. Identify the specific claim
├─ 2. Find the authoritative source for that claim
├─ 3. Read the source directly (not someone's interpretation)
├─ 4. Check the version/date of the source
├─ 5. Look for contradicting information
└─ 6. If claim is about behavior: RUN THE CODE and observe
```

## Part 3: Search Anti-Patterns

```
ANTI-PATTERN 1: MEMORY SEARCH
"I remember this function takes 3 arguments"
FIX: Open the file. Read the function signature. Now.

ANTI-PATTERN 2: TUNNEL VISION
Searching only where you expect to find the answer
FIX: Broaden systematically. Check adjacent modules, configs, tests.

ANTI-PATTERN 3: PREMATURE SATISFACTION
Finding one result and stopping
FIX: Continue searching for at least 30 seconds after first hit.

ANTI-PATTERN 4: VERSION BLINDNESS
Reading docs for a different version than what you're using
FIX: Always verify: your version ↔ doc version.

ANTI-PATTERN 5: SURFACE READING
Skimming search results instead of reading them
FIX: Read the full context. The devil is in the details.

ANTI-PATTERN 6: AUTHORITY BIAS
Accepting an answer because the source seems authoritative
FIX: Verify against the actual code/behavior regardless of source.

ANTI-PATTERN 7: RECENCY BIAS
Only searching recent results, ignoring foundational docs
FIX: Sometimes the original RFC/spec is the best answer.

ANTI-PATTERN 8: COPY-PASTE SEARCH
Finding code and copying without understanding
FIX: Understand every line before using it. If you can't explain it, don't use it.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Agentic Auto Runtime — Deterministic-Cognitive-Infrastructure](../advanced/agentic-auto-runtime.md)
- [Cognitive Load Management — Deterministic-Cognitive-Infrastructure](../advanced/cognitive-load.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)

<!-- DCI-RELATED-END -->
