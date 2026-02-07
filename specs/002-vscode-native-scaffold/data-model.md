# Data Model: Workspace-Native Governance Scaffold

## Entities

### Workspace

Represents the target repository where governance assets are scaffolded.

- `rootPath` (string): Absolute path to the repository root.
- `hasLegacyUbs` (boolean): Whether a .ubs directory exists.

### SkillPackage

Represents a skill directory under .github/skills.

- `name` (string): Skill identifier (matches directory name).
- `path` (string): Workspace-relative path.
- `kind` (string): One of `template`, `guidelines`, `examples`.
- `files` (string[]): Workspace-relative files belonging to the skill.
- `required` (boolean): Whether the skill is required for a valid scaffold.

### AgentDefinition

Represents an agent file under .github/agents.

- `name` (string): Agent display name (from frontmatter or file name).
- `path` (string): Workspace-relative path.
- `handoffs` (string[]): Names of related agents referenced as handoffs.
- `required` (boolean): Whether the agent is required for a valid scaffold.

### ScaffoldedAsset

Represents a file in the scaffold manifest.

- `id` (string): Stable identifier.
- `path` (string): Workspace-relative path.
- `kind` (string): `agent`, `skill`, `template`, `guideline`, `checklist`, `example`.
- `checksum` (string): Hash of source content.
- `isRequired` (boolean): Whether the asset is required for validity.

### Conflict

Represents a detected mismatch between source content and target file.

- `path` (string): Workspace-relative file path.
- `reason` (string): Human-readable reason for the conflict.

### ValidationIssue

Represents a validation error from the UBS validator.

- `filePath` (string): Absolute or workspace-relative path.
- `ruleId` (string): Validation rule identifier.
- `message` (string): Human-readable error message.

## Relationships

- A `Workspace` contains many `SkillPackage` and `AgentDefinition` entries.
- A `SkillPackage` contains many `ScaffoldedAsset` entries.
- A `Workspace` has zero or more `Conflict` entries during a scaffold run.
- A `Workspace` has zero or more `ValidationIssue` entries during validation.

## Validation Rules

- All required `SkillPackage` and `AgentDefinition` paths must exist.
- UBS files inside skills must include the canonical 11 sections.
- No validation of agent or skill metadata beyond required paths.

## State Transitions

### ScaffoldedAsset

- `planned` -> `written` (if no conflict and not dry-run)
- `planned` -> `skipped` (if identical)
- `planned` -> `conflict` (if mismatch detected; aborts full run unless force)

### Conflict

- `detected` -> `reported` (always reported, blocks run unless force)
