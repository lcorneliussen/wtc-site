---
layout: ../layouts/Story.astro
title: Why taba
description: I wanted my agent conversations to work across repositories. This is how that grew into Taba.
author: Lars Corneliussen
updated: '2026-10-28'
chapters:
  - id: a-folder-for-the-conversation
    title: A folder for the conversation
  - id: copying-the-approach
    title: Copying the approach
  - id: a-versioned-cli
    title: A versioned CLI
  - id: reviewing-the-work
    title: Reviewing the work
  - id: running-the-work
    title: Running the work
  - id: opening-it-up-to-more-people
    title: Opening it up to more people
  - id: a-name-people-remember
    title: A name people remember
  - id: what-i-want-harnesses-to-understand
    title: What I want harnesses to understand
milestones:
  - date: '2026-08-17'
    label: 17 Aug 2026
    title: The reference boilerplate
    sources:
      - label: Seed of the worktree-collection reference
        url: https://github.com/lcorneliussen/wtc-boilerplate/commit/5e1ee925506d9c0618aba39b12572ec305a229f8
  - date: '2026-09-02'
    label: 2 Sep 2026
    title: Tests for the shell tools
    sources:
      - label: Harness test suite with real worktree fixtures
        url: https://github.com/lcorneliussen/wtc-boilerplate/commit/97953ece09c317faf3f8acee93a2e8bbb2d79267
  - date: '2026-09-29'
    label: 29 Sep 2026
    title: CLI extraction and local reviews
    sources:
      - label: CLI skeleton and first migrated command
        url: https://github.com/lcorneliussen/wtc-cli/commit/237def7cb6884f8c237f673b8a2c088fec89dd8f
      - label: Separate review before a draft PR becomes ready
        url: https://github.com/lcorneliussen/wtc-boilerplate/commit/607b0a94de0b6e9958e1d45a6865ddf7ed226b73
  - date: '2026-10-06'
    label: 6 Oct 2026
    title: A smaller harness and a collection runtime
    sources:
      - label: Product and project ownership in the small-harness design
        url: https://github.com/lcorneliussen/wtc-cli/blob/579b66280f1b4cc391b4731dd0022703cb4ce651/docs/harness-design.md
      - label: Opt-in runtime, status and resource cleanup
        url: https://github.com/lcorneliussen/wtc-cli/commit/68e8a66da212ed0351e0f85f141eba3d09d4ea40
  - date: '2026-10-14'
    label: 14 Oct 2026
    title: Services and a collection conversation in OpenClaw
    sources:
      - label: The svc commands for services and tunnels
        url: https://github.com/lcorneliussen/wtc-cli/commit/1a27f2bbfaea2626be6877437b01e2b4ef856878
      - label: One conversation working across the collection
        url: https://github.com/lcorneliussen/wtc-cli/commit/b63857c0a84c573387d493c80ff4b9f041106068
  - date: '2026-10-19'
    label: 19 Oct 2026
    title: OpenClaw integration reaches main
    sources:
      - label: The merged host-mode integration
        url: https://github.com/lcorneliussen/wtc-cli/commit/2cb70fe6facb8fb4239ffbad81bec4586b3b22a0
  - date: '2026-10-26'
    label: 26 Oct 2026
    title: The site adopts the taba name
    sources:
      - label: Site branding and canonical domain change
        url: https://github.com/lcorneliussen/wtc-site/commit/41853b3776c287d0f2320434b6c61e689c02df52
---

<div class="story-intro">

I liked working in Claude Code and Codex. I could keep several conversations going, each with its own Git worktree. But a task that crossed repositories left me with a question: where should the conversation start?

The harness would manage a worktree for the main repository. I could get an agent to create more worktrees in subfolders, but I had to keep track of them. I also wanted separate projects to stay separate in the UI. Sharing my screen with one team should not put every other project on display.

Taba grew out of those problems. A worktree collection gives a task one folder containing a worktree for each repository it needs.

</div>

<section class="chapter" data-chapter="a-folder-for-the-conversation" aria-labelledby="a-folder-for-the-conversation">

<p class="chapter-number" aria-hidden="true">01</p>

## A folder for the conversation

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

</section>

<section class="chapter" data-chapter="copying-the-approach" aria-labelledby="copying-the-approach">

<p class="chapter-number" aria-hidden="true">02</p>

## Copying the approach

As a consultant, I began using the approach on more projects. I was hesitant to introduce another tool, so I copied code. The scripts lived in each project and ran there.

The boilerplate gave me a place to share and sync the approach. Each team could adapt its copy to its repositories and workflow. An agent could bring improvements across and reconcile the differences.

As more people used it, those differences became harder to track. Generic tools, project settings and custom behavior lived together. A change to a shared script could require another round of comparing and syncing copies.

</section>

<section class="chapter" data-chapter="a-versioned-cli" aria-labelledby="a-versioned-cli">

<p class="chapter-number" aria-hidden="true">03</p>

## A versioned CLI

The tooling became too important to depend on that process alone. More teammates were using it, and I needed better testing and stability.

I first added tests to the boilerplate. Agents copied the tests along with the scripts during a sync. Eventually I moved the common tooling into a versioned CLI.

That gave me a clear split between product, configuration and customization. The CLI could own the shared behavior. A harness repository could describe the team's repositories and keep its policies and hooks.

Those differences were necessary. Some projects used Bitbucket, others GitHub. Teams chose different agents. One application needed a database and port assignments when a worktree was initialized; another needed no such setup. The idea for worktree initialization came from Codex's initialization scripts.

Hooks and extension points let those projects keep their behavior while sharing a tested tool. A pinned release also made it possible to say which version of that tool a harness used.

</section>

<section class="chapter" data-chapter="reviewing-the-work" aria-labelledby="reviewing-the-work">

<p class="chapter-number" aria-hidden="true">04</p>

## Reviewing the work

I was producing more pull requests, and review became a bottleneck for the team.

I had used Copilot reviews on GitHub. I started running adversarial agent reviews locally too, with rounds of fixes and further review before sending a PR to a teammate. I wanted agents to take more of the review load, with tooling and criteria we could customize.

Taba was a natural place for that tooling because an effective review often needs several repositories. To review this site, it helps to have the CLI it documents alongside it. To review a frontend change, it helps to inspect the backend API it calls.

Taba ships reusable review concerns. They can be ejected for customization, and a harness or application repository can contribute further concerns. The shared runner handles the review process while the project's concerns say what needs attention.

</section>

<section class="chapter" data-chapter="running-the-work" aria-labelledby="running-the-work">

<p class="chapter-number" aria-hidden="true">05</p>

## Running the work

An enterprise development setup can involve several APIs, web applications and databases. Getting them to talk to each other in one environment takes work. Running those setups in ten parallel conversations across several harnesses adds another problem.

Each task needs the right ports, resource configuration and service connections. The agent also needs to know what is running and where its logs are.

By then I was using `herdr --remote`. In my setup, local ports no longer forwarded automatically, so I needed tailnet tunnels. Setting those up was painful when several services depended on each other.

The `svc` module brought service startup, status, logs and tunnels into the collection workflow. It uses the repository's existing launch commands and gives the agent a way to manage them for that task.

I also wanted to show a running result and collect feedback. OpenClaw portals and widgets took work to configure. A tunnel through ngrok, devtunnels or Cloudflare could give me another way to share a demo. Tailnet access and those demo links needed to work with the same collection's services.

</section>

<section class="chapter" data-chapter="opening-it-up-to-more-people" aria-labelledby="opening-it-up-to-more-people">

<p class="chapter-number" aria-hidden="true">06</p>

## Opening it up to more people

We already had useful support tooling with access to code and configured read access to production. A support question would often reach a developer, who would copy it straight into an agent conversation.

We tried giving support staff a developer environment. They were uncomfortable with the terminal and the number of Git repositories to manage. I looked for a way to preconfigure the environment in OpenClaw so they could ask their questions there.

The first setup was read-only, and it worked for a while. When we needed to make changes too, OpenClaw's per-repository managed worktrees needed a collection workflow around them. That led to a fuller WTC plugin, with support for working across repositories and publishing through personal accounts and pull requests.

OpenClaw provides the gateway and sandbox model. Taba connects its collection workflow to that model. Agents can work in a sandbox while the gateway handles authorized access to external infrastructure such as GitHub or Bitbucket.

Support was one use case. I also wanted the setup to work for trusted occasional contributors, team automation and automated reviews. I had been thinking about OpenClaw's multiplayer mode. Later, I discovered the benefit of escalating a support session to a developer who could continue the same conversation.

I want to extend the gateway integration to Jira and Confluence through TWG as well. That is future work.

</section>

<section class="chapter" data-chapter="a-name-people-remember" aria-labelledby="a-name-people-remember">

<p class="chapter-number" aria-hidden="true">07</p>

## A name people remember

I named team repositories with the pattern `*-agent-harness` and called the tooling `wtc`. In conversations, people remembered "the harness". They did not remember `wtc`.

I wanted a name people could remember, including when they needed to type a command. A little branding would make the tooling easier to introduce and talk about.

Taba came out of an agent-led brainstorming session. It felt better. The Japanese word means a bundle, which fits a collection of repositories for one task.

I had started the site on `wtc.sh` and changed it to `taba.sh` soon afterward. The website name and the CLI migration have separate timelines. The [rename guide](../wtc-is-now-taba/) tracks the command and configuration transition.

</section>

<section class="chapter" data-chapter="what-i-want-harnesses-to-understand" aria-labelledby="what-i-want-harnesses-to-understand">

<p class="chapter-number" aria-hidden="true">08</p>

## What I want harnesses to understand

<p class="story-aim">I would like agent harnesses to work with collections of worktrees as smoothly as they work with a single repository.</p>

When I start a conversation about a change, I want it to have the right checkouts of the repositories involved. I want to run their services together and give reviewers the context needed to judge the change.

</section>
