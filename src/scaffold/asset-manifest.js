const path = require("path");
const fs = require("fs");
const { sha256 } = require("../lib/fs");

const ASSET_BASE = path.join(__dirname, "..", "assets");

const ASSETS = [
  {
    id: "skill-template",
    kind: "skill",
    relativePath: path.join(".github", "skills", "template", "SKILL.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "template", "SKILL.md")
  },
  {
    id: "template",
    kind: "template",
    relativePath: path.join(".github", "skills", "template", "ubs-template.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "template", "ubs-template.md")
  },
  {
    id: "skill-guidelines",
    kind: "skill",
    relativePath: path.join(".github", "skills", "guidelines", "SKILL.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "guidelines", "SKILL.md")
  },
  {
    id: "guidelines",
    kind: "guideline",
    relativePath: path.join(".github", "skills", "guidelines", "ubs-guidelines.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "guidelines", "ubs-guidelines.md")
  },
  {
    id: "checklist",
    kind: "checklist",
    relativePath: path.join(
      ".github",
      "skills",
      "guidelines",
      "ubs-quality-checklist.md"
    ),
    sourcePath: path.join(
      ASSET_BASE,
      "skills",
      "guidelines",
      "ubs-quality-checklist.md"
    )
  },
  {
    id: "skill-examples",
    kind: "skill",
    relativePath: path.join(".github", "skills", "examples", "SKILL.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "examples", "SKILL.md")
  },
  {
    id: "example-1",
    kind: "example",
    relativePath: path.join(".github", "skills", "examples", "example-1.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "examples", "example-1.md")
  },
  {
    id: "example-2",
    kind: "example",
    relativePath: path.join(".github", "skills", "examples", "example-2.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "examples", "example-2.md")
  },
  {
    id: "example-3",
    kind: "example",
    relativePath: path.join(".github", "skills", "examples", "example-3.md"),
    sourcePath: path.join(ASSET_BASE, "skills", "examples", "example-3.md")
  },
  {
    id: "agent-ubs-governance",
    kind: "agent",
    relativePath: path.join(".github", "agents", "ubs-governance.agent.md"),
    sourcePath: path.join(ASSET_BASE, "agents", "ubs-governance.agent.md")
  },
  {
    id: "agent-ubs-review",
    kind: "agent",
    relativePath: path.join(".github", "agents", "ubs-review.agent.md"),
    sourcePath: path.join(ASSET_BASE, "agents", "ubs-review.agent.md")
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
