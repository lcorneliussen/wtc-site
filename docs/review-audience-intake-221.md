# Review audience topic intake

Reviewed against [merged CLI #224](https://github.com/lcorneliussen/wtc-cli/pull/224)
at source revision `f746dc90d833773b03a8a5b7961dd04fbddf0ff4`. Its exact
[main CI run](https://github.com/lcorneliussen/wtc-cli/actions/runs/40522407662)
passed on Linux and macOS. Source fingerprints below come from that merge
commit, rather than a development branch.

Release status checked on 2026-10-27: the latest published stable release is
v0.1.60, which does not contain this merge. The handbook labels the new behavior
as merged and unreleased, and preserves explicit `--public` guidance for
v0.1.60. No release, merge, or deployment is performed by this documentation PR.
The broad coverage inventory and existing examples retain their labeled
v0.1.51 baseline.

| Source | Coverage decision |
| --- | --- |
| `docs/commands.md`, `docs/review-audiences.md` | The command handbook explains automatic public/private selection, explicit flags, mode visibility, fresh publication checks, and the older-release need for `--public`. The exact rule-directory, prior-round and Bitbucket contracts remain in the pinned upstream reference. |
| Embedded local-review skill and prompts | The handbook explains the audience boundary and upstream gate ownership. Agent execution details remain upstream. |
| Unreleased review audience note | Covered as merged, unreleased behavior, with an immutable source link. Reconcile to a numbered release and pinned release reference when published. |

Site checks cover Astro diagnostics/build, internal links, and structural
coverage validation plus the coverage tool tests. This focused intake does not
claim reconciliation of unrelated source drift since the inventory baseline.

## Source fingerprints

| Source | SHA-256 |
| --- | --- |
| `docs/commands.md` | `3d9bc58ee1a85d546e3471682d975c59f1cd211869e58084083f0c14c9807e5b` |
| `docs/review-audiences.md` | `566ff256ef7fdef59f043d9988623ba727d59c8d61804c617f4d8292a05ac1a7` |
| `internal/wtc/defaults/skills/wtc-local-review/SKILL.md` | `c937bb7e5d09622cf9c65824191d89f59285ff7b823d670c88b13972334f3d70` |
| `internal/wtc/defaults/review/prompts/concern.md` | `b7ab0eb6763d6aad5561361b80e3953b424b09e126e3ad94b9daa52632dd3664` |
| `internal/wtc/defaults/review/prompts/lead.md` | `24ac24a7de7f1f4364cc04bffe541e0481928a21b10117f53f78e372abba0c45` |
| `internal/wtc/release-notes/unreleased/221-review-audiences.md` | `9a5a5d34792e161c1a54488ad56425d9b5c8c544129f2115858cb9c0c47b40d6` |
