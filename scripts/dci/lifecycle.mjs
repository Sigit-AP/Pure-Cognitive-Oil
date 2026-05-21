#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import { routeReferences } from "../../references/runtime/dci-reference-runtime.mjs";

export function lifecycleProtocol(phase = "start", task = "unspecified task") {
  const normalized = ["start", "checkpoint", "finish"].includes(phase) ? phase : "checkpoint";
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
      "Only claim 2x when scorecard output proves it.",
    ],
  }[normalized];
  return { phase: normalized, task, route, steps };
}

export function formatLifecycle(protocol) {
  const lines = [`DCI_LIFECYCLE_${protocol.phase.toUpperCase()}`, `task: ${protocol.task}`, "", "## Steps"];
  protocol.steps.forEach((step, idx) => lines.push(`${idx + 1}. ${step}`));
  lines.push("", "## Routed references");
  protocol.route.files.slice(0, 8).forEach((item, idx) => lines.push(`${idx + 1}. references/${item.node.path} — ${item.reason}`));
  return lines.join("\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [phase = "start", ...rest] = process.argv.slice(2);
  const task = rest.join(" ").trim() || "unspecified task";
  const protocol = lifecycleProtocol(phase, task);
  if (process.argv.includes("--json")) console.log(JSON.stringify(protocol, null, 2));
  else console.log(formatLifecycle(protocol));
}
