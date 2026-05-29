#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const domains = {
  core: "references/core/tools/core-toolkit.mjs",
  "cognitive-engines": "references/cognitive-engines/tools/cognitive-engines-toolkit.mjs",
  "quality-safety": "references/quality-safety/tools/quality-safety-toolkit.mjs",
  workflows: "references/workflows/tools/workflows-toolkit.mjs",
  advanced: "references/advanced/tools/advanced-toolkit.mjs",
  "knowledge-bases": "references/knowledge-bases/tools/knowledge-bases-toolkit.mjs",
};

function runNode(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, stdio: "inherit" });
  process.exit(result.status ?? 1);
}

function help() {
  console.log(`PCO Reference Toolkit

Usage:
  node references/tools/reference-toolkit.mjs list
  node references/tools/reference-toolkit.mjs domain <folder>
  node references/tools/reference-toolkit.mjs brief <folder> "<task>"
  node references/tools/reference-toolkit.mjs gate <folder> "<task>"

Folders:
  ${Object.keys(domains).join("\n  ")}

Examples:
  node references/tools/reference-toolkit.mjs brief workflows "publish npm package safely"
  node references/tools/reference-toolkit.mjs gate quality-safety "release v1.7.0"
`);
}

const [cmd = "list", folder, ...rest] = process.argv.slice(2);

if (cmd === "list" || cmd === "help" || cmd === "--help") {
  help();
  process.exit(0);
}

if (!folder || !domains[folder]) {
  console.error(`Unknown or missing folder: ${folder || "<missing>"}`);
  help();
  process.exit(2);
}

if (cmd === "domain") runNode(domains[folder], ["list", ...rest]);
if (cmd === "brief") runNode(domains[folder], ["brief", ...rest]);
if (cmd === "gate") runNode(domains[folder], ["gate", ...rest]);

console.error(`Unknown command: ${cmd}`);
help();
process.exit(2);
