import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { AgentRouting, AuditReport, CognitiveAxis, DciFileKind, DciFileRecord, DciManifest, ResourceMap } from "./schema.js";
import { AXES } from "./schema.js";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, ".dci", "cache");
const IGNORE_DIRS = new Set([".git", "node_modules", ".dci", "dist"]);
const TEXT_EXT = new Set([".md", ".txt", ".json", ".yaml", ".yml", ".ts", ".js"]);

const AXIS_TERMS: Record<CognitiveAxis, string[]> = {
  thinking: ["thinking", "cognitive", "mental model", "first principles", "synthesis", "depth", "complexity"],
  reasoning: ["reason", "causal", "inference", "uncertainty", "adversarial", "deduction", "logic", "verification"],
  agentic: ["agent", "workflow", "tool", "action", "execute", "plan", "routing", "pipeline"],
  knowledge: ["knowledge", "reference", "pattern", "anti-pattern", "domain", "context", "memory"],
  reliability: ["reliability", "quality", "safety", "error", "failure", "recovery", "hallucination", "checklist"],
  intelligence: ["intelligence", "meta", "learning", "optimization", "creative", "collaborative", "adaptive"],
};

function rel(p: string) { return path.relative(ROOT, p).replaceAll(path.sep, "/"); }
function ensureDir(p: string) { fs.mkdirSync(p, { recursive: true }); }
function sha256(text: Buffer | string) { return crypto.createHash("sha256").update(text).digest("hex"); }
function listFiles(dir = ROOT): string[] {
  const out: string[] = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listFiles(full));
    else if (ent.isFile()) out.push(full);
  }
  return out.sort((a, b) => rel(a).localeCompare(rel(b)));
}
function kindFor(file: string): DciFileKind {
  const r = rel(file);
  if (!r.includes("/")) return "root";
  if (r.startsWith("references/core/")) return "core";
  if (r.startsWith("references/advanced/")) return "advanced";
  if (r.startsWith("references/cognitive-engines/")) return "cognitive-engine";
  if (r.startsWith("references/knowledge-bases/")) return "knowledge-base";
  if (r.startsWith("references/quality-safety/")) return "quality-safety";
  if (r.startsWith("references/workflows/")) return "workflow";
  return "unknown";
}
function headings(text: string): string[] {
  return text.split(/\r?\n/).filter(l => /^#{1,6}\s+/.test(l)).map(l => l.replace(/^#{1,6}\s+/, "").trim()).slice(0, 80);
}
function keywords(text: string): string[] {
  const freq = new Map<string, number>();
  const stop = new Set("the and for with that this from into your you are can will must not but atau yang dan dari untuk dalam agar pada semua file folder model agent agen repo".split(/\s+/));
  for (const w of text.toLowerCase().match(/[a-z][a-z0-9-]{3,}/g) || []) if (!stop.has(w)) freq.set(w, (freq.get(w) || 0) + 1);
  return [...freq.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 24).map(([w])=>w);
}
function axesFor(text: string, r: string): CognitiveAxis[] {
  const lower = `${r}\n${text}`.toLowerCase();
  const scores = AXES.map(axis => [axis, AXIS_TERMS[axis].reduce((n,t)=>n+(lower.includes(t)?1:0),0)] as const);
  const selected = scores.filter(([,s]) => s > 0).map(([a]) => a);
  return selected.length ? selected : ["knowledge"];
}
function capabilitiesFor(kind: DciFileKind, hs: string[], keys: string[]): string[] {
  const caps = new Set<string>();
  caps.add(`kind:${kind}`);
  for (const h of hs.slice(0, 12)) caps.add(`section:${h.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`);
  for (const k of keys.slice(0, 10)) caps.add(`keyword:${k}`);
  return [...caps];
}
function routingFor(r: string, kind: DciFileKind, axes: CognitiveAxis[]): string[] {
  const hints = new Set<string>();
  hints.add(`load-for:${kind}`);
  for (const a of axes) hints.add(`axis:${a}`);
  if (kind === "workflow") hints.add(`workflow:${path.basename(r, path.extname(r))}`);
  if (r.includes("quality") || r.includes("safety")) hints.add("mandatory-before-final");
  if (r.includes("hallucination") || r.includes("verification")) hints.add("mandatory-for-factual-claims");
  if (r.includes("pipeline") || r.includes("iron-laws")) hints.add("mandatory-startup-context");
  return [...hints];
}
function dependenciesFor(r: string, kind: DciFileKind): string[] {
  const deps = ["SKILL.md", "README.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md"].filter(x => x !== r);
  if (kind === "workflow") deps.push("references/workflows/workflow-index.md", "references/quality-safety/quality-gates.md");
  if (kind === "cognitive-engine") deps.push("references/cognitive-engines/meta-cognition.md", "references/cognitive-engines/self-correction.md");
  return [...new Set(deps)];
}
function priority(kind: DciFileKind, r: string): number {
  if (r === "SKILL.md") return 100;
  if (kind === "core") return 90;
  if (kind === "quality-safety") return 85;
  if (kind === "cognitive-engine") return 80;
  if (kind === "workflow") return 70;
  if (kind === "knowledge-base") return 65;
  if (kind === "advanced") return 60;
  return 50;
}

export function buildManifest(): DciManifest {
  const files = listFiles();
  const records: DciFileRecord[] = files.map(full => {
    const r = rel(full); const ext = path.extname(full); const buf = fs.readFileSync(full);
    const text = TEXT_EXT.has(ext) ? buf.toString("utf8") : "";
    const hs = headings(text); const keys = keywords(text); const kind = kindFor(full); const axes = axesFor(text, r);
    return { path: r, kind, folder: path.dirname(r).replace(/\.$/, ""), name: path.basename(r), extension: ext, bytes: buf.length, lines: text ? text.split(/\r?\n/).length : 0, words: (text.match(/\S+/g)||[]).length, sha256: sha256(buf), headings: hs, keywords: keys, cognitiveAxes: axes, capabilities: capabilitiesFor(kind, hs, keys), routingHints: routingFor(r, kind, axes), readPriority: priority(kind, r), dependencies: dependenciesFor(r, kind) };
  });
  const folders: DciManifest["folders"] = {};
  for (const f of records) {
    folders[f.folder] ||= { files: 0, bytes: 0, axes: [] };
    folders[f.folder].files++; folders[f.folder].bytes += f.bytes;
    folders[f.folder].axes = [...new Set([...folders[f.folder].axes, ...f.cognitiveAxes])];
  }
  const coverage = Object.fromEntries(AXES.map(a => [a, records.filter(f => f.cognitiveAxes.includes(a)).length])) as Record<CognitiveAxis, number>;
  return { schemaVersion: "1.0.0", generatedAt: new Date().toISOString(), root: ROOT, totals: { files: records.length, bytes: records.reduce((s,f)=>s+f.bytes,0), lines: records.reduce((s,f)=>s+f.lines,0), words: records.reduce((s,f)=>s+f.words,0), folders: Object.keys(folders).length }, coverage, folders, files: records };
}
export function buildResourceMap(m: DciManifest): ResourceMap {
  const byAxis = Object.fromEntries(AXES.map(a => [a, m.files.filter(f=>f.cognitiveAxes.includes(a)).map(f=>f.path)])) as Record<CognitiveAxis,string[]>;
  const byKind: Record<string,string[]> = {}; const byWorkflow: Record<string,string[]> = {}; const prerequisites: Record<string,string[]> = {};
  for (const f of m.files) { (byKind[f.kind] ||= []).push(f.path); if (f.kind === "workflow") byWorkflow[path.basename(f.path, f.extension)] = [f.path, ...f.dependencies]; prerequisites[f.path] = f.dependencies; }
  const loadOrder = [...m.files].sort((a,b)=>b.readPriority-a.readPriority || a.path.localeCompare(b.path)).map(f=>f.path);
  return { schemaVersion:"1.0.0", generatedAt:new Date().toISOString(), byAxis, byKind, byWorkflow, prerequisites, loadOrder };
}
export function buildAgentRouting(m: DciManifest): AgentRouting {
  const core = ["SKILL.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md", "references/quality-safety/quality-gates.md", "references/quality-safety/verification-checklist.md"];
  const routes = AXES.map(axis => ({ trigger: `need-${axis}`, axes: [axis], requiredFiles: [...new Set([...core, ...m.files.filter(f=>f.cognitiveAxes.includes(axis)).sort((a,b)=>b.readPriority-a.readPriority).slice(0,12).map(f=>f.path)])], optionalFiles: m.files.filter(f=>f.cognitiveAxes.includes(axis)).slice(12).map(f=>f.path), instruction: `Load core files first, then every required ${axis} file. Use optional files when the task touches their keywords or workflow.` }));
  routes.push({ trigger:"any-professional-task", axes: AXES, requiredFiles: core, optionalFiles: m.files.map(f=>f.path), instruction:"Always start with core + quality gates. Route to workflow and cognitive-engine files by task type. Do not ignore optional resources; select them by manifest keywords and dependencies." });
  return { schemaVersion:"1.0.0", generatedAt:new Date().toISOString(), routes };
}
export function buildAudit(m: DciManifest): AuditReport {
  const expected = listFiles().map(rel); const indexed = new Set(m.files.map(f=>f.path));
  const hashes = new Map<string,string[]>(); for (const f of m.files) (hashes.get(f.sha256) || hashes.set(f.sha256, []).get(f.sha256)!).push(f.path);
  const axisCoverage = Object.fromEntries(AXES.map(a => { const n=m.coverage[a]; return [a,{files:n,status:n>=5?"pass":n>0?"weak":"fail"}]; })) as AuditReport["axisCoverage"];
  const qualityGates: AuditReport["qualityGates"] = [
    { gate:"all-files-indexed", status: expected.every(f=>indexed.has(f)) ? "pass":"fail", detail:`${indexed.size}/${expected.length} files indexed`},
    { gate:"core-present", status: ["SKILL.md","references/core/iron-laws.md","references/core/pipeline-phases.md"].every(f=>indexed.has(f)) ? "pass":"fail", detail:"mandatory core files present"},
    { gate:"six-axis-coverage", status: AXES.every(a=>m.coverage[a]>0) ? "pass":"fail", detail: JSON.stringify(m.coverage)},
    { gate:"workflow-routing", status: m.files.some(f=>f.kind==="workflow") ? "pass":"fail", detail:`${m.files.filter(f=>f.kind==="workflow").length} workflow files`},
    { gate:"quality-safety-routing", status: m.files.some(f=>f.kind==="quality-safety") ? "pass":"fail", detail:`${m.files.filter(f=>f.kind==="quality-safety").length} quality/safety files`},
  ];
  const fails = qualityGates.filter(g=>g.status==="fail").length + Object.values(axisCoverage).filter(x=>x.status==="fail").length;
  const warns = qualityGates.filter(g=>g.status==="warn").length + Object.values(axisCoverage).filter(x=>x.status==="weak").length;
  const readinessScore = Math.max(0, Math.round(100 - fails*20 - warns*5));
  return { schemaVersion:"1.0.0", generatedAt:new Date().toISOString(), filesExpected: expected.length, filesIndexed: indexed.size, missingFiles: expected.filter(f=>!indexed.has(f)), unreadableFiles: [], duplicateHashes: [...hashes.entries()].filter(([,v])=>v.length>1).map(([sha256,files])=>({sha256,files})), axisCoverage, folderCoverage: Object.entries(m.folders).map(([folder,v])=>({folder,files:v.files,status:v.files>0?"pass":"fail"})), qualityGates, readinessScore, status: fails?"fail":warns?"warn":"pass" };
}
function writeJson(name: string, data: unknown) { ensureDir(OUT_DIR); fs.writeFileSync(path.join(OUT_DIR, name), JSON.stringify(data, null, 2)+"\n"); }
export function runAll() { const m=buildManifest(); const rm=buildResourceMap(m); const ar=buildAgentRouting(m); const audit=buildAudit(m); writeJson("manifest.json",m); writeJson("resource-map.json",rm); writeJson("agent-routing.json",ar); writeJson("audit-report.json",audit); console.log(`DCI indexed ${m.totals.files} files, ${m.totals.words} words. Audit: ${audit.status} score=${audit.readinessScore}`); }
if (import.meta.url === `file://${process.argv[1]}`) runAll();
