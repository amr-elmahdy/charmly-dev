import icons from '../dist/icons.json' assert { type: 'json' };

// ---- Layout defaults (used when the caller doesn't pass a query param) ----
const DEFAULT_SIZE = 48; // icon box size in px
const DEFAULT_GAP = 8; // gap between boxes in px
const DEFAULT_RADIUS = 12; // corner radius in px
const DEFAULT_BG = true; // draw background box by default
const DEFAULT_BGCOLOR = '#1a1b2e'; // calm dark purple-navy
const PADDING = 0; // can be changed (or kept at 0)

// ---- Allowed ranges for new query params ----
const SIZE_MIN = 16,
  SIZE_MAX = 128;
const GAP_MIN = 0,
  GAP_MAX = 32;
const RADIUS_MIN = 0,
  RADIUS_MAX = 24;

// ---- Rate limiting config ----
const RATE_LIMIT_MAX = 100; // max requests per IP per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute window
const RATE_LIMIT_CLEANUP_MS = 5 * 60_000; // sweep stale entries every 5 min

const MAX_ICONS = 50; // Maximum number of icons allowed in a single request
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

// REVIEW FIX: `icons` is a plain object, so a bare `icons[name]` / truthiness
// check (e.g. `if (icons[name])`) can accidentally succeed for inherited
// Object.prototype members such as "constructor", "toString", "__proto__",
// or "hasOwnProperty" — none of these are real icons, but they are truthy
// property accesses, so they used to slip past the "does this icon exist"
// check and produce a broken box (viewBox="undefined", literal "undefined"
// content) instead of being treated as an invalid/unknown icon name like any
// other typo. This helper makes "does this icon exist" an explicit own-
// property check, which is the correct and safe way to test membership on a
// plain object keyed by untrusted input. This does not change behavior for
// any real icon name — it only makes the small set of JS-builtin property
// names behave the same as any other unknown icon name (silently skipped).
function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(icons, name);
}

// Validate a numeric query param against [min, max].
// - paramValue === null (param not present) => returns defaultValue
// - present but not a finite number, or out of range => returns null (caller
//   should respond with 400)
function validateNumber(paramValue, min, max, defaultValue) {
  if (paramValue === null) return defaultValue;
  
  const trimmed = paramValue.trim();
  if (trimmed === '') return null;
  
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;
  
  return num;
}

// Validate a hex color string (3 or 6 hex digits, with or without leading #).
// Returns a normalized "#rrggbb"/"#rgb" string, or null if invalid.
function validateHexColor(color) {
  if (color === null) return null;
  
  const trimmed = color.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;
  
  return `#${trimmed}`;
}

// Validate a boolean-ish query param ("true"/"false", case-insensitive).
// - paramValue === null (param not present) => returns defaultValue
// - anything else that isn't "true"/"false" => returns null (invalid)
function validateBoolean(paramValue, defaultValue) {
  if (paramValue === null) return defaultValue;
  
  const lower = paramValue.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  
  return null;
}

// Build a single icon inside a clipped rounded box.
// All layout/style values are passed in as params (no globals) so concurrent
// requests with different query params never interfere with each other.
function renderIcon(name, x, y, index, size, radius, bg, bgcolor) {
  // REVIEW FIX: explicit own-property check instead of a bare truthy lookup
  // (see hasIcon() above) — closes the constructor/__proto__ edge case.
  if (!hasIcon(name)) return '';
  const icon = icons[name];
  
  const clipId = `clip-${index}`; // unique id per box
  
  // icon.viewBox is produced by our own build-icons.js step (always plain
  // numbers/spaces, e.g. "0 0 24 24") — it's not user input, so escaping it
  // here is unnecessary work on a per-icon, per-request hot path.
  const innerSvg =
    `<svg x="${PADDING}" y="${PADDING}" width="${size}" height="${size}" ` +
    `viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>`;
  
  if (!bg) {
    // No background requested: skip the rect and the clipPath entirely,
    // render the icon directly.
    return `<g transform="translate(${x}, ${y})">${innerSvg}</g>`;
  }
  
  return (
    `<g transform="translate(${x}, ${y})">` +
    `<rect width="${size}" height="${size}" rx="${radius}" fill="${escapeAttr(bgcolor)}"/>` +
    `<clipPath id="${clipId}"><rect width="${size}" height="${size}" rx="${radius}"/></clipPath>` +
    `<g clip-path="url(#${clipId})">${innerSvg}</g>` +
    `</g>`
  );
}

function buildSvg(names, perline, size, gap, radius, bg, bgcolor) {
  // REVIEW FIX: use the same explicit own-property check here as renderIcon,
  // so "constructor"/"__proto__"/etc. are correctly excluded from `valid`
  // (and therefore from the layout math) instead of being counted as icons.
  const valid = names.filter(hasIcon);
  
  if (valid.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48">` +
      `<text x="8" y="28" font-family="monospace" font-size="13" fill="#e05252">` +
      `No valid icons found</text></svg>`;
  }
  
  const columns = perline && perline > 0 ? Math.min(perline, valid.length) : valid.length;
  const rows = Math.ceil(valid.length / columns);
  
  const width = columns * size + (columns - 1) * gap;
  const height = rows * size + (rows - 1) * gap;
  
  // Collect parts in an array and join once at the end instead of repeated
  // string += concatenation inside the loop (faster, and reads more clearly).
  const parts = [];
  valid.forEach((name, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = col * (size + gap);
    const y = row * (size + gap);
    parts.push(renderIcon(name, x, y, idx, size, radius, bg, bgcolor));
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
    if (names.length > MAX_ICONS) {
      return new Response(
        `Too many icons requested: max ${MAX_ICONS}, got ${names.length}`, { status: 400 }
      );
    }
    const perlineParam = url.searchParams.get('perline');
    const perline = perlineParam ? parseInt(perlineParam, 10) : 0; // 0 => single row
    
    // ---- Validate new optional params (all default to prior hardcoded behavior) ----
    const size = validateNumber(url.searchParams.get('size'), SIZE_MIN, SIZE_MAX, DEFAULT_SIZE);
    if (size === null) {
      return new Response(
        `Invalid "size" parameter: must be a number between ${SIZE_MIN} and ${SIZE_MAX}`, { status: 400 }
      );
    }
    
    const gap = validateNumber(url.searchParams.get('gap'), GAP_MIN, GAP_MAX, DEFAULT_GAP);
    if (gap === null) {
      return new Response(
        `Invalid "gap" parameter: must be a number between ${GAP_MIN} and ${GAP_MAX}`, { status: 400 }
      );
    }
    
    const radius = validateNumber(url.searchParams.get('radius'), RADIUS_MIN, RADIUS_MAX, DEFAULT_RADIUS);
    if (radius === null) {
      return new Response(
        `Invalid "radius" parameter: must be a number between ${RADIUS_MIN} and ${RADIUS_MAX}`, { status: 400 }
      );
    }
    
    const bg = validateBoolean(url.searchParams.get('bg'), DEFAULT_BG);
    if (bg === null) {
      return new Response(
        `Invalid "bg" parameter: must be "true" or "false"`, { status: 400 }
      );
    }
    
    // bgcolor only matters (and is only validated) when bg=true.
    let bgcolor = DEFAULT_BGCOLOR;
    if (bg) {
      const bgcolorParam = url.searchParams.get('bgcolor');
      if (bgcolorParam !== null) {
        const validated = validateHexColor(bgcolorParam);
        if (validated === null) {
          return new Response(
            `Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color, e.g. "ff0000" or "#f00"`, { status: 400 }
          );
        }
        bgcolor = validated;
      }
    }
    
    const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);
    
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
      // REVIEW ADDITION: harmless, standard hardening header — tells any
      // browser that somehow receives this response outside an <img>/camo
      // context not to MIME-sniff the body into something other than SVG.
      // Doesn't change status codes, body, or any existing header, so it's
      // safe for backward compatibility.
      'X-Content-Type-Options': 'nosniff',
    };
    
    return new Response(svg, { headers });
  },
};