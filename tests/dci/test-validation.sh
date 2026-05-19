#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
npm run dci:validate
npm exec tsc -- --noEmit
pass validation
