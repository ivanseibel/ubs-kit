# UBS Kit — Design Rationale

## Purpose of This Document

This document explains **why UBS Kit is designed the way it is**.

It is not a specification, a user guide, or an implementation manual. Its role is to preserve architectural and product intent so future contributors understand the trade-offs, constraints, and decisions that shaped the tool.

This rationale exists to prevent accidental erosion of the original goals.

---

## Core Problem Being Addressed

Modern software systems encode critical business behavior implicitly across:

* UI flows
* backend logic
* tests
* tribal knowledge

This implicit behavior becomes fragile when:

* teams change
* systems grow
* AI agents start writing code

UBS Kit exists to make **business behavior explicit, enforceable, and versioned**, in a form that is safe for both humans and AI.

---

## Why a CLI Tool

### Decision

UBS Kit is delivered as a **Node.js CLI**, not a library or a hosted service.

### Rationale

* A CLI can be adopted incrementally in any repository.
* It avoids coupling UBS to a specific language, framework, or runtime.
* It works equally well for humans and automation.
* It fits naturally into local workflows and CI environments.

A library would require runtime integration. A service would introduce unnecessary operational complexity.

---

## Why `.ubs/` as an Isolated Directory

### Decision

All UBS artifacts live under a single, isolated directory: `.ubs/`.

### Rationale

* Prevents polluting existing `docs/`, `scripts/`, or source directories.
* Makes UBS adoption reversible by deleting one directory.
* Allows tooling to reason about UBS artifacts deterministically.
* Creates a clear boundary between behavioral governance and application code.

Isolation was chosen over convenience to preserve long-term clarity.

---

## Why Non-Destructive by Default

### Decision

UBS Kit refuses to overwrite files unless `--force` is explicitly provided.

### Rationale

* Behavioral governance must not destroy user work.
* Explicit force aligns with the framework principle of “no silent assumptions”.
* Safe defaults encourage experimentation and adoption.

Failure is preferred over silent mutation.

---

## Why Validation Is a First-Class Feature

### Decision

UBS Kit includes a validator and treats validation failures as hard errors.

### Rationale

* Documentation without enforcement decays.
* UBS files must be trusted inputs for humans and AI.
* Structural validation prevents partial or ambiguous specifications.

Validation gives UBS *consequences*, which is required for it to remain relevant.

---

## Why Exactly 11 Required UBS Sections

### Decision

The UBS template enforces exactly 11 required sections.

### Rationale

* Fewer sections lead to ambiguity and missing rules.
* More sections encourage verbosity and narrative drift.
* The chosen structure forces explicit state, rules, forbidden outcomes, and observability.

The structure is intentionally rigid to make behavior explicit.

---

## Why UI Is Explicitly Non-Authoritative

### Decision

UI descriptions are never treated as authoritative sources of behavior.

### Rationale

* UI changes frequently and optimizes for usability, not correctness.
* Business rules must outlive UI implementations.
* Treating UI as authoritative leads to implicit logic and regressions.

UBS governs behavior independently of presentation.

---

## Why Assumptions Must Be Explicit

### Decision

Any missing information must be labeled as an Assumption with a TODO question.

### Rationale

* Silent inference is the primary source of incorrect AI-generated code.
* Explicit assumptions create visible risk that can be resolved.
* Open questions are preferable to false certainty.

This rule applies equally to humans and AI.

---

## Why Minimal Tests Are Included

### Decision

UBS Kit ships with minimal automated tests.

### Rationale

* Tests ensure the scaffold and validator remain stable.
* They act as executable documentation of expected behavior.
* The goal is confidence, not exhaustive coverage.

Testing focuses on behavior, not implementation detail.

---

## Why spec-kit Was Used (and Its Limits)

### Decision

GitHub spec-kit was used to guide development.

### Rationale

* spec-kit enforces separation of concerns and disciplined thinking.
* It prevents premature implementation.
* It exposes ambiguity early.

However:

* spec-kit is a **process tool**, not a product generator.
* Specs alone are not deliverables.

UBS Kit exists because implementation followed specification, not because specification existed.

---

## Intentional Non-Goals

UBS Kit deliberately avoids:

* Framework-specific integrations
* CI wiring by default
* UI or visualization layers
* Opinionated workflow enforcement

These are left to downstream users and tooling.

---

## Guiding Principle

If future changes:

* reduce explicitness
* remove enforcement
* reintroduce silent assumptions
* turn UBS into narrative documentation

then those changes violate the original intent of UBS Kit.

This document exists to make that intent dur
