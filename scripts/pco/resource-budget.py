#!/usr/bin/env python3
import json, os, re, sys
from pathlib import Path

ROOT = Path.cwd()
REFS = ROOT / 'references'
MODES = {
    'quick': {'max_files': 4, 'max_chars': 8000, 'depth': 0},
    'standard': {'max_files': 8, 'max_chars': 18000, 'depth': 1},
    'deep': {'max_files': 14, 'max_chars': 28000, 'depth': 2},
    'critical': {'max_files': 24, 'max_chars': 45000, 'depth': 2},
}

def md_files():
    return sorted(p for p in REFS.rglob('*.md') if p.name != 'REFERENCE_GRAPH.md')

def stats(path):
    text = path.read_text(encoding='utf-8')
    return {
        'path': str(path.relative_to(ROOT)).replace('\\', '/'),
        'chars': len(text),
        'words': len(re.findall(r'\S+', text)),
        'headings': len(re.findall(r'^#{1,6}\s+', text, re.M)),
        'approx_tokens': max(1, len(text) // 4),
    }

def main():
    files = [stats(p) for p in md_files()]
    total_chars = sum(f['chars'] for f in files)
    total_tokens = sum(f['approx_tokens'] for f in files)
    largest = sorted(files, key=lambda x: x['chars'], reverse=True)[:10]
    report = {
        'schemaVersion': '1.0.0',
        'files': len(files),
        'totalChars': total_chars,
        'approxTokens': total_tokens,
        'modes': MODES,
        'largestFiles': largest,
        'recommendations': [
            'Use AI_MODEL_BOOT.md and PCO_COMPACT_INDEX.md before full reference loading.',
            'Use quick/standard/deep/critical mode budgets instead of loading all references.',
            'Escalate only when evidence, risk, contradiction, or user goal changes.',
            'Prefer exact section drilldown over full-file load for large references.'
        ]
    }
    out = ROOT / '.pco' / 'cache' / 'resource-budget-report.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    if '--json' in sys.argv:
        print(json.dumps(report, indent=2))
    else:
        print(f"PCO resource budget: files={report['files']} chars={total_chars} approxTokens={total_tokens}")
        for mode, cfg in MODES.items():
            print(f"- {mode}: maxFiles={cfg['max_files']} maxChars={cfg['max_chars']} depth={cfg['depth']}")
        print(f"report={out.relative_to(ROOT)}")

if __name__ == '__main__':
    main()
