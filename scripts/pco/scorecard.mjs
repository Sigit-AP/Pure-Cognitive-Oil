#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadReferenceRuntime, routeReferences } from "../../references/runtime/pco-reference-runtime.mjs";

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
  ["CLI binary", () => exists("bin/pco.mjs")],
  ["zero-dependency bootstrap", () => contains("scripts/pco/bootstrap.mjs", "PCO_BOOT_CONTRACT") && !contains("hooks/session-start", "npx tsx")],
  ["platform JSON envelopes", () => contains("scripts/pco/bootstrap.mjs", "additional_context") && contains("scripts/pco/bootstrap.mjs", "hookSpecificOutput")],
  ["Claude hook manifest", () => exists("hooks/hooks.json")],
  ["Cursor hook manifest", () => exists("hooks/hooks-cursor.json")],
  ["Windows/Unix hook wrapper", () => exists("hooks/run-hook.cmd")],
  ["Claude plugin manifest", () => exists(".claude-plugin/plugin.json")],
  ["Cursor plugin manifest", () => exists(".cursor-plugin/plugin.json")],
  ["Codex plugin manifest", () => exists(".codex-plugin/plugin.json")],
  ["OpenCode plugin", () => exists(".opencode/plugins/pco.js")],
  ["OpenCode skills registration", () => contains(".opencode/plugins/pco.js", "config.skills.paths")],
  ["OpenCode bootstrap cache", () => contains(".opencode/plugins/pco.js", "bootstrapCache")],
  ["OpenCode duplicate guard", () => contains(".opencode/plugins/pco.js", "PCO_BOOT_CONTRACT") || contains(".opencode/plugins/pco.js", "Pure Cognitive Oil")],
  ["using-pco skill", () => exists("skills/using-pco/SKILL.md")],
  ["pco-routing skill", () => exists("skills/pco-routing/SKILL.md")],
  ["pco-verification skill", () => exists("skills/pco-verification/SKILL.md")],
  ["reference runtime", () => exists("references/runtime/pco-reference-runtime.mjs")],
  ["executable reference graph", () => exists("references/reference-graph.mjs")],
  ["folder runtime scripts", () => ["advanced","cognitive-engines","core","knowledge-bases","quality-safety","workflows"].every((f) => exists(`references/${f}/runtime.mjs`))],
  ["route command", () => routeReferences("runtime verification", { limit: 4 }).files.length >= 4],
  ["context command", () => contains("references/runtime/pco-reference-runtime.mjs", "buildContext")],
  ["runtime full-read audit", () => contains("scripts/pco/runtime-audit.mjs", "reference-full-read-coverage")],
  ["healthcheck command", () => exists("scripts/pco/healthcheck.mjs")],
  ["scorecard command", () => exists("scripts/pco/scorecard.mjs")],
  ["lifecycle command", () => exists("scripts/pco/lifecycle.mjs")],
  ["TypeScript indexer", () => exists("scripts/pco/index.ts")],
  ["TypeScript validator", () => exists("scripts/pco/validate.ts")],
  ["readiness/parity gate", () => exists("scripts/pco/parity.ts")],
  ["bootstrap test", () => exists("tests/pco/test-bootstrap.sh")],
  ["bootstrap caching test", () => exists("tests/pco/test-bootstrap-caching.mjs")],
  ["routing test", () => exists("tests/pco/test-routing.sh")],
  ["reference runtime test", () => exists("tests/pco/test-reference-runtime.sh")],
  ["OpenCode plugin test", () => exists("tests/pco/test-opencode-plugin.sh")],
  ["runtime audit test", () => exists("tests/pco/test-runtime-audit.sh")],
  ["parity test", () => exists("tests/pco/test-parity.sh")],
  ["healthcheck test", () => exists("tests/pco/test-healthcheck.sh")],
  ["lifecycle test", () => exists("tests/pco/test-lifecycle.sh")],
  ["scorecard test", () => exists("tests/pco/test-scorecard.sh")],
  ["Superpowers baseline audit", () => exists("docs/baselines/superpowers-audit.md")],
  ["scorecard documentation", () => exists("docs/scorecard.md")],
  ["root skill boot rule", () => contains("SKILL.md", "Operational boot rule")],
  ["README integration docs", () => contains("README.md", "pco references route")],
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
    pco: { passed, total: results.length, results },
    claim: {
      target: "PCO >= 2.0x the inspected Superpowers baseline for infrastructure coverage",
      ratio,
      valid: ratio >= 2 && passed >= 32,
      caveat: "This validates PCO infrastructure coverage. It does not prove every task or answer is universally 2x smarter, faster, or better.",
    },
  };
}

export function formatScorecard(card) {
  const lines = [
    "PCO_SCORECARD",
    `method: ${card.method}`,
    `superpowersBaselineFeatures: ${card.superpowersBaseline.features}`,
    `pcoPassedFeatures: ${card.pco.passed}/${card.pco.total}`,
    `ratio: ${card.claim.ratio}x`,
    `claimValid: ${card.claim.valid}`,
    "",
    "## Checks",
  ];
  for (const row of card.pco.results) lines.push(`${row.ok ? "PASS" : "FAIL"} ${row.name}${row.error ? ` — ${row.error}` : ""}`);
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
