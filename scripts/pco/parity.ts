import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { buildAudit, buildManifest, buildResourceMap, buildAgentRouting } from "./index.js";

const root = process.cwd();
const outDir = path.join(root, ".pco", "cache");
fs.mkdirSync(outDir, { recursive: true });

function exists(p: string) { return fs.existsSync(path.join(root, p)); }
function filesUnder(dir: string) {
  const base = path.join(root, dir);
  if (!fs.existsSync(base)) return [] as string[];
  const out: string[] = [];
  function walk(d: string) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) walk(full); else out.push(path.relative(root, full).replaceAll(path.sep, "/"));
    }
  }
  walk(base); return out.sort();
}

const manifest = buildManifest();
const audit = buildAudit(manifest);
const resourceMap = buildResourceMap(manifest);
const routing = buildAgentRouting(manifest);
execFileSync(process.execPath, ["scripts/pco/lifecycle.mjs", "--json"], { cwd: root, stdio: ["ignore", "ignore", "inherit"] });
const lifecyclePath = path.join(outDir, "lifecycle-certificate.json");
const lifecycle = fs.existsSync(lifecyclePath) ? JSON.parse(fs.readFileSync(lifecyclePath, "utf8")) : null;

const gates = [
  { gate: "core-skill", status: exists("SKILL.md"), detail: "root SKILL.md exists" },
  { gate: "project-docs", status: exists("README.md") && exists("PLUGIN.md"), detail: "README.md and PLUGIN.md exist" },
  { gate: "hooks", status: exists("hooks/session-start") && exists("hooks/run-hook.cmd") && exists("hooks/hooks.json") && exists("hooks/hooks-cursor.json"), detail: `${filesUnder("hooks").length} hook files` },
  { gate: "skills", status: filesUnder("skills").filter(f => f.endsWith("SKILL.md")).length >= 3, detail: `${filesUnder("skills").filter(f => f.endsWith("SKILL.md")).length} skill files` },
  { gate: "tests", status: filesUnder("tests/pco").length >= 6, detail: `${filesUnder("tests/pco").length} PCO test files` },
  { gate: "bootstrap", status: exists("scripts/pco/bootstrap.mjs") && exists("hooks/hooks.json") && exists("hooks/hooks-cursor.json") && exists("hooks/run-hook.cmd"), detail: "zero-dependency bootstrap and cross-platform hooks exist" },
  { gate: "validation", status: exists("scripts/pco/validate.ts") && audit.status === "pass" && audit.readinessScore === 100, detail: `audit=${audit.status} score=${audit.readinessScore}` },
  { gate: "routing", status: routing.routes.length >= 7 && resourceMap.professionalLoadPlans.all.length > 0, detail: `${routing.routes.length} routes` },
  { gate: "resource-graph", status: manifest.totals.sections > 100 && manifest.totals.concepts >= 100 && manifest.totals.edges > 1000, detail: `${manifest.totals.sections} sections, ${manifest.totals.concepts} concepts, ${manifest.totals.edges} edges` },
  { gate: "six-axis", status: Object.values(audit.axisCoverage).every(v => v.status === "pass"), detail: JSON.stringify(audit.axisCoverage) },
  { gate: "sustained-lifecycle", status: lifecycle?.status === "pass" && lifecycle?.score === 100 && lifecycle?.target?.sustainedLifecycleRatio >= 2, detail: `status=${lifecycle?.status || "missing"} score=${lifecycle?.score ?? "n/a"} ratio=${lifecycle?.target?.sustainedLifecycleRatio ?? "n/a"}` },
];
const passed = gates.filter(g => g.status).length;
const report = {
  schemaVersion: "1.0.0",
  generatedAt: new Date().toISOString(),
  purpose: "PCO readiness audit for portable plugin packaging",
  score: Math.round((passed / gates.length) * 100),
  status: passed === gates.length ? "pass" : "fail",
  gates: gates.map(g => ({ ...g, status: g.status ? "pass" : "fail" })),
  coreCapabilitiesCoverage: {
    bootstrap: exists("scripts/pco/bootstrap.mjs") && exists("hooks/session-start") && exists("hooks/run-hook.cmd"),
    modularSkills: filesUnder("skills").filter(f => f.endsWith("SKILL.md")),
    hooks: filesUnder("hooks"),
    tests: filesUnder("tests/pco"),
    packageScripts: JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).scripts,
    generatedReports: ["manifest.json", "resource-map.json", "agent-routing.json", "context-pack.json", "audit-report.json", "lifecycle-certificate.json", "parity-report.json"],
  },
  nonGoals: ["Claude Code marketplace packaging", "third-party marketplace manifests"],
};
fs.writeFileSync(path.join(outDir, "parity-report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(`PCO parity ${report.status}: score=${report.score}, gates=${passed}/${gates.length}`);
if (report.status !== "pass") process.exit(1);
