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
  console.log(`Deterministic-Cognitive-Infrastructure CLI

Usage:
  dci help                 Show this help
  dci bootstrap            Print text bootstrap context
  dci bootstrap --json     Print JSON bootstrap context for agent hooks
  dci index                Generate .dci/cache/resource-map.json and manifest
  dci audit                Run DCI audit
  dci context              Generate DCI context pack
  dci validate             Run DCI validation
  dci readiness            Run DCI readiness gate
  dci references [cmd]     Run executable reference runtime (route/search/context/folders)
  dci lifecycle [phase]    Print start/checkpoint/finish lifecycle protocol
  dci healthcheck          Verify DCI first-use/runtime/finish infrastructure
  dci scorecard            Compare DCI infrastructure coverage against Superpowers baseline
  dci runtime-audit        Audit runtime scripts for duplication/spam/slop
  dci test                 Run full DCI test suite
  dci install-hermes DIR   Copy DCI skills into a Hermes skills directory

Examples:
  npx deterministic-cognitive-infrastructure bootstrap --json
  dci validate
  dci install-hermes ~/.hermes/skills/dci
`);
}

switch (command) {
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  case "bootstrap":
    run("node", ["scripts/dci/bootstrap.mjs", ...rest], { cwd: root });
    break;
  case "index":
    runTs("scripts/dci/index.ts", rest);
    break;
  case "audit":
    runTs("scripts/dci/audit.ts", rest);
    break;
  case "context":
    runTs("scripts/dci/context.ts", rest);
    break;
  case "validate":
    runTs("scripts/dci/validate.ts", rest);
    break;
  case "readiness":
  case "parity":
    runTs("scripts/dci/parity.ts", rest);
    break;
  case "references":
  case "reference-runtime":
    run("node", ["references/runtime/dci-reference-runtime.mjs", ...rest], { cwd: root });
    break;
  case "lifecycle":
    run("node", ["scripts/dci/lifecycle.mjs", ...rest], { cwd: root });
    break;
  case "healthcheck":
    run("node", ["scripts/dci/healthcheck.mjs", ...rest], { cwd: root });
    break;
  case "scorecard":
    run("node", ["scripts/dci/scorecard.mjs", ...rest], { cwd: root });
    break;
  case "runtime-audit":
    run("node", ["scripts/dci/runtime-audit.mjs", ...rest], { cwd: root });
    break;
  case "test":
    run("npm", ["test"], { cwd: root });
    break;
  case "install-hermes":
    if (!rest[0]) {
      console.error("Usage: dci install-hermes <target-skills-dir>");
      process.exit(2);
    }
    run("node", ["scripts/dci/install-hermes.mjs", rest[0]], { cwd: root });
    break;
  default:
    console.error(`Unknown command: ${command}\n`);
    printHelp();
    process.exit(2);
}
