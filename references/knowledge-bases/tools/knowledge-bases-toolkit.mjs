#!/usr/bin/env node
const cmd = process.argv[2] || "list";
const input = process.argv.slice(3).join(" ").toLowerCase();

const models = [
  ["First Principles", ["root", "fundamental", "why", "architecture"]],
  ["Inversion", ["risk", "fail", "avoid", "safety"]],
  ["Occam's Razor", ["simple", "complex", "overengineer"]],
  ["Systems Thinking", ["system", "workflow", "dependency", "integration"]],
  ["Cost-Benefit", ["tradeoff", "decision", "choose", "whether"]],
];

function choose() {
  return models.map(([name, keys]) => [name, keys.filter((k) => input.includes(k)).length]).sort((a, b) => b[1] - a[1]).filter(([, n]) => n > 0).slice(0, 4);
}

function list() {
  console.log(`Knowledge-Bases Toolkit Commands:
  list                    Show commands
  models "<task>"         Select mental models
  antipatterns "<task>"   Select anti-patterns
  decision "<task>"       Decision frame
  brief "<task>"          Compact knowledge-base brief
  gate "<task>"           Knowledge gate checklist`);
}

switch (cmd) {
  case "list": list(); break;
  case "models": {
    const selected = choose();
    console.log(selected.length ? selected.map(([m]) => `- ${m}`).join("\n") : "- First Principles\n- Inversion\n- Systems Thinking");
    break;
  }
  case "antipatterns":
    console.log(`Anti-patterns to watch for: ${input}\n- Prose-only framework with no execution path.\n- Copy-pasted script snippets drifting across docs.\n- Premature abstraction.\n- Verification theater without command evidence.`);
    break;
  case "decision":
    console.log(`Decision frame for: ${input}\n- Option A: embed script in markdown — easier to read, poor reuse/testability.\n- Option B: external folder-local tool — professional, testable, discoverable.\n- Recommendation: external tool plus short markdown command snippet.`);
    break;
  case "brief":
    console.log(`Knowledge brief: select models, name anti-patterns, make tradeoff explicit, then verify chosen path. Task: ${input}`);
    break;
  case "gate":
    console.log(`Knowledge gates:\n- Mental model named.\n- Anti-pattern named.\n- Tradeoff documented.\n- Decision tied to evidence and maintenance cost.`);
    break;
  default: list(); process.exit(cmd === "help" ? 0 : 2);
}
