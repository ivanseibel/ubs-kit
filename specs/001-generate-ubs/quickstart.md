# Quickstart: Generate a UBS from Source Artifacts

## Goal

Produce a compliant UBS draft from source artifacts with traceability and explicit Labeled Assumptions (TODO Question) for gaps.

## Steps

1. Prepare source artifacts with stable identifiers and clear excerpts.
2. Submit a generation request for a single primary behavior and domain.
3. If UI-only artifacts are the only input, expect INCOMPLETE (or BLOCKED if behavior cannot be identified) with Labeled Assumptions (TODO Question) instead of derived rules.
4. Review the outcome status:
   - **SUCCESS**: Draft UBS generated with no missing required information.
   - **INCOMPLETE**: Draft UBS generated with gaps recorded as Labeled Assumptions (TODO Question).
   - **BLOCKED**: Generation cannot proceed due to invalid scope, conflicting artifacts, or multiple primary behaviors.
5. Record the draft domain location/path and treat the UBS draft as non-final until review is complete.
6. Review the UBS draft for traceability references and unresolved Labeled Assumptions (TODO Question).
7. Review the generation log entry to confirm request details, artifacts, and outcome status are recorded.
8. Resolve or remove assumptions before treating the UBS as approved.

## Validation Notes

- 2026-02-07: Checked outcome definitions and review steps; PASS. Rationale: steps align with SUCCESS/INCOMPLETE/BLOCKED semantics and emphasize non-final drafts.
- 2026-02-07: Checked draft location/path guidance; PASS. Rationale: quickstart records the draft domain location and non-final status.
- 2026-02-07: Checked UI-only artifact handling; PASS. Rationale: quickstart requires INCOMPLETE/BLOCKED outcomes with labeled assumptions.
