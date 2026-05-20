#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"

node scripts/dci/runtime-audit.mjs >/tmp/dci-runtime-audit.log
grep -q 'DCI runtime audit pass' /tmp/dci-runtime-audit.log
python - <<'PY'
import json
r=json.load(open('.dci/cache/runtime-audit-report.json'))
assert r['status']=='pass', r
assert not r['failures'], r['failures']
print('runtime audit checks', len(r['checks']))
PY
pass runtime-audit
