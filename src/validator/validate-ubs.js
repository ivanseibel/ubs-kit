const fs = require("fs/promises");
const path = require("path");
const { readText } = require("../lib/fs");
const { CANONICAL_SECTIONS, RULES } = require("./rules");

async function listUbsFiles(rootDir) {
  const files = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  if (await exists(rootDir)) {
    await walk(rootDir);
  }
  return files;
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function parseSections(content) {
  const lines = content.split(/\r?\n/);
  const headings = [];
  const sections = new Map();

  let currentHeading = null;
  for (const line of lines) {
    if (line.startsWith("# ")) {
      const title = line.slice(2).trim();
      headings.push(title);
      currentHeading = title;
      if (!sections.has(title)) {
        sections.set(title, []);
      }
    } else if (currentHeading) {
      sections.get(currentHeading).push(line);
    }
  }

  return { headings, sections };
}

function validateHeadings(headings, filePath, issues) {
  const missing = CANONICAL_SECTIONS.filter((section) => !headings.includes(section));
  const unknown = headings.filter((heading) => !CANONICAL_SECTIONS.includes(heading));
  const orderMatches = headings.length === CANONICAL_SECTIONS.length && headings.every((heading, index) => heading === CANONICAL_SECTIONS[index]);

  if (!orderMatches) {
    issues.push({
      filePath,
      ruleId: RULES.SECTION_ORDER,
      message: "Section headings must match the canonical list and order."
    });
  }

  for (const section of missing) {
    issues.push({
      filePath,
      ruleId: RULES.SECTION_MISSING,
      message: `Missing required section: ${section}.`
    });
  }

  for (const heading of unknown) {
    issues.push({
      filePath,
      ruleId: RULES.SECTION_UNKNOWN,
      message: `Unknown section heading: ${heading}.`
    });
  }
}

function validateIdentity(sections, filePath, issues) {
  const identityLines = sections.get("Identity") || [];
  const matches = identityLines.filter((line) => /Primary Behavior\s*:/.test(line));
  if (matches.length !== 1) {
    issues.push({
      filePath,
      ruleId: RULES.IDENTITY_PRIMARY_BEHAVIOR,
      message: "Identity must name exactly one primary behavior."
    });
  }
}

function validateAssumptions(sections, filePath, issues) {
  const notesLines = sections.get("Notes for AI") || [];
  for (const line of notesLines) {
    if (/^\s*[-*]?\s*Assumption\b/.test(line)) {
      const hasId = /Assumption ID:/.test(line);
      const hasTodo = /TODO:/.test(line);
      if (!hasId || !hasTodo) {
        issues.push({
          filePath,
          ruleId: RULES.ASSUMPTION_FORMAT,
          message: "Assumption entries must include a unique Assumption ID and a TODO question."
        });
      }
    }
  }
}

async function validateFile(filePath) {
  const content = await readText(filePath);
  const { headings, sections } = parseSections(content);
  const issues = [];

  validateHeadings(headings, filePath, issues);
  validateIdentity(sections, filePath, issues);
  validateAssumptions(sections, filePath, issues);

  return issues;
}

async function validateUbs({ baseDir }) {
  const ubsDir = path.join(baseDir, ".ubs");
  const files = await listUbsFiles(ubsDir);
  const issues = [];

  for (const filePath of files) {
    const fileIssues = await validateFile(filePath);
    issues.push(...fileIssues);
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

module.exports = {
  validateUbs
};
