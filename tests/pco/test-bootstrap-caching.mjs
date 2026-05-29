import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const skillPath = path.join(root, 'SKILL.md');
let readCount = 0;
let existsCount = 0;

const originalReadFileSync = fs.readFileSync;
const originalExistsSync = fs.existsSync;

fs.readFileSync = function (...args) {
  if (path.resolve(String(args[0])) === skillPath) readCount += 1;
  return originalReadFileSync.apply(this, args);
};
fs.existsSync = function (...args) {
  if (path.resolve(String(args[0])) === skillPath) existsCount += 1;
  return originalExistsSync.apply(this, args);
};

const mod = await import(pathToFileURL(path.join(root, '.opencode/plugins/pco.js')).href);
const plugin = await mod.PCOPlugin({});
const transform = plugin['experimental.chat.messages.transform'];

function output(text) {
  return { messages: [{ info: { role: 'user' }, parts: [{ type: 'text', text }] }] };
}
function countBootParts(out) {
  return out.messages[0].parts.filter((part) => part.type === 'text' && part.text.includes('PCO_BOOT_CONTRACT')).length;
}

const first = output('first task');
await transform({}, first);
const afterFirst = { readCount, existsCount, bootParts: countBootParts(first) };
const second = output('second task');
await transform({}, second);
const afterSecond = { readCount, existsCount, bootParts: countBootParts(second) };
await transform({}, second);
const afterRepeatSameArray = { readCount, existsCount, bootParts: countBootParts(second) };

if (afterFirst.bootParts !== 1) throw new Error(`first transform boot parts=${afterFirst.bootParts}`);
if (afterSecond.bootParts !== 1) throw new Error(`second transform boot parts=${afterSecond.bootParts}`);
if (afterRepeatSameArray.bootParts !== 1) throw new Error(`repeat same array boot parts=${afterRepeatSameArray.bootParts}`);
if (afterFirst.readCount !== 1) throw new Error(`expected first SKILL.md read once, got ${afterFirst.readCount}`);
if (afterSecond.readCount !== afterFirst.readCount) throw new Error(`expected cached second read count unchanged, got ${afterSecond.readCount}`);
if (afterRepeatSameArray.readCount !== afterSecond.readCount) throw new Error(`expected repeated array read count unchanged, got ${afterRepeatSameArray.readCount}`);
if (afterSecond.existsCount !== afterFirst.existsCount) throw new Error(`expected cached exists count unchanged, got ${afterSecond.existsCount}`);

console.log(JSON.stringify({ afterFirst, afterSecond, afterRepeatSameArray }, null, 2));
