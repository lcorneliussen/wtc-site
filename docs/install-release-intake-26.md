# Installation and published release intake — #26

The homepage now checks the public stable-release API during each static build.
One validated tag supplies the version label, mise installation command and
numbered release-notes/download link. No browser request or new service is needed.
The panel states when it was checked and that it updates when the site rebuilds;
there is no scheduled release refresh or claim that a deployed snapshot stays current.

If GitHub is unavailable, returns a draft/prerelease, malformed tag or unexpected
release URL, the build uses v0.1.62, verified on 2026-10-29, and labels it “Last
verified” with the lookup limitation. That fallback is maintained here in
`src/data/release.mjs`. It is distinct from the handbook’s v0.1.51 baseline.

Published contracts checked: v0.1.62 release metadata/assets and tagged
`docs/getting-started.md` support macOS/Linux binaries and the versioned
`mise use -g github:lcorneliussen/wtc-cli@<version>` installation form.
The executable remains `wtc`. The release’s tagged getting-started example
itself uses an older pin; this panel takes its version from release metadata.
Local-terminal installation links separately to the existing OpenClaw guide.
No OpenClaw setup or compatibility claims are changed.

Verification commands:

```sh
node --test scripts/release.test.mjs
npm run check
npm run build
npm run test:links
npm run test:coverage
npm run check:coverage
```

Visual and interaction QA covers desktop and narrow screens, keyboard copy,
clipboard rejection/manual selection, release/download links, no JavaScript,
and failed-release lookup rendering. The existing dependency set is sufficient.

Completed QA: the install command stays in the first viewport at 1440×900,
1280×720, 390×844 and 320×640, without horizontal overflow. Desktop/mobile
screenshots were visually inspected. Keyboard Enter copies the exact displayed
command; rejected clipboard access selects it and announces manual copying.
With JavaScript disabled the command and numbered notes remain available and
the copy button stays hidden. Reproduce interactions against a running preview:

```sh
node scripts/install-qa.mjs <preview-url>
```

A static build with the release fetch forced to reject was also rendered: the
“Last verified” version, outage/date text, install command and numbered notes
remain consistent. The normal network-enabled build was restored afterward.
Coverage was verified against the exact v0.1.51 source revision as well as offline.

Independent review follow-up: the existing site build job now runs the release
unit tests directly. A failed copy after a successful copy resets the visible
button label, and browser QA asserts that sequence.
