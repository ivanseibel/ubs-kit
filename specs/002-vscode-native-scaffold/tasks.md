---

description: "Task list for workspace-native governance scaffold"
---

# Tasks: Workspace-Native Governance Scaffold

**Input**: Design documents from `/specs/002-vscode-native-scaffold/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED by the constitution to verify scaffold output and validator behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution reminders**: Tasks MUST produce concrete code or artifact changes
toward a runnable CLI outcome. Non-destructive defaults (`--dry-run`, `--force`)
and validator failure behavior MUST be planned when relevant. UBS structure
MUST remain canonical (11 sections, fixed order), English-only, and enforceable
by validation. Agents and skills MUST live in VS Code-native locations
(.github/agents, .github/skills). Avoid convenience shortcuts that reduce
durability.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new skill asset sources needed by all stories

- [x] T001 [P] Add template skill assets in src/assets/skills/template/SKILL.md and src/assets/skills/template/ubs-template.md
- [x] T002 [P] Add guidelines/checklist skill assets in src/assets/skills/guidelines/SKILL.md, src/assets/skills/guidelines/ubs-guidelines.md, and src/assets/skills/guidelines/ubs-quality-checklist.md
- [x] T003 [P] Add examples skill assets in src/assets/skills/examples/SKILL.md and src/assets/skills/examples/example-1.md, src/assets/skills/examples/example-2.md, src/assets/skills/examples/example-3.md
- [x] T004 Update scaffold manifest for skill assets and .github/skills paths in src/scaffold/asset-manifest.js

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Update asset diff handling to support skills/agents paths in src/scaffold/diff.js
- [x] T006 Update validator scan root and required path checks in src/validator/validate-ubs.js
- [x] T007 Update required path rules for agents/skills in src/validator/rules.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Native scaffold in expected locations (Priority: P1) 🎯 MVP

**Goal**: One command creates the governance scaffold in native locations

**Independent Test**: Run the scaffold in a clean repo and verify .github/agents and .github/skills contain the required assets

### Implementation for User Story 1

- [x] T008 [US1] Update scaffold write targets to .github/agents and .github/skills in src/scaffold/scaffold.js
- [x] T009 [US1] Update CLI output messaging to reference native locations in src/cli/create-ubs-kit.js

**Checkpoint**: User Story 1 should be functional and independently testable

---

## Phase 4: User Story 2 - Safe re-runs and conflict handling (Priority: P2)

**Goal**: Re-runs are safe, conflicts abort the entire run, and legacy .ubs is reported

**Independent Test**: Re-run on identical content, then introduce a conflict and confirm the run aborts and reports legacy .ubs

### Implementation for User Story 2

- [x] T010 [US2] Enforce conflict abort and legacy .ubs detection in src/scaffold/scaffold.js
- [x] T011 [US2] Add legacy .ubs reporting and conflict summaries in src/lib/report.js
- [x] T012 [US2] Surface legacy .ubs detection in CLI output in src/cli/create-ubs-kit.js
- [x] T013 [US2] Align contract response with legacyUbsDetected in specs/002-vscode-native-scaffold/contracts/ubs-kit.openapi.yaml

**Checkpoint**: User Story 2 should be functional and independently testable

---

## Phase 5: User Story 3 - Coordinated specialized assistants (Priority: P3)

**Goal**: Provide specialized assistants with handoffs that reference focused skills

**Independent Test**: Trigger a specialized assistant and verify a handoff is available with a prefilled prompt

### Implementation for User Story 3

- [x] T014 [US3] Create governance agent definition with handoff in src/assets/agents/ubs-governance.agent.md
- [x] T015 [US3] Create review agent definition referencing skills in src/assets/agents/ubs-review.agent.md
- [x] T016 [US3] Add agent assets to manifest with .github/agents paths in src/scaffold/asset-manifest.js

**Checkpoint**: User Story 3 should be functional and independently testable

---

## Phase 6: Tests (Required)

**Purpose**: Verify scaffold output and validator behavior

- [x] T017 [P] Add unit tests for manifest and path targeting in tests/unit/
- [x] T018 Add integration test for scaffold output in tests/integration/
- [x] T019 Add integration test for conflict abort and legacy .ubs detection in tests/integration/
- [x] T020 Add validator behavior coverage for skill-contained UBS files in tests/contract/

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation and consistency updates across the product

- [x] T021 [P] Update root README to reflect native layout in README.md
- [x] T022 [P] Update design rationale for native layout in DESIGN_RATIONALE.md
- [x] T023 [P] Update quickstart guidance in specs/002-vscode-native-scaffold/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Within Each User Story

- Manifest and scaffold updates before doc polish
- Story complete before moving to next priority

### Parallel Opportunities

- T001, T002, T003 can run in parallel
- T017, T018, T019, T020 can run in parallel
- T021, T022, T023 can run in parallel

---

## Parallel Example: User Story 2

```bash
Task: "Enforce conflict abort and legacy .ubs detection in src/scaffold/scaffold.js"
Task: "Add legacy .ubs reporting and conflict summaries in src/lib/report.js"
Task: "Surface legacy .ubs detection in CLI output in src/cli/create-ubs-kit.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate independently → MVP
3. Add User Story 2 → Validate independently
4. Add User Story 3 → Validate independently
5. Finish polish updates

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently
