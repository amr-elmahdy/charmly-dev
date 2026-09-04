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
      
      const perLine = parseInt(searchParams.get('perline') || '15');
      if (isNaN(perLine) || perLine < 1 || perLine > 50)
        return new Response('Icons per line must be a number between 1 and 50', { status: 400 });
      
      let iconNames = [];
      if (iconParam === 'all') {
        // هنا نرجع كل الأيقونات (لاحقًا)
        iconNames = ['javascript', 'typescript', 'python'];
      } else {
        iconNames = iconParam.split(',').map(s => s.trim());
      }
      
      const bgColor = theme === 'light' ? '#ffffff' : '#1a1b27';
      const perLineCount = Math.min(Math.max(perLine, 1), 50);
      const rows = Math.ceil(iconNames.length / perLineCount);
      const finalWidth = perLineCount * 48;
      const finalHeight = rows * 48;
      const actualWidth = Math.min(iconNames.length, perLineCount) * 48;
      
      let svgContent = '';
      let count = 0;
      
      for (let name of iconNames) {
        const row = Math.floor(count / perLineCount);
        const col = count % perLineCount;
        const translate = `translate(${col * 48}, ${row * 48})`;
        
        try {
          // نجيب الأيقونة من مجلد icons مباشرة
          const iconRes = await fetch(`https://raw.githubusercontent.com/amrelmahdy001/charmly/main/icons/${name}.svg`);
          if (iconRes.ok) {
            const iconSvg = await iconRes.text();
            svgContent += `<g transform="${translate}">${iconSvg}</g>`;
          } else {
            throw new Error('Icon not found');
          }
        } catch (err) {
          // أيقونة بديلة
          svgContent += `<g transform="${translate}">
            <rect width="48" height="48" rx="6" fill="#ccc"/>
            <text x="24" y="28" text-anchor="middle" font-family="Arial" font-size="10" fill="#000">${name}</text>
          </g>`;
        }
        count++;
      }
      
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
    
    return new Response('Not found', { status: 404 });
  }
};