
import icons from '../dist/icons.json' assert { type: 'json' };
// ---- ثوابت التخطيط ----
const ICON_SIZE = 48;                    // حجم الأيقونة الفعلي داخل الصندوق
const PADDING = 8;                       // مسافة داخلية حول الأيقونة (8 من كل جهة)
const GAP = 8;                           // المسافة بين صندوق وصندوق
const BOX = ICON_SIZE + PADDING * 2;     // = 64 (حجم الصندوق كامل)
const RADIUS = 12;                       // زوايا دائرية للصندوق
const BG = '#1b1f23';                    // خلفية داكنة ثابتة (بدون ثيمات)

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// كل أيقونة بتترسم كـ <svg> واحد متداخل (مش تغليف مزدوج)
// الـ viewBox الأصلي بتاعها + width/height=48 بيخليا تتحجم تلقائيًا وبدون تشويه
// سواء كانت 24x24 أو 256x256 أو أي مقاس تاني، عن طريق preserveAspectRatio
function renderIcon(name, x, y) {
  const icon = icons[name];
  if (!icon) return '';
  return (
    `<g>` +
    `<rect x="${x}" y="${y}" width="${BOX}" height="${BOX}" rx="${RADIUS}" fill="${BG}"/>` +
    `<svg x="${x + PADDING}" y="${y + PADDING}" width="${ICON_SIZE}" height="${ICON_SIZE}" ` +
    `viewBox="${escapeAttr(icon.viewBox)}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>` +
    `</g>`
  );
}

function buildSvg(names, perline) {
  // تجاهل أي اسم أيقونة مش موجود بدل ما يكسر التخطيط
  const valid = names.filter((n) => icons[n]);

  if (valid.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48">` +
      `<text x="8" y="28" font-family="monospace" font-size="13" fill="#e05252">` +
      `No valid icons found</text></svg>`;
  }

  // perline اختياري: لو مش موجود أو صفر أو سالب => الكل في سطر واحد
  const columns = perline && perline > 0 ? Math.min(perline, valid.length) : valid.length;
  const rows = Math.ceil(valid.length / columns);

  const width = columns * BOX + (columns - 1) * GAP;
  const height = rows * BOX + (rows - 1) * GAP;

  let body = '';
  valid.forEach((name, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = col * (BOX + GAP);
    const y = row * (BOX + GAP);
    body += renderIcon(name, x, y);
  });

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}" fill="none">${body}</svg>`
  );
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== '/icons') {
      return new Response('Not found', { status: 404 });
    }

    const iParam = url.searchParams.get('i') || '';
    const names = iParam
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (names.length === 0) {
      return new Response('Missing "i" query parameter, e.g. ?i=js,html,css', {
        status: 400,
      });
    }

    const perlineParam = url.searchParams.get('perline');
    const perline = perlineParam ? parseInt(perlineParam, 10) : 0; // 0 => سطر واحد

    const svg = buildSvg(names, perline);

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
