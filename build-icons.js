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

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// بنعمل namespacing لكل الـ IDs جوه الأيقونة عشان لما نجمع
// أكتر من أيقونة في SVG واحد، مايحصلش تعارض بينهم (زي id="a"
// اللي بيتكرر في كل أيقونة تقريبًا). بنضيف prefix فريد لكل أيقونة
// وبنحدّث كل المراجع (#id) في الـ fill, clip-path, filter, href, إلخ.
function namespaceIds(content, prefix) {
  // نجمع كل الـ IDs المعرّفة جوه الأيقونة
  const idMatches = [...content.matchAll(/\bid=["']([^"']+)["']/g)];
  const ids = [...new Set(idMatches.map((m) => m[1]))];
  
  if (ids.length === 0) return content;
  
  let result = content;
  
  for (const id of ids) {
    const escaped = escapeRegex(id);
    const newId = `${prefix}${id}`;
    
    // 1. نغير اسم التعريف نفسه
    result = result.replace(
      new RegExp(`\\bid=["']${escaped}["']`, 'g'),
      `id="${newId}"`
    );
    
    // 2. نحدث url(#id) في الفلاتر والـ fills والـ clip-paths
    result = result.replace(
      new RegExp(`url\\(\\s*#${escaped}\\s*\\)`, 'g'),
      `url(#${newId})`
    );
    
    // 3. نحدث xlink:href="#id" (SVG 1.1)
    result = result.replace(
      new RegExp(`xlink:href=["']#${escaped}["']`, 'g'),
      `xlink:href="#${newId}"`
    );
    
    // 4. نحدث href="#id" (SVG 2.0)
    result = result.replace(
      new RegExp(`\\bhref=["']#${escaped}["']`, 'g'),
      `href="#${newId}"`
    );
  }
  
  return result;
}

const icons = {};
const files = fs.readdirSync(iconsDir);
let skipped = 0;

for (const file of files) {
  if (!file.endsWith('.svg')) continue;
  
  const name = file.replace('.svg', '').toLowerCase();
  const raw = fs.readFileSync(path.join(iconsDir, file), 'utf8');
  
  const viewBox = extractViewBox(raw);
  let content = extractInner(raw);
  
  if (!content) {
    console.warn(`⚠️  تجاهلت "${file}": مش قادر أفصل محتوى الـ SVG.`);
    skipped++;
    continue;
  }
  
  // بنعمل namespacing للـ IDs قبل التخزين عشان نمنع التعارض
  // لما أكتر من أيقونة تتجمع في SVG واحد
  const prefix = `i-${name}-`;
  content = namespaceIds(content, prefix);
  
  // بنخزن viewBox + المحتوى بس، مش الملف كامل
  icons[name] = { viewBox, content };
}

fs.writeFileSync(path.join(distDir, 'icons.json'), JSON.stringify(icons));

console.log(`✅ Generated ${Object.keys(icons).length} icons`);
if (skipped) console.log(`   (تجاهلت ${skipped} ملف — راجع التحذيرات فوق)`);