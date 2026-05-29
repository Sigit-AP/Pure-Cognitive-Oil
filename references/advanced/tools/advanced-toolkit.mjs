#!/usr/bin/env node
const cmd = process.argv[2] || "list";
const input = process.argv.slice(3).join(" ");

function list() {
  console.log(`Advanced Toolkit Commands:
  list                    Show commands
  optimize "<task>"       Resource/context optimization
  communicate "<result>"  Compact final reporting
  complexity "<task>"     Complexity risk flags
  brief "<task>"          Compact advanced-systems brief
  gate "<task>"           Advanced gate checklist`);
}

switch (cmd) {
  case "list": list(); break;
  case "optimize":
    console.log(`Optimization for: ${input}\n- Load capsule first, exact sections second.\n- Prefer executable routing over prose dumps.\n- Use folder-local tools for repeatable extraction.\n- Escalate only failed/ambiguous gates to full-file reads.`);
    break;
  case "communicate":
    console.log(`Compact report:\n- Action: <what changed>\n- Evidence: <commands/sources>\n- Gap: <what remains>\n- Next: <one concrete next step>`);
    break;
  case "complexity":
    console.log(`Complexity risks for: ${input}\n- Overengineering beyond task.\n- Duplicated logic across references.\n- Tooling not wired into validation.\n- Claims exceed tests.\n- User cannot discover command quickly.`);
    break;
  case "brief":
    console.log(`Advanced brief: optimize context, minimize duplicated prose, expose operational handles, and keep outputs concise. Task: ${input}`);
    break;
  case "gate":
    console.log(`Advanced gates:\n- Added capability reduces future work.\n- Runtime remains discoverable.\n- No unnecessary dependency.\n- Reporting is compressed without hiding evidence.`);
    break;
  default: list(); process.exit(cmd === "help" ? 0 : 2);
}
