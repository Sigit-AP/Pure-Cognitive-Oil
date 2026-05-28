#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"

node references/runtime/dci-reference-runtime.mjs folders >/tmp/dci-reference-folders.log
grep -q 'references/core/runtime.mjs' /tmp/dci-reference-folders.log || fail "missing core folder runtime"
grep -q 'references/workflows/runtime.mjs' /tmp/dci-reference-folders.log || fail "missing workflows folder runtime"

node references/runtime/dci-reference-runtime.mjs route "debug hallucination verification" --limit 8 --depth 1 >/tmp/dci-reference-route.log
grep -q 'DCI Reference Runtime Route' /tmp/dci-reference-route.log || fail "missing route header"
grep -q 'references/quality-safety' /tmp/dci-reference-route.log || fail "route did not load quality-safety references"
grep -q 'references/cognitive-engines' /tmp/dci-reference-route.log || fail "route did not load cognitive engines"

node references/core/runtime.mjs route "pipeline iron laws" --limit 4 >/tmp/dci-core-runtime.log
grep -q 'references/core/' /tmp/dci-core-runtime.log || fail "core runtime did not select core references"

node references/runtime/dci-reference-runtime.mjs context "security audit" --limit 4 --depth 1 --max-chars 12000 >/tmp/dci-reference-context.log
grep -q '<DCI_REFERENCE_RUNTIME_CONTEXT>' /tmp/dci-reference-context.log || fail "missing context block"
grep -q '<DCI_REFERENCE path=' /tmp/dci-reference-context.log || fail "missing embedded reference content"

node references/runtime/dci-reference-runtime.mjs capsule "full depth resource optimization" --limit 8 --depth 2 >/tmp/dci-reference-capsule.log
grep -q 'DCI Professional Capsule' /tmp/dci-reference-capsule.log || fail "missing professional capsule header"
grep -q 'Full-depth load ladder' /tmp/dci-reference-capsule.log || fail "missing full-depth load ladder"
grep -q 'references/advanced/resource-optimization.md' /tmp/dci-reference-capsule.log || fail "capsule did not preserve resource optimization source path"

pass reference-runtime
