# Feature Specification: Workspace-Native Governance Scaffold

**Feature Branch**: `001-vscode-native-scaffold`  
**Created**: 2026-02-07  
**Status**: Draft  
**Input**: User description: "Evolve the scaffold to use native workspace locations and enable coordinated assistants with safe re-runs while preserving the existing product purpose."

**Constitution reminders**: UBS is the behavioral authority. Requirements MUST
describe observable behavior and remain stack-agnostic. Unknowns MUST be tagged
as Assumption with a TODO question. UBS structure MUST be canonical (11
sections, fixed order), English-only, and enforceable by validation. Agents and
skills MUST live in VS Code-native locations (.github/agents, .github/skills).
UI descriptions are non-authoritative.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Native scaffold in expected locations (Priority: P1)

A developer runs one command and gets a ready-to-use governance setup placed in
the workspace locations they naturally expect, with no manual copying.

**Why this priority**: This is the core value: instant, zero-friction setup.

**Independent Test**: Run the scaffold in a clean repository and verify that the
expected agents and skills appear in the native locations with the required
assets and no unrelated files are changed.

**Acceptance Scenarios**:

1. **Given** a repository without existing governance assets, **When** the user
   runs the scaffold command, **Then** the system creates agents and skills in
   the native locations with a canonical template, guidelines, checklist, and
   multiple examples.
2. **Given** a repository with unrelated files present, **When** the user runs
   the scaffold command, **Then** only the native agents and skills locations
   are created or modified.

---

### User Story 2 - Safe re-runs and conflict handling (Priority: P2)

A developer can re-run the scaffold without losing work, and conflicts are
reported clearly with no silent overwrites.

**Why this priority**: Re-runs are common; safety is essential for trust.

**Independent Test**: Run the scaffold twice, then introduce a conflicting
change and confirm the command blocks writes unless explicitly overridden.

**Acceptance Scenarios**:

1. **Given** an identical existing scaffold, **When** the user re-runs the
   command, **Then** no files are modified and the result indicates no changes.
2. **Given** a conflicting user-edited asset, **When** the user re-runs without
   explicit override, **Then** the command reports conflicts and writes nothing.

---

### User Story 3 - Coordinated specialized assistants (Priority: P3)

A developer can use specialized helpers that hand off work to each other for
distinct governance tasks instead of relying on static templates alone.

**Why this priority**: Coordinated assistants reduce setup and maintenance time
and improve reliability of governance work.

**Independent Test**: Trigger a specialized assistant and verify it can hand
off to another assistant with a clear next step and preserved context.

**Acceptance Scenarios**:

1. **Given** a developer initiating a governance task, **When** they use a
   specialized assistant, **Then** a related assistant is available as a
   handoff or task boundary with an explicit next step.

---

### Edge Cases

- The native agents or skills locations already exist but are partially missing
  required assets.
- The workspace contains user-created agents or skills with conflicting names.
- A dry-run is requested and should report planned changes without writing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST create governance assets in the workspace-native
  agents and skills locations.
- **FR-002**: The scaffold MUST include a canonical template, guidelines,
  a quality checklist, and at least three valid examples.
- **FR-003**: The scaffold MUST include at least two specialized assistants that
  reference skills and support at least one explicit handoff or task boundary.
- **FR-004**: The system MUST provide validation that enforces required
  structure and identifiers and fails fast on invalid artifacts.
- **FR-005**: The system MUST detect conflicts and MUST NOT overwrite user
  content without explicit override.
- **FR-006**: Re-running the scaffold against identical content MUST result in
  no file changes and a clear no-change outcome.
- **FR-007**: The system MUST limit changes to the native agents and skills
  locations unless explicitly documented.

### Key Entities *(include if feature involves data)*

- **Workspace**: The target repository where governance assets are scaffolded.
- **Agent**: A specialized helper definition available in the workspace.
- **Skill**: A packaged governance capability with instructions and resources.
- **Scaffolded Asset**: Any created or updated file produced by the scaffold.
- **Conflict**: A detected difference between scaffolded content and user
  modifications that would require explicit override.

### Dependencies & Assumptions

- **Dependency**: The target repository is writable and allows creating the
  native agents and skills locations.
- **Assumption**: No additional external systems are required for initial
  setup beyond the workspace itself.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a clean repository, users can complete initial setup in under
  60 seconds and immediately see the governance assets in native locations.
- **SC-002**: 100% of re-runs against identical content result in no file
  changes and a clear no-change report.
- **SC-003**: 100% of detected conflicts block writes unless explicit override
  is provided.
- **SC-004**: At least 90% of users in a usability test can complete setup
  without any manual file movement.
