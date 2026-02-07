const assert = require("assert/strict");
const { test } = require("node:test");
const fs = require("fs/promises");
const path = require("path");
const { scaffold } = require("../../src/scaffold/scaffold");
const { loadAssetManifest } = require("../../src/scaffold/asset-manifest");

async function createTempDir() {
  const dir = await fs.mkdtemp(path.join(process.cwd(), "tmp-ubs-kit-"));
  return dir;
}

async function listFiles(baseDir) {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await listFiles(fullPath);
      files.push(...nested);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

test("scaffold writes canonical assets to .ubs", async () => {
  const tempDir = await createTempDir();
  const result = await scaffold({ baseDir: tempDir, dryRun: false });
  const manifest = loadAssetManifest();

  assert.equal(result.conflicts.length, 0);
  assert.equal(result.writtenFiles.length, manifest.assets.length);

  const createdFiles = await listFiles(path.join(tempDir, ".ubs"));
  assert.equal(createdFiles.length, manifest.assets.length);
});

