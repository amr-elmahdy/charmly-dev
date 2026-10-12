// ============================================================
// Shared utility functions used across the project.
// Pure helpers only — no side effects, no state.
// ============================================================

// Escape a string for safe use inside an SVG attribute.
export function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Escape a string for safe use inside XML text content or attributes.
export function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Validate a numeric query param against [min, max].
export function validateNumber(paramValue, min, max, defaultValue) {
  if (paramValue === null) return defaultValue;
  const trimmed = paramValue.trim();
  if (trimmed === '') return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;
  return num;
}

// Validate a hex color string (3 or 6 hex digits, with or without #).
export function validateHexColor(color) {
  if (color === null) return null;
  const trimmed = color.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;
  return `#${trimmed}`;
}

// Validate a boolean-ish query param ("true"/"false", case-insensitive).
export function validateBoolean(paramValue, defaultValue) {
  if (paramValue === null) return defaultValue;
  const lower = paramValue.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  return null;
}

// Split text into lines that fit the given character budget.
export function wrapText(text, maxCharsPerLine, maxLines) {
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
      last.length > maxCharsPerLine - 3 ?
      last.substring(0, maxCharsPerLine - 3) + '...' :
      last + '...';
  }
  
  return lines;
}