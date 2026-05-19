#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
bash tests/dci/test-bootstrap.sh
bash tests/dci/test-routing.sh
bash tests/dci/test-validation.sh
bash tests/dci/test-skill-triggering.sh
bash tests/dci/test-parity.sh
echo "PASS: all DCI ecosystem tests"
