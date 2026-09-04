const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

function extractViewBox(raw) {
  const m = raw.match(/viewBox=["']([^"']+)["']/i);
  if (m) return m[1].trim();
  // مفيش viewBox؟ نبنيه من width/height لو موجودين، وإلا 24x24 افتراضي
  const w = raw.match(/\swidth=["']([0-9.]+)(?:px)?["']/i);
  const h = raw.match(/\sheight=["']([0-9.]+)(?:px)?["']/i);
  return `0 0 ${w ? w[1] : 24} ${h ? h[1] : 24}`;
}

function extractInner(raw) {
  // بنشيل أي حاجة قبل أول <svg (زي <?xml ...?> أو <!DOCTYPE ...>)
  // وبعد آخر </svg> — دي أشهر سبب لبوظان الرندر لما بتتحط جوه SVG تانية
  const svgStart = raw.indexOf('<svg');
  if (svgStart === -1) return null;
  const openTagEnd = raw.indexOf('>', svgStart);
  const closeTagStart = raw.lastIndexOf('</svg>');
  if (openTagEnd === -1 || closeTagStart === -1) return null;
  return raw.slice(openTagEnd + 1, closeTagStart).trim();
}

const icons = {};
const files = fs.readdirSync(iconsDir);
let skipped = 0;

for (const file of files) {
  if (!file.endsWith('.svg')) continue;

  const name = file.replace('.svg', '').toLowerCase();
  const raw = fs.readFileSync(path.join(iconsDir, file), 'utf8');

  const viewBox = extractViewBox(raw);
  const content = extractInner(raw);

  if (!content) {
    console.warn(`⚠️  تجاهلت "${file}": مش قادر أفصل محتوى الـ SVG.`);
    skipped++;
    continue;
  }

  // بنخزن viewBox + المحتوى بس، مش الملف كامل
  icons[name] = { viewBox, content };
}

fs.writeFileSync(path.join(distDir, 'icons.json'), JSON.stringify(icons));

console.log(`✅ Generated ${Object.keys(icons).length} icons`);
if (skipped) console.log(`   (تجاهلت ${skipped} ملف — راجع التحذيرات فوق)`);
