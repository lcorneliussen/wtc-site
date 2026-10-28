# Compact next-step topic review

Reviewed public CLI revision `9f68b9b` (PR #262) for the compact browser affordances and explicit terminal handoff receipts. This is development behavior, not a published release; broad release baselines remain unchanged.

The OpenClaw handbook covers row-local actions, stable status groups, direct collection recommendations, on-demand alternatives and mixed selection, exact captured targets, cancellation and publication confirmation. Terminal guidance covers `n`/Enter, selections, execution in wtc and the owning collection’s named author pane, explicit unsent fallbacks and pending receipts. Multiple-author destination selection remains planned in the upstream design document; it is not claimed as available.

| Reviewed source | SHA-256 |
| --- | --- |
| `docs/openclaw.md` | `324e071ab6dacd3472ea9fd172d22306cc4f4fc26c580d0a1419eb141775d463` |
| `docs/commands.md` | `d6ccc8336db3e3435ebccefd47ae2aad18d8a18aea1ce5428b59906700572790` |
| `docs/next-actions-plan.md` | `df37c5ce1b75b8cdeba5f5a4cf0f4445390e089b668e9ab8ef5cf3a8cb136e37` |
| `openclaw-plugin/dist/control-ui/v1/index.js` | `f258fadf82671c82d2a201efbd1e409a25f8fe29e0dcbc30cea5ff194ec83a01` |
| `cmd/wtc/status_next.go` | `bf65317f21897bf5f3df9e2bcb330f76ad204de90212366f056fecafd8aa2716` |
| `cmd/wtc/status_tui.go` | `638056aaf8cb3637dcb18f4431b237dd5d31de462f2308b06c893fbed48bfa86` |
| `internal/wtc/release-notes/unreleased/260-compact-next.md` | `a8fbdb19a178f0555ee1ef0795244bfc9c61fc1c03c9a7c2f71505df5c0cde11` |

## Visible-control follow-up

Reviewed public CLI revision `2e5772d4eff662d55cc99b6c8037b11a0f21ad24` (PR #264). Small outlined actions and collection shortcuts are distinct from status text. Normal-width rows keep repository, branch, status and progress on one line; narrow views fold facts when needed. Service layout and action/publication authority are unchanged. The handbook records this visual refinement without changing release baselines.

| Reviewed source | SHA-256 |
| --- | --- |
| `docs/openclaw.md` | `f1eec5b5779f0c2acbe67acd9fc0a8bbda1ed8608e846e8f23c636679e0f93cc` |
| `docs/next-actions-plan.md` | `3c24b536e10d1e8cc6a98df4490d7682b87d0015b5757f9894f37dc97dbf5240` |
| `openclaw-plugin/dist/control-ui/v1/index.js` | `42e9e4ed6a4f7be9acd3eb820c9cb67abf43b18c95996d815e121d3b0764821e` |
| `internal/wtc/release-notes/unreleased/260-visible-actions.md` | `f96d20ed868690faf5ce5404eabe336d490c8d7c0ca5a1e37d786dc94dc54765` |

## Dense header and PR-history refinement

Reviewed public CLI source `082dfaa0971db5bfdb118708cbb7046f91e28d26` (PR #264). The handbook now links the canonical current CLI contract instead of growing an exhaustive PR-history introduction. It covers dense rows without visible column headings, always-available top-bar controls, strong hover/focus feedback, current/other-active/completed PR hints and sidebar history, direct mechanical catch-up with a checked conflict-resolution handoff, and explicit local-merge versus personal-publication semantics. This file is contributor source-review bookkeeping, not a user workflow or an executable plan. Release baselines remain unchanged.

| Reviewed source | SHA-256 |
| --- | --- |
| `docs/openclaw.md` | `0ff2ef9a9957d87b3167bdf1ab5663005dfdfc81033df9406e31073cf1465d66` |
| `docs/next-actions-plan.md` | `39045446687a6b14e272ff2b96b44eeb2986a69b98eead57a131fddfe4a40875` |
| `openclaw-plugin/dist/control-ui/v1/index.js` | `79749ef4db4f751217815f666ff2858bacebb05fd4f059a6c5c545ff756d00b5` |
| `internal/wtc/release-notes/unreleased/260-visible-actions.md` | `ed4df9ce3f25b449a8200d2643c610f717bfb73f28b9f2e1b1bc714c5d6346ca` |
