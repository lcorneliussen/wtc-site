// Record actual plugin controls with synthetic responses; never connect to a live gateway.
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile, readdir, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, join, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const usage = 'Usage: npm run demos:openclaw:interactions -- /path/to/wtc-cli [output-directory] [push|stale|individual|batch|all] [--view card|chat|sidebar|split] [--width 390] [--sidebar-width 320]';
const { values, positionals } = parseArgs({ allowPositionals: true, options: { help: { type: 'boolean' }, view: { type: 'string', default: 'card' }, width: { type: 'string', default: '1120' }, 'sidebar-width': { type: 'string', default: '420' } } });
if (values.help) { console.log(usage); process.exit(0); }
if (!positionals[0] || positionals.length > 3) throw Error(usage);
const view = values.view, width = Number(values.width), sidebarWidth = Number(values['sidebar-width']);
if (!['card', 'chat', 'sidebar', 'split'].includes(view) || !Number.isInteger(width) || width < 320 || width > 2560) throw Error(usage);
if (!Number.isInteger(sidebarWidth) || sidebarWidth < 320 || sidebarWidth > 800) throw Error(usage);
if (view === 'split' && (width < 900 || width - sidebarWidth < 320)) throw Error('Split view needs width >= 900 and at least 320 pixels left for chat; use chat or sidebar on mobile');
const siteRoot = new URL('../', import.meta.url);
const upstream = resolve(positionals[0]);
const modulePath = 'openclaw-plugin/dist/control-ui/v1/index.js';
const revision = execFileSync('git', ['-C', upstream, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (execFileSync('git', ['-C', upstream, 'status', '--porcelain', '--', modulePath], { encoding: 'utf8' }).trim()) throw Error('Capture requires an unchanged upstream UI module');
const renderer = await readFile(join(upstream, modulePath), 'utf8');
const openKey = renderer.match(/const OPEN_KEY = "([^"]+)"/)?.[1];
if (!openKey) throw Error('Renderer open-state contract changed; update the fixture');
const template = await readFile(new URL('scripts/demos/openclaw.html', siteRoot), 'utf8');
const output = pathToFileURL(resolve(positionals[1] ?? fileURLToPath(new URL('artifacts/openclaw-interactions', siteRoot))) + sep);
const selected = positionals[2] === 'all' ? undefined : positionals[2];
const scenarios = [
  ['01-push-create-pr', 'Push, confirmation, PR creation and fresh status', 'push'],
  ['02-push-stale-status', 'Controlled reproduction: stale status after a successful push', 'stale'],
  ['03-individual-catch-up', 'Three quick repository clicks: current individual catch-up flow', 'individual'],
  ['04-collection-catch-up', 'One collection shortcut: current batch catch-up flow', 'batch'],
];
if (selected && !scenarios.some(s => s[2] === selected)) throw Error(usage);
await mkdir(output, { recursive: true });
if ((await readdir(output)).length) throw Error('Output directory must be empty; use a new directory for each take');
const inject = (html, anchor, replacement) => {
  if (!html.includes(anchor)) throw Error('Shared fixture injection boundary changed: ' + anchor);
  return html.replace(anchor, replacement);
};
const browser = await chromium.launch({ headless: true });
const manifest = { created: new Date().toISOString(), kind: 'Actual upstream renderer with synthetic gateway responses; not a live gateway', repository: 'https://github.com/lcorneliussen/wtc-cli', revision, modulePath, playwright: JSON.parse(await readFile(new URL('node_modules/playwright/package.json', siteRoot), 'utf8')).version, browser: browser.version(), rendererSha256: createHash('sha256').update(renderer).digest('hex'), simulation: true, view, sidebarWidth: view === 'split' ? sidebarWidth : null, viewport: { width, height: 900 }, recordings: [] };
try {
  for (const [id, title, mode] of scenarios.filter(s => !selected || s[2] === selected)) {
    const dir = new URL(`${id}/`, output); await mkdir(dir, { recursive: true });
    const isPush = mode === 'push' || mode === 'stale';
    const rows = isPush
      ? [{ repo: 'web', owner: 'example-org', forge: 'bitbucket', sessionKey: 'demo:web', branch: 'feature/search', base: 'origin/main', ahead: 3, behind: 0, unpublished: 3, dirty: 0, pullRequests: [{number:2,state:'merged',title:'Earlier task',url:'https://example.invalid/web/pull-requests/2'}] }]
      : ['api', 'web', 'docs'].map((name, i) => {
        const next = { repo: name, step: 'catch-up', by: 'wtc', reason: `${[12, 7, 3][i]} new on main`, command: ['wtc', 'catch-up'], key: `${name}:catch-up:h1` };
        return { repo: name, owner: 'example-org', forge: 'github', sessionKey: `demo:${name}`, branch: null, base: 'origin/main', ahead: 0, behind: [12, 7, 3][i], unpublished: 0, dirty: 0, next, choices: { recommended: next.key, actions: [{ ...next, available: true }] } };
      });
    if (!/ repos:\[.*\],\n services:\[.*\]/.test(template) || !template.includes('const request = async (method, params) => {')) throw Error('Shared fixture changed; update interaction fixture injection');
    let html = template.replace(/ repos:\[.*\],\n services:\[.*\]/, ` repos:${JSON.stringify(rows)},\n services:[{group:'web/preview',path:'web/preview',repo:'web',kind:'service',label:'Preview',state:'ready',url:'http://127.0.0.1:4321'}]`);
    html = inject(html, 'const request = async (method, params) => {', `
const mode = ${JSON.stringify(mode)};
const delay = ms => new Promise(resolve=>setTimeout(resolve,ms));
window.calls=[]; window.completed=[]; window.published=false; let staleLeft=0, initialStatus=true;
const trace = text => window.calls.push({at:Date.now(),text});
const request = async (method, params) => {
 if(method==='plugins.sessionAction'&&params.actionId==='collection') {
  trace('→ collection status requested');if(!initialStatus)await delay(700);initialStatus=false;
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
    html = inject(html, "mounts.panel(document.querySelector('#panel'),ctx);", "window.demoPanel?.dispose(); document.querySelector('#panel').replaceChildren(); window.demoPanel=mounts.panel(document.querySelector('#panel'),ctx);");
    html = inject(html, '<div id="stage">', `<body class="${view}"><div id="stage">`);
    html = inject(html, '</style>', `:root{--bg:#0e1015;--bg-hover:#1f2330;--card:#161920;--text:#bcbcc0;--text-strong:#f4f4f5;--muted:#8b8b94;--border:#1e2028;--border-strong:#2e3040;--link:color-mix(in srgb,#ff7070 85%,var(--text));--accent:#ff5c5c;--accent-foreground:#fff;--primary:#d13c3c;--primary-foreground:#fff;--radius-sm:6px;--font-body:'Instrument Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}body{padding:16px;background:var(--bg);font-family:var(--font-body)}a{color:var(--link)}#stage{max-width:none;height:calc(100dvh - 32px);display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;gap:0}#stage>h1,#stage>p,footer{display:none!important}#card{grid-column:1;grid-row:2;min-height:0;max-height:100%;display:flex;flex-direction:column;justify-content:flex-end}#card>.wtc-collection-card,#card>.composer{flex:none}#card>.wtc-transient-actions{flex:0 1 auto;min-height:0}#panel{border-radius:14px;height:calc(100dvh - 32px);overflow:auto}#recording-chat{display:${view === 'card' || view === 'sidebar' ? 'none' : 'grid'};grid-column:1;grid-row:1;min-height:0;overflow:auto;align-content:end;gap:18px;padding:24px 12px;font-size:14px}.recording-bubble{max-width:80%;padding:12px 16px;border-radius:14px}.recording-user{justify-self:end;background:color-mix(in srgb,var(--accent) 12%,var(--bg))}.recording-assistant{justify-self:start;color:var(--text)}.composer{width:100%;margin:12px auto 0;padding:14px 20px}body.sidebar #stage{display:block}body.sidebar #card{display:none!important}body.sidebar #panel{display:block!important}body.split #stage{grid-template-columns:minmax(0,1fr) ${sidebarWidth}px;column-gap:16px}body.split #panel{display:block!important;grid-column:2;grid-row:1/3;height:100%}</style>`);
    html = inject(html, '<div id="card">', '<div id="recording-chat"><div class="recording-bubble recording-user">Please update the collection and its pull request.</div><div class="recording-bubble recording-assistant">I’ll check the repositories and preserve your work.</div></div><div id="card">');
    if (view === 'split') html = inject(html, "document.querySelector('#card').hidden=true;", "document.body.classList.add('split');");
    if (view === 'sidebar' || view === 'split') html = inject(html, "mounts.card(document.querySelector('#card'),ctx);", "mounts.card(document.querySelector('#card'),ctx); host.ui.openPanel();");
    // Put the deferred module in the head as a render blocker. Its first
    // in-memory snapshot and expanded state settle before the first paint.
    const boot=html.match(/<script type="module">[\s\S]*?<\/script>/)?.[0];
    if(!boot)throw Error('Shared fixture module boundary changed');
    html=inject(html,boot,'');
    html=inject(html,'<style>',boot.replace('<script type="module">','<script type="module" blocking="render">')+'<style>');
    const context = await browser.newContext({ locale: 'en-US', timezoneId: 'UTC', deviceScaleFactor: 1, viewport: { width, height: 900 }, recordVideo: { dir: fileURLToPath(dir), size: { width, height: 900 } } });
    await context.addInitScript(key => localStorage.setItem(key, '1'), openKey);
    const errors=[];
    await context.route('**/*', route => {
      const url=route.request().url();
      if(url==='https://demo.invalid/')return route.fulfill({contentType:'text/html',body:html});
      if(url==='https://demo.invalid/plugin.js')return route.fulfill({contentType:'text/javascript',body:renderer});
      errors.push('Unexpected network: '+url);return route.abort();
    });
    const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
    await page.goto('https://demo.invalid/'); await page.locator('#card .wtc-collection-card').waitFor({state:view==='sidebar'?'attached':'visible'});
    if(view!=='sidebar'&&!await page.locator('#card .wtc-collection-card').evaluate(n=>n.open))await page.locator('#card summary').click({position:{x:(await page.locator('#card summary').boundingBox()).width-8,y:8}});

    const surface=page.locator(view === 'sidebar' ? '#panel' : '#card');
    for (const selector of ['#stage > h1', '#caption', '#rpc', '#cursor']) if (await page.locator(selector).isVisible()) throw Error('Recording overlay must stay outside the raw product view: '+selector);
    const click=async locator=>{const b=await locator.boundingBox();if(!b)throw Error('Missing click target');await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.waitForTimeout(300);await locator.click();};
    await surface.locator('.wtc-repositories').waitFor();
    const positions=[];
    const measure=async phase=>{
      const sample=await surface.evaluate(root=>{
        const rect=selector=>{const node=root.querySelector(selector);if(!node)return null;const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
        const grid=root.querySelector('.wtc-repositories>.wtc-table');
        const cells=grid?[...grid.children].slice(Number(grid.getAttribute('data-columns'))).map(node=>{const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}):[];
        const controls=[...root.querySelectorAll('.wtc-action-toolbar .wtc-toolbar-primary, .wtc-action-toolbar>button, .wtc-bulk-actions button')].map(node=>{const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
        const sideRect=selector=>{const node=document.querySelector('#panel '+selector);if(!node)return null;const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
        // Read the first visible glyph and its font ascent without changing
        // the DOM, including when a branch wraps onto several lines.
        const fontMetrics=document.createElement('canvas').getContext('2d');
        const textBaseline = node => {
          if (!node?.getBoundingClientRect().width) return null;
          const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
          let text;
          while(text=walker.nextNode()) if(text.textContent.trim()&&!/^[束…⋯✓⌄⌃↻⤢·■▶+✕±]+$/.test(text.textContent.trim())&&text.parentElement.getBoundingClientRect().width) break;
          if(!text) return null;
          let start=text.textContent.search(/[\p{L}\p{N}]/u);if(start<0)start=text.textContent.search(/\S/);
          const range=document.createRange();range.setStart(text,start);range.setEnd(text,start+1);
          const style=getComputedStyle(text.parentElement);
          fontMetrics.font=style.fontStyle+' '+style.fontWeight+' '+style.fontSize+' '+style.fontFamily;
          const ascent=fontMetrics.measureText(text.textContent[start]).fontBoundingBoxAscent,box=range.getBoundingClientRect();
          if(!Number.isFinite(ascent)||!box.height)throw Error('Browser cannot measure the visible text baseline');
          return {text:text.textContent,baseline:box.y+ascent};
        };
        const baselines=[];
        const check=(name,nodes)=>{
          const values=nodes.map(textBaseline).filter(Boolean);
          baselines.push({name,values,spread:values.length?Math.max(...values.map(v=>v.baseline))-Math.min(...values.map(v=>v.baseline)):0});
        };
        for(const scope of [root,...(document.querySelector('#panel')&&!root.closest('#panel')?[document.querySelector('#panel')]:[])]) {
          const head=scope.querySelector('.wtc-collection-card>summary');
          if(head)check('header',[head.querySelector('.wtc-brand-word'),...[...head.querySelectorAll('span')].filter(n=>n.textContent==='Collection'),head.querySelector('.wtc-header-feedback'),...head.querySelectorAll('.wtc-summary-facts>*'),...head.querySelectorAll('.wtc-action-toolbar button')]);
          const side=scope.querySelector('.wtc-collection>header>div:first-child');
          if(side)check('sidebar header',[...side.children]);
          for(const grid of scope.querySelectorAll('.wtc-table')) {
            const cols=Number(grid.getAttribute('data-columns')),cells=[...grid.children].slice(cols);
            for(let i=0;i<cells.length;i+=cols)check('table '+cols+' row '+i,cells.slice(i,i+cols));
          }
          for(const facts of scope.querySelectorAll('.wtc-repo-facts')) {
            const cells=[...facts.children],separatePR=getComputedStyle(cells.at(-1)).gridColumnEnd==='-1';
            check('repository facts',separatePR?cells.slice(0,-1):cells);
          }
          for(const all of scope.querySelectorAll('.wtc-bulk-actions'))check('all repositories',[all.querySelector('span'),...all.querySelectorAll('button')]);
        }
        return {baselines,controls,sideHeader:sideRect('.wtc-collection>header'),sideRepositories:sideRect('.wtc-repositories>.wtc-table'),sideServices:sideRect('.wtc-base-services'),header:rect('.wtc-collection-card>summary, .wtc-collection>header'),repositories:rect('.wtc-repositories>.wtc-table'),services:rect('.wtc-base-services'),composer:rect('.composer'),temporary:rect('.wtc-transient-actions'),cells};
      });
      for(const group of sample.baselines)if(group.spread>.25)throw Error(`Text baselines differ: ${view}/${mode}/${phase}/${group.name}: ${JSON.stringify(group.values)}`);
      positions.push({phase,...sample});
      await writeFile(new URL('layout-positions.json',dir),JSON.stringify(positions,null,2));
      await page.screenshot({path:fileURLToPath(new URL(phase+'.png',dir))});
      if(sample.temporary){
        if(view==='sidebar') {if(sample.services && sample.temporary.y<sample.services.y+sample.services.height-1)throw Error('Sidebar temporary content displaced Services');}
        else if(sample.header && sample.temporary.y+sample.temporary.height>sample.header.y+1)throw Error('Composer temporary content must extend above its fixed header');
      }
      if(positions.length>1){
        if(positions[0].cells.length!==sample.cells.length)throw Error('Fixture repository slots disappeared');
        if(positions[0].controls.length!==sample.controls.length)throw Error('Fixed toolbar controls disappeared');
        sample.controls.forEach((cell,i)=>{for(const axis of ['x','y','width','height'])if(Math.abs(positions[0].controls[i][axis]-cell[axis])>1)throw Error(`Toolbar control moved: ${view}/${mode}/${phase}/${i}/${axis}: ${positions[0].controls[i]?.[axis]} -> ${cell[axis]}`);});
        sample.cells.forEach((cell,i)=>{for(const axis of ['x','y','width','height'])if(Math.abs(positions[0].cells[i][axis]-cell[axis])>1)throw Error(`Repository slot moved: ${view}/${mode}/${phase}/${i}/${axis}`);});
      }
      if(positions.length>1)for(const key of ['header','repositories','services','composer','sideHeader','sideRepositories','sideServices']){
        const before=positions[0][key],after=sample[key];if(!before||!after)continue;
        for(const axis of ['x','y','width','height'])if(Math.abs(before[axis]-after[axis])>1)throw Error(`Base layout moved: ${view}/${mode}/${phase}/${key}/${axis}: ${before[axis]} -> ${after[axis]}`);
      }
    };
    const waitForSettledRepositories=()=>page.waitForFunction(selector=>{
      const root=document.querySelector(selector);
      return root && ![...root.querySelectorAll('.wtc-repositories button, .wtc-step-status')].some(n=>/^\d+ new on main/.test(n.title)||/Working…|Catching up…|Running…|Rechecking…|Queued/.test(n.textContent));
    },view==='sidebar'?'#panel':'#card');
    await page.waitForTimeout(1400);await measure('idle');
    if(isPush){
      await click(surface.getByTitle(/^3 commits to push/));
      await surface.getByRole('button',{name:/^Confirm the captured push/}).waitFor();await surface.locator('.wtc-confirm-publication:enabled').waitFor();await measure('confirmation');await page.waitForTimeout(1500);
      await click(surface.getByRole('button',{name:/^Confirm the captured push/}));await measure('publishing');
      await page.waitForFunction(()=>window.published);
      await surface.locator('a[href="https://example.invalid/web/pull-requests/8"]').first().waitFor({state:'visible'});
      await surface.locator('.wtc-action-toolbar').getByText('✓ Pushed',{exact:true}).waitFor({state:'visible'});
      if(mode==='stale') await surface.getByTitle(/^3 commits to push/).waitFor();
      else if(await surface.getByTitle(/^3 commits to push/).count())throw Error('Fresh status left push available');
      await measure('published');
      if(mode==='stale'){
        await page.screenshot({path:fileURLToPath(new URL('stale-frame.png',dir))});await page.waitForTimeout(3000);
        await click(surface.getByTitle(view === 'sidebar' ? 'Refresh' : /Updated .* Refresh/));
        await surface.getByTitle(/^3 commits to push/).waitFor({state:'detached'});
        await surface.locator('.wtc-action-toolbar').getByText('✓ Refreshed',{exact:true}).waitFor({state:'visible'});
        await measure('refreshed');
      }
      await page.waitForTimeout(2800);
    }else if(mode==='individual'){
      for(const n of [12,7,3]) await click(surface.getByTitle(new RegExp('^'+n+' new on main\\. Catch up locally')));await measure('running');
      await page.waitForFunction(()=>new Set(window.completed).size===3);await waitForSettledRepositories();await measure('completed');await page.waitForTimeout(1300);
      await page.waitForTimeout(3000);
    }else{
      await click(surface.locator('.wtc-action-toolbar button').filter({hasText:'Catch up 3'}).first());await measure('running');
      await page.waitForFunction(()=>new Set(window.completed).size===3);await waitForSettledRepositories();
      await measure('completed');await page.waitForTimeout(1600);
      if (view==='sidebar'||view==='split') {
        await page.locator('#panel .wtc-activity-log').waitFor();
        if(await page.locator('#panel .wtc-activity-log').getByText('Completed',{exact:true}).count()!==3)throw Error('Missing completion records');
      }
      await page.waitForTimeout(2400);
    }
    if(errors.length)throw Error(errors.join('\n'));
    await page.screenshot({path:fileURLToPath(new URL('final.png',dir))});
    const trace=await page.evaluate(()=>window.calls);await writeFile(new URL('trace.json',dir),JSON.stringify(trace,null,2));
    const video=page.video();await context.close();
    const videoName=id+'.webm';
    await rename(await video.path(),new URL(videoName,output));
    const verifier=await browser.newContext();
    let firstFrame;
    try {
      const check=await verifier.newPage();
      const videoBytes=await readFile(new URL(videoName,output)),idleBytes=await readFile(new URL('idle.png',dir));
      await verifier.route('**/*',route=>{
        const url=route.request().url();
        if(url==='https://recording-check.invalid/')return route.fulfill({contentType:'text/html',body:'<video preload="auto" src="/video.webm"></video><img src="/idle.png">'});
        if(url==='https://recording-check.invalid/video.webm')return route.fulfill({contentType:'video/webm',body:videoBytes});
        if(url==='https://recording-check.invalid/idle.png')return route.fulfill({contentType:'image/png',body:idleBytes});
        return route.abort();
      });
      await check.goto('https://recording-check.invalid/');
      await check.waitForFunction(()=>{const v=document.querySelector('video'),i=document.querySelector('img');return v?.readyState>=2&&v.duration>0&&i?.complete&&i.naturalWidth>0;});
      firstFrame=await check.evaluate(regions=>{
        const video=document.querySelector('video'),image=document.querySelector('img');
        if(video.currentTime!==0||video.videoWidth!==image.naturalWidth||video.videoHeight!==image.naturalHeight)throw Error('First-frame dimensions or timestamp differ');
        const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
        const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const reference=ctx.getImageData(0,0,canvas.width,canvas.height).data;
        ctx.drawImage(video,0,0);const initial=ctx.getImageData(0,0,canvas.width,canvas.height).data;
        return Object.entries(regions).filter(([,r])=>r).map(([name,r])=>{
          let ink=0,matched=0;
          for(let y=Math.max(0,Math.floor(r.y));y<Math.min(canvas.height,Math.ceil(r.y+r.height));y++)for(let x=Math.max(0,Math.floor(r.x));x<Math.min(canvas.width,Math.ceil(r.x+r.width));x++){
            const i=(y*canvas.width+x)*4;
            if(Math.max(reference[i],reference[i+1],reference[i+2])<=110)continue;
            ink++;if(Math.max(Math.abs(reference[i]-initial[i]),Math.abs(reference[i+1]-initial[i+1]),Math.abs(reference[i+2]-initial[i+2]))<=48)matched++;
          }
          if(ink<30||matched/ink<.7)throw Error('Initial video frame lacks the initialized '+name+': '+matched+'/'+ink+' reference text pixels');
          return {name,referenceTextPixels:ink,matchedTextFraction:matched/ink};
        });
      },Object.fromEntries(['header','repositories','services','composer','sideHeader','sideRepositories','sideServices'].map(key=>[key,positions[0][key]])));
    } finally { await verifier.close(); }
    manifest.recordings.push({id,title,mode,video:videoName,poster:id+'/idle.png',assertions:'passed',firstFrame,layoutPositions:positions,requests:trace});
    await writeFile(new URL('manifest.json',output),JSON.stringify(manifest,null,2));
    console.log(id+': recorded and decoded '+videoName);
  }
  const escape = text => String(text).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const cards=manifest.recordings.map(r=>`<article><h2>${escape(r.title)}</h2><video controls preload="none" playsinline poster="${r.poster}" src="${r.video}"></video><p><a href="${r.video}">Video</a> · <a href="${r.id}/trace.json">Request trace</a></p><p>${r.layoutPositions.map(p=>`<a href="${r.id}/${p.phase}.png">${escape(p.phase)}</a>`).join(' · ')}</p></article>`).join('');
  await writeFile(new URL('index.html',output),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OpenClaw interaction recordings</title><style>:root{color-scheme:dark}body{max-width:1120px;margin:32px auto;padding:0 24px;font:16px/1.6 system-ui;background:#11161d;color:#e4eaf2}h2{font-size:20px}article{margin:32px 0;border:1px solid #354151;border-radius:12px;padding:16px}video{width:100%;height:auto}a{color:#8edbd5}</style><h1>OpenClaw interaction recordings</h1><p>View: ${escape(view)}, ${width}px. Actual renderer ${escape(revision)}; synthetic repositories and simulated gateway responses. No live gateway or publication. The stale scenario deliberately injects old status; it does not establish a live gateway defect. Raw product views have no captions or trace overlay; request traces are separate files.</p>${cards}<p><a href="manifest.json">Renderer provenance and results</a></p></html>`);
  console.log('Gallery: '+fileURLToPath(new URL('index.html',output)));
} finally { await browser.close(); }
