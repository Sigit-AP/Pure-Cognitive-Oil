#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/test-helpers.sh"

node --input-type=module <<'JS'
import { PCOPlugin } from './.opencode/plugins/pco.js';
const plugin = await PCOPlugin({});
const config = {};
await plugin.config(config);
if (!config.skills?.paths?.some((p) => p.endsWith('/skills'))) throw new Error('skills path missing');
const output = { messages: [{ info: { role: 'user' }, parts: [{ type: 'text', text: 'Build a safe API' }] }] };
await plugin['experimental.chat.messages.transform']({}, output);
const injected = output.messages[0].parts[0].text;
if (!injected.includes('PCO_BOOT_CONTRACT')) throw new Error('boot contract missing');
if (!injected.includes('AMT-derived but PCO-native')) throw new Error('AMT boot mode missing');
if (!injected.includes('PCO Executable Reference Runtime Loaded')) throw new Error('runtime summary missing');
if (!injected.includes('references/runtime/pco-reference-runtime.mjs')) throw new Error('runtime command missing');
if (!injected.includes('Folder runtimes')) throw new Error('folder runtimes missing');
console.log('opencode plugin runtime injection ok');
JS

pass opencode-plugin
