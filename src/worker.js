import icons from '../dist/icons.json' assert { type: 'json' };

// ============================================================
// ICON DEFAULTS
// ============================================================
const DEFAULT_SIZE = 48;
const DEFAULT_GAP = 8;
const DEFAULT_RADIUS = 12;
const DEFAULT_BG = true;
const DEFAULT_BGCOLOR = '#1a1b2e';
const PADDING = 0;

const SIZE_MIN = 16, SIZE_MAX = 128;
const GAP_MIN = 0, GAP_MAX = 32;
const RADIUS_MIN = 0, RADIUS_MAX = 24;

// ============================================================
// RATE LIMITING
// ============================================================
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_CLEANUP_MS = 5 * 60_000;
const MAX_ICONS = 50;

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

// ============================================================
// VALIDATION HELPERS
// ============================================================
function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(icons, name);
}

function findFirstIcon(names) {
  for (const n of names) if (hasIcon(n)) return n;
  return null;
}

function validateNumber(paramValue, min, max, defaultValue) {
  if (paramValue === null) return defaultValue;
  const trimmed = paramValue.trim();
  if (trimmed === '') return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;
  return num;
}

function validateHexColor(color) {
  if (color === null) return null;
  const trimmed = color.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;
  return `#${trimmed}`;
}

function validateBoolean(paramValue, defaultValue) {
  if (paramValue === null) return defaultValue;
  const lower = paramValue.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  return null;
}

// ============================================================
// CARD CONSTANTS
// ============================================================
const CARD_WIDTH = 640;
const CARD_HEIGHT = 240;
const CARD_IMAGE_SIZE = 240;
const CARD_RADIUS = 20;
const CARD_TEXT_X = CARD_IMAGE_SIZE + 24; // 264
const CARD_PADDING_RIGHT = 24;
const CARD_DEFAULT_ACCENT = '#5865F2';
const CARD_DEFAULT_END = '#1a1d2e';
const CARD_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// Vertical layout
const CARD_TOPRIGHT_BASELINE = 48;
const CARD_TITLE_BASELINE = 78;
const CARD_DESC_START_Y = 112;
const CARD_DESC_LINE_HEIGHT = 22;
const CARD_DESC_MAX_LINES = 3;
const CARD_TAGS_Y = 174;
const CARD_TAGS_HEIGHT = 22;
const CARD_PLATFORM_ICON_SIZE = 20;
const CARD_PLATFORM_ICON_Y = 198;
const CARD_BOTTOM_BASELINE = 214;

const CARD_STATUS_COLORS = {
  released: '#4ade80',
  alpha: '#fbbf24',
  beta: '#60a5fa',
  development: '#a78bfa',
  'in-development': '#a78bfa',
  'early-access': '#f59e0b',
  earlyaccess: '#f59e0b',
  prototype: '#94a3b8',
  demo: '#94a3b8',
  cancelled: '#ef4444',
};

// ============================================================
// CARD HELPERS
// ============================================================
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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

  const fullLength = words.join(' ').length;
  const shownLength = lines.join(' ').length;
  if (lines.length === maxLines && shownLength < fullLength) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] =
      last.length > maxCharsPerLine - 3
        ? last.substring(0, maxCharsPerLine - 3) + '...'
        : last + '...';
  }

  return lines;
}

function renderCardIcon(name, x, y, size, color) {
  if (!hasIcon(name)) return '';
  const icon = icons[name];
  let content = icon.content;

  // Force the fill color for consistent visibility on the dark card
  if (/\bfill=/i.test(content)) {
    content = content.replace(/\bfill=["'][^"']*["']/gi, `fill="${color}"`);
  } else {
    content = content.replace(
      /<(path|circle|rect|polygon|polyline|line|ellipse)([^>]*?)(\/?)>/gi,
      (match, tag, attrs, selfClose) => {
        if (/\sfill=/i.test(attrs)) return match;
        return `<${tag}${attrs} fill="${color}"${selfClose}>`;
      }
    );
  }

  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${content}</svg>`;
}

function renderTag(text, x, y) {
  const charWidth = 6.3;
  const paddingX = 10;
  const width = Math.ceil(text.length * charWidth + paddingX * 2);
  return {
    svg:
      `<rect x="${x}" y="${y}" width="${width}" height="${CARD_TAGS_HEIGHT}" rx="${CARD_TAGS_HEIGHT / 2}" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>` +
      `<text x="${x + width / 2}" y="${y + CARD_TAGS_HEIGHT / 2 + 4}" text-anchor="middle" font-family="${CARD_FONT_STACK}" font-size="11" font-weight="500" fill="#c8d0e0">${escapeXml(text)}</text>`,
    width,
  };
}

function renderStatusBadge(status) {
  const key = status.toLowerCase().replace(/\s+/g, '-');
  const color = CARD_STATUS_COLORS[key] || '#94a3b8';
  const label = status.replace(/-/g, ' ').toUpperCase();
  const charWidth = 7;
  const dotSize = 7;
  const gap = 5;
  const paddingX = 10;
  const textWidth = label.length * charWidth;
  const totalWidth = paddingX + dotSize + gap + textWidth + paddingX;
  return { color, label, width: totalWidth };
}

function renderStars(rating) {
  const filled = Math.round(rating);
  const empty = 5 - filled;
  return '★'.repeat(filled) + '☆'.repeat(empty);
}

function generateCard({
  title,
  description,
  imageUrl,
  accent,
  tags,
  status,
  version,
  rating,
  platforms,
}) {
  const accentColor = accent || CARD_DEFAULT_ACCENT;
  const endColor = CARD_DEFAULT_END;

  const safeTitle = title.length > 24 ? title.slice(0, 22) + '...' : title;
  const descLines = wrapText(description, 46, CARD_DESC_MAX_LINES);

  // ---------- Top-right: version + status ----------
  let topRightSvg = '';
  let rightEdge = CARD_WIDTH - CARD_PADDING_RIGHT;

  if (status) {
    const badge = renderStatusBadge(status);
    const badgeX = rightEdge - badge.width;
    topRightSvg += `<rect x="${badgeX}" y="${CARD_TOPRIGHT_BASELINE - 12}" width="${badge.width}" height="22" rx="11" fill="${badge.color}" fill-opacity="0.15"/>`;
    topRightSvg += `<circle cx="${badgeX + 10}" cy="${CARD_TOPRIGHT_BASELINE - 1}" r="3.5" fill="${badge.color}"/>`;
    topRightSvg += `<text x="${badgeX + 22}" y="${CARD_TOPRIGHT_BASELINE + 4}" font-family="${CARD_FONT_STACK}" font-size="11" font-weight="600" fill="${badge.color}" letter-spacing="0.5">${badge.label}</text>`;
    rightEdge = badgeX - 10;
  }

  if (version) {
    const versionText = version.startsWith('v') ? version : `v${version}`;
    topRightSvg += `<text x="${rightEdge}" y="${CARD_TOPRIGHT_BASELINE + 4}" text-anchor="end" font-family="${CARD_FONT_STACK}" font-size="13" font-weight="500" fill="#8892a6">${escapeXml(versionText)}</text>`;
  }

  // ---------- Title ----------
  const titleSvg = `<text x="${CARD_TEXT_X}" y="${CARD_TITLE_BASELINE}" font-family="${CARD_FONT_STACK}" font-size="26" font-weight="700" fill="#ffffff">${escapeXml(safeTitle)}</text>`;

  // ---------- Description ----------
  let descSvg = '';
  descLines.forEach((line, i) => {
    descSvg += `<text x="${CARD_TEXT_X}" y="${CARD_DESC_START_Y + i * CARD_DESC_LINE_HEIGHT}" font-family="${CARD_FONT_STACK}" font-size="14" fill="#a8b0c0">${escapeXml(line)}</text>`;
  });

  // ---------- Tags ----------
  let tagsSvg = '';
  if (tags && tags.length > 0) {
    let tagX = CARD_TEXT_X;
    const maxX = CARD_WIDTH - CARD_PADDING_RIGHT;
    for (const tag of tags.slice(0, 5)) {
      const rendered = renderTag(tag, tagX, CARD_TAGS_Y);
      if (tagX + rendered.width > maxX) break;
      tagsSvg += rendered.svg;
      tagX += rendered.width + 6;
    }
  }

  // ---------- Bottom row: platforms (left) + rating (right) ----------
  let bottomSvg = '';

  if (platforms && platforms.length > 0) {
    let iconX = CARD_TEXT_X;
    for (const p of platforms) {
      const iconSvg = renderCardIcon(
        p.iconName,
        iconX,
        CARD_PLATFORM_ICON_Y,
        CARD_PLATFORM_ICON_SIZE,
        '#e6ebf5'
      );
      if (iconSvg) {
        bottomSvg += iconSvg;
        iconX += CARD_PLATFORM_ICON_SIZE + 12;
      }
    }
  }

  if (rating !== null && rating !== undefined) {
    const stars = renderStars(rating);
    const value = rating.toFixed(1);
    bottomSvg += `<text x="${CARD_WIDTH - CARD_PADDING_RIGHT}" y="${CARD_BOTTOM_BASELINE}" text-anchor="end" font-family="${CARD_FONT_STACK}" font-size="13" fill="#fbbf24" letter-spacing="1">${stars}<tspan fill="#8892a6" font-size="12">  ${value}</tspan></text>`;
  }

  // ---------- Compose final SVG ----------
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <defs>
    <linearGradient id="cardBg" x1="${CARD_IMAGE_SIZE}" y1="0" x2="${CARD_WIDTH}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${escapeXml(accentColor)}"/>
      <stop offset="100%" stop-color="${escapeXml(endColor)}"/>
    </linearGradient>
    <radialGradient id="cardGlow" cx="${CARD_IMAGE_SIZE}" cy="${CARD_HEIGHT / 2}" r="${CARD_WIDTH - CARD_IMAGE_SIZE}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${escapeXml(accentColor)}" stop-opacity="0.4"/>
      <stop offset="55%" stop-color="${escapeXml(accentColor)}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${escapeXml(endColor)}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="cardClip">
      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="${CARD_RADIUS}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#cardBg)"/>
    <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#cardGlow)"/>
    <image href="${escapeXml(imageUrl)}" x="0" y="0" width="${CARD_IMAGE_SIZE}" height="${CARD_IMAGE_SIZE}" preserveAspectRatio="xMidYMid slice"/>
    <rect x="${CARD_IMAGE_SIZE}" y="0" width="2" height="${CARD_HEIGHT}" fill="${escapeXml(accentColor)}" fill-opacity="0.4"/>
    ${topRightSvg}
    ${titleSvg}
    ${descSvg}
    ${tagsSvg}
    ${bottomSvg}
  </g>
</svg>`;
}

// ============================================================
// ICON RENDERING (unchanged)
// ============================================================
function renderIcon(name, x, y, index, size, radius, bg, bgcolor) {
  if (!hasIcon(name)) return '';
  const icon = icons[name];
  const clipId = `clip-${index}`;

  const innerSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `x="${PADDING}" y="${PADDING}" width="${size}" height="${size}" ` +
    `viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>`;

  if (!bg) {
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
  const valid = names.filter(hasIcon);

  if (valid.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48"><text x="8" y="28" font-family="monospace" font-size="13" fill="#e05252">No valid icons found</text></svg>`;
  }

  const columns = perline && perline > 0 ? Math.min(perline, valid.length) : valid.length;
  const rows = Math.ceil(valid.length / columns);
  const width = columns * size + (columns - 1) * gap;
  const height = rows * size + (rows - 1) * gap;

  const parts = [];
  valid.forEach((name, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = col * (size + gap);
    const y = row * (size + gap);
    parts.push(renderIcon(name, x, y, idx, size, radius, bg, bgcolor));
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${parts.join('')}</svg>`;
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
      const steamParam = (url.searchParams.get('steam') || '').trim();
      const githubParam = (url.searchParams.get('github') || '').trim();
      const itchParam = (url.searchParams.get('itch') || '').trim();

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

      // Platform links
      const platforms = [];
      if (steamParam) {
        const iconName = findFirstIcon(['steam', 'steamgames', 'valve']);
        if (iconName) platforms.push({ iconName });
      }
      if (githubParam) {
        const iconName = findFirstIcon(['github']);
        if (iconName) platforms.push({ iconName });
      }
      if (itchParam) {
        const iconName = findFirstIcon(['itchio', 'itchdotio', 'itch']);
        if (iconName) platforms.push({ iconName });
      }

      const svg = generateCard({
        title,
        description,
        imageUrl,
        accent,
        tags,
        status,
        version,
        rating,
        platforms,
      });

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
            'Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color',
            { status: 400 }
          );
        }
        bgcolor = validated;
      }
    }

    const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  },
};