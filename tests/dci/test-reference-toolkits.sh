#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

domains=(core cognitive-engines quality-safety knowledge-bases advanced workflows)

for domain in "${domains[@]}"; do
  tool="references/$domain/tools/$domain-toolkit.mjs"
  case "$domain" in
    cognitive-engines) tool="references/$domain/tools/cognitive-engines-toolkit.mjs" ;;
    quality-safety) tool="references/$domain/tools/quality-safety-toolkit.mjs" ;;
    knowledge-bases) tool="references/$domain/tools/knowledge-bases-toolkit.mjs" ;;
  esac
  test -f "$tool"
  node "$tool" list >/tmp/dci-toolkit-list.out
  grep -q "Toolkit Commands" /tmp/dci-toolkit-list.out
  node references/tools/reference-toolkit.mjs domain "$domain" >/tmp/dci-toolkit-domain.out
  grep -q "Toolkit Commands" /tmp/dci-toolkit-domain.out
  node references/tools/reference-toolkit.mjs brief "$domain" "upgrade DCI references" >/tmp/dci-toolkit-brief.out
  test -s /tmp/dci-toolkit-brief.out
  node references/tools/reference-toolkit.mjs gate "$domain" "upgrade DCI references" >/tmp/dci-toolkit-gate.out
  grep -q "gates" /tmp/dci-toolkit-gate.out
 done

node references/tools/reference-toolkit.mjs list >/tmp/dci-reference-toolkit.out
grep -q "DCI Reference Toolkit" /tmp/dci-reference-toolkit.out
npm run dci:tools >/tmp/dci-npm-tools.out
grep -q "DCI Reference Toolkit" /tmp/dci-npm-tools.out
node bin/dci.mjs tools brief workflows "publish npm package" >/tmp/dci-cli-tools.out
grep -q "Workflow brief" /tmp/dci-cli-tools.out

echo "PASS: reference toolkits"
