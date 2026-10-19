// ============================================================
// Card colors module.
// Parses and validates color parameters for the card background.
// ============================================================

import { validateHexColor } from '../utils.js';

// Default gradient — calm violet-blue fading to dark navy.
export const DEFAULT_COLORS = ['#5865F2', '#1a1d2e'];

// ============================================================
// Public API
// ============================================================

// Parses a `colour` / `c` parameter into a [from, to] pair.
//
// Accepted formats:
//   null              → DEFAULT_COLORS
//   "5865F2"          → ['#5865F2', '#5865F2']    (single color)
//   "5865F2,1a1d2e"   → ['#5865F2', '#1a1d2e']    (gradient)
//
// Returns null on error (caller should respond with 400).
export function parseColors(param) {
  if (param === null) return DEFAULT_COLORS.slice();
  
  const parts = String(param)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  
  if (parts.length === 0 || parts.length > 2) return null;
  
  const validated = parts.map((hex) => validateHexColor(hex));
  if (validated.some((v) => v === null)) return null;
  
  // Single color → duplicate so downstream always sees [from, to].
  if (validated.length === 1) return [validated[0], validated[0]];
  
  return [validated[0], validated[1]];
}