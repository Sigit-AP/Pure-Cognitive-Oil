export type CognitiveAxis = "thinking" | "reasoning" | "agentic" | "knowledge" | "reliability" | "intelligence";
export type DciFileKind = "root" | "core" | "advanced" | "cognitive-engine" | "knowledge-base" | "quality-safety" | "workflow" | "unknown";

export interface DciSection {
  id: string;
  level: number;
  title: string;
  startLine: number;
  endLine: number;
  words: number;
  keywords: string[];
  axes: CognitiveAxis[];
}
export interface DciLink { label: string; target: string; resolvedPath?: string; line: number }
export interface DciConcept { term: string; count: number; files: string[]; axes: CognitiveAxis[] }
export interface DciEdge { from: string; to: string; type: "dependency" | "link" | "shared-concept" | "same-folder"; weight: number; reason: string }

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
  sections: DciSection[];
  links: DciLink[];
  keywords: string[];
  cognitiveAxes: CognitiveAxis[];
  capabilities: string[];
  routingHints: string[];
  readPriority: number;
  dependencies: string[];
  coverageSignature: {
    hasHeadings: boolean;
    hasSections: boolean;
    hasLinks: boolean;
    mappedAxes: number;
    mappedConcepts: number;
  };
}

export interface DciManifest {
  schemaVersion: string;
  generatedAt: string;
  root: string;
  totals: { files: number; bytes: number; lines: number; words: number; folders: number; sections: number; links: number; concepts: number; edges: number };
  coverage: Record<CognitiveAxis, number>;
  folders: Record<string, { files: number; bytes: number; axes: CognitiveAxis[]; concepts: string[] }>;
  concepts: DciConcept[];
  graph: DciEdge[];
  files: DciFileRecord[];
}

export interface ResourceMap {
  schemaVersion: string;
  generatedAt: string;
  byAxis: Record<CognitiveAxis, string[]>;
  byKind: Record<string, string[]>;
  byWorkflow: Record<string, string[]>;
  byConcept: Record<string, string[]>;
  byCapability: Record<string, string[]>;
  prerequisites: Record<string, string[]>;
  neighbors: Record<string, Array<{ path: string; weight: number; reason: string }>>;
  loadOrder: string[];
  professionalLoadPlans: Record<CognitiveAxis | "all", string[]>;
}

export interface AgentRouting {
  schemaVersion: string;
  generatedAt: string;
  routes: Array<{
    trigger: string;
    axes: CognitiveAxis[];
    requiredFiles: string[];
    optionalFiles: string[];
    concepts: string[];
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
  axisCoverage: Record<CognitiveAxis, { files: number; sections: number; status: "pass" | "weak" | "fail" }>;
  folderCoverage: Array<{ folder: string; files: number; axes: number; concepts: number; status: "pass" | "fail" }>;
  qualityGates: Array<{ gate: string; status: "pass" | "warn" | "fail"; detail: string }>;
  readinessScore: number;
  status: "pass" | "warn" | "fail";
}

export const AXES: CognitiveAxis[] = ["thinking", "reasoning", "agentic", "knowledge", "reliability", "intelligence"];
