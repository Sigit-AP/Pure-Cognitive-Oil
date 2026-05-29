#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const command = args[0] || "help";
const rest = args.slice(1);

function run(cmd, cmdArgs, opts = {}) {
  const result = spawnSync(cmd, cmdArgs, {
    cwd: opts.cwd || root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
  process.exit(result.status ?? 1);
}

function runTs(script, extra = []) {
  run("npx", ["tsx", script, ...extra], { cwd: root });
}

function printHelp() {
  console.log(`Pure Cognitive Oil CLI

Usage:
  pco help                 Show this help
  pco bootstrap            Print text bootstrap context
  pco bootstrap --json     Print JSON bootstrap context for agent hooks
  pco index                Generate .pco/cache/resource-map.json and manifest
  pco audit                Run PCO audit
  pco context              Generate PCO context pack
  pco validate             Run PCO validation
  pco readiness            Run PCO readiness gate
  pco references [cmd]     Run executable reference runtime (route/search/context/capsule/folders)
  pco tools [cmd]          Run reference toolkit dispatcher (list/domain/brief/gate)
  pco agentic-auto TASK    Print adaptive PCO route-plan-build-audit runtime plan
  pco lifecycle            Generate sustained lifecycle certificate
  pco lifecycle [phase]    Print start/checkpoint/finish lifecycle protocol
  pco healthcheck          Verify PCO first-use/runtime/finish infrastructure
  pco scorecard            Compare PCO infrastructure coverage against Superpowers baseline
  pco runtime-audit        Audit runtime scripts for duplication/spam/slop
  pco test                 Run full PCO test suite
  pco install-hermes DIR   Copy PCO skills into a Hermes skills directory

Examples:
  npx pure-cognitive-oil bootstrap --json
  pco validate
  pco install-hermes ~/.hermes/skills/pco
`);
}

switch (command) {
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  case "bootstrap":
    run("node", ["scripts/pco/bootstrap.mjs", ...rest], { cwd: root });
    break;
  case "index":
    runTs("scripts/pco/index.ts", rest);
    break;
  case "audit":
    runTs("scripts/pco/audit.ts", rest);
    break;
  case "context":
    runTs("scripts/pco/context.ts", rest);
    break;
  case "validate":
    runTs("scripts/pco/validate.ts", rest);
    break;
  case "readiness":
  case "parity":
    runTs("scripts/pco/parity.ts", rest);
    break;
  case "references":
  case "reference-runtime":
    run("node", ["references/runtime/pco-reference-runtime.mjs", ...rest], { cwd: root });
    break;
  case "tools":
    run("node", ["references/tools/reference-toolkit.mjs", ...rest], { cwd: root });
    break;
  case "agentic-auto":
    run("node", ["scripts/pco/agentic-auto.mjs", ...rest], { cwd: root });
    break;
  case "lifecycle":
    run("node", ["scripts/pco/lifecycle.mjs", ...rest], { cwd: root });
    break;
  case "healthcheck":
    run("node", ["scripts/pco/healthcheck.mjs", ...rest], { cwd: root });
    break;
  case "scorecard":
    run("node", ["scripts/pco/scorecard.mjs", ...rest], { cwd: root });
    break;
  case "runtime-audit":
    run("node", ["scripts/pco/runtime-audit.mjs", ...rest], { cwd: root });
    break;
  case "test":
    run("npm", ["test"], { cwd: root });
    break;
  case "install-hermes":
    if (!rest[0]) {
      console.error("Usage: pco install-hermes <target-skills-dir>");
      process.exit(2);
    }
    run("node", ["scripts/pco/install-hermes.mjs", rest[0]], { cwd: root });
    break;
  default:
    console.error(`Unknown command: ${command}\n`);
    printHelp();
    process.exit(2);
}
