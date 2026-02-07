const { sha256File, sha256 } = require("../lib/fs");
const path = require("path");

async function diffAsset(baseDir, asset) {
  const targetPath = path.join(baseDir, asset.relativePath);
  const expectedChecksum = sha256(asset.content);
  const actualChecksum = await sha256File(targetPath);

  if (expectedChecksum === actualChecksum) {
    return null;
  }

  return {
    relativePath: asset.relativePath,
    expectedChecksum,
    actualChecksum,
    reason: "Existing file content differs from canonical asset."
  };
}

module.exports = {
  diffAsset
};
