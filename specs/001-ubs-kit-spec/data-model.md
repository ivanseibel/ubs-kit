# Data Model: UBS Kit Governance Layer

## Entities

### ScaffoldAsset

Represents a canonical file or directory that should exist under `.ubs/`.

- **Fields**:
  - `id` (string): Stable identifier for the asset.
  - `kind` (enum): `template`, `guideline`, `checklist`, `agent`, `example`.
  - `relativePath` (string): Path under `.ubs/`.
  - `content` (string): Canonical file content.
  - `checksum` (string): Content hash used for exact comparisons.
  - `isRequired` (boolean): Whether the asset must always be present.

### AssetManifest

Collection of all canonical assets used by scaffolding.

- **Fields**:
  - `assets` (ScaffoldAsset[]): Canonical assets to scaffold.
  - `generatedAt` (timestamp): Manifest build time.
  - `version` (string): Asset set version for internal tracking.

### Conflict

Represents a detected mismatch between expected and existing content.

- **Fields**:
  - `relativePath` (string): Path of the conflicting asset.
  - `expectedChecksum` (string): Canonical checksum.
  - `actualChecksum` (string): Existing checksum.
  - `reason` (string): Human-readable conflict summary.

### ConflictReport

Summary of all conflicts discovered during a run.

- **Fields**:
  - `conflicts` (Conflict[]): Detected conflicts.
  - `hasConflicts` (boolean): True when conflicts exist.

### ValidationIssue

A single structural violation identified by the validator.

- **Fields**:
  - `filePath` (string): UBS file path.
  - `ruleId` (string): Stable identifier for the violated rule.
  - `message` (string): Clear, English-only explanation.

### ValidationReport

Aggregate validation results for a run.

- **Fields**:
  - `issues` (ValidationIssue[]): All issues found.
  - `isValid` (boolean): True when no issues exist.

## Relationships

- AssetManifest contains many ScaffoldAssets.
- ConflictReport aggregates many Conflicts.
- ValidationReport aggregates many ValidationIssues.
- Scaffold engine uses AssetManifest to detect Conflicts before writing.
- Validator emits ValidationReport for a set of UBS files.

## Validation Rules

- Section headings must match canonical names exactly.
- Section order must match the 11 required sections in sequence.
- Assumptions are enforced only when explicitly labeled, and must include a
  unique ID plus a TODO question.
- Identity must name exactly one primary behavior.
