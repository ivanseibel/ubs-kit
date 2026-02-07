# Identity

- UBS ID: UBS-EX-002
- Primary Behavior: Create a new project workspace

# Business Context

Users need to create a workspace to organize their project artifacts.

# Actors

- User
- System

# Initial State (Given)

- User is authenticated.

# Triggering Event (When)

- User submits a workspace creation request with a name.

# Rules and Guards

- The name must be unique for the user.
- The system creates a workspace with the provided name.

# Expected Outcome (Then)

- A new workspace is created and visible to the user.

# Invalid States or Outcomes

- Duplicate workspace names are accepted.

# Invariants

- The user remains the owner of the workspace.

# Minimum Observability

- Workspace record persisted.
- Audit log entry for creation.

# Notes for AI

- No additional assumptions are required.
