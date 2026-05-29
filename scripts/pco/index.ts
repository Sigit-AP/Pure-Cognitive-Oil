import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { AgentRouting, AuditReport, CognitiveAxis, DciConcept, DciEdge, DciFileKind, DciFileRecord, DciLink, DciManifest, DciSection, ResourceMap } from "./schema.js";
import { AXES } from "./schema.js";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, ".pco", "cache");
const IGNORE_DIRS = new Set([".git", "node_modules", ".pco", "dist"]);
const TEXT_EXT = new Set([".md", ".mdc", ".markdown", ".txt", ".json", ".mjs", ".yaml", ".yml", ".ts", ".js", ".sh", ".cmd"]);
const STOP = new Set("the and for with that this from into your you are can will must not but atau yang dan dari untuk dalam agar pada semua file folder model agent agen repo system using used use when then than every each more less their there where have has been into over under across without with within through should would could into karena untuk dengan semua setiap dari dalam yang pada agar lebih atau bukan jika maka saat ini itu adalah sebagai secara tidak sudah bisa hanya akan dan nya saya kamu model ai repo file folder".split(/\s+/));
const AXIS_TERMS: Record<CognitiveAxis, string[]> = {
  thinking: ["thinking", "cognitive", "mental", "first principles", "synthesis", "depth", "complexity", "abstraction"],
  reasoning: ["reason", "causal", "inference", "uncertainty", "adversarial", "deduction", "logic", "verify", "evidence"],
  agentic: ["agent", "workflow", "tool", "action", "execute", "plan", "routing", "pipeline", "loop"],
  knowledge: ["knowledge", "reference", "pattern", "anti-pattern", "domain", "context", "memory", "schema"],
  reliability: ["reliability", "quality", "safety", "error", "failure", "recovery", "hallucination", "checklist", "guardrail"],
  intelligence: ["intelligence", "meta", "learning", "optimization", "creative", "collaborative", "adaptive", "emergent"],
};
function rel(p: string) { return path.relative(ROOT, p).replaceAll(path.sep, "/"); }
function ensureDir(p: string) { fs.mkdirSync(p, { recursive: true }); }
function sha256(text: Buffer | string) { return crypto.createHash("sha256").update(text).digest("hex"); }
function slug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80); }
function listFiles(dir = ROOT): string[] {
  const out: string[] = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listFiles(full)); else if (ent.isFile()) out.push(full);
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
  if (r.startsWith("bin/") || r.startsWith("hooks/") || r.startsWith("scripts/")) return "root";
  if (r.startsWith("skills/")) return "root";
  return "unknown";
}
function headings(text: string): string[] { return text.split(/\r?\n/).filter(l => /^#{1,6}\s+/.test(l)).map(l => l.replace(/^#{1,6}\s+/, "").trim()); }
function topKeywords(text: string, limit = 30): string[] {
  const freq = new Map<string, number>();
  for (const w of text.toLowerCase().match(/[a-z][a-z0-9-]{3,}/g) || []) if (!STOP.has(w)) freq.set(w, (freq.get(w) || 0) + 1);
  return [...freq.entries()].sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([w])=>w);
}
function axesFor(text: string, r = ""): CognitiveAxis[] {
  const lower = `${r}\n${text}`.toLowerCase();
  const scores = AXES.map(axis => [axis, AXIS_TERMS[axis].reduce((n,t)=>n+(lower.includes(t)?1:0),0)] as const);
  const selected = scores.filter(([,s]) => s > 0).map(([a]) => a);
  return selected.length ? selected : ["knowledge"];
}
function extractSections(text: string, filePath: string): DciSection[] {
  const lines = text.split(/\r?\n/);
  const heads = lines.map((line, i) => ({ line, i, m: /^(#{1,6})\s+(.+?)\s*$/.exec(line) })).filter(x => x.m);
  return heads.map((h, idx) => {
    const start = h.i + 1; const end = (heads[idx + 1]?.i ?? lines.length);
    const body = lines.slice(h.i, end).join("\n"); const title = h.m![2].trim();
    return { id: `${filePath}#${slug(title)}`, level: h.m![1].length, title, startLine: start, endLine: end, words: (body.match(/\S+/g)||[]).length, keywords: topKeywords(body, 12), axes: axesFor(body, title) };
  });
}
function extractLinks(text: string, currentPath: string): DciLink[] {
  const out: DciLink[] = []; const lines = text.split(/\r?\n/);
  const base = path.posix.dirname(currentPath);
  lines.forEach((line, idx) => {
    for (const m of line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      const target = m[2].split("#")[0]; if (!target || /^(https?:|mailto:)/.test(target)) { out.push({ label: m[1], target: m[2], line: idx + 1 }); continue; }
      const resolved = path.posix.normalize(path.posix.join(base, target));
      out.push({ label: m[1], target: m[2], resolvedPath: resolved, line: idx + 1 });
    }
  });
  return out;
}
function capabilitiesFor(kind: DciFileKind, sections: DciSection[], keys: string[]): string[] {
  const caps = new Set<string>([`kind:${kind}`]);
  for (const s of sections.slice(0, 20)) caps.add(`section:${slug(s.title)}`);
  for (const k of keys.slice(0, 14)) caps.add(`keyword:${k}`);
  for (const s of sections) for (const a of s.axes) caps.add(`section-axis:${a}`);
  return [...caps];
}
function routingFor(r: string, kind: DciFileKind, axes: CognitiveAxis[], sections: DciSection[]): string[] {
  const hints = new Set<string>([`load-for:${kind}`]);
  for (const a of axes) hints.add(`axis:${a}`);
  for (const s of sections.slice(0, 8)) hints.add(`section:${slug(s.title)}`);
  if (kind === "workflow") hints.add(`workflow:${path.basename(r, path.extname(r))}`);
  if (/quality|safety|verification|checklist/.test(r)) hints.add("mandatory-before-final");
  if (/hallucination|verification|uncertainty/.test(r)) hints.add("mandatory-for-factual-claims");
  if (/pipeline|iron-laws|skill/i.test(r)) hints.add("mandatory-startup-context");
  return [...hints];
}
function dependenciesFor(r: string, kind: DciFileKind, links: DciLink[]): string[] {
  const deps = ["SKILL.md", "README.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md"].filter(x => x !== r);
  if (kind === "workflow") deps.push("references/workflows/workflow-index.md", "references/quality-safety/quality-gates.md");
  if (kind === "cognitive-engine") deps.push("references/cognitive-engines/meta-cognition.md", "references/cognitive-engines/self-correction.md");
  for (const l of links) if (l.resolvedPath) deps.push(l.resolvedPath);
  return [...new Set(deps)];
}
function priority(kind: DciFileKind, r: string): number {
  if (r === "SKILL.md") return 100; if (kind === "core") return 90; if (kind === "quality-safety") return 86; if (kind === "cognitive-engine") return 82; if (kind === "workflow") return 76; if (kind === "knowledge-base") return 70; if (kind === "advanced") return 65; return 50;
}
function buildConcepts(files: DciFileRecord[]): DciConcept[] {
  const map = new Map<string, { count: number; files: Set<string>; axes: Set<CognitiveAxis> }>();
  for (const f of files) for (const k of f.keywords) { const v = map.get(k) || { count: 0, files: new Set<string>(), axes: new Set<CognitiveAxis>() }; v.count++; v.files.add(f.path); f.cognitiveAxes.forEach(a=>v.axes.add(a)); map.set(k, v); }
  return [...map.entries()].map(([term,v])=>({term,count:v.count,files:[...v.files].sort(),axes:[...v.axes]})).sort((a,b)=>b.count-a.count || a.term.localeCompare(b.term)).slice(0, 240);
}
function buildGraph(files: DciFileRecord[], concepts: DciConcept[]): DciEdge[] {
  const edges: DciEdge[] = [];
  for (const f of files) for (const d of f.dependencies) if (files.some(x=>x.path===d)) edges.push({ from:f.path, to:d, type:"dependency", weight:10, reason:"explicit/core dependency" });
  for (const f of files) for (const l of f.links) if (l.resolvedPath && files.some(x=>x.path===l.resolvedPath)) edges.push({ from:f.path, to:l.resolvedPath, type:"link", weight:8, reason:`markdown link: ${l.label}` });
  for (const c of concepts.filter(c=>c.files.length>1).slice(0,80)) for (let i=0;i<c.files.length;i++) for (let j=i+1;j<c.files.length;j++) edges.push({ from:c.files[i], to:c.files[j], type:"shared-concept", weight:Math.min(6,c.count), reason:`shared concept: ${c.term}` });
  const byFolder = new Map<string,string[]>(); for (const f of files) { const arr=byFolder.get(f.folder)||[]; arr.push(f.path); byFolder.set(f.folder,arr); }
  for (const arr of byFolder.values()) for (let i=0;i<arr.length;i++) for (let j=i+1;j<arr.length;j++) edges.push({from:arr[i],to:arr[j],type:"same-folder",weight:2,reason:"same folder"});
  return edges;
}

export function buildManifest(): DciManifest {
  const records: DciFileRecord[] = listFiles().map(full => {
    const r = rel(full); const ext = path.extname(full); const buf = fs.readFileSync(full); const text = TEXT_EXT.has(ext) ? buf.toString("utf8") : "";
    const sections = extractSections(text, r); const hs = sections.map(s=>s.title); const links = extractLinks(text, r); const keys = topKeywords(text); const kind = kindFor(full); const axes = axesFor(text, r);
    return { path: r, kind, folder: path.dirname(r).replace(/^\.$/, ""), name: path.basename(r), extension: ext, bytes: buf.length, lines: text ? text.split(/\r?\n/).length : 0, words: (text.match(/\S+/g)||[]).length, sha256: sha256(buf), headings: hs, sections, links, keywords: keys, cognitiveAxes: axes, capabilities: capabilitiesFor(kind, sections, keys), routingHints: routingFor(r, kind, axes, sections), readPriority: priority(kind, r), dependencies: dependenciesFor(r, kind, links), coverageSignature: { hasHeadings: hs.length>0, hasSections: sections.length>0, hasLinks: links.length>0, mappedAxes: axes.length, mappedConcepts: keys.length } };
  });
  const concepts = buildConcepts(records); const graph = buildGraph(records, concepts);
  const folders: DciManifest["folders"] = {};
  for (const f of records) { folders[f.folder] ||= { files:0, bytes:0, axes:[], concepts:[] }; folders[f.folder].files++; folders[f.folder].bytes += f.bytes; folders[f.folder].axes = [...new Set([...folders[f.folder].axes, ...f.cognitiveAxes])]; folders[f.folder].concepts = [...new Set([...folders[f.folder].concepts, ...f.keywords.slice(0,8)])].slice(0,50); }
  const coverage = Object.fromEntries(AXES.map(a => [a, records.filter(f => f.cognitiveAxes.includes(a) || f.sections.some(s=>s.axes.includes(a))).length])) as Record<CognitiveAxis, number>;
  return { schemaVersion:"2.0.0", generatedAt:new Date().toISOString(), root:ROOT, totals:{ files:records.length, bytes:records.reduce((s,f)=>s+f.bytes,0), lines:records.reduce((s,f)=>s+f.lines,0), words:records.reduce((s,f)=>s+f.words,0), folders:Object.keys(folders).length, sections:records.reduce((s,f)=>s+f.sections.length,0), links:records.reduce((s,f)=>s+f.links.length,0), concepts:concepts.length, edges:graph.length }, coverage, folders, concepts, graph, files:records };
}
export function buildResourceMap(m: DciManifest): ResourceMap {
  const byAxis = Object.fromEntries(AXES.map(a => [a, m.files.filter(f=>f.cognitiveAxes.includes(a)||f.sections.some(s=>s.axes.includes(a))).map(f=>f.path)])) as Record<CognitiveAxis,string[]>;
  const byKind: Record<string,string[]> = {}; const byWorkflow: Record<string,string[]> = {}; const byConcept: Record<string,string[]> = {}; const byCapability: Record<string,string[]> = {}; const prerequisites: Record<string,string[]> = {}; const neighbors: ResourceMap["neighbors"] = {};
  for (const f of m.files) { (byKind[f.kind] ||= []).push(f.path); if (f.kind==="workflow") byWorkflow[path.basename(f.path,f.extension)] = [f.path,...f.dependencies]; prerequisites[f.path]=f.dependencies; for (const k of f.keywords) (byConcept[k] ||= []).push(f.path); for (const c of f.capabilities) (byCapability[c] ||= []).push(f.path); }
  for (const e of m.graph) { (neighbors[e.from] ||= []).push({ path:e.to, weight:e.weight, reason:e.reason }); (neighbors[e.to] ||= []).push({ path:e.from, weight:e.weight, reason:e.reason }); }
  for (const k of Object.keys(neighbors)) neighbors[k] = neighbors[k].sort((a,b)=>b.weight-a.weight).slice(0,30);
  const loadOrder = [...m.files].sort((a,b)=>b.readPriority-a.readPriority || b.words-a.words || a.path.localeCompare(b.path)).map(f=>f.path);
  const professionalLoadPlans = Object.fromEntries([...AXES,"all" as const].map(a => [a, a==="all" ? loadOrder : [...new Set(["SKILL.md","references/core/iron-laws.md","references/core/pipeline-phases.md","references/quality-safety/quality-gates.md",...byAxis[a]])]])) as ResourceMap["professionalLoadPlans"];
  return { schemaVersion:"2.0.0", generatedAt:new Date().toISOString(), byAxis, byKind, byWorkflow, byConcept, byCapability, prerequisites, neighbors, loadOrder, professionalLoadPlans };
}
export function buildAgentRouting(m: DciManifest): AgentRouting {
  const core = ["SKILL.md", "README.md", "references/core/iron-laws.md", "references/core/pipeline-phases.md", "references/quality-safety/quality-gates.md", "references/quality-safety/verification-checklist.md"];
  const routes = AXES.map(axis => { const axisFiles=m.files.filter(f=>f.cognitiveAxes.includes(axis)||f.sections.some(s=>s.axes.includes(axis))).sort((a,b)=>b.readPriority-a.readPriority); return { trigger:`need-${axis}`, axes:[axis], requiredFiles:[...new Set([...core,...axisFiles.slice(0,18).map(f=>f.path)])], optionalFiles:axisFiles.slice(18).map(f=>f.path), concepts:[...new Set(axisFiles.flatMap(f=>f.keywords.slice(0,8)))].slice(0,40), instruction:`Load core files first. Then load every required ${axis} file and its prerequisites/neighbors. Use optional files by concept match; do not answer before quality gates.` }; });
  routes.push({ trigger:"any-professional-task", axes:AXES, requiredFiles:core, optionalFiles:m.files.map(f=>f.path), concepts:m.concepts.slice(0,80).map(c=>c.term), instruction:"Mandatory PCO mode: load startup core, select workflow by task, select cognitive engines by axis, expand with graph neighbors and concept map, verify with quality/safety files before final." });
  return { schemaVersion:"2.0.0", generatedAt:new Date().toISOString(), routes };
}
export function buildAudit(m: DciManifest): AuditReport {
  const expected=listFiles().map(rel); const indexed=new Set(m.files.map(f=>f.path)); const hashes=new Map<string,string[]>(); for(const f of m.files)(hashes.get(f.sha256)||hashes.set(f.sha256,[]).get(f.sha256)!).push(f.path);
  const axisCoverage=Object.fromEntries(AXES.map(a=>{ const files=m.coverage[a]; const sections=m.files.reduce((n,f)=>n+f.sections.filter(s=>s.axes.includes(a)).length,0); return [a,{files,sections,status:files>=5&&sections>=5?"pass":files>0?"weak":"fail"}]; })) as AuditReport["axisCoverage"];
  const folderCoverage=Object.entries(m.folders).map(([folder,v])=>{ const infrastructureFolder = ["bin", "hooks", "scripts", "skills"].some(prefix => folder === prefix || folder.startsWith(`${prefix}/`)); const hasCoverage = v.files>0&&v.axes.length>0&&(v.concepts.length>0||infrastructureFolder); return {folder,files:v.files,axes:v.axes.length,concepts:v.concepts.length,status:(hasCoverage?"pass":"fail") as "pass" | "fail"}; });
  const qualityGates: AuditReport["qualityGates"]=[
    {gate:"all-files-indexed",status:expected.every(f=>indexed.has(f))?"pass":"fail",detail:`${indexed.size}/${expected.length} files indexed`},
    {gate:"all-md-sectioned",status:m.files.filter(f=>f.extension===".md").every(f=>f.sections.length>0)?"pass":"fail",detail:`${m.totals.sections} sections extracted`},
    {gate:"concept-graph-built",status:m.totals.concepts>=50&&m.totals.edges>=100?"pass":"fail",detail:`${m.totals.concepts} concepts, ${m.totals.edges} edges`},
    {gate:"six-axis-coverage",status:AXES.every(a=>m.coverage[a]>0)?"pass":"fail",detail:JSON.stringify(m.coverage)},
    {gate:"professional-load-plan",status:m.files.every(f=>f.readPriority>0&&f.dependencies.length>0)?"pass":"fail",detail:"every file has priority and dependencies"},
    {gate:"workflow-routing",status:m.files.some(f=>f.kind==="workflow")?"pass":"fail",detail:`${m.files.filter(f=>f.kind==="workflow").length} workflow files`},
    {gate:"quality-safety-routing",status:m.files.some(f=>f.kind==="quality-safety")?"pass":"fail",detail:`${m.files.filter(f=>f.kind==="quality-safety").length} quality/safety files`},
  ];
  const fails=qualityGates.filter(g=>g.status==="fail").length+Object.values(axisCoverage).filter(x=>x.status==="fail").length+folderCoverage.filter(x=>x.status==="fail").length; const warns=Object.values(axisCoverage).filter(x=>x.status==="weak").length; const readinessScore=Math.max(0,Math.round(100-fails*15-warns*5));
  return { schemaVersion:"2.0.0", generatedAt:new Date().toISOString(), filesExpected:expected.length, filesIndexed:indexed.size, missingFiles:expected.filter(f=>!indexed.has(f)), unreadableFiles:[], duplicateHashes:[...hashes.entries()].filter(([,v])=>v.length>1).map(([sha256,files])=>({sha256,files})), axisCoverage, folderCoverage, qualityGates, readinessScore, status:fails?"fail":warns?"warn":"pass" };
}
function writeJson(name:string,data:unknown){ensureDir(OUT_DIR);fs.writeFileSync(path.join(OUT_DIR,name),JSON.stringify(data,null,2)+"\n");}
export function runAll(){const m=buildManifest();const rm=buildResourceMap(m);const ar=buildAgentRouting(m);const audit=buildAudit(m);writeJson("manifest.json",m);writeJson("resource-map.json",rm);writeJson("agent-routing.json",ar);writeJson("audit-report.json",audit);console.log(`PCO indexed ${m.totals.files} files, ${m.totals.sections} sections, ${m.totals.concepts} concepts, ${m.totals.edges} edges. Audit: ${audit.status} score=${audit.readinessScore}`);} if(import.meta.url===`file://${process.argv[1]}`)runAll();
