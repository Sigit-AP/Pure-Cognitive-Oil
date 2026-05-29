#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"

node references/runtime/pco-reference-runtime.mjs folders >/tmp/pco-reference-folders.log
grep -q 'references/core/runtime.mjs' /tmp/pco-reference-folders.log || fail "missing core folder runtime"
grep -q 'references/workflows/runtime.mjs' /tmp/pco-reference-folders.log || fail "missing workflows folder runtime"

node references/runtime/pco-reference-runtime.mjs route "debug hallucination verification" --limit 8 --depth 1 >/tmp/pco-reference-route.log
grep -q 'PCO Reference Runtime Route' /tmp/pco-reference-route.log || fail "missing route header"
grep -q 'references/quality-safety' /tmp/pco-reference-route.log || fail "route did not load quality-safety references"
grep -q 'references/cognitive-engines' /tmp/pco-reference-route.log || fail "route did not load cognitive engines"

node references/core/runtime.mjs route "pipeline iron laws" --limit 4 >/tmp/pco-core-runtime.log
grep -q 'references/core/' /tmp/pco-core-runtime.log || fail "core runtime did not select core references"

node references/runtime/pco-reference-runtime.mjs context "security audit" --limit 4 --depth 1 --max-chars 12000 >/tmp/pco-reference-context.log
grep -q '<PCO_REFERENCE_RUNTIME_CONTEXT>' /tmp/pco-reference-context.log || fail "missing context block"
grep -q '<PCO_REFERENCE path=' /tmp/pco-reference-context.log || fail "missing embedded reference content"

node references/runtime/pco-reference-runtime.mjs capsule "full depth resource optimization" --limit 8 --depth 2 >/tmp/pco-reference-capsule.log
grep -q 'PCO Professional Capsule' /tmp/pco-reference-capsule.log || fail "missing professional capsule header"
grep -q 'Full-depth load ladder' /tmp/pco-reference-capsule.log || fail "missing full-depth load ladder"
grep -q 'references/advanced/resource-optimization.md' /tmp/pco-reference-capsule.log || fail "capsule did not preserve resource optimization source path"

pass reference-runtime
