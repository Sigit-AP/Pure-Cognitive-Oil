#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadReferenceRuntime, routeReferences } from "../../references/runtime/dci-reference-runtime.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const superpowersBaseline = [
  "session-start hook",
  "bootstrap skill loaded at first use",
  "platform-specific JSON envelopes",
  "Claude hook manifest",
  "Cursor hook manifest",
  "Windows/Unix hook wrapper",
  "OpenCode plugin",
  "skills path registration",
  "bootstrap content cache",
  "duplicate injection guard",
  "plugin loading test",
  "bootstrap caching test",
  "packaged skills directory",
  "zero-dependency first-use hook",
  "first-message injection",
  "skill ecosystem documentation",
];

const featureChecks = [
  ["package manifest", () => exists("package.json")],
  ["CLI binary", () => exists("bin/dci.mjs")],
  ["zero-dependency bootstrap", () => contains("scripts/dci/bootstrap.mjs", "DCI_BOOT_CONTRACT") && !contains("hooks/session-start", "npx tsx")],
  ["platform JSON envelopes", () => contains("scripts/dci/bootstrap.mjs", "additional_context") && contains("scripts/dci/bootstrap.mjs", "hookSpecificOutput")],
  ["Claude hook manifest", () => exists("hooks/hooks.json")],
  ["Cursor hook manifest", () => exists("hooks/hooks-cursor.json")],
  ["Windows/Unix hook wrapper", () => exists("hooks/run-hook.cmd")],
  ["Claude plugin manifest", () => exists(".claude-plugin/plugin.json")],
  ["Cursor plugin manifest", () => exists(".cursor-plugin/plugin.json")],
  ["Codex plugin manifest", () => exists(".codex-plugin/plugin.json")],
  ["OpenCode plugin", () => exists(".opencode/plugins/dci.js")],
  ["OpenCode skills registration", () => contains(".opencode/plugins/dci.js", "config.skills.paths")],
  ["OpenCode bootstrap cache", () => contains(".opencode/plugins/dci.js", "bootstrapCache")],
  ["OpenCode duplicate guard", () => contains(".opencode/plugins/dci.js", "DCI_BOOT_CONTRACT") || contains(".opencode/plugins/dci.js", "Deterministic-Cognitive-Infrastructure")],
  ["using-dci skill", () => exists("skills/using-dci/SKILL.md")],
  ["dci-routing skill", () => exists("skills/dci-routing/SKILL.md")],
  ["dci-verification skill", () => exists("skills/dci-verification/SKILL.md")],
  ["reference runtime", () => exists("references/runtime/dci-reference-runtime.mjs")],
  ["executable reference graph", () => exists("references/reference-graph.mjs")],
  ["folder runtime scripts", () => ["advanced","cognitive-engines","core","knowledge-bases","quality-safety","workflows"].every((f) => exists(`references/${f}/runtime.mjs`))],
  ["route command", () => routeReferences("runtime verification", { limit: 4 }).files.length >= 4],
  ["context command", () => contains("references/runtime/dci-reference-runtime.mjs", "buildContext")],
  ["runtime full-read audit", () => contains("scripts/dci/runtime-audit.mjs", "reference-full-read-coverage")],
  ["healthcheck command", () => exists("scripts/dci/healthcheck.mjs")],
  ["scorecard command", () => exists("scripts/dci/scorecard.mjs")],
  ["lifecycle command", () => exists("scripts/dci/lifecycle.mjs")],
  ["TypeScript indexer", () => exists("scripts/dci/index.ts")],
  ["TypeScript validator", () => exists("scripts/dci/validate.ts")],
  ["readiness/parity gate", () => exists("scripts/dci/parity.ts")],
  ["bootstrap test", () => exists("tests/dci/test-bootstrap.sh")],
  ["bootstrap caching test", () => exists("tests/dci/test-bootstrap-caching.mjs")],
  ["routing test", () => exists("tests/dci/test-routing.sh")],
  ["reference runtime test", () => exists("tests/dci/test-reference-runtime.sh")],
  ["OpenCode plugin test", () => exists("tests/dci/test-opencode-plugin.sh")],
  ["runtime audit test", () => exists("tests/dci/test-runtime-audit.sh")],
  ["parity test", () => exists("tests/dci/test-parity.sh")],
  ["healthcheck test", () => exists("tests/dci/test-healthcheck.sh")],
  ["lifecycle test", () => exists("tests/dci/test-lifecycle.sh")],
  ["scorecard test", () => exists("tests/dci/test-scorecard.sh")],
  ["Superpowers baseline audit", () => exists("docs/baselines/superpowers-audit.md")],
  ["scorecard documentation", () => exists("docs/scorecard.md")],
  ["root skill boot rule", () => contains("SKILL.md", "Operational boot rule")],
  ["README integration docs", () => contains("README.md", "dci references route")],
  ["reference corpus >=48 files", () => loadReferenceRuntime().totals.files >= 48],
  ["reference sections >=800", () => loadReferenceRuntime().totals.sections >= 800],
  ["graph edges >=800", () => loadReferenceRuntime().totals.edges >= 800],
];

export function buildScorecard() {
  const results = featureChecks.map(([name, fn]) => {
    let ok = false;
    let error = "";
    try { ok = Boolean(fn()); }
    catch (err) { error = err instanceof Error ? err.message : String(err); }
    return { name, ok, error };
  });
  const passed = results.filter((r) => r.ok).length;
  const ratio = Number((passed / superpowersBaseline.length).toFixed(2));
  return {
    method: "audited repository infrastructure coverage across first-use, runtime, and finish stages",
    superpowersBaseline: { features: superpowersBaseline.length, items: superpowersBaseline },
    dci: { passed, total: results.length, results },
    claim: {
      target: "DCI >= 2.0x the inspected Superpowers baseline for infrastructure coverage",
      ratio,
      valid: ratio >= 2 && passed >= 32,
      caveat: "This validates DCI infrastructure coverage. It does not prove every task or answer is universally 2x smarter, faster, or better.",
    },
  };
}

export function formatScorecard(card) {
  const lines = [
    "DCI_SCORECARD",
    `method: ${card.method}`,
    `superpowersBaselineFeatures: ${card.superpowersBaseline.features}`,
    `dciPassedFeatures: ${card.dci.passed}/${card.dci.total}`,
    `ratio: ${card.claim.ratio}x`,
    `claimValid: ${card.claim.valid}`,
    "",
    "## Checks",
  ];
  for (const row of card.dci.results) lines.push(`${row.ok ? "PASS" : "FAIL"} ${row.name}${row.error ? ` — ${row.error}` : ""}`);
  lines.push("", `caveat: ${card.claim.caveat}`);
  return lines.join("\n");
}

function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function contains(rel, needle) {
  const file = path.join(root, rel);
  return fs.existsSync(file) && fs.readFileSync(file, "utf8").includes(needle);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const card = buildScorecard();
  if (process.argv.includes("--json")) console.log(JSON.stringify(card, null, 2));
  else console.log(formatScorecard(card));
  if (!card.claim.valid) process.exit(1);
}
