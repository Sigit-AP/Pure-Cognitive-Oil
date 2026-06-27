#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadReferenceRuntime, routeReferences, buildContext } from "../../references/runtime/pco-reference-runtime.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const errors = [];

function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function readJson(rel) { return JSON.parse(fs.readFileSync(path.join(root, rel), "utf8")); }
function walk(dir) {
  const base = path.join(root, dir);
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const ent of fs.readdirSync(base, { withFileTypes: true })) {
    const rel = path.posix.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(rel));
    else out.push(rel);
  }
  return out.sort();
}
function assert(condition, message) { if (!condition) errors.push(message); }

const pkg = readJson("package.json");
for (const script of ["pack:dry", "validate:release", "pco:package-validation"]) {
  assert(Boolean(pkg.scripts?.[script]), `missing package script: ${script}`);
}
for (const rel of ["examples/debugging-failing-test/task.md", "examples/refactor-module/task.md", "examples/review-code/task.md"]) {
  assert(exists(rel), `missing example file: ${rel}`);
}
for (const dir of ["tests/fixtures/routing", "tests/fixtures/package", "tests/fixtures/reference-quality", "tests/ai-benchmarks/tasks", "tests/ai-benchmarks/rubrics", "tests/ai-benchmarks/reports"]) {
  assert(walk(dir).length > 0, `missing fixture/scaffold content: ${dir}`);
}

const runtime = loadReferenceRuntime();
assert(runtime.totals.files >= 1, "reference runtime did not index files");
const routed = routeReferences("debug failing test evidence verification", { limit: 4, depth: 0 });
assert(routed.files.length >= 4, "deterministic routing fixture expected at least 4 files");
const context = buildContext("debug failing test evidence verification", { limit: 4, depth: 0 });
assert(context.includes("<PCO_REFERENCE_RUNTIME_CONTEXT>"), "context pack missing PCO reference runtime header");

for (const file of walk("examples")) {
  if (!file.endsWith(".md")) continue;
  const text = fs.readFileSync(path.join(root, file), "utf8");
  assert(/^#\s+/m.test(text), `example markdown missing title: ${file}`);
  assert(!/benchmark.*(pass|win|better)/i.test(text) || /No benchmark claim/i.test(text), `possible false benchmark claim: ${file}`);
}

if (errors.length) {
  console.error("PCO package validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`PCO package validation pass: examples=${walk("examples").length}, fixtures=${walk("tests/fixtures").length}, benchmarkScaffolds=${walk("tests/ai-benchmarks").length}`);
