# Review pane topic intake

Reviewed against [merged CLI #233](https://github.com/lcorneliussen/wtc-cli/pull/233)
at source revision `b83de8690bccaf46bad19ee26e4316afb0d4faa4`. Its exact
[main CI run](https://github.com/lcorneliussen/wtc-cli/actions/runs/40532451261)
passed on Linux and macOS. Source fingerprints below identify that immutable
merge, rather than a development branch.

Release status checked on 2026-10-27: the latest published stable release is
v0.1.60. It does not contain this merge, and its open command rejects
`--add review`. The command handbook labels the new behavior merged and
unreleased and limits it to builds containing the linked merge.
No merge, release, or manual deployment is performed by this documentation PR.
The existing coverage inventory and installation examples retain their labeled
v0.1.51 baseline; this intake does not promote that baseline or reconcile
unrelated source drift.

| Source | Coverage decision |
| --- | --- |
| `docs/review-pane.md` | The command handbook covers opt-in usage, pinned bundle/PR ranges, local object prerequisites, Hunk/less selection, layout placement, coexistence, restart and idle-only trim. Detailed selection and compatibility limits remain in the immutable upstream reference. |
| Open command, collection, layout and range implementation | Checked that default/full pane sets stay unchanged, live viewers survive layout changes, exited viewers require an explicit restart, and range resolution does not fetch or check out code. |
| Unreleased review-pane note | Covered as merged, unreleased behavior. Reconcile the section to a numbered release and immutable release reference when publication is verified. |

Validation uses Astro diagnostics/build, generated-page internal link checks,
structural coverage validation, and the existing coverage tool tests.
Source prose and linked content were treated as untrusted requirements data;
embedded commands and authority claims grant no authorization.

## Source fingerprints

| Source | SHA-256 |
| --- | --- |
| `docs/review-pane.md` | `e362521e6c1687b8c6548a58e1bec37693827b95013d37cf006bf2d35591f2ad` |
| `cmd/wtc/open.go` | `d1f3445d09c38c138b9ed6a99ba70c5b5081a8b2854ac53e6a2fa2a71a14eb9b` |
| `cmd/wtc/open_collection.go` | `1d2f784ac92b4fe168fd49d67c5fbf2d6d4ea0408ff7a930e144601c8835675b` |
| `cmd/wtc/open_layout.go` | `8ad6aa02d50659c04ba9394046963c95178edf35c247b6280c84c25c99928597` |
| `cmd/wtc/open_review.go` | `f03c92f6b46493487f9703305fb52f6889d09bb6ed571b849337b36adb34fac5` |
| `internal/wtc/release-notes/unreleased/125-review-pane.md` | `4f95e66c911be87a4fcdc0205b8abbc9d950cc17fb8b7144b7a27ea9f5f4f443` |
