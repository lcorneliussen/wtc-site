import test from 'node:test';
import assert from 'node:assert/strict';
import { publishedRelease } from '../src/data/release.mjs';
const response = (overrides = {}) => async () => ({ ok: true, json: async () => ({
  draft: false, prerelease: false, tag_name: 'v0.2.3',
  html_url: 'https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.2.3', ...overrides,
}) });

test('one published stable tag determines the command and numbered notes', async () => {
  const release = await publishedRelease(response());
  assert.equal(release.live, true);
  assert.equal(release.tag, 'v0.2.3');
  assert.equal(release.command, 'mise use -g github:lcorneliussen/wtc-cli@0.2.3');
  assert.equal(release.notes, 'https://github.com/lcorneliussen/wtc-cli/releases/tag/v0.2.3');
});

test('unavailable or untrusted release evidence uses the dated verified fallback', async () => {
  const unavailable = await publishedRelease(async () => { throw new Error('offline'); });
  assert.equal(unavailable.live, false);
  assert.equal(unavailable.checked, '2026-10-29');
  for (const fetchRelease of [
    async () => ({ ok: false }), response({ draft: true }), response({ prerelease: true }),
    response({ tag_name: 'v0.2.3-rc.1' }), response({ tag_name: 'dev' }),
    response({ html_url: 'https://example.com/notes' }),
    async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } }),
  ]) assert.deepEqual(await publishedRelease(fetchRelease), unavailable);
});
