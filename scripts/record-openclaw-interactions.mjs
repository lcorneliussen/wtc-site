// Record actual plugin controls with synthetic responses; never connect to a live gateway.
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile, readdir, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, join, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const usage = 'Usage: npm run demos:openclaw:interactions -- /path/to/wtc-cli [output-directory] [push|stale|individual|batch]';
if (process.argv.includes('--help')) { console.log(usage); process.exit(0); }
if (!process.argv[2] || process.argv.length > 5) throw Error(usage);
const siteRoot = new URL('../', import.meta.url);
const upstream = resolve(process.argv[2]);
const modulePath = 'openclaw-plugin/dist/control-ui/v1/index.js';
const revision = execFileSync('git', ['-C', upstream, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (execFileSync('git', ['-C', upstream, 'status', '--porcelain', '--', modulePath], { encoding: 'utf8' }).trim()) throw Error('Capture requires an unchanged upstream UI module');
const renderer = await readFile(join(upstream, modulePath), 'utf8');
const template = await readFile(new URL('scripts/demos/openclaw.html', siteRoot), 'utf8');
const output = pathToFileURL(resolve(process.argv[3] ?? fileURLToPath(new URL('artifacts/openclaw-interactions', siteRoot))) + sep);
const selected = process.argv[4];
const scenarios = [
  ['01-push-create-pr', 'Push, confirmation, PR creation and fresh status', 'push'],
  ['02-push-stale-status', 'Controlled reproduction: stale status after a successful push', 'stale'],
  ['03-individual-catch-up', 'Three quick repository clicks: current individual catch-up flow', 'individual'],
  ['04-collection-catch-up', 'One collection shortcut: current batch catch-up flow', 'batch'],
];
if (selected && !scenarios.some(s => s[2] === selected)) throw Error(usage);
await mkdir(output, { recursive: true });
if ((await readdir(output)).length) throw Error('Output directory must be empty; use a new directory for each take');
const browser = await chromium.launch({ headless: true });
const manifest = { created: new Date().toISOString(), kind: 'Actual upstream renderer with synthetic gateway responses; not a live gateway', repository: 'https://github.com/lcorneliussen/wtc-cli', revision, modulePath, playwright: JSON.parse(await readFile(new URL('node_modules/playwright/package.json', siteRoot), 'utf8')).version, browser: browser.version(), rendererSha256: createHash('sha256').update(renderer).digest('hex'), simulation: true, recordings: [] };
try {
  for (const [id, title, mode] of scenarios.filter(s => !selected || s[2] === selected)) {
    const dir = new URL(`${id}/`, output); await mkdir(dir, { recursive: true });
    const isPush = mode === 'push' || mode === 'stale';
    const rows = isPush
      ? [{ repo: 'web', owner: 'example-org', forge: 'bitbucket', sessionKey: 'demo:web', branch: 'feature/search', base: 'origin/main', ahead: 3, behind: 0, unpublished: 3, dirty: 0 }]
      : ['api', 'web', 'docs'].map((name, i) => {
        const next = { repo: name, step: 'catch-up', by: 'wtc', reason: `${[12, 7, 3][i]} new on main`, command: ['wtc', 'catch-up'], key: `${name}:catch-up:h1` };
        return { repo: name, owner: 'example-org', forge: 'github', sessionKey: `demo:${name}`, branch: null, base: 'origin/main', ahead: 0, behind: [12, 7, 3][i], unpublished: 0, dirty: 0, next, choices: { recommended: next.key, actions: [{ ...next, available: true }] } };
      });
    if (!/ repos:\[.*\],\n services:\[.*\]/.test(template) || !template.includes('const request = async (method, params) => {')) throw Error('Shared fixture changed; update interaction fixture injection');
    let html = template.replace(/ repos:\[.*\],\n services:\[.*\]/, ` repos:${JSON.stringify(rows)},\n services:[]`);
    html = html.replace('<h1>One task. Every repository.</h1>', `<h1>${title}</h1>`)
      .replace('wtc for OpenClaw · real plugin renderer, synthetic demo data', `Renderer ${revision.slice(0, 7)} · simulated gateway · no real publication`)
      .replace('Expand the collection card to see changes, pull requests and previews.', 'Ready. All controls below belong to the unchanged upstream renderer.')
      .replace('</footer>', '</footer><div id="rpc"><strong>Recording harness — request / response trace</strong><div id="events"></div></div><div id="cursor"></div>');
    html = html.replace('</style>', `h1{font-size:23px}#stage>p{font-size:14px}#card{margin-top:70px}#caption{font-size:15px;min-height:52px;margin-top:26px;color:#e4eaf2}#rpc{font:12px/1.55 ui-monospace,monospace;margin-top:22px;padding:12px 16px;border:1px solid #354151;border-radius:10px;color:#aab7c9}#rpc strong{font:600 12px system-ui;color:#8edbd5}#events{margin-top:6px;min-height:92px}#cursor{position:fixed;left:0;top:0;width:18px;height:18px;margin:-9px;border:2px solid #ffd06a;border-radius:50%;pointer-events:none;z-index:99999;box-shadow:0 0 0 3px #ffd06a22}#cursor.click{background:#ffd06a77}footer{margin-top:12px;font-size:11px}</style>`);
    html = html.replace('const request = async (method, params) => {', `
const mode = ${JSON.stringify(mode)};
const delay = ms => new Promise(resolve=>setTimeout(resolve,ms));
window.calls=[]; window.completed=[]; window.published=false; let staleLeft=0;
const trace = text => {window.calls.push({at:Date.now(),text});const e=document.querySelector('#events');e.replaceChildren(...window.calls.slice(-5).map(c=>Object.assign(document.createElement('div'),{textContent:c.text})));};
window.setCaption = text => document.querySelector('#caption').textContent=text;
document.addEventListener('mousemove',e=>{const c=document.querySelector('#cursor');c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';});
document.addEventListener('mousedown',()=>document.querySelector('#cursor').classList.add('click'));
document.addEventListener('mouseup',()=>setTimeout(()=>document.querySelector('#cursor').classList.remove('click'),160));
const request = async (method, params) => {
 if(method==='plugins.sessionAction'&&params.actionId==='collection') {
  trace('→ collection status requested');await delay(700);
  const snapshot=structuredClone(data);
  if(window.published && staleLeft>0){staleLeft--;snapshot.repos[0].unpublished=3;trace('← INJECTED STALE snapshot: PR #8 exists, unpublished=3');}
  else trace('← status: '+snapshot.repos.map(r=>r.repo+' behind='+r.behind+' unpublished='+(r.unpublished??0)).join(' · '));
  return {ok:true,result:snapshot};
 }
 if(method==='plugins.sessionAction'&&params.pluginId==='bitbucket') {
  if(params.actionId==='publish-options')return {ok:true,result:{account:{user:'demo@example.invalid',name:'Demo User'}}};
  if(params.actionId==='publish'){trace('→ prepare publication / request confirmation');await delay(1000);trace('← personal confirmation required');return {ok:true,result:{status:'needs_confirmation',requestId:'demo-publish',confirmation:{account:'demo@example.invalid',name:'Demo User',requestDigest:'demo-digest',branch:'feature/search',head:'abcdef0123456789',dest:'main'}}};}
  if(params.actionId==='publish-confirm'){
   trace('→ confirmed: push commits and create draft PR');await delay(2200);
   window.published=true;staleLeft=mode==='stale'?1:0;
   Object.assign(data.repos[0],{unpublished:0,pullRequest:{number:8,url:'https://example.invalid/web/pull-requests/8',state:'open',draft:true,title:'Add search',checks:'pending',running:1}});
   trace('← published: created draft PR #8');return {ok:true,result:{status:'published',created:true,url:'https://example.invalid/web/pull-requests/8'}};
  }
 }
 if(method==='plugins.sessionAction'&&['next','catch-up'].includes(params.actionId)) {
  const key=params.payload?.ownerSessionKey??params.sessionKey;
  const r=data.repos.find(r=>r.sessionKey===key);if(!r)throw Error('Unknown synthetic repository');
  const before=structuredClone(r);trace('→ '+r.repo+': '+params.actionId);
  await delay(mode==='individual'?{api:2600,web:3800,docs:5200}[r.repo]:1900);
  r.behind=0;delete r.next;r.choices={actions:[]};window.completed.push(r.repo);
  trace('← '+r.repo+': caught up (exit 0)');
  return {ok:true,result:{performed:params.actionId==='next',repo:before,code:0,json:{summary:r.repo+': caught up'},message:''}};
 }
`);
    const context = await browser.newContext({ locale: 'en-US', timezoneId: 'UTC', deviceScaleFactor: 1, viewport: { width: 1120, height: 760 }, recordVideo: { dir: fileURLToPath(dir), size: { width: 1120, height: 760 } } });
    const errors=[];
    await context.route('**/*', route => {
      const url=route.request().url();
      if(url==='https://demo.invalid/')return route.fulfill({contentType:'text/html',body:html});
      if(url==='https://demo.invalid/plugin.js')return route.fulfill({contentType:'text/javascript',body:renderer});
      errors.push('Unexpected network: '+url);return route.abort();
    });
    const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
    await page.goto('https://demo.invalid/'); await page.locator('#card details').waitFor();
    if(!await page.locator('#card details').evaluate(n=>n.open))await page.locator('#card summary').press('Enter');
    const surface=page.locator('#card');
    const caption=async text=>page.evaluate(text=>window.setCaption(text),text);
    const click=async locator=>{const b=await locator.boundingBox();if(!b)throw Error('Missing click target');await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:15});await page.waitForTimeout(300);await locator.click();};
    await page.waitForTimeout(1400);
    if(isPush){
      await caption('Three local commits are ready to push. First click prepares the personal publication confirmation.');
      await click(surface.getByTitle(/^3 commits to push/));
      await surface.getByText('confirm ↑ 3',{exact:true}).waitFor();await page.waitForTimeout(1500);
      await caption('Second click confirms publication. The plugin pauses its periodic status refresh while pushing.');
      await click(surface.getByText('confirm ↑ 3',{exact:true}));
      await page.waitForFunction(()=>window.published);await page.waitForTimeout(1400);
      if(mode==='stale'){
        await surface.getByTitle(/^3 commits to push/).waitFor();
        await caption('Controlled stale response: the draft PR appears, but ↑ 3 returns. The renderer trusts the returned unpublished count.');
        await page.screenshot({path:fileURLToPath(new URL('stale-frame.png',dir))});await page.waitForTimeout(3000);
        await caption('Manual refresh receives the current status. The push arrow disappears without another push.');
        await click(surface.getByTitle(/Updated .* Refresh/));
        await page.waitForFunction(()=>!document.querySelector('#card')?.textContent.includes('↑ 3'));
      }else{
        if(await surface.getByTitle(/^3 commits to push/).count())throw Error('Fresh status left push available');
        await caption('Fresh status: draft PR #8 is visible, and the push arrow stays gone. This recording did not contact a forge.');
      }
      await page.waitForTimeout(2800);
    }else if(mode==='individual'){
      await caption('Click each behind-count in quick succession. These controls use the older direct catch-up route.');
      for(const n of [12,7,3]) await click(surface.getByTitle(new RegExp('^'+n+' new on main\\. Catch up locally')));
      await caption('Three independent requests are in flight. Each completion can replace the shared top-line message.');
      await page.waitForFunction(()=>window.completed.length===3);await page.waitForTimeout(1300);
      await caption('All three completed in this simulation. The direct count controls did not create sidebar Action log entries.');
      await page.waitForTimeout(3000);
    }else{
      await caption('The collection shortcut captures all three suggested catch-ups in one click.');
      await click(surface.locator('.wtc-action-toolbar button').filter({hasText:'Catch up 3'}).first());
      await caption('Current batch behavior: queued repositories are processed sequentially, with a shared 0/3 → 3/3 result.');
      await page.waitForFunction(()=>window.completed.length===3);await page.waitForTimeout(1600);
      await caption('The batch completed. Its result opens the Action log in the sidebar.');
      await click(surface.getByText('✓ Caught up 3',{exact:true}));
      await page.locator('#panel .wtc-activity-log').waitFor();await page.waitForTimeout(2400);
      if(await page.locator('#panel .wtc-activity-log').getByText('Completed',{exact:true}).count()!==3)throw Error('Missing completion records');
    }
    if(errors.length)throw Error(errors.join('\n'));
    await page.screenshot({path:fileURLToPath(new URL('final.png',dir))});
    const trace=await page.evaluate(()=>window.calls);await writeFile(new URL('trace.json',dir),JSON.stringify(trace,null,2));
    const video=page.video();await context.close();
    const videoName=id+'.webm';
    await rename(await video.path(),new URL(videoName,output));
    const verifier=await browser.newContext();
    try {
      const check=await verifier.newPage();
      await check.goto(new URL(videoName,output).href);
      await check.waitForFunction(()=>{const v=document.querySelector('video');return v&&v.readyState>=2&&v.duration>0;});
    } finally { await verifier.close(); }
    manifest.recordings.push({id,title,mode,video:videoName,poster:id+'/final.png',assertions:'passed',requests:trace});
    await writeFile(new URL('manifest.json',output),JSON.stringify(manifest,null,2));
    console.log(id+': recorded and decoded '+videoName);
  }
  const escape = text => String(text).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const cards=manifest.recordings.map(r=>`<article><h2>${escape(r.title)}</h2><video controls preload="none" playsinline poster="${r.poster}" src="${r.video}"></video><p><a href="${r.video}">Video</a> · <a href="${r.id}/trace.json">Request trace</a></p></article>`).join('');
  await writeFile(new URL('index.html',output),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OpenClaw interaction recordings</title><style>:root{color-scheme:dark}body{max-width:1120px;margin:32px auto;padding:0 24px;font:16px/1.6 system-ui;background:#11161d;color:#e4eaf2}h2{font-size:20px}article{margin:32px 0;border:1px solid #354151;border-radius:12px;padding:16px}video{width:100%;height:auto}a{color:#8edbd5}</style><h1>OpenClaw interaction recordings</h1><p>Actual renderer ${escape(revision)}; synthetic repositories and simulated gateway responses. No live gateway or publication. The stale scenario deliberately injects old status; it does not establish a live gateway defect. Silent clips have visible captions and request traces.</p>${cards}<p><a href="manifest.json">Renderer provenance and results</a></p></html>`);
  console.log('Gallery: '+fileURLToPath(new URL('index.html',output)));
} finally { await browser.close(); }
