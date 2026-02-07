# Quickstart: UBS Kit Governance Layer

## Prerequisites

- Node.js 20+
- An existing repository with write access

## Install

```bash
npm install
```

## Scaffold agents and skills

```bash
node src/cli/create-ubs-kit.js --dry-run
node src/cli/create-ubs-kit.js
```

## Validate UBS files

```bash
node src/cli/create-ubs-kit.js validate
```

## Common options

- `--dry-run`: Preview without writing files
- `--force`: Overwrite conflicts explicitly
- `--base-dir <path>`: Override repository root
- `--domains <list>`: Limit scaffolding to specific domains

## Expected behavior

- If any conflict is detected and `--force` is not supplied, the command exits
  non-zero and writes no files.
- Validation reports all detected violations and exits non-zero if any exist.
