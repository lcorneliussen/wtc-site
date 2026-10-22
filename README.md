# wtc-site

The Astro website and getting-started handbook for [Worktree Collections](https://github.com/lcorneliussen/wtc-cli).

## Develop

Node.js 22.12+ is required; CI uses Node 24. Install development dependencies even if your environment sets `NODE_ENV=production`:

```sh
npm ci --include=dev
npm run dev
```

Open `http://localhost:4321/`. Astro 7 can auto-background the dev server in agent environments. For a foreground process supervisor, use:

```sh
npm run dev -- --ignore-lock --port 4321
```

Choose a free, collection-specific port when running multiple workspaces. In a WTC-managed collection, use `wtc svc` from the collection root to supervise the service, with `wtc-site/web` as the service name. Pass the collection’s allocated port to Astro’s `--port` option rather than reusing another collection’s port.

## Verify

```sh
npm run check
npm run build
npm run test:links
npm run preview
```

The link check validates every generated HTML page’s internal links, fragments, assets, and GitHub Pages base path. It does not check external website availability. The interactive homepage also needs browser checks for collection switching, quick-start selection, clipboard behavior, and narrow viewports.

## Content and layout

- `src/pages/index.astro`: homepage and interactive collection example.
- `src/pages/docs/*.md`: handbook pages, with title, description, and upstream source in frontmatter.
- `src/layouts/Docs.astro` and `src/components/DocsNav.astro`: documentation shell and navigation.
- `src/styles/global.css`: shared responsive design and reduced-motion support.
- `src/scripts/home.js`: collection example and quick-start controls.

Local-terminal examples follow the upstream CLI getting-started guide and explicitly pin v0.1.48. OpenClaw guidance is separately labeled for the gateway-integrated build; it must not suggest `wtc init` or `wtc new` on a gateway. Reconcile both with their upstream instructions when updating commands.

## GitHub Pages

Production target: **https://wtc.sh/**. Astro uses that canonical origin and `/` base. Shared links use `import.meta.env.BASE_URL`.

PRs check and build without deploying. Pushes to `main` and manual runs on `main` deploy the static artifact. Enable Pages with **GitHub Actions** as its source first.

See [the launch checklist](docs/launch.md) for domain verification, DNS, HTTPS, smoke tests, and rollback. An Actions deployment ignores CNAME files: configure the domain in repository Settings → Pages. Local checks do not configure GitHub or DNS.
