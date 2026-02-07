# Implementation Plan: Workspace-Native Governance Scaffold

**Branch**: `002-vscode-native-scaffold` | **Date**: 2026-02-07 | **Spec**: [specs/002-vscode-native-scaffold/spec.md](specs/002-vscode-native-scaffold/spec.md)
**Input**: Feature specification from `/specs/002-vscode-native-scaffold/spec.md`

**Note**: This plan is produced by the `/speckit.plan` workflow.

## Summary

Scaffold UBS governance assets into VS Code-native agent and skill locations
with safe re-runs, conflict detection, and validator updates. The plan updates
the asset manifest, scaffold logic, validator target paths, and test coverage,
and introduces focused skills plus assistant handoffs that prefill prompts.

## Technical Context

**Language/Version**: Node.js 20  
**Primary Dependencies**: Node.js standard library (fs, path, util); no external runtime deps  
**Storage**: Filesystem only  
**Testing**: Node.js built-in test runner (`node --test`)  
**Target Platform**: Cross-platform CLI (macOS, Linux, Windows)  
**Project Type**: Single project  
**Performance Goals**: N/A (batch CLI; must complete initial scaffold under 60 seconds)  
**Constraints**: Non-destructive by default; conflicts abort entire run without `--force`  
**Scale/Scope**: Single repo; tens of scaffolded files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Product Over Process Artifacts: executable tooling, enforceable validation, usable assets.
- UBS Is the Behavioral Authority: UBS governs behavior; implementation conforms.
- Canonical UBS Structure Is Mandatory: 11 sections, fixed order, enforced by validation.
- VS Code Native Layout Is Mandatory: agents in .github/agents, skills in .github/skills.
- Atomicity: one UBS file governs one primary behavior.
- No Silent Assumptions: ambiguities tagged as Assumption with TODO questions.
- AI Is a First-Class Consumer: no inference required for rules or outcomes.
- English Is the Only Canonical Language: all UBS artifacts in English.
- Enforceability Over Readability: only rules that can be validated belong in UBS.
- Non-Destructive by Default: scaffolding safe; replacement requires explicit action.
- Minimalism With Intent: include only what is required to scaffold, validate, demonstrate.

## Project Structure

### Documentation (this feature)

```text
specs/002-vscode-native-scaffold/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── assets/
│   ├── agents/
│   └── skills/
│       ├── examples/
│       ├── guidelines/
│       └── template/
├── cli/
├── lib/
├── scaffold/
└── validator/

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: Single-project Node.js CLI with shared assets and
validators under `src/` and tests under `tests/`.

## Phase 0: Research

Output: [specs/002-vscode-native-scaffold/research.md](specs/002-vscode-native-scaffold/research.md)

## Phase 1: Design

Output:
- [specs/002-vscode-native-scaffold/data-model.md](specs/002-vscode-native-scaffold/data-model.md)
- [specs/002-vscode-native-scaffold/contracts/ubs-kit.openapi.yaml](specs/002-vscode-native-scaffold/contracts/ubs-kit.openapi.yaml)
- [specs/002-vscode-native-scaffold/quickstart.md](specs/002-vscode-native-scaffold/quickstart.md)

## Phase 2: Implementation Plan

1. Update asset manifest paths to scaffold .github/agents and .github/skills
  with focused skills for template, guidelines/checklist, and examples.
2. Update asset sources under `src/assets/` to match new agent/skill packaging
  (agent files and SKILL.md per skill).
3. Update scaffold logic and conflict detection to abort on any conflict unless
  `--force` is supplied; report legacy .ubs presence without modifying it.
4. Update validator entry point to target UBS content within skills and enforce
  required files/paths plus UBS structure (no agent/skill metadata validation).
5. Update reporting to clearly summarize written, skipped, conflicts, and
  legacy .ubs detection.
6. Update tests (unit/integration/contract) to cover new paths, conflict abort,
  dry-run behavior, and validator targeting.
7. Update root documentation to reflect new layout and usage.

## Phase 3: Validation & Release Readiness

1. Run test suite via `npm test` (or `node --test`).
2. Manually verify scaffold output in a clean repo and re-run scenarios.
3. Confirm validator output remains English-only and exits non-zero on errors.

## Constitution Check (Post-Design)

No violations identified. The plan keeps tooling runnable, non-destructive, and
aligned to the VS Code-native layout requirement.
