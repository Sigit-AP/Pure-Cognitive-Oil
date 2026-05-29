#!/usr/bin/env node
const cmd = process.argv[2] || "list";
const input = process.argv.slice(3).join(" ").toLowerCase();

const workflows = [
  ["new-feature.md", ["feature", "build", "add", "implement"]],
  ["refactoring.md", ["refactor", "cleanup", "restructure"]],
  ["security-audit.md", ["security", "audit", "vulnerability", "token"]],
  ["performance.md", ["performance", "slow", "optimize", "speed"]],
  ["technical-writing.md", ["docs", "readme", "skill", "markdown", "document"]],
  ["release.md", ["release", "publish", "version", "npm", "tag"]],
  ["bug-fix.md", ["bug", "fix", "error", "failure"]],
  ["architecture.md", ["architecture", "design", "tradeoff"]],
];

function pick() {
  return workflows.map(([file, keys]) => [file, keys.filter((k) => input.includes(k)).length]).sort((a, b) => b[1] - a[1])[0][0];
}

function list() {
  console.log(`Workflows Toolkit Commands:
  list                Show commands
  select "<task>"     Choose workflow file
  steps "<task>"      Execution skeleton
  handoff "<task>"    Final report skeleton
  brief "<task>"      Compact workflow brief
  gate "<task>"       Workflow gate checklist`);
}

switch (cmd) {
  case "list": list(); break;
  case "select":
    console.log(`Selected workflow: references/workflows/${pick()}\nReason: keyword match. Confirm through full route for high-risk work.`);
    break;
  case "steps":
    console.log(`Execution skeleton for: ${input}\n1. Route references.\n2. Inspect real files/state.\n3. Plan smallest safe changes.\n4. Implement.\n5. Verify targeted + regression gates.\n6. Report evidence/gaps.`);
    break;
  case "handoff":
    console.log(`Handoff skeleton:\n- Changed: <files/areas>\n- Verified: <commands + outputs>\n- Risks: <remaining risks>\n- Next: <single next step>`);
    break;
  case "brief":
    console.log(`Workflow brief: ${pick()} is the starting workflow. Execute with context, smallest safe change, and evidence-backed handoff.`);
    break;
  case "gate":
    console.log(`Workflow gates:\n- Workflow selected.\n- Entry condition matches task.\n- Steps completed in order or deviation justified.\n- Handoff includes verification evidence.`);
    break;
  default: list(); process.exit(cmd === "help" ? 0 : 2);
}
