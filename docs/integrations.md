# Integrations

| Surface | Path | Status | Notes |
|---|---|---|---|
| OpenCode | `.opencode/` | active | Main package entry targets `.opencode/plugins/pco.js`. |
| Claude-style | `.claude-plugin/`, `CLAUDE.md` | documented | Depends on host loading behavior. |
| Codex-style | `.codex-plugin/` | documented | Verify per host before claiming support. |
| Cursor-style | `.cursor-plugin/`, `.cursor/` | documented | Verify per host before claiming support. |
| Generic AI model | `AI_MODEL_BOOT.md`, `SKILL.md` | active | File-only fallback available. |

Integrations are compatibility surfaces, not universal support guarantees.
