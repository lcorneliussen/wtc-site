# v0.1.62 publication intake

The official latest-release API was checked on 2026-10-28 and reports
[published stable v0.1.62](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.62),
published at 2026-10-28T17:41:14Z, with draft and prerelease both false.
The [release workflow](https://github.com/lcorneliussen/wtc-cli/actions/runs/40737844406)
and [exact-main Linux/macOS CI](https://github.com/lcorneliussen/wtc-cli/actions/runs/40736615747)
both succeeded for `e7c6f1177b7f0d513c0f36e9d2d323d76a105a83`.

The annotated tag object is `890e02f18ec93e9effc7931162f99c96086ada22`, peeling to
`e7c6f1177b7f0d513c0f36e9d2d323d76a105a83`. Git ancestry verifies inclusion of
the original feature source `41d5ed32237f9e6e78cf9913ef6e2ac2165f88dc`,
status-version merge `e330a0739c3f85b75bd61f5c082a5f5d12aec228`,
progress-error merge `75fb499bbb76c214da31a1e635b15ae6f398c50d` and
squash-status merge `13dc231abbc09b79bd8b66edffd964bd9cf89c2b`.
The numbered release notes contain 9,753 bytes and match the published release
body's content. Source bytes below were read from the released tag.

| Released source | Coverage decision |
| --- | --- |
| [Retirement](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/retirement.md) | Commands relabels the existing assessment/dry-run guidance released in v0.1.62. Known blockers, unknown coverage, fresh read-only inspection and unchanged execution preflight remain distinct. |
| [Service discovery](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/service-discovery.md) | Services relabels declaration discovery released in v0.1.62, preserving unconfigured state, observation precedence and read-only discovery limits. |
| [Enlisted identities](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/enlisted-repository-identity.md) | Commands relabels verified alias/ambiguity guidance released in v0.1.62, without new landing or selector policy. |
| [Status version](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/status-version.md) | Commands relabels the actual running version and snapshot-producer guidance released in v0.1.62. Deferred freshness/replaced-binary diagnostics stay deferred. |
| [Progress errors](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/review-progress-errors.md) | Commands adds local completion after a progress-post error, nonzero exit, retained results, no automatic repost, and explicit remote reconciliation before retry. A local pass is not posted/trusted; full transport certification and unknown-ID recovery remain separate. |
| [Squash status](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/squash-status.md) | Commands adds raw named-ref counts, gone upstreams and historical landed/follow-up/unknown observations. Neither residual counts nor follow-up observations prove data loss or grant cleanup/push authority. |

The earlier [three-feature intake](merged-cli-guides-intake-19.md) and
[status-version intake](status-version-intake.md) now record verified publication.
This slice changes only the commands/services pages and these three focused
intakes. Existing install examples and the broad coverage inventory retain their
labeled v0.1.51 baseline. Narrative, navigation, new pages, OpenClaw-specific
coverage and unreleased feature claims are outside this slice.

Validation covers Astro diagnostics/build, generated internal links/assets,
coverage-tool tests, structural validation, source inventory against its own
exact baseline, released-source fingerprints and independent public review.
Source fingerprints detect drift; they do not replace semantic review.

## Released-source fingerprints

| Source at v0.1.62 | SHA-256 |
| --- | --- |
| `docs/retirement.md` | `920cfc6909c02d1b8814de35392e7d507f10540996a253ab0d010130ca606e32` |
| `docs/service-discovery.md` | `7c3e3b8168a915b460ffff6b4fbd53c9e978e08656083c4621696e4e885c5e86` |
| `docs/enlisted-repository-identity.md` | `9e022443b50d51c581fed41b6e62374b496b52f5fae161b041282c86863fe3ec` |
| `docs/status-version.md` | `069e19cfaaeb81c7ed7dab703a81a240edf3a65c7df0f15506218a40f2938d6b` |
| `docs/review-progress-errors.md` | `aab800852543f7225845534c42d54f7a266c36ad4f6bc3c343e0b3119b87827e` |
| `docs/squash-status.md` | `0025ecb3856b2e8d561bc3835206c2ec01442bbb81fd0971ff3c6c5e9398ac27` |
| `internal/wtc/release-notes/0.1.62.md` | `cc3bd1eedf40623517a21ecc83920f558fe97eb53d0e024b1466f30be1f9b05e` |
