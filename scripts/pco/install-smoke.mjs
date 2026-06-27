#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const commands = [
  [process.execPath, ["scripts/pco/bootstrap.mjs", "--json"]],
  [process.execPath, ["references/runtime/pco-reference-runtime.mjs", "route", "install smoke", "--limit", "4", "--depth", "0"]],
  [process.execPath, ["scripts/pco/mode-selector.mjs", "install smoke", "--json"]],
  [process.execPath, ["scripts/pco/compact-index.mjs"]],
  ["python", ["scripts/pco/resource-budget.py"]],
];

for (const [cmd, args] of commands) {
  const result = spawnSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || `${cmd} ${args.join(" ")} failed\n`);
    process.exit(result.status ?? 1);
  }
}

console.log("PCO install smoke pass");
