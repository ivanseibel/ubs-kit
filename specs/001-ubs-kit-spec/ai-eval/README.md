# AI Evaluation Set

## Purpose

Validate SC-004 by ensuring AI responses require no additional assumptions
beyond those explicitly marked in UBS files.

## Acceptance Criteria

- At least 10 UBS files are included.
- All UBS files are valid and pass structural validation.
- AI responses to each UBS file do not introduce new assumptions.

## Evaluation Notes

- Each UBS file must be single-behavior and use canonical headings.
- Any assumptions must be labeled with Assumption ID and TODO question.
- Results should be recorded in a separate results log if needed.
