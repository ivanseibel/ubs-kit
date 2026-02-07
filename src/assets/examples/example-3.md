# Identity

- UBS ID: UBS-EX-003
- Primary Behavior: Export account data

# Business Context

Users must be able to export their account data for compliance and portability.

# Actors

- User
- System

# Initial State (Given)

- User is authenticated.
- Account data exists.

# Triggering Event (When)

- User requests a data export.

# Rules and Guards

- The system prepares a data export package.
- The system notifies the user when export is ready.

# Expected Outcome (Then)

- Export package is available for download.

# Invalid States or Outcomes

- Export includes data from another user.

# Invariants

- Account data is not modified by export.

# Minimum Observability

- Export job record created.
- Notification event recorded.

# Notes for AI

- No additional assumptions are required.
