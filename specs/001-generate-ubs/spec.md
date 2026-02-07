# Feature Specification: Generate a UBS from Source Artifacts

**Feature Branch**: `001-generate-ubs`  
**Created**: 2026-02-07  
**Status**: Draft  
**Input**: User description: "Generate a UBS from existing source artifacts with traceability, explicit questions for gaps, and no invented rules."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Generate a compliant UBS draft (Priority: P1)

As a human or AI agent, I want a UBS draft created from provided artifacts so I can review and govern one primary behavior without rewriting rules.

**Why this priority**: It delivers the core value: fast, accurate UBS creation with governance-ready structure.

**Independent Test**: Provide a complete artifact set and request generation; confirm a new UBS draft is created with all mandatory sections and explicit rules, and is not treated as approved.

**Acceptance Scenarios**:

1. **Given** complete source artifacts for one behavior and a generation request, **When** the UBS is generated, **Then** a new UBS draft exists in the correct domain location with all mandatory sections completed, includes an explicit Draft status marker, and is marked as not yet approved.
2. **Given** source artifacts with explicit rules and forbidden outcomes, **When** the UBS is generated, **Then** those rules and forbidden outcomes are captured verbatim without adding or rephrasing intent.

---

### User Story 2 - Surface gaps without guessing (Priority: P2)

As a human or AI agent, I want missing or ambiguous rules surfaced as Labeled Assumptions (TODO Question) so the UBS remains safe and accurate.

**Why this priority**: Prevents fabricated behavior and ensures governance remains trustworthy.

**Independent Test**: Provide artifacts with a missing rule; confirm the UBS includes a Labeled Assumption (TODO Question) label instead of an invented rule.

**Acceptance Scenarios**:

1. **Given** artifacts that omit a required rule for the target behavior, **When** the UBS is generated, **Then** the missing rule is captured as a Labeled Assumption (TODO Question).
2. **Given** artifacts that describe more than one primary behavior candidate, **When** the UBS is generated, **Then** the outcome is BLOCKED and no behavior is selected or inferred.

---

### User Story 3 - Preserve traceability and auditability (Priority: P3)

As a reviewer, I want each UBS rule traceable to a source artifact and a logged generation outcome so I can validate correctness quickly.

**Why this priority**: Traceability is required for trust, review, and governance.

**Independent Test**: Generate a UBS and verify that each rule references a source artifact and the request outcome is logged.

**Acceptance Scenarios**:

1. **Given** a generation request and artifacts, **When** the UBS is produced, **Then** each rule includes a reference to its source artifact or a Labeled Assumption (TODO Question).
2. **Given** a generation request, **When** generation completes, **Then** a log entry records the request, artifacts used, and outcome status with definitions for SUCCESS, INCOMPLETE, and BLOCKED.

---

### Edge Cases

- Artifacts conflict on a rule; the UBS records the conflict as a Labeled Assumption (TODO Question) instead of selecting a side.
- Artifacts are UI-only descriptions without behavioral rules; the UBS flags gaps and requests clarification.
- Artifacts are empty or unsupported; the generation is BLOCKED with an explicit reason.
- Artifacts describe multiple behaviors; generation is BLOCKED and no behavior is selected or inferred.
- Artifacts contain unclear wording; the UBS records a Labeled Assumption (TODO Question) instead of normalizing intent.

**Assumptions**: Source artifacts are available and accessible at request time; the request includes a domain for placement.

**Dependencies**: UBS template and constitution are available to the generator; source artifacts can be referenced by stable identifiers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST accept a generation request that specifies the target behavior, domain, and source artifacts.
- **FR-002**: The system MUST produce a UBS draft that follows the official UBS template and includes all mandatory sections; SUCCESS means a compliant draft was generated, not that it is approved or complete.
- **FR-003**: The generated UBS MUST govern exactly one primary behavior; if artifacts indicate more than one primary behavior candidate, the outcome MUST be BLOCKED and the system MUST NOT select or infer which behavior to generate.
- **FR-004**: The system MUST NOT invent rules, states, or transitions and MUST NOT rephrase, normalize, or reinterpret business rules beyond what is explicitly stated; unclear wording MUST be captured as a Labeled Assumption (TODO Question).
- **FR-005**: Every rule in the UBS MUST be traceable to a source artifact or a Labeled Assumption (TODO Question).
- **FR-006**: UI descriptions in artifacts MUST NOT be treated as authoritative behavior; if they are the only source, the outcome MUST be INCOMPLETE (or BLOCKED if behavior cannot be identified) and MUST surface Labeled Assumptions (TODO Question) rather than deriving rules.
- **FR-007**: The system MUST record a generation log containing the request, artifact references, and outcome status, where SUCCESS means a draft with no missing required information, INCOMPLETE means a draft with gaps recorded as Labeled Assumptions (TODO Question), and BLOCKED means generation cannot proceed due to invalid scope, conflicting artifacts, or multiple primary behaviors.
- **FR-008**: The generated UBS MUST be created in the domain location provided in the request, include an explicit domain location/path field in the draft output, and remain versioned alongside the codebase.
- **FR-009**: The generated UBS MUST include explicit forbidden outcomes when they are present in the source artifacts and MUST NOT invent forbidden outcomes when they are absent.

### Key Entities *(include if feature involves data)*

- **Source Artifact**: Input material (stories, flows, existing specs) used to derive rules; includes a stable reference identifier.
- **Generation Request**: The request to produce a UBS, including target behavior, domain, requester, and timestamp.
- **UBS Draft**: An intermediate, non-final UBS artifact generated for review, with status (SUCCESS, INCOMPLETE, BLOCKED) and version; SUCCESS does not mean approved or complete.
- **Traceability Reference**: A link between a UBS rule and its originating artifact or Labeled Assumption (TODO Question), including the artifact reference identifier and verbatim quote.
- **Labeled Assumption (TODO Question)**: A labeled unknown captured verbatim from gaps or unclear wording, with a TODO prompt and resolution status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of generated UBS drafts include all mandatory sections of the official template.
- **SC-002**: For complete artifact sets, a UBS draft is produced within 5 minutes of the request.
- **SC-003**: 100% of UBS rules include a traceability reference or Labeled Assumption (TODO Question).
- **SC-004**: 100% of generation requests produce a logged outcome with artifact references and status.

## Validation Notes

- 2026-02-07: Checked spec metadata and input statement; PASS. Rationale: metadata fields are present and align with the current feature description.
- 2026-02-07: Checked draft compliance and non-final status clarity; PASS. Rationale: acceptance criteria include an explicit Draft status marker.
- 2026-02-07: Checked versioned placement and forbidden outcome rules; PASS. Rationale: FR-008 and FR-009 explicitly define location/path handling and forbid invented outcomes.
- 2026-02-07: Checked labeled assumption handling and UI-only artifact rules; PASS. Rationale: FR-006 and US2 tests require explicit labeled assumptions and non-authoritative UI handling.
- 2026-02-07: Checked traceability reference expectations; PASS. Rationale: traceability references now include artifact identifiers and verbatim quotes.
