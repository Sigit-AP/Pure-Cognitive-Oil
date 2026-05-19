#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
for skill in skills/using-dci/SKILL.md skills/dci-routing/SKILL.md skills/dci-verification/SKILL.md; do
  test -f "$skill" || fail "missing $skill"
  grep -q '^---' "$skill" || fail "missing frontmatter $skill"
  grep -q '^name:' "$skill" || fail "missing name $skill"
  grep -q '^description:' "$skill" || fail "missing description $skill"
done
python - <<'PY'
import json
m=json.load(open('.dci/cache/manifest.json'))
paths={f['path'] for f in m['files']}
for p in ['skills/using-dci/SKILL.md','skills/dci-routing/SKILL.md','skills/dci-verification/SKILL.md']:
    assert p in paths, p
print('skill files indexed')
PY
pass skill-triggering
