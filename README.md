# APEX Cognitive Framework (Deep-Thinking-10x)

[![Cognitive Engine](https://img.shields.io/badge/Architecture-APEX_v1-blue.svg)](#) 
[![Subsystems](https://img.shields.io/badge/Subsystems-28-orange.svg)](#) 
[![Workflows](https://img.shields.io/badge/Workflows-15-green.svg)](#)

The ultimate cognitive operating system for AI agent harnesses (Claude Code, OpenClaw, Codex, Gemini, Hermes, Cursor). 

**This is not a prompt. This is an Operating System for Thought.**

APEX transforms standard, probabilistic AI agents into deterministic, adversarial, and highly systemic reasoning engines. It forces agents to think like Principal Engineers before they are allowed to act like Junior Developers.

---

## 🧠 The Global Architecture Model (The "Brain" Protocol)

APEX (`deep-thinking-10x`) acts as the centralized **Brain**. It does not execute physical commands (like compiling code or fetching URLs) itself. Instead, it dictates *how* and *when* the agent's physical plugins and skills should be used.

### The Ecosystem Flow
When a User submits **Task A**, the ecosystem executes a strict, multi-pass deterministic loop:

1. **Ingestion & Classification (The Brain):**
   - The Agent routes Task A through APEX (`workflow-index.md`).
   - APEX classifies the task (e.g., `bug-fix.md`, `new-feature.md`, `legacy-rescue.md`).
   - APEX runs the task through its Cognitive Engines (`causal-inference.md`, `first-principles.md`) to strip away human assumptions and find the mathematical root requirement.
   
2. **Strategy Drafting (The Brain):**
   - APEX drafts a rigid execution blueprint. It explicitly defines what it *knows* and declares ignorance on what it *does not know* (`hallucination-defense.md`).

3. **Physical Execution (The Hands):**
   - The Agent reads the APEX blueprint and selects the appropriate localized Plugin/Skill (e.g., a React coding skill, a Web Search skill, a Bash execution tool).
   - The Plugin/Skill executes the physical action and returns the raw data (logs, compiled code, scraped text).

4. **Adversarial Synthesis (The Brain):**
   - The Agent takes the raw Plugin output and feeds it *back* into APEX.
   - APEX red-teams the result (`adversarial-reasoning.md`). It asks: *"Did the plugin hallucinate? Does this code introduce a memory leak? Is the web data biased?"*
   - **If it fails:** The loop restarts. APEX drafts a correction plan.
   - **If it passes:** APEX synthesizes the final, highly-dense output for the User.

---

## 📂 Framework Architecture (28 Subsystems)

The APEX repository is strictly divided into hierarchical layers. **All files are engineered for extreme depth (>10KB minimum).**

```text
deep-thinking-10x/
├── SKILL.md                          # The Master Orchestrator (50KB+)
├── README.md                         # This architecture guide
│
├── references/
│   ├── core/                         # The Laws of Physics
│   │   ├── iron-laws.md              # The 20 immutable laws of execution
│   │   ├── pipeline-phases.md        # The 10-phase non-linear execution map
│   │   └── adaptive-depth.md         # Effort calibration heuristics
│   │
│   ├── cognitive-engines/            # The Reasoning Brain
│   │   ├── adversarial-reasoning.md  # Red-teaming and self-attack
│   │   ├── causal-inference.md       # Separating correlation from causation
│   │   ├── hallucination-defense.md  # Zero-hallucination protocols
│   │   ├── uncertainty-engine.md     # Bayesian confidence scoring
│   │   └── ... (10 more engines)
│   │
│   ├── workflows/                    # The Physical Execution Blueprints
│   │   ├── workflow-index.md         # The Master Routing Table
│   │   ├── architecture.md           # System design protocol
│   │   ├── bug-fix.md                # Deterministic isolation protocol
│   │   ├── debugging-unknown.md      # Alien codebase survival guide
│   │   ├── new-feature.md            # Schema-first feature development
│   │   └── ... (11 more workflows)
│   │
│   ├── knowledge-bases/              # The Memory Substrate
│   │   ├── mental-models.md          # 155+ cross-domain models
│   │   ├── anti-patterns.md          # 155+ failure mode maps
│   │   └── decision-tree.md          # Multi-criteria decision analysis
│   │
│   ├── quality-safety/               # The Immune System
│   │   ├── error-recovery.md         # 7-level error classification
│   │   ├── quality-gates.md          # The G1-G20 unified gate system
│   │   └── verification-checklist.md # 5-layer mathematical verification
│   │
│   └── advanced/                     # The Meta-Evolution Layer
│       ├── collaborative-intelligence.md # Human/AI synergy protocols
│       ├── emergent-complexity.md    # Chaos theory and systems dynamics
│       └── resource-optimization.md  # Token/Compute/Time constraints
```

---

## ⚙️ Harness Integration Guide

To deploy APEX as the central brain in your agent ecosystem:

### 1. Claude Code / OpenClaw (Native Hooking)
- Mount `deep-thinking-10x` as your primary global skill directory.
- Map `SKILL.md` to trigger on all generic intents (`think`, `plan`, `architect`, `solve`).
- **Orchestration Rule:** Enforce a system prompt wrapper: *"You are an APEX-driven agent. Before calling any file-edit or shell-execution tool, you MUST consult the corresponding workflow in `deep-thinking-10x/references/workflows/` to establish your strategy."*

### 2. Cursor / IDEs (.cursorrules)
- Copy the `deep-thinking-10x` folder into your `.cursor/` directory.
- Update your global `.cursorrules` to point to `SKILL.md`.
- When using Cursor's "Composer" or multi-file edits, the AI will now automatically pass its generation logic through the APEX Anti-Patterns and Mental Models before writing text to your editor.

### 3. Multi-Agent Swarms (PM2 / AutoGen)
APEX is designed to be the "Architect Agent" in a multi-agent swarm.
1. **Architect Agent:** Runs purely on APEX. Parses user requests, runs Causal Inference, and outputs a strict JSON execution plan.
2. **Worker Agents:** Dumb execution agents equipped with CLI plugins. They read the JSON plan, execute the code, and return logs.
3. **Reviewer Agent:** Runs purely on APEX `code-review.md` and `security-audit.md`. It evaluates the Worker's logs against the Architect's plan.

---

## 🛡️ The Zero-Hallucination Doctrine

LLMs hallucinate because they are probabilistic text predictors filling in missing context. APEX eradicates this by replacing probability with **Algorithmic Epistemology**:

- **The Epistemic Wall:** The Brain is mathematically forbidden from guessing. If a stack trace is missing, it halts execution and demands the physical log.
- **The Ground Truth Anchor:** No code is written without first anchoring the logic to a physical schema file (`types.ts`, `schema.sql`) via the Search Strategy engine.
- **Continuous Gates:** At every phase transition, the Brain must pass Gate 11 (`G11: Can I source every factual claim?`). If false, the response is blocked.

---

## 🚀 How to Contribute

The APEX framework is a living cognitive entity. To contribute a new workflow or cognitive engine:
1. It **must** exceed 10KB in pure semantic density (no padding).
2. It **must** include Adversarial Defense mechanisms.
3. It **must** map to existing Mental Models or define new ones.
4. It **must** pass the G19 Ethical Reasoning gate.

*"Don't follow this framework. BECOME this framework. It is not a manual you read — it is a mind you run."*
