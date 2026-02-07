# Research: Workspace-Native Governance Scaffold

## Decision: Scaffold to VS Code-native locations

**Decision**: Use .github/agents for custom agents and .github/skills for skills.

**Rationale**: VS Code discovers agents and skills in these locations without
manual copying. This aligns with documented conventions and reduces setup
friction for users.

**Alternatives considered**:
- Keep .ubs/ layout and require manual copying (rejected; adds friction).
- Support multiple layouts simultaneously (rejected; increases complexity and
  validation ambiguity).

## Decision: Focused skills instead of a single consolidated skill

**Decision**: Provide separate skills for the template, guidelines/checklist,
and examples.

**Rationale**: Focused skills improve discovery and keep context loading small.
Agents can load only what they need for a task.

**Alternatives considered**:
- One consolidated skill (rejected; bloated context and less discoverable).
- Hybrid core skill plus examples (rejected; unnecessary complexity).

## Decision: Non-destructive scaffolding with conflict abort

**Decision**: Abort the entire scaffold if any conflict is detected unless
`--force` is supplied.

**Rationale**: Maintains safety guarantees and avoids partial writes that can
leave the workspace in a confusing state.

**Alternatives considered**:
- Skip conflicting files and write the rest (rejected; partial state).
- Interactive prompts (rejected; not suitable for non-interactive usage).

## Decision: Validation scope limited to structure and required paths

**Decision**: Validate UBS structure and required files/paths only; do not
validate agent or skill metadata.

**Rationale**: Keeps validation deterministic and avoids semantic interpretation
of agent/skill instructions.

**Alternatives considered**:
- Validate agent/skill metadata (rejected; requires schema enforcement beyond
  current scope).
- Validate instruction quality (rejected; subjective and not deterministic).

## Decision: Manual handoff execution

**Decision**: Handoffs prefill prompts but require user confirmation to run.

**Rationale**: Preserves user control and prevents unexpected automation.

**Alternatives considered**:
- Auto-run handoffs (rejected; surprises users and risks unintended actions).
- No handoffs (rejected; loses the coordination value).

## Decision: Legacy .ubs handling

**Decision**: Detect and report legacy .ubs content; do not migrate, delete, or
alter it.

**Rationale**: Avoids destructive behavior and unrequested migration logic.

**Alternatives considered**:
- Automatic migration (rejected; risky and out of scope).
- Deletion or archival (rejected; destructive by default).
