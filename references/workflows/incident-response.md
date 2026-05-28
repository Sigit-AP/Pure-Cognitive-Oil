# Incident Response Protocol — Deterministic-Cognitive-Infrastructure

> **"In a crisis, you do not rise to the level of your expectations; you fall to the level of your training. Production outages are not solved by heroics, brilliance, or panicked terminal commands. They are solved by rigid, military-style communication, methodical state isolation, and absolute discipline. Panic is a lack of procedure."**


<!-- DCI-DOC-STANDARD-START -->

## Overview

This document is part of the Deterministic-Cognitive-Infrastructure reference corpus. It is structured as a professional operational reference so humans and agent runtimes can understand when to use it, what inputs it expects, what outputs it should produce, and how to verify correct use.

## Document Profile

- **Title:** Incident Response Protocol — Deterministic-Cognitive-Infrastructure
- **Path:** `references/workflows/incident-response.md`
- **Folder:** `workflows`
- **Document type:** Workflow runbook
- **Primary audience:** Agents executing software engineering tasks and reviewers auditing their work.
- **Purpose:** Translate DCI principles into step-by-step execution for a specific task class.
- **Standard used:** Runbook/SOP format with task, procedure, verification, and handoff sections.

## When to Use

Use when a user request matches the workflow domain or when routing selects this file.

## Inputs

Task scope, repo context, affected files, constraints, tests, risks, and acceptance criteria.

## Expected Outputs

Plan, implementation path, validation evidence, rollback notes, and final report.

## Reading Protocol

1. Start with the overview and document profile.
2. Identify the trigger condition or task class that makes this reference relevant.
3. Apply the procedure, rules, models, or checklist in order.
4. Cross-check related DCI references before finalizing a high-risk decision.
5. Preserve evidence for every completion, correctness, or safety claim.

## Professional Checklist

- [ ] Entry condition is clear.
- [ ] Procedure is ordered.
- [ ] Verification command or evidence is defined.
- [ ] Final handoff/reporting criteria are explicit.

## Maintenance Notes

- Keep headings descriptive and stable so runtime section extraction remains reliable.
- Prefer ordered procedures, explicit decision criteria, and verifiable outputs over prose-only guidance.
- Preserve DCI-specific terminology while keeping examples readable for non-DCI maintainers.
- Update related references and runtime graph metadata when changing conceptual relationships.

<!-- DCI-DOC-STANDARD-END -->

## Part 1: The Anatomy of an Incident

```
An incident is never just "the site is down." It is almost always a cascading failure of technical constraints combined with a failure of human communication and visibility.

THE THREE PHASES OF AN OUTAGE:
1. The Trigger: The exact mathematical moment the flaw is exposed to the physics of production (e.g., a bad deploy, a massive traffic spike, a distributed database lock, an expired SSL certificate).
2. The Cascade: The failure of one system overwhelms the retry logic of a secondary system, which then exhausts the connection pool of a tertiary system, bringing down the entire architecture like dominoes.
3. The Mitigation: The explicit, highly-controlled actions taken to stop the bleeding, restore basic service, and stabilize the patient before attempting a cure.

THE PRIMARY DIRECTIVE:
During an active Sev-1 incident, your goal is NEVER to find the root cause. Your singular goal is to MITIGATE THE BLEEDING AND RESTORE SERVICE. If the site is down because of a massively unoptimized database query, do not spend 45 minutes trying to rewrite the query using EXPLAIN ANALYZE. Revert the commit. Roll back the database. Kill the offending process. Bring the site up. Find the root cause tomorrow when revenue is no longer burning.
```

## Part 2: The Incident Command System (ICS)

```
When a Sev-1 (Severity 1 - Total Outage) incident is declared, normal corporate hierarchy dissolves instantly. An emergency hierarchy, borrowed from firefighting and military operations, takes its place.

ROLE 1: THE INCIDENT COMMANDER (IC)
├─ Responsibility: Leads the response. Makes the final call on all actions. Coordinates the team. Maintains the timeline.
├─ Rule: The IC DOES NOT WRITE CODE. The IC DOES NOT LOOK AT LOGS. If the IC is typing in a terminal or reading Datadog, the incident is out of control because nobody is flying the plane.
└─ Focus: State management, timeline tracking, and asking "What is the status of the rollback? Do we have authorization to drop the cache?"

ROLE 2: THE PRIMARY RESPONDER (The Fixer / Subject Matter Expert)
├─ Responsibility: Looks directly at the dashboards, SSHs into the servers (if necessary), and writes/executes the mitigation scripts.
├─ Rule: The Fixer does not execute ANY destructive command (drop table, restart master DB, flush Redis) without explicit verbal or written authorization from the IC.
└─ Focus: Technical mitigation and deep system analysis.

ROLE 3: THE COMMUNICATIONS LEAD (The Shield)
├─ Responsibility: Writes the public Statuspage updates. Answers angry messages from the CEO. Updates the customer support team with talking points.
├─ Rule: Shields the IC and the Fixer from absolutely all external noise, panic, and executive pressure so they can focus on restoring the outage.
└─ Focus: Stakeholder management and public relations.

ROLE 4: THE SCRIBE (Optional but recommended)
├─ Responsibility: Records every single action, decision, and hypothesis proposed during the incident in a shared document, complete with timestamps.
└─ Value: Makes writing the post-mortem trivially easy, and prevents the "Wait, who ran that command?" confusion later.
```

## Part 3: The 5-Step Mitigation Protocol

```
When the pagers go off at 3:00 AM, do not think. Execute this loop.

STEP 1: TRIAGE AND DECLARE (The Alarm)
├─ Assess the blast radius rapidly. Is it 1% of users or 100%? Is data being actively corrupted, or just inaccessible?
├─ Declare the incident loudly and explicitly in the main engineering channel: "@here SEV-1 DECLARED: Checkout pipeline is returning 500s. I am assuming Incident Command."
└─ Open a dedicated, ephemeral voice channel or war room link.

STEP 2: ESTABLISH THE TIMELINE (The "What Changed?" Heuristic)
├─ Ask the Golden Question: "What changed in the last 60 minutes?"
├─ Check recent deployments, feature flag toggles, infrastructure/Terraform updates, and marketing emails (which cause massive traffic spikes).
└─ Fact: 85% of all production outages are caused by a human making a change to the system in the preceding hour. Find the change.

STEP 3: MITIGATE (The Tourniquet)
├─ Do the fastest, safest, dumbest thing to restore service. Do not be clever.
├─ Revert the last deployment completely.
├─ Toggle the suspect feature flag to OFF.
├─ Scale the database up to the next massive hardware tier to buy time.
└─ Restart the deadlocked Kubernetes pods to clear the memory leak.

STEP 4: VERIFY RESTORATION (The Proof)
├─ Do not declare victory just because the Datadog CPU graphs look better.
├─ Verify physically. Execute a real test transaction in production.
└─ Ensure the error rate has dropped completely to baseline for at least 5 continuous minutes.

STEP 5: STAND DOWN (The De-escalation)
├─ Update the Statuspage to "Resolved".
├─ Close the war room.
└─ Instruct the team to log off and rest. Do not attempt to write the highly analytical post-mortem immediately while flooded with adrenaline and exhausted.
```

## Part 4: The Blameless Post-Mortem

```
An incident is a highly expensive tuition payment made by the company. If you do not write a rigorous post-mortem, you paid the tuition but skipped the class.

THE RULES OF BLAMELESSNESS:
├─ You cannot fire the engineer who brought down production. They just received a $100,000 lesson in system architecture. If you fire them, you are sending that expensive training to your competitor.
├─ You do not write: "Bob made a typo in the YAML file and broke the cluster."
└─ You write: "The CI/CD pipeline lacked a structural validation step for YAML syntax, which allowed a malformed configuration to bypass safeguards and be merged into main." Fix the system, not the human. Human error is a symptom of bad system design.

THE POST-MORTEM FORMAT:
1. Executive Summary: What happened, when it happened, and the exact business impact (revenue lost, users affected, reputation damage).
2. Timeline: A minute-by-minute exact log of the incident. (03:14 - PagerDuty alerts. 03:17 - IC joins. 03:22 - Rollback initiated).
3. Root Cause (The 5 Whys): Drill down relentlessly until you hit a systemic, architectural, or procedural failure.
4. Mitigation: How the bleeding was actually stopped during the outage.
5. Action Items (Crucial): Specific, Jira-ticketed engineering tasks to ensure this exact physical failure mechanism can NEVER happen again. Assign names and deadlines to these items.
```

## Part 5: Common Incident Anti-Patterns

```
Outages are chaotic. Watch for these fatal anti-patterns that prolong the downtime and increase the damage.

ANTI-PATTERN 1: THE HERO COMPLEX (Cowboy Coding)
├─ Symptom: One highly experienced senior engineer logs into the production database directly, runs a complex custom SQL script from memory, fixes the issue, and tells no one what they did.
└─ Cure: Ban direct SSH access to production entirely. Require all mitigations to be executed via audited CI/CD pipelines or at least documented in the incident channel so the entire team learns the physics of the system and no single human becomes a bottleneck.

ANTI-PATTERN 2: THE "LET'S JUST WAIT AND SEE"
├─ Symptom: The database CPU is pinned at 99%. Requests are queuing. The team waits 15 minutes to see if "it will clear up on its own when traffic dies down."
└─ Cure: Computers do not spontaneously heal themselves. If the system is thrashing or deadlocked, intervene immediately. Waiting destroys user trust and corrupts state.

ANTI-PATTERN 3: DEBUGGING IN PROD (The Root Cause Obsession)
├─ Symptom: The site is hard down. The team spends 2 hours reading raw logs trying to find the exact line of code that caused the memory leak, while thousands of customers cannot buy products.
└─ Cure: Reboot the servers to clear the memory leak. Restore service. Download the logs to your local machine, or look at Datadog, and debug the root cause offline while the business continues to make money.

ANTI-PATTERN 4: THE SILENT WAR ROOM
├─ Symptom: Three engineers are in a Zoom call during an outage, but nobody is talking. They are all independently typing and testing things without coordination.
└─ Cure: The Incident Commander must force verbal confirmation. "Alice, are you querying the replica? Bob, prepare the rollback script. Acknowledge." Silence leads to duplicated effort and conflicting destructive commands.

ANTI-PATTERN 5: THE CASCADING RETRY (The Thundering Herd)
├─ Symptom: The database slows down. The web servers timeout. The web servers immediately retry the request. The database gets hit with 2x the traffic, slowing down further, causing 4x the retries, instantly killing the database.
└─ Cure: Implement Exponential Backoff and Jitter on all network retries. Implement aggressive Circuit Breakers that fail fast when the downstream service is unhealthy, preventing the cascade.
```

## Part 6: AI Execution Protocol in a Crisis (Deterministic-Cognitive-Infrastructure)

```
When an AI operating under the Deterministic-Cognitive-Infrastructure framework is pulled into a Sev-1 incident by an engineer, it must shift into a highly specific operational mode.

1. Declare Status: "Incident Mode Engaged. Prioritizing mitigation over optimization."
2. Demand Logs, Not Feelings: If the user says "The database is broken," the AI must reply: "Provide the exact error logs, the current connection count, and CPU metrics. I need hard data to formulate a hypothesis."
3. Propose Mitigations First: Offer the fastest way to restore state (e.g., "Revert to commit X," or "Increase the connection pool limit from 100 to 500").
4. Warn of Destructive Actions: If the user proposes a dangerous action (e.g., `DROP TABLE`, `rm -rf`), the AI MUST explicitly warn of the consequences, demand a backup plan, and ask for final confirmation, acting as a synthetic Incident Commander. "WARNING: Dropping that table will permanently destroy user session data. Are you absolutely sure?"
5. Maintain the Timeline: The AI should log the steps it suggests and the results the user feeds back, acting as an automated Scribe for the eventual post-mortem.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)

<!-- DCI-RELATED-END -->
