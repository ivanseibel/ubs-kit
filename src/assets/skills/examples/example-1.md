# Identity

- UBS ID: UBS-EX-001
- Primary Behavior: Request password reset email

# Business Context

Users must be able to request a password reset email to regain account access.

# Actors

- User
- System

# Initial State (Given)

- User has an account with a registered email address.

# Triggering Event (When)

- User submits a password reset request.

# Rules and Guards

- The system sends a reset email to the registered address.
- The system does not reveal whether the account exists.

# Expected Outcome (Then)

- A reset email is queued for delivery.

# Invalid States or Outcomes

- Reset email is sent to an unregistered address.

# Invariants

- Account authentication remains required for login.

# Minimum Observability

- Audit log entry for reset request.
- Email queue entry with reset token.

# Notes for AI

- No additional assumptions are required.
