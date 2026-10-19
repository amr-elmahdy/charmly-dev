// ============================================================
// Card generation — entry point.
// Composes the final SVG from layout + colors + content.
//
// Commit 1 scope: background gradient + title only.
// Image, description, and widgets will be added in later commits.
// ============================================================

import { escapeXml } from '../utils.js';
import { parseColors } from './colors.js';
import {
  computeLayout,
  validateSize,
  validateImageSize,
  validateCorner,
  CORNER_RADII,
} from './layout.js';

// ---- Font stack used across the card ----
const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// ============================================================
// Public API
// ============================================================

// Generates the card SVG.
//
// Input (all already strings or null from query params):
//   title      : string  (required)
//   size       : 's' | 'm' | 'l' | null
//   imageSize  : 's' | 'm' | 'l' | 'xl' | null
//   corner     : 'sharp' | 'smooth' | null
//   colour     : 'hex' | 'hex,hex' | null
//
// Returns:
//   { svg: string } on success
//   { error: string } on validation failure
export function generateCard({ title, size, imageSize, corner, colour }) {
  // ---- Validate required ----
  if (!title || title.trim() === '') {
    return { error: 'Missing required parameter: title' };
  }
  
  // ---- Validate options ----
  const vSize = validateSize(size);
  if (vSize === null) {
    return { error: 'Invalid "size" parameter. Must be one of: s, m, l' };
  }
  
  const vImageSize = validateImageSize(imageSize);
  if (vImageSize === null) {
    return {
      error: 'Invalid "imagewidth" parameter. Must be one of: s, m, l, xl',
    };
  }
  
  const vCorner = validateCorner(corner);
  if (vCorner === null) {
    return { error: 'Invalid "corner" parameter. Must be one of: sharp, smooth' };
  }
  
  const colors = parseColors(colour);
  if (colors === null) {
    return { error: 'Invalid "colour" parameter. Must be hex or hex,hex' };
  }
  
  // ---- Compute ----
  const layout = computeLayout({ size: vSize, imageSize: vImageSize });
  const radius = CORNER_RADII[vCorner];
  
  // ---- Compose ----
  const svg = composeSvg({ layout, colors, radius, title });
  
  return { svg };
}

// ============================================================
// Internal: SVG composition
// ============================================================

function composeSvg({ layout, colors, radius, title }) {
  const {
    totalWidth,
    totalHeight,
    contentX,
    contentWidth,
    titleBaseline,
  } = layout;
  
  // Trim the title so it never runs past the content area.
  // (A proper measurement pass will land in a later commit.)
  const safeTitle = truncateToWidth(title, contentWidth, 24);
  const gradientStops =
    `<stop offset="0%" stop-color="${escapeXml(colors[0])}"/>` +
    `<stop offset="100%" stop-color="${escapeXml(colors[1])}"/>`;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${totalWidth}" height="${totalHeight}"
  viewBox="0 0 ${totalWidth} ${totalHeight}">
  <defs>
    <linearGradient id="cardBg" x1="0" y1="0" x2="${totalWidth}" y2="0" gradientUnits="userSpaceOnUse">
      ${gradientStops}
    </linearGradient>
    <clipPath id="cardClip">
      <rect width="${totalWidth}" height="${totalHeight}" rx="${radius}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${totalWidth}" height="${totalHeight}" fill="url(#cardBg)"/>
    <text x="${contentX}" y="${titleBaseline}"
      font-family="${FONT_STACK}" font-size="24" font-weight="700"
      fill="#ffffff">${escapeXml(safeTitle)}</text>
  </g>
</svg>`;
}

// ============================================================
// Internal helpers
// ============================================================

// Crude width-based truncation. Approximates the character width
// for the given font size and cuts if the text would overflow.
// Will be replaced by a proper measurement pass in a later commit.
function truncateToWidth(text, maxWidth, fontSize) {
  const approxCharWidth = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor(maxWidth / approxCharWidth));
  if (text.length <= maxChars) return text;
  return text.slice(0, Math.max(1, maxChars - 3)) + '...';
}