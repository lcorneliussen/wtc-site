---
layout: ../layouts/Story.astro
title: Why taba
description: One task, several repositories. Parallel work needs more than separate worktrees. Taba helps keep the repos, environments and reviews together.
author: Lars Corneliussen
updated: '2026-10-29'
---

<ol class="problem-timeline">

<li class="problem" id="ide-workflows" aria-labelledby="ide-workflows-title">
<p class="problem-date" data-rail-label="IDEs"><span>IDE workflows</span></p>
<div class="problem-body">

<h2 id="ide-workflows-title">Tools work together</h2>
<p class="problem-subline">Several repos, several IDEs. Agents can work across them.</p>

<div class="detail-copy">

Cursor, Claude Code and Codex work alongside Rider, WebStorm and DataGrip. IDE terminals work well, and agents can make changes in other repositories too.

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/ide-workflows.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="parallel-features" aria-labelledby="parallel-features-title">
<p class="problem-date" data-rail-label="Rails"><span>Rails app</span></p>
<div class="problem-body">

<h2 id="parallel-features-title">Parallel work clicks</h2>
<p class="problem-subline">One conversation, one worktree, one running Rails app. Several features at once.</p>

<div class="detail-copy">

With a Rails app, Claude and Codex manage a worktree and full app for each conversation. Several features can move forward at once.

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/parallel-features.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="early" aria-labelledby="early-title">
<p class="problem-date" data-rail-label="Repos"><span>Before herdr</span></p>
<div class="problem-body">

<h2 id="early-title">Agents hate multirepo setups</h2>
<p class="problem-subline">That parallel workflow is harder to get on projects spread across several repositories.</p>

<div class="detail-copy">

On larger projects, a frontend still needs its API. Agents can edit both. Giving each conversation its own working setup across those repos takes more effort.

Which repository should own the conversation? Where should its worktrees live?

Separate worktrees help, but keeping track of them is still manual. A new task can start from the wrong branch. Unrelated projects share one interface, which is awkward to show during a call.

A worktree collection gives the task its own folder, with the repositories it needs side by side. Bare repository owners hold the shared history. Every working checkout is a worktree, with an explicit starting point.

<div class="x-post" data-x-post="2089078288043934198" data-x-media="hidden">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>None of the agent clis or desktop apps handle multi-repo well.</blockquote>
<div class="post-meta"><time datetime="2026-08-16">16 Aug 2026</time><a href="https://x.com/lcorneliussen/status/2089078288043934198">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>

<div class="record-links"><span>Public record</span><ul><li><a href="https://x.com/lcorneliussen/status/2105924161562423589">2 October. Working only in worktrees</a></li></ul></div>
</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/early.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="spaces" aria-labelledby="spaces-title">
<p class="problem-date"><time datetime="2026-08-11">11 Aug 2026</time></p>
<div class="problem-body">

<h2 id="spaces-title">Folders aren't enough</h2>
<p class="problem-subline">Repositories have task folders. Conversations and terminals need a place of their own.</p>

<div class="detail-copy">

Herdr gives each collection its own terminals and conversations, whatever agent is running. Work can keep running at the office while another computer connects.

Collection folders came first. Herdr was installed on 11 August. On [17 August](https://x.com/lcorneliussen/status/2089256065393127485), hitting a plan limit prompted one project's move away from the Codex app.

By 1 September, herdr was helping coordinate parallel work across projects.

By [4 September](https://x.com/lcorneliussen/status/2095853356983943262), remote herdr sessions were already running from Omarchy.

As work spread across more computers, the SER8 became the daily driver. The MacBook Pro kept work running at the office.

<div class="x-post" data-x-post="2094789074930250013" data-x-media="hidden">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>I&#x27;ve started pimping my terminal with herdr goodness. Works really well.</blockquote>
<div class="post-meta"><time datetime="2026-09-01">1 Sep 2026</time><a href="https://x.com/lcorneliussen/status/2094789074930250013">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>

<div class="record-links"><span>Herdr</span><ul><li><a href="https://x.com/lcorneliussen/status/2089338151445708881">17 August. Side-by-side computers and input handoff</a></li><li><a href="https://herdr.dev/">Workspaces and remote agents</a></li></ul></div>

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/spaces.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="copies" aria-labelledby="copies-title">
<p class="problem-date"><time datetime="2026-08-17">17 Aug 2026</time></p>
<div class="problem-body">

<h2 id="copies-title">Setup keeps repeating</h2>
<p class="problem-subline">Each new project means copying the same scripts and adapting them again.</p>

<div class="detail-copy">

Copying a few scripts into the next project is easier than introducing another tool. A shared boilerplate lets teams pass improvements between projects while keeping the scripts local.

Adding a site and gallery took [weeks.app](https://weeks.app/) beyond one repository too. The boilerplate gave those repositories the same way of working.

On 16 August, I suggested worktree collections to Tommy Vedvik as an idea for Unpeel. A storefront, design system and marketing site illustrated the problem. The outline and reference implementation were public the next day.

Every improvement needs another sync. Teams adapt their copies, so an agent has to reconcile the differences. Sharing the approach is easy. Keeping the copies in step is work of its own.

<div class="record-links"><span>Public record</span><ul><li><a href="https://x.com/lcorneliussen/status/2088213391663935920">14 August. Building another tool</a></li><li><a href="https://x.com/lcorneliussen/status/2089249901792092434">17 August. One project, three repositories</a></li><li><a href="https://x.com/lcorneliussen/status/2089310051223638106">17 August. The public reference implementation</a></li></ul></div>

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/copies.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="testing" aria-labelledby="testing-title">
<p class="problem-date"><time datetime="2026-09-02">2 Sep 2026</time></p>
<div class="problem-body">

<h2 id="testing-title">Scripts need tests</h2>
<p class="problem-subline">Local scripts become team infrastructure. People need to trust them.</p>

<div class="detail-copy">

A script used by one developer can depend on that developer knowing its quirks. Teammates need behavior they can rely on.

Tests first travelled with the boilerplate, copied alongside the scripts during each sync. As more people depended on the tooling, it needed a tested, versioned release they could share. That became the CLI.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/97953ece09c317faf3f8acee93a2e8bbb2d79267">2 September. A test suite for the harness</a></li></ul></div>

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/testing.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="variants" aria-labelledby="variants-title">
<p class="problem-date"><time datetime="2026-09-29">29 Sep 2026</time></p>
<div class="problem-body">

<h2 id="variants-title">Customizations get mixed in</h2>
<p class="problem-subline">Shared code, project settings and custom behavior are hard to tell apart.</p>

<div class="detail-copy">

One team uses GitHub, another Bitbucket. One application needs a database and assigned ports when a worktree opens. Another needs no initialization at all.

Those differences belong in project configuration. Mixing them into shared scripts makes upgrades harder. A local change can be essential customization or an old copy of common code.

The versioned CLI separates the two. Teams can pin the shared tooling and keep their own configuration and hooks.

<div class="x-post" data-x-post="2107369079929545065" data-x-media="hidden">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>I really didn&#x27;t want to create sth - but now I can&#x27;t live without.</blockquote>
<div class="post-meta"><time datetime="2026-10-06">6 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2107369079929545065">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/237def7cb6884f8c237f673b8a2c088fec89dd8f">29 September. The CLI skeleton</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/blob/579b66280f1b4cc391b4731dd0022703cb4ce651/docs/harness-design.md">6 October. A smaller harness with explicit project ownership</a></li></ul></div>

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/variants.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="reviews" aria-labelledby="reviews-title">
<p class="problem-date"><time datetime="2026-09-29">29 Sep 2026</time></p>
<div class="problem-body">

<h2 id="reviews-title">Reviews fall behind</h2>
<p class="problem-subline">Agents produce PRs faster than the team can review them.</p>

<div class="detail-copy">

<div class="x-post" data-x-post="2025228278160637970" data-x-media="hidden">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Now running claudes new /security-review before i have OC post it to a public repo.</blockquote>
<div class="post-meta"><time datetime="2026-02-21">21 Feb 2026</time><a href="https://x.com/lcorneliussen/status/2025228278160637970">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>

Faster coding fills the review queue. More agent-written PRs leave teammates with more code to review.

Agent reviews were already being used in February. The September tooling made independent rounds part of preparing a PR.

Local adversarial reviews add rounds of criticism and fixes before human review. Those reviews need the same cross-repository context as the work itself. A frontend reviewer needs to see the API it calls.

Taba's review tooling runs inside the worktree collection. Its built-in review concerns can be copied out for customization, and an agent harness or application repository can add its own.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/607b0a94de0b6e9958e1d45a6865ddf7ed226b73">29 September. Separate review before a draft PR became ready</a></li></ul></div>

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/reviews.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="services" aria-labelledby="services-title">
<p class="problem-date"><time datetime="2026-10-10">10 Oct 2026</time></p>
<div class="problem-body">

<h2 id="services-title">Environments multiply</h2>
<p class="problem-subline">One development environment is enough work. Ten parallel conversations need ten working setups.</p>

<div class="detail-copy">

An API, a web application and a database have to talk to each other. Run several tasks in parallel and each needs the right ports and service connections. Move the work to a remote machine and tunnels become part of the setup too.

Parallel application stacks also consume memory. By [10 October](https://x.com/lcorneliussen/status/2108966803879948716), even a 64 GB MacBook Pro could run out. Four days later, the 24 GB SER8 was struggling too, largely with browser profiles and web apps. Most harnesses were already running elsewhere.

A demo link should reach the services for the task being shown. An agent needs to know which processes are running and where to find their logs.

The `svc` module brings startup, status, logs and tunnels into the collection, using each repository's existing launch commands.

<div class="x-post" data-x-post="2110253789001232860" data-x-media="visible">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>My SER8 with 24 GB just can&#x27;t keep up</blockquote>
<div class="post-meta"><time datetime="2026-10-14">14 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2110253789001232860">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/68e8a66da212ed0351e0f85f141eba3d09d4ea40">6 October. Collection runtime and resource cleanup</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/1a27f2bbfaea2626be6877437b01e2b4ef856878">14 October. Services and tunnels through svc</a></li></ul></div>

</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/services.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="support" aria-labelledby="support-title">
<p class="problem-date"><time datetime="2026-10-14">14 Oct 2026</time></p>
<div class="problem-body">

<h2 id="support-title">Support needs developers</h2>
<p class="problem-subline">Support questions reach developers, who copy them straight into agent conversations.</p>

<div class="detail-copy">

The agent already has the code and configured read access it needs to investigate support questions.

Giving support a development environment doesn't fix the handoff. The terminal and the repositories are work they aren't comfortable managing.

A preconfigured OpenClaw setup lets support ask directly, with read-only access first. OpenClaw was already in use by [February](https://x.com/lcorneliussen/status/2024521439244599733). The October plugin added multi-repository work for teams, with commits and pull requests handled through the gateway for the user who requested them. The same session can also be escalated to a developer.

<div class="record-links"><span>Public record</span><ul><li><a href="https://x.com/lcorneliussen/status/2110439039463751749">14 October. The collection plugin announcement</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/b63857c0a84c573387d493c80ff4b9f041106068">14 October. One conversation across a collection</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/2cb70fe6facb8fb4239ffbad81bec4586b3b22a0">19 October. The host-mode integration reached main</a></li></ul></div>

<div class="x-post" data-x-post="2110439731540775194" data-x-media="hidden">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Agents run in sandbox with readonly, commiting and PRs are handled via the gateway, tied to the OC user triggering it.</blockquote>
<div class="post-meta"><time datetime="2026-10-14">14 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2110439731540775194">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>
</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/support.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="name" aria-labelledby="name-title">
<p class="problem-date"><time datetime="2026-10-26">26 Oct 2026</time></p>
<div class="problem-body">

<h2 id="name-title">Nobody remembers wtc</h2>
<p class="problem-subline">People call everything "the harness". The name wtc is hard to remember.</p>

<div class="detail-copy">

The repositories are called agent harnesses. In conversation, everything is "the harness". The tooling needs a name of its own.

A useful command still needs a name people remember. Taba gives it one, with commands like `taba open` and `taba status`. The site moved from `wtc.sh` to `taba.sh` soon afterward.

The [rename guide](../wtc-is-now-taba/) covers the command and configuration transition.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-site/commit/41853b3776c287d0f2320434b6c61e689c02df52">26 October. The site adopted the taba name</a></li></ul></div>

<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Horrible name.</blockquote>
<div class="post-meta"><time datetime="2026-10-06">6 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2107368417787269264">View post <span aria-hidden="true">↗</span></a></div>
</aside>
<div class="x-post" data-x-post="2114785403844850159" data-x-media="hidden">
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Everyone agent deserves monorepos, even the ones that don&#x27;t have them...</blockquote>
<div class="post-meta"><time datetime="2026-10-26">26 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2114785403844850159">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>
</div>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/name.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

</ol>
