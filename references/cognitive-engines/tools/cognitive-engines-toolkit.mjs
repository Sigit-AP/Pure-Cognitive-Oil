#!/usr/bin/env node
const cmd = process.argv[2] || "list";
const input = process.argv.slice(3).join(" ");

function list() {
  console.log(`Cognitive Engines Toolkit Commands:
  list                    Show commands
  challenge "<claim>"     Generate adversarial questions
  hypotheses "<problem>"  Generate ranked hypothesis skeleton
  ground "<claim>"        Identify evidence required
  brief "<task>"          Compact cognitive-engine brief
  gate "<task>"           Cognitive gate checklist`);
}

switch (cmd) {
  case "list": list(); break;
  case "challenge":
    console.log(`Adversarial challenge for: ${input}\n- What would make this false?\n- Which source is authoritative?\n- What is missing from the evidence chain?\n- What alternative explanation fits the same facts?\n- What breaks if this claim is wrong?`);
    break;
  case "hypotheses":
    console.log(`Hypotheses for: ${input}\n1. Most likely: current evidence points to the obvious path; verify with direct inspection.\n2. Plausible: hidden constraint changes the solution; search config/runtime.\n3. Risk case: surface request masks architecture drift; audit related files before changing.`);
    break;
  case "ground":
    console.log(`Evidence required for: ${input}\n- Direct source file, command output, or official upstream reference.\n- Reproduction/validation command.\n- Counterexample search result.\n- Timestamp/version when fact may drift.`);
    break;
  case "brief":
    console.log(`Cognitive brief: challenge claims, generate alternatives, quantify uncertainty, and ground conclusions before output. Task: ${input}`);
    break;
  case "gate":
    console.log(`Cognitive gates:\n- At least one alternative hypothesis considered.\n- Disconfirming evidence searched.\n- Confidence matches evidence quality.\n- Claim wording avoids overreach.`);
    break;
  default: list(); process.exit(cmd === "help" ? 0 : 2);
}
