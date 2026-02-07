const path = require("path");
const { ensureDir, pathExists, writeText } = require("../lib/fs");
const { loadAssetManifest } = require("./asset-manifest");
const { diffAsset } = require("./diff");

async function scaffold({ baseDir, dryRun, force }) {
  const manifest = loadAssetManifest();
  const writtenFiles = [];
  const skippedFiles = [];
  const conflicts = [];

  for (const asset of manifest.assets) {
    const targetPath = path.join(baseDir, asset.relativePath);
    if (await pathExists(targetPath)) {
      const conflict = await diffAsset(baseDir, asset);
      if (conflict) {
        conflicts.push(conflict);
      }
    }
  }

  if (conflicts.length && !force) {
    return { writtenFiles: [], skippedFiles: [], conflicts };
  }

  for (const asset of manifest.assets) {
    const targetPath = path.join(baseDir, asset.relativePath);
    if (await pathExists(targetPath)) {
      const conflict = await diffAsset(baseDir, asset);
      if (conflict && !force) {
        skippedFiles.push(asset.relativePath);
        continue;
      }
      if (!conflict) {
        skippedFiles.push(asset.relativePath);
        continue;
      }
    }

    if (!dryRun) {
      await ensureDir(path.dirname(targetPath));
      await writeText(targetPath, asset.content);
    }

    writtenFiles.push(asset.relativePath);
  }

  return {
    writtenFiles,
    skippedFiles,
    conflicts
  };
}

module.exports = {
  scaffold
};
