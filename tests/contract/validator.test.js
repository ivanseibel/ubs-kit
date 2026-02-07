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

async function createFixture(content) {
  const baseDir = await fs.mkdtemp(path.join(process.cwd(), "tmp-ubs-kit-"));
  const ubsDir = path.join(baseDir, ".ubs");
  await fs.mkdir(ubsDir, { recursive: true });
  const filePath = path.join(ubsDir, "test.md");
  await fs.writeFile(filePath, content, "utf8");
  return baseDir;
}

test("validator accepts valid UBS file", async () => {
  const baseDir = await createFixture(VALID_UBS);
  const report = await validateUbs({ baseDir });
  assert.equal(report.isValid, true);
  assert.equal(report.issues.length, 0);
});

test("validator rejects invalid UBS file", async () => {
  const baseDir = await createFixture(INVALID_UBS);
  const report = await validateUbs({ baseDir });
  assert.equal(report.isValid, false);
  assert.ok(report.issues.length > 0);
});
