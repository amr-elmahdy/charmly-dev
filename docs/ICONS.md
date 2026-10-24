# Charmly Icons

Add a row of tech icons to your README with one URL. No account, no API key, no install.

📋 [Full icon list](./ICONS-LIST.md)

---

## 🚀 Quick Start

**1.** Choose the icons you want, separated by commas:

```text
https://charmly.read-me.workers.dev/icons?i=javascript,react,docker
```

**2.** Paste it into your README:

```markdown
![Skills](https://charmly.read-me.workers.dev/icons?i=javascript,react,docker)
```

**3.** Done. The icons render as an image.

---

## 🎨 Customize

Add parameters to the URL with `&`.

| Parameter | What it does | Default | Allowed |
|-----------|--------------|---------|---------|
| `i` | Icons to show | required | Names from the [icon list](./ICONS-LIST.md), up to 50 |
| `perline` | Icons per row | all in one row | Any number |
| `size` | Icon size (px) | `48` | `16` – `128` |
| `gap` | Space between icons (px) | `8` | `0` – `32` |
| `radius` | Corner roundness (px) | `12` | `0` – `24` |
| `bg` | Show the background box | `true` | `true` / `false` |
| `bgcolor` | Background color (hex) | `#1a1b2e` | 3 or 6 hex digits, `#` optional |

### Examples

**Default**

```text
https://charmly.read-me.workers.dev/icons?i=html,css,csharp,cplusplus,c&perline=5
```

![Default](https://charmly.read-me.workers.dev/icons?i=html,css,csharp,cplusplus,c&perline=5)

**Soft corners and spacing**

```text
https://charmly.read-me.workers.dev/icons?i=javascript,typescript,kotlin,swift,webassembly,stimulus,keystone,appwrite&gap=12&radius=24&perline=5
```

![Soft](https://charmly.read-me.workers.dev/icons?i=javascript,typescript,kotlin,swift,webassembly,stimulus,keystone,appwrite&gap=12&radius=24&perline=5)

**Bold, dark background**

```text
https://charmly.read-me.workers.dev/icons?i=svelte,angular,react,nestjs,django&size=58&gap=0&radius=0&bgcolor=1c1c3c&perline=5
```

![Bold](https://charmly.read-me.workers.dev/icons?i=svelte,angular,react,nestjs,django&size=58&gap=0&radius=0&bgcolor=1c1c3c&perline=5)

**No background**

```text
https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=48&gap=10
```

![No background](https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=48&gap=10)

**Centered in HTML**

```html
<p align="center">
  <img src="https://charmly.read-me.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>
```

---

## ⚠️ Things to Know

- **Spelling matters.** Names are not case-sensitive, but they must match the [icon list](./ICONS-LIST.md). Unknown names are skipped without an error.
- **The limit is 50 names per request**, and it counts every name you type, including unknown ones.
- **`bgcolor` only applies when `bg=true`.**
- **Images refresh about every minute.** Changes you make to the URL can take up to a minute to appear.

### Errors

If a parameter is invalid, the image URL returns a plain-text message with status `400`. The message says which parameter is wrong and the allowed range, so check the table above.

If every icon name is unknown, you get an image that says `No valid icons found`.

---

## 🛠️ For Developers

This section explains how the service is built, for contributors and anyone adding icons.

### Project Structure

| Path | Purpose |
|------|---------|
| `icons/` | One `.svg` file per icon. The filename is the icon name. |
| `build-icons.js` | Converts `icons/` into `dist/icons.json`. |
| `dist/icons.json` | Generated. Each icon's `viewBox` and inner SVG markup. |
| `src/worker.js` | Entry point. Rate limiting, routing, and parameter validation. |
| `src/icons.js` | Defaults, limits, and SVG layout and rendering. |
| `src/utils.js` | Validation helpers for numbers, booleans, and hex colors. |
| `wrangler.toml` | Cloudflare config. Runs the build before each deploy. |

### How a Request Becomes an Image

1. **Rate limit.** The client IP (from `CF-Connecting-IP`) is checked. Over 100 requests per minute returns `429`.
2. **Parse.** `i` is split on commas, trimmed, lowercased, and empty entries are removed.
3. **Validate.** Each option is checked against its range. Any failure returns `400`.
4. **Filter.** Names not present in `dist/icons.json` are dropped.
5. **Layout.** `buildSvg()` in `src/icons.js` works out rows and columns:
   - `columns` is `perline` (capped at the icon count), or all icons if `perline` is missing or `0`.
   - `width = columns × size + (columns − 1) × gap`, and `height` works the same way with rows.
6. **Render.** Each icon is placed with `translate(x, y)`. With `bg=true`, it is drawn inside a rounded rectangle and clipped to it. With `bg=false`, it is placed directly.
7. **Respond.** An SVG is returned with a 60-second cache.

### Build Step

`build-icons.js` runs before each deploy (`npm run build`). For every SVG in `icons/`, it:

- Reads `viewBox` from the root `<svg>`. If that is missing, it uses `width` and `height`, falling back to `0 0 24 24`.
- Keeps only the markup inside `<svg>…</svg>`.
- Prefixes every `id` with the icon name, for example `id="a"` in `javascript` becomes `i-javascript-a`. This stops IDs clashing when several icons share one image, and updates the references (`url(#…)`, `href`, `xlink:href`).

Icons that cannot be parsed are skipped with a warning.

### Adding an Icon

1. Add `yourname.svg` to `icons/`. The name is lowercased, so use lowercase.
2. Make sure the SVG has a `viewBox`, or both `width` and `height`.
3. Run `npm run build` to check it. The output reports how many icons were generated and any skipped files.
4. Deploy. Then add the icon to [ICONS-LIST.md](./ICONS-LIST.md).

### Known Limitations

- ID rewriting is regex-based. `url('#id')` with quotes, and IDs referenced only from `style` attributes, are not rewritten. Those icons can break when they share an image with others.
- `perline` is documented as 1–50, but larger values are accepted and capped.
- `size`, `gap`, and `radius` accept decimals.
- The rate limit is kept per worker instance, so it is not a global limit.

---

## ❓ FAQ

### Why does my icon not show up?

Check the spelling against the [icon list](./ICONS-LIST.md). Unknown names are skipped silently. If none of the names are valid, you see `No valid icons found`.

### What is the difference between leaving out `perline` and using `perline=6`?

Without `perline`, all icons go in one row. With `perline=6`, you get six icons per row, and the rest wrap onto new rows.

### Why does `bgcolor` have no effect?

It only applies when the background is shown. Set `bg=true` (or leave it out) for `bgcolor` to take effect.

### Why does my URL fail with more than 50 icons?

The limit counts every name you type, including unknown names and repeats. Remove some names to get under 50.

### Why does the image take a minute to update?

Responses are cached for 60 seconds. The cache is kept short while the icon set is still changing.

### Can I use this outside a README?

Yes. The response is a standard SVG, and it allows cross-origin requests, so it works in websites and apps too.
