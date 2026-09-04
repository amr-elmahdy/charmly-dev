const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

const icons = {};
const files = fs.readdirSync(iconsDir);

for (const file of files) {
  if (file.endsWith('.svg')) {
    const name = file.replace('.svg', '').toLowerCase();
    icons[name] = String(fs.readFileSync(path.join(iconsDir, file)));
  }
}

fs.writeFileSync(path.join(distDir, 'icons.json'), JSON.stringify(icons));
console.log(`✅ Generated ${Object.keys(icons).length} icons`);