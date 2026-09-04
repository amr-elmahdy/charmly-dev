import icons from './icons.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const iconsParam = url.searchParams.get('i') || '';
    const iconNames = iconsParam.split(',').map(s => s.trim()).filter(Boolean);

    let svgContent = '';
    for (let name of iconNames) {
      if (icons[name]) {
        svgContent += icons[name];
      } else {
        svgContent += `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="#ccc" rx="6"/><text x="24" y="28" text-anchor="middle" font-family="Arial" font-size="10" fill="#000">${name}</text></svg>`;
      }
    }

    const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconNames.length * 48}" height="48">${svgContent}</svg>`;

    return new Response(finalSvg, {
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' }
    });
  }
};