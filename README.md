# JS Under the Hood

A learn-by-seeing guide to how JavaScript actually runs in the browser.

Most developers can write JavaScript long before they can explain *how* a single-threaded language manages to handle clicks, timers, fetches, and animations all at once. The usual culprits — **the runtime**, **the event loop**, **Web APIs**, and **the task queue** — get mashed into one fuzzy mental model. This guide pulls them apart.

It's a static site, published on GitHub Pages, built with nothing but HTML, CSS, and the very language it's explaining.

## What you'll learn

- **The architecture**, end to end — what the JS engine does, what the *browser* does, and where the line between them sits.
- **The call stack & execution contexts** — how functions actually run, frame by frame.
- **The event loop** — the rule that makes async possible on a single thread.
- **Web APIs** — the browser-provided machinery (timers, DOM, fetch) that does work *outside* the engine.
- **The task queue & microtask queue** — why `Promise.resolve().then(...)` runs before `setTimeout(..., 0)`, and what that actually means.
- **The rendering pipeline** — how paint, layout, and `requestAnimationFrame` interleave with your code, and why a long task janks the UI.
- **A note on Node.js** — a short contrast section so the browser model doesn't get muddled with `process.nextTick` and libuv.

## Who it's for

Working JavaScript developers who can ship features but want a precise, mechanical understanding of what happens between `addEventListener` and the callback firing. The tone is friendly but rigorous: plain language up front, spec references where it matters.

## How it's built

- **Vanilla** HTML, CSS, and JavaScript. No build step. No framework. No dependencies.
- **Mixed interactivity**: the main architecture page is an interactive diagram you can poke at; deeper sections use animated or static visuals as the concept demands.
- **Runnable code examples**: every snippet has a Run button and executes in-page, so you can see event-loop ordering with your own eyes (and tweak it if you want).
- **Hosted on GitHub Pages**, served straight from `main`.

## Running it locally

No tooling required. Open `index.html` in a browser, or serve the directory with anything that speaks HTTP:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Status

Early. The architecture page is the first thing being built — everything else is planned.

## License

MIT. See [LICENSE](LICENSE).
