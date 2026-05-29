#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"

node scripts/pco/agentic-auto.mjs "fix production security bug with audit and parallel delegate optimization" >/tmp/pco-agentic-auto.log
grep -q '# /PCO-agentic-auto Full Autonomous Runtime Contract' /tmp/pco-agentic-auto.log || fail "missing agentic-auto full autonomous header"
grep -q 'risk:' /tmp/pco-agentic-auto.log || fail "missing risk classification"
grep -q 'complexity:' /tmp/pco-agentic-auto.log || fail "missing complexity classification"
grep -q 'autonomy:' /tmp/pco-agentic-auto.log || fail "missing autonomy policy"
grep -q 'delegation:' /tmp/pco-agentic-auto.log || fail "missing delegation policy"
grep -q '## Agentic optimizer contract' /tmp/pco-agentic-auto.log || fail "missing optimizer contract"
grep -q '## Interview skill' /tmp/pco-agentic-auto.log || fail "missing interview skill"
grep -q 'professional question bank' /tmp/pco-agentic-auto.log || fail "missing professional question bank"
grep -q '## Optimization matrix' /tmp/pco-agentic-auto.log || fail "missing optimization matrix"
grep -q '## Delegate and parallel execution plan' /tmp/pco-agentic-auto.log || fail "missing delegate plan"
grep -q '## Full autonomous loop' /tmp/pco-agentic-auto.log || fail "missing autonomous loop"
grep -q 'INTERVIEW:' /tmp/pco-agentic-auto.log || fail "missing interview phase"
grep -q 'SENSE:' /tmp/pco-agentic-auto.log || fail "missing sense phase"
grep -q 'ROUTE:' /tmp/pco-agentic-auto.log || fail "missing route phase"
grep -q 'PLAN:' /tmp/pco-agentic-auto.log || fail "missing plan phase"
grep -q 'PARALLELIZE:' /tmp/pco-agentic-auto.log || fail "missing parallelize phase"
grep -q 'BUILD:' /tmp/pco-agentic-auto.log || fail "missing build phase"
grep -q 'AUDIT:' /tmp/pco-agentic-auto.log || fail "missing audit phase"
grep -q 'REPAIR:' /tmp/pco-agentic-auto.log || fail "missing repair phase"
grep -q 'OPTIMIZE:' /tmp/pco-agentic-auto.log || fail "missing optimize phase"
grep -q 'FINALIZE:' /tmp/pco-agentic-auto.log || fail "missing finalize phase"
grep -q 'PCO Professional Capsule' /tmp/pco-agentic-auto.log || fail "missing capsule"

node bin/pco.mjs agentic-auto "refactor API with tests" >/tmp/pco-agentic-auto-bin.log
grep -q '# /PCO-agentic-auto Full Autonomous Runtime Contract' /tmp/pco-agentic-auto-bin.log || fail "bin command did not run agentic-auto"

node --input-type=module <<'JS'
import fs from 'node:fs';
const plugin = JSON.parse(fs.readFileSync('.claude-plugin/plugin.json', 'utf8'));
if (plugin.commands !== './commands/') throw new Error('Claude plugin commands directory missing');
const slash = fs.readFileSync('.claude-plugin/commands/PCO-agentic-auto.md', 'utf8');
for (const needle of ['pco agentic-auto', 'INTERVIEW', 'SENSE', 'ROUTE', 'PLAN', 'PARALLELIZE', 'BUILD', 'AUDIT', 'REPAIR', 'OPTIMIZE', 'FINALIZE', 'Interview skill', 'Delegate/parallel policy']) {
  if (!slash.includes(needle)) throw new Error(`slash command missing ${needle}`);
}
const rootPlugin = JSON.parse(fs.readFileSync('plugin.json', 'utf8'));
if (!rootPlugin.commands?.agenticAuto?.includes('pco agentic-auto')) throw new Error('root plugin agenticAuto command missing');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.scripts?.['pco:agentic-auto']?.includes('agentic-auto.mjs')) throw new Error('package pco:agentic-auto script missing');
const ref = fs.readFileSync('references/advanced/agentic-auto-runtime.md', 'utf8');
for (const needle of ['Interview Skill', 'Delegation And Parallelism', 'Optimization Matrix', 'Verification']) {
  if (!ref.includes(needle)) throw new Error(`agentic reference missing ${needle}`);
}
JS

pass agentic-auto
