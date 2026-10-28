# Review audience topic intake

Initially reviewed against [merged CLI #224](https://github.com/lcorneliussen/wtc-cli/pull/224)
at source revision `f746dc90d833773b03a8a5b7961dd04fbddf0ff4`. Its exact
[main CI run](https://github.com/lcorneliussen/wtc-cli/actions/runs/40522407662)
passed on Linux and macOS. Source fingerprints below come from that merge
commit, rather than a development branch.

The initial release check on 2026-10-27 found published v0.1.60 without this
merge, so the handbook originally labeled it merged/unreleased. Publication was
rechecked through the official GitHub release APIs on 2026-10-28:

| Published tag | Published at (UTC) | Tag object | Peeled commit |
| --- | --- | --- | --- |
| [v0.1.61](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.61) | 2026-10-27T16:33:54Z | `62ad52635a42ef3698750b0cde07789ee42e2f05` | `f151feab909d8fbbc20be021fe0df171fdb45a38` |
| [v0.1.62](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.62) | 2026-10-28T17:41:14Z | `890e02f18ec93e9effc7931162f99c96086ada22` | `e7c6f1177b7f0d513c0f36e9d2d323d76a105a83` |

Both releases are published stable releases (draft and prerelease false).
Git ancestry confirms the original merge is included in both tags, but not
v0.1.60. The review-audience contract is byte-identical at the original merge,
[v0.1.61](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.61/docs/review-audiences.md)
and [v0.1.62](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/review-audiences.md):
SHA-256 `566ff256ef7fdef59f043d9988623ba727d59c8d61804c617f4d8292a05ac1a7`.
The [v0.1.61 Review privacy release notes](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.61/internal/wtc/release-notes/0.1.61.md#review-privacy)
explicitly describe automatic audience selection and publication limits.
The [v0.1.60 command reference](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.60/docs/commands.md)
confirms its private bundle default and explicit `--public` isolation option.

Publication reference fingerprints:

| Released reference | SHA-256 |
| --- | --- |
| `v0.1.60:docs/commands.md` | `325849b2f034d8727a8f4d6870be0416fa61634789cf4b567dfe56e2de73fc2b` |
| `v0.1.61:internal/wtc/release-notes/0.1.61.md` | `f7537d4fb4d9894de0820f429bbfe7095ce52998fc5ddac2117478df22538882` |

The command subsection now labels these defaults available from v0.1.61, using
a release-tag-pinned contract, while retaining the accurate v0.1.60 advice.
Only that subsection and this existing intake change. The broad coverage
inventory and existing examples retain their labeled v0.1.51 baseline.

| Source | Coverage decision |
| --- | --- |
| `docs/commands.md`, `docs/review-audiences.md` | The command handbook explains automatic public/private selection, explicit flags, mode visibility, fresh publication checks, and the older-release need for `--public`. The exact rule-directory, prior-round and Bitbucket contracts remain in the pinned upstream reference. |
| Embedded local-review skill and prompts | The handbook explains the audience boundary and upstream gate ownership. Agent execution details remain upstream. |
| Published review audience defaults | Available from v0.1.61, also included in v0.1.62. Publication and identical contract bytes are verified above; detailed rules remain in the tag-pinned upstream reference. |

Site checks cover Astro diagnostics/build, internal links, and structural
coverage validation plus the coverage tool tests. This focused intake does not
claim reconciliation of unrelated source drift since the inventory baseline.

## Original-merge source fingerprints

The following historical fingerprints identify the original merge above. Only
the review-audience contract is asserted unchanged at both released tags.

| Source | SHA-256 |
| --- | --- |
| `docs/commands.md` | `3d9bc58ee1a85d546e3471682d975c59f1cd211869e58084083f0c14c9807e5b` |
| `docs/review-audiences.md` | `566ff256ef7fdef59f043d9988623ba727d59c8d61804c617f4d8292a05ac1a7` |
| `internal/wtc/defaults/skills/wtc-local-review/SKILL.md` | `c937bb7e5d09622cf9c65824191d89f59285ff7b823d670c88b13972334f3d70` |
| `internal/wtc/defaults/review/prompts/concern.md` | `b7ab0eb6763d6aad5561361b80e3953b424b09e126e3ad94b9daa52632dd3664` |
| `internal/wtc/defaults/review/prompts/lead.md` | `24ac24a7de7f1f4364cc04bffe541e0481928a21b10117f53f78e372abba0c45` |
| `internal/wtc/release-notes/unreleased/221-review-audiences.md` | `9a5a5d34792e161c1a54488ad56425d9b5c8c544129f2115858cb9c0c47b40d6` |
