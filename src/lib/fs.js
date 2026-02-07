const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function findRepoRoot(startDir) {
  let current = path.resolve(startDir);
  while (true) {
    const gitDir = path.join(current, ".git");
    const specifyDir = path.join(current, ".specify");
    if (await pathExists(gitDir) || await pathExists(specifyDir)) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readText(filePath) {
  return fs.readFile(filePath, "utf8");
}

async function writeText(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, "utf8");
}

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

async function sha256File(filePath) {
  const content = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

module.exports = {
  ensureDir,
  findRepoRoot,
  pathExists,
  readText,
  sha256,
  sha256File,
  writeText
};
