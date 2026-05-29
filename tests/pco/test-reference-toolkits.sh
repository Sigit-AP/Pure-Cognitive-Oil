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
  node "$tool" list >/tmp/pco-toolkit-list.out
  grep -q "Toolkit Commands" /tmp/pco-toolkit-list.out
  node references/tools/reference-toolkit.mjs domain "$domain" >/tmp/pco-toolkit-domain.out
  grep -q "Toolkit Commands" /tmp/pco-toolkit-domain.out
  node references/tools/reference-toolkit.mjs brief "$domain" "upgrade PCO references" >/tmp/pco-toolkit-brief.out
  test -s /tmp/pco-toolkit-brief.out
  node references/tools/reference-toolkit.mjs gate "$domain" "upgrade PCO references" >/tmp/pco-toolkit-gate.out
  grep -q "gates" /tmp/pco-toolkit-gate.out
 done

node references/tools/reference-toolkit.mjs list >/tmp/pco-reference-toolkit.out
grep -q "PCO Reference Toolkit" /tmp/pco-reference-toolkit.out
npm run pco:tools >/tmp/pco-npm-tools.out
grep -q "PCO Reference Toolkit" /tmp/pco-npm-tools.out
node bin/pco.mjs tools brief workflows "publish npm package" >/tmp/pco-cli-tools.out
grep -q "Workflow brief" /tmp/pco-cli-tools.out

echo "PASS: reference toolkits"
