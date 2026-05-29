#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
node scripts/pco/healthcheck.mjs >/tmp/pco-healthcheck.txt
python - <<'PY'
from pathlib import Path
text=Path('/tmp/pco-healthcheck.txt').read_text()
assert 'PCO_HEALTHCHECK' in text
assert 'ok: true' in text
assert 'scorecard:' in text
assert 'PASS reference runtime loads >=48 files' in text
print('PASS: healthcheck')
PY
