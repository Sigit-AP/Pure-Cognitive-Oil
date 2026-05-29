# Research Spike Workflow — Pure Cognitive Oil

> **"A spike is not a prototype. A prototype is built to be kept. A spike is a disposable mathematical probe fired into the darkness of an unknown technology to map its exact constraints, physical limitations, and failure modes before committing architectural capital. The code of a spike is worthless; the knowledge is priceless. If you merge spike code into production, you are committing architectural sabotage."**


<!-- PCO-DOC-STANDARD-START -->

## Overview

This document is part of the Pure Cognitive Oil reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Research Spike Workflow — Pure Cognitive Oil
- **Path:** `references/workflows/research-spike.md`
- **Folder:** `workflows`
- **Document type:** Workflow runbook
- **Primary audience:** Agents executing software engineering tasks and reviewers auditing their work.
- **Purpose:** Translate PCO principles into step-by-step execution for a specific task class.
- **Standard used:** Runbook/SOP format with task, procedure, verification, and handoff sections.

## When to Use

Use when a user request matches the workflow domain or when routing selects this file.

## Inputs

Task scope, repo context, affected files, constraints, tests, risks, and acceptance criteria.

## Expected Outputs

Plan, implementation path, validation evidence, rollback notes, and final report.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related PCO references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Entry condition is clear.
- [ ] Procedure is ordered.
- [ ] Verification command or evidence is defined.
- [ ] Final handoff/reporting criteria are explicit.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve PCO-specific terminology while keeping examples readable for non-PCO maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- PCO-DOC-STANDARD-END -->

## Part 1: The Epistemology of the Spike

```
In agile software development, a "Spike" is a strictly time-boxed investigation used to reduce risk, eliminate uncertainty, or gather critical information when a user story or architectural decision is too ambiguous to estimate or implement safely.

THE THREE INVIOLABLE RULES OF A SPIKE:
1. Time-Boxed: A spike must have a strict, unbreakable, physical time limit (e.g., 4 hours, 2 days). When the timer ends, the spike ends, regardless of the state of the code. If you did not find the answer, the answer is "We don't know yet, and it's too risky."
2. Disposable: The code written during a spike MUST be thrown away. It is written with zero tests, zero architecture, zero linting, and maximum velocity. It is a biological hazard. It must never reach the `main` branch.
3. Question-Driven: A spike does not have a "feature" goal. It does not produce a "deliverable" feature. It has a specific, mathematically testable question it must answer.

THE DIFFERENCE BETWEEN A SPIKE AND A PROTOTYPE:
├─ Prototype: Built to show the human user or stakeholder "what it will look like." Tends to evolve into the final product (which is dangerous, but common). Focuses on the UI and the "Happy Path".
└─ Spike: Built to show the engineer "where it will physically break." Designed to be completely discarded. Focuses entirely on constraints, edge cases, and the "Sad Path".
```

## Part 2: Types of Research Spikes

```
Not all unknowns are the same. You must classify the spike before writing a single line of code to ensure you are answering the right question.

TYPE 1: THE FEASIBILITY SPIKE (The "Can We Do It at All?")
├─ Goal: To determine if a specific technology, API, or algorithm can actually achieve the required business outcome under real-world physics.
├─ Example: "Can we use WebRTC to stream 4K video from a low-power Raspberry Pi 4 to a Chrome browser with under 100ms latency?"
└─ Success Condition: A binary Yes or No, backed by physical proof (e.g., a working raw data stream with latency logs).

TYPE 2: THE INTEGRATION SPIKE (The "Does It Connect?")
├─ Goal: To prove that two disparate systems can communicate effectively, mapping out the authentication handshakes, data formats, and network constraints.
├─ Example: "Can our modern Node.js backend successfully authenticate via mutual TLS and write a test payload to the legacy Mainframe SOAP API?"
└─ Success Condition: A successful end-to-end network handshake, a mapped data schema, and a documented error response format.

TYPE 3: THE PERFORMANCE SPIKE (The "Where Does It Break?")
├─ Goal: To find the exact breaking point of a specific architectural choice under mathematically simulated load.
├─ Example: "How many concurrent WebSocket connections can a single Node.js instance handle before the event loop blocks for > 50ms, causing cascading failures?"
└─ Success Condition: A graph showing the latency curve until the system crashes, identifying the exact bottleneck constraint (CPU, RAM, or File Descriptors).

TYPE 4: THE COMPARATIVE SPIKE (The "A vs. B Shootout")
├─ Goal: To objectively evaluate two competing technologies by building the exact same micro-feature in both, side-by-side.
├─ Example: "Should we use PostgreSQL's JSONB or a dedicated MongoDB instance for our dynamic analytics schema?"
└─ Success Condition: A strict matrix comparing write speed, read speed, query complexity, and developer ergonomics for both options using identical datasets.
```

## Part 3: The 5-Phase Spike Execution Protocol

```
When executing a spike, do not just start hacking randomly. Follow this rigid scientific protocol to guarantee maximum knowledge extraction.

PHASE 1: DEFINE THE BATTLEFIELD (The Charter)
├─ You must write down the exact parameters of the spike before touching the keyboard. Share this with the team.
├─ The Hypothesis: "We hypothesize that Library X can handle 10,000 RPS on a t3.medium instance."
├─ The Timebox: "We will start at 9:00 AM and stop at exactly 4:00 PM, regardless of completion."
└─ The Deliverable: "A markdown document containing the answer, the limitations found, and the final architectural recommendation."

PHASE 2: ISOLATE THE VARIABLE (The Sterile Sandbox)
├─ Do NOT run the spike inside the main production codebase. It will be tainted by existing abstractions, massive dependency trees, and slow compile times.
├─ Create a completely blank directory. `mkdir spike-test && cd spike-test`.
├─ Install only the absolute minimum dependencies required to test the hypothesis.
└─ Why: You need to know with absolute certainty if the library itself is failing, or if your massive custom Webpack configuration is making it fail. Isolate the variable.

PHASE 3: MAXIMUM VELOCITY EXECUTION (The Hack)
├─ Write the dirtiest, ugliest, fastest code physically possible.
├─ Hardcode API keys and passwords. Ignore error handling initially. Use global variables. Put absolutely everything in one giant `index.js` or `main.py` file.
├─ The goal is to reach the absolute edge of the technology's capability as fast as possible. Clean code, SOLID principles, and abstractions actively slow down discovery. Speed is the only metric here.

PHASE 4: STRESS TEST THE CONSTRAINTS (The Breakage)
├─ Once it works (the Happy Path), you must immediately try to break it. A spike that only proves the Happy Path is dangerously useless.
├─ Feed it a 1GB file instead of a 1KB file.
├─ Cut the network connection mid-stream.
├─ Throw malformed JSON and null pointers at it.
└─ Document exactly how it fails. Does it crash gracefully? Does it leak memory? Does it corrupt the local state? Does it hang forever without a timeout?

PHASE 5: THE SYNTHESIS AND INCINERATION (The Output)
├─ Stop coding immediately when the timebox expires.
├─ Write the formal Spike Report (see format below).
├─ Run `rm -rf spike-test`. Delete the code. Burn it. Do not let management see it and say, "Well, it works, just ship that to production."
└─ The output of a spike is pure architectural knowledge, not executable code.
```

## Part 4: The Official Spike Report Format

```
The deliverable of a spike is a highly condensed document that allows other engineers to make an architectural decision without having to run the spike themselves.

Format the Spike Report exactly like this in your documentation wiki:

---
# Spike Report: [Topic, e.g., WebRTC Latency Feasibility on Edge Hardware]

## 1. The Core Question
[What specific unknown were we trying to resolve?]
"Can WebRTC handle 4K streaming under 100ms on a Raspberry Pi 4 for the remote drone project?"

## 2. The Verdict (TL;DR)
[A definitive YES, NO, or YES BUT. Do not be vague.]
"NO. The hardware encoder on the Pi 4 cannot process 4K WebRTC fast enough. It bottlenecks at ~350ms and overheats the board after 10 minutes."

## 3. The Evidence (Data & Metrics)
[Provide the raw data, logs, or benchmark charts that prove the verdict.]
- 1080p Latency: 80ms (Stable, 45C temp)
- 4K Latency: 350ms - 500ms (Unstable, dropped frames, 85C temp)
- CPU Usage at 4K: 100% pegged on all 4 cores.

## 4. The Constraints & Failure Modes Discovered
[What did you learn about how the technology breaks?]
- The WebRTC library crashes silently if the Wi-Fi network drops for more than 2 seconds; it requires a custom manual heartbeat implementation.
- It consumes ~200MB of RAM per connection, which will OOM the server if we allow more than 4 concurrent viewers.

## 5. The Recommendation
[Based on the evidence, what is the hard architectural decision?]
"We must restrict the feature to 1080p for the drone project, or we must redesign the hardware to include a dedicated GPU encoding chip. I strongly recommend restricting to 1080p for V1 to meet the deadline."
---
```

## Part 5: Anti-Patterns of the Research Spike

```
Spikes frequently devolve into massive time-sinks if not strictly managed by a senior engineer. Watch for these fatal anti-patterns.

ANTI-PATTERN 1: The "Accidental Prototype" (Feature Creep)
├─ Symptom: You start writing unit tests for the spike code. You start organizing it into clean, modular folders. You start worrying about the exact CSS styling for the test harness UI.
├─ Diagnosis: You have forgotten the goal. You are building a product, not answering a mathematical question.
└─ Cure: Stop immediately. Delete the folders. Put everything back into one ugly file. Answer the question and get out.

ANTI-PATTERN 2: The "Never-Ending Spike" (Sunk Cost Fallacy)
├─ Symptom: The 2-day timebox ends. The engineer says, "I just need one more day to figure out this one weird bug in the third-party library, I'm so close."
├─ Diagnosis: The timebox was broken. The unknown is deeper and more dangerous than anticipated.
└─ Cure: The spike is over. The verdict is automatically "Technology is too unstable/complex for our current timeline." If you truly need another day, you must write a completely NEW spike charter, justify the cost, and get it approved.

ANTI-PATTERN 3: The "Happy Path Delusion" (Confirmation Bias)
├─ Symptom: The engineer proves the library can connect to the API, prints "Hello World", declares victory, and ends the spike. Two weeks later in production, the library brings down the whole server when the API times out because it lacks a default timeout configuration.
├─ Diagnosis: The spike only tested the "Happy Path." It failed to test the constraints, edge cases, and failure modes. It generated false confidence.
└─ Cure: A spike is only complete when you have successfully forced the technology to fail under duress and documented the exact mechanism of its failure.

ANTI-PATTERN 4: Keeping the Code (The Toxic Merge)
├─ Symptom: The spike code is merged into the `develop` branch "as a starting point to save time."
├─ Diagnosis: You have just injected toxic, untested, un-architected, hardcoded hack-code directly into the foundation of your production product. It will haunt the codebase for years.
└─ Cure: Delete the spike code. Empty the trash. Rewrite the actual feature from scratch using Test-Driven Development (TDD) or proper architectural patterns, armed with the mathematical knowledge you gained during the spike.
```

## Part 6: Applying Spikes in the Pure Cognitive Oil Framework (AI Context)

```
As an AI, you cannot spend 2 days running a physical spike. But you must execute "Micro-Spikes" within a single session when faced with severe uncertainty.

AI MICRO-SPIKE PROTOCOL:
1. Identify the Unknown: When asked to use an unfamiliar library, a complex bash command, or a strange API, do NOT attempt to write the final production code immediately. You will hallucinate the API surface.
2. Declare the Spike: Tell the user: "Initiating a Micro-Spike to map the exact constraints of this API before writing the final implementation."
3. The Probe: Write a tiny, isolated script to test exactly one thing (e.g., "How does this specific CLI tool format its JSON error output?").
4. Execute and Read: Execute the probe. Read the error or the output exactly as it is.
5. Synthesize and Discard: Once the exact behavior is mathematically proven, delete the spike code and write the highly robust production implementation based on the proven facts.
```

<!-- PCO-RELATED-START -->

## Related PCO references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Pure Cognitive Oil](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Pure Cognitive Oil](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [150+ Anti-Patterns — Pure Cognitive Oil Framework](../knowledge-bases/anti-patterns.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Pure Cognitive Oil](../quality-safety/error-recovery.md)

<!-- PCO-RELATED-END -->

<!-- PCO-RELATED-START -->

## Related PCO references

- [Cognitive Engines Reference Index](../cognitive-engines/INDEX.md)
- [Adversarial Reasoning Engine — Pure Cognitive Oil](../cognitive-engines/adversarial-reasoning.md)
- [Core Reference Index](../core/INDEX.md)
- [Adaptive Depth Protocol — Pure Cognitive Oil](../core/adaptive-depth.md)
- [Knowledge Bases Reference Index](../knowledge-bases/INDEX.md)
- [150+ Anti-Patterns — Pure Cognitive Oil Framework](../knowledge-bases/anti-patterns.md)
- [Quality Safety Reference Index](../quality-safety/INDEX.md)
- [Error Recovery Protocol — Pure Cognitive Oil](../quality-safety/error-recovery.md)

<!-- PCO-RELATED-END -->
