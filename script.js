(() => {
  'use strict';

  const PIECES = {
    'call-stack': {
      kicker: '01 · Inside the Engine',
      title: 'The <em>Call Stack</em>',
      body: `
        <p>The call stack is JavaScript&rsquo;s record of <strong>which function is running right now</strong>. Every call pushes a frame on top; every <code>return</code> pops one off. Strict LIFO.</p>
        <p>There is only one of these &mdash; JavaScript is single-threaded. While a frame sits on top, <em>nothing else can run</em>. A long synchronous loop blocks the page entirely; clicks pile up, the UI stops painting.</p>
        <p>The stack lives <strong>inside the JS engine</strong> (V8, SpiderMonkey, JavaScriptCore). The engine on its own has no concept of &ldquo;later.&rdquo;</p>
      `,
      meta: [
        ['Lives in',  'The JS engine'],
        ['Discipline', 'LIFO (last in, first out)'],
        ['Count',     'Exactly one'],
      ],
    },

    'heap': {
      kicker: '02 · Inside the Engine',
      title: 'The <em>Memory Heap</em>',
      body: `
        <p>An unstructured region where objects, arrays, closures, and other reference values live. The call stack holds frames and local primitives; everything else is a reference <em>into</em> the heap.</p>
        <p>The engine&rsquo;s <strong>garbage collector</strong> reclaims heap memory once a value is no longer reachable from the running program. You don&rsquo;t allocate or free directly.</p>
      `,
      meta: [
        ['Lives in',    'The JS engine'],
        ['Holds',       'Objects, closures, arrays'],
        ['Managed by',  'Garbage collector'],
      ],
    },

    'web-apis': {
      kicker: '03 · Outside the Engine',
      title: 'The <em>Web APIs</em>',
      body: `
        <p>None of these are part of JavaScript. <code>setTimeout</code>, <code>fetch</code>, <code>addEventListener</code>, the entire DOM, <code>geolocation</code>, <code>IntersectionObserver</code> &mdash; the browser <em>exposes</em> them to JS, but they run in the browser&rsquo;s own world.</p>
        <p>When you call <code>fetch()</code>, the engine hands the request to the browser and the call returns immediately. The browser does the actual networking on its own threads. When the response is ready, the browser drops the callback into a queue.</p>
        <p>This is the secret of single-threaded async: <strong>most of what looks like &ldquo;JavaScript doing work&rdquo; is actually the browser doing work.</strong></p>
      `,
      meta: [
        ['Lives in',  'The browser (host env.)'],
        ['Examples',  'DOM, fetch, timers, geo'],
        ['Threading', 'Browser-internal'],
      ],
    },

    'microtask-queue': {
      kicker: '04 · Outside the Engine',
      title: 'The <em>Microtask Queue</em>',
      body: `
        <p>A higher-priority queue, drained <strong>completely</strong> between tasks. Promise <code>.then</code> callbacks, <code>queueMicrotask</code>, and <code>MutationObserver</code> callbacks all land here.</p>
        <p>This is why this snippet logs <code>3</code> before <code>2</code>, even though the timeout is scheduled first:</p>
        <p><code>setTimeout(() =&gt; log(2), 0);<br />Promise.resolve().then(() =&gt; log(3));</code></p>
        <p>After the current task ends, the event loop empties the microtask queue <em>before</em> touching the task queue.</p>
      `,
      meta: [
        ['Drained',   'Completely, each tick'],
        ['Priority',  'Higher than task queue'],
        ['Holds',     'Promise jobs, queueMicrotask'],
      ],
    },

    'task-queue': {
      kicker: '05 · Outside the Engine',
      title: 'The <em>Task Queue</em>',
      body: `
        <p>Where the browser parks callbacks that are ready to run, but can&rsquo;t yet because the call stack is busy. Each entry is a <strong>task</strong>: a <code>setTimeout</code> callback, a click handler, a <code>postMessage</code> handler.</p>
        <p>The event loop takes <em>one task per tick</em>, runs it to completion (along with any microtasks it spawns), and only then considers the next one. This is also called the &ldquo;macrotask&rdquo; queue, to distinguish it from microtasks.</p>
      `,
      meta: [
        ['Drained',   'One task per tick'],
        ['Holds',     'Timeouts, events, messages'],
        ['Also called', 'Macrotask queue'],
      ],
    },

    'event-loop': {
      kicker: '06 · The Orchestrator',
      title: 'The <em>Event Loop</em>',
      body: `
        <p>The whole point. In one sentence: <em>if the call stack is empty, run any pending microtasks to completion, then take the next task from the task queue and run it.</em> Forever.</p>
        <p>The event loop is <strong>not</strong> part of the JavaScript engine. It belongs to the host environment &mdash; the browser, or Node.js, or Deno. The engine just executes whatever the loop hands it.</p>
        <p>This single rule, applied billions of times a second, is how a single-threaded language stays responsive while juggling network, timers, input, and animation.</p>
      `,
      meta: [
        ['Lives in',  'The host (browser/Node)'],
        ['Specified by', 'HTML Living Standard'],
        ['State',     'Always running'],
      ],
    },
  };

  const diagram   = document.getElementById('diagram');
  const explainer = document.getElementById('explainer');
  const initial   = explainer.querySelector('.explainer-empty');

  if (!diagram || !explainer) return;

  let activeId = null;

  const render = (id) => {
    const data = PIECES[id];
    if (!data) return;

    const metaHtml = data.meta
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
      .join('');

    explainer.querySelector('.explainer-inner').innerHTML = `
      <div class="explainer-state" data-state="${id}">
        <p class="explainer-kicker">${data.kicker}</p>
        <h3 class="explainer-title">${data.title}</h3>
        <div class="explainer-body">${data.body}</div>
        <dl class="explainer-meta">${metaHtml}</dl>
      </div>
    `;
  };

  const renderEmpty = () => {
    if (!initial) return;
    explainer.querySelector('.explainer-inner').innerHTML = initial.outerHTML;
  };

  const select = (id) => {
    activeId = id;
    diagram.classList.add('has-selection');
    diagram.querySelectorAll('.piece').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.piece === id);
      el.setAttribute('aria-pressed', el.dataset.piece === id ? 'true' : 'false');
    });
    render(id);
  };

  const clear = () => {
    activeId = null;
    diagram.classList.remove('has-selection');
    diagram.querySelectorAll('.piece').forEach((el) => {
      el.classList.remove('is-active');
      el.setAttribute('aria-pressed', 'false');
    });
    renderEmpty();
  };

  diagram.addEventListener('click', (e) => {
    const piece = e.target.closest('.piece');
    if (!piece) return;
    const id = piece.dataset.piece;
    if (!id) return;
    if (id === activeId) {
      clear();
    } else {
      select(id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeId) {
      clear();
    }
  });

  // initial aria state
  diagram.querySelectorAll('.piece').forEach((el) => {
    el.setAttribute('aria-pressed', 'false');
  });
})();
