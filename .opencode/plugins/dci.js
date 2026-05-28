/**
 * Deterministic-Cognitive-Infrastructure plugin for OpenCode.ai.
 *
 * Injects DCI bootstrap context via message transform and registers DCI skills.
 * This is functional runtime glue, not a template.
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath, pathToFileURL } from 'url';

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
let runtimeCache = undefined;

async function loadRuntimeSummary(repoRoot) {
  if (runtimeCache !== undefined) return runtimeCache;
  const runtimePath = path.join(repoRoot, 'references', 'runtime', 'dci-reference-runtime.mjs');
  if (!fs.existsSync(runtimePath)) {
    runtimeCache = '';
    return runtimeCache;
  }
  try {
    const runtime = await import(pathToFileURL(runtimePath).href);
    const plan = runtime.routeReferences('professional task verification reasoning workflow', { limit: 8, depth: 1 });
    const folders = Object.entries(plan.runtime.folders || {})
      .map(([name, meta]) => `- ${name}: files=${meta.files.length}; script=references/${meta.script}`)
      .join('\n');
    const selected = plan.files.slice(0, 10).map((item) => `- references/${item.node.path} (${item.reason})`).join('\n');
    runtimeCache = `\n\n**DCI Executable Reference Runtime Loaded:**\n- script: references/runtime/dci-reference-runtime.mjs\n- graph: references/reference-graph.mjs\n- files: ${plan.runtime.totals.files}\n- sections: ${plan.runtime.totals.sections}\n- edges: ${plan.runtime.totals.edges}\n\nFolder runtimes:\n${folders}\n\nStartup route:\n${selected}\n\nRuntime commands:\n- dci references route \"<task>\"\n- dci references capsule \"<task>\"\n- dci references context \"<task>\" --limit 8 --depth 1\n- dci agentic-auto \"<task>\"`;
    return runtimeCache;
  } catch (err) {
    runtimeCache = `\n\n**DCI Executable Reference Runtime:** failed to import; run node references/runtime/dci-reference-runtime.mjs route \"<task>\". Error: ${err instanceof Error ? err.message : String(err)}`;
    return runtimeCache;
  }
}

export const DCIPlugin = async () => {
  const homeDir = os.homedir();
  const repoRoot = path.resolve(__dirname, '../..');
  const skillsDir = path.join(repoRoot, 'skills');
  const skillPath = path.join(repoRoot, 'SKILL.md');
  const envConfigDir = normalizePath(process.env.OPENCODE_CONFIG_DIR, homeDir);
  const configDir = envConfigDir || path.join(homeDir, '.config/opencode');
  void configDir;

  const getBootstrapContent = async () => {
    if (bootstrapCache !== undefined) return bootstrapCache;
    if (!fs.existsSync(skillPath)) {
      bootstrapCache = null;
      return null;
    }

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);
    const graphSummary = await loadRuntimeSummary(repoRoot);

    const toolMapping = `**Tool Mapping for OpenCode:**
When DCI references tools you do not have, substitute OpenCode equivalents:
- \`TodoWrite\` → \`todowrite\`
- subagents → OpenCode subagent system (@mention)
- skill loading → OpenCode native \`skill\` tool
- file/shell operations → OpenCode native file and shell tools

Use DCI by loading graph context first, selecting relevant nodes, traversing cross-layer relations, and verifying through quality-safety gates.`;

    bootstrapCache = `<DCI_BOOT_CONTRACT>
You have Deterministic-Cognitive-Infrastructure.

**IMPORTANT: DCI bootstrap is already loaded. Do not reload it redundantly. Operate through the DCI graph and verification gates.**

Boot mode: AMT-derived but DCI-native.
- Amati: identify task intent, risk, uncertainty, and relevant resources.
- Tiru: keep the proven discipline of boot context, skill routing, and duplicate-injection guards.
- Modifikasi: use DCI's executable graph, runtime audit, full-read coverage, and quality/safety gates instead of copying another framework.

${content}
${graphSummary}

${toolMapping}
</DCI_BOOT_CONTRACT>`;

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
      const bootstrap = await getBootstrapContent();
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
