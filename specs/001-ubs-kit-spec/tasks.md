---

description: "Task list for UBS Kit Governance Layer"
---

# Tasks: UBS Kit Governance Layer

**Input**: Design documents from `/specs/001-ubs-kit-spec/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED by the constitution and are included to validate scaffold output and validator behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution reminders**: Tasks MUST produce concrete code or artifact changes
toward a runnable CLI outcome. Non-destructive defaults (`--dry-run`, `--force`)
and validator failure behavior MUST be planned when relevant. UBS structure
MUST remain canonical (11 sections, fixed order), English-only, and enforceable
by validation. Avoid convenience shortcuts that reduce durability.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create base directories per plan in src/ and tests/ (src/cli, src/scaffold, src/validator, src/assets, src/lib, tests/contract, tests/integration, tests/unit)
- [X] T002 Initialize package.json with CLI metadata, bin entry for create-ubs-kit, scripts, and Node >=20 engine requirement in package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

- [X] T003 Create filesystem helpers for repo root detection, ensureDir, read/write, and checksum in src/lib/fs.js
- [X] T004 Create reporting helpers for conflict and validation output in src/lib/report.js

---

## Phase 3: User Story 1 - Scaffold a UBS Governance Layer (Priority: P1) 🎯 MVP

**Goal**: Create a complete .ubs/ scaffold with canonical assets in an existing repository

**Independent Test**: Run the CLI in a clean repository and verify .ubs/ exists with all required assets and no unrelated files change

### Implementation for User Story 1

- [X] T005 [P] [US1] Add scaffold integration tests for initial scaffold output in tests/integration/scaffold.test.js
- [X] T006 [P] [US1] Add canonical UBS template with 11 sections in src/assets/template/ubs-template.md
- [X] T007 [P] [US1] Add UBS usage guidelines in src/assets/guidelines/ubs-guidelines.md
- [X] T008 [P] [US1] Add UBS quality checklist in src/assets/checklist/ubs-quality-checklist.md
- [X] T009 [P] [US1] Add agent resources and prompts in src/assets/agents/ubs-agent.md
- [X] T010 [P] [US1] Add three example UBS files in src/assets/examples/example-1.md, src/assets/examples/example-2.md, src/assets/examples/example-3.md
- [X] T011 [US1] Define canonical asset manifest and checksums in src/scaffold/asset-manifest.js
- [X] T012 [US1] Implement scaffold logic for missing assets and dry-run mode in src/scaffold/scaffold.js
- [X] T013 [US1] Implement CLI scaffold command and option parsing in src/cli/create-ubs-kit.js

**Checkpoint**: User Story 1 is functional and independently testable

---

## Phase 4: User Story 2 - Validate UBS Structural Validity (Priority: P2)

**Goal**: Provide deterministic UBS validation with clear failure reports

**Independent Test**: Run the validator against a valid UBS file and a known invalid UBS file to confirm pass/fail behavior

### Implementation for User Story 2

- [X] T014 [P] [US2] Add validator contract tests for valid and invalid UBS files in tests/contract/validator.test.js
- [X] T015 [P] [US2] Define canonical section list and rule IDs in src/validator/rules.js
- [X] T016 [US2] Implement UBS validation (exact headings, order, atomic Identity, explicit Assumption enforcement, report all violations) in src/validator/validate-ubs.js
- [X] T017 [US2] Wire validate command and exit codes in src/cli/create-ubs-kit.js

**Checkpoint**: User Story 2 is functional and independently testable

---

## Phase 5: User Story 3 - Safe Re-Run and Conflict Handling (Priority: P3)

**Goal**: Ensure re-runs are non-destructive, detect conflicts, and require --force to overwrite

**Independent Test**: Re-run the CLI on a repo with modified .ubs/ assets and verify conflicts block writes without --force

### Implementation for User Story 3

- [X] T018 [P] [US3] Add re-run conflict integration tests in tests/integration/conflicts.test.js
- [X] T019 [US3] Implement diff and conflict detection logic (byte comparison + checksums) in src/scaffold/diff.js
- [X] T020 [US3] Update scaffold to pre-scan all targets and abort before writes on conflict unless --force in src/scaffold/scaffold.js
- [X] T021 [US3] Implement refresh logic for identical assets and skip behavior for conflicts in src/scaffold/scaffold.js
- [X] T022 [US3] Surface conflict reports and non-zero exit behavior in src/cli/create-ubs-kit.js

**Checkpoint**: User Story 3 is functional and independently testable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T023 [P] Create root README.md explaining installation, CLI usage, validation, and flags in README.md
- [X] T024 [P] Verify quickstart commands and options align with the CLI interface in specs/001-ubs-kit-spec/quickstart.md
- [X] T025 [P] Define the AI evaluation set (>=10 valid UBS files) and acceptance criteria for SC-004 in specs/001-ubs-kit-spec/ai-eval/README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - builds on scaffold behavior from US1

### Parallel Opportunities

- Setup tasks are sequential due to shared files
- Asset creation tasks in US1 can run in parallel
- US2 and US3 can be staffed in parallel after Foundational completion

---

## Parallel Example: User Story 1

```bash
# Launch all asset file creation tasks together:
Task: "Add canonical UBS template with 11 sections in src/assets/template/ubs-template.md"
Task: "Add UBS usage guidelines in src/assets/guidelines/ubs-guidelines.md"
Task: "Add UBS quality checklist in src/assets/checklist/ubs-quality-checklist.md"
Task: "Add agent resources and prompts in src/assets/agents/ubs-agent.md"
Task: "Add three example UBS files in src/assets/examples/example-1.md, src/assets/examples/example-2.md, src/assets/examples/example-3.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify scaffolding in a clean repository

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate independently → Demo (MVP)
3. Add User Story 2 → Validate independently → Demo
4. Add User Story 3 → Validate independently → Demo
5. Polish and documentation updates

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Avoid vague tasks or cross-story dependencies that break independence
