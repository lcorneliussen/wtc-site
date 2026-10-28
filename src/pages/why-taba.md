---
layout: ../layouts/Story.astro
title: Why taba
description: These were the problems I ran into while working across repositories with agents. You may recognize some of them.
author: Lars Corneliussen
updated: '2026-10-28'
---

<ol class="problem-timeline">

<li class="problem" id="early" aria-labelledby="early-title">
<p class="problem-date"><time datetime="2026-08-12">12 Aug 2026</time></p>
<div class="problem-body">

<h2 id="early-title">Agents hate multirepo setups</h2>
<p class="problem-subline">Most agents assume your project is one repo. Mine almost never is.</p>

<details class="problem-detail" aria-labelledby="early-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

I liked working in Claude Code and Codex, with a conversation and worktree for each task. But a task that crossed repositories left me choosing where the conversation should start. I also wanted to keep unrelated projects out of view during calls.

My first solution was to choose one repository as the starting point for everything. I gave the agent an index of the other repositories and told it to create worktrees before changing them. The index made access explicit. I did not want an agent wandering into unrelated checkouts and editing them.

At first, the extra worktrees lived under individual repositories. I wanted to avoid nesting worktrees inside worktrees, so I started using a fresh directory for the conversation. Its repository worktrees sat next to each other.

The folder belonged to the task. No application repository had to lead it.

<figure class="collection-map" aria-labelledby="collection-map-caption">
  <div class="collection-owner">
    <span>Shared owners in .bare/</span>
    <code>harness.git</code> <code>api.git</code> <code>web.git</code>
  </div>
  <div class="collection-tasks">
    <div class="task-example">
      <span>Conversation 01</span>
      <strong>fix-checkout/</strong>
      <ul><li><code>harness/</code></li><li><code>api/</code></li><li><code>web/</code></li></ul>
    </div>
    <div class="task-example">
      <span>Conversation 02</span>
      <strong>improve-search/</strong>
      <ul><li><code>harness/</code></li><li><code>api/</code></li><li><code>web/</code></li></ul>
    </div>
  </div>
  <figcaption id="collection-map-caption">Each task has its own worktrees. The bare owners hold the shared Git history and have no working checkout.</figcaption>
</figure>

I also ran into new worktrees starting from the branch I happened to be on, instead of the intended development branch. I wanted every task to start from a deliberate baseline.

I moved the repository owners into `.bare/` and made every checkout a worktree, including the harness. There was no default working checkout accumulating another task's unfinished work. Each task had its own checkouts.

That exposed another dependency on ordinary checkouts. The ignored files with credentials and local configuration were missing. I put them in a separate folder per repository and had agents merge the needed configuration into each worktree.



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

<li class="problem" id="copies" aria-labelledby="copies-title">
<p class="problem-date"><time datetime="2026-08-17">17 Aug 2026</time></p>
<div class="problem-body">

<h2 id="copies-title">Setup kept repeating</h2>
<p class="problem-subline">Each new project meant copying the same scripts and adapting them again.</p>

<details class="problem-detail" aria-labelledby="copies-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

As a consultant, I began using the approach on more projects. I was hesitant to introduce another tool, so I copied code. The scripts lived in each project and ran there.

The boilerplate gave me a place to share and sync the approach. Each team could adapt its copy to its repositories and workflow. An agent could bring improvements across and reconcile the differences.

As more people used it, those differences became harder to track. Generic tools, project settings and custom behavior lived together. A change to a shared script could require another round of comparing and syncing copies.


<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/5e1ee925506d9c0618aba39b12572ec305a229f8">17 August. The reference boilerplate</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/copies.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="testing" aria-labelledby="testing-title">
<p class="problem-date"><time datetime="2026-09-02">2 Sep 2026</time></p>
<div class="problem-body">

<h2 id="testing-title">Teams needed stability</h2>
<p class="problem-subline">More teammates relied on tooling that needed better tests and predictable behavior.</p>

<details class="problem-detail" aria-labelledby="testing-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

The tooling became too important to depend on that process alone. More teammates were using it, and I needed better testing and stability.

I first added tests to the boilerplate. Agents copied the tests along with the scripts during a sync. Eventually I moved the common tooling into a versioned CLI.


<div class="record-links"><span>Public record</span><ul><li><a href="https://github.com/lcorneliussen/wtc-boilerplate/commit/97953ece09c317faf3f8acee93a2e8bbb2d79267">2 September. A test suite for the harness</a></li></ul></div>

</div>
</details>
</div>
<div class="scene-art" aria-hidden="true"><img src="../illustrations/why-taba/testing.svg" alt="" width="420" height="340" loading="lazy" decoding="async"></div>
</li>

<li class="problem" id="variants" aria-labelledby="variants-title">
<p class="problem-date"><time datetime="2026-09-29">29 Sep 2026</time></p>
<div class="problem-body">

<h2 id="variants-title">Variants got mixed</h2>
<p class="problem-subline">Shared code, project settings and custom behavior were hard to tell apart.</p>

<details class="problem-detail" aria-labelledby="variants-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

That gave me a clear split between product, configuration and customization. The CLI could own the shared behavior. A harness repository could describe the team's repositories and keep its policies and hooks.

Those differences were necessary. Some projects used Bitbucket, others GitHub. Teams chose different agents. One application needed a database and port assignments when a worktree was initialized; another needed no such setup. The idea for worktree initialization came from Codex's initialization scripts.

Hooks and extension points let those projects keep their behavior while sharing a tested tool. A pinned release also made it possible to say which version of that tool a harness used.


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

I was producing more pull requests, and review became a bottleneck for the team.

I had used Copilot reviews on GitHub. I started running adversarial agent reviews locally too, with rounds of fixes and further review before sending a PR to a teammate. I wanted agents to take more of the review load, with tooling and criteria we could customize.

Taba was a natural place for that tooling because an effective review often needs several repositories. To review this site, it helps to have the CLI it documents alongside it. To review a frontend change, it helps to inspect the backend API it calls.

Taba ships reusable review concerns. They can be ejected for customization, and a harness or application repository can contribute further concerns. The shared runner handles the review process while the project's concerns say what needs attention.


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
<p class="problem-subline">Ten conversations meant dependent services, databases, ports and remote tunnels to coordinate.</p>

<details class="problem-detail" aria-labelledby="services-title">
<summary><span class="when-closed">Read more</span><span class="when-open">Read less</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4 3 3 3-3" stroke="currentColor" stroke-width="1.5" /></svg></summary>
<div class="detail-copy">

An enterprise development setup can involve several APIs, web applications and databases. Getting them to talk to each other in one environment takes work. Running those setups in ten parallel conversations across several harnesses adds another problem.

Each task needs the right ports, resource configuration and service connections. The agent also needs to know what is running and where its logs are.

By then I was using `herdr --remote`. In my setup, local ports no longer forwarded automatically, so I needed tailnet tunnels. Setting those up was painful when several services depended on each other.

The `svc` module brought service startup, status, logs and tunnels into the collection workflow. It uses the repository's existing launch commands and gives the agent a way to manage them for that task.

I also wanted to show a running result and collect feedback. OpenClaw portals and widgets took work to configure. A tunnel through ngrok, devtunnels or Cloudflare could give me another way to share a demo. Tailnet access and those demo links needed to work with the same collection's services.


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

We already had useful support tooling with access to code and configured read access to production. A support question would often reach a developer, who would copy it straight into an agent conversation.

We tried giving support staff a developer environment. They were uncomfortable with the terminal and the number of Git repositories to manage. I looked for a way to preconfigure the environment in OpenClaw so they could ask their questions there.

The first setup was read-only, and it worked for a while. When we needed to make changes too, OpenClaw's per-repository managed worktrees needed a collection workflow around them. That led to a fuller WTC plugin, with support for working across repositories and publishing through personal accounts and pull requests.

OpenClaw provides the gateway and sandbox model. Taba connects its collection workflow to that model. Agents can work in a sandbox while the gateway handles authorized access to external infrastructure such as GitHub or Bitbucket.

Support was one use case. I also wanted the setup to work for trusted occasional contributors, team automation and automated reviews. I had been thinking about OpenClaw's multiplayer mode. Later, I discovered the benefit of escalating a support session to a developer who could continue the same conversation.

I want to extend the gateway integration to Jira and Confluence through TWG as well. That is future work.


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

I named team repositories with the pattern `*-agent-harness` and called the tooling `wtc`. In conversations, people remembered "the harness". They did not remember `wtc`.

I wanted a name people could remember, including when they needed to type a command. A little branding would make the tooling easier to introduce and talk about.

Taba came out of an agent-led brainstorming session. It felt better. The Japanese word means a bundle, which fits a collection of repositories for one task.

I had started the site on `wtc.sh` and changed it to `taba.sh` soon afterward. The website name and the CLI migration have separate timelines. The [rename guide](../wtc-is-now-taba/) tracks the command and configuration transition.


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
