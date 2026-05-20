#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
node scripts/dci/bootstrap.mjs --json >/tmp/dci-bootstrap.json
python -m json.tool /tmp/dci-bootstrap.json >/dev/null
python - <<'PY'
import json
s=json.load(open('/tmp/dci-bootstrap.json'))
ctx=s.get('additionalContext','')
assert 'Deterministic Cognitive Infrastructure' in ctx
assert 'DCI_BOOT_CONTRACT' in ctx
assert 'SKILL.md' in ctx
assert 'quality gates' in ctx.lower()
assert 'references/runtime/dci-reference-runtime.mjs' in ctx
print('bootstrap context chars', len(ctx))
PY
CLAUDE_PLUGIN_ROOT=/tmp/dci-plugin node scripts/dci/bootstrap.mjs --json >/tmp/dci-bootstrap-claude.json
python - <<'PY'
import json
s=json.load(open('/tmp/dci-bootstrap-claude.json'))
ctx=s['hookSpecificOutput']['additionalContext']
assert s['hookSpecificOutput']['hookEventName']=='SessionStart'
assert 'DCI_BOOT_CONTRACT' in ctx
PY
CURSOR_PLUGIN_ROOT=/tmp/dci-plugin node scripts/dci/bootstrap.mjs --json >/tmp/dci-bootstrap-cursor.json
python - <<'PY'
import json
s=json.load(open('/tmp/dci-bootstrap-cursor.json'))
assert 'DCI_BOOT_CONTRACT' in s['additional_context']
PY
pass bootstrap
