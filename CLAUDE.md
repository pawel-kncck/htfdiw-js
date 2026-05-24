# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An educational static site ("JS Under the Hood") that explains how JavaScript runs in the browser, aimed at intermediate developers. The central goal is to disentangle four concepts that get mashed together in most mental models: **the JS runtime, the event loop, Web APIs, and the task queue**. Planned scope also covers the call stack & execution contexts, microtasks vs macrotasks, the rendering pipeline, and a brief Node.js contrast.

The site is published on GitHub Pages from `main`.

## Hard constraints

- **Vanilla only.** HTML, CSS, and JavaScript — no build step, no framework, no npm dependencies, no bundler. This is ideological for the project (a JS-internals guide built with the very thing it's explaining) and also keeps GitHub Pages deployment trivial. Do not add `package.json`, Tailwind, a static site generator, or a JS framework without explicit user direction.
- **Runnable code examples are inline.** Each snippet on the site should have a Run button that executes in-page; don't replace them with static `<pre>` blocks. This is core to the pedagogy — readers see event-loop ordering with their own eyes.
- **Interactivity is mixed by section.** The main architecture page is interactive (clickable/animated diagram); deeper sections may use animated or static visuals as the concept warrants. Don't make everything a simulator, and don't make everything static.

## Tone

Friendly but rigorous. Plain language up front, spec references (ECMAScript / HTML Living Standard) where precision matters. Avoid both dry academic prose and over-casual filler.

## Local development

No tooling. Open `index.html` directly, or serve the directory:

```sh
python3 -m http.server 8000
```

## Status

Very early. As of this writing the repo contains only the README — no `index.html` yet. The architecture page is the planned first build.
