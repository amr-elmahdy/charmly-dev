# Charmly Icons

Reference for the `/icons` endpoint: parameters, limits, errors, examples, and how a request becomes an image.

The full icon catalog is in [ICONS-LIST.md](./ICONS-LIST.md). This page covers the API and how to use it.

---

## Table of Contents

- [Endpoint](#endpoint)
- [Parameters](#parameters)
- [Examples](#examples)
- [Errors](#errors)
- [Unknown Icon Names](#unknown-icon-names)
- [Rate Limit](#rate-limit)
- [How Charmly Serves an Icon](#how-charmly-serves-an-icon)
- [Limits](#limits)
- [FAQ](#faq)
- [Links](#links)

---

## Endpoint

```text
https://charmly.read-me.workers.dev/icons?i=javascript,react,docker
```

The response is an SVG image. Use the URL in Markdown:

```markdown
![Icons](https://charmly.read-me.workers.dev/icons?i=javascript,react,docker)
```

No API key. No account. No build step on your side.

---

## Parameters

| Parameter | Description | Required | Type | Range / Values | Default |
|-----------|-------------|:--------:|------|----------------|---------|
| `i` | Icon names, comma-separated | ✅ | string | Names from [ICONS-LIST.md](./ICONS-LIST.md) | — |
| `perline` | Icons per row | ❌ | integer | 1–50 | All icons in one row |
| `size` | Icon size in pixels | ❌ | integer | 16–128 | `48` |
| `gap` | Space between icons in pixels | ❌ | integer | 0–32 | `8` |
| `radius` | Box corner radius in pixels | ❌ | integer | 0–24 | `12` |
| `bg` | Show the background box | ❌ | boolean | `true` or `false` | `true` |
| `bgcolor` | Background box color | ❌ | hex | 3 or 6 hex digits, with or without `#` | `#1a1b2e` |

### Parameter Notes

- `perline` omitted: all icons go in one row. If the icon count is larger than `perline`, the output wraps into rows.
- `size`, `gap`, and `radius` outside their ranges return `400`.
- `bgcolor` is validated only when `bg=true`. When `bg=false`, the value is ignored.
- A request can include at most **50 icons**. Larger requests return `400`.

---

## Examples

### Default Row

```text
https://charmly.read-me.workers.dev/icons?i=javascript,typescript,react,nodejs,docker,postgresql&perline=6
```

![Default](https://charmly.read-me.workers.dev/icons?i=javascript,typescript,react,nodejs,docker,postgresql&perline=6)

### Rounded Corners and Wider Spacing

```text
https://charmly.read-me.workers.dev/icons?i=javascript,typescript,react,nodejs,nextjs,python,docker,postgresql&size=32&gap=12&radius=24&perline=4
```

![Soft](https://charmly.read-me.workers.dev/icons?i=javascript,typescript,react,nodejs,nextjs,python,docker,postgresql&size=32&gap=12&radius=24&perline=4)

### Flat Corners, Tight Grid, Custom Dark Background

```text
https://charmly.read-me.workers.dev/icons?i=python,pytorch,tensorflow,jupyter,opencv,pandas&size=56&gap=4&radius=0&bgcolor=1c1c3c&perline=6
```

![Bold](https://charmly.read-me.workers.dev/icons?i=python,pytorch,tensorflow,jupyter,opencv,pandas&size=56&gap=4&radius=0&bgcolor=1c1c3c&perline=6)

### No Background

```text
https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=48&gap=10
```

![No background](https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=48&gap=10)

### Centered in HTML

```html
<p align="center">
  <img src="https://charmly.read-me.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>
```

<p align="center">
  <img src="https://charmly.read-me.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>

---

## Errors

All errors return `text/plain` with the HTTP status below.

| Condition | Status | Response Body |
|-----------|:------:|---------------|
| `i` missing or empty | `400` | `Missing "i" query parameter, e.g. ?i=js,html,css` |
| More than 50 icons | `400` | `Too many icons requested: max 50, got <N>` |
| `size` invalid | `400` | `Invalid "size" parameter: must be a number between 16 and 128` |
| `gap` invalid | `400` | `Invalid "gap" parameter: must be a number between 0 and 32` |
| `radius` invalid | `400` | `Invalid "radius" parameter: must be a number between 0 and 24` |
| `bg` invalid | `400` | `Invalid "bg" parameter: must be "true" or "false"` |
| `bgcolor` invalid | `400` | `Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color, e.g. "ff0000" or "#f00"` |
| Rate limit exceeded | `429` | `Too Many Requests` with `Retry-After: 60` |
| Unknown path | `404` | `Not found` |

---

## Unknown Icon Names

Names that are not in `dist/icons.json` are skipped. If every requested name is unknown, the SVG contains:

```text
No valid icons found
```

---

## Rate Limit

- **100 requests per minute per IP.**
- Counters live in Worker memory, per isolate. This throttles a single abusive client but is **not** a global counter across all Cloudflare colos.
- When the limit is exceeded, the response is `429` and includes `Retry-After: 60`.

---

## How Charmly Serves an Icon

### 1. Icon Files

Each icon is a separate `.svg` file in `icons/`. The filename without `.svg` is the icon ID used in `?i=`.

### 2. Build Step

`build-icons.js` runs before deployment. It does four things:

1. Reads every `.svg` file in `icons/`.
2. Extracts `viewBox` from the root `<svg>` tag.
3. Extracts the inner content between `<svg>` and `</svg>`.
4. Namespaces every ID inside the icon. An ID like `a` becomes `i-javascript-a`, and every reference is updated:
   - `url(#a)`
   - `xlink:href="#a"`
   - `href="#a"`

The output is written to `dist/icons.json`:

```json
{
  "javascript": {
    "viewBox": "0 0 24 24",
    "content": "<path ... />"
  }
}
```

### 3. Request Handling

The Worker receives `GET /icons`.

1. Reads the client IP from `CF-Connecting-IP`.
2. Applies rate limiting.
3. Reads `i`, `perline`, `size`, `gap`, `radius`, `bg`, and `bgcolor`.
4. Validates each value.
5. Filters out icon names that are not present in `dist/icons.json`.
6. Computes layout:
   - `columns = perline` or the number of valid icons
   - `rows = ceil(valid icons / columns)`
   - `width = columns * size + (columns - 1) * gap`
   - `height = rows * size + (rows - 1) * gap`
7. Renders each icon inside a `<g transform="translate(x, y)">`.
8. Returns one SVG with these headers:

```http
Content-Type: image/svg+xml; charset=utf-8
Cache-Control: public, max-age=60
Access-Control-Allow-Origin: *
X-Content-Type-Options: nosniff
```

### 4. Background Handling

- **`bg=true`**: each icon is rendered inside a rounded rectangle with the requested `bgcolor` and `radius`. The icon is clipped to that rectangle.
- **`bg=false`**: the rectangle and clip path are skipped. The icon is placed directly in the layout.

### 5. Cache

The response is cached for **60 seconds**. This is intentionally short while the project is under active development. It will increase once the icon set and rendering are stable.

---

## Limits

| Limit | Value |
|-------|-------|
| Icons per request | 50 |
| Icon size | 16–128 px |
| Gap | 0–32 px |
| Corner radius | 0–24 px |
| Icons per row | 1–50, or all in one row |
| Rate limit | 100 requests/minute per IP |
| Cache | 60 seconds |

---

## FAQ

>**How do I add an icon?**
>
>Add an `.svg` file to `icons/` and commit it. The next build includes it.

>**Why do icon IDs get prefixed in `dist/icons.json`?**
>
>To prevent ID collisions when multiple icons appear in one SVG. An icon that defines `id="a"` would otherwise conflict with another icon that also defines `id="a"`.

>**What happens if an icon is missing?**
>
>It is skipped. If every requested icon is missing, the SVG contains `No valid icons found`.

>**What is the difference between `perline` omitted and `perline=6`?**
>
>Omitted: one row. `perline=6`: six icons per row, then wrap.

>**Does `bgcolor` work when `bg=false`?**
>
>No. `bgcolor` is ignored when the background is hidden.

>**Is there a maximum number of icons per request?**
>
>Yes. 50.

>**Why is the cache only 60 seconds?**
>
>Active development. Icon updates should appear quickly. The value will increase when the project stabilizes.

---

## Links

- [Full icon list](./ICONS-LIST.md)
- [Cards guide](./CARDS.md)
- [Changelog](../CHANGELOG.md)
- [License](../LICENSE)
- [Third-party notices](../NOTICE.md)
