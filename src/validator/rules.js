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
  ASSUMPTION_FORMAT: "ASSUMPTION_FORMAT",
  REQUIRED_PATH_MISSING: "REQUIRED_PATH_MISSING"
};

const REQUIRED_PATHS = [
  ".github/skills/template/SKILL.md",
  ".github/skills/template/ubs-template.md",
  ".github/skills/guidelines/SKILL.md",
  ".github/skills/guidelines/ubs-guidelines.md",
  ".github/skills/guidelines/ubs-quality-checklist.md",
  ".github/skills/examples/SKILL.md",
  ".github/skills/examples/example-1.md",
  ".github/skills/examples/example-2.md",
  ".github/skills/examples/example-3.md",
  ".github/agents/ubs-governance.agent.md",
  ".github/agents/ubs-review.agent.md"
];

const UBS_FILE_PATHS = [
  ".github/skills/template/ubs-template.md",
  ".github/skills/examples/example-1.md",
  ".github/skills/examples/example-2.md",
  ".github/skills/examples/example-3.md"
];

module.exports = {
  CANONICAL_SECTIONS,
  RULES,
  REQUIRED_PATHS,
  UBS_FILE_PATHS
};
