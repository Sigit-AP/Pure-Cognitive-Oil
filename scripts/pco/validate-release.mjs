#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const commands = [
  ["npm", ["run", "pco:package-validation"]],
  ["npm", ["run", "pco:validate"]],
  ["npm", ["run", "pco:readiness"]],
  ["npm", ["run", "pco:runtime-audit"]],
  ["npm", ["run", "pco:healthcheck"]],
  ["npm", ["run", "pco:scorecard"]],
  ["npm", ["run", "pack:dry"]],
];

for (const [cmd, args] of commands) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
