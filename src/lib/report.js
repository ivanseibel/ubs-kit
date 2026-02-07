function formatConflictReport(conflicts) {
  if (!conflicts.length) {
    return "No conflicts detected.";
  }
  const lines = [
    "Conflicts detected:",
    ...conflicts.map((conflict) => `- ${conflict.relativePath}: ${conflict.reason}`)
  ];
  return lines.join("\n");
}

function formatValidationReport(issues) {
  if (!issues.length) {
    return "No validation issues detected.";
  }
  const lines = [
    "Validation issues:",
    ...issues.map((issue) => `- ${issue.filePath} (${issue.ruleId}): ${issue.message}`)
  ];
  return lines.join("\n");
}

module.exports = {
  formatConflictReport,
  formatValidationReport
};
