# Status-version topic intake

Reviewed [CLI #261](https://github.com/lcorneliussen/wtc-cli/pull/261) at merge
`e330a0739c3f85b75bd61f5c082a5f5d12aec228`, containing final source revision
`df086a25e8074a695734319e31fbff2a7dfefa52`.

The initial review verified v0.1.61 as the latest published release and labeled
this feature merged/unreleased. On 2026-10-28, the official GitHub Releases API
verified [published v0.1.62](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.62).
Its tag includes the original merge. The handbook now labels the feature
available from v0.1.62 and links the
[tag-pinned contract](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.62/docs/status-version.md).
The contract's SHA-256 remains
`069e19cfaaeb81c7ed7dab703a81a240edf3a65c7df0f15506218a40f2938d6b`.
See the [focused publication intake](release-intake-0.1.62.md) for tag and release
verification. No install pins or coverage baseline are promoted.

## Coverage decision

Only `src/pages/docs/commands.md` changes on the rendered site. It summarizes
the actual running version in a muted trailing header suffix, stable terminal
release links, narrow-width priority and local snapshot producer semantics.
The immutable upstream contract supplies the detailed terminal and cache rules.
Existing OpenClaw version/mismatch displays are outside this update.

Broader CLI #92 dev-source freshness, replaced-running-binary detection and
ignored dev-build diagnostics remain deferred. This intake does not claim those
checks; publication of the version display does not imply those deferred
diagnostics are implemented.

The existing coverage inventory and install examples retain their labeled
v0.1.51 baseline. Structural coverage, coverage-tool tests, Astro diagnostics,
static build and generated-page link checks validate this documentation slice.

## Source fingerprints

The historical implementation fingerprints below identify the exact original
public merge revision above. Only the contract fingerprint is asserted unchanged
at v0.1.62; the publication intake records the released source.

| Source | SHA-256 |
| --- | --- |
| `docs/status-version.md` | `069e19cfaaeb81c7ed7dab703a81a240edf3a65c7df0f15506218a40f2938d6b` |
| `cmd/wtc/status_tui.go` | `93e215a25a767fb9dc7c003a6db75075542b5886f19cb84a07d61d608c2a9973` |
| `cmd/wtc/status_table.go` | `ba50e4a751b05c10c5d1653423b9b352e70efd389b023febf711042c310befc5` |
| `internal/wtc/status.go` | `0b03875aad20e6721e01a2fb8947f208594e7beed45c4dd1f9d221eead36d504` |
| `internal/wtc/status_version.go` | `5180dc147b0bdb91e131d14ed10620c29e5ed083ac3eb3dcd48f9f4525f0eb2b` |
| `internal/wtc/release-notes/unreleased/92-status-version.md` | `f5d28f84f4fa9831f21677af578e48faf26be0d72240f66dba3c75ba9c06c33c` |
