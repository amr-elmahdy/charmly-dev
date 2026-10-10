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

const MAX_ICONS = 50; 

// ---- Card layout constants ----
const CARD_WIDTH = 600;
const CARD_HEIGHT = 200;
const CARD_IMAGE_SIZE = 200;
const CARD_RADIUS = 16;
const CARD_TEXT_PADDING = 28;
const CARD_TEXT_X = CARD_IMAGE_SIZE + CARD_TEXT_PADDING;
const CARD_DEFAULT_ACCENT = '#5865F2'; // fallback accent color
const CARD_DEFAULT_END = '#1a1f2e'; // dark blue-gray (right side)

// Maximum number of icons allowed in a single request
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
// ---------- Card Helpers ----------

// Escape a string for safe use inside XML text content or attributes.
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Split text into lines that fit the given character budget,
// with optional truncation and ellipsis on the last line.
function wrapText(text, maxCharsPerLine, maxLines) {
  if (!text) return [];
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  
  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      if (lines.length === maxLines) break;
      current = word;
    } else {
      current = test;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  
  // Add ellipsis if the text was truncated
  const fullLength = words.join(' ').length;
  const shownLength = lines.join(' ').length;
  if (lines.length === maxLines && shownLength < fullLength) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] =
      last.length > maxCharsPerLine - 3 ?
      last.substring(0, maxCharsPerLine - 3) + '...' :
      last + '...';
  }
  
  return lines;
}

// Generate the SVG card markup.
function generateCard({ title, description, imageUrl, accent }) {
  const accentColor = accent || CARD_DEFAULT_ACCENT;
  const endColor = CARD_DEFAULT_END;
  
  // Truncate long titles (about 26 characters fit at 26px bold)
  const safeTitle = title.length > 26 ? title.slice(0, 24) + '...' : title;
  
  // Description: about 48 chars per line, up to 4 lines
  const descLines = wrapText(description, 48, 4);
  
  let descSvg = '';
  const descStartY = 118;
  const descLineHeight = 22;
  const fontStack =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
  
  descLines.forEach((line, i) => {
    descSvg += `<text x="${CARD_TEXT_X}" y="${
      descStartY + i * descLineHeight
    }" font-family="${fontStack}" font-size="14" fill="#a8b0c0">${escapeXml(
      line
    )}</text>`;
  });
  
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <defs>
    <linearGradient id="cardBg" x1="${CARD_IMAGE_SIZE}" y1="0" x2="${CARD_WIDTH}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${escapeXml(accentColor)}"/>
      <stop offset="100%" stop-color="${escapeXml(endColor)}"/>
    </linearGradient>
    <clipPath id="cardClip">
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="${CARD_RADIUS}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#cardBg)"/>
    <image href="${escapeXml(
      imageUrl
    )}" x="0" y="0" width="${CARD_IMAGE_SIZE}" height="${CARD_IMAGE_SIZE}" preserveAspectRatio="xMidYMid slice"/>
    <text x="${CARD_TEXT_X}" y="70" font-family="${fontStack}" font-size="26" font-weight="700" fill="#ffffff">${escapeXml(
    safeTitle
  )}</text>
    ${descSvg}
  </g>
</svg>`;
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
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
  `x="${PADDING}" y="${PADDING}" width="${size}" height="${size}" ` +
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
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
  `width="${width}" height="${height}" ` +
  `viewBox="0 0 ${width} ${height}" fill="none">${parts.join('')}</svg>`
);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ---- Simple per-IP rate limiting (applies to all routes) ----
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

    // ---- Route: /card ----
    if (url.pathname === '/card') {
      const title = (url.searchParams.get('title') || '').trim();
      const description = (url.searchParams.get('desc') || '').trim();
      const imageUrl = (url.searchParams.get('img') || '').trim();
      const accentParam = url.searchParams.get('accent');

      if (!title || !imageUrl) {
        return new Response(
          'Missing required parameters: "title" and "img" are required. Example: /card?title=My+Game&desc=...&img=https://...',
          { status: 400 }
        );
      }

      let accent = null;
      if (accentParam) {
        const validated = validateHexColor(accentParam);
        if (validated === null) {
          return new Response('Invalid "accent" color parameter', {
            status: 400,
          });
        }
        accent = validated;
      }

      const svg = generateCard({ title, description, imageUrl, accent });

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    // ---- Route: /icons ----
    if (url.pathname !== '/icons') {
      return new Response('Not found', { status: 404 });
    }

    const iParam = url.searchParams.get('i') || '';
    const names = iParam
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (names.length === 0) {
      return new Response(
        'Missing "i" query parameter, e.g. ?i=js,html,css',
        { status: 400 }
      );
    }

    if (names.length > MAX_ICONS) {
      return new Response(
        `Too many icons requested: max ${MAX_ICONS}, got ${names.length}`,
        { status: 400 }
      );
    }

    const perlineParam = url.searchParams.get('perline');
    const perline = perlineParam ? parseInt(perlineParam, 10) : 0;

    const size = validateNumber(
      url.searchParams.get('size'),
      SIZE_MIN,
      SIZE_MAX,
      DEFAULT_SIZE
    );
    if (size === null) {
      return new Response(
        `Invalid "size" parameter: must be a number between ${SIZE_MIN} and ${SIZE_MAX}`,
        { status: 400 }
      );
    }

    const gap = validateNumber(
      url.searchParams.get('gap'),
      GAP_MIN,
      GAP_MAX,
      DEFAULT_GAP
    );
    if (gap === null) {
      return new Response(
        `Invalid "gap" parameter: must be a number between ${GAP_MIN} and ${GAP_MAX}`,
        { status: 400 }
      );
    }

    const radius = validateNumber(
      url.searchParams.get('radius'),
      RADIUS_MIN,
      RADIUS_MAX,
      DEFAULT_RADIUS
    );
    if (radius === null) {
      return new Response(
        `Invalid "radius" parameter: must be a number between ${RADIUS_MIN} and ${RADIUS_MAX}`,
        { status: 400 }
      );
    }

    const bg = validateBoolean(url.searchParams.get('bg'), DEFAULT_BG);
    if (bg === null) {
      return new Response(
        'Invalid "bg" parameter: must be "true" or "false"',
        { status: 400 }
      );
    }

    let bgcolor = DEFAULT_BGCOLOR;
    if (bg) {
      const bgcolorParam = url.searchParams.get('bgcolor');
      if (bgcolorParam !== null) {
        const validated = validateHexColor(bgcolorParam);
        if (validated === null) {
          return new Response(
            'Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color, e.g. "ff0000" or "#f00"',
            { status: 400 }
          );
        }
        bgcolor = validated;
      }
    }

    const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);

    // Short max-age during active development. Will be raised later.
    const headers = {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    };

    return new Response(svg, { headers });
  },
};