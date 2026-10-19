// ============================================================
// Card image module
// ============================================================

import { escapeXml } from '../utils.js';
import { CARD_HEIGHT } from './layout.js';

// Merge modes
export const MERGE_MODES = ['cut', 'line', 'smooth'];
export const DEFAULT_MERGE = 'cut';

// Smooth mode constants
const SMOOTH_FADE_START = 0.9;

// Line mode constants
const LINE_WIDTH = 2;
const LINE_COLOR = '#ffffff';
const LINE_OPACITY = 0.6;

// ============================================================
// Validators
// ============================================================

export function validateMergeMode(mode) {
  if (mode === null) return DEFAULT_MERGE;
  const lower = String(mode).toLowerCase();
  if (!MERGE_MODES.includes(lower)) return null;
  return lower;
}

// ============================================================
// Public API
// ============================================================

export function renderImage({ imageUrl, imageWidth, mergeMode }) {
  if (!imageUrl) return '';
  
  const fadeStartX = imageWidth * SMOOTH_FADE_START;
  
  const imageEl =
    `<image href="${escapeXml(imageUrl)}" x="0" y="0" ` +
    `width="${imageWidth}" height="${CARD_HEIGHT}" ` +
    `preserveAspectRatio="xMidYMid slice"/>`;
  
  switch (mergeMode) {
    case 'line': {
      const lineX = imageWidth - LINE_WIDTH;
      return (
        imageEl +
        `<rect x="${lineX}" y="0" width="${LINE_WIDTH}" height="${CARD_HEIGHT}" ` +
        `fill="${LINE_COLOR}" fill-opacity="${LINE_OPACITY}"/>`
      );
    }
    
    case 'smooth': {
      const maskId = 'cardImageFadeMask';
      return (
        `<defs>` +
        `<linearGradient id="cardImageFadeGradient" x1="${fadeStartX}" y1="0" x2="${imageWidth}" y2="0" gradientUnits="userSpaceOnUse">` +
        `<stop offset="0%" stop-color="#ffffff"/>` +
        `<stop offset="100%" stop-color="#000000"/>` +
        `</linearGradient>` +
        `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${imageWidth}" height="${CARD_HEIGHT}">` +
        `<rect x="0" y="0" width="${fadeStartX}" height="${CARD_HEIGHT}" fill="#ffffff"/>` +
        `<rect x="${fadeStartX}" y="0" width="${imageWidth - fadeStartX}" height="${CARD_HEIGHT}" fill="url(#cardImageFadeGradient)"/>` +
        `</mask>` +
        `</defs>` +
        `<g mask="url(#${maskId})">${imageEl}</g>`
      );
    }
    
    case 'cut':
    default:
      return imageEl;
  }
}