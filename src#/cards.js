// ============================================================
// Card rendering module.
// Handles everything related to the /card endpoint.
// ============================================================

import { escapeXml, wrapText } from './utils.js';

// ---- Card layout constants ----
const CARD_WIDTH = 960;
const CARD_HEIGHT = 240;
const CARD_IMAGE_SIZE = 240;
const CARD_RADIUS = 16;
const CARD_TEXT_X = CARD_IMAGE_SIZE + 24;
const CARD_PADDING_RIGHT = 20;
const CARD_DEFAULT_ACCENT = '#5865F2';
const CARD_DEFAULT_END = '#1a1d2e';
const CARD_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// ---- Vertical layout ----
// Row 1: Title (left) + Status badge + Version (right), all vertically centered together
const CARD_TITLE_BASELINE = 62;
const CARD_BADGE_CENTER_Y = 52;

// Row 2: Description
const CARD_DESC_START_Y = 104;
const CARD_DESC_LINE_HEIGHT = 22;
const CARD_DESC_MAX_LINES = 3;

// Row 3: Tags (left) + Rating (right), visually aligned
const CARD_TAGS_Y = 176;
const CARD_TAGS_HEIGHT = 22;
const CARD_RATING_BASELINE = 191;

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

// ---- Internal helpers ----

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

// ---- Public API ----

export function generateCard({
  title,
  description,
  imageUrl,
  accent,
  tags,
  status,
  version,
  rating,
}) {
  const accentColor = accent || CARD_DEFAULT_ACCENT;
  const endColor = CARD_DEFAULT_END;

  const safeTitle = title.length > 32 ? title.slice(0, 30) + '...' : title;
  const descLines = wrapText(description, 72, CARD_DESC_MAX_LINES);

  // ---------- Row 1: Title (left) + Status + Version (right) ----------
  // Both the title and the badge/version row are vertically centered
  // around the same visual line (CARD_BADGE_CENTER_Y ≈ title center).
  let topRightSvg = '';
  let rightEdge = CARD_WIDTH - CARD_PADDING_RIGHT;

  if (status) {
    const badge = renderStatusBadge(status);
    const badgeX = rightEdge - badge.width;
    const badgeTop = CARD_BADGE_CENTER_Y - 11;

    topRightSvg += `<rect x="${badgeX}" y="${badgeTop}" width="${badge.width}" height="22" rx="11" fill="${badge.color}" fill-opacity="0.15"/>`;
    topRightSvg += `<circle cx="${badgeX + 10}" cy="${CARD_BADGE_CENTER_Y}" r="3.5" fill="${badge.color}"/>`;
    topRightSvg += `<text x="${badgeX + 22}" y="${CARD_BADGE_CENTER_Y + 4}" font-family="${CARD_FONT_STACK}" font-size="11" font-weight="600" fill="${badge.color}" letter-spacing="0.5">${badge.label}</text>`;

    rightEdge = badgeX - 12;
  }

  if (version) {
    const versionText = version.startsWith('v') ? version : `v${version}`;
    topRightSvg += `<text x="${rightEdge}" y="${CARD_BADGE_CENTER_Y + 4}" text-anchor="end" font-family="${CARD_FONT_STACK}" font-size="13" font-weight="500" fill="#8892a6">${escapeXml(versionText)}</text>`;
  }

  const titleSvg = `<text x="${CARD_TEXT_X}" y="${CARD_TITLE_BASELINE}" font-family="${CARD_FONT_STACK}" font-size="28" font-weight="700" fill="#ffffff">${escapeXml(safeTitle)}</text>`;

  // ---------- Row 2: Description ----------
  let descSvg = '';
  descLines.forEach((line, i) => {
    descSvg += `<text x="${CARD_TEXT_X}" y="${CARD_DESC_START_Y + i * CARD_DESC_LINE_HEIGHT}" font-family="${CARD_FONT_STACK}" font-size="18" fill="#a8b0c0">${escapeXml(line)}</text>`;
  });

  // ---------- Row 3: Tags (left) + Rating (right) ----------
  let tagsSvg = '';
  if (tags && tags.length > 0) {
    let tagX = CARD_TEXT_X;
    // Reserve room for the rating on the right (about 100px)
    const maxX = CARD_WIDTH - CARD_PADDING_RIGHT - 100;
    for (const tag of tags.slice(0, 5)) {
      const rendered = renderTag(tag, tagX, CARD_TAGS_Y);
      if (tagX + rendered.width > maxX) break;
      tagsSvg += rendered.svg;
      tagX += rendered.width + 6;
    }
  }

  let ratingSvg = '';
  if (rating !== null && rating !== undefined) {
    const stars = renderStars(rating);
    const value = rating.toFixed(1);
    ratingSvg = `<text x="${CARD_WIDTH - CARD_PADDING_RIGHT}" y="${CARD_RATING_BASELINE}" text-anchor="end" font-family="${CARD_FONT_STACK}" font-size="13" fill="#fbbf24" letter-spacing="1">${stars}<tspan fill="#8892a6" font-size="12">  ${value}</tspan></text>`;
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
    ${ratingSvg}
  </g>
</svg>`;
}