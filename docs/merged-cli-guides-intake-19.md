# Merged CLI guidance intake — issue 19

Initially reviewed on 2026-10-28 against immutable CLI source
[`41d5ed32237f9e6e78cf9913ef6e2ac2165f88dc`](https://github.com/lcorneliussen/wtc-cli/commit/41d5ed32237f9e6e78cf9913ef6e2ac2165f88dc).
A fresh fetch identified main as
`32a3951709e685b57f27f23a8efd60be70ba5ea4`.
Git ancestry verification confirms the pinned source is an ancestor of that main;
a comparison of the three contract paths below is empty. The original immutable
links therefore remain accurate after main advanced.

At that initial review, the latest published release was v0.1.61 and these
features were merged/unreleased. Publication was reverified on 2026-10-28:
[published v0.1.62](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.62)
now contains all three features. The pages label them available from v0.1.62
and use tag-pinned contracts. The three source fingerprints below are unchanged
between the original pin and the released tag. See the
[v0.1.62 publication intake](release-intake-0.1.62.md) for release/tag inclusion
and the companion status-version and diagnostic guidance. Existing install
examples and broad coverage inventory retain their labeled baseline.

Requirements were reconciled against the three source contracts, with synthetic
examples and no consumer-specific evidence.

| Source contract | Site coverage and deliberate limit |
| --- | --- |
| [Retirement](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/retirement.md) | Commands explains observed blockers versus unknown archive/forge/resource coverage, fresh read-only dry-run, cached-ref limits, bounded explicit transcript hints and unchanged execution preflight. No ready verdict or automatic cleanup policy is implied. Detailed transcript limits and adapter semantics remain upstream. |
| [Service discovery](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/service-discovery.md) | Services explains declarations before first start, local/workspace inventory, unconfigured tasks, observed-state precedence, per-repository unknown diagnostics and no discovery execution/planning/environment side effects. Runnable configuration still needs explicit render/start. |
| [Enlisted identity](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/enlisted-repository-identity.md) | Commands explains forge-verified registered/unmanaged aliases, ambiguity, exact-name fallback and legacy rows. No arbitrary prefix stripping, selector change or altered landing policy. Full cache and next-action details stay upstream. |

The only page reservations are `src/pages/docs/commands.md` and
`src/pages/docs/services.md`, plus this focused intake. No new page, navigation,
narrative, broad baseline refresh or unmerged feature claims are included.
No merge or deployment is performed by this change.

Validation uses the site's Astro diagnostics/build, generated internal
links/assets, coverage-tool tests and structural coverage check. The complete
source inventory is checked separately against its own exact baseline rather
than relabeled as reconciled to current main. These fingerprints verify source
identity; semantic review remains necessary.

## Source fingerprints

| Source at the original pin and v0.1.62 | SHA-256 |
| --- | --- |
| `docs/retirement.md` | `920cfc6909c02d1b8814de35392e7d507f10540996a253ab0d010130ca606e32` |
| `docs/service-discovery.md` | `7c3e3b8168a915b460ffff6b4fbd53c9e978e08656083c4621696e4e885c5e86` |
| `docs/enlisted-repository-identity.md` | `9e022443b50d51c581fed41b6e62374b496b52f5fae161b041282c86863fe3ec` |
