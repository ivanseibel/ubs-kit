const assert = require("assert/strict");
const { test } = require("node:test");
const path = require("path");
const { loadAssetManifest } = require("../../src/scaffold/asset-manifest");

const ALLOWED_ROOTS = [
  path.join(".github", "agents"),
  path.join(".github", "skills")
];

function isWithinAllowedRoots(relativePath) {
  const normalized = path.normalize(relativePath);
  return ALLOWED_ROOTS.some((root) => {
    const rootPath = path.normalize(root);
    return normalized === rootPath || normalized.startsWith(`${rootPath}${path.sep}`);
  });
}

test("asset manifest targets only native roots", () => {
  const manifest = loadAssetManifest();
  const invalidAssets = manifest.assets.filter(
    (asset) => !isWithinAllowedRoots(asset.relativePath)
  );

  assert.equal(invalidAssets.length, 0);
});
