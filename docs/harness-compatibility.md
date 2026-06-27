# Harness Compatibility

| Harness | Status | Evidence | Limitation |
|---|---|---|---|
| OpenCode | stable-local | `.opencode/plugins/pco.js`, package main | Must verify after config changes. |
| Claude-compatible file loading | experimental | `CLAUDE.md`, `.claude-plugin/` | Host-specific behavior varies. |
| Codex-compatible file loading | experimental | `.codex-plugin/` | Host-specific behavior varies. |
| Cursor-compatible file loading | experimental | `.cursor-plugin/`, `.cursor/` | Host-specific behavior varies. |
| Generic model direct-use | stable-doc | `AI_MODEL_BOOT.md`, `SKILL.md` | Manual discipline required. |
