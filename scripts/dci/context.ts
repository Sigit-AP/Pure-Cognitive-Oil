import fs from "node:fs";
import path from "node:path";
import { buildAgentRouting, buildManifest, buildResourceMap } from "./index.js";

const outDir = path.join(process.cwd(), ".dci", "cache");
fs.mkdirSync(outDir, { recursive: true });
const manifest = buildManifest();
const resourceMap = buildResourceMap(manifest);
const routing = buildAgentRouting(manifest);
const core = ["SKILL.md", "README.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md", "references/quality-safety/quality-gates.md", "references/quality-safety/verification-checklist.md"];
const contextPack = {
  schemaVersion: "1.0.0",
  generatedAt: new Date().toISOString(),
  purpose: "Deterministic Cognitive Infrastructure context pack for AI agents",
  startupFiles: core,
  loadOrder: resourceMap.loadOrder,
  routing: routing.routes,
  fileSummaries: manifest.files.map(f => ({ path: f.path, kind: f.kind, axes: f.cognitiveAxes, keywords: f.keywords, headings: f.headings.slice(0, 12), dependencies: f.dependencies })),
  operatingRule: "Agent must load startupFiles first, then route through loadOrder/resource map based on task. No indexed file is disposable; every file is selectable by axis, workflow, keyword, or dependency."
};
fs.writeFileSync(path.join(outDir, "context-pack.json"), JSON.stringify(contextPack, null, 2) + "\n");
console.log(`DCI context pack generated with ${contextPack.fileSummaries.length} file summaries.`);
