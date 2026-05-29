#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
npm run pco:validate
npm exec tsc -- --noEmit
pass validation
