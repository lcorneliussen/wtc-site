---
layout: ../layouts/Story.astro
title: Why taba
description: One task, several repositories. Scattered worktrees, parallel environments and a growing review queue led to taba.
author: Lars Corneliussen
updated: '2026-10-29'
---

<ol class="problem-timeline">

<li class="problem" id="early" aria-labelledby="early-title">
<p class="problem-date"><span>Before herdr</span></p>
<div class="problem-body">

<h2 id="early-title">Agents hate multirepo setups</h2>
<p class="problem-subline">Most agents assume your project is one repo. A frontend and its API already make two.</p>

<details class="problem-detail" aria-labelledby="early-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

A frontend change needs its API. A site change needs the CLI it documents. Which repository should own that conversation? Starting in one makes every other repository an exception to manage.

Separate worktrees helped, but keeping track of them was still manual. New tasks could start from the wrong branch. Unrelated projects shared one interface, which was awkward to show during a call.

A worktree collection gives the task its own folder, with the repositories it needs side by side. Each gets a worktree with an explicit starting point.

<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Still using copy&amp;paste, between harness-repos, no central tool or library.</blockquote>
<div class="post-meta"><time datetime="2026-08-12">12 Aug 2026</time><a href="https://x.com/lcorneliussen/status/2087524799480274987">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/early.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="spaces" aria-labelledby="spaces-title">
<p class="problem-date"><time datetime="2026-08-11">11 Aug 2026</time></p>
<div class="problem-body">

<h2 id="spaces-title">Folders weren't enough</h2>
<p class="problem-subline">Repositories had task folders. Conversations and terminals needed a place of their own.</p>

<details class="problem-detail" aria-labelledby="spaces-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

Collection folders already held the repositories for each task. Cursor was still part of the workflow before the move to herdr spaces.

Herdr grouped the task's terminals and agent conversations into a workspace. The collection had a place on screen as well as a place on disk.

Later, herdr and the tailnet also let work keep running on the office machine while another device connected to it.

<div class="record-links"><span>Herdr</span><ul><li><a href="https://herdr.dev/">Workspaces and remote agents</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/spaces.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="copies" aria-labelledby="copies-title">
<p class="problem-date"><time datetime="2026-08-17">17 Aug 2026</time></p>
<div class="problem-body">

<h2 id="copies-title">Setup kept repeating</h2>
<p class="problem-subline">Each new project meant copying the same scripts and adapting them again.</p>

<details class="problem-detail" aria-labelledby="copies-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

Copying a few scripts into the next project was easier than introducing another tool. A shared boilerplate made it possible to pass improvements between projects while keeping the scripts local.

Then every improvement needed another sync. Teams had adapted their copies, so an agent had to reconcile the differences. Sharing the approach was easy. Keeping the copies in step became work of its own.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/5e1ee925506d9c0618aba39b12572ec305a229f8">17 August. The reference boilerplate</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/copies.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="testing" aria-labelledby="testing-title">
<p class="problem-date"><time datetime="2026-09-02">2 Sep 2026</time></p>
<div class="problem-body">

<h2 id="testing-title">Scripts needed tests</h2>
<p class="problem-subline">Local scripts had become team infrastructure. People needed to trust them.</p>

<details class="problem-detail" aria-labelledby="testing-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

A script used by one developer can depend on that developer knowing its quirks. Teammates need behavior they can rely on.

Tests first travelled with the boilerplate, copied alongside the scripts during each sync. As more people depended on the tooling, it needed a tested, versioned release they could share. That became the CLI.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/97953ece09c317faf3f8acee93a2e8bbb2d79267">2 September. A test suite for the harness</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/testing.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="variants" aria-labelledby="variants-title">
<p class="problem-date"><time datetime="2026-09-29">29 Sep 2026</time></p>
<div class="problem-body">

<h2 id="variants-title">Customizations got mixed in</h2>
<p class="problem-subline">Shared code, project settings and custom behavior were hard to tell apart.</p>

<details class="problem-detail" aria-labelledby="variants-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

One team uses GitHub, another Bitbucket. One application needs a database and assigned ports when a worktree opens. Another needs no initialization at all.

Those differences belong in project configuration. Mixing them into shared scripts made upgrades harder. A local change could be essential customization or an old copy of common code.

The versioned CLI separated the two. Teams could pin the shared tooling and keep their own configuration and hooks.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/237def7cb6884f8c237f673b8a2c088fec89dd8f">29 September. The CLI skeleton</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/blob/579b66280f1b4cc391b4731dd0022703cb4ce651/docs/harness-design.md">6 October. A smaller harness with explicit project ownership</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/variants.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="reviews" aria-labelledby="reviews-title">
<p class="problem-date"><time datetime="2026-09-29">29 Sep 2026</time></p>
<div class="problem-body">

<h2 id="reviews-title">Reviews fell behind</h2>
<p class="problem-subline">Agents produced PRs faster than the team could review them.</p>

<details class="problem-detail" aria-labelledby="reviews-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

Faster coding filled the review queue. More agent-written PRs left teammates with more code to review.

Local adversarial reviews added rounds of criticism and fixes before human review. Those reviews needed the same cross-repository context as the work itself. A frontend reviewer needs to see the API it calls.

Taba's review tooling runs inside the worktree collection. Its built-in review concerns can be copied out for customization, and an agent harness or application repository can add its own.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/607b0a94de0b6e9958e1d45a6865ddf7ed226b73">29 September. Separate review before a draft PR became ready</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/reviews.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="services" aria-labelledby="services-title">
<p class="problem-date"><time datetime="2026-10-06">6 Oct 2026</time></p>
<div class="problem-body">

<h2 id="services-title">Environments multiplied</h2>
<p class="problem-subline">One development environment was enough work. Ten parallel conversations needed ten working setups.</p>

<details class="problem-detail" aria-labelledby="services-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

An API, a web application and a database have to talk to each other. Run several tasks in parallel and each needs the right ports and service connections. Move the work to a remote machine and tunnels become part of the setup too.

A demo link should reach the services for the task being shown. An agent needs to know which processes are running and where to find their logs.

The `svc` module brings startup, status, logs and tunnels into the collection, using each repository's existing launch commands.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/68e8a66da212ed0351e0f85f141eba3d09d4ea40">6 October. Collection runtime and resource cleanup</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/1a27f2bbfaea2626be6877437b01e2b4ef856878">14 October. Services and tunnels through svc</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/services.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="support" aria-labelledby="support-title">
<p class="problem-date"><time datetime="2026-10-14">14 Oct 2026</time></p>
<div class="problem-body">

<h2 id="support-title">Support needed developers</h2>
<p class="problem-subline">Support questions reached developers, who copied them straight into agent conversations.</p>

<details class="problem-detail" aria-labelledby="support-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

The agent already had the code and configured read access it needed to investigate support questions.

Giving support a development environment didn't fix the handoff. The terminal and the repositories were work they weren't comfortable managing.

A preconfigured OpenClaw setup let support ask directly. Read-only access came first. Making changes then needed worktrees across repositories, personal commits and pull requests. Taba supplied that collection workflow. A developer could also join the same session when a question needed escalation.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/b63857c0a84c573387d493c80ff4b9f041106068">14 October. One conversation across a collection</a></li><li><a href="https://github.com/lcorneliussen/wtc-cli/commit/2cb70fe6facb8fb4239ffbad81bec4586b3b22a0">19 October. The host-mode integration reached main</a></li></ul></div>


<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Creating my first @openclaw plugin to support multi-repository work via wtc.</blockquote>
<div class="post-meta"><time datetime="2026-10-14">14 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2110439039463751749">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/support.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="name" aria-labelledby="name-title">
<p class="problem-date"><time datetime="2026-10-26">26 Oct 2026</time></p>
<div class="problem-body">

<h2 id="name-title">Nobody remembered wtc</h2>
<p class="problem-subline">People called everything "the harness". The name wtc never stuck.</p>

<details class="problem-detail" aria-labelledby="name-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

The repositories were called agent harnesses. The tooling was called wtc. In conversation, everything became "the harness".

A useful command still needs a name people remember. Taba gave it one, with commands like `taba open` and `taba status`. The site moved from `wtc.sh` to `taba.sh` soon afterward.

The [rename guide](../wtc-is-now-taba/) covers the command and configuration transition.

<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-site/commit/41853b3776c287d0f2320434b6c61e689c02df52">26 October. The site adopted the taba name</a></li></ul></div>


<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Horrible name.</blockquote>
<div class="post-meta"><time datetime="2026-10-06">6 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2107368417787269264">View post <span aria-hidden="true">↗</span></a></div>
</aside>
<aside class="post-card" aria-label="Post by Lars Corneliussen">
<div class="post-author"><span class="post-avatar" aria-hidden="true">LC</span><span><strong>Lars Corneliussen</strong><small>@lcorneliussen</small></span></div>
<blockquote>Everyone agent deserves monorepos, even the ones that don&#x27;t have them...</blockquote>
<div class="post-meta"><time datetime="2026-10-26">26 Oct 2026</time><a href="https://x.com/lcorneliussen/status/2114785403844850159">View post <span aria-hidden="true">↗</span></a></div>
</aside>
</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/name.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

</ol>
