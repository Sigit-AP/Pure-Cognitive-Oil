#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"

node scripts/pco/runtime-audit.mjs >/tmp/pco-runtime-audit.log
grep -q 'PCO runtime audit pass' /tmp/pco-runtime-audit.log
python - <<'PY'
import json
r=json.load(open('.pco/cache/runtime-audit-report.json'))
assert r['status']=='pass', r
assert not r['failures'], r['failures']
full=r['referenceFullRead']
assert full['files']>=49, full['files']
assert full['totalChars']>600000, full['totalChars']
assert all(item['status']=='pass' for item in full['items'])
print('runtime audit checks', len(r['checks']), 'full-read files', full['files'])
PY
pass runtime-audit
