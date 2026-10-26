# Topic intake for wtc 0.1.60

Reviewed against [published v0.1.60](https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.1.60). The inventory's broad reviewed baseline remains v0.1.51.
This is a focused topic update, not a claim that every intervening change has
been reconciled. Existing install examples retain their labeled baseline.

| Source | Coverage decision |
| --- | --- |
| `docs/commands.md`, release notes: next actions | Commands page explains `n`, selection, execution, agent fallback and manual operation. |
| `docs/openclaw.md`, release notes: action controls | OpenClaw page covers next actions, Commit changes, full results, publication confirmation and person-owned merging. |
| `docs/openclaw.md`, release notes: completed branches | OpenClaw page covers PR history after return to tip and the fresh managed-owner requirement. |
| `docs/rename-compatibility.md` | Configuration page summarizes supported-prefix precedence and links the exact contract; the full setting map remains upstream. |
| Release notes: PROD/TEST build tiers | Keep the detailed ref-mapping rule upstream in the versioned notes; the handbook's general status workflow needs no second mapping table. |

The added sections use published-version labels and pinned source links.
Astro checks/build, internal links and coverage checks validate the pages;
this intake does not replace drift reports against the existing inventory
baseline.

## Source fingerprints for this topic review

| Source at v0.1.60 | SHA-256 |
| --- | --- |
| `docs/commands.md` | `325849b2f034d8727a8f4d6870be0416fa61634789cf4b567dfe56e2de73fc2b` |
| `docs/openclaw.md` | `64803a7d9e85e22fce9b2d60b9bfe1ff474e109354b5d78a44949cfa77f680d6` |
| `docs/rename-compatibility.md` | `fb8efd5de11b45b7e7b198c079d88d5e6b02b0f237f5ea75660f05f7031f0fc4` |
| `internal/wtc/release-notes/0.1.60.md` | `b4b588641cf5baf00159a44f23a3a710c54df01e42c95f2587eb0da64eaca13e` |
