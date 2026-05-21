#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

node scripts/dci/lifecycle.mjs start "first use runtime audit" >/tmp/dci-lifecycle-start.txt
node scripts/dci/lifecycle.mjs checkpoint "first use runtime audit" >/tmp/dci-lifecycle-checkpoint.txt
node scripts/dci/lifecycle.mjs finish "first use runtime audit" >/tmp/dci-lifecycle-finish.txt
npm run dci:lifecycle >/tmp/dci-lifecycle.log

grep -q 'DCI lifecycle pass' /tmp/dci-lifecycle.log || fail "lifecycle certificate did not pass"

python - <<'PY'
import json
from pathlib import Path
start=Path('/tmp/dci-lifecycle-start.txt').read_text()
checkpoint=Path('/tmp/dci-lifecycle-checkpoint.txt').read_text()
finish=Path('/tmp/dci-lifecycle-finish.txt').read_text()
assert 'DCI_LIFECYCLE_START' in start
assert 'DCI_LIFECYCLE_CHECKPOINT' in checkpoint
assert 'DCI_LIFECYCLE_FINISH' in finish
assert 'Routed references' in start
assert 'Only claim 2x when scorecard output proves it.' in finish
r=json.load(open('.dci/cache/lifecycle-certificate.json'))
assert r['status']=='pass', r
assert r['score']==100, r['score']
assert r['target']['sustainedLifecycleRatio'] >= 2, r['target']
phases={p['name']:p for p in r['phases']}
for name in ['first-use','mid-use','runtime','final-use']:
    assert name in phases, name
    assert phases[name]['status']=='pass', phases[name]
assert r['evidence']['references']['files'] >= 48, r['evidence']
assert r['evidence']['references']['sections'] >= 800, r['evidence']
assert r['evidence']['references']['edges'] >= 800, r['evidence']
print('lifecycle ratio', r['target']['sustainedLifecycleRatio'], 'score', r['score'])
PY
pass lifecycle
