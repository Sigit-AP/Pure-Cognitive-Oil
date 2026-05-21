import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { buildAudit, buildManifest, buildResourceMap, buildAgentRouting } from "./index.js";

const root = process.cwd();
const manifest = buildManifest();
const audit = buildAudit(manifest);
const resourceMap = buildResourceMap(manifest);
const routing = buildAgentRouting(manifest);
const errors: string[] = [];
const requiredStartup = ["SKILL.md", "README.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md", "references/quality-safety/quality-gates.md", "references/quality-safety/verification-checklist.md"];

for (const file of requiredStartup) if (!fs.existsSync(path.join(root, file))) errors.push(`missing startup file: ${file}`);
if (audit.status !== "pass") errors.push(`audit not pass: ${audit.status}`);
if (audit.readinessScore !== 100) errors.push(`readinessScore is not 100: ${audit.readinessScore}`);
if (audit.filesIndexed !== audit.filesExpected) errors.push(`file coverage mismatch ${audit.filesIndexed}/${audit.filesExpected}`);
for (const [axis, v] of Object.entries(audit.axisCoverage)) if (v.status !== "pass") errors.push(`axis ${axis} not pass`);
for (const gate of audit.qualityGates) if (gate.status !== "pass") errors.push(`gate ${gate.gate} not pass: ${gate.detail}`);
for (const file of manifest.files) {
  if (file.extension === ".md" && file.sections.length === 0) errors.push(`md without sections: ${file.path}`);
  if (file.words >= 5 && file.keywords.length === 0) errors.push(`text file without keywords: ${file.path}`);
  if (file.words >= 5 && file.cognitiveAxes.length === 0) errors.push(`text file without axis: ${file.path}`);
  if (!resourceMap.neighbors[file.path]?.length && manifest.files.length > 1) errors.push(`file without graph neighbors: ${file.path}`);
}
const routeNames = new Set(routing.routes.map(r => r.trigger));
for (const name of ["need-thinking", "need-reasoning", "need-agentic", "need-knowledge", "need-reliability", "need-intelligence", "any-professional-task"]) if (!routeNames.has(name)) errors.push(`missing route: ${name}`);
for (const [axis, plan] of Object.entries(resourceMap.professionalLoadPlans)) if (!plan.length) errors.push(`empty professional load plan: ${axis}`);
execFileSync(process.execPath, ["scripts/dci/lifecycle.mjs", "--json"], { cwd: root, stdio: ["ignore", "ignore", "inherit"] });
const lifecycleReportPath = path.join(root, ".dci", "cache", "lifecycle-certificate.json");
if (!fs.existsSync(lifecycleReportPath)) errors.push("missing lifecycle certificate: run npm run dci:lifecycle");
else {
  const lifecycle = JSON.parse(fs.readFileSync(lifecycleReportPath, "utf8"));
  if (lifecycle.status !== "pass") errors.push(`lifecycle not pass: ${lifecycle.status}`);
  if ((lifecycle.score ?? 0) !== 100) errors.push(`lifecycle score is not 100: ${lifecycle.score}`);
  if ((lifecycle.target?.sustainedLifecycleRatio ?? 0) < 2) errors.push(`lifecycle sustained ratio below 2: ${lifecycle.target?.sustainedLifecycleRatio}`);
  for (const phase of ["first-use", "mid-use", "runtime", "final-use"]) {
    const found = lifecycle.phases?.find((item: { name: string; status: string }) => item.name === phase);
    if (!found || found.status !== "pass") errors.push(`lifecycle phase not pass: ${phase}`);
  }
}

if (errors.length) {
  console.error("DCI validation failed:");
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`DCI validation pass: files=${manifest.totals.files}, sections=${manifest.totals.sections}, concepts=${manifest.totals.concepts}, edges=${manifest.totals.edges}, score=${audit.readinessScore}`);
