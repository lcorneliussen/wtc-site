// Developer-only measurements and guides. Never mounted by the product renderer.
export function inspectVisualMeasurements(measurements, tolerance = 0.75) {
  const errors = [...(measurements.missing ?? [])], warnings = [];
  const groups = measurements.groups.map(group => {
    const values = group.members.map(item => item.value).filter(Number.isFinite);
    const spread = values.length ? Math.max(...values) - Math.min(...values) : 0;
    if (values.length > 1 && spread > tolerance) errors.push(`${group.name}: ${spread.toFixed(2)}px spread`);
    return { ...group, spread };
  });
  for (const pair of measurements.opticalPairs) {
    if (Math.abs(pair.capDelta) > 1.25) errors.push(`${pair.name}: icon ${pair.capDelta.toFixed(2)}px from cap midline`);
  }
  for (const edge of measurements.edges ?? []) if (Math.abs(edge.actual - edge.expected) > tolerance) errors.push(`${edge.name}: ${(edge.actual - edge.expected).toFixed(2)}px from declared edge`);
  for (const row of measurements.rows) {
    if (row.width < 400 && row.height > 66) warnings.push(`${row.name}: ${row.height.toFixed(1)}px per repository`);
    if (row.emptyFactBand) errors.push(`${row.name}: empty fact band without a reservation`);
  }
  for (const item of measurements.hierarchy) {
    if (item.clipped && !item.disclosure) warnings.push(`${item.role}: label is ellipsized (${item.text})`);
  }
  const filledActions = measurements.hierarchy.filter(item => item.role === 'action' && item.filled);
  if (filledActions.length) warnings.push(`${filledActions.length} filled per-repository actions: review their prominence against section headings`);
  return { ...measurements, groups, errors, warnings };
}

// Serializable for page.evaluate. Text is measured without inserting baseline probes.
export function collectVisualMeasurements(selector) {
  const root = document.querySelector(selector);
  if (!root) throw Error(`Missing audit surface: ${selector}`);
  const visible = node => {
    const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
    return rect.width > 0 && rect.height > 0 && node.checkVisibility() && style.visibility !== 'hidden' && style.display !== 'none';
  };
  const all = (selector, scope = root) => [...scope.querySelectorAll(selector)].filter(visible);
  const box = node => {
    const r = node.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
  };
  const canvas = document.createElement('canvas'), context = canvas.getContext('2d');
  const rgba = color => {
    context.clearRect(0, 0, 1, 1); context.fillStyle = color; context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data];
  };
  const luminance = color => color.slice(0, 3).map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
  const contrast = node => {
    let background = [255, 255, 255, 255], parent = node;
    while (parent) {
      const color = rgba(getComputedStyle(parent).backgroundColor);
      if (color[3] === 255) { background = color; break; }
      parent = parent.parentElement;
    }
    const color = rgba(getComputedStyle(node).color), alpha = color[3] / 255;
    const foreground = color.slice(0, 3).map((n, i) => n * alpha + background[i] * (1 - alpha));
    const a = luminance(foreground), b = luminance(background);
    return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  };
  const text = node => {
    if (!node || !visible(node)) return null;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let leaf;
    while (leaf = walker.nextNode()) {
      if (leaf.textContent.trim() && !leaf.parentElement.closest('[aria-hidden="true"]') && visible(leaf.parentElement)) break;
    }
    if (!leaf) return null;
    const offset = leaf.textContent.search(/\S/), range = document.createRange();
    range.setStart(leaf, offset); range.setEnd(leaf, offset + 1);
    const rect = range.getBoundingClientRect(), style = getComputedStyle(leaf.parentElement);
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const glyph = context.measureText(leaf.textContent[offset]), cap = context.measureText('H'), x = context.measureText('x');
    if (!Number.isFinite(glyph.fontBoundingBoxAscent) || !Number.isFinite(cap.actualBoundingBoxAscent)) throw Error('Font ink metrics unavailable');
    const baseline = rect.y + glyph.fontBoundingBoxAscent;
    return {
      text: node.textContent.trim(), ...box(node), baseline,
      capMiddle: baseline - cap.actualBoundingBoxAscent / 2,
      xMiddle: baseline - x.actualBoundingBoxAscent / 2,
      inkMiddle: baseline + (glyph.actualBoundingBoxDescent - glyph.actualBoundingBoxAscent) / 2,
      glyphCenterX: rect.x + (glyph.actualBoundingBoxRight - glyph.actualBoundingBoxLeft) / 2,
      fontSize: parseFloat(style.fontSize), fontWeight: Number(style.fontWeight), color: style.color,
      clipped: node.scrollWidth > node.clientWidth + 1 || [...node.children].some(child => visible(child) && child.scrollWidth > child.clientWidth + 1),
      disclosure: node.hasAttribute('aria-expanded'),
    };
  };
  const groups = [], opticalPairs = [], hierarchy = [], rows = [], edges = [];
  const group = (name, axis, nodes, value) => {
    const members = nodes.map(text).filter(item => item && (axis !== 'y' || /[\p{L}\p{N}]/u.test(item.text))).map(item => ({ ...item, value: value(item) }));
    if (members.length) groups.push({ name, axis, members });
  };
  group('primary name rail', 'x', all('.wtc-brand-word,.wtc-repo-label,.wtc-service-label'), item => item.x);
  for (const header of all('.wtc-collection-card>summary,.wtc-collection>header>div:first-child')) {
    const controls = header.querySelector('.wtc-header-controls');
    if (controls) edges.push({ name: 'header trailing controls', actual: box(controls).right, expected: box(header).right - parseFloat(getComputedStyle(header).paddingRight) });
    group('header text baseline', 'y', [...header.querySelectorAll('.wtc-brand-word,.wtc-brand-suffix,.wtc-header-feedback,.wtc-action-toolbar button')], item => item.baseline);
    const reference = text(header.querySelector('.wtc-brand-word'));
    if (!reference) continue;
    const icons = [...header.querySelectorAll('.wtc-header-controls>button,.wtc-header-controls>span:last-child')];
    if (header.closest('.wtc-collection')) icons.push(...header.querySelectorAll('button'));
    for (const node of icons) {
      const svg = node.querySelector('svg'), ink = text(node);
      if (!svg && (!ink || !/^[↻⤢⌃⌄]$/.test(ink.text))) continue;
      const b = svg?.getBBox(), middle = svg ? new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform(svg.getScreenCTM()).y : ink.inkMiddle;
      opticalPairs.push({ name: `header icon ${node.title || ink?.text || 'collapse'}`, ...box(node), middle, capMiddle: reference.capMiddle, xMiddle: reference.xMiddle, capDelta: middle - reference.capMiddle, xDelta: middle - reference.xMiddle });
    }
  }
  for (const [i, row] of all('.wtc-repo-identity').entries()) {
    const identity = row.parentElement, label = row.querySelector('.wtc-repo-label');
    group(`repository ${i + 1} baseline`, 'y', [...row.children], item => item.baseline);
    const facts = identity.querySelector('.wtc-repo-facts');
    rows.push({ name: label?.textContent ?? `repository ${i + 1}`, ...box(identity), emptyFactBand: !!facts && !facts.textContent.trim() });
  }
  for (const [i, icon] of all('.wtc-lead-icon').entries()) {
    const grid = icon.closest('.wtc-table');
    let cell = icon;
    while (grid && cell.parentElement !== grid) cell = cell.parentElement;
    const cells = grid ? [...grid.children] : [], cols = Number(grid?.getAttribute('data-columns'));
    const start = grid ? Math.floor(cells.indexOf(cell) / cols) * cols : 0;
    const service = cells.slice(start, start + cols).map(node => node.querySelector('.wtc-service-label')).find(Boolean);
    const label = icon.closest('a[aria-label="taba home"]')?.querySelector('.wtc-brand-word')
      ?? icon.closest('.wtc-repo-identity')?.querySelector('.wtc-repo-label') ?? service;
    const metrics = text(label);
    if (!metrics) continue;
    const bounds = box(icon), svg = icon.querySelector('svg'), glyph = text(icon);
    let middle = glyph?.inkMiddle ?? bounds.y + bounds.height / 2;
    if (svg) {
      const ink = svg.getBBox(), matrix = svg.getScreenCTM();
      middle = new DOMPoint(ink.x + ink.width / 2, ink.y + ink.height / 2).matrixTransform(matrix).y;
    }
    opticalPairs.push({ name: `leading icon ${i + 1} (${metrics.text})`, ...bounds, middle, capMiddle: metrics.capMiddle, xMiddle: metrics.xMiddle, capDelta: middle - metrics.capMiddle, xDelta: middle - metrics.xMiddle });
  }
  for (const [i, repositories] of all('.wtc-repositories').entries()) {
    for (const glyph of ['↑', '↓']) {
      const icons = all('.wtc-count-icon', repositories).filter(node => node.textContent.trim() === glyph);
      group(`repository table ${i + 1} ${glyph} ink rail`, 'x', icons, item => item.glyphCenterX);
    }
  }
  for (const [i, grid] of all('.wtc-table').entries()) {
    const cols = Number(grid.getAttribute('data-columns')), cells = [...grid.children];
    for (let start = cols; start < cells.length; start += cols) {
      const firstLine = cells.slice(start, start + cols);
      group(`table ${i + 1} row ${start / cols} baseline`, 'y', firstLine, item => item.baseline);
    }
  }
  for (const [role, selector] of [
    ['brand', '.wtc-brand-word'], ['collection', '.wtc-collection>header>div:nth-child(2)'], ['section', 'h3'], ['repository', '.wtc-repo-label'], ['service', '.wtc-service-label'],
    ['branch', '.wtc-repo-branch'], ['fact', '.wtc-count-value'], ['action', '.wtc-next-step button'],
  ]) for (const node of all(selector)) {
    const metrics = text(node); if (!metrics) continue;
    const style = getComputedStyle(node);
    hierarchy.push({ role, ...metrics, contrastRatio: contrast(node), background: style.backgroundColor, filled: rgba(style.backgroundColor)[3] > 0 });
  }
  const missing = all('.wtc-repositories').length && !all('.wtc-repo-label').length ? ['Visible repository table has no semantic name anchors'] : [];
  return { groups, opticalPairs, rows, hierarchy, missing, edges, bounds: box(root) };
}

// Separate screenshot layer: blue baseline, green optical middle, pink shared rails.
export function mountVisualGuides(audit) {
  document.querySelector('[data-wtc-visual-guides]')?.remove();
  const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('data-wtc-visual-guides', '');
  svg.setAttribute('width', String(innerWidth)); svg.setAttribute('height', String(innerHeight));
  svg.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:visible';
  const line = (x1, y1, x2, y2, color, dashed = false) => {
    const n = document.createElementNS(ns, 'line');
    for (const [key, value] of Object.entries({ x1, y1, x2, y2, stroke: color, 'stroke-width': 1, ...(dashed ? { 'stroke-dasharray': '3 3' } : {}) })) n.setAttribute(key, String(value));
    svg.append(n);
  };
  for (const group of audit.groups) {
    if (group.axis === 'x') {
      const values = group.members.map(item => item.value), x = values.reduce((a, b) => a + b, 0) / values.length;
      line(x, Math.min(...group.members.map(item => item.y)) - 5, x, Math.max(...group.members.map(item => item.bottom)) + 5, '#ff4f91');
    }
    for (const item of group.members) {
      if (group.axis === 'x' && group.spread > .75) line(item.value, item.y - 5, item.value, item.bottom + 5, '#ff6262', true);
      else if (group.axis === 'y') line(item.x, item.value, item.right, item.value, '#66b5ff');
    }
  }
  for (const pair of audit.opticalPairs) {
    line(pair.x - 3, pair.capMiddle, pair.right + 3, pair.capMiddle, '#64edb0');
    line(pair.x - 3, pair.middle, pair.right + 3, pair.middle, '#ffbf61', true);
  }
  document.body.append(svg);
}

// Render after recording has stopped. The original PNG remains untouched, and
// no diagnostic layer ever enters the screencast or changes product geometry.
export function visualGuideSvg(audit, imageDataUrl, viewport, crop) {
  if (!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(imageDataUrl)) throw Error('Guides require an embedded PNG');
  const lines = [];
  const line = (x1, y1, x2, y2, color, dashed = false) => {
    if (![x1, y1, x2, y2].every(Number.isFinite)) throw Error('Invalid guide coordinates');
    lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1"${dashed ? ' stroke-dasharray="3 3"' : ''}/>`);
  };
  for (const group of audit.groups) {
    if (group.axis === 'x' && group.members.length) {
      const x = group.members.reduce((sum, item) => sum + item.value, 0) / group.members.length;
      line(x, Math.min(...group.members.map(item => item.y)) - 5, x, Math.max(...group.members.map(item => item.bottom)) + 5, '#ff4f91');
    }
    for (const item of group.members) {
      if (group.axis === 'x' && group.spread > .75) line(item.value, item.y - 5, item.value, item.bottom + 5, '#ff6262', true);
      else if (group.axis === 'y') line(item.x, item.value, item.right, item.value, '#66b5ff');
    }
  }
  for (const pair of audit.opticalPairs) {
    line(pair.x - 3, pair.capMiddle, pair.right + 3, pair.capMiddle, '#64edb0');
    line(pair.x - 3, pair.middle, pair.right + 3, pair.middle, '#ffbf61', true);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${crop.width}" height="${crop.height}" viewBox="${crop.x} ${crop.y} ${crop.width} ${crop.height}"><image width="${viewport.width}" height="${viewport.height}" href="${imageDataUrl}"/>${lines.join('')}</svg>`;
}

export function visualAuditReport(audit, svg) {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const rows = audit.hierarchy.map(item => `<tr><td>${escape(item.role)}</td><td>${escape(item.text)}</td><td>${item.fontSize}</td><td>${item.fontWeight}</td><td>${item.contrastRatio.toFixed(2)}</td><td>${item.filled ? 'filled' : 'quiet'}${item.clipped ? ' · ellipsis' : ''}</td></tr>`).join('');
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Visual rails and hierarchy</title><style>body{font:14px system-ui;margin:24px;background:#101318;color:#ddd}label{margin-right:16px}figure{margin:20px 0;overflow:auto}svg{display:block}table{border-collapse:collapse}td,th{text-align:left;padding:6px 12px;border-bottom:1px solid #30343c}th{color:#aaa}p{max-width:900px}</style><h1>Visual rails and hierarchy</h1><p>Separate diagnostic artifact. Pink: shared rails. Blue: text baselines. Green: declared cap-height middles. Amber: measured icon ink middles. Toggle the guides and compare the unannotated layout. These groups have explicit meanings; unrelated elements need not share a line.</p><label><input id="rails" type="checkbox" checked>Rails</label><label><input id="baselines" type="checkbox" checked>Baselines</label><label><input id="middles" type="checkbox" checked>Optical middles</label><figure>${svg}</figure><p>${audit.errors.length} alignment errors · ${audit.warnings.length} hierarchy/density warnings</p><ul>${audit.errors.concat(audit.warnings).map(value => `<li>${escape(value)}</li>`).join('')}</ul><h2>Hierarchy evidence</h2><p>Font size, weight, contrast and filled surfaces are evidence for review, not a taste score. Check whether the right controls dominate and whether within-group spacing is smaller than spacing between groups.</p><table><thead><tr><th>Role</th><th>Text</th><th>Size</th><th>Weight</th><th>Contrast</th><th>Surface</th></tr></thead><tbody>${rows}</tbody></table><script>for(const [id,colors] of [['rails',['#ff4f91','#ff6262']],['baselines',['#66b5ff']],['middles',['#64edb0','#ffbf61']]])document.getElementById(id).onchange=event=>{for(const line of document.querySelectorAll('svg line'))if(colors.includes(line.getAttribute('stroke')))line.style.display=event.target.checked?'':'none'};</script>`;
}

// A fixed crop for the whole clip preserves growth and never hides movement.
export function recordingCrop(samples, width, height, padding = 8) {
  if (!samples.length || !Number.isInteger(width) || !Number.isInteger(height)) throw Error('Crop requires measured content and integer viewport dimensions');
  const top = Math.max(0, Math.floor((Math.min(...samples) - padding) / 2) * 2);
  if (!Number.isFinite(top) || top >= height) throw Error('Invalid capture bounds');
  return { x: 0, y: top, width: width - width % 2, height: height - top - (height - top) % 2 };
}
