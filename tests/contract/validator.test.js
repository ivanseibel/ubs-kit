const assert = require("assert/strict");
const { test } = require("node:test");
const fs = require("fs/promises");
const path = require("path");
const { validateUbs } = require("../../src/validator/validate-ubs");

const VALID_UBS = `# Identity

- UBS ID: UBS-TEST-001
- Primary Behavior: Test behavior

# Business Context

Test context.

# Actors

- User

# Initial State (Given)

- User is authenticated.

# Triggering Event (When)

- User triggers behavior.

# Rules and Guards

- Rule one.

# Expected Outcome (Then)

- Outcome.

# Invalid States or Outcomes

- Invalid outcome.

# Invariants

- Invariant.

# Minimum Observability

- Log entry.

# Notes for AI

- No assumptions.
`;

const INVALID_UBS = `# Identity

- UBS ID: UBS-TEST-002
- Primary Behavior: Invalid behavior

# Business Context

Missing sections.
`;

async function writeFixture(baseDir, relativePath, content) {
  const fullPath = path.join(baseDir, relativePath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, content, "utf8");
}

async function createFixture({ templateContent, exampleContent }) {
  const baseDir = await fs.mkdtemp(path.join(process.cwd(), "tmp-ubs-kit-"));
  const skillHeader = "---\nname: test\ndescription: Test skill\n---\n";

  await writeFixture(baseDir, ".github/skills/template/SKILL.md", skillHeader);
  await writeFixture(baseDir, ".github/skills/template/ubs-template.md", templateContent);
  await writeFixture(baseDir, ".github/skills/guidelines/SKILL.md", skillHeader);
  await writeFixture(baseDir, ".github/skills/guidelines/ubs-guidelines.md", "Guidelines\n");
  await writeFixture(
    baseDir,
    ".github/skills/guidelines/ubs-quality-checklist.md",
    "Checklist\n"
  );
  await writeFixture(baseDir, ".github/skills/examples/SKILL.md", skillHeader);
  await writeFixture(baseDir, ".github/skills/examples/example-1.md", exampleContent);
  await writeFixture(baseDir, ".github/skills/examples/example-2.md", exampleContent);
  await writeFixture(baseDir, ".github/skills/examples/example-3.md", exampleContent);
  await writeFixture(baseDir, ".github/agents/ubs-governance.agent.md", "Agent\n");
  await writeFixture(baseDir, ".github/agents/ubs-review.agent.md", "Agent\n");

  return baseDir;
}

test("validator accepts valid UBS file", async () => {
  const baseDir = await createFixture({
    templateContent: VALID_UBS,
    exampleContent: VALID_UBS
  });
  const report = await validateUbs({ baseDir });
  assert.equal(report.isValid, true);
  assert.equal(report.issues.length, 0);
});

test("validator rejects invalid UBS file", async () => {
  const baseDir = await createFixture({
    templateContent: INVALID_UBS,
    exampleContent: VALID_UBS
  });
  const report = await validateUbs({ baseDir });
  assert.equal(report.isValid, false);
  assert.ok(report.issues.length > 0);
});
