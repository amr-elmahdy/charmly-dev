import icons from './icons.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const iconsParam = url.searchParams.get('i') || '';
    const theme = url.searchParams.get('theme') || 'dark';
    const perline = parseInt(url.searchParams.get('perline') || '15', 10);
    
    const iconNames = iconsParam.split(',').map(s => s.trim()).filter(Boolean);
    if (iconNames.length === 0) {
      return new Response('No icons specified. Use ?i=js,html,css', { status: 400 });
    }
    
    const bgColor = theme === 'light' ? '#ffffff' : '#1a1b27';
    const textColor = theme === 'light' ? '#000000' : '#ffffff';
    
    let svgContent = '';
    let count = 0;
    
    for (let name of iconNames) {
      if (icons[name]) {
        svgContent += `<g transform="translate(${count * 48}, 0)">${icons[name]}</g>`;
        count++;
      } else {
        svgContent += `<g transform="translate(${count * 48}, 0)">
          <rect width="48" height="48" rx="6" fill="#ccc"/>
          <text x="24" y="28" text-anchor="middle" font-family="Arial" font-size="10" fill="#000">${name}</text>
        </g>`;
        count++;
      }
    }
    
    const totalIcons = count;
    const perLine = Math.min(Math.max(perline, 1), 50);
    const rows = Math.ceil(totalIcons / perLine);
    const finalWidth = perLine * 48;
    const finalHeight = rows * 48;
    const actualWidth = Math.min(totalIcons, perLine) * 48;
    
    const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${actualWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
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
};