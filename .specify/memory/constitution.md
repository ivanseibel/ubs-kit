<!--
Sync Impact Report
- Version change: 2.0.1 -> 2.1.0
- Modified principles:
	- Behavior First (reframed to be UBS authority-aligned)
	- Atomicity (non-negotiable emphasis)
	- No Silent Assumptions (kept, clarified enforceability)
- Added principles:
	- Product Over Process Artifacts
	- UBS Is the Behavioral Authority
	- Canonical UBS Structure Is Mandatory
	- AI Is a First-Class Consumer
	- English Is the Only Canonical Language
	- Enforceability Over Readability
	- Non-Destructive by Default
	- Minimalism With Intent
- Removed principles:
	- Preserve Source Truth
	- No Semantic Drift
	- Executable Consequences
	- Durability Over Convenience
- Added sections: None
- Removed sections: None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ⚠ .specify/templates/commands/*.md (directory missing; verify none required)
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): original adoption date unknown
-->
# UBS Kit Constitution

## Purpose

UBS Kit exists to produce a runnable, enforceable UBS setup that enables
explicit, durable, and machine-consumable behavior governance inside real
codebases. The project produces a Node.js (>= 20) CLI named create-ubs-kit that
scaffolds a complete, isolated .ubs/ directory into any existing repository.
The scaffolded artifacts define, constrain, validate, and enforce UBS usage so
that documented behavior governs real system evolution, not UI narratives or
informal assumptions.

UBS Kit is not documentation, guidance, or examples alone. Valid UBS artifacts
enable progress. Invalid or missing UBS artifacts block progress.

## Scope

UBS Kit delivers a production-ready CLI and a canonical UBS workspace. The
scope includes:

- A Node.js CLI that scaffolds .ubs/ at the repository root by default.
- Canonical UBS artifacts written in English only.
- A UBS validator that enforces structure and identifiers and exits non-zero
	on failure.
- Minimal automated tests that verify scaffold correctness and validator
	behavior.
- Documentation required to install, run, and validate UBS Kit in a real
	repository.

Specs, plans, and tasks are process artifacts only. They are inputs to
development, not part of the shipped product.

## Non-Goals

UBS Kit does not:

- Define or implement product features beyond UBS infrastructure.
- Act as a UI, visual editor, or documentation viewer.
- Auto-correct, normalize, or reinterpret unclear UBS content.
- Invent forbidden outcomes or missing behavior.
- Replace human judgment in authoring UBS artifacts.
- Enforce runtime business logic directly inside application code.

## Core Principles

### Product Over Process Artifacts
UBS Kit MUST result in executable tooling, enforceable validation, and usable
assets inside a repository. Specifications, plans, and tasks are process
artifacts only and are not the product. Rationale: only runnable outputs can
enforce governance.

### UBS Is the Behavioral Authority
UBS files define authoritative system behavior. Code, tests, tasks, and AI
outputs MUST align to UBS; UBS MUST NOT adapt to implementation. Rationale:
behavioral truth is defined once and enforced everywhere.

### Canonical UBS Structure Is Mandatory
Every UBS file MUST contain exactly 11 sections in the canonical order:
Identity, Business Context, Actors, Initial State (Given), Triggering Event
(When), Rules and Guards, Expected Outcome (Then), Invalid States or Outcomes,
Invariants, Minimum Observability, Notes for AI. Deviation is invalid and MUST
be rejected by validation. Rationale: structural consistency enables reliable
validation and automation.

### Atomicity
One UBS file governs exactly one primary behavior. Compound behaviors MUST be
split into separate UBS files. References to other UBS files are informational
links only; each UBS MUST be complete and evaluable in isolation and MUST NOT
rely on another UBS file to define or complete its behavior. Rationale: atomic
specs enable independent testing and prevent hidden coupling.

### No Silent Assumptions
Any ambiguity MUST be labeled as an Assumption with a unique Assumption ID and
a TODO question phrased as a concrete, answerable question. Any Assumption
missing a TODO question is invalid. Nothing is implied by absence. Rationale:
explicit uncertainty prevents downstream fabrication.

### AI Is a First-Class Consumer
UBS artifacts MUST be safe for AI agents to consume directly. If an AI must
infer rules, states, or forbidden outcomes, the UBS is invalid. Rationale:
explicitness, not prompt cleverness, ensures safe automation.

### English Is the Only Canonical Language
All UBS artifacts, identifiers, and canonical content MUST be written in
English. Translations may exist externally but are non-authoritative. Rationale:
single-language canon prevents divergent interpretations.

### Enforceability Over Readability
Clarity matters, but enforceability is mandatory. If a rule cannot be validated
structurally or logically, it MUST NOT be part of UBS. Rationale: documentation
without consequences is obsolete.

### Non-Destructive by Default
UBS Kit tooling MUST never overwrite existing user content silently. Re-runs
MUST be safe, and any replacement MUST require explicit user action. Rationale:
safety beats convenience.

### Minimalism With Intent
UBS Kit MUST include only what is required to scaffold UBS, validate UBS, and
demonstrate correct usage. Anything not directly serving these goals is
secondary. Rationale: focused scope protects maintainability.

## Artifact Standards

- Language: all canonical UBS artifacts are English only.
- Structure: UBS files MUST follow the canonical UBS template with exactly
	11 sections in the mandated order.
- Location: all UBS artifacts live under .ubs/ unless explicitly documented
	otherwise.
- Identifiers: UBS files and sections MUST use the required ID format enforced
	by the validator.
- Examples: shipped examples represent valid, minimal, real UBS files, not
	placeholders.
- Separation of concerns: guidelines, templates, prompts, examples, and
	validators are distinct artifacts with clear roles.

## AI Guardrails

- AI is an assistant, not an authority.
- AI MUST not invent behavior, intent, or forbidden outcomes.
- AI MUST surface ambiguity explicitly as Assumptions with TODO questions.
- AI MUST respect atomicity and not merge or split behaviors without explicit
	instruction.
- AI-generated UBS content is subject to the same validation rules as
	human-authored content.

## Quality Bar

UBS Kit is acceptable only if:

- The CLI runs on Node.js >= 20 without modification.
- Scaffolding is non-destructive by default and supports --force, --dry-run,
	--base-dir, and --domains.
- The validator reliably fails on structural or ID violations and exits with a
	non-zero status.
- The validator is intentionally minimal by default and enforces only
	structural rules and identifier formats; it MUST NOT infer or validate
	business semantics unless explicitly extended and documented.
- Automated tests assert real filesystem output and validator behavior.
- All shipped UBS artifacts are internally consistent and validator-clean.
- Documentation is sufficient for a new repository to adopt UBS Kit without
	tribal knowledge.

## Definition of Done for UBS Kit v0

UBS Kit v0 is complete only when the repository contains the following tangible
outputs outside any spec or planning folders:

- CLI Source Code
	- Node.js (>= 20) implementation for create-ubs-kit
	- Argument parsing and flags: --force, --dry-run, --base-dir, --domains
	- Deterministic scaffold logic
- Canonical UBS Assets
	- .ubs/template/ containing the canonical UBS template with exactly 11
		sections
	- .ubs/guidelines/ containing UBS guidelines and a quality checklist aligned
		with the UBS Framework
	- .ubs/agents/ containing agent resources and prompts for UBS usage
	- .ubs/examples/ containing at least 3 valid UBS example files
- Validator
	- .ubs/validator/ with a runnable validator that verifies required headings,
		verifies UBS ID format, exits non-zero on any failure, and emits clear
		English-only messages
- Tests
	- Automated tests that verify correct scaffold output and validator pass/fail
		behavior and run in a clean environment
- Root Documentation
	- README.md at repository root explaining what UBS Kit is, how to install and
		run the CLI, how validation works, and how UBS governs behavior changes

## Governance

- The constitution supersedes other practices; conflicts MUST be resolved in
	favor of this document.
- Amendments MUST include rationale, a version bump, and migration notes when
	applicable, plus updates to dependent templates.
- Versioning follows semantic versioning: MAJOR for incompatible governance or
	principle removals/redefinitions, MINOR for new or expanded
	principles/sections, PATCH for clarifying edits.
- Any change that introduces invalid UBS artifacts MUST be fixed or reverted
  before merge or release, even if the change is otherwise unrelated.
- If the ratification date is unknown, it MUST remain explicitly marked as a
  TODO and MUST NOT be inferred or backfilled without evidence.
- Compliance is verified in reviews; changes that violate principles MUST NOT
	be merged.

**Version**: 2.1.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2026-02-07
