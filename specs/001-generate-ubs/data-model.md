# Data Model: Generate a UBS from Source Artifacts

## Entities

### Source Artifact

- **Fields**: `artifact_id`, `artifact_type`, `title`, `location_ref`, `excerpt`
- **Validation**: `artifact_id` is required and stable; `artifact_type` is required.

### Generation Request

- **Fields**: `request_id`, `behavior_name`, `domain`, `requester`, `requested_at`, `artifact_refs[]`
- **Validation**: `behavior_name`, `domain`, and `artifact_refs` are required; `artifact_refs` must reference valid Source Artifacts.

### UBS Draft

- **Fields**: `draft_id`, `behavior_name`, `domain`, `status`, `version`, `created_at`, `location_ref`
- **Validation**: `status` is one of `SUCCESS`, `INCOMPLETE`, `BLOCKED`; `location_ref` is required when `status` is `SUCCESS` or `INCOMPLETE`.
- **Notes**: Intermediate, non-final artifact for review; `SUCCESS` does not mean approved and indicates no missing required information.

### Traceability Reference

- **Fields**: `reference_id`, `rule_id`, `artifact_id`, `quote`
- **Validation**: `rule_id` and `artifact_id` are required.

### Labeled Assumption (TODO Question)

- **Fields**: `assumption_id`, `rule_id`, `todo_question`, `status`
- **Validation**: `todo_question` is required; `status` is one of `OPEN`, `RESOLVED`, `REMOVED`.

## Relationships

- A **Generation Request** references many **Source Artifacts**.
- A **UBS Draft** is created from one **Generation Request**.
- A **UBS Draft** includes many **Traceability References**.
- A **Traceability Reference** links a rule to one **Source Artifact** or a **Labeled Assumption (TODO Question)**.

## State Transitions

- **Generation Outcome**: `REQUESTED` -> `SUCCESS` | `INCOMPLETE` | `BLOCKED`
- **BLOCKED Usage**: Applied when multiple primary behaviors are detected or when scope is invalid.
- **Assumption Status**: `OPEN` -> `RESOLVED` | `REMOVED`

## Validation Notes

- 2026-02-07: Checked outcome state transitions and entity fields; PASS. Rationale: entities and transitions align with SUCCESS/INCOMPLETE/BLOCKED semantics.
- 2026-02-07: Checked draft status fields against SUCCESS semantics; PASS. Rationale: SUCCESS is explicitly tied to completeness without implying approval.
- 2026-02-07: Checked BLOCKED semantics for multiple behaviors; PASS. Rationale: BLOCKED usage is explicit in state transitions.
