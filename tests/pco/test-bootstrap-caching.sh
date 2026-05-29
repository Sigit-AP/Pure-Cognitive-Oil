#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
node tests/pco/test-bootstrap-caching.mjs >/tmp/pco-bootstrap-caching.json
python -m json.tool /tmp/pco-bootstrap-caching.json >/dev/null
pass bootstrap-caching
