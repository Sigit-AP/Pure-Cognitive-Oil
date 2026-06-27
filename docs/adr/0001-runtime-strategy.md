# ADR-0001: Runtime Strategy

## Status
Accepted

## Context
PCO must work as CLI, plugin surface, and direct file-based model guide.

## Decision
Keep source as portable ESM scripts and markdown assets. Package runtime-critical scripts and docs explicitly through `package.json` files.

## Consequences
Package validation must check included files. Host-specific adapters remain thin.
