---
sidebar_position: 11
title: Update Command
description: Update your project's ElizaOS dependencies and CLI to the latest published versions
keywords: [CLI, update, dependencies, versions, packages, maintenance]
image: /img/cli.jpg
---

# Update Command

The `update` command updates all ElizaOS dependencies (`@elizaos/*`) in your project or plugin to the latest published versions available on npm. It can also update your globally installed ElizaOS CLI. This helps you keep your ElizaOS installation current with the latest features, improvements, and bug fixes.

## Usage

```console
# Update both CLI and project packages (default)
elizaos update

# Update only global CLI installation
elizaos update --cli

# Update only project packages
elizaos update --packages

# Check for available updates without applying them
elizaos update --check   # dry-run

# Update packages but skip building the project afterward
elizaos update --skip-build   # skip rebuild step
```

## Options

- `-c`, `--check`: Check for available updates without applying them. The command will scan all packages, identify which ones need updating, show the current version and the latest available version for each package, but won't actually modify anything.
- `-sb`, `--skip-build`: Skip building the project after updating packages. This is useful for large projects where you want to update dependencies but handle the build process manually or as a separate step.
- `--cli`: Update only the globally installed ElizaOS CLI (without updating packages).
- `--packages`: Update only project packages (without updating the CLI).

## Update Process

When updating project packages, ElizaOS will:

1. Detect whether you're in a project or plugin directory.
2. Find the latest published version of `@elizaos/cli` on npm.
3. Identify all `@elizaos/*` packages in your `package.json` (dependencies and devDependencies), excluding workspace references.
4. Compare current package versions with the latest available version and list packages that need updates.

If not using `--check` mode: 5. Prompt for confirmation before proceeding if major updates are detected. 6. Update all identified outdated ElizaOS packages to the determined latest version. 7. Automatically rebuild the project or plugin after updating dependencies (unless `--skip-build` is specified).

When updating the CLI, ElizaOS will:

1. Check if the CLI is installed globally. If not, it shows an error message and exits.
2. Determine the currently installed CLI version.
3. Query npm to find the latest published version of `@elizaos/cli`.
4. If the installed version is already the latest, it informs you and exits.
5. If an update is available, it installs the specific latest version globally.
6. Confirm the update status.

## Project Type Detection

The update command automatically detects whether you're working with:

1. **Project**: A complete ElizaOS project with agents
2. **Plugin**: An ElizaOS plugin that provides extensions

It determines this by checking the package.json metadata, particularly:

- If the package name starts with `@elizaos/plugin-`
- If keywords include `elizaos-plugin`

## Workspace References

The command properly handles workspace references in monorepo setups:

- Packages with versions like `workspace:*` are identified as workspace references
- These are skipped during the update process as they're meant to be managed by the monorepo

## Examples

### Update Everything (CLI and Dependencies)

Update both the CLI and all ElizaOS dependencies in the current directory to the latest published version (default behavior):

```console
elizaos update
```

### Update Only the CLI

Update only the globally installed ElizaOS CLI:

```console
elizaos update --cli
```

Example CLI update output (versions may vary):

```console
Checking for ElizaOS CLI updates...
Updating ElizaOS CLI from 1.3.5 to 1.4.0...
Updating Eliza CLI to version: 1.4.0
Successfully updated Eliza CLI to 1.4.0
Please restart your terminal for the changes to take effect.
ElizaOS CLI has been successfully updated!
```

If you don't have the CLI installed globally, you'll see instructions to install it:

```console
The CLI update is only available for globally installed CLI.
To update a local installation, use your package manager manually.
For global installation, run: npm install -g @elizaos/cli@beta
```

### Update Only Project Dependencies

Update only the ElizaOS dependencies in the current directory:

```console
elizaos update --packages
```

Example project update output (versions may vary):

```console
Updating project dependencies...
Current CLI version: 1.3.5
Latest available CLI version: 1.4.0
The following ElizaOS packages will be updated to version 1.4.0:
  - @elizaos/core (^1.3.0)
  - @elizaos/runtime (^1.3.2)
  - @elizaos/knowledge (workspace:*) -> Skipped (workspace reference)
  - @elizaos/models (^1.2.0)
  - @elizaos/plugin-discord (^1.1.0)
Proceed with update? (Y/n) › Y
Updating @elizaos/core@1.4.0...
Updating @elizaos/runtime@1.4.0...
Updating @elizaos/models@1.4.0...
Updating @elizaos/plugin-discord@1.4.0...
Dependencies updated successfully.
Installing updated dependencies...
# Package installation details omitted for brevity
Building project...
Build completed successfully
Project successfully updated to the latest ElizaOS packages (1.4.0)
```

### Check for Updates

Check for available updates without applying them:

```console
elizaos update --check   # dry-run
```

Example output:

```console
Checking project dependencies...
Current CLI version: 1.3.5
Latest available CLI version: 1.4.0

ElizaOS packages that can be updated to version 1.4.0:
  - @elizaos/core (1.3.0) → 1.4.0
  - @elizaos/runtime (1.3.2) → 1.4.0
  - @elizaos/models (1.2.0) → 1.4.0

To update these packages, run the command without the --check flag
```

### Skip Building

Update dependencies without rebuilding the project:

```console
elizaos update --skip-build   # skip rebuild step
```

Example output with --skip-build:

```console
Updating project dependencies...
Current CLI version: 1.3.5
Latest available CLI version: 1.4.0
# Package update information displayed here
Dependencies updated successfully.
Installing updated dependencies...
# Installation process output
Skipping build phase as requested with --skip-build flag
Project successfully updated to the latest ElizaOS packages (1.4.0)
```

## Version Management

The update command currently updates all `@elizaos/*` packages (excluding workspace references) to the single latest published version found for `@elizaos/cli`. It will prompt for confirmation before proceeding with major updates.

## Best Practices

Here are some recommended practices when updating ElizaOS dependencies:

1. **Back Up Your Project**: Always back up your project before updating.
2. **Check First**: Use the `--check` flag to see what will be updated before making changes.
3. **Review Changelogs**: Check the ElizaOS changelog for any breaking changes between your current version and the latest version.
4. **Test After Updating**: Make sure your project works correctly after updating.
5. **Consider Staged Updates**: If upgrading across multiple major versions, consider updating one major version at a time.

## Troubleshooting

### CLI Update Issues

- **Not Globally Installed:** If you see a message like "The CLI update is only available for globally installed CLI," you need to install the CLI globally first (`npm install -g @elizaos/cli`) or update your local version manually.
- **Permissions Issues:** Global installations might require administrator privileges (e.g., using `sudo` on Linux/macOS).

### Package Update Issues

#### Dependency Resolution Problems

If you encounter issues with dependency resolution:

```console
# Run the command with full Node.js error stack traces
NODE_OPTIONS=--stack-trace-limit=100 elizaos update
```

#### Build Failures

If the build fails after updating:

```console
# Check the build output for errors
# Manually attempt to rebuild with verbose logging
elizaos dev --build --verbose
# or
elizaos start --build --verbose
```

#### Version Mismatches

If you need a specific version rather than the latest published version:

```console
# Manually install the specific version needed
bun install @elizaos/core@1.3.5
```

## Related Commands

- To build your project, use the `--build` flag with the `elizaos dev` or `elizaos start` commands.
- [`start`](./start.md): Start your project with updated dependencies.
- [`dev`](./dev.md): Run your project in development mode.
