#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
node scripts/dci/scorecard.mjs --json >/tmp/dci-scorecard.json
python - <<'PY'
import json
card=json.load(open('/tmp/dci-scorecard.json'))
assert card['claim']['valid'] is True
assert card['claim']['ratio'] >= 2
assert card['dci']['passed'] >= 32
assert card['superpowersBaseline']['features'] == 16
print('scorecard ratio', card['claim']['ratio'])
print('PASS: scorecard')
PY
