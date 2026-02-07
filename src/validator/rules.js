const CANONICAL_SECTIONS = [
  "Identity",
  "Business Context",
  "Actors",
  "Initial State (Given)",
  "Triggering Event (When)",
  "Rules and Guards",
  "Expected Outcome (Then)",
  "Invalid States or Outcomes",
  "Invariants",
  "Minimum Observability",
  "Notes for AI"
];

const RULES = {
  SECTION_ORDER: "SECTION_ORDER",
  SECTION_MISSING: "SECTION_MISSING",
  SECTION_UNKNOWN: "SECTION_UNKNOWN",
  IDENTITY_PRIMARY_BEHAVIOR: "IDENTITY_PRIMARY_BEHAVIOR",
  ASSUMPTION_FORMAT: "ASSUMPTION_FORMAT"
};

module.exports = {
  CANONICAL_SECTIONS,
  RULES
};
