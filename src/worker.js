import icons from '../dist/icons.json' assert { type: 'json' };

// ---- Layout constants ----
const ICON_SIZE = 48;
const PADDING = 0; // can be changed (or kept at 0)
const GAP = 8;
const BOX = ICON_SIZE;
const RADIUS = 12;
const BG = '#1a1b2e'; // calm dark purple-navy

// ---- Rate limiting config ----
const RATE_LIMIT_MAX = 100; // max requests per IP per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute window
const RATE_LIMIT_CLEANUP_MS = 5 * 60_000; // sweep stale entries every 5 min

// In-memory store: ip -> { count, windowStart }
// NOTE: this lives in a single Worker isolate's memory (no KV/Durable Objects),
// so it is a best-effort, per-isolate limiter rather than a globally accurate
// one — Cloudflare may spin up multiple isolates across colos, each with its
// own counters. That's an intentional trade-off for simplicity, and it still
// meaningfully throttles a single abusive client hammering one isolate.
const rateLimitStore = new Map();
let lastCleanup = Date.now();

// Periodically drop stale entries so the Map doesn't grow unbounded on a
// long-lived (warm) isolate.
function cleanupRateLimitStore(now) {
  if (now - lastCleanup < RATE_LIMIT_CLEANUP_MS) return;
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
  lastCleanup = now;
}

// Fixed-window counter per IP. Returns false once the caller is over budget
// for the current window.
function isRateLimited(ip) {
  const now = Date.now();
  cleanupRateLimitStore(now);
  
  const entry = rateLimitStore.get(ip);
  
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Build a single icon inside a clipped rounded box
function renderIcon(name, x, y, index) {
  const icon = icons[name];
  if (!icon) return '';
  
  const clipId = `clip-${index}`; // unique id per box
  
  return (
    `<g transform="translate(${x}, ${y})">` +
    `<rect width="${BOX}" height="${BOX}" rx="${RADIUS}" fill="${BG}"/>` +
    `<clipPath id="${clipId}"><rect width="${BOX}" height="${BOX}" rx="${RADIUS}"/></clipPath>` +
    `<g clip-path="url(#${clipId})">` +
    // icon.viewBox is produced by our own build-icons.js step (always plain
    // numbers/spaces, e.g. "0 0 24 24") — it's not user input, so escaping it
    // here is unnecessary work on a per-icon, per-request hot path.
    // escapeAttr() itself is left untouched/unremoved in case a future
    // attribute here does need to escape user-influenced data.
    `<svg x="${PADDING}" y="${PADDING}" width="${ICON_SIZE}" height="${ICON_SIZE}" ` +
    `viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>` +
    `</g>` +
    `</g>`
  );
}

function buildSvg(names, perline) {
  const valid = names.filter((n) => icons[n]);
  
  if (valid.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48">` +
      `<text x="8" y="28" font-family="monospace" font-size="13" fill="#e05252">` +
      `No valid icons found</text></svg>`;
  }
  
  const columns = perline && perline > 0 ? Math.min(perline, valid.length) : valid.length;
  const rows = Math.ceil(valid.length / columns);
  
  const width = columns * BOX + (columns - 1) * GAP;
  const height = rows * BOX + (rows - 1) * GAP;
  
  // Collect parts in an array and join once at the end instead of repeated
  // string += concatenation inside the loop (faster, and reads more clearly).
  const parts = [];
  valid.forEach((name, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = col * (BOX + GAP);
    const y = row * (BOX + GAP);
    parts.push(renderIcon(name, x, y, idx));
  });
  
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}" fill="none">${parts.join('')}</svg>`
  );
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname !== '/icons') {
      return new Response('Not found', { status: 404 });
    }
    
    // ---- Simple per-IP rate limiting ----
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Retry-After': '60',
        },
      });
    }
    
    const iParam = url.searchParams.get('i') || '';
    const names = iParam.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    
    if (names.length === 0) {
      return new Response('Missing "i" query parameter, e.g. ?i=js,html,css', { status: 400 });
    }
    
    const perlineParam = url.searchParams.get('perline');
    const perline = perlineParam ? parseInt(perlineParam, 10) : 0; // 0 => single row
    
    const svg = buildSvg(names, perline);
    
    // Short max-age: chosen over `no-cache` because there's no ETag/Last-Modified
    // validator here, so `no-cache` would force a full re-fetch on every load
    // anyway (no 304s possible) — it buys nothing over max-age=0. A 60s
    // max-age gives the browser (and GitHub's camo image proxy for READMEs)
    // a small real caching window, while keeping icon updates visible within
    // a minute — a reasonable balance for a public, actively-developed project.
    //
    // Cache-Tag intentionally removed for now: it has no effect on the Free
    // plan / workers.dev (tag-based purging is a paid-plan zone feature and
    // workers.dev isn't a zone at all). Re-introduce it — together with a
    // longer max-age — once this is served from a custom domain on a plan
    // that supports Cache-Tag purging (see notes below).
    const headers = {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
    };
    
    return new Response(svg, { headers });
  },
};