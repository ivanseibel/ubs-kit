---

description: "Task list for Generate a UBS from Source Artifacts"
---

# Tasks: Generate a UBS from Source Artifacts

**Governing UBS**: UBS-GEN-01 (this task list operationalizes the UBS behavior and must not reinterpret it)
**Input**: Design documents from [specs/001-generate-ubs/](specs/001-generate-ubs/)
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested; no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Governance Rule**: Every task MUST result in a concrete, reviewable artifact change. Validation-only tasks MUST still produce an explicit confirmation, annotation, or documented delta.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions
- Each task MUST target exactly one primary artifact; if a task affects more than one artifact, its description MUST explicitly justify why

## Path Conventions

- **Documentation-only**: specs/ as the primary work area

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Confirm feature documentation structure in specs/001-generate-ubs/ against [specs/001-generate-ubs/plan.md](specs/001-generate-ubs/plan.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T002 [P] Validate spec metadata and inputs in [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T003 [P] Validate checklist baseline in [specs/001-generate-ubs/checklists/requirements.md](specs/001-generate-ubs/checklists/requirements.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core documentation artifacts that MUST be complete before ANY user story work proceeds

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Update governance rationale and constraints in [specs/001-generate-ubs/research.md](specs/001-generate-ubs/research.md)
- [x] T005 [P] Validate outcome state transitions and entity fields in [specs/001-generate-ubs/data-model.md](specs/001-generate-ubs/data-model.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T006 [P] Align outcome semantics and payload fields in [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml). Confirmation Output: add a YAML comment block at the end ("# Validation Notes: ...") recording date, what was checked, and result (PASS/FAIL) with a one-line rationale, without changing schema.
- [x] T007 [P] Align outcome definitions and review steps in [specs/001-generate-ubs/quickstart.md](specs/001-generate-ubs/quickstart.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T008 Update governance boundaries in [specs/001-generate-ubs/plan.md](specs/001-generate-ubs/plan.md)

**Checkpoint**: Foundation ready - user story documentation updates can now begin in parallel; any violation of UBS-GEN-01 or the Project Constitution BLOCKS approval; checkpoints are semantic gates, not administrative milestones

---

## Phase 3: User Story 1 - Generate a compliant UBS draft (Priority: P1) 🎯 MVP

**Goal**: Specify how a compliant, non-final UBS draft is produced from complete artifacts.

**Independent Test**: Provide a complete artifact set and confirm the resulting UBS draft includes all mandatory sections and is explicitly non-final.

### Implementation for User Story 1

- [x] T009 [P] [US1] Clarify draft compliance and non-final status in [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md)
- [x] T010 [P] [US1] Align draft status fields with SUCCESS semantics in [specs/001-generate-ubs/data-model.md](specs/001-generate-ubs/data-model.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T011 [US1] Ensure SUCCESS response fields for draft location are explicit in [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml)
- [x] T012 [US1] Reinforce non-final draft guidance in [specs/001-generate-ubs/quickstart.md](specs/001-generate-ubs/quickstart.md)
- [x] T023 [US1] Clarify versioned placement and location semantics for UBS drafts in [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md), [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml), and [specs/001-generate-ubs/quickstart.md](specs/001-generate-ubs/quickstart.md), including explicit domain location/path field and versioned artifact statement. Primary Artifact: specs/001-generate-ubs/spec.md. Single-Artifact Justification: Although this task touches multiple artifacts, it is a single cross-artifact consistency change; the primary artifact is authoritative and the other artifacts are updated only to mirror it. Confirmation Output: add "Validation Notes" to each edited file (YAML comment block for the OpenAPI file).
- [x] T024 [US1] Capture forbidden-outcome extraction and preservation rules in [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md) and [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml), ensuring forbidden outcomes are included when present and never invented when absent. Primary Artifact: specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml. Single-Artifact Justification: Although this task touches multiple artifacts, it is a single cross-artifact consistency change; the primary artifact is authoritative and the other artifacts are updated only to mirror it. Confirmation Output: add "Validation Notes" to each edited file (YAML comment block for the OpenAPI file).

**Checkpoint**: User Story 1 documentation is complete and independently reviewable; any violation of UBS-GEN-01 or the Project Constitution BLOCKS approval; checkpoints are semantic gates, not administrative milestones

---

## Phase 4: User Story 2 - Surface gaps without guessing (Priority: P2)

**Goal**: Specify how gaps and scope conflicts are surfaced as Labeled Assumptions (TODO Question) or BLOCKED outcomes.

**Independent Test**: Provide artifacts with a missing rule or multiple behaviors and confirm the output records Labeled Assumptions or BLOCKED without selecting a behavior.

### Implementation for User Story 2

- [x] T013 [P] [US2] Clarify Labeled Assumption (TODO Question) handling in [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md)
- [x] T014 [US2] Ensure INCOMPLETE outcome returns labeled assumptions in [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml). Confirmation Output: add a YAML comment block at the end ("# Validation Notes: ...") recording date, what was checked, and result (PASS/FAIL) with a one-line rationale, without changing schema.
- [x] T015 [US2] Enforce BLOCKED semantics for multiple behaviors in [specs/001-generate-ubs/data-model.md](specs/001-generate-ubs/data-model.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T022 [US2] Ensure FR-006 is explicitly enforced across [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md), [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml), and [specs/001-generate-ubs/quickstart.md](specs/001-generate-ubs/quickstart.md): UI-only artifacts are non-authoritative; if UI-only is the only input, the outcome MUST be INCOMPLETE (or BLOCKED if behavior cannot be identified) and MUST surface Labeled Assumptions (TODO Question) rather than deriving rules. Primary Artifact: specs/001-generate-ubs/spec.md. Single-Artifact Justification: Although this task touches multiple artifacts, it is a single cross-artifact consistency change; the primary artifact is authoritative and the other artifacts are updated only to mirror it. Confirmation Output: add "Validation Notes" to each edited file (YAML comment block for the OpenAPI file).

**Checkpoint**: User Story 2 documentation is complete and independently reviewable; any violation of UBS-GEN-01 or the Project Constitution BLOCKS approval; checkpoints are semantic gates, not administrative milestones

---

## Phase 5: User Story 3 - Preserve traceability and auditability (Priority: P3)

**Goal**: Specify traceability references and generation log outcomes that are reviewable and auditable.

**Independent Test**: Generate a UBS draft and confirm each rule has a traceability reference and the generation log records outcome semantics.

### Implementation for User Story 3

- [x] T016 [P] [US3] Clarify traceability reference expectations in [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md)
- [x] T017 [US3] Ensure generation log payload is explicit in [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml)
- [x] T018 [US3] Align quickstart log review step with traceability rules in [specs/001-generate-ubs/quickstart.md](specs/001-generate-ubs/quickstart.md)

**Checkpoint**: All user stories are independently reviewable; any violation of UBS-GEN-01 or the Project Constitution BLOCKS approval; checkpoints are semantic gates, not administrative milestones

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consistency and governance alignment across all artifacts

- [x] T019 [P] Normalize terminology across artifacts as a single governance sweep (justification: consistency requires coordinated edits across files). Verification checklist: [specs/001-generate-ubs/spec.md](specs/001-generate-ubs/spec.md), [specs/001-generate-ubs/plan.md](specs/001-generate-ubs/plan.md), [specs/001-generate-ubs/data-model.md](specs/001-generate-ubs/data-model.md), [specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml](specs/001-generate-ubs/contracts/ubs-generation.openapi.yaml), [specs/001-generate-ubs/quickstart.md](specs/001-generate-ubs/quickstart.md)
- [x] T020 [P] Update checklist confirmations in [specs/001-generate-ubs/checklists/requirements.md](specs/001-generate-ubs/checklists/requirements.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.
- [x] T021 Validate plan boundary statements in [specs/001-generate-ubs/plan.md](specs/001-generate-ubs/plan.md). Confirmation Output: add a short "Validation Notes" subsection at the bottom of the same target file, recording date, what was checked, and result (PASS/FAIL) with a one-line rationale.

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

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - no dependencies on other stories

### User Story Order Graph

P1 (US1) -> P2 (US2) -> P3 (US3)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Tasks within a story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Clarify draft compliance and non-final status in specs/001-generate-ubs/spec.md"
Task: "Align draft status fields with SUCCESS semantics in specs/001-generate-ubs/data-model.md"
```

---

## Parallel Example: User Story 2

```bash
Task: "Clarify Labeled Assumption (TODO Question) handling in specs/001-generate-ubs/spec.md"
Task: "Enforce BLOCKED semantics for multiple behaviors in specs/001-generate-ubs/data-model.md"
```

---

## Parallel Example: User Story 3

```bash
Task: "Clarify traceability reference expectations in specs/001-generate-ubs/spec.md"
Task: "Align quickstart log review step with traceability rules in specs/001-generate-ubs/quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Review User Story 1 documentation independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Review independently
3. Add User Story 2 → Review independently
4. Add User Story 3 → Review independently
5. Each story adds governance value without requiring code implementation

### Parallel Team Strategy

With multiple contributors:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Contributor A: User Story 1
   - Contributor B: User Story 2
   - Contributor C: User Story 3
3. Stories complete and are reviewed independently
