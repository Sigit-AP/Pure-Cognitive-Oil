#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routeReferences, buildCapsule } from "../../references/runtime/pco-reference-runtime.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const rawArgs = process.argv.slice(2);
const flags = new Set(rawArgs.filter((arg) => arg.startsWith("--")));
const task = rawArgs.filter((arg) => !arg.startsWith("--")).join(" ").trim() || "autonomous professional task";

function run(cmd, cmdArgs) {
  const result = spawnSync(cmd, cmdArgs, {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
    env: process.env,
  });
  return {
    command: [cmd, ...cmdArgs].join(" "),
    status: result.status ?? 1,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}
function top(items, n) { return items.slice(0, n); }
function uniq(xs) { return [...new Set(xs.filter(Boolean))]; }
function summarizeCommand(out, max = 900) {
  const text = `${out.stdout}\n${out.stderr}`.trim();
  return text.length > max ? `${text.slice(0, max)}\n... truncated ...` : text;
}
function matches(q, re) { return re.test(q.toLowerCase()); }
function riskScore(query, plan) {
  let score = 0;
  const q = query.toLowerCase();
  if (matches(q, /prod|production|deploy|delete|remove|drop|migration|security|auth|payment|wallet|key|secret|credential|force|main|master/)) score += 4;
  if (matches(q, /build|fix|patch|write|implement|refactor|change|edit|commit|push|upgrade/)) score += 2;
  if (matches(q, /autonomous|agentic|parallel|delegate|optimal|complex|deep|end-to-end|full/)) score += 2;
  if (plan.files.some(f => /security|incident|migration|error-recovery|ethical/.test(f.node.path))) score += 1;
  return score;
}
function riskOf(score) {
  if (score >= 7) return "critical";
  if (score >= 5) return "high";
  if (score >= 2) return "standard";
  return "low";
}
function complexityOf(query, plan) {
  const q = query.toLowerCase();
  let score = 0;
  if (matches(q, /multi|parallel|delegate|complex|deep|architecture|system|framework|all folders|end-to-end|100%|optimal/)) score += 4;
  if (matches(q, /build|implement|upgrade|refactor|audit|verify|test|docs|manifest|plugin/)) score += 3;
  score += Math.min(4, Math.floor(plan.files.length / 8));
  if (score >= 8) return "very-high";
  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
}
function taskType(query) {
  const q = query.toLowerCase();
  if (matches(q, /bug|fix|error|fail|broken/)) return "bug-fix/debugging";
  if (matches(q, /security|audit|auth|secret|permission/)) return "security-audit";
  if (matches(q, /architecture|design|system|framework/)) return "architecture/system-design";
  if (matches(q, /research|unknown|compare|evaluate/)) return "research-spike";
  if (matches(q, /write|docs|readme|prompt|skill/)) return "technical-writing/skill-design";
  if (matches(q, /build|implement|feature|upgrade/)) return "feature/upgrade";
  return "professional-task";
}
function autonomyFor(risk, complexity) {
  if (risk === "critical") return "autonomous read/plan/test; ask before destructive, production, credential, external, or irreversible actions";
  if (risk === "high") return "autonomous non-destructive plan-build-audit; require rollback before risky write/deploy/push";
  if (["very-high", "high"].includes(complexity)) return "autonomous multi-pass execution with delegate/parallel review when tools exist";
  return "autonomous direct execution with evidence gate";
}
function delegationMode(risk, complexity) {
  if (risk === "critical") return "parallel advisory only until approval boundary is clear";
  if (["very-high", "high"].includes(complexity)) return "parallel delegate recommended: architect + implementer + adversarial auditor + verifier";
  if (complexity === "medium") return "optional delegate: verifier or reviewer only";
  return "single-agent direct path; no delegation overhead";
}
function interviewNeed(query, risk, complexity) {
  const q = query.toLowerCase();
  const vague = q.length < 80 || matches(q, /whatever|anything|best|optimal|bagus|lebih|paling|sesuai|semua|lainnya/);
  if (risk === "critical" || complexity === "very-high" || vague) return "active";
  return "conditional";
}
function buildInterviewSkill(query, risk, complexity) {
  const active = interviewNeed(query, risk, complexity);
  return {
    active,
    purpose: "Only for /PCO-agentic-auto: extract real intent, constraints, success criteria, risk tolerance, hidden preferences, and unacceptable outcomes before action.",
    rules: [
      "Ask only questions whose answers materially change plan, implementation, risk, or verification.",
      "Do not ask obvious/redundant questions when repository/tool evidence can answer them.",
      "Group questions by decision impact, not curiosity.",
      "If answers are not required to proceed safely, continue with explicit assumptions and verify later.",
      "Warn about bad tradeoffs, hidden risks, and likely failure modes before executing irreversible choices."
    ],
    map: [
      "Goal: desired business/user outcome, not just requested action.",
      "Definition of done: observable pass/fail evidence.",
      "Constraints: time, budget, tools, repo conventions, compatibility, style.",
      "Risk tolerance: destructive changes, production impact, security/privacy, rollback.",
      "Preference hierarchy: quality vs speed vs cost vs simplicity vs extensibility.",
      "Audience/context: who consumes the output and how it will be used.",
      "Negative space: what must not happen, what previous attempts failed, what annoys the user."
    ],
    questionBank: [
      "What exact outcome would make this task unquestionably successful, and what evidence should prove it?",
      "Which tradeoff wins if quality, speed, cost, simplicity, and extensibility conflict?",
      "What should the agent avoid even if it seems like a technically better path?",
      "What is the maximum acceptable blast radius: files, APIs, data, production, user-facing behavior?",
      "Are there hidden preferences, prior failed attempts, or style constraints that should steer the solution?",
      "Should the agent optimize for immediate completion, long-term maintainability, or strongest verified correctness?",
      "Which decisions must remain with the user, and which can the agent make autonomously?"
    ]
  };
}
function buildOptimizerMatrix(risk, complexity) {
  const weights = {
    correctness: 10,
    userFit: 10,
    safety: risk === "critical" ? 10 : risk === "high" ? 9 : 7,
    evidence: 10,
    maintainability: ["very-high", "high"].includes(complexity) ? 9 : 7,
    performance: 6,
    cost: 6,
    speed: risk === "low" ? 8 : 5,
    reversibility: risk === "critical" ? 10 : 8,
    elegance: 6
  };
  const options = [
    ["direct-single-agent", "fastest path for low/medium risk bounded work"],
    ["parallel-delegate", "best for high complexity: independent design/build/audit/verifier perspectives"],
    ["research-spike-first", "best when APIs/domain/repo behavior is unknown"],
    ["interview-first", "best when user intent, success metric, or risk boundary changes the implementation"],
    ["ask-before-action", "mandatory for destructive/irreversible/credential/production decisions"]
  ];
  return { weights, options };
}
function buildDelegatePlan(risk, complexity) {
  const enabled = ["very-high", "high"].includes(complexity) || risk === "critical";
  return {
    enabled,
    policy: delegationMode(risk, complexity),
    parallelBatches: [
      "Batch A: Architect maps optimal path, risks, repo constraints, rollback.",
      "Batch B: Implementer patches smallest safe units with tests.",
      "Batch C: Adversarial auditor attacks assumptions, security, edge cases, and user-fit.",
      "Batch D: Verifier runs commands, reads outputs, confirms evidence and gaps."
    ],
    mergeRule: "Merge only evidence-backed findings; resolve conflicts by user goal, safety, reversibility, and verification strength.",
    fallback: "If delegation tools are unavailable, simulate roles sequentially with explicit role headers and fresh evidence per role."
  };
}

const plan = routeReferences(task, { limit: 14, depth: 2, maxSelected: 36 });
const score = riskScore(task, plan);
const risk = riskOf(score);
const complexity = complexityOf(task, plan);
const type = taskType(task);
const axes = uniq(plan.files.flatMap(item => item.node.axes));
const workflows = top(plan.files.filter(item => item.node.folder === "workflows"), 8).map(item => `references/${item.node.path}`);
const engines = top(plan.files.filter(item => item.node.folder === "cognitive-engines"), 8).map(item => `references/${item.node.path}`);
const gates = top(plan.files.filter(item => item.node.folder === "quality-safety"), 8).map(item => `references/${item.node.path}`);
const advanced = top(plan.files.filter(item => item.node.folder === "advanced"), 8).map(item => `references/${item.node.path}`);
const knowledge = top(plan.files.filter(item => item.node.folder === "knowledge-bases"), 8).map(item => `references/${item.node.path}`);
const capsule = buildCapsule(task, { limit: 14, depth: 2, maxSelected: 36 });
const lifecycle = run("node", ["scripts/pco/lifecycle.mjs", "checkpoint", task]);
const validate = flags.has("--verify") ? run("npm", ["run", "pco:validate"]) : null;
const interview = buildInterviewSkill(task, risk, complexity);
const optimizer = buildOptimizerMatrix(risk, complexity);
const delegate = buildDelegatePlan(risk, complexity);

const lines = [];
lines.push("# /PCO-agentic-auto Full Autonomous Runtime Contract");
lines.push(`task: ${task}`);
lines.push(`taskType: ${type}`);
lines.push(`risk: ${risk} (score=${score})`);
lines.push(`complexity: ${complexity}`);
lines.push(`autonomy: ${autonomyFor(risk, complexity)}`);
lines.push(`delegation: ${delegate.policy}`);
lines.push(`selected: ${plan.files.length}/${plan.runtime.totals.files} references; sections=${plan.runtime.totals.sections}; edges=${plan.runtime.totals.edges}`);
lines.push(`axes: ${axes.join(", ")}`);
lines.push("");
lines.push("## Agentic optimizer contract");
lines.push("- Optimize for user-fit, correctness, safety, evidence, maintainability, performance, cost, speed, reversibility, and elegance in that order unless the user states otherwise.");
lines.push("- Choose the smallest sufficient workflow, then escalate depth, tools, context, and delegation only when evidence or risk demands it.");
lines.push("- Act end-to-end: interview when needed, route, plan, build, audit, repair, re-audit, finalize.");
lines.push("- Never claim best/optimal without comparing alternatives and evidence-backed tradeoffs.");
lines.push("- Stop only at real authority boundaries: destructive action, production deploy, credential use, external send, or unresolved ambiguity that materially changes outcome.");
lines.push("");
lines.push("## Interview skill — active only for /PCO-agentic-auto");
lines.push(`status: ${interview.active}`);
lines.push(`purpose: ${interview.purpose}`);
lines.push("rules:");
interview.rules.forEach((item) => lines.push(`- ${item}`));
lines.push("mapping:");
interview.map.forEach((item) => lines.push(`- ${item}`));
lines.push("professional question bank:");
interview.questionBank.forEach((item, idx) => lines.push(`${idx + 1}. ${item}`));
lines.push("");
lines.push("## Optimization matrix");
Object.entries(optimizer.weights).forEach(([k, v]) => lines.push(`- ${k}: ${v}/10`));
lines.push("options:");
optimizer.options.forEach(([name, reason]) => lines.push(`- ${name}: ${reason}`));
lines.push("");
lines.push("## Delegate and parallel execution plan");
lines.push(`enabled: ${delegate.enabled}`);
lines.push(`policy: ${delegate.policy}`);
delegate.parallelBatches.forEach((item) => lines.push(`- ${item}`));
lines.push(`mergeRule: ${delegate.mergeRule}`);
lines.push(`fallback: ${delegate.fallback}`);
lines.push("");
lines.push("## Selected workflows");
workflows.forEach((x) => lines.push(`- ${x}`));
lines.push("## Selected cognitive engines");
engines.forEach((x) => lines.push(`- ${x}`));
lines.push("## Selected advanced systems");
advanced.forEach((x) => lines.push(`- ${x}`));
lines.push("## Selected knowledge bases");
knowledge.forEach((x) => lines.push(`- ${x}`));
lines.push("## Selected gates");
gates.forEach((x) => lines.push(`- ${x}`));
lines.push("");
lines.push("## Full autonomous loop");
lines.push("1. INTERVIEW: activate only if missing information materially changes plan/risk/output; otherwise proceed with stated assumptions.");
lines.push("2. SENSE: define true goal, success evidence, constraints, risk, and bad outcomes.");
lines.push("3. ROUTE: select PCO workflows/engines/gates/context depth from task evidence.");
lines.push("4. PLAN: generate atomic units with verification command and rollback note per unit.");
lines.push("5. PARALLELIZE: delegate independent architecture/research/audit/verification when complexity justifies overhead.");
lines.push("6. BUILD: implement minimal safe increments; preserve user intent and project conventions.");
lines.push("7. AUDIT: run tests/lints/runtime checks; read outputs; adversarially challenge assumptions.");
lines.push("8. REPAIR: fix root causes, not symptoms; rerun failed and regression gates.");
lines.push("9. OPTIMIZE: compare alternatives against matrix; keep the better evidence-backed path.");
lines.push("10. FINALIZE: report exact evidence, tradeoffs, residual risk, and next safest action.");
lines.push("");
lines.push("## Capsule");
lines.push(capsule);
lines.push("");
lines.push("## Lifecycle checkpoint");
lines.push(`command: ${lifecycle.command}`);
lines.push(`status: ${lifecycle.status}`);
lines.push(summarizeCommand(lifecycle));
if (validate) {
  lines.push("");
  lines.push("## Validation");
  lines.push(`command: ${validate.command}`);
  lines.push(`status: ${validate.status}`);
  lines.push(summarizeCommand(validate));
}

console.log(lines.join("\n"));
process.exit(validate && validate.status !== 0 ? validate.status : lifecycle.status);
