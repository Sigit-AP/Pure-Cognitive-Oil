#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
npx tsx scripts/dci/bootstrap.ts --json >/tmp/dci-bootstrap.json
python -m json.tool /tmp/dci-bootstrap.json >/dev/null
python - <<'PY'
import json
s=json.load(open('/tmp/dci-bootstrap.json'))
ctx=s.get('additionalContext','')
assert 'Deterministic Cognitive Infrastructure' in ctx
assert 'SKILL.md' in ctx
assert 'quality gates' in ctx.lower()
print('bootstrap context chars', len(ctx))
PY
pass bootstrap
