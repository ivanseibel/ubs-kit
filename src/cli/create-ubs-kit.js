#!/usr/bin/env node

const path = require("path");
const { parseArgs } = require("util");
const { findRepoRoot } = require("../lib/fs");
const { formatConflictReport, formatValidationReport, formatLegacyReport } = require("../lib/report");
const { scaffold } = require("../scaffold/scaffold");
const { validateUbs } = require("../validator/validate-ubs");

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] && !args[0].startsWith("-") ? args[0] : "scaffold";
  const parsedArgs = parseArgs({
    args: command === "scaffold" ? args : args.slice(1),
    options: {
      "dry-run": { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      "base-dir": { type: "string" },
      domains: { type: "string" }
    },
    strict: false
  });

  const baseDir = parsedArgs.values["base-dir"]
    ? path.resolve(parsedArgs.values["base-dir"])
    : await findRepoRoot(process.cwd());

  if (!baseDir) {
    console.error("Error: No repository root detected.");
    process.exit(1);
  }

  if (command === "validate") {
    const report = await validateUbs({ baseDir });
    if (!report.isValid) {
      console.error(formatValidationReport(report.issues));
      process.exit(1);
    }
    console.log(formatValidationReport(report.issues));
    return;
  }

  const result = await scaffold({
    baseDir,
    dryRun: parsedArgs.values["dry-run"],
    force: parsedArgs.values.force,
    domains: parsedArgs.values.domains
  });

  console.log("Scaffold targets: .github/agents and .github/skills");

  const legacyReport = formatLegacyReport(result.legacyUbsDetected);
  if (legacyReport) {
    console.warn(legacyReport);
  }

  if (result.conflicts && result.conflicts.length) {
    console.error(formatConflictReport(result.conflicts));
    process.exit(1);
  }

  if (parsedArgs.values["dry-run"]) {
    console.log("Dry run: no files written.");
  }
  if (result.writtenFiles.length) {
    console.log(`Written files (${result.writtenFiles.length}):`);
    console.log(result.writtenFiles.map((file) => `- ${file}`).join("\n"));
  }
  if (result.skippedFiles.length) {
    console.log(`Skipped files (${result.skippedFiles.length}):`);
    console.log(result.skippedFiles.map((file) => `- ${file}`).join("\n"));
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
