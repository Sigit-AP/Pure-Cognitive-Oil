#!/usr/bin/env node
const cmd = process.argv[2] || "list";
const input = process.argv.slice(3).join(" ");

function list() {
  console.log(`Quality-Safety Toolkit Commands:
  list                  Show commands
  check "<task>"        Verification checklist
  release "<task>"      Release readiness checklist
  claims "<text>"       Claims needing evidence
  brief "<task>"        Compact quality/safety brief
  gate "<task>"         Quality/safety gate checklist`);
}

function claims(text) {
  return text.split(/[.!?\n]+/).map((s) => s.trim()).filter((s) => /(done|complete|pass|official|safe|secure|better|faster|works|released|published)/i.test(s));
}

switch (cmd) {
  case "list": list(); break;
  case "check":
    console.log(`Verification checklist for: ${input}\n- Identify acceptance criteria.\n- Run targeted command that proves behavior.\n- Run regression gate.\n- Capture exact output.\n- State residual risks and skipped checks.`);
    break;
  case "release":
    console.log(`Release readiness for: ${input}\n- Clean git diff except intended files.\n- Validation/test suite passes.\n- Package dry-run includes expected files.\n- Version/changelog/docs align.\n- Rollback path identified.\n- No unverifiable marketplace/official claims.`);
    break;
  case "claims": {
    const found = claims(input);
    console.log(found.length ? found.map((c) => `- Evidence needed: ${c}`).join("\n") : "No high-risk completion/safety claims detected.");
    break;
  }
  case "brief":
    console.log(`Quality brief: every completion, safety, release, speed, and correctness claim needs command/source evidence. Task: ${input}`);
    break;
  case "gate":
    console.log(`Quality gates:\n- Targeted verification run.\n- Regression verification run.\n- Evidence captured exactly.\n- Residual risks named.\n- No claim exceeds evidence.`);
    break;
  default: list(); process.exit(cmd === "help" ? 0 : 2);
}
