#!/usr/bin/env node
import { runFolderCli, buildFolderContext, folderProfile } from "../runtime/dci-reference-runtime.mjs";
export const folder = "knowledge-bases";
export function profile() { return folderProfile(folder); }
export function context(query = "knowledge-bases", options = {}) { return buildFolderContext(folder, query, options); }
if (import.meta.url === `file://${process.argv[1]}`) runFolderCli(folder);
