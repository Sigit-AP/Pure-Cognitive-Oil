import fs from "node:fs";
import path from "node:path";
import { buildManifest, buildResourceMap, buildAgentRouting, buildAudit } from "./index.js";

const root = process.cwd();
const outDir = path.join(root, ".dci", "cache");
fs.mkdirSync(outDir, { recursive: true });

function readSafe(file: string): string {
  try { return fs.readFileSync(path.join(root, file), "utf8"); } catch { return ""; }
}
function escapeJson(s: string): string { return JSON.stringify(s).slice(1, -1); }

const manifest = buildManifest();
const resourceMap = buildResourceMap(manifest);
const routing = buildAgentRouting(manifest);
const audit = buildAudit(manifest);
const startupFiles = resourceMap.professionalLoadPlans.all.slice(0, 12);
const startupContent = startupFiles.map(file => `\n<DCI_FILE path="${file}">\n${readSafe(file)}\n</DCI_FILE>`).join("\n");
const context = `<EXTREMELY_IMPORTANT>\nYou have Deterministic Cognitive Infrastructure.\n\nThis is not optional when a task requires deep cognition, engineering, planning, auditing, debugging, verification, or agentic execution.\n\nRules:\n1. Start with SKILL.md, core iron laws, pipeline phases, quality gates, and verification checklist.\n2. Route each task through DCI context-pack concepts, dependencies, graph neighbors, and professionalLoadPlans.\n3. If even 1% of a DCI resource may apply, select it by axis/concept/workflow/neighbor before acting.\n4. No claim without evidence. No completion without verification. No implementation without understanding.\n5. User instructions remain highest priority.\n\nAudit status: ${audit.status}, score=${audit.readinessScore}, files=${audit.filesIndexed}/${audit.filesExpected}, sections=${manifest.totals.sections}, concepts=${manifest.totals.concepts}, graphEdges=${manifest.totals.edges}.\n\nRoutes: ${routing.routes.map(r => r.trigger).join(", ")}\n\nStartup content follows.\n${startupContent}\n</EXTREMELY_IMPORTANT>`;

const mode = process.argv.includes("--json") ? "json" : "text";
if (mode === "json") {
  console.log(`{\n  "additionalContext": "${escapeJson(context)}"\n}`);
} else {
  console.log(context);
}
