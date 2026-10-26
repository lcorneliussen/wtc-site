---
layout: ../../layouts/Docs.astro
title: Under OpenClaw
description: Work across repositories from one conversation, with worktrees and publishing managed by the gateway.
source: https://github.com/lcorneliussen/wtc-cli/blob/v0.1.51/internal/wtc/defaults/instructions/openclaw.md
---

> This guide describes the gateway-integrated WTC build. It is separate from the local-terminal quick start. Confirm the installed behavior with `wtc docs instructions/openclaw.md`.

## One conversation, many repositories

Ask your agent to add repositories to a named collection. Each repository gets a managed worktree on `openclaw/<name>`, held by a hidden owner session. The driving conversation works through the collection folder’s repository links.

You do not need a separate visible conversation for every repository.

## Add a repository

The agent starts with:

```sh
wtc add-repo your-org/api --worktree fix-login
```

WTC checks the request and prints a JSON **plan**. A tool intent must be carried out using its exact arguments and the named actor. Printing the plan alone does not create the worktree.

If the gateway has not cloned the repository, add it through **Add repository** in the Collection panel, then try again.

Never use `wtc init` or `wtc new` under OpenClaw. The gateway must own the worktrees it manages and publishes.

## Confirm the collection

```sh
wtc status fix-login
```

Status shows the collection folder, repositories, branches, pull requests, and services. Work from the repository links in that folder. A pull request in a different collection does not belong to the current collection just because the conversation previously worked there.

## Projects and parallel workers

A **wtc project** is a named set of repositories backed by a harness. Run `wtc projects` to match the task to a project before adding repositories. Names resolve through its registry; WTC adds the harness worktree too. Read its `AGENTS.md` before editing.

A conversation works in one project. Use `--project <name>` when asked to choose; `--project none` selects an ad-hoc collection. An unregistered repository requires a choice: add it ad hoc with `--ad-hoc`, register it first, or start another collection. If it belongs to another project, use a new conversation for that project unless explicitly adding it ad hoc.

The card may suggest a project before a collection exists. Unsent drafts are word-matched locally. Sent messages can use an optional decision model; with the configured OpenAI Decisions integration, the sent message goes to OpenAI. See the upstream gateway guide before enabling it.

Give parallel implementation tasks separate worker worktrees, not two agents writing in one checkout:

```sh
wtc add-repo api --worker paging --work "Add paging with tests."
```

The agent executes the returned tool intents. Workers build and commit in their own collection. Integrate completed work from the main task’s repository worktree:

```sh
wtc catch-up --from paging
```

This merges locally without fetching or pushing. Review and test the combined change. Worker branches are not published separately.

## Publish through the owner

The agent runs `wtc publish --title "..." --body-file pr-description.md` to check readiness and record the proposed PR title and description locally; it does not commit or push. You push with **↑** for the repository in the collection card, using your account after confirmation. Only when explicitly asked to publish does the agent have the repository’s owner session carry out the publication plan.

WTC checks for unmanaged worktrees, unfinished merges, rewritten published history, and pending credential-like files. Read the pending file list before publishing: the gateway publishes all pending work in that worktree.

For GitHub, the gateway commits pending changes, pushes, and opens or updates a draft pull request. People merge. Do not run `git push` yourself in a GitHub-managed worktree.

## Catch up without rewriting history

Run `wtc catch-up` from the repository’s worktree to merge its destination branch. It does not rebase or push. Review conflicts and resolve them before publishing again.

Do not rebase or amend commits that have already been published. Pull request news can wake the driving conversation on GitHub checks, reviews, conflicts, or merges. After a merge, catch up and verify the result; a status event alone is not proof of shipment.

In a sandbox, in-place catch-up requires the gateway’s read-only git service. With it, resolve a conflicted merge and run `wtc catch-up --continue`; without it, catch up from the repository owner outside the sandbox. Never put forge credentials into the sandbox.

## Keep a preview with the collection

From a repository in the collection, register its normal foreground development command:

```sh
wtc svc add web --port-env PORT -- npm run dev
wtc svc
```

The command must listen on the port supplied by `PORT`; wrap the existing launch command if it needs a CLI port flag. Service status appears with the collection. Tunnels are a separate opt-in action. See [Services and previews](../services/) for prerequisites, ports, and shutdown.
