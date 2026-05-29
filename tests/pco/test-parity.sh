#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
npm run pco:parity
python - <<'PY'
import json
r=json.load(open('.pco/cache/parity-report.json'))
assert r['status']=='pass', r
assert r['score']==100, r['score']
assert len(r['gates'])>=10
print('parity score', r['score'])
PY
pass parity
