import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const files = walk("references").filter((file) => file.endsWith(".md"))
const failures = []
for (const file of files) {
  const text = readFileSync(file, "utf8")
  if (!text.trim()) failures.push(`${file}: empty`)
  const secretPatterns = ["GITHUB" + "_KEY=", "BEGIN RSA" + " PRIVATE KEY", "BEGIN OPENSSH" + " PRIVATE KEY"]
  if (secretPatterns.some((pattern) => text.includes(pattern))) failures.push(`${file}: secret-like content`)
}

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}

console.log(`PCO reference-quality passed (${files.length} markdown files)`)
