# UBS Kit

UBS Kit is a Node.js CLI that scaffolds and validates a UBS governance layer in
an existing repository. It creates a canonical .ubs/ directory, enforces UBS
structure, and prevents destructive changes by default.

## Requirements

- Node.js 20+
- An existing repository with write access

## Install

```bash
npm install
```

## Scaffold .ubs/

```bash
node src/cli/create-ubs-kit.js --dry-run
node src/cli/create-ubs-kit.js
```

## Validate UBS files

```bash
node src/cli/create-ubs-kit.js validate
```

## Options

- `--dry-run`: Preview without writing files
- `--force`: Overwrite conflicts explicitly
- `--base-dir <path>`: Override repository root
- `--domains <list>`: Limit scaffolding to specific domains

## Behavior

- If any conflict is detected and `--force` is not supplied, the command exits
  non-zero and writes no files.
- Validation reports all detected violations and exits non-zero if any exist.
