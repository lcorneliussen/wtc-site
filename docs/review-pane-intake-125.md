# Review pane topic intake

Reviewed against [published v0.1.61](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.61),
whose annotated tag resolves to `f151feab909d8fbbc20be021fe0df171fdb45a38`.
Publication verified on 2026-10-27 using the official latest-release API and
[successful release workflow](https://github.com/lcorneliussen/wtc-cli/actions/runs/40541931022).
The release includes [CLI #233](https://github.com/lcorneliussen/wtc-cli/pull/233),
its review-pane source and the numbered Collections notes. The command handbook
now labels the behavior released in v0.1.61; v0.1.60 does not support `--add review`.
Source fingerprints below identify v0.1.61 rather than a development branch.

The existing coverage inventory and installation examples retain their labeled
v0.1.51 baseline; this intake does not promote that baseline or reconcile
unrelated source drift.

| Source | Coverage decision |
| --- | --- |
| `docs/review-pane.md` | The command handbook covers opt-in usage, pinned bundle/PR ranges, local object prerequisites, Hunk/less selection, layout placement, coexistence, restart and idle-only trim. Detailed selection and compatibility limits remain in the immutable upstream reference. |
| Open command, collection, layout and range implementation | Checked that default/full pane sets stay unchanged, live viewers survive layout changes, exited viewers require an explicit restart, and range resolution does not fetch or check out code. |
| `internal/wtc/release-notes/0.1.61.md`: Collections | Review-pane entries are included in the published numbered release. The handbook links the release and tag-pinned review-pane contract. |

Validation uses Astro diagnostics/build, generated-page internal link checks,
structural coverage validation, and the existing coverage tool tests.

## Source fingerprints

| Source at v0.1.61 | SHA-256 |
| --- | --- |
| `docs/review-pane.md` | `e362521e6c1687b8c6548a58e1bec37693827b95013d37cf006bf2d35591f2ad` |
| `cmd/wtc/open.go` | `d1f3445d09c38c138b9ed6a99ba70c5b5081a8b2854ac53e6a2fa2a71a14eb9b` |
| `cmd/wtc/open_collection.go` | `1d2f784ac92b4fe168fd49d67c5fbf2d6d4ea0408ff7a930e144601c8835675b` |
| `cmd/wtc/open_layout.go` | `8ad6aa02d50659c04ba9394046963c95178edf35c247b6280c84c25c99928597` |
| `cmd/wtc/open_review.go` | `f03c92f6b46493487f9703305fb52f6889d09bb6ed571b849337b36adb34fac5` |
| `internal/wtc/release-notes/0.1.61.md` | `f7537d4fb4d9894de0820f429bbfe7095ce52998fc5ddac2117478df22538882` |
