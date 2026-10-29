# Recording OpenClaw interactions

Use this workflow for short, repeatable interaction clips for the site or a UX
review. It clicks the actual upstream plugin controls in Chromium and supplies
synthetic gateway responses. It needs no server, gateway credentials or forge
account. All network requests except the in-memory fixture resources are blocked.

These are renderer demonstrations. They do not verify a live gateway, real
publication, backend timing or the cause of a previously reported incident.
For the existing card/panel screenshot tour, use
[the original media workflow](openclaw-coverage.md#what-is-captured).

## Record a take

From the site checkout:

```sh
npm ci --include=dev
npx playwright install chromium
npm run demos:openclaw:interactions -- /absolute/path/to/wtc-cli
```

The upstream checkout supplies
`openclaw-plugin/dist/control-ui/v1/index.js`. That file must be unchanged in
git; the recorder captures its commit and SHA-256. Use the release or revision
you intend to document. A passing recording of newer source does not advance
the site's reviewed or published baseline.

The default output is the ignored `artifacts/openclaw-interactions/` directory.
Open `index.html` there to watch the four silent, captioned WebM clips. Each clip
has a visible cursor indicator, a request/response trace and a final PNG.
`manifest.json` records the source revision/hash, Playwright/browser versions,
scenario and assertions. The recorder checks the expected UI outcomes and loads
each finalized video to verify metadata and initial decoding.

Use a new, empty directory for every take; the recorder refuses to overwrite
existing output. To record just one scenario:

```sh
npm run demos:openclaw:interactions -- /absolute/path/to/wtc-cli artifacts/push-take-2 push
```

The final argument is optional. Run with `--help` for usage.

| Scenario | Interaction and expected result |
| --- | --- |
| `push` | Bitbucket preparation → personal confirmation → simulated publication → refresh. A draft PR appears and the unpublished count clears. |
| `stale` | Same push, then a deliberately injected stale count alongside the new PR. The arrow returns; a manual refresh clears it. This models a response, not a verified backend bug. |
| `individual` | Click three repository behind-count controls quickly. All requests complete; the shared notice is replaced by the latest result. This route does not create sidebar Action log records in the reviewed renderer. |
| `batch` | Click the collection's catch-up shortcut once. Observe sequential processing and open three completion results in the sidebar. |

The scripted delays make progress states visible; they are not performance
measurements. Assertions intentionally fail if the relevant controls or behavior
change. Inspect the new source contract before updating fixtures or selectors;
do not weaken an assertion merely to produce a video.

## Review and export

Watch every clip for accurate captions, readable text, cursor placement,
clipping and unexpected private content. Review the request trace against the
visible result. A sent agent handoff is not completed work; a successful RPC is
not proof that the underlying operation succeeded.

WebM works directly in the generated gallery. For an MP4 export, install
`ffmpeg` separately and run from the take directory:

```sh
for video in ./*.webm; do
  ffmpeg -i "$video" -c:v libx264 -crf 23 -pix_fmt yuv420p \
    -movflags +faststart -an "${video%.webm}.mp4"
done
```

Decode exports fully before sharing, for example
`ffmpeg -v error -i 01-push-create-pr.mp4 -f null -`.
Keep the gallery, videos and traces together when sending a take for review.
Generated takes stay outside git by default. Publishing selected media under
`public/media/` is a separate edit: retain provenance, label simulated responses,
add a text alternative, use native playback controls without autoplay, and run
the site's normal build and link checks. This recorder never deploys the site.

## Add another interaction

Extend `scripts/record-openclaw-interactions.mjs` with:

1. A scenario ID, a concrete title and generic fixture repositories/accounts.
2. Only the host responses needed by that scenario, including failure cases.
3. Real control clicks with visible pauses and captions explaining the outcome.
4. Assertions on the resulting state and the dispatched requests. Keep network
   blocking and unexpected-request/browser-error failures enabled.
5. A row in the scenario table above describing what the clip establishes.

The shell is shared with the screenshot tour in `scripts/demos/openclaw.html`.
The recorder checks its injection boundaries and fails if they drift. The plugin
module itself is read unchanged from upstream; no copy is deployed with the site.

For a true end-to-end recording, prepare a separate disposable gateway and
synthetic repositories with a reset procedure. Record the tested versions and
verify the backend outcome independently. Do not substitute an active team's
chat, account, credentials or repositories for that fixture.
