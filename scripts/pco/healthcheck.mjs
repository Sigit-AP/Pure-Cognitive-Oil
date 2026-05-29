#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadReferenceRuntime, routeReferences } from "../../references/runtime/pco-reference-runtime.mjs";
import { buildScorecard } from "./scorecard.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function checkDciHealth() {
  const rt = loadReferenceRuntime();
  const route = routeReferences("professional verification runtime", { limit: 6, depth: 1 });
  const scorecard = buildScorecard();
  const checks = [];
  add(checks, "bootstrap script exists", exists("scripts/pco/bootstrap.mjs"));
  add(checks, "bootstrap contract marker exists", contains("scripts/pco/bootstrap.mjs", "PCO_BOOT_CONTRACT"));
  add(checks, "session hook uses zero-dependency bootstrap", contains("hooks/session-start", "bootstrap.mjs") && !contains("hooks/session-start", "npx tsx"));
  add(checks, "Claude hook manifest exists", exists("hooks/hooks.json"));
  add(checks, "Cursor hook manifest exists", exists("hooks/hooks-cursor.json"));
  add(checks, "polyglot hook wrapper exists", exists("hooks/run-hook.cmd"));
  add(checks, "OpenCode plugin caches bootstrap", contains(".opencode/plugins/pco.js", "bootstrapCache"));
  add(checks, "OpenCode plugin dedupes injection", contains(".opencode/plugins/pco.js", "PCO_BOOT_CONTRACT") || contains(".opencode/plugins/pco.js", "Pure Cognitive Oil"));
  add(checks, "reference runtime loads >=48 files", rt.totals.files >= 48, `${rt.totals.files} files`);
  add(checks, "reference runtime loads >=800 sections", rt.totals.sections >= 800, `${rt.totals.sections} sections`);
  add(checks, "reference graph has >=800 edges", rt.totals.edges >= 800, `${rt.totals.edges} edges`);
  add(checks, "route returns selected files", route.files.length >= 6, `${route.files.length} selected`);
  add(checks, "scorecard claim valid", scorecard.claim.valid, `${scorecard.claim.ratio}x`);
  const failures = checks.filter((c) => !c.ok);
  return { ok: failures.length === 0, checks, failures, runtime: rt.totals, scorecard: scorecard.claim };
}

export function formatHealthReport(report) {
  const lines = ["PCO_HEALTHCHECK", `ok: ${report.ok}`, `runtime: files=${report.runtime.files}, sections=${report.runtime.sections}, edges=${report.runtime.edges}`, `scorecard: ${report.scorecard.ratio}x valid=${report.scorecard.valid}`, ""];
  for (const check of report.checks) lines.push(`${check.ok ? "PASS" : "FAIL"} ${check.name}${check.evidence ? ` — ${check.evidence}` : ""}`);
  return lines.join("\n");
}

function add(checks, name, ok, evidence = "") { checks.push({ name, ok: Boolean(ok), evidence }); }
function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function contains(rel, needle) {
  const file = path.join(root, rel);
  return fs.existsSync(file) && fs.readFileSync(file, "utf8").includes(needle);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = checkDciHealth();
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else console.log(formatHealthReport(report));
  if (!report.ok) process.exit(1);
}
