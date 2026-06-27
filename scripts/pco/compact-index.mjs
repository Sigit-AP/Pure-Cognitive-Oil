#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { loadReferenceRuntime } from '../../references/runtime/pco-reference-runtime.mjs';

const root = process.cwd();
const outPath = path.join(root, 'efficiency', 'PCO_COMPACT_INDEX.md');
const rt = loadReferenceRuntime();
const byFolder = new Map();
for (const node of rt.nodes) {
  const arr = byFolder.get(node.folder) || [];
  arr.push(node);
  byFolder.set(node.folder, arr);
}
const lines = [];
lines.push('# PCO Compact Index — Addressable Resource Map');
lines.push('');
lines.push('Purpose: preserve full PCO graph coverage while avoiding full-corpus loading. Use this file to find the exact reference to drill into, then read only the needed section or file.');
lines.push('');
lines.push(`Runtime totals: files=${rt.totals.files}, sections=${rt.totals.sections}, words=${rt.totals.words}, edges=${rt.totals.edges}.`);
lines.push('');
lines.push('## Startup kernel');
for (const p of ['core/iron-laws.md','core/pipeline-phases.md','core/adaptive-depth.md','quality-safety/quality-gates.md','quality-safety/verification-checklist.md','cognitive-engines/hallucination-defense.md','cognitive-engines/self-correction.md','cognitive-engines/adversarial-reasoning.md','cognitive-engines/uncertainty-engine.md']) {
  const n = rt.byPath.get(p);
  if (n) lines.push(`- references/${n.path} — ${n.title}`);
}
lines.push('');
for (const [folder, nodes] of [...byFolder.entries()].sort()) {
  lines.push(`## ${folder}`);
  for (const n of nodes.sort((a,b) => a.path.localeCompare(b.path))) {
    const sections = n.sections.slice(0, 4).map(s => `${s.title} L${s.startLine}-${s.endLine}`).join('; ');
    const keys = n.keywords.slice(0, 8).join(', ');
    lines.push(`- references/${n.path} — ${n.title} | axes=${n.axes.join(',')} | sections=${n.sections.length} | keywords=${keys} | firstSections=${sections}`);
  }
  lines.push('');
}
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join('\n') + '\n');
console.log(`PCO compact index written: ${path.relative(root, outPath)} (${lines.length} lines)`);
