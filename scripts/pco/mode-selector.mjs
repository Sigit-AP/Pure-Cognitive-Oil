#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function selectMode(input) {
  const text = String(input || 'professional task');
  const q = text.toLowerCase();
  let score = 0;
  const reasons = [];
  function hit(re, points, reason) { if (re.test(q)) { score += points; reasons.push(reason); } }
  hit(/prod|production|deploy|delete|drop|credential|secret|security|auth|payment|migration|irreversible|force|main branch/, 6, 'critical risk keyword');
  hit(/architecture|framework|complex|deep|audit|review|benchmark|multi[- ]?language|optimization|resource|performance|research/, 4, 'deep complexity keyword');
  hit(/build|develop|implement|refactor|upgrade|tooling|script|test|validate/, 3, 'implementation keyword');
  hit(/uncertain|uncertainty|source discipline|hallucination|spike|runtime and resource|resource usage|reliability|verification strong|optimization/, 2, 'deep evidence/resource keyword');
  hit(/quick|small|simple|minor|one file|langsung jawab/, -2, 'low-complexity keyword');
  const lengthPoints = text.length > 240 ? 3 : text.length > 120 ? 2 : text.length > 60 ? 1 : 0;
  score += lengthPoints;
  if (lengthPoints) reasons.push(`task length adds ${lengthPoints}`);
  let mode = 'quick';
  if (score >= 10) mode = 'critical';
  else if (score >= 6) mode = 'deep';
  else if (score >= 2) mode = 'standard';
  const config = {
    quick: { routeLimit: 4, depth: 0, maxFiles: 4, maxChars: 8000, validation: 'lightweight' },
    standard: { routeLimit: 8, depth: 1, maxFiles: 8, maxChars: 18000, validation: 'runtime-targeted' },
    deep: { routeLimit: 12, depth: 2, maxFiles: 14, maxChars: 28000, validation: 'runtime-plus-direct-audit' },
    critical: { routeLimit: 18, depth: 2, maxFiles: 24, maxChars: 45000, validation: 'full-available-plus-adversarial' }
  }[mode];
  return { task: text, mode, score, reasons, config };
}

export function renderModeSelection(result) {
  return `# PCO Mode Selection\nmode: ${result.mode}\nscore: ${result.score}\nroute: --limit ${result.config.routeLimit} --depth ${result.config.depth}\nmaxFiles: ${result.config.maxFiles}\nmaxChars: ${result.config.maxChars}\nvalidation: ${result.config.validation}\nreasons: ${result.reasons.join('; ') || 'default low-risk task'}`;
}

function main() {
  const rawArgs = process.argv.slice(2);
  const json = rawArgs.includes('--json');
  const task = rawArgs.filter(a => a !== '--json').join(' ').trim() || 'professional task';
  const result = selectMode(task);
  if (json) console.log(JSON.stringify(result, null, 2));
  else console.log(renderModeSelection(result));
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) main();
