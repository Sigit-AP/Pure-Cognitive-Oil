import fs from "node:fs";
import path from "node:path";
import { buildAgentRouting, buildManifest, buildResourceMap } from "./index.js";

const outDir = path.join(process.cwd(), ".pco", "cache");
fs.mkdirSync(outDir, { recursive: true });
const manifest = buildManifest();
const resourceMap = buildResourceMap(manifest);
const routing = buildAgentRouting(manifest);
const core = ["SKILL.md", "README.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md", "references/quality-safety/quality-gates.md", "references/quality-safety/verification-checklist.md"];
const contextPack = {
  schemaVersion: "2.0.0",
  generatedAt: new Date().toISOString(),
  purpose: "Pure Cognitive Oil context pack for AI agents",
  startupFiles: core,
  professionalLoadPlans: resourceMap.professionalLoadPlans,
  loadOrder: resourceMap.loadOrder,
  routing: routing.routes,
  topConcepts: manifest.concepts.slice(0, 120),
  graphNeighbors: resourceMap.neighbors,
  fileSummaries: manifest.files.map(f => ({
    path: f.path,
    kind: f.kind,
    axes: f.cognitiveAxes,
    priority: f.readPriority,
    keywords: f.keywords,
    headings: f.headings.slice(0, 20),
    sections: f.sections.map(s => ({ id: s.id, level: s.level, title: s.title, lines: [s.startLine, s.endLine], axes: s.axes, keywords: s.keywords })),
    dependencies: f.dependencies,
    routingHints: f.routingHints,
    neighbors: resourceMap.neighbors[f.path] || [],
  })),
  operatingRules: [
    "Load startupFiles first for every serious task.",
    "Pick a workflow file by task type, then expand through prerequisites and graphNeighbors.",
    "Use byAxis/professionalLoadPlans to cover thinking, reasoning, agentic, knowledge, reliability, and intelligence.",
    "Use section-level headings and concepts to select targeted context, not only file names.",
    "Before final output, load quality-safety and verification resources.",
    "No indexed file is disposable; every file is selectable by axis, workflow, concept, section, dependency, or graph edge."
  ]
};
fs.writeFileSync(path.join(outDir, "context-pack.json"), JSON.stringify(contextPack, null, 2) + "\n");
console.log(`PCO context pack generated with ${contextPack.fileSummaries.length} file summaries, ${contextPack.topConcepts.length} top concepts.`);
