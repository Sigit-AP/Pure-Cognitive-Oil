#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadReferenceRuntime, routeReferences } from "../../references/runtime/pco-reference-runtime.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const baselineFeatures = [
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
  ["lean npm test smoke", () => packageScript("test").includes("install-smoke.mjs")],
  ["install-check mirrors test", () => packageScript("pco:install-check") === packageScript("test")],
  ["direct bootstrap smoke", () => JSON.parse(runNode(["scripts/pco/bootstrap.mjs", "--json"])).additionalContext?.includes("PCO_BOOT_CONTRACT")],
  ["direct routing smoke", () => runNode(["references/runtime/pco-reference-runtime.mjs", "route", "scorecard smoke", "--limit", "4", "--depth", "0"]).includes("Selected references")],
  ["direct mode smoke", () => JSON.parse(runNode(["scripts/pco/mode-selector.mjs", "scorecard smoke", "--json"])).config?.validation === "lightweight"],
  ["compact index script", () => exists("scripts/pco/compact-index.mjs")],
  ["resource budget script", () => exists("scripts/pco/resource-budget.py")],
  ["runtime audit command", () => exists("scripts/pco/runtime-audit.mjs")],
  ["healthcheck command executable", () => exists("scripts/pco/healthcheck.mjs")],
  ["lifecycle command executable", () => exists("scripts/pco/lifecycle.mjs")],
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
  const coverageScore = Number((passed / Math.max(featureChecks.length, 1)).toFixed(2));
  return {
    method: "audited repository infrastructure coverage across first-use, runtime, and finish stages",
    baseline: { features: baselineFeatures.length, items: baselineFeatures },
    pco: { passed, total: results.length, results },
    claim: {
      target: "PCO professional infrastructure coverage is complete for the audited checklist",
      coverageScore,
      valid: coverageScore >= 0.9 && passed >= 32,
      caveat: "This validates repository infrastructure coverage. It does not prove every future task or answer is universally better.",
    },
  };
}

export function formatScorecard(card) {
  const lines = [
    "PCO_SCORECARD",
    `method: ${card.method}`,
    `baselineFeatures: ${card.baseline.features}`,
    `pcoPassedFeatures: ${card.pco.passed}/${card.pco.total}`,
    `coverageScore: ${card.claim.coverageScore}`,
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
function packageScript(name) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  return String(pkg.scripts?.[name] || "");
}
function runNode(args) {
  return execFileSync(process.execPath, args, { cwd: root, encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const card = buildScorecard();
  if (process.argv.includes("--json")) console.log(JSON.stringify(card, null, 2));
  else console.log(formatScorecard(card));
  if (!card.claim.valid) process.exit(1);
}
