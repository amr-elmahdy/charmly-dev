// ============================================================
// Charmly Worker — main entry point.
// Handles routing, rate limiting, and request validation.
// Actual rendering is delegated to ./icons.js and ./cards.js.
// ============================================================

import {
  validateNumber,
  validateHexColor,
  validateBoolean,
} from './utils.js';
import {
  buildSvg,
  DEFAULT_SIZE,
  DEFAULT_GAP,
  DEFAULT_RADIUS,
  DEFAULT_BG,
  DEFAULT_BGCOLOR,
  SIZE_MIN,
  SIZE_MAX,
  GAP_MIN,
  GAP_MAX,
  RADIUS_MIN,
  RADIUS_MAX,
  MAX_ICONS,
} from './icons.js';
import { generateCard } from './cards.js';

// ---- Rate limiting config ----
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_CLEANUP_MS = 5 * 60_000;

const rateLimitStore = new Map();
let lastCleanup = Date.now();

function cleanupRateLimitStore(now) {
  if (now - lastCleanup < RATE_LIMIT_CLEANUP_MS) return;
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
  lastCleanup = now;
}

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

// ---- Common response headers ----
function svgHeaders(cacheSeconds) {
  return {
    'Content-Type': 'image/svg+xml; charset=utf-8',
    'Cache-Control': `public, max-age=${cacheSeconds}`,
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
  };
}

// ---- Image fetching (for /card route) ----
// Fetches a remote image and converts it to a base64 data URI
// so it can be embedded directly in the SVG.
// GitHub's Content-Security-Policy blocks external <image> URLs,
// so we must inline the image bytes.
const MAX_IMAGE_BYTES = 200 * 1024; // 200 KB hard limit

async function imageToDataUri(imageUrl) {
  let parsed;
  try {
    parsed = new URL(imageUrl);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return null;
  }

  try {
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Charmly/1.0 (+https://github.com/amrelmahdy001/Charmly)',
      },
    });

    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return null;

    const buffer = await res.arrayBuffer();
    if (buffer.byteLength > MAX_IMAGE_BYTES) return null;

    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

// ============================================================
// MAIN HANDLER
// ============================================================
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ---- Rate limiting (all routes) ----
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
      const tagsParam = url.searchParams.get('tags') || '';
      const status = (url.searchParams.get('status') || '').trim();
      const version = (url.searchParams.get('version') || '').trim();
      const ratingParam = url.searchParams.get('rating');

      if (!title || !imageUrl) {
        return new Response(
          'Missing required parameters: "title" and "img" are required.',
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

      const tags = tagsParam
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 5);

      let rating = null;
      if (ratingParam) {
        const num = parseFloat(ratingParam);
        if (!isNaN(num) && num >= 0 && num <= 5) rating = num;
      }

      // Convert the image URL to a base64 data URI so it embeds
      // directly in the SVG. If the conversion fails, fall back
      // to the original URL (it'll still render in browsers).
      let finalImageUrl = imageUrl;
      if (!imageUrl.startsWith('data:')) {
        const dataUri = await imageToDataUri(imageUrl);
        if (dataUri) finalImageUrl = dataUri;
      }

      const svg = generateCard({
        title,
        description,
        imageUrl: finalImageUrl,
        accent,
        tags,
        status,
        version,
        rating,
      });

      return new Response(svg, { headers: svgHeaders(0) });
    }

    // ---- Route: /icons ----
    if (url.pathname === '/icons') {
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
              'Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color',
              { status: 400 }
            );
          }
          bgcolor = validated;
        }
      }

      const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);

      return new Response(svg, { headers: svgHeaders(0) });
    }

    return new Response('Not found', { status: 404 });
  },
};