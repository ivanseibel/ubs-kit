# Implementation Plan: UBS Kit Governance Layer

**Branch**: `001-ubs-kit-spec` | **Date**: 2026-02-07 | **Spec**: [specs/001-ubs-kit-spec/spec.md](specs/001-ubs-kit-spec/spec.md)
**Input**: Feature specification from `/specs/001-ubs-kit-spec/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a Node.js 20 CLI named `create-ubs-kit` that scaffolds a canonical .ubs/
governance layer, validates UBS structure deterministically, and supports safe
re-runs with explicit conflict handling. Implementation uses Node.js standard
libraries for filesystem operations and argument parsing, with minimal tests via
the built-in `node:test` runner.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js 20 (JavaScript)  
**Primary Dependencies**: Node.js standard library only (no external runtime deps)  
**Storage**: Local filesystem under repository root  
**Testing**: `node:test` with `assert/strict`  
**Target Platform**: Cross-platform CLI (macOS, Linux, Windows)  
**Project Type**: single  
**Performance Goals**: Scaffold/validate a typical repo in under 2 seconds  
**Constraints**: Non-destructive by default; no partial updates on conflict; English-only canonical assets  
**Scale/Scope**: Single repo, dozens to hundreds of UBS files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Product Over Process Artifacts: executable tooling, enforceable validation, usable assets.
- UBS Is the Behavioral Authority: UBS governs behavior; implementation conforms.
- Canonical UBS Structure Is Mandatory: 11 sections, fixed order, enforced by validation.
- Atomicity: one UBS file governs one primary behavior.
- No Silent Assumptions: ambiguities tagged as Assumption with TODO questions.
- AI Is a First-Class Consumer: no inference required for rules or outcomes.
- English Is the Only Canonical Language: all UBS artifacts in English.
- Enforceability Over Readability: only rules that can be validated belong in UBS.
- Non-Destructive by Default: scaffolding safe; replacement requires explicit action.
- Minimalism With Intent: include only what is required to scaffold, validate, demonstrate.

**Gate Status**: Pass

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── cli/
│   └── create-ubs-kit.js
├── scaffold/
│   ├── asset-manifest.js
│   ├── scaffold.js
│   └── diff.js
├── validator/
│   ├── rules.js
│   └── validate-ubs.js
├── assets/
│   ├── template/
│   ├── guidelines/
│   ├── checklist/
│   ├── agents/
│   └── examples/
└── lib/
  ├── fs.js
  └── report.js

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: Single-project layout with `src/` and `tests/`,
separating CLI, scaffolding, validator, and canonical assets.

## Complexity Tracking

No constitution violations required.

## Phase 0: Research

- Output: [specs/001-ubs-kit-spec/research.md](specs/001-ubs-kit-spec/research.md)

## Phase 1: Design

- Data model: [specs/001-ubs-kit-spec/data-model.md](specs/001-ubs-kit-spec/data-model.md)
- Contracts: [specs/001-ubs-kit-spec/contracts/ubs-kit.openapi.yaml](specs/001-ubs-kit-spec/contracts/ubs-kit.openapi.yaml)
- Quickstart: [specs/001-ubs-kit-spec/quickstart.md](specs/001-ubs-kit-spec/quickstart.md)

**Constitution Re-check**: Pass
