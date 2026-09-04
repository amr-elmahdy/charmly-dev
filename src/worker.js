import icons from '../dist/icons.json' assert { type: 'json' };

// ==================== الإعدادات ====================
const ICON_SIZE = 48;
const PADDING = 8;
const BOX_SIZE = ICON_SIZE + PADDING * 2; // 64
const GAP = 8;
const DEFAULT_PER_LINE = 10;
const MAX_ICONS = 100;

// اللواحق الشائعة
const SUFFIXES = [
  'original', 'plain', 'line', 'fill',
  'colored', 'color', 'wordmark',
  'horizontal', 'vertical'
];

// اختصارات
const shortNames = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  html: 'html',
  css: 'css',
};

// ==================== دوال مساعدة ====================
function getBaseName(iconKey) {
  for (const suffix of SUFFIXES) {
    if (iconKey.endsWith('-' + suffix)) {
      return iconKey.slice(0, -(suffix.length + 1));
    }
  }
  return iconKey;
}

function getIconKeys(baseName) {
  return Object.keys(icons).filter(key => getBaseName(key) === baseName);
}

function findBestIcon(baseName) {
  const keys = getIconKeys(baseName);
  if (keys.length === 0) return null;
  const preferred = ['original', 'plain', 'line', 'fill'];
  for (const pref of preferred) {
    const match = keys.find(key => key === `${baseName}-${pref}`);
    if (match) return match;
  }
  return keys[0];
}

/**
 * استخراج أبعاد viewBox من محتوى SVG
 */
function getViewBoxDimensions(svgString) {
  const match = svgString.match(/viewBox=["']([^"']+)["']/);
  if (match && match[1]) {
    const parts = match[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts.every(n => !isNaN(n))) {
      return { width: parts[2], height: parts[3] };
    }
  }
  // افتراضي
  return { width: 48, height: 48 };
}

const iconNameList = [...new Set(Object.keys(icons).map(getBaseName))];

// ==================== المعالج ====================
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    const searchParams = url.searchParams;

    if (path === 'api/icons') {
      return new Response(JSON.stringify(iconNameList, null, 2), {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      });
    }

    if (path === 'icons') {
      const iconParam = searchParams.get('i') || searchParams.get('icons');
      if (!iconParam || iconParam.trim() === '') {
        return new Response("You didn't specify any icons!", { status: 400 });
      }

      const perLineParam = searchParams.get('perline');
      let perLine = null;
      if (perLineParam !== null && perLineParam.trim() !== '') {
        perLine = Number(perLineParam);
        if (!Number.isInteger(perLine) || perLine < 1 || perLine > 50) {
          return new Response('Icons per line must be an integer between 1 and 50', { status: 400 });
        }
      }

      const requestedShortNames = iconParam === 'all'
        ? iconNameList
        : iconParam.split(',').map(s => s.trim()).filter(Boolean);

      const requestedBaseNames = requestedShortNames.map(name => shortNames[name] || name);

      const invalid = requestedBaseNames.filter(name => !iconNameList.includes(name));
      if (invalid.length > 0) {
        return new Response(`Unknown icon(s): ${invalid.join(', ')}. Use /api/icons to see available icons.`, { status: 400 });
      }

      if (requestedBaseNames.length > MAX_ICONS) {
        return new Response(`Too many icons. Maximum allowed is ${MAX_ICONS}.`, { status: 400 });
      }

      const perLineCount = perLine !== null ? perLine : Math.min(DEFAULT_PER_LINE, requestedBaseNames.length);
      const rows = Math.ceil(requestedBaseNames.length / perLineCount);
      const finalWidth = perLineCount * BOX_SIZE + (perLineCount - 1) * GAP;
      const finalHeight = rows * BOX_SIZE + (rows - 1) * GAP;

      const bgColor = '#1a1b27';
      const boxBg = '#2d2d3d';
      const boxStroke = '#3d3d4d';

      let svgContent = '';

      requestedBaseNames.forEach((baseName, index) => {
        const row = Math.floor(index / perLineCount);
        const col = index % perLineCount;
        const x = col * (BOX_SIZE + GAP);
        const y = row * (BOX_SIZE + GAP);

        const iconKey = findBestIcon(baseName);

        // رسم الصندوق الخلفي
        svgContent += `
          <g transform="translate(${x}, ${y})">
            <rect width="${BOX_SIZE}" height="${BOX_SIZE}" rx="12" fill="${boxBg}" stroke="${boxStroke}" stroke-width="1"/>
          </g>
        `;

        if (iconKey) {
          // استخراج أبعاد الأيقونة وحساب معامل التحجيم
          const svgString = icons[iconKey];
          const { width: vbWidth, height: vbHeight } = getViewBoxDimensions(svgString);
          const scale = ICON_SIZE / vbWidth; // نفترض أن الأيقونة مربعة

          // تطبيق التحويل: ترجمة إلى الموضع مع التحجيم
          svgContent += `
          <g transform="translate(${x + PADDING}, ${y + PADDING}) scale(${scale})">
            ${svgString}
          </g>
        `;
        } else {
          svgContent += `
          <g transform="translate(${x + PADDING}, ${y + PADDING})">
            <text x="${ICON_SIZE / 2}" y="${ICON_SIZE / 2 + 5}" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">${baseName}</text>
          </g>
        `;
        }
      });

      const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        ${svgContent}
      </svg>`;

      return new Response(finalSvg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    return new Response('Not found', { status: 404 });
  }
};