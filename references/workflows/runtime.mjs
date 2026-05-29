#!/usr/bin/env node
import { runFolderCli, buildFolderContext, folderProfile } from "../runtime/pco-reference-runtime.mjs";
export const folder = "workflows";
export function profile() { return folderProfile(folder); }
export function context(query = "workflows", options = {}) { return buildFolderContext(folder, query, options); }
if (import.meta.url === `file://${process.argv[1]}`) runFolderCli(folder);
