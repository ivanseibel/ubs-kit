# Research: UBS Kit Governance Layer

## Decision 1: CLI argument parsing

**Decision**: Use Node.js `node:util` `parseArgs` for argument parsing.
**Rationale**: Built-in on Node.js 20, keeps runtime dependencies at zero, and
supports structured options required by the CLI.
**Alternatives considered**: `commander`, `yargs` (rejected to avoid external
runtime dependencies).

## Decision 2: Test framework

**Decision**: Use the built-in `node:test` runner with `assert/strict`.
**Rationale**: Available in Node.js 20, minimal setup, avoids external testing
libraries while providing deterministic test execution.
**Alternatives considered**: `vitest`, `jest` (rejected to reduce dependency
surface and configuration overhead).

## Decision 3: Conflict detection and write safety

**Decision**: Pre-scan all target paths, compare existing content byte-for-byte
against canonical assets, and stop before writing any files if any conflict is
detected.
**Rationale**: Matches non-destructive defaults and avoids partial updates. It is
also easy to test and explain to users.
**Alternatives considered**: Interactive prompts, checksum + version headers,
partial updates (rejected due to complexity or non-deterministic behavior).

## Decision 4: Validator rule strictness

**Decision**: Enforce exact canonical section headings and order, validate only
explicit Assumption labels for required ID and TODO question, and report all
violations before exiting non-zero.
**Rationale**: Deterministic, testable enforcement without inference or
heuristics. Full reporting reduces re-run cycles for users.
**Alternatives considered**: Tolerant heading matching, fast-fail on first error,
implicit TODO inference (rejected to preserve enforceability and clarity).

## Decision 5: Canonical asset storage

**Decision**: Store canonical assets under `src/assets/` and scaffold from that
manifest.
**Rationale**: Keeps source of truth in the codebase and enables deterministic
scaffolding and validation tests.
**Alternatives considered**: Generate assets on the fly, embed assets as code
strings (rejected for maintainability and clarity).
