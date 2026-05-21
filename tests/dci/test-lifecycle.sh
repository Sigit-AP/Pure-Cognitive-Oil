#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
node scripts/dci/lifecycle.mjs start "first use runtime audit" >/tmp/dci-lifecycle-start.txt
node scripts/dci/lifecycle.mjs checkpoint "first use runtime audit" >/tmp/dci-lifecycle-checkpoint.txt
node scripts/dci/lifecycle.mjs finish "first use runtime audit" >/tmp/dci-lifecycle-finish.txt
python - <<'PY'
from pathlib import Path
start=Path('/tmp/dci-lifecycle-start.txt').read_text()
checkpoint=Path('/tmp/dci-lifecycle-checkpoint.txt').read_text()
finish=Path('/tmp/dci-lifecycle-finish.txt').read_text()
assert 'DCI_LIFECYCLE_START' in start
assert 'DCI_LIFECYCLE_CHECKPOINT' in checkpoint
assert 'DCI_LIFECYCLE_FINISH' in finish
assert 'Routed references' in start
assert 'Only claim 2x when scorecard output proves it.' in finish
print('PASS: lifecycle')
PY
