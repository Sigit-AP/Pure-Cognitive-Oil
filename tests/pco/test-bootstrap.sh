#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
node scripts/pco/bootstrap.mjs --json >/tmp/pco-bootstrap.json
python -m json.tool /tmp/pco-bootstrap.json >/dev/null
python - <<'PY'
import json
s=json.load(open('/tmp/pco-bootstrap.json'))
ctx=s.get('additionalContext','')
assert 'Pure Cognitive Oil' in ctx
assert 'PCO_BOOT_CONTRACT' in ctx
assert 'SKILL.md' in ctx
assert 'quality gates' in ctx.lower()
assert 'references/runtime/pco-reference-runtime.mjs' in ctx
print('bootstrap context chars', len(ctx))
PY
CLAUDE_PLUGIN_ROOT=/tmp/pco-plugin node scripts/pco/bootstrap.mjs --json >/tmp/pco-bootstrap-claude.json
python - <<'PY'
import json
s=json.load(open('/tmp/pco-bootstrap-claude.json'))
ctx=s['hookSpecificOutput']['additionalContext']
assert s['hookSpecificOutput']['hookEventName']=='SessionStart'
assert 'PCO_BOOT_CONTRACT' in ctx
PY
CURSOR_PLUGIN_ROOT=/tmp/pco-plugin node scripts/pco/bootstrap.mjs --json >/tmp/pco-bootstrap-cursor.json
python - <<'PY'
import json
s=json.load(open('/tmp/pco-bootstrap-cursor.json'))
assert 'PCO_BOOT_CONTRACT' in s['additional_context']
PY
pass bootstrap
