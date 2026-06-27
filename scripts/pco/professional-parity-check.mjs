import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const requiredSkillSections = [
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

const requiredScripts = [
  "test",
  "pco:validate",
  "pco:readiness",
  "pco:runtime-audit",
  "pco:healthcheck",
  "pco:scorecard",
  "pco:skill-check",
  "pco:package-check",
  "pco:reference-quality",
  "pco:professional-parity-check",
  "pack:dry",
  "validate:release",
]

const requiredDocs = [
  "docs/architecture.md",
  "docs/runtime-data-model.md",
  "docs/script-responsibility-matrix.md",
  "docs/reference-quality-standard.md",
  "docs/claims-and-evidence.md",
  "docs/validation.md",
  "docs/cli.md",
  "docs/integrations.md",
  "docs/harness-compatibility.md",
  "docs/release-checklist.md",
  "docs/roadmap.md",
  "docs/testing-methodology.md",
  "docs/traceability-matrix.md",
  "docs/adr/0001-runtime-strategy.md",
  "docs/adr/0002-routing-model.md",
  "docs/adr/0003-scorecard-boundaries.md",
  "docs/adr/0004-harness-status.md",
]

const requiredExampleFiles = [
  "task.md",
  "commands.md",
  "route-output.md",
  "context-output.md",
  "agentic-contract.md",
  "validation-output.md",
  "lessons.md",
]

const requiredBenchmarkFiles = [
  "tests/ai-benchmarks/README.md",
  "tests/ai-benchmarks/tasks/debug-failing-test.md",
  "tests/ai-benchmarks/tasks/refactor-module.md",
  "tests/ai-benchmarks/tasks/review-code.md",
  "tests/ai-benchmarks/rubrics/core-rubric.md",
  "tests/ai-benchmarks/rubrics/default-rubric.md",
  "tests/ai-benchmarks/reports/README.md",
  "tests/ai-benchmarks/reports/report-template.md",
]

const failures = []

function fail(message) {
  failures.push(message)
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"))
}

function nonEmptyFile(file) {
  return existsSync(file) && statSync(file).isFile() && readFileSync(file, "utf8").trim().length > 0
}

function directoriesUnder(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
}

function checkSkills() {
  const dirs = directoriesUnder("skills").filter((name) => name.endsWith("-with-pco"))
  if (dirs.length < 14) fail(`skills: expected >=14 *-with-pco skills, found ${dirs.length}`)

  for (const dir of dirs) {
    const file = join("skills", dir, "SKILL.md")
    if (!nonEmptyFile(file)) {
      fail(`${file}: missing or empty`)
      continue
    }
    const text = readFileSync(file, "utf8")
    if (!text.includes("name:") || !text.includes("description:")) fail(`${file}: missing metadata`)
    for (const section of requiredSkillSections) {
      if (!text.includes(section)) fail(`${file}: missing ${section}`)
    }
  }
}

function checkPackageScripts() {
  const pkg = readJson("package.json")
  for (const script of requiredScripts) {
    if (!pkg.scripts?.[script]) fail(`package.json: missing script ${script}`)
  }
  const release = pkg.scripts?.["validate:release"] ?? ""
  if (!release.includes("pco:professional-parity-check")) fail("package.json: validate:release missing pco:professional-parity-check")
}

function checkDocs() {
  for (const file of requiredDocs) {
    if (!nonEmptyFile(file)) fail(`${file}: missing or empty`)
  }
}

function checkExamples() {
  const dirs = directoriesUnder("examples")
  if (dirs.length < 3) fail(`examples: expected >=3 examples, found ${dirs.length}`)
  for (const dir of dirs) {
    for (const name of requiredExampleFiles) {
      const file = join("examples", dir, name)
      if (!nonEmptyFile(file)) fail(`${file}: missing or empty`)
    }
  }
}

function checkBenchmarkScaffolding() {
  for (const file of requiredBenchmarkFiles) {
    if (!nonEmptyFile(file)) fail(`${file}: missing or empty`)
  }
  const tasks = [
    ...directoriesUnder("tests/ai-benchmarks/tasks").flatMap((dir) => directoriesUnder(join("tests/ai-benchmarks/tasks", dir)).map((name) => join(dir, name))),
    ...readdirSync("tests/ai-benchmarks/tasks", { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name),
  ]
  if (tasks.length < 3) fail(`tests/ai-benchmarks/tasks: expected >=3 benchmark tasks, found ${tasks.length}`)
}

checkSkills()
checkPackageScripts()
checkDocs()
checkExamples()
checkBenchmarkScaffolding()

if (failures.length) {
  console.error(`PCO professional-parity-check failed (${failures.length} issues)`)
  console.error(failures.join("\n"))
  process.exit(1)
}

console.log("PCO professional-parity-check passed")
