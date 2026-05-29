#!/usr/bin/env node
const text = process.argv.slice(3).join(" ").toLowerCase();
const cmd = process.argv[2] || "list";

const phases = [
  ["SENSE", ["unclear", "scope", "ask", "understand", "what"]],
  ["EXPLORE", ["inspect", "repo", "research", "discover", "read"]],
  ["HYPOTHESIZE", ["bug", "root cause", "debug", "failure", "error"]],
  ["DESIGN", ["architecture", "design", "system", "choose", "tradeoff"]],
  ["PLAN", ["plan", "roadmap", "breakdown", "prd"]],
  ["BUILD", ["implement", "create", "patch", "code", "script"]],
  ["VERIFY", ["test", "audit", "validate", "release", "publish"]],
  ["EVOLVE", ["improve", "upgrade", "optimize", "refactor"]],
];

const laws = [
  ["NO IMPLEMENTATION WITHOUT UNDERSTANDING", ["implement", "build", "patch", "code"]],
  ["NO FIXES WITHOUT ROOT CAUSE", ["bug", "fix", "error", "debug"]],
  ["NO CLAIMS WITHOUT EVIDENCE", ["claim", "official", "complete", "done", "release"]],
  ["NO PLANNING WITHOUT CONTEXT", ["plan", "architecture", "upgrade"]],
  ["NO SYSTEM CHANGE WITHOUT ROLLBACK PLAN", ["release", "publish", "migration", "deploy"]],
  ["NO COMPLEXITY WITHOUT JUSTIFICATION", ["framework", "toolchain", "advanced", "complex"]],
];

function score(items) {
  return items.map(([name, keys]) => [name, keys.filter((k) => text.includes(k)).length])
    .sort((a, b) => b[1] - a[1]);
}

function list() {
  console.log(`Core Toolkit Commands:
  list                 Show commands
  phase "<task>"       Recommend active DCI phase
  laws "<task>"        Select relevant Iron Laws
  depth "<task>"       Recommend adaptive depth
  brief "<task>"       Compact core operating brief
  gate "<task>"        Core gate checklist`);
}

switch (cmd) {
  case "list": list(); break;
  case "phase": {
    const [phase, hits] = score(phases)[0];
    console.log(`Recommended phase: ${phase}\nSignal hits: ${hits}\nNext gate: explain current phase, evidence need, and transition condition before action.`);
    break;
  }
  case "laws": {
    const selected = score(laws).filter(([, n]) => n > 0).slice(0, 5);
    console.log(selected.length ? selected.map(([x]) => `- ${x}`).join("\n") : "- NO CLAIMS WITHOUT EVIDENCE\n- NO PLANNING WITHOUT CONTEXT");
    break;
  }
  case "depth": {
    const high = /(release|security|architecture|migration|production|large|upgrade|publish)/.test(text);
    const medium = /(code|bug|test|refactor|script|workflow)/.test(text);
    console.log(`Recommended depth: ${high ? "high" : medium ? "medium" : "low"}\nRule: increase depth on irreversible change, unclear scope, or failed verification.`);
    break;
  }
  case "brief":
    console.log(`Core brief: route task, name phase, label assumptions, preserve evidence, verify before claim. Task: ${process.argv.slice(3).join(" ")}`);
    break;
  case "gate":
    console.log(`Core gates:\n- Phase named and justified.\n- Assumptions labeled.\n- Evidence path known.\n- Next transition condition explicit.`);
    break;
  default: list(); process.exit(cmd === "help" ? 0 : 2);
}
