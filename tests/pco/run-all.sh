#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
bash tests/pco/test-bootstrap.sh
bash tests/pco/test-bootstrap-caching.sh
bash tests/pco/test-routing.sh
bash tests/pco/test-validation.sh
bash tests/pco/test-skill-triggering.sh
bash tests/pco/test-reference-runtime.sh
bash tests/pco/test-reference-toolkits.sh
bash tests/pco/test-agentic-auto.sh
bash tests/pco/test-opencode-plugin.sh
bash tests/pco/test-runtime-audit.sh
bash tests/pco/test-healthcheck.sh
bash tests/pco/test-lifecycle.sh
bash tests/pco/test-scorecard.sh
bash tests/pco/test-parity.sh
echo "PASS: all PCO ecosystem tests"
