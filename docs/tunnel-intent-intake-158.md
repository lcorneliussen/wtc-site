# Tunnel intent topic intake

Reviewed against [merged CLI #236](https://github.com/lcorneliussen/wtc-cli/pull/236)
at source revision `aea3e65e38a284e2de72fecdce671dd963691eb1`. Its exact
[main CI run](https://github.com/lcorneliussen/wtc-cli/actions/runs/40534625977)
passed on Linux and macOS. Fingerprints below come from that merge commit.

Release status checked on 2026-10-27: the latest published stable release is
v0.1.60, which does not contain this merge. The services handbook labels the
new behavior merged and unreleased. Existing v0.1.51 examples and the broad
coverage inventory retain their reviewed baseline. On publication, reconcile
this section to the numbered release and its pinned runtime reference.

| Source | Coverage decision |
| --- | --- |
| Embedded runtime instructions | The services page explains collection-local on/off intent, temporary down versus explicit tunnel stop, targeted/untargeted restore rules, definition changes, and separate lifecycle/provider observations. Detailed setup, task-file and resource contracts stay in the pinned upstream reference. |
| Unreleased #158 note | Covered as merged, unreleased behavior rather than implying availability in an installed release. |
| Runtime implementation and regression tests | Reviewed to confirm fail-fast startup and persistent off on stop failure. The page explains recovery; internal manifest hashing and runner command details stay upstream. |

This topic changes only the services page and this intake. The command handbook
and its separate review-pane topic are unaffected. Validation covers Astro
checks/build, generated internal links/assets, coverage tool tests and structural
coverage validation; the source inventory check uses its exact baseline revision.
No merge or manual deployment is performed by this documentation change.

## Source fingerprints

| Source at the merge revision | SHA-256 |
| --- | --- |
| `internal/wtc/defaults/instructions/runtime.md` | `c1bab7ac27738120292d133588fbe1f8bfd128f298b2e812038ae9380e477631` |
| `internal/wtc/release-notes/unreleased/158-tunnel-intent.md` | `fc6d09aea690b1b8661a66a12e716c0e6c2a63ff7d90960f1686dc4268bd68ad` |
