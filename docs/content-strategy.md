# Content ownership, coverage audit, and update plan

## Ownership

| Surface | Purpose |
| --- | --- |
| CLI GitHub README | Concise pitch, install, minimal local quick start, one demo, links to learning and contribution paths |
| CLI docs and embedded defaults | Canonical command contracts, configuration and version-matched offline/agent guidance |
| CLI numbered release notes / GitHub Releases | One historical change record, embedded in the binary and published from the same source |
| Website | Guided learning, task workflows, conceptual explanations, troubleshooting, and upgrade/release discovery |
| Website README | Development, validation, and content-maintenance instructions |

Do not maintain a second full command manual or rewrite the entire changelog on
the site. Curate the user journey and link to versioned authoritative details.
Specialist reference and detailed agent procedures may intentionally remain upstream.

## Initial audit and reconciliation

Baseline: CLI tag **v0.1.51**, commit **18652cbec6899bee283c16fb4f5e946013a65470**.
This is a reviewed documentation baseline, not an assertion about the newest release.

| Finding | Resolution |
| --- | --- |
| Eight handbook pages but no upgrade/release guide | Added upgrades page with target-binary range review, local and gateway adoption, canonical notes links |
| Install and harness examples still pinned to 0.1.48 | Aligned handbook, homepage and copyable quick starts to 0.1.51; added automatic pin consistency checks |
| Source links followed mutable main | Handbook source links now identify the reviewed release tag |
| OpenClaw project selection and newer PR workflows missing | Added project boundaries, explicit choices, PR description input, notifications and sandbox catch-up context |
| Configuration, secrets, overrides and MCP only scattered references | Added a configuration/secrets guide, with safety and upstream boundaries |
| Advanced command families not discoverable | Added reference map and review workflow caveats, without duplicating every flag |
| No machine-readable ownership or drift tracking | Added coverage inventory with SHA-256 source fingerprints and page mappings or explicit upstream-only decisions |
| No repeatable release intake | Added report generation with changed/new/removed sources, release topics, suggested affected pages and review checklist |

## What coverage means

`coverage.json` inventories README, Markdown under CLI `docs/`, embedded
`internal/wtc/defaults/` and `internal/wtc/release-notes/`. The initial inventory
has **106 sources**. Every entry has a digest and an explicit decision: a
website summary with mapped pages, or upstream-only with rationale. All ten
handbook pages and the homepage have source mappings.

**This is source-disposition coverage, not a claim of 100% feature coverage.**
A mapped page may summarize only the relevant workflow. Historical release
notes remain upstream; accepting that archival decision is not the same as
claiming every historical feature is taught by the site. Hash equality cannot
prove semantic accuracy. Code-only behavior changes without documentation or
release notes cannot be detected by this tool.

## Routine checks

Run from the site repository:

```sh
npm run test:coverage
npm run check:coverage
npm run check:coverage -- /path/to/reviewed-cli-checkout
npm run docs:propose -- /path/to/current-cli-checkout main /tmp/docs-review.md
```

Use a checkout at the inventory revision for a deterministic baseline check.
A newer checkout should report drift; do not blindly regenerate hashes to make
it pass. The CLI accepts an explicit path because managed worktrees may not be
physical siblings even when the collection links look adjacent.

The check detects new, changed, and removed sources; missing mapped targets;
unmapped handbook/home pages; invalid inventory records; and inconsistent install
pins. Exit 1 means an invalid or stale check. Offline checks validate structure
only. Proposal generation succeeds with drift and writes a review queue without
modifying the baseline. Input/read failures still fail.

The proposal scans new or modified numbered release notes and unreleased
fragments, orders numbered releases numerically, extracts topic headings, and
suggests pages using a transparent keyword heuristic. Suggestions need human
review. Unreleased fragments are labeled upcoming; a numbered file on main is
not proof of publication. Read the complete source notes, not just the headings.

## Automation

`.github/workflows/docs-coverage.yml` adds:

- PR/push checks against the exact reviewed upstream commit, plus offline tests.
- Weekly and manual comparisons against upstream main, yielding a Markdown job
  summary and downloadable review queue with the compared commit recorded.
- Read-only repository permissions; no additional secrets, automatic commits,
  PR creation, content rewrite, merge or deployment.

The schedule starts only after the workflow lands on the default branch.
The scheduled job is an early-warning queue, not a gate that makes ordinary
site PRs fail whenever upstream changes. Existing Pages deployment is unchanged.

## Next iteration and acceptance gates

1. **Current slice:** reconcile known drift, record source ownership and make
   omissions/change detection reproducible.
2. **On the next release:** inspect the report, review full changes, update the
   relevant pages and release pointers, then update hashes/revision with an
   explanation. Run coverage, Astro, build and internal-link checks.
3. **Optional drafting automation:** consume the review queue and source diffs
   to draft a proposed patch with citations. Treat release text as untrusted
   data, not instructions. Require content review and tests before merging.
4. **Later improvements:** section-level feature decisions, external-link
   verification, and user-task usability review. No opaque coverage percentage
   or AI correctness claim should replace these checks.

Automated drafting and publishing are deliberately not enabled in this slice.
