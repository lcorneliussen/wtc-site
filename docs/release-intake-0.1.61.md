# Focused publication intake for wtc 0.1.61

Verified on 2026-10-27: the official
[latest-release API](https://api.github.com/repos/lcorneliussen/wtc-cli/releases/latest)
identifies [v0.1.61](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.61)
as published, stable and non-draft. Its annotated tag resolves to
`f151feab909d8fbbc20be021fe0df171fdb45a38`, and the
[release workflow](https://github.com/lcorneliussen/wtc-cli/actions/runs/40541931022)
succeeded. Inclusion was checked against tag source and the
[numbered release notes](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.61/internal/wtc/release-notes/0.1.61.md),
not inferred from a numbered file on main.

| Released topic | Focused disposition |
| --- | --- |
| Review pane, CLI #233 / issue #125 | Update the existing command-handbook section from merged/unreleased to released v0.1.61; link the tag-pinned [review-pane contract](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.61/docs/review-pane.md). See [topic source fingerprints](review-pane-intake-125.md). |
| Remembered tunnel choices, CLI #236 / issue #158 | Update the existing services section from merged/unreleased to released v0.1.61; link the tag-pinned [runtime contract](https://github.com/lcorneliussen/wtc-cli/blob/v0.1.61/internal/wtc/defaults/instructions/runtime.md). See [topic source fingerprints](tunnel-intent-intake-158.md). |

The behavioral descriptions already match the tagged source. This refresh changes
publication labels and provenance only. The broad inventory and install examples
retain their explicitly labeled v0.1.51 baseline; other topics and later feature
work are outside this intake. It does not claim full v0.1.61 feature coverage.

Before editing, the open site PR list contained only #12, whose files are
`src/pages/docs/openclaw.md` and `docs/action-selection-intake.md`. Neither is
changed here. This refresh depends only on the published CLI release and merged
site #10/#11, with no dependency on #12's action-selection work.

Validation: Astro diagnostics/build, generated internal links and assets,
coverage-tool tests, structural coverage, and the exact v0.1.51 inventory-source
check. The focused fingerprints below and in the topic intakes are checked
against v0.1.61 separately; the inventory is not blindly advanced to newer source.

| Source at v0.1.61 | SHA-256 |
| --- | --- |
| `docs/review-pane.md` | `e362521e6c1687b8c6548a58e1bec37693827b95013d37cf006bf2d35591f2ad` |
| `internal/wtc/defaults/instructions/runtime.md` | `c1bab7ac27738120292d133588fbe1f8bfd128f298b2e812038ae9380e477631` |
| `internal/wtc/release-notes/0.1.61.md` | `f7537d4fb4d9894de0820f429bbfe7095ce52998fc5ddac2117478df22538882` |
