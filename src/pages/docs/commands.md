---
layout: ../../layouts/Docs.astro
title: Command reference
description: A compact map of everyday WTC commands, with a clear boundary between local and OpenClaw workflows.
source: https://github.com/lcorneliussen/wtc-cli/blob/main/docs/commands.md
---

For complete options, use `wtc --help`, a command’s `--help`, or the upstream reference linked below. Available commands depend on the installed version.

## Local collections

| Command | Use it to |
| --- | --- |
| `wtc init` | Turn an empty folder into an ad-hoc collection |
| `wtc add-repo <repo>` | Add a URL, checkout, or registered repository |
| `wtc new <slug> [repo ...]` | Start a sibling task with fresh worktrees |
| `wtc status` | Inspect repositories, local changes, and PRs |
| `wtc status --json` | Read status in machine-readable form |
| `wtc retire .` | Check for local work, then remove the collection |

Worktrees start detached. Create a branch before committing.

## Team setup and guidance

| Command | Use it to |
| --- | --- |
| `wtc harness init <folder> --remote <url> --cli-version <version>` | Scaffold a small, project-owned harness |
| `wtc env setup` | Generate collection-local environment configuration |
| `wtc env list` | Browse environment names and source scopes |
| `wtc secrets list` | Inspect secret link states without revealing values |
| `wtc customize` | Read the installed customization guide |
| `wtc docs` | Explore embedded guidance |

## Services and diagnostics

| Command | Use it to |
| --- | --- |
| `wtc svc` | Inspect services, tunnels, and resources |
| `wtc svc add web --port-env PORT -- npm run dev` | Register and start an existing foreground command that consumes PORT |
| `wtc svc logs web` | Read logs, including after shutdown |
| `wtc svc down web` | Stop a service while retaining logs and data |
| `wtc doctor` | Check configuration and dependencies |
| `wtc release-notes --since <old-pin>` | Review changes before upgrading |

Read [Services and previews](../services/) for the opt-in runtime prerequisites and [Troubleshooting](../troubleshooting/) for common failures.

## OpenClaw-managed collections

These commands describe the gateway-integrated build. Use the [OpenClaw guide](../openclaw/) rather than local `init` or `new` instructions.

| Command | Use it to |
| --- | --- |
| `wtc host` | Confirm the host mode |
| `wtc add-repo <repo> --worktree <name>` | Generate a managed-worktree tool plan |
| `wtc status <name>` | Inspect a named collection |
| `wtc publish --title "..."` | Check publication and generate the owner’s plan |
| `wtc catch-up` | Merge the destination branch without pushing |
| `wtc svc` | Inspect the collection’s services |

Plans are not completed actions. The designated actor must execute the returned tool intents. For publication, use the repository’s owner session or the Collection panel.
