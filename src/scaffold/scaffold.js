const path = require("path");
const { ensureDir, pathExists, writeText } = require("../lib/fs");
const { loadAssetManifest } = require("./asset-manifest");
const { diffAsset } = require("./diff");

const ALLOWED_ROOTS = [path.join(".github", "agents"), path.join(".github", "skills")];

function isWithinAllowedRoots(relativePath) {
  const normalized = path.normalize(relativePath);
  return ALLOWED_ROOTS.some((root) => {
    const rootPath = path.normalize(root);
    return normalized === rootPath || normalized.startsWith(`${rootPath}${path.sep}`);
  });
}

async function scaffold({ baseDir, dryRun, force }) {
  const manifest = loadAssetManifest();
  const writtenFiles = [];
  const skippedFiles = [];
  const conflicts = [];
  const legacyUbsDetected = await pathExists(path.join(baseDir, ".ubs"));

  for (const asset of manifest.assets) {
    if (!isWithinAllowedRoots(asset.relativePath)) {
      conflicts.push({
        relativePath: asset.relativePath,
        expectedChecksum: asset.checksum,
        actualChecksum: null,
        reason: "Asset path is outside allowed scaffold roots."
      });
      continue;
    }
    const targetPath = path.join(baseDir, asset.relativePath);
    if (await pathExists(targetPath)) {
      const conflict = await diffAsset(baseDir, asset);
      if (conflict) {
        conflicts.push(conflict);
      }
    }
  }

  if (conflicts.length && !force) {
    return { writtenFiles: [], skippedFiles: [], conflicts, legacyUbsDetected };
  }

  for (const asset of manifest.assets) {
    if (!isWithinAllowedRoots(asset.relativePath)) {
      skippedFiles.push(asset.relativePath);
      continue;
    }
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
    conflicts,
    legacyUbsDetected
  };
}

module.exports = {
  scaffold
};
