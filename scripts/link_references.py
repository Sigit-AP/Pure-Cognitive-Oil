#!/usr/bin/env python3
"""Build and validate the DCI reference knowledge graph.

Creates:
- references/REFERENCE_GRAPH.md: human-readable cross-folder navigation.
- references/reference-graph.mjs: executable machine graph for plugins/agents.
- A "Related DCI references" block in every reference .md.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REFS = ROOT / "references"
START = "<!-- DCI-RELATED-START -->"
END = "<!-- DCI-RELATED-END -->"

CATEGORY_RULES = {
    "core": ["cognitive-engines", "quality-safety", "workflows"],
    "cognitive-engines": ["core", "quality-safety", "advanced"],
    "knowledge-bases": ["core", "cognitive-engines", "workflows"],
    "quality-safety": ["core", "cognitive-engines", "workflows"],
    "advanced": ["cognitive-engines", "quality-safety", "workflows"],
    "workflows": ["core", "quality-safety", "cognitive-engines", "knowledge-bases"],
    ".": ["core", "workflows", "quality-safety"],
}

KEYWORD_MAP = {
    "debug": ["workflows/debugging-unknown.md", "quality-safety/error-recovery.md", "cognitive-engines/self-correction.md"],
    "security": ["workflows/security-audit.md", "quality-safety/ethical-framework.md", "cognitive-engines/adversarial-reasoning.md"],
    "review": ["workflows/code-review.md", "quality-safety/verification-checklist.md", "cognitive-engines/hallucination-defense.md"],
    "architecture": ["workflows/architecture.md", "core/pipeline-phases.md", "advanced/emergent-complexity.md"],
    "performance": ["workflows/performance.md", "advanced/resource-optimization.md", "advanced/cognitive-load.md"],
    "migration": ["workflows/migration.md", "workflows/legacy-rescue.md", "quality-safety/error-recovery.md"],
    "api": ["workflows/api-design.md", "advanced/communication-optimization.md", "quality-safety/quality-gates.md"],
    "hallucination": ["cognitive-engines/hallucination-defense.md", "cognitive-engines/zero-hallucination.md", "quality-safety/verification-checklist.md"],
    "uncertainty": ["cognitive-engines/uncertainty-engine.md", "cognitive-engines/meta-cognition.md", "quality-safety/verification-checklist.md"],
    "decision": ["knowledge-bases/decision-tree.md", "cognitive-engines/causal-inference.md", "cognitive-engines/first-principles.md"],
}


def title(path: Path) -> str:
    text = path.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r"^#\s+(.+)$", text, re.M)
    return m.group(1).strip() if m else path.stem.replace("-", " ").title()


def category(rel: str) -> str:
    parts = rel.split("/")
    return parts[0] if len(parts) > 1 else "."


def rel_link(from_rel: str, to_rel: str) -> str:
    return Path(to_rel).as_posix() if "/" not in from_rel else Path("../" * (len(Path(from_rel).parts) - 1), to_rel).as_posix()


def build_graph() -> dict:
    files = sorted(p for p in REFS.rglob("*.md") if p.name not in {"REFERENCE_GRAPH.md"})
    nodes = {p.relative_to(REFS).as_posix(): {"title": title(p), "category": category(p.relative_to(REFS).as_posix())} for p in files}
    edges = {rel: set() for rel in nodes}
    relation_meta = []

    by_cat = {}
    for rel, meta in nodes.items():
        by_cat.setdefault(meta["category"], []).append(rel)

    for rel, meta in nodes.items():
        cat = meta["category"]
        # same-folder neighbors
        peers = [r for r in by_cat.get(cat, []) if r != rel]
        
        for t in peers[:2]:
            edges[rel].add(t)
            relation_meta.append({"from": rel, "to": t, "type": "same-folder-peer", "purpose": "preserve local continuity inside the same DCI subsystem"})
        # cross-folder anchors
        for target_cat in CATEGORY_RULES.get(cat, []):
            
            for t in by_cat.get(target_cat, [])[:2]:
                edges[rel].add(t)
                relation_meta.append({"from": rel, "to": t, "type": "cross-layer", "purpose": f"connect {cat} with {target_cat} for multi-layer reasoning"})
        # keyword semantic edges
        hay = (rel + " " + meta["title"]).lower()
        for key, targets in KEYWORD_MAP.items():
            if key in hay:
                
                for t in targets:
                    if t in nodes and t != rel:
                        edges[rel].add(t)
                        relation_meta.append({"from": rel, "to": t, "type": "semantic-trigger", "trigger": key, "purpose": "activate related engine/workflow from shared concept"})
        edges[rel] = sorted(edges[rel])[:8]

    return {"nodes": nodes, "edges": edges, "relations": relation_meta, "runtime_contract": {"agent_entry": "SKILL.md", "human_index": "references/REFERENCE_GRAPH.md", "machine_graph": "references/reference-graph.mjs", "runtime": "references/runtime/dci-reference-runtime.mjs", "regenerator": "scripts/link_references.py", "rule": "Load executable graph first, choose relevant nodes, traverse cross-layer edges, then verify with quality-safety nodes."}}


def update_docs(graph: dict) -> None:
    for rel, targets in graph["edges"].items():
        path = REFS / rel
        text = path.read_text(encoding="utf-8", errors="ignore").rstrip()
        lines = [START, "", "## Related DCI references", ""]
        for t in targets:
            lines.append(f"- [{graph['nodes'][t]['title']}]({rel_link(rel, t)})")
        lines += ["", END]
        block = "\n".join(lines)
        if START in text and END in text:
            text = re.sub(re.escape(START) + r".*?" + re.escape(END), block, text, flags=re.S)
        else:
            text = text + "\n\n" + block
        path.write_text(text + "\n", encoding="utf-8")


def write_indexes(graph: dict) -> None:
    graph_json = json.dumps(graph, indent=2, ensure_ascii=False)
    legacy_json = REFS / "reference-graph.json"
    if legacy_json.exists():
        legacy_json.unlink()
    (REFS / "reference-graph.mjs").write_text(
        "// Generated by scripts/link_references.py. Do not edit by hand.\n"
        "// Executable DCI reference graph. JSON has been replaced by this runtime module.\n"
        f"const graph = {graph_json};\n"
        "export default graph;\n"
        "export const nodes = graph.nodes;\n"
        "export const edges = graph.edges;\n"
        "export const relations = graph.relations;\n"
        "export const runtimeContract = graph.runtime_contract;\n",
        encoding="utf-8",
    )
    by_cat = {}
    for rel, meta in graph["nodes"].items():
        by_cat.setdefault(meta["category"], []).append(rel)
    out = ["# DCI Reference Graph", "", "Executable graph: [`reference-graph.mjs`](reference-graph.mjs). Runtime loader: [`runtime/dci-reference-runtime.mjs`](runtime/dci-reference-runtime.mjs).", ""]
    for cat in sorted(by_cat):
        heading = "Root" if cat == "." else cat
        out += [f"## {heading}", ""]
        for rel in by_cat[cat]:
            out.append(f"- [{graph['nodes'][rel]['title']}]({rel})")
            for target in graph["edges"].get(rel, [])[:4]:
                out.append(f"  - connects to [{graph['nodes'][target]['title']}]({target})")
        out.append("")
    (REFS / "REFERENCE_GRAPH.md").write_text("\n".join(out), encoding="utf-8")


def validate(graph: dict) -> int:
    errors = []
    for rel in graph["nodes"]:
        path = REFS / rel
        text = path.read_text(encoding="utf-8", errors="ignore")
        if not re.search(r"^#\s+", text, re.M):
            errors.append(f"missing H1: {rel}")
        if START not in text or END not in text:
            errors.append(f"missing related block: {rel}")
        if not graph["edges"].get(rel):
            errors.append(f"no graph edges: {rel}")
    for rel, targets in graph["edges"].items():
        for target in targets:
            if target not in graph["nodes"]:
                errors.append(f"broken graph edge: {rel} -> {target}")
    if errors:
        print("DCI reference graph validation failed:")
        print("\n".join(errors))
        return 1
    print(f"DCI reference graph valid: {len(graph['nodes'])} nodes, {sum(len(v) for v in graph['edges'].values())} edges")
    return 0


def main() -> int:
    graph = build_graph()
    update_docs(graph)
    write_indexes(graph)
    return validate(graph)

if __name__ == "__main__":
    raise SystemExit(main())
