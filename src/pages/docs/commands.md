---
layout: ../../layouts/Docs.astro
title: Command reference
description: A compact map of everyday WTC commands, with a clear boundary between local and OpenClaw workflows.
source: https://github.com/lcorneliussen/wtc-cli/blob/v0.1.51/docs/commands.md
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

## Advanced workflows

The handbook summarizes these surfaces rather than duplicating every flag. Use the pinned upstream reference and installed help for the complete contract.

| Command family | Where to go next |
| --- | --- |
| `wtc commands --json` | Machine-readable installed command surface |
| `wtc projects`, `wtc openclaw install` | [OpenClaw projects](../openclaw/) and [gateway upgrades](../upgrades/) |
| `wtc skills render`, `wtc skills diff`, `wtc eject` | [Configuration and overrides](../configuration/) |
| `wtc mcp render`, `wtc agent-env`, `wtc secrets link` | [Configuration and secrets](../configuration/) |
| `wtc pr path/list/enlist/unlist` | Collection-local PR tracking, not forge labels |
| `wtc registry refresh` | Regenerate the bare-owner map and report registry mismatches |
| `wtc open`, `wtc browse` | Optional herdr and Neovim interfaces; not required for collections |
| `wtc dev install/status/uninstall` | Upstream CLI contributor builds; not an end-user upgrade path |
| `wtc checkouts` | Structured checkout facts for the OpenClaw collection plugin |

### Review without publishing

`wtc review start <repo>#<n>` creates a local review-only collection for someone else's pull request. Pushes from that worktree are disabled; `review resolve` and `review ready` refuse there. A new `review bundle` refreshes the author's current head but stops rather than discard a local commit.

The review family also includes `activity`, `status`, `bundle`, `run`, `post`, `resolve`, and `ready`. Bundles are private by default and can include other repository snapshots. Inspect the exact content before giving it to an external reviewer; `--public` excludes local overlays and other repositories. Posting, resolving threads, or promoting a draft are separate, externally visible actions—not implied by running a review.

See the [complete upstream command reference](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.51/docs/commands.md) for these advanced workflows.
