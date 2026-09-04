import icons from '../dist/icons.json' assert { type: 'json' };

const iconNameList = [...new Set(Object.keys(icons).map(i => i.split('-')[0]))];

const shortNames = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  html: 'html',
  css: 'css',
};

const themedIcons = [
  ...Object.keys(icons)
    .filter(i => i.includes('-light') || i.includes('-dark'))
    .map(i => i.split('-')[0]),
];

const ICON_SIZE = 48;
const PADDING = 8;
const BOX_SIZE = ICON_SIZE + PADDING * 2; // 64
const GAP = 8;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/|\/$/g, '');
    const searchParams = url.searchParams;

    if (path === 'icons') {
      const iconParam = searchParams.get('i') || searchParams.get('icons');
      if (!iconParam)
        return new Response("You didn't specify any icons!", { status: 400 });

      const theme = searchParams.get('t') || searchParams.get('theme') || 'dark';
      if (theme !== 'dark' && theme !== 'light')
        return new Response('Theme must be either "light" or "dark"', { status: 400 });

      const perLineParam = searchParams.get('perline');
      const perLine = perLineParam ? parseInt(perLineParam) : null;
      if (perLine && (isNaN(perLine) || perLine < 1 || perLine > 50))
        return new Response('Icons per line must be a number between 1 and 50', { status: 400 });

      // استخراج أسماء الأيقونات مع دعم الاختصارات والثيمات
      let iconShortNames = iconParam === 'all' ? iconNameList : iconParam.split(',').map(s => s.trim()).filter(Boolean);

      const iconNames = iconShortNames.map(name => {
        if (shortNames[name]) return shortNames[name];
        return name;
      });

      // إعداد الأبعاد
      const perLineCount = perLine ? Math.min(Math.max(perLine, 1), 50) : iconNames.length;
      const rows = Math.ceil(iconNames.length / perLineCount);
      const finalWidth = perLineCount * BOX_SIZE + (perLineCount - 1) * GAP;
      const finalHeight = rows * BOX_SIZE + (rows - 1) * GAP;

      const bgColor = theme === 'light' ? '#ffffff' : '#1a1b27';
      const boxBg = theme === 'light' ? '#f5f5f5' : '#2d2d3d';
      const boxStroke = theme === 'light' ? '#e0e0e0' : '#3d3d4d';

      let svgContent = '';

      iconNames.forEach((name, index) => {
        const row = Math.floor(index / perLineCount);
        const col = index % perLineCount;
        const x = col * (BOX_SIZE + GAP);
        const y = row * (BOX_SIZE + GAP);

        if (icons[name]) {
          svgContent += `
            <g transform="translate(${x}, ${y})">
              <rect width="${BOX_SIZE}" height="${BOX_SIZE}" rx="12" fill="${boxBg}" stroke="${boxStroke}" stroke-width="1"/>
            </g>
            <g transform="translate(${x + PADDING}, ${y + PADDING})">
              ${icons[name]}
            </g>
          `;
        } else {
          svgContent += `
            <g transform="translate(${x}, ${y})">
              <rect width="${BOX_SIZE}" height="${BOX_SIZE}" rx="12" fill="${boxBg}" stroke="${boxStroke}" stroke-width="1"/>
            </g>
            <g transform="translate(${x + PADDING}, ${y + PADDING})">
              <text x="${ICON_SIZE/2}" y="${ICON_SIZE/2 + 5}" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">${name}</text>
            </g>
          `;
        }
      });

      const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        ${svgContent}
      </svg>`;

      return new Response(finalSvg, {
        headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' }
      });
    }

    if (path === 'api/icons') {
      return new Response(JSON.stringify(iconNameList), {
        headers: { 'content-type': 'application/json;charset=UTF-8' }
      });
    }

    return new Response('Not found', { status: 404 });
  }
};