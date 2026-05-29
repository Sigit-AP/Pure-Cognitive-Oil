#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const target = process.argv[2] ? path.resolve(process.argv[2]) : "";
if (!target) {
  console.error("Usage: node scripts/pco/install-hermes.mjs <target-skills-dir>");
  process.exit(2);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(from, to);
    else if (ent.isFile()) fs.copyFileSync(from, to);
  }
}

const skillsDir = path.join(root, "skills");
if (!fs.existsSync(skillsDir)) {
  console.error(`Missing skills directory: ${skillsDir}`);
  process.exit(1);
}
copyDir(skillsDir, target);
console.log(`PCO skills installed to ${target}`);
console.log("Next: configure your agent/harness to load these SKILL.md files and run `pco bootstrap --json` at session start.");
