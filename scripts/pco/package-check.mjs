import { existsSync, readFileSync } from "node:fs"

const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const required = [
  "README.md",
  "LICENSE",
  "SKILL.md",
  "AI_MODEL_BOOT.md",
  "bin/pco.mjs",
  "docs/architecture.md",
  "docs/validation.md",
  "docs/claims-and-evidence.md",
  "skills/using-pco/SKILL.md",
]

const missing = required.filter((file) => !existsSync(file))
if (missing.length) {
  console.error(`PCO package-check failed. Missing: ${missing.join(", ")}`)
  process.exit(1)
}

const files = pkg.files ?? []
for (const entry of ["docs/", "skills/", "references/", "bin/", "AI_MODEL_BOOT.md"]) {
  if (!files.includes(entry)) {
    console.error(`PCO package-check failed. package.json files missing ${entry}`)
    process.exit(1)
  }
}

console.log("PCO package-check passed")
