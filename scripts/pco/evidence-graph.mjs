import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const requiredFiles = [
  "docs/professional-evolution-roadmap.md",
  "docs/benchmark-methodology.md",
  "docs/evidence-graph.md",
  "docs/claims-and-evidence.md",
  "docs/roadmap.md",
  "docs/scorecard.md",
  "tests/ai-benchmarks/README.md",
  "tests/ai-benchmarks/rubrics/core-rubric.md",
  "scripts/pco/scorecard.mjs",
]

const requiredTaskSections = [
  "## Scenario",
  "## Repository Context",
  "## Expected Behavior",
  "## Hidden Traps",
  "## Evaluation Criteria",
]

const failures = []

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`${file}: missing`)
}

const tasksDir = "tests/ai-benchmarks/tasks"
const taskFiles = existsSync(tasksDir)
  ? readdirSync(tasksDir, { recursive: true }).filter((file) => String(file).endsWith(".md")).map((file) => join(tasksDir, String(file)))
  : []

if (taskFiles.length < 8) failures.push(`${tasksDir}: expected at least 8 markdown tasks, found ${taskFiles.length}`)

for (const file of taskFiles) {
  const text = readFileSync(file, "utf8")
  for (const section of requiredTaskSections) {
    if (!text.includes(section)) failures.push(`${file}: missing ${section}`)
  }
}

const boundedDocs = ["docs/professional-evolution-roadmap.md", "docs/benchmark-methodology.md", "docs/evidence-graph.md"]
for (const file of boundedDocs) {
  if (!existsSync(file)) continue
  const text = readFileSync(file, "utf8")
  if (!/does not (claim|prove)|not evidence|Forbidden|must not claim/i.test(text)) {
    failures.push(`${file}: missing explicit claim boundary`)
  }
}

const roadmap = existsSync("docs/roadmap.md") ? readFileSync("docs/roadmap.md", "utf8") : ""
for (const phrase of ["Evidence graph", "Benchmark harness", "Anti-overclaim", "Examples as tests", "Forbidden"]) {
  if (!roadmap.includes(phrase)) failures.push(`docs/roadmap.md: missing ${phrase}`)
}

const scorecardDoc = existsSync("docs/scorecard.md") ? readFileSync("docs/scorecard.md", "utf8") : ""
const scorecardScript = existsSync("scripts/pco/scorecard.mjs") ? readFileSync("scripts/pco/scorecard.mjs", "utf8") : ""
for (const phrase of ["infrastructure coverage", "cannot prove", "universal"]) {
  if (!scorecardDoc.includes(phrase)) failures.push(`docs/scorecard.md: missing bounded claim phrase ${phrase}`)
}
for (const phrase of ["infrastructure coverage", "does not prove", "universally better"]) {
  if (!scorecardScript.includes(phrase)) failures.push(`scripts/pco/scorecard.mjs: missing bounded claim phrase ${phrase}`)
}

if (failures.length) {
  console.error(`PCO evidence-graph failed\n${failures.join("\n")}`)
  process.exit(1)
}

console.log(`PCO evidence-graph passed: files=${requiredFiles.length}, tasks=${taskFiles.length}`)
