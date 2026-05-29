import fs from "node:fs";
import path from "node:path";
import { buildAudit, buildManifest } from "./index.js";

const outDir = path.join(process.cwd(), ".pco", "cache");
fs.mkdirSync(outDir, { recursive: true });
const manifest = buildManifest();
const audit = buildAudit(manifest);
fs.writeFileSync(path.join(outDir, "audit-report.json"), JSON.stringify(audit, null, 2) + "\n");
console.log(`PCO audit ${audit.status}: ${audit.filesIndexed}/${audit.filesExpected} files, score=${audit.readinessScore}`);
if (audit.status === "fail") process.exit(1);
