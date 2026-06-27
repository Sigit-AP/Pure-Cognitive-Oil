#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  buildContext,
  loadReferenceRuntime,
  routeReferences,
  searchReferences,
} from "../../references/runtime/pco-reference-runtime.mjs";

const modulePath = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(modulePath), "../..");
const node = process.execPath;
const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const outDir = path.join(root, ".pco", "cache");
const PROTOCOL_PHASES = new Set(["start", "checkpoint", "finish"]);

const STARTUP_REFERENCES = [
  "core/iron-laws.md",
  "core/pipeline-phases.md",
  "quality-safety/quality-gates.md",
  "quality-safety/verification-checklist.md",
  "cognitive-engines/hallucination-defense.md",
  "cognitive-engines/self-correction.md",
];
const FOLDER_RUNTIMES = [
  "references/core/runtime.mjs",
  "references/cognitive-engines/runtime.mjs",
  "references/quality-safety/runtime.mjs",
  "references/knowledge-bases/runtime.mjs",
  "references/advanced/runtime.mjs",
  "references/workflows/runtime.mjs",
];

export function lifecycleProtocol(phase = "start", task = "unspecified task") {
  const normalized = PROTOCOL_PHASES.has(phase) ? phase : "checkpoint";
  const route = routeReferences(task, { limit: 6, depth: 1, maxRows: 8, maxSelected: 14, neighborLimit: 1 });
  const steps = {
    start: [
      "Classify task type, risk, and uncertainty before acting.",
      "Load routed references before implementation claims.",
      "Label assumptions and unknowns.",
      "Choose adaptive depth and verification path.",
    ],
    checkpoint: [
      "Re-route if new evidence changed the task shape.",
      "Check drift against user goal and loaded references.",
      "Run hallucination, adversarial, and uncertainty gates.",
      "Correct the plan before continuing.",
    ],
    finish: [
      "Run tests or explicit verification commands.",
      "Map each final claim to evidence.",
      "Report unresolved risks and caveats.",
      "Only claim professional evolution when scorecard output proves it.",
    ],
  }[normalized];
  return { phase: normalized, task, route, steps };
}

export function formatLifecycle(protocol) {
  const lines = [`PCO_LIFECYCLE_${protocol.phase.toUpperCase()}`, `task: ${protocol.task}`, "", "## Steps"];
  protocol.steps.forEach((step, idx) => lines.push(`${idx + 1}. ${step}`));
  lines.push("", "## Routed references");
  protocol.route.files.slice(0, 8).forEach((item, idx) => lines.push(`${idx + 1}. references/${item.node.path} — ${item.reason}`));
  return lines.join("\n");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}
function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}
function run(script, scriptArgs = []) {
  return execFileSync(node, [script, ...scriptArgs], { cwd: root, encoding: "utf8", maxBuffer: 12 * 1024 * 1024 });
}
function listReferenceMarkdown() {
  const refs = path.join(root, "references");
  const out = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile() && ent.name.endsWith(".md") && ent.name !== "REFERENCE_GRAPH.md") {
        out.push(path.relative(refs, full).replaceAll(path.sep, "/"));
      }
    }
  }
  walk(refs);
  return out.sort();
}
function parsePackage() {
  return JSON.parse(read("package.json"));
}
function pass(detail) {
  return { status: "pass", detail };
}
function fail(detail) {
  return { status: "fail", detail };
}
function check(name, ok, detail, failDetail = detail) {
  return { name, ...(ok ? pass(detail) : fail(failDetail)) };
}
function phase(name, purpose, checks) {
  const status = checks.every((c) => c.status === "pass") ? "pass" : "fail";
  return { name, purpose, status, checks };
}
function selectedPaths(plan) {
  return (plan?.files || []).map((item) => item.node.path);
}
function hasSelected(plan, pathName) {
  return selectedPaths(plan).includes(pathName);
}
function uniqueCount(xs) {
  return new Set(xs).size;
}

export function buildLifecycleCertificate() {
  let runtime;
  let firstRoute;
  let midRoute;
  let finalRoute;
  let routeOutput = "";
  let contextOutput = "";
  let bootContext = "";
  const setupFailures = [];

  try {
    runtime = loadReferenceRuntime();
    firstRoute = routeReferences("professional task verification reasoning workflow", { limit: 8, depth: 1, maxSelected: 18, neighborLimit: 1 });
    midRoute = routeReferences("mid execution drift assumptions evidence self correction rollback verification", { limit: 10, depth: 1, maxSelected: 48, neighborLimit: 2 });
    finalRoute = routeReferences("final audit validation completion evidence repository hygiene", { limit: 10, depth: 1, maxSelected: 48, neighborLimit: 2 });
    routeOutput = run("references/runtime/pco-reference-runtime.mjs", ["route", "mid execution drift verification", "--limit", "8", "--depth", "1"]);
    contextOutput = buildContext("mid execution drift verification", { limit: 8, depth: 1, maxChars: 12000, maxFiles: 12 });
  } catch (err) {
    setupFailures.push(`reference runtime failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    const bootEnvelope = JSON.parse(run("scripts/pco/bootstrap.mjs", ["--json"]));
    bootContext = bootEnvelope.additionalContext || bootEnvelope.additional_context || bootEnvelope.hookSpecificOutput?.additionalContext || "";
  } catch (err) {
    setupFailures.push(`bootstrap failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  const pkg = parsePackage();
  const scripts = pkg.scripts || {};
  const testScript = String(scripts.test || "");
  const installCheckScript = String(scripts["pco:install-check"] || "");
  const validateSource = exists("scripts/pco/validate.ts") ? read("scripts/pco/validate.ts") : "";
  const gitignore = exists(".gitignore") ? read(".gitignore") : "";
  const referenceFiles = exists("references") ? listReferenceMarkdown() : [];

  const firstUse = phase("first-use", "The framework must activate as a boot contract before an agent starts acting.", [
    check("bootstrap-script", exists("scripts/pco/bootstrap.mjs"), "scripts/pco/bootstrap.mjs exists"),
    check("boot-contract-marker", bootContext.includes("PCO_BOOT_CONTRACT"), "bootstrap emits PCO_BOOT_CONTRACT"),
    check("first-use-protocol", bootContext.includes("First-use protocol"), "bootstrap contains first-use protocol"),
    check("runtime-certificate", bootContext.includes("Runtime certificate"), "bootstrap exposes runtime certificate"),
    check("route-command", bootContext.includes("pco references route") && bootContext.includes("references/runtime/pco-reference-runtime.mjs"), "bootstrap includes executable route commands"),
    check("startup-route-count", firstRoute?.files?.length >= 8, `${firstRoute?.files?.length || 0} startup route files selected`, "less than 8 startup route files selected"),
    check("startup-mandatory-coverage", STARTUP_REFERENCES.every((file) => hasSelected(firstRoute, file)), "all mandatory startup references selected"),
  ]);

  const midUsePaths = selectedPaths(midRoute || { files: [] });
  const midUse = phase("mid-use", "The framework must resist drift after work has already started.", [
    check("mid-route-dedup", uniqueCount(midUsePaths) === midUsePaths.length && midUsePaths.length >= 12, `${midUsePaths.length} unique mid-use references selected`),
    check("self-correction-present", hasSelected(midRoute, "cognitive-engines/self-correction.md"), "self-correction remains active mid-use"),
    check("hallucination-defense-present", hasSelected(midRoute, "cognitive-engines/hallucination-defense.md"), "hallucination defense remains active mid-use"),
    check("quality-gates-present", hasSelected(midRoute, "quality-safety/quality-gates.md"), "quality gates remain active mid-use"),
    check("verification-present", hasSelected(midRoute, "quality-safety/verification-checklist.md"), "verification remains active mid-use"),
    check("context-command-present", contextOutput.includes("<PCO_REFERENCE_RUNTIME_CONTEXT>") && contextOutput.includes("mid execution drift"), `${contextOutput.length} chars of mid-use context generated`),
    check("route-output-budget", routeOutput.length > 1000 && routeOutput.length <= 16000, `${routeOutput.length} chars route output stays usable`),
  ]);

  const runtimePhase = phase("runtime", "The framework must route and adapt from executable graph state, not static prose only.", [
    check("runtime-main", exists("references/runtime/pco-reference-runtime.mjs"), "main reference runtime exists"),
    check("executable-graph-loaded", runtime?.generatedGraphLoaded === true, "reference-graph.mjs loaded by runtime"),
    check("reference-file-count", runtime?.totals?.files === referenceFiles.length && referenceFiles.length >= 48, `${referenceFiles.length} markdown references match runtime nodes`),
    check("section-depth", (runtime?.totals?.sections || 0) >= 800, `${runtime?.totals?.sections || 0} sections indexed`),
    check("edge-depth", (runtime?.totals?.edges || 0) >= 800, `${runtime?.totals?.edges || 0} runtime edges available`),
    check("folder-runtimes", FOLDER_RUNTIMES.every(exists), "all six folder runtime adapters exist"),
    check("search-api", typeof searchReferences === "function" && searchReferences("audit verification", { limit: 6 }).length >= 6, "runtime search API returns targeted references"),
  ]);

  const finalUsePaths = selectedPaths(finalRoute || { files: [] });
  const finalUse = phase("final-use", "The framework must finish with evidence, validation, and repo hygiene instead of a vague done claim.", [
    check("final-route-has-audit", finalUsePaths.some((p) => p.includes("quality-safety") || p.includes("security-audit")), "final route includes audit/quality resources"),
    check("runtime-audit-script", exists("scripts/pco/runtime-audit.mjs"), "runtime audit script exists"),
    check("healthcheck-script", exists("scripts/pco/healthcheck.mjs"), "healthcheck script exists"),
    check("scorecard-script", exists("scripts/pco/scorecard.mjs"), "professional scorecard script exists"),
    check("validation-enforces-score", validateSource.includes("readinessScore is not 100") && validateSource.includes("qualityGates"), "validation enforces readiness score and gates"),
    check("package-lifecycle-script", typeof scripts["pco:lifecycle"] === "string" && scripts["pco:lifecycle"].includes("lifecycle.mjs"), "package exposes pco:lifecycle"),
    check("package-claim-scripts", ["pco:healthcheck", "pco:runtime-audit", "pco:scorecard"].every((name) => typeof scripts[name] === "string"), "package exposes healthcheck, runtime-audit, and scorecard"),
    check("package-all-runs-lifecycle", typeof scripts["pco:all"] === "string" && scripts["pco:all"].includes("pco:lifecycle"), "pco:all includes lifecycle gate"),
    check(
      "install-check-runs-final-gates",
      ((testScript.includes("bootstrap.mjs") &&
        testScript.includes("pco-reference-runtime.mjs") &&
        testScript.includes("mode-selector.mjs") &&
        testScript.includes("compact-index.mjs") &&
        testScript.includes("resource-budget.py")) || testScript.includes("install-smoke.mjs")) &&
        installCheckScript === testScript,
      "npm test and pco:install-check run the lean install/runtime smoke gates"
    ),
    check("cache-ignored", gitignore.includes(".pco/cache/"), "generated PCO cache is ignored"),
    check("legacy-json-removed", !exists(`references/${"reference-graph"}.json`), "legacy executable graph JSON absent"),
  ]);

  const phases = [firstUse, midUse, runtimePhase, finalUse];
  if (setupFailures.length) {
    phases.unshift(phase("setup", "Lifecycle certificate setup must load boot and runtime modules.", setupFailures.map((item, idx) => ({ name: `setup-${idx + 1}`, status: "fail", detail: item }))));
  }

  const totalChecks = phases.reduce((sum, item) => sum + item.checks.length, 0);
  const passedChecks = phases.reduce((sum, item) => sum + item.checks.filter((checkItem) => checkItem.status === "pass").length, 0);
  const passedLifecyclePhases = phases.filter((item) => item.name !== "setup" && item.status === "pass").length;
  const measuredLifecyclePhases = phases.filter((item) => item.name !== "setup").length;
  const baseline = { name: "one-shot-startup-baseline", measuredPhases: 1, description: "A bootstrap-only baseline covers activation but not sustained mid-use, runtime, and final-use gates." };
  const sustainedLifecycleRatio = Number((passedLifecyclePhases / baseline.measuredPhases).toFixed(2));
  const status = phases.every((item) => item.status === "pass") && sustainedLifecycleRatio >= 2 ? "pass" : "fail";
  return {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    status,
    target: {
      minimumSustainedLifecycleRatio: 2,
      sustainedLifecycleRatio,
      measuredLifecyclePhases,
      claimBoundary: "Measures executable PCO lifecycle coverage against a one-shot bootstrap baseline; it does not claim universal correctness.",
    },
    score: Math.round((passedChecks / Math.max(totalChecks, 1)) * 100),
    baseline,
    phases,
    evidence: {
      references: {
        files: runtime?.totals?.files || 0,
        sections: runtime?.totals?.sections || 0,
        edges: runtime?.totals?.edges || 0,
        generatedGraphLoaded: Boolean(runtime?.generatedGraphLoaded),
      },
      commands: [
        "node scripts/pco/bootstrap.mjs --json",
        "node references/runtime/pco-reference-runtime.mjs route \"<task>\"",
        "node references/runtime/pco-reference-runtime.mjs context \"<task>\"",
        "node scripts/pco/lifecycle.mjs",
        "node scripts/pco/healthcheck.mjs",
        "node scripts/pco/scorecard.mjs",
        "npm test",
      ],
      outputFiles: [".pco/cache/lifecycle-certificate.json"],
    },
  };
}

export function writeLifecycleCertificate(report) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "lifecycle-certificate.json"), JSON.stringify(report, null, 2) + "\n");
}

export function formatLifecycleCertificate(report) {
  const lines = [];
  for (const item of report.phases) {
    lines.push(`${item.status.toUpperCase()} lifecycle:${item.name}: ${item.checks.filter((checkItem) => checkItem.status === "pass").length}/${item.checks.length}`);
  }
  lines.push(`PCO lifecycle ${report.status}: score=${report.score}, sustainedRatio=${report.target.sustainedLifecycleRatio}`);
  return lines.join("\n");
}

function runCli() {
  const [phase, ...rest] = args;
  if (PROTOCOL_PHASES.has(phase)) {
    const task = rest.filter((item) => item !== "--json").join(" ").trim() || "unspecified task";
    const protocol = lifecycleProtocol(phase, task);
    process.stdout.write(jsonMode ? `${JSON.stringify(protocol, null, 2)}\n` : `${formatLifecycle(protocol)}\n`);
    return;
  }

  const report = buildLifecycleCertificate();
  writeLifecycleCertificate(report);
  process.stdout.write(jsonMode ? `${JSON.stringify(report, null, 2)}\n` : `${formatLifecycleCertificate(report)}\n`);
  if (report.status !== "pass") process.exit(1);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) runCli();
