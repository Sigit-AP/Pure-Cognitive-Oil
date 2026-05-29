#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
bash tests/dci/test-bootstrap.sh
bash tests/dci/test-bootstrap-caching.sh
bash tests/dci/test-routing.sh
bash tests/dci/test-validation.sh
bash tests/dci/test-skill-triggering.sh
bash tests/dci/test-reference-runtime.sh
bash tests/dci/test-reference-toolkits.sh
bash tests/dci/test-agentic-auto.sh
bash tests/dci/test-opencode-plugin.sh
bash tests/dci/test-runtime-audit.sh
bash tests/dci/test-healthcheck.sh
bash tests/dci/test-lifecycle.sh
bash tests/dci/test-scorecard.sh
bash tests/dci/test-parity.sh
echo "PASS: all DCI ecosystem tests"
