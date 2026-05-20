#!/usr/bin/env node
import { runFolderCli, buildFolderContext, folderProfile } from "../runtime/dci-reference-runtime.mjs";
export const folder = "cognitive-engines";
export function profile() { return folderProfile(folder); }
export function context(query = "cognitive-engines", options = {}) { return buildFolderContext(folder, query, options); }
if (import.meta.url === `file://${process.argv[1]}`) runFolderCli(folder);
