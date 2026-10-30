import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspectVisualMeasurements, recordingCrop, visualGuideSvg } from './openclaw-visual-audit.mjs';

const measurements = more => ({ groups: [], opticalPairs: [], rows: [], hierarchy: [], ...more });
test('semantic rails reject near alignment rather than accepting a stable wrong layout', () => {
  const audit = inspectVisualMeasurements(measurements({ groups: [{ name: 'name rail', members: [{ value: 48 }, { value: 62 }] }] }));
  assert.match(audit.errors[0], /14.00px/);
});
test('optical alignment uses the declared cap middle, not the element box centre', () => {
  assert.equal(inspectVisualMeasurements(measurements({ opticalPairs: [{ name: 'forge', capDelta: 3, xDelta: 0 }] })).errors.length, 1);
  assert.equal(inspectVisualMeasurements(measurements({ opticalPairs: [{ name: 'forge', capDelta: .25, xDelta: 2 }] })).errors.length, 0);
});
test('hierarchy reports density and clipped labels without turning taste into a verdict', () => {
  const audit = inspectVisualMeasurements(measurements({ rows: [{ name: 'web', width: 300, height: 96, emptyFactBand: false }], hierarchy: [{ role: 'action', text: 'Catch up 3 repos', clipped: true }] }));
  assert.equal(audit.errors.length, 0); assert.equal(audit.warnings.length, 2);
});
test('empty fact lanes need a real reservation', () => {
  assert.equal(inspectVisualMeasurements(measurements({ rows: [{ name: 'api', width: 300, height: 64, emptyFactBand: true }] })).errors.length, 1);
});
test('one fixed spatial crop contains every expansion without changing the timeline', () => {
  assert.deepEqual(recordingCrop([680, 332, 532], 320, 900), { x: 0, y: 324, width: 320, height: 576 });
  assert.deepEqual(recordingCrop([4, 1], 391, 901), { x: 0, y: 0, width: 390, height: 900 });
  assert.throws(() => recordingCrop([], 320, 900));
  assert.throws(() => recordingCrop([NaN], 320, 900));
});
test('guides remain a separate vector artifact and reject external screenshot references', () => {
  const audit = measurements({ groups: [{ axis: 'x', spread: 0, members: [{ value: 48, y: 100, bottom: 120 }] }] });
  assert.match(visualGuideSvg(audit, 'data:image/png;base64,AAAA', { width: 320, height: 900 }, recordingCrop([100], 320, 900)), /viewBox="0 92 320 808"/);
  assert.throws(() => visualGuideSvg(audit, 'https://example.invalid/image.png', { width: 320, height: 900 }, recordingCrop([100], 320, 900)));
});
