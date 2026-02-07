const assert = require("assert/strict");
const { test } = require("node:test");
const fs = require("fs/promises");
const path = require("path");
const { scaffold } = require("../../src/scaffold/scaffold");

async function createTempDir() {
  const dir = await fs.mkdtemp(path.join(process.cwd(), "tmp-ubs-kit-"));
  return dir;
}

test("scaffold detects conflicts and does not write", async () => {
  const tempDir = await createTempDir();
  const conflictPath = path.join(tempDir, ".ubs", "template", "ubs-template.md");
  await fs.mkdir(path.dirname(conflictPath), { recursive: true });
  await fs.writeFile(conflictPath, "custom", "utf8");

  const result = await scaffold({ baseDir: tempDir, dryRun: false, force: false });
  assert.ok(result.conflicts.length > 0);
  assert.equal(result.writtenFiles.length, 0);
});
