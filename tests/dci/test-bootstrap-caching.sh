#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
node tests/dci/test-bootstrap-caching.mjs >/tmp/dci-bootstrap-caching.json
python -m json.tool /tmp/dci-bootstrap-caching.json >/dev/null
pass bootstrap-caching
