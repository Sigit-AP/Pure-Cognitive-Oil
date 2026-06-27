import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const root = "skills"
const requiredSections = [
  "## Overview",
  "## When to Use",
  "## When Not to Use",
  "## Inputs",
  "## Procedure",
  "## Required Evidence",
  "## Validation Commands",
  "## Output Contract",
  "## Failure Modes",
  "## Red Flags",
  "## Related References",
]

const failures = []
for (const dir of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name.endsWith("-with-pco"))) {
  const file = join(root, dir.name, "SKILL.md")
  if (!existsSync(file)) {
    failures.push(`${file}: missing`)
    continue
  }
  const text = readFileSync(file, "utf8")
  if (!text.includes("name:") || !text.includes("description:")) failures.push(`${file}: missing frontmatter fields`)
  for (const section of requiredSections) {
    if (!text.includes(section)) failures.push(`${file}: missing ${section}`)
  }
}

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}

console.log("PCO skill-check passed")
