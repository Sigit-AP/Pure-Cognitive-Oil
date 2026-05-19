/**
 * Deterministic-Cognitive-Infrastructure plugin for OpenCode.ai.
 *
 * Injects DCI bootstrap context via message transform and registers DCI skills.
 * This is functional runtime glue, not a template.
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };
  return { frontmatter: {}, content: match[2] };
};

const normalizePath = (p, homeDir) => {
  if (!p || typeof p !== 'string') return null;
  let normalized = p.trim();
  if (!normalized) return null;
  if (normalized.startsWith('~/')) normalized = path.join(homeDir, normalized.slice(2));
  else if (normalized === '~') normalized = homeDir;
  return path.resolve(normalized);
};

let bootstrapCache = undefined;

export const DCIPlugin = async () => {
  const homeDir = os.homedir();
  const repoRoot = path.resolve(__dirname, '../..');
  const skillsDir = path.join(repoRoot, 'skills');
  const skillPath = path.join(repoRoot, 'SKILL.md');
  const graphPath = path.join(repoRoot, 'references', 'reference-graph.json');
  const envConfigDir = normalizePath(process.env.OPENCODE_CONFIG_DIR, homeDir);
  const configDir = envConfigDir || path.join(homeDir, '.config/opencode');
  void configDir;

  const getBootstrapContent = () => {
    if (bootstrapCache !== undefined) return bootstrapCache;
    if (!fs.existsSync(skillPath)) {
      bootstrapCache = null;
      return null;
    }

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);
    let graphSummary = '';

    if (fs.existsSync(graphPath)) {
      try {
        const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
        graphSummary = `\n\n**DCI Runtime Graph Loaded:**\n- nodes: ${Object.keys(graph.nodes || {}).length}\n- edges: ${Object.values(graph.edges || {}).reduce((n, v) => n + v.length, 0)}\n- relations: ${(graph.relations || []).length}\n- contract: ${(graph.runtime_contract && graph.runtime_contract.rule) || 'Load graph first, traverse cross-layer edges, verify with quality-safety.'}`;
      } catch {
        graphSummary = '\n\n**DCI Runtime Graph:** present but unreadable; use references/REFERENCE_GRAPH.md.';
      }
    }

    const toolMapping = `**Tool Mapping for OpenCode:**
When DCI references tools you do not have, substitute OpenCode equivalents:
- \`TodoWrite\` → \`todowrite\`
- subagents → OpenCode subagent system (@mention)
- skill loading → OpenCode native \`skill\` tool
- file/shell operations → OpenCode native file and shell tools

Use DCI by loading graph context first, selecting relevant nodes, traversing cross-layer relations, and verifying through quality-safety gates.`;

    bootstrapCache = `<EXTREMELY_IMPORTANT>
You have Deterministic-Cognitive-Infrastructure.

**IMPORTANT: DCI bootstrap is already loaded. Do not reload it redundantly. Operate through the DCI graph and verification gates.**

${content}
${graphSummary}

${toolMapping}
</EXTREMELY_IMPORTANT>`;

    return bootstrapCache;
  };

  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(skillsDir)) config.skills.paths.push(skillsDir);
      if (!config.skills.paths.includes(repoRoot)) config.skills.paths.push(repoRoot);
    },

    'experimental.chat.messages.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (!bootstrap || !output.messages.length) return;
      const firstUser = output.messages.find((m) => m.info.role === 'user');
      if (!firstUser || !firstUser.parts.length) return;
      if (firstUser.parts.some((p) => p.type === 'text' && p.text.includes('Deterministic-Cognitive-Infrastructure'))) return;
      const ref = firstUser.parts[0];
      firstUser.parts.unshift({ ...ref, type: 'text', text: bootstrap });
    },
  };
};

export default DCIPlugin;
