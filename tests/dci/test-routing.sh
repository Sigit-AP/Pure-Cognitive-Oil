#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"
npm run dci:all >/tmp/dci-all.log
python - <<'PY'
import json
r=json.load(open('.dci/cache/agent-routing.json'))
rm=json.load(open('.dci/cache/resource-map.json'))
needed={'need-thinking','need-reasoning','need-agentic','need-knowledge','need-reliability','need-intelligence','any-professional-task'}
seen={x['trigger'] for x in r['routes']}
missing=needed-seen
assert not missing, missing
for axis in ['thinking','reasoning','agentic','knowledge','reliability','intelligence','all']:
    assert rm['professionalLoadPlans'][axis], axis
assert rm['byConcept']
assert rm['neighbors']
print('routes', sorted(seen))
PY
pass routing
