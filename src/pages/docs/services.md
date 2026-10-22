---
layout: ../../layouts/Docs.astro
title: Services and previews
description: Run existing development commands with collection-local ports, logs, and optional tunnels.
source: https://github.com/lcorneliussen/wtc-cli/blob/main/internal/wtc/defaults/instructions/runtime.md
---

## Optional, not a new build system

The experimental runtime uses **dekit 0.10.x** to supervise ordinary foreground commands. Available from v0.1.40, it leaves your standalone development workflow intact. These examples target v0.1.48.

For a local harness, merge into its `wtc.toml` without duplicating existing tables:

```toml
[runtime]
backend = "dekit"

[mise.tools]
"github:pvolok/dekit" = "0.10.0"
```

Run `wtc env setup` and install the pinned tools with mise. Ad-hoc collections use `.wtc/config/wtc.toml`. Under OpenClaw, follow the gateway runtime setup instead of creating a local collection. Test in a disposable collection before adopting the runtime.

## Register a preview

From the application worktree, if its command already consumes `PORT`:

```sh
wtc svc add web --port-env PORT -- npm run dev
wtc svc
wtc svc logs web --tail 100
```

`add` registers **and starts** the service; `--no-start` registers only. The app must listen on the supplied port. If it requires a CLI flag, expand the variable in an explicit shell:

```sh
wtc svc add web --port-env PORT -- sh -c 'exec npm run dev -- --port "$PORT"'
```

Disable self-daemonization: the command must stay in the foreground. Local definitions live in `.wtc/svc/<repo>.yaml` and are not committed. Use `--shared` only to deliberately write the repository’s `.harness/dekit.tasks.yaml`.

## Inspect, restart, stop

```sh
wtc svc restart web
wtc svc down web
wtc svc logs web
wtc svc up web
```

Closing the terminal or agent does **not** stop services. Logs remain available after shutdown. Readiness is a startup probe, not continuous health monitoring. Use repository-qualified names such as `api/web` when names are ambiguous.

Port isolation is not data isolation. Databases and Docker Compose projects need collection-specific identities too. `down` keeps data; teardown and retirement can remove collection-owned resources. Export valuable data and follow the upstream resource ownership contract before using cleanup hooks.

## Share deliberately

A local preview needs no tunnel. With Tailscale installed and authenticated, a private preview can use:

```sh
wtc svc tunnel web tailscale
wtc svc tunnel web --stop
```

Public exposure (`--public`) is a separate choice. Check authentication and exposed application data before sharing. Never put credentials in endpoint URLs or committed task files.
