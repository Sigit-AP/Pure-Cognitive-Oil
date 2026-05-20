#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const node = process.execPath;
const expectedFolders = ["advanced", "cognitive-engines", "core", "knowledge-bases", "quality-safety", "workflows"];
const expectedRuntimeScripts = expectedFolders.map((folder) => `references/${folder}/runtime.mjs`).sort();
const failures = [];
const warnings = [];
const checks = [];

function rel(p) { return path.relative(root, p).replaceAll(path.sep, "/"); }
function pass(name, detail) { checks.push({ name, status: "pass", detail }); }
function fail(name, detail) { checks.push({ name, status: "fail", detail }); failures.push(`${name}: ${detail}`); }
function warn(name, detail) { checks.push({ name, status: "warn", detail }); warnings.push(`${name}: ${detail}`); }
function exists(p) { return fs.existsSync(path.join(root, p)); }
function run(args) { return execFileSync(node, args, { cwd: root, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }); }
function listFiles(dir) {
  const abs = path.join(root, dir);
  const out = [];
  if (!fs.existsSync(abs)) return out;
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      if ([".git", ".dci", "node_modules", "dist"].includes(ent.name)) continue;
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) walk(full);
      else out.push(rel(full));
    }
  }
  walk(abs);
  return out.sort();
}
function contentSearch(pattern) {
  const re = new RegExp(pattern, "i");
  return listFiles(".")
    .filter((file) => file !== "scripts/dci/runtime-audit.mjs")
    .filter((file) => /\.(md|mjs|js|ts|json|sh)$/.test(file))
    .filter((file) => re.test(fs.readFileSync(path.join(root, file), "utf8")));
}

if (!exists("references/runtime/dci-reference-runtime.mjs")) fail("runtime-main", "missing references/runtime/dci-reference-runtime.mjs");
else pass("runtime-main", "main runtime exists");

const foundRuntimeScripts = listFiles("references").filter((file) => /^references\/[^/]+\/runtime\.mjs$/.test(file)).sort();
if (JSON.stringify(foundRuntimeScripts) === JSON.stringify(expectedRuntimeScripts)) pass("folder-runtime-set", foundRuntimeScripts.join(", "));
else fail("folder-runtime-set", `expected ${expectedRuntimeScripts.join(", ")} got ${foundRuntimeScripts.join(", ")}`);

if (exists("references/reference-graph.json")) fail("legacy-reference-json", "references/reference-graph.json still exists");
else pass("legacy-reference-json", "removed; executable graph is references/reference-graph.mjs");

if (!exists("references/reference-graph.mjs")) fail("executable-graph", "references/reference-graph.mjs missing");
else {
  const graph = (await import(pathToFileURL(path.join(root, "references/reference-graph.mjs")).href)).default;
  const nodeCount = Object.keys(graph.nodes || {}).length;
  const edgeCount = Object.values(graph.edges || {}).reduce((n, targets) => n + targets.length, 0);
  if (nodeCount >= 40 && edgeCount >= 100) pass("executable-graph", `nodes=${nodeCount}, edges=${edgeCount}`);
  else fail("executable-graph", `too small: nodes=${nodeCount}, edges=${edgeCount}`);
}

try {
  const runtime = await import(pathToFileURL(path.join(root, "references/runtime/dci-reference-runtime.mjs")).href);
  const plan = runtime.routeReferences("debug hallucination verification", { limit: 8, depth: 1, maxRows: 18 });
  const unique = new Set(plan.files.map((item) => item.node.path));
  if (unique.size === plan.files.length) pass("route-deduplication", `${plan.files.length} unique selected files`);
  else fail("route-deduplication", `duplicate route entries: total=${plan.files.length}, unique=${unique.size}`);
  if (plan.files.length <= 48) pass("route-bounded-selection", `${plan.files.length} selected from ${plan.runtime.totals.files}`);
  else fail("route-bounded-selection", `${plan.files.length} selected, expected <= 48`);
} catch (err) {
  fail("runtime-import", err instanceof Error ? err.message : String(err));
}

const routeText = run(["references/runtime/dci-reference-runtime.mjs", "route", "debug hallucination verification", "--limit", "8", "--depth", "1"]);
if (routeText.length <= 16000) pass("route-output-budget", `${routeText.length} chars`);
else fail("route-output-budget", `${routeText.length} chars exceeds 16000`);

const contextText = run(["references/runtime/dci-reference-runtime.mjs", "context", "debug hallucination verification", "--limit", "8", "--depth", "1", "--max-chars", "12000"]);
if (contextText.length <= 13000) pass("context-output-budget", `${contextText.length} chars`);
else fail("context-output-budget", `${contextText.length} chars exceeds 13000`);

for (const script of expectedRuntimeScripts) {
  const out = run([script, "route", "audit smoke", "--limit", "2", "--depth", "0"]);
  if (out.length <= 4000) pass(`folder-output-budget:${script}`, `${out.length} chars`);
  else fail(`folder-output-budget:${script}`, `${out.length} chars exceeds 4000`);
}

const runtimeJsonRefs = contentSearch("reference-graph\\.json").filter((file) => file.endsWith(".mjs") || file.endsWith(".js") || file.endsWith(".ts"));
const allowedJsonRefFiles = new Set(["scripts/dci/runtime-audit.mjs", "scripts/link_references.py"]);
const unexpectedRuntimeJsonRefs = runtimeJsonRefs.filter((file) => !allowedJsonRefFiles.has(file));
if (unexpectedRuntimeJsonRefs.length === 0) pass("no-runtime-json-dependency", "no executable runtime depends on reference-graph.json");
else fail("no-runtime-json-dependency", unexpectedRuntimeJsonRefs.join(", "));

try {
  const { DCIPlugin } = await import(pathToFileURL(path.join(root, ".opencode/plugins/dci.js")).href);
  const plugin = await DCIPlugin({});
  const output = { messages: [{ info: { role: "user" }, parts: [{ type: "text", text: "Build safely" }] }] };
  await plugin["experimental.chat.messages.transform"]({}, output);
  await plugin["experimental.chat.messages.transform"]({}, output);
  const injectedParts = output.messages[0].parts.filter((part) => part.type === "text" && part.text.includes("Deterministic-Cognitive-Infrastructure"));
  if (injectedParts.length === 1) pass("opencode-injection-dedup", "bootstrap injected exactly once across repeated transform calls");
  else fail("opencode-injection-dedup", `bootstrap injected ${injectedParts.length} times`);
} catch (err) {
  fail("opencode-injection-dedup", err instanceof Error ? err.message : String(err));
}

const spamPatterns = [
  ["debug-console", "console\\.log\\((['\"]debug|`debug)"],
  ["todo-placeholder", "PLACEHOLDER|lorem ipsum|FIXME\\s*:|TODO\\s*:([\\s`]|$)"],
  ["ai-slop-claim", "guaranteed perfect|100% universal|godmode|superpower-level"]
];
for (const [name, pattern] of spamPatterns) {
  const matches = contentSearch(pattern).filter((file) => !file.startsWith(".dci/") && !file.startsWith("tests/"));
  if (matches.length === 0) pass(`slop-scan:${name}`, "no matches");
  else warn(`slop-scan:${name}`, matches.join(", "));
}

const report = {
  schemaVersion: "1.0.0",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "fail" : "pass",
  checks,
  warnings,
  failures,
};
fs.mkdirSync(path.join(root, ".dci/cache"), { recursive: true });
fs.writeFileSync(path.join(root, ".dci/cache/runtime-audit-report.json"), JSON.stringify(report, null, 2) + "\n");

for (const check of checks) console.log(`${check.status.toUpperCase()} ${check.name}: ${check.detail}`);
if (warnings.length) console.log(`WARNINGS: ${warnings.length}`);
if (failures.length) {
  console.error(`DCI runtime audit fail: ${failures.length} failures`);
  process.exit(1);
}
console.log(`DCI runtime audit pass: ${checks.filter((c) => c.status === "pass").length}/${checks.length} checks`);
