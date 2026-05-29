#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routeReferences, loadReferenceRuntime } from "../../references/runtime/pco-reference-runtime.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);

function readSafe(file) {
  try { return fs.readFileSync(path.join(root, file), "utf8"); }
  catch { return ""; }
}
function stripFrontmatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}
function jsonOut(obj) {
  process.stdout.write(`${JSON.stringify(obj, null, 2)}\n`);
}
function platformEnvelope(context) {
  if (process.env.CURSOR_PLUGIN_ROOT) return { additional_context: context };
  if (process.env.CLAUDE_PLUGIN_ROOT && !process.env.COPILOT_CLI) {
    return { hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: context } };
  }
  return { additionalContext: context };
}
function renderRoute(plan) {
  return plan.files.slice(0, 10).map((item, idx) => {
    const n = item.node;
    return `${idx + 1}. references/${n.path} — ${n.title} [${item.reason}]`;
  }).join("\n");
}

const skill = stripFrontmatter(readSafe("SKILL.md"));
const usingDci = stripFrontmatter(readSafe("skills/using-pco/SKILL.md"));
const runtime = loadReferenceRuntime();
const route = routeReferences("professional task verification reasoning workflow", {
  limit: 8,
  depth: 1,
  maxRows: 10,
  maxSelected: 18,
  neighborLimit: 1,
});

const context = `<PCO_BOOT_CONTRACT>
You have Pure Cognitive Oil.

Purpose: graph-first cognitive routing, evidence discipline, and quality/safety verification for agent work.

Boot mode: AMT-derived but PCO-native.
- Amati: detect task intent and applicable cognitive resources.
- Tiru: load only the needed skills/references before action.
- Modifikasi: route through PCO's executable reference graph, gates, and runtime audit rather than copying another framework.

First-use protocol:
1. Treat user instructions as highest priority.
2. If this is planning, coding, debugging, audit, research, architecture, reasoning, or verification, activate PCO before acting.
3. Run: pco references route "<task>" --limit 8 --depth 1
4. For deeper work, run: pco references context "<task>" --limit 8 --depth 1
5. Load selected files, then expand by graph neighbors only when useful.
6. Execute through the PCO phase pipeline and quality gates.
7. Do not claim completion without evidence.

Runtime certificate:
- runtime: references/runtime/pco-reference-runtime.mjs
- graph: references/reference-graph.mjs
- markdown reference files: ${runtime.totals.files}
- sections: ${runtime.totals.sections}
- graph edges: ${runtime.totals.edges}
- folders: ${Object.keys(runtime.folders).join(", ")}

Startup route preview:
${renderRoute(route)}

Core skill follows.
<PCO_SKILL path="SKILL.md">
${skill}
</PCO_SKILL>

Operating skill follows.
<PCO_SKILL path="skills/using-pco/SKILL.md">
${usingDci}
</PCO_SKILL>
</PCO_BOOT_CONTRACT>`;

if (args.includes("--json")) jsonOut(platformEnvelope(context));
else process.stdout.write(`${context}\n`);
