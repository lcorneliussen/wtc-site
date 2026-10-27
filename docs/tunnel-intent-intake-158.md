# Tunnel intent topic intake

Reviewed against [published v0.1.61](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.61),
whose annotated tag resolves to `f151feab909d8fbbc20be021fe0df171fdb45a38`.
Publication verified on 2026-10-27 using the official latest-release API and
[successful release workflow](https://github.com/lcorneliussen/wtc-cli/actions/runs/40541931022).
The release includes [CLI #236](https://github.com/lcorneliussen/wtc-cli/pull/236),
its runtime instructions and the numbered Services notes. The services handbook
now labels the behavior released in v0.1.61 and links its tag-pinned runtime
contract. Existing v0.1.51 examples and the broad coverage inventory retain
their reviewed baseline. Fingerprints below identify v0.1.61.

| Source | Coverage decision |
| --- | --- |
| Embedded runtime instructions | The services page explains collection-local on/off intent, temporary down versus explicit tunnel stop, targeted/untargeted restore rules, definition changes, and separate lifecycle/provider observations. Detailed setup, task-file and resource contracts stay in the pinned upstream reference. |
| `internal/wtc/release-notes/0.1.61.md`: Services | Remembered tunnel choices are included in the published numbered release and labeled available from v0.1.61. |
| Runtime implementation and regression tests | Reviewed to confirm fail-fast startup and persistent off on stop failure. The page explains recovery; internal manifest hashing and runner command details stay upstream. |

This topic covers the services page and this intake. The companion review-pane
publication refresh is recorded in [the focused release intake](release-intake-0.1.61.md).
Validation covers Astro
checks/build, generated internal links/assets, coverage tool tests and structural
coverage validation; the source inventory check uses its exact baseline revision.
No merge or manual deployment is performed by this documentation change.

## Source fingerprints

| Source at v0.1.61 | SHA-256 |
| --- | --- |
| `internal/wtc/defaults/instructions/runtime.md` | `c1bab7ac27738120292d133588fbe1f8bfd128f298b2e812038ae9380e477631` |
| `internal/wtc/release-notes/0.1.61.md` | `f7537d4fb4d9894de0820f429bbfe7095ce52998fc5ddac2117478df22538882` |
