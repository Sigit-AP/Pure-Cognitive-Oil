export type CognitiveAxis = "thinking" | "reasoning" | "agentic" | "knowledge" | "reliability" | "intelligence";

export type DciFileKind = "root" | "core" | "advanced" | "cognitive-engine" | "knowledge-base" | "quality-safety" | "workflow" | "unknown";

export interface DciFileRecord {
  path: string;
  kind: DciFileKind;
  folder: string;
  name: string;
  extension: string;
  bytes: number;
  lines: number;
  words: number;
  sha256: string;
  headings: string[];
  keywords: string[];
  cognitiveAxes: CognitiveAxis[];
  capabilities: string[];
  routingHints: string[];
  readPriority: number;
  dependencies: string[];
}

export interface DciManifest {
  schemaVersion: string;
  generatedAt: string;
  root: string;
  totals: { files: number; bytes: number; lines: number; words: number; folders: number };
  coverage: Record<CognitiveAxis, number>;
  folders: Record<string, { files: number; bytes: number; axes: CognitiveAxis[] }>;
  files: DciFileRecord[];
}

export interface ResourceMap {
  schemaVersion: string;
  generatedAt: string;
  byAxis: Record<CognitiveAxis, string[]>;
  byKind: Record<string, string[]>;
  byWorkflow: Record<string, string[]>;
  prerequisites: Record<string, string[]>;
  loadOrder: string[];
}

export interface AgentRouting {
  schemaVersion: string;
  generatedAt: string;
  routes: Array<{
    trigger: string;
    axes: CognitiveAxis[];
    requiredFiles: string[];
    optionalFiles: string[];
    instruction: string;
  }>;
}

export interface AuditReport {
  schemaVersion: string;
  generatedAt: string;
  filesExpected: number;
  filesIndexed: number;
  missingFiles: string[];
  unreadableFiles: string[];
  duplicateHashes: Array<{ sha256: string; files: string[] }>;
  axisCoverage: Record<CognitiveAxis, { files: number; status: "pass" | "weak" | "fail" }>;
  folderCoverage: Array<{ folder: string; files: number; status: "pass" | "fail" }>;
  qualityGates: Array<{ gate: string; status: "pass" | "warn" | "fail"; detail: string }>;
  readinessScore: number;
  status: "pass" | "warn" | "fail";
}

export const AXES: CognitiveAxis[] = ["thinking", "reasoning", "agentic", "knowledge", "reliability", "intelligence"];
