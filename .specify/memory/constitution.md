<!--
Sync Impact Report
- Version change: [CONSTITUTION_VERSION] -> 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> Behavior First
	- [PRINCIPLE_2_NAME] -> State-Oriented Thinking
	- [PRINCIPLE_3_NAME] -> Atomicity Over Narratives
	- [PRINCIPLE_4_NAME] -> No Silent Assumptions
	- [PRINCIPLE_5_NAME] -> AI as a First-Class Consumer
	- Added: Living Documentation With Consequences
- Added sections: Purpose, Problem Statement, Non-Goals, Quality Bar, Evolution Policy, Success Criteria
- Removed sections: None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ⚠ .specify/templates/commands/*.md (directory missing; verify none required)
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): original adoption date unknown
-->
# UBS Kit Constitution

## Purpose

UBS Kit exists to make business behavior explicit, unambiguous, and reusable
before implementation. The system MUST produce high-quality User Behavior Specs
(UBS) that humans and AI agents can consume without inventing rules or
shortcuts. UBS files are versioned artifacts that live alongside the codebase
and evolve with it. UBS govern downstream specifications, plans, tests, and
implementations. UBS Kit is a behavior governance system, not documentation for
its own sake.

## Problem Statement

Business rules are often implicit in code, UI flows, or scattered tickets. This
causes ambiguity about allowed behavior, regressions when rules change, AI
agents hallucinating missing rules, and documentation that becomes obsolete.
UBS Kit addresses this by defining a single, structured, versioned source of
truth for observable system behavior.

## Core Principles

### Behavior First
Specifications MUST describe what the system does and MUST NOT do. They MUST
avoid implementation details, frameworks, UI flow authority, or infrastructure
assumptions. Rationale: behavior-first specs prevent accidental coupling and
keep business rules portable.

### State-Oriented Thinking
Behavior MUST be defined in terms of explicit states, triggering events, guards
and rules, and allowed or forbidden transitions. If a behavior cannot be
expressed as a state transition or rule, it is not yet understood. Rationale:
state models make rules testable and reducible to explicit transitions.

### Atomicity Over Narratives
The smallest unit of truth is an atomic behavior. Each UBS MUST govern exactly
one primary behavior or transition, and longer journeys MUST compose multiple
UBS files. Rationale: atomic specs enable independent testing and controlled
composition.

### No Silent Assumptions
Every rule, constraint, or expectation MUST be explicitly stated. Any unknown
MUST be marked as an assumption, question, or TODO; nothing is implied by
absence. Assumptions MUST be explicitly labeled and traceable until resolved
or removed. Rationale: explicit uncertainty prevents downstream fabrication.

### AI as a First-Class Consumer
Specifications MUST be safe for AI consumption. Agents MUST NOT infer missing
rules, invent states, or ignore explicitly forbidden outcomes. If an agent
cannot act safely from a UBS, the UBS is incomplete. Rationale: AI agents are a
primary consumer and must be constrained by explicit behavior.

### Living Documentation With Consequences
UBS files MUST stay aligned with the system. Behavior changes MUST update UBS;
UBS reviews are mandatory and incomplete UBS files MUST block progress.
Documentation without enforcement is treated as obsolete. Rationale: governed
documents remain accurate over time.

## Non-Goals

UBS Kit intentionally does not replace user stories or product discovery,
document UI layouts or visual flows, generate full architecture diagrams, or
encode low-level implementation details. Those artifacts may exist but are not
authoritative for UBS.

## Quality Bar

A UBS is valid only if a new engineer can understand behavior without reading
code, QA can derive tests directly, AI can generate tests without guessing, and
forbidden states or outcomes are explicit. If any condition fails, the UBS MUST
be revised.

## Evolution Policy

Templates, rules, and guardrails MAY change to improve clarity, safety, or
agent reliability. Backward compatibility is not guaranteed in early versions.
Iteration is expected; drift is not.

## Success Criteria

UBS Kit succeeds when teams ask fewer clarifying questions after reading specs,
regressions decrease in behavior-heavy areas, AI-generated code aligns with
business rules, and specifications remain smaller than the code they govern.
If UBS files become harder to read than the code, the project has failed.

## Governance

- The constitution supersedes other practices; conflicts MUST be resolved in
	favor of this document.
- Amendments MUST be documented with rationale, version bump, and migration
	notes when applicable.
- Versioning follows semantic versioning: MAJOR for incompatible governance
	changes, MINOR for new or expanded principles/sections, PATCH for clarifying
	edits.
- Compliance is verified in reviews; changes that violate principles MUST NOT
	be merged.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2026-02-07
