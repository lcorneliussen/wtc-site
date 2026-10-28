# Status-version topic intake

Reviewed [CLI #261](https://github.com/lcorneliussen/wtc-cli/pull/261) at merge
`e330a0739c3f85b75bd61f5c082a5f5d12aec228`, containing final source revision
`df086a25e8074a695734319e31fbff2a7dfefa52`.

The latest published CLI release was verified as
[v0.1.61](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.61) on
2026-10-28 through the official GitHub Releases API. This change is merged on
main after that release and remains **unreleased**. The command handbook labels
it accordingly; no install pins or coverage baseline are promoted.

## Coverage decision

Only `src/pages/docs/commands.md` changes on the rendered site. It summarizes
the actual running version in a muted trailing header suffix, stable terminal
release links, narrow-width priority and local snapshot producer semantics.
The immutable upstream contract supplies the detailed terminal and cache rules.
Existing OpenClaw version/mismatch displays are outside this update.

Broader CLI #92 dev-source freshness, replaced-running-binary detection and
ignored dev-build diagnostics remain deferred. This intake does not claim those
checks or a published release. When an official release contains this merge,
verify publication before relabeling the handbook section.

The existing coverage inventory and install examples retain their labeled
v0.1.51 baseline. Structural coverage, coverage-tool tests, Astro diagnostics,
static build and generated-page link checks validate this documentation slice.

## Source fingerprints

All source bytes below were read from the exact public merge revision above.

| Source | SHA-256 |
| --- | --- |
| `docs/status-version.md` | `069e19cfaaeb81c7ed7dab703a81a240edf3a65c7df0f15506218a40f2938d6b` |
| `cmd/wtc/status_tui.go` | `93e215a25a767fb9dc7c003a6db75075542b5886f19cb84a07d61d608c2a9973` |
| `cmd/wtc/status_table.go` | `ba50e4a751b05c10c5d1653423b9b352e70efd389b023febf711042c310befc5` |
| `internal/wtc/status.go` | `0b03875aad20e6721e01a2fb8947f208594e7beed45c4dd1f9d221eead36d504` |
| `internal/wtc/status_version.go` | `5180dc147b0bdb91e131d14ed10620c29e5ed083ac3eb3dcd48f9f4525f0eb2b` |
| `internal/wtc/release-notes/unreleased/92-status-version.md` | `f5d28f84f4fa9831f21677af578e48faf26be0d72240f66dba3c75ba9c06c33c` |
