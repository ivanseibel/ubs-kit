const path = require("path");
const fs = require("fs");
const { sha256 } = require("../lib/fs");

const ASSET_BASE = path.join(__dirname, "..", "assets");

const ASSETS = [
  {
    id: "template",
    kind: "template",
    relativePath: path.join(".ubs", "template", "ubs-template.md"),
    sourcePath: path.join(ASSET_BASE, "template", "ubs-template.md")
  },
  {
    id: "guidelines",
    kind: "guideline",
    relativePath: path.join(".ubs", "guidelines", "ubs-guidelines.md"),
    sourcePath: path.join(ASSET_BASE, "guidelines", "ubs-guidelines.md")
  },
  {
    id: "checklist",
    kind: "checklist",
    relativePath: path.join(".ubs", "checklist", "ubs-quality-checklist.md"),
    sourcePath: path.join(ASSET_BASE, "checklist", "ubs-quality-checklist.md")
  },
  {
    id: "agents",
    kind: "agent",
    relativePath: path.join(".ubs", "agents", "ubs-agent.md"),
    sourcePath: path.join(ASSET_BASE, "agents", "ubs-agent.md")
  },
  {
    id: "example-1",
    kind: "example",
    relativePath: path.join(".ubs", "examples", "example-1.md"),
    sourcePath: path.join(ASSET_BASE, "examples", "example-1.md")
  },
  {
    id: "example-2",
    kind: "example",
    relativePath: path.join(".ubs", "examples", "example-2.md"),
    sourcePath: path.join(ASSET_BASE, "examples", "example-2.md")
  },
  {
    id: "example-3",
    kind: "example",
    relativePath: path.join(".ubs", "examples", "example-3.md"),
    sourcePath: path.join(ASSET_BASE, "examples", "example-3.md")
  }
];

function loadAssetManifest() {
  const assets = ASSETS.map((asset) => {
    const content = fs.readFileSync(asset.sourcePath, "utf8");
    return {
      id: asset.id,
      kind: asset.kind,
      relativePath: asset.relativePath,
      content,
      checksum: sha256(content),
      isRequired: true
    };
  });

  return {
    assets,
    generatedAt: new Date().toISOString(),
    version: "0.1.0"
  };
}

module.exports = {
  loadAssetManifest
};
