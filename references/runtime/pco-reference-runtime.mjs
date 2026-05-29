#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const REFS = path.join(ROOT, "references");
const RELATED_START = "<!-- PCO-RELATED-START -->";
const RELATED_END = "<!-- PCO-RELATED-END -->";
const FOLDERS = ["core", "cognitive-engines", "quality-safety", "knowledge-bases", "advanced", "workflows"];
const STARTUP = [
  "core/iron-laws.md",
  "core/pipeline-phases.md",
  "quality-safety/quality-gates.md",
  "quality-safety/verification-checklist.md",
  "cognitive-engines/hallucination-defense.md",
  "cognitive-engines/self-correction.md",
];
const AXIS_TERMS = {
  thinking: ["thinking", "cognitive", "mental", "first", "principles", "synthesis", "depth", "complexity", "abstraction"],
  reasoning: ["reason", "causal", "inference", "uncertainty", "adversarial", "logic", "verify", "evidence", "decision"],
  agentic: ["agent", "workflow", "tool", "action", "execute", "plan", "routing", "pipeline", "loop", "phase"],
  knowledge: ["knowledge", "reference", "pattern", "anti-pattern", "domain", "context", "memory", "schema", "model"],
  reliability: ["reliability", "quality", "safety", "error", "failure", "recovery", "hallucination", "checklist", "guardrail"],
  intelligence: ["intelligence", "meta", "learning", "optimization", "creative", "collaborative", "adaptive", "emergent"],
};
const STOP = new Set(`the and for with that this from into your you are can will must not but atau yang dan dari untuk dalam agar pada semua file folder model agent agen repo system using used use when then than every each more less their there where have has been into over under across without within through should would could karena dengan semua setiap bukan jika maka saat ini itu adalah sebagai secara tidak sudah bisa hanya akan nya saya kamu output input`.split(/\s+/));

let staticGraph = null;
try {
  staticGraph = (await import(pathToFileURL(path.join(REFS, "reference-graph.mjs")).href)).default;
} catch {
  staticGraph = null;
}

function exists(p) { return fs.existsSync(p); }
function readText(p) { return fs.readFileSync(p, "utf8"); }
function relRef(full) { return path.relative(REFS, full).replaceAll(path.sep, "/"); }
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 96); }
function uniq(xs) { return [...new Set(xs.filter(Boolean))]; }
function estimateTokens(text) { return Math.ceil((text || "").length / 4); }
function category(rel) { const parts = rel.split("/"); return parts.length > 1 ? parts[0] : "."; }
function stripRelated(text) {
  const s = text.indexOf(RELATED_START);
  const e = text.indexOf(RELATED_END);
  if (s >= 0 && e > s) return `${text.slice(0, s).trim()}\n`;
  return text;
}
function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9-]{2,}/g) || []).filter(w => !STOP.has(w));
}
function topKeywords(text, limit = 24) {
  const m = new Map();
  for (const w of tokenize(text)) m.set(w, (m.get(w) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([w]) => w);
}
function titleOf(text, rel) {
  const m = /^#\s+(.+)$/m.exec(text);
  return m ? m[1].trim() : path.basename(rel, path.extname(rel)).replace(/-/g, " ");
}
function headingsOf(text) {
  return text.split(/\r?\n/).filter(l => /^#{1,6}\s+/.test(l)).map(l => l.replace(/^#{1,6}\s+/, "").trim());
}
function axesFor(text, rel = "") {
  const lower = `${rel}\n${text}`.toLowerCase();
  const axes = Object.entries(AXIS_TERMS).filter(([, terms]) => terms.some(t => lower.includes(t))).map(([axis]) => axis);
  return axes.length ? axes : ["knowledge"];
}
function extractSections(text, rel) {
  const lines = text.split(/\r?\n/);
  const heads = [];
  lines.forEach((line, i) => {
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (m) heads.push({ i, level: m[1].length, title: m[2].trim() });
  });
  return heads.map((h, idx) => {
    const end = heads[idx + 1]?.i ?? lines.length;
    const body = lines.slice(h.i, end).join("\n");
    return {
      id: `${rel}#${slug(h.title)}`,
      level: h.level,
      title: h.title,
      startLine: h.i + 1,
      endLine: end,
      words: (body.match(/\S+/g) || []).length,
      keywords: topKeywords(body, 12),
      axes: axesFor(body, h.title),
    };
  });
}
function markdownLinks(text, rel) {
  const out = [];
  const base = path.posix.dirname(rel);
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const m of line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      const target = m[2].split("#")[0];
      if (!target || /^(https?:|mailto:)/.test(target)) continue;
      const resolved = path.posix.normalize(path.posix.join(base, target));
      if (resolved.endsWith(".md")) out.push({ label: m[1], target: resolved, line: idx + 1 });
    }
  });
  return out;
}
function walkMarkdown(dir = REFS) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === ".git" || ent.name === "node_modules") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkMarkdown(full));
    if (ent.isFile() && ent.name.endsWith(".md") && ent.name !== "REFERENCE_GRAPH.md") out.push(full);
  }
  return out.sort((a, b) => relRef(a).localeCompare(relRef(b)));
}
function addEdge(map, from, to, weight, reason) {
  if (!from || !to || from === to) return;
  const arr = map.get(from) || [];
  const old = arr.find(e => e.path === to);
  if (old) {
    if (weight > old.weight) { old.weight = weight; old.reason = reason; }
  } else arr.push({ path: to, weight, reason });
  map.set(from, arr);
}
function buildNodes() {
  return walkMarkdown().map(full => {
    const rel = relRef(full);
    const text = readText(full);
    const clean = stripRelated(text);
    const sections = extractSections(clean, rel);
    const keywords = topKeywords(clean);
    return {
      path: rel,
      absolutePath: full,
      folder: category(rel),
      title: titleOf(clean, rel),
      headings: headingsOf(clean),
      sections,
      keywords,
      axes: axesFor(clean, rel),
      links: markdownLinks(clean, rel),
      words: (clean.match(/\S+/g) || []).length,
      text: clean,
    };
  });
}
function buildEdges(nodes) {
  const byPath = new Map(nodes.map(n => [n.path, n]));
  const edges = new Map(nodes.map(n => [n.path, []]));
  if (staticGraph?.edges) {
    for (const [from, targets] of Object.entries(staticGraph.edges)) {
      for (const to of targets || []) if (byPath.has(from) && byPath.has(to)) addEdge(edges, from, to, 11, "generated reference graph");
    }
  }
  for (const n of nodes) for (const l of n.links) if (byPath.has(l.target)) addEdge(edges, n.path, l.target, 10, `markdown link: ${l.label}`);
  const byFolder = new Map();
  for (const n of nodes) (byFolder.get(n.folder) || byFolder.set(n.folder, []).get(n.folder)).push(n);
  for (const group of byFolder.values()) for (const a of group) for (const b of group) if (a.path !== b.path) addEdge(edges, a.path, b.path, 3, "same reference subsystem");
  const byKeyword = new Map();
  for (const n of nodes) for (const k of n.keywords.slice(0, 10)) (byKeyword.get(k) || byKeyword.set(k, []).get(k)).push(n.path);
  for (const [kw, paths] of byKeyword) {
    if (paths.length < 2 || paths.length > 10) continue;
    for (const a of paths) for (const b of paths) if (a !== b) addEdge(edges, a, b, 5, `shared concept: ${kw}`);
  }
  const neighbors = {};
  for (const [k, v] of edges) neighbors[k] = v.sort((a, b) => b.weight - a.weight || a.path.localeCompare(b.path)).slice(0, 18);
  return neighbors;
}
export function loadReferenceRuntime() {
  const nodes = buildNodes();
  const neighbors = buildEdges(nodes);
  const folders = Object.fromEntries(FOLDERS.map(folder => {
    const files = nodes.filter(n => n.folder === folder);
    return [folder, {
      files: files.map(f => f.path),
      axes: uniq(files.flatMap(f => f.axes)),
      concepts: uniq(files.flatMap(f => f.keywords.slice(0, 8))).slice(0, 40),
      script: `${folder}/runtime.mjs`,
    }];
  }));
  return {
    root: ROOT,
    referencesRoot: REFS,
    generatedGraphLoaded: Boolean(staticGraph),
    nodes,
    byPath: new Map(nodes.map(n => [n.path, n])),
    neighbors,
    folders,
    totals: {
      files: nodes.length,
      sections: nodes.reduce((s, n) => s + n.sections.length, 0),
      words: nodes.reduce((s, n) => s + n.words, 0),
      edges: Object.values(neighbors).reduce((s, n) => s + n.length, 0),
    },
  };
}
function scoreNode(query, node) {
  const qs = tokenize(query);
  if (!qs.length) return STARTUP.includes(node.path) ? 100 : 10;
  let score = 0;
  const title = node.title.toLowerCase();
  const p = node.path.toLowerCase();
  const kw = new Set(node.keywords);
  const axes = new Set(node.axes);
  for (const q of qs) {
    if (p.includes(q)) score += 20;
    if (title.includes(q)) score += 18;
    if (kw.has(q)) score += 14;
    if ([...kw].some(k => k.includes(q) || q.includes(k))) score += 8;
    if (axes.has(q)) score += 8;
    for (const h of node.headings.slice(0, 20)) if (h.toLowerCase().includes(q)) score += 5;
  }
  if (STARTUP.includes(node.path)) score += 3;
  return score;
}
function parseArgs(argv) {
  const opts = { limit: 12, depth: 1, maxChars: 24000, maxRows: 18, maxFiles: 18, maxSelected: 0, neighborLimit: 2, folder: "" };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") opts.limit = Number(argv[++i] || opts.limit);
    else if (a === "--depth") opts.depth = Number(argv[++i] || opts.depth);
    else if (a === "--max-chars") opts.maxChars = Number(argv[++i] || opts.maxChars);
    else if (a === "--max-rows") opts.maxRows = Number(argv[++i] || opts.maxRows);
    else if (a === "--max-files") opts.maxFiles = Number(argv[++i] || opts.maxFiles);
    else if (a === "--max-selected") opts.maxSelected = Number(argv[++i] || opts.maxSelected);
    else if (a === "--neighbor-limit") opts.neighborLimit = Number(argv[++i] || opts.neighborLimit);
    else if (a === "--folder") opts.folder = argv[++i] || "";
    else if (a === "--startup") opts.includeStartup = true;
    else if (a === "--no-startup") opts.includeStartup = false;
    else rest.push(a);
  }
  return { opts, rest };
}
export function routeReferences(query = "", options = {}) {
  const rt = loadReferenceRuntime();
  const limit = Math.max(1, Number(options.limit ?? 12));
  const depth = Math.max(0, Number(options.depth ?? 1));
  const maxRows = Math.max(1, Number(options.maxRows ?? 18));
  const maxSelected = Math.max(0, Number(options.maxSelected ?? 0));
  const neighborLimit = Math.max(0, Number(options.neighborLimit ?? 2));
  const folder = options.folder || "";
  const includeStartup = options.includeStartup ?? !folder;
  const pool = folder ? rt.nodes.filter(n => n.folder === folder) : rt.nodes;
  const ranked = pool
    .map(node => ({ node, score: scoreNode(query, node) }))
    .sort((a, b) => b.score - a.score || a.node.path.localeCompare(b.node.path));
  const selected = new Map();
  for (const item of ranked.slice(0, limit)) selected.set(item.node.path, { ...item, reason: item.score ? `score=${item.score}` : "default priority" });
  if (includeStartup) for (const p of STARTUP) if (rt.byPath.has(p)) selected.set(p, { node: rt.byPath.get(p), score: 100, reason: "startup mandatory" });
  let frontier = [...selected.keys()];
  for (let d = 0; d < depth; d++) {
    const next = [];
    for (const p of frontier) for (const nb of rt.neighbors[p] || []) {
      if (!selected.has(nb.path) && rt.byPath.has(nb.path)) {
        selected.set(nb.path, { node: rt.byPath.get(nb.path), score: nb.weight, reason: nb.reason });
        next.push(nb.path);
      }
    }
    frontier = next;
  }
  let files = [...selected.values()].sort((a, b) => {
    const sa = STARTUP.includes(a.node.path) ? 1 : 0;
    const sb = STARTUP.includes(b.node.path) ? 1 : 0;
    return sb - sa || b.score - a.score || a.node.path.localeCompare(b.node.path);
  });
  if (maxSelected > 0) files = files.slice(0, maxSelected);
  return { query, options: { limit, depth, maxRows, maxSelected, neighborLimit, folder, includeStartup }, runtime: rt, files };
}
export function renderRoute(plan) {
  const lines = [];
  lines.push("# PCO Reference Runtime Route");
  lines.push(`query: ${plan.query || "<none>"}`);
  lines.push(`totals: files=${plan.runtime.totals.files}, sections=${plan.runtime.totals.sections}, edges=${plan.runtime.totals.edges}`);
  lines.push(`script graph: ${plan.runtime.generatedGraphLoaded ? "reference-graph.mjs loaded" : "live markdown scan only"}`);
  lines.push("");
  lines.push("## Folder scripts");
  for (const f of FOLDERS) lines.push(`- references/${f}/runtime.mjs`);
  lines.push("");
  lines.push("## Selected references");
  const maxRows = Math.max(1, Number(plan.options.maxRows || 18));
  const neighborLimit = Math.max(0, Number(plan.options.neighborLimit ?? 2));
  const shownFiles = plan.files.slice(0, maxRows);
  shownFiles.forEach((item, i) => {
    const n = item.node;
    const top = (plan.runtime.neighbors[n.path] || []).slice(0, neighborLimit).map(x => `${x.path} (${x.reason})`).join("; ");
    lines.push(`${i + 1}. references/${n.path}`);
    lines.push(`   title: ${n.title}`);
    lines.push(`   folder: ${n.folder}; axes: ${n.axes.join(", ")}; reason: ${item.reason}`);
    lines.push(`   keywords: ${n.keywords.slice(0, 10).join(", ")}`);
    if (top) lines.push(`   neighbors: ${top}`);
  });
  if (plan.files.length > shownFiles.length) lines.push(`... ${plan.files.length - shownFiles.length} more selected; use --max-rows ${plan.files.length} to show all.`);
  lines.push("");
  lines.push("## Use");
  lines.push(`node references/runtime/pco-reference-runtime.mjs context ${JSON.stringify(plan.query || "")} --limit ${plan.options.limit} --depth ${plan.options.depth}`);
  lines.push("pco references route \"<task>\"");
  return lines.join("\n");
}
export function buildContext(query = "", options = {}) {
  const maxChars = Math.max(4000, Number(options.maxChars || 24000));
  const maxFiles = Math.max(1, Number(options.maxFiles || 18));
  const plan = routeReferences(query, options);
  const lines = [];
  lines.push("<PCO_REFERENCE_RUNTIME_CONTEXT>");
  lines.push(`query: ${query || "<none>"}`);
  lines.push(`selection: ${plan.files.length} files, ${plan.runtime.totals.sections} indexed sections`);
  for (const item of plan.files.slice(0, maxFiles)) {
    const n = item.node;
    lines.push(`\n<PCO_REFERENCE path="references/${n.path}" folder="${n.folder}" axes="${n.axes.join(",")}" reason="${item.reason}">`);
    lines.push(n.text.trim());
    lines.push("</PCO_REFERENCE>");
    if (lines.join("\n").length >= maxChars) break;
  }
  if (plan.files.length > maxFiles) lines.push(`\n<!-- ${plan.files.length - maxFiles} selected files omitted by --max-files budget -->`);
  lines.push("\n</PCO_REFERENCE_RUNTIME_CONTEXT>");
  let out = lines.join("\n");
  if (out.length > maxChars) out = `${out.slice(0, maxChars)}\n<!-- truncated by --max-chars -->\n</PCO_REFERENCE_RUNTIME_CONTEXT>`;
  return out;
}
export function buildCapsule(query = "", options = {}) {
  const plan = routeReferences(query, { limit: 14, depth: 2, maxSelected: 24, ...options });
  const files = plan.files;
  const byFolder = new Map();
  for (const item of files) {
    const arr = byFolder.get(item.node.folder) || [];
    arr.push(item);
    byFolder.set(item.node.folder, arr);
  }
  const axes = uniq(files.flatMap(item => item.node.axes));
  const concepts = uniq(files.flatMap(item => item.node.keywords.slice(0, 6))).slice(0, 36);
  const fullChars = files.reduce((sum, item) => sum + item.node.text.length, 0);
  const lines = [];
  lines.push("# PCO Professional Capsule");
  lines.push(`query: ${query || "<none>"}`);
  lines.push(`coverage: ${files.length}/${plan.runtime.totals.files} selected files; ${plan.runtime.totals.sections} indexed sections; ${plan.runtime.totals.edges} graph edges`);
  lines.push(`compression: full selected source ~= ${estimateTokens("x".repeat(fullChars))} tokens; capsule preserves addressable paths/sections instead of dumping prose`);
  lines.push(`axes active: ${axes.join(", ")}`);
  lines.push(`concept frontier: ${concepts.join(", ")}`);
  lines.push("");
  lines.push("## Operating contract");
  lines.push("- Do not simplify PCO into a lite checklist. Keep full graph semantics active: startup core, routed specialists, neighbors, gates, lifecycle, and verification.");
  lines.push("- Spend tokens on decisions, evidence, contradictions, and deltas. Do not dump unchanged reference prose unless a gate requires exact wording.");
  lines.push("- Load by need: path -> heading/section -> exact excerpt. Escalate to full file only when the section summary cannot answer the gate.");
  lines.push("- Maintain phase state explicitly: SENSE, THINK, EXPLORE, HYPOTHESIZE, DESIGN, PLAN, BUILD, VERIFY, REFLECT, EVOLVE. Loop when evidence contradicts the current model.");
  lines.push("");
  lines.push("## Full-depth load ladder");
  lines.push("1. Kernel: bootstrap JSON + mandatory startup references + lifecycle start/checkpoint/finish.");
  lines.push("2. Route: select by task intent, axes, workflow, concepts, dependencies, graph neighbors, and sections.");
  lines.push("3. Capsule: keep this professional map in context instead of all prose; preserve source paths for exact reload.");
  lines.push("4. Section drilldown: read only referenced headings/line ranges for active gate decisions.");
  lines.push("5. Full-file escalation: load whole reference only for ambiguous, high-risk, contradictory, or failing-gate cases.");
  lines.push("6. Audit: validate, healthcheck, scorecard/runtime-audit when infrastructure or completion claims are made.");
  lines.push("");
  lines.push("## Selected reference map");
  for (const [folder, items] of byFolder) {
    lines.push(`### ${folder}`);
    for (const item of items.slice(0, 8)) {
      const n = item.node;
      const heads = n.sections.slice(0, 5).map(s => `${s.title} L${s.startLine}-${s.endLine}`).join("; ");
      lines.push(`- references/${n.path} | ${item.reason} | axes=${n.axes.join(",")} | sections=${heads}`);
    }
  }
  lines.push("");
  lines.push("## Gate checklist for this task");
  lines.push("- G11 source every factual claim to file/tool output/path/line or mark as assumption.");
  lines.push("- G12 adversarially challenge the selected route and the proposed optimization.");
  lines.push("- G14 quantify confidence from evidence, not tone.");
  lines.push("- Resource gate: prove the optimization preserves coverage while reducing repeated prose/token load.");
  lines.push("- Completion gate: run the repo validation commands required by PCO verification before claiming done.");
  return lines.join("\n");
}
export function searchReferences(query = "", options = {}) {
  return routeReferences(query, { ...options, depth: 0 }).files.map(item => ({
    path: `references/${item.node.path}`,
    title: item.node.title,
    folder: item.node.folder,
    axes: item.node.axes,
    keywords: item.node.keywords.slice(0, 12),
    score: item.score,
    reason: item.reason,
  }));
}
export function folderProfile(folder) {
  const rt = loadReferenceRuntime();
  return rt.folders[folder];
}
export function buildFolderContext(folder, query = "", options = {}) {
  return buildContext(query || folder, { ...options, folder });
}
export function runCli(argv = process.argv.slice(2)) {
  const commandSet = new Set(["route", "context", "capsule", "search", "folders", "node"]);
  const command = commandSet.has(argv[0]) ? argv[0] : "route";
  const raw = command === argv[0] ? argv.slice(1) : argv;
  const { opts, rest } = parseArgs(raw);
  const query = rest.join(" ").trim();
  if (command === "folders") {
    const rt = loadReferenceRuntime();
    console.log("# PCO Reference Runtime Folders");
    for (const [folder, meta] of Object.entries(rt.folders)) console.log(`- ${folder}: files=${meta.files.length}; axes=${meta.axes.join(",")}; script=references/${meta.script}`);
    return;
  }
  if (command === "node") {
    const rt = loadReferenceRuntime();
    const key = query.replace(/^references\//, "");
    const n = rt.byPath.get(key);
    if (!n) { console.error(`Missing reference node: ${query}`); process.exitCode = 2; return; }
    console.log(buildContext(n.title, { ...opts, limit: 1, depth: 0, folder: n.folder }));
    return;
  }
  if (command === "context") console.log(buildContext(query, opts));
  else if (command === "capsule") console.log(buildCapsule(query, opts));
  else if (command === "search") {
    for (const row of searchReferences(query, opts)) console.log(`${row.path}\t${row.score}\t${row.title}\t${row.reason}`);
  } else console.log(renderRoute(routeReferences(query, opts)));
}
export function runFolderCli(folder, argv = process.argv.slice(2)) {
  const args = [...argv];
  if (!args.includes("--folder")) args.push("--folder", folder);
  if (!args.length || args[0].startsWith("--")) args.unshift("route", folder);
  runCli(args);
}

const mainPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (mainPath && path.resolve(fileURLToPath(import.meta.url)) === mainPath) runCli();
