# Feature Specification: UBS Kit Governance Layer

**Feature Branch**: `001-ubs-kit-spec`  
**Created**: 2026-02-07  
**Status**: Draft  
**Input**: User description: "Specification - UBS Kit
Product Definition

UBS Kit is a runnable CLI tool that installs, validates, and maintains a UBS governance layer inside an existing code repository.

Its primary function is to make system behavior explicit, enforceable, and machine-consumable by scaffolding and validating UBS artifacts according to the UBS Framework.

UBS Kit produces working assets, not documentation alone.

Primary User

A software engineer working in an existing repository who needs to introduce or maintain explicit behavioral governance that is safe for both humans and AI agents.

Core Behaviors
Behavior 1: Scaffold a UBS Governance Layer

When the user runs the UBS Kit CLI in a repository, the tool creates an isolated .ubs/ directory at the repository root containing:

A canonical UBS template with exactly 11 required sections

UBS usage guidelines aligned with the UBS Framework

A quality checklist for UBS authoring and review

Agent-facing resources and prompts for UBS usage

At least three valid example UBS files

The scaffold operation is non-destructive by default and safe to re-run.

Behavior 2: Enforce UBS Structural Validity

UBS Kit provides a validator that checks UBS files for:

Presence of all 11 required sections

Correct section order

Single-behavior atomicity

Explicit marking of assumptions

Absence of forbidden structural deviations

Invalid UBS files are reported clearly and are considered blocking failures.

Behavior 3: Support Safe Iteration

UBS Kit supports repeated execution without silently overwriting user-authored content.

If conflicts exist, the tool:

Detects them explicitly

Requires deliberate user action to resolve them

Never normalizes or auto-fixes behavioral content

Constraints

The CLI must run on Node.js 20 or newer

All canonical UBS artifacts are written in English only

The tool must operate inside an existing repository

The .ubs/ directory is isolated and does not alter unrelated files

Out of Scope

UBS Kit does not:

Invent business rules

Generate UBS content from scratch without source artifacts

Define application architecture or implementation

Replace product discovery, UX flows, or user stories

UBS Kit governs behavioral truth, not design or delivery strategy.

Success Criteria

The product is successful if:

A developer can scaffold .ubs/ with one command

UBS files are structurally enforceable, not advisory

AI agents can consume UBS without inferring rules

Invalid behavioral specifications are detectable and block progress

If UBS remains implicit, optional, or unenforced, the product has failed.

End of Specification"

**Constitution reminders**: UBS is the behavioral authority. Requirements MUST
describe observable behavior and remain stack-agnostic. Unknowns MUST be tagged
as Assumption with a TODO question. UBS structure MUST be canonical (11
sections, fixed order), English-only, and enforceable by validation. UI
descriptions are non-authoritative.

## Clarifications

### Session 2026-02-07

- Q: How should conflicts be handled on re-run? → A: Exit non-zero with a clear report; user must re-run with `--force` to overwrite.
- Q: When conflicts are detected, should the CLI stop before writing any files? → A: Stop before writing any new files; no partial updates.
- Q: Should assumption enforcement apply only to explicit Assumption labels? → A: Yes; validator enforces IDs and TODO questions only for explicit Assumption labels.
- Q: On re-run, should existing files be refreshed only when byte-for-byte identical to the template? → A: Yes; add missing assets and refresh only exact matches, otherwise treat as conflict.
- Q: Should validation require exact canonical section headings? → A: Yes; headings must match canonical names exactly.
- Q: Should the validator report all violations before exiting non-zero? → A: Yes; report all detected violations in one run.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scaffold a UBS Governance Layer (Priority: P1)

As a developer working in an existing repository, I run the UBS Kit CLI to
create a complete, isolated .ubs/ directory with required UBS assets, without
modifying unrelated files.

**Why this priority**: Scaffolding is the entry point that enables all other UBS
governance behaviors.

**Independent Test**: Run the CLI in a clean repository and verify that .ubs/
exists with all required assets, and no unrelated files are changed.

**Acceptance Scenarios**:

1. **Given** a repository without .ubs/, **When** the user runs the CLI,
   **Then** .ubs/ is created with the canonical template, guidelines, quality
   checklist, agent resources, and at least three valid example UBS files.
2. **Given** a repository without .ubs/, **When** the user runs the CLI,
   **Then** only files under .ubs/ are created or modified.

---

### User Story 2 - Validate UBS Structural Validity (Priority: P2)

As a developer, I run the UBS validator to ensure UBS files follow the canonical
structure and fail clearly when they do not.

**Why this priority**: Validation makes governance enforceable and prevents
invalid behavior definitions from progressing.

**Independent Test**: Run the validator against a valid UBS file and a known
invalid UBS file to confirm pass/fail behavior and clear errors.

**Acceptance Scenarios**:

1. **Given** a UBS file with all 11 required sections in order, **When** the
   validator runs, **Then** the file is reported as valid.
2. **Given** a UBS file missing a required section or using the wrong order,
   **When** the validator runs, **Then** it fails and reports the missing or
   misplaced section clearly.

---

### User Story 3 - Safe Re-Run and Conflict Handling (Priority: P3)

As a developer, I re-run the CLI in a repository that already has UBS assets and
I am protected from silent overwrites.

**Why this priority**: Safe iteration preserves existing work and builds trust
in repeated usage.

**Independent Test**: Re-run the CLI in a repository with existing .ubs/ files,
including a conflicting file, and verify that no overwrite happens without
explicit user action.

**Acceptance Scenarios**:

1. **Given** a repository where .ubs/ already exists with identical content,
   **When** the user re-runs the CLI, **Then** no files are overwritten and the
   operation completes without destructive changes.
2. **Given** a repository where .ubs/ exists with user-modified files, **When**
  the user re-runs the CLI, **Then** conflicts are detected, a clear report is
  produced, and the command exits non-zero without overwriting files.
3. **Given** conflicts are detected, **When** the user runs the CLI without
  `--force`, **Then** no files are written and no partial updates occur.
4. **Given** conflicts were detected, **When** the user re-runs the CLI with
  `--force`, **Then** the conflicting files are overwritten as explicitly
  requested.

### Edge Cases

- The CLI is run outside an existing repository and must fail with a clear
  error without creating any files.
- A UBS file includes extra sections or out-of-order sections and must fail
  validation with a clear message.
- A re-run encounters partially missing assets under .ubs/ and conflicts are
  detected; the CLI must stop before writing any files unless `--force` is used.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST create a .ubs/ directory at the repository root
  when the CLI is run in an existing repository.
- **FR-002**: The system MUST scaffold a canonical UBS template with exactly 11
  required sections under .ubs/.
- **FR-003**: The system MUST scaffold UBS usage guidelines, a UBS quality
  checklist, agent-facing resources, and at least three valid example UBS
  files.
- **FR-004**: The system MUST be non-destructive by default and MUST NOT
  overwrite existing user content without explicit user action.
- **FR-014**: On re-run, the CLI MUST add missing assets and MAY refresh
  existing files only when they are byte-for-byte identical to the canonical
  template; otherwise it MUST treat them as conflicts.
- **FR-005**: The system MUST detect conflicts during re-run and MUST require
  deliberate user action to resolve or overwrite them by exiting non-zero and
  requiring a re-run with `--force` to overwrite.
- **FR-006**: The validator MUST verify the presence of all 11 required UBS
  sections and their correct order, and MUST require exact canonical section
  heading names.
- **FR-015**: The validator MUST report all detected violations before exiting
  non-zero.
- **FR-007**: The validator MUST reject UBS files whose Identity section names
  more than one primary behavior.
- **FR-008**: The validator MUST enforce IDs and TODO questions only for
  explicit Assumption labels and MUST reject any Assumption missing a unique
  Assumption ID or TODO question.
- **FR-009**: The CLI MUST run on Node.js 20 or newer.
- **FR-010**: All canonical UBS artifacts produced by the CLI MUST be written
  in English only.
- **FR-011**: The CLI MUST operate inside an existing repository and MUST fail
  with a clear error if no repository is detected.
- **FR-012**: The .ubs/ directory MUST be isolated and MUST NOT alter unrelated
  repository files.
- **FR-013**: When any conflict is detected, the CLI MUST stop before writing
  any files and MUST NOT perform partial updates unless `--force` is supplied.

### Key Entities *(include if feature involves data)*

- **UBS Artifact**: A canonical UBS file or supporting asset that defines or
  guides behavioral governance.
- **UBS Template**: The canonical template containing the 11 required sections.
- **Example UBS File**: A valid, minimal UBS file used to demonstrate correct
  structure and usage.
- **Validation Result**: A pass/fail outcome with clear reasons for any
  structural violations.
- **Conflict Report**: A record of detected differences between existing UBS
  assets and scaffolded content that requires explicit user action.

### Dependencies and Assumptions

**Dependencies**:

- The repository is accessible and writable by the user running the CLI.

**Assumptions**:

- None beyond the explicit dependencies and constraints listed in this
  specification.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a repository without .ubs/, a developer can run one command and
  see .ubs/ created with all required assets in under 60 seconds.
- **SC-002**: 100% of shipped example UBS files pass validation, and 100% of a
  defined invalid test set fails validation with clear messages.
- **SC-003**: Re-running the CLI without conflicts results in zero file
  overwrites, and re-running with conflicts requires explicit user action
  before any replacement occurs.
- **SC-004**: In an evaluation set of at least 10 valid UBS files, AI agent
  responses require no additional assumptions beyond those explicitly marked in
  the UBS files.
