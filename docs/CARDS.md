# Charmly Cards

Turn any project, game, or wiki into a card for your README: a cover image, a title, a description, and live GitHub info. One URL, no account, no API key.

📋 [Icons guide](./ICONS.md)

---

## 🚀 Quick Start

**1.** Build a URL. `title` and `img` are required:

```text
https://charmly.read-me.workers.dev/card?title=My+Project&img=https://example.com/cover.jpg
```

**2.** Wrap it in a link so the card points to your project:

```markdown
[![My Project](https://charmly.read-me.workers.dev/card?title=My+Project&img=https://example.com/cover.jpg)](https://github.com/you/my-project)
```

**3.** Done. The card renders as an image.

> Spaces in `title` and `desc` can be written as `+`. Encode special characters in the `img` URL, for example `%20` for spaces.

---

## 🎨 Customize

Add parameters with `&`. Most parameters have a short alias in brackets.

### Required

| Parameter | Alias | What it does |
|-----------|:-----:|--------------|
| `title` | `t` | Card title. Truncated with `...` if it does not fit. |
| `img` | — | Cover image URL. Must be `http(s)`. |

### Layout

| Parameter | Alias | Values | Default | Effect |
|-----------|:-----:|--------|---------|--------|
| `size` | `s` | `s`, `m`, `l` | `m` | Width of the text panel: 250, 500, or 750 px |
| `imagewidth` | `iw` | `s`, `m`, `l`, `xl` | `m` | Width of the image: 150, 250, 350, or 500 px |
| `corner` | `co` | `sharp`, `smooth` | `smooth` | Corner style |

The card is always **250 px tall**. Total width is the image width plus the panel width.

### Image

| Parameter | Alias | Values | Default | Effect |
|-----------|:-----:|--------|---------|--------|
| `imagermerge` | `im` | `cut`, `line`, `smooth` | `cut` | How the image meets the panel. `cut` is a hard edge, `line` adds a thin white divider, `smooth` fades into the panel color. |

### Colors and Text

| Parameter | Alias | Values | Default | Effect |
|-----------|:-----:|--------|---------|--------|
| `colour` | `c` | One or two hex colors, comma-separated | `#5865F2,#1a1d2e` | Panel background. Two colors make a left-to-right gradient. |
| `titlecolor` | `tc` | 3 or 6 hex digits | `#ffffff` | Title color |
| `desc` | `d` | Text | none | Description. Up to 3 lines. |
| `descsize` | `ds` | `s`, `m`, `l` | `m` | Description size: 12, 14, or 16 px |
| `desccolor` | `dc` | 3 or 6 hex digits | `#a8b0c0` | Description color |
| `titleline` | `tl` | `true` | off | Draws a thin separator under the title. Only the exact value `true` works. |

### Widgets

Widgets go in three corners of the card.

| Parameter | Alias | Position |
|-----------|:-----:|----------|
| `topright` | `tr` | Right side, on the title line |
| `bottomright` | `br` | Bottom right |
| `bottomleft` | `bl` | Bottom left |

Each widget is written as `type:value`:

| Widget | Value | Shows |
|--------|-------|-------|
| `state` | `release`, `prototype`, `archive`, `in-development` | A colored dot and status label |
| `badges` | Up to 5 comma-separated labels, 20 characters each | Pill-shaped tags |
| `stars` | `owner/repo` | ★ and the repo's star count (live) |
| `version` | `owner/repo` | Latest release tag, such as `v1.2.0` (live) |
| `lan` | `owner/repo` | Primary language, with its icon when one exists (live) |

Example: `tr=stars:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly`

---

## 🖼️ Live Showcase

Each image below is a live card. Copy any URL into a README to use it.

### Real Projects

[![Charmly](https://charmly.read-me.workers.dev/card?title=Charmly&desc=An+icon+API+for+READMEs+-+drop+a+URL%2C+get+an+icon.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/charmly-500.jpg&c=140035,100030&tc=B048D0&dc=D0C0D0&tl=true&im=smooth&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly)](https://github.com/amr-elmahdy/Charmly)

[![The Last Lantern](https://charmly.read-me.workers.dev/card?title=The+Last+Lantern&desc=You+have+20+seconds+of+light.+Make+them+count.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/the-last-lantern-500.jpg&c=0a0a0f,2a1a0a&tc=fef3c7&dc=a1a1aa&tl=true&tr=state:release&bl=badges:Horror,Exploration,GMTK+2026)](https://github.com/Orpita-Community/the-last-lantern)

[![Jurdian Cipher Wiki](https://charmly.read-me.workers.dev/card?title=Jurdian+Cipher+Wiki&desc=A+large+encyclopedia+of+ciphers.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/jurdian-500.jpg&c=303030,000000&tc=C0A038&dc=786848&tl=true&tr=state:in-development&bl=badges:Ciphers,Cryptography,Wiki)](https://github.com/Jurdian-Project/jurdian-cipher-wiki)

> These images load from the live endpoint. If one shows a broken image, open its URL in a browser to see the error message.

---

## ⚠️ Things to Know

- **`tl=true` is the only valid value** for the title line. `tl=1` or `tl=yes` is ignored.
- **Invalid parameters return an error**, not a fallback. The error names the parameter, for example `Invalid "size" parameter. Must be one of: s, m, l`. Widget errors start with the widget name, for example `"topright": unknown widget type "star"`.
- **A bad `img` URL does not return an error.** The image is just missing. Make sure the link opens in a browser and points to a PNG, JPEG, WebP, or GIF.
- **Live widgets come from GitHub.** Private repos and repos that do not exist show `★ ?` or `v?`, and the language widget shows nothing.
- **Badges are dropped when space runs out.** If a badge row is too wide, the extra badges are hidden.

### Errors

| Problem | Message |
|---------|---------|
| No title | `Missing required parameter: title` |
| No image | `Missing required parameter: img` |
| Bad `size` | `Invalid "size" parameter. Must be one of: s, m, l` |
| Bad `imagewidth` | `Invalid "imagewidth" parameter. Must be one of: s, m, l, xl` |
| Bad `corner` | `Invalid "corner" parameter. Must be one of: sharp, smooth` |
| Bad `imagermerge` | `Invalid "imagermerge" parameter. Must be one of: cut, line, smooth` |
| Bad `descsize` | `Invalid "descsize" parameter. Must be one of: s, m, l` |
| Bad `titlecolor` or `desccolor` | `Invalid "titlecolor" parameter. Must be a 3 or 6 digit hex color` |
| Bad `colour` | `Invalid "colour" parameter. Must be hex or hex,hex` |
| Bad widget | `"topright": …`, `"bottomright": …`, or `"bottomleft": …` followed by the reason |

All errors return status `400` with a plain-text body. Rate-limited requests return `429`, shared with the icons endpoint (100 per minute per IP).

---

## 🛠️ For Developers

### Project Structure

| File | Purpose |
|------|---------|
| `src/worker.js` | Reads parameters and their aliases, embeds the image, and calls `generateCard()` |
| `src/card/index.js` | Validates input, resolves widget data, and assembles the final SVG |
| `src/card/layout.js` | Sizes, positions, and validators for `size`, `imagewidth`, and `corner` |
| `src/card/colors.js` | Parses `colour` into one or two colors |
| `src/card/content.js` | Title and description rendering, truncation, and wrapping |
| `src/card/image.js` | Merge modes: `cut`, `line`, `smooth` |
| `src/card/image-fetcher.js` | Downloads the cover image and embeds it as base64 |
| `src/card/parser.js` | Parses `type:value` widget strings |
| `src/card/widgets.js` | Measures and renders the five widget types |
| `src/card/github.js` | GitHub API calls with a 1-hour cache |

### How a Card Is Built

1. **Route and parse.** `worker.js` reads each parameter, using its alias if the full name is missing.
2. **Embed the image.** If `img` is a remote URL, it is downloaded and converted to a `data:` URI. If that fails, the original URL is used.
3. **Validate.** `generateCard()` checks every option. The first error stops the request.
4. **Resolve widgets.** The three widget values are parsed and their data is fetched in parallel. `stars` and `lan` use the repo stats, and `version` uses the latest release.
5. **Lay out.** `computeLayout()` gives the card its width, the title and description positions, and the widget baselines.
6. **Compose.** `composeSvg()` draws, in order: gradient background, image, title, `topright` widget, title line, description, `bottomleft`, and `bottomright`. Everything is clipped to a rounded rectangle.

The title is shortened when a `topright` widget is present, so it does not overlap the widget.

### Caching

| What | Where | How long |
|------|-------|----------|
| Repo stats and release tag | `caches.default` | 1 hour |
| Final card SVG | HTTP header | 60 seconds |
| Cover image | Not cached | Downloaded on every request |

### Adding a Widget Type

1. Add the name to `KNOWN_TYPES` in `parser.js`, and write a parse function for its value.
2. If it needs live data, add a branch in `resolveWidgetData()` in `index.js`, and a fetch function in `github.js`.
3. Add `measure` and `render` branches in `widgets.js`.

---

## ⚠️ Known Limitations

- **Text width is estimated** by character count, about 0.55 em per character. Wide letters can overflow, and narrow ones leave gaps.
- **Card height is fixed** at 250 px.
- **Cover images are limited to 200 KB**, and only PNG, JPEG, WebP, and GIF are embedded. SVG and other formats are linked directly, which may not render.
- **GitHub data uses unauthenticated requests**, so the Worker's shared GitHub rate limit applies. When it is hit, live widgets fall back to placeholders.
- **Widget values cannot contain `:`**, so a badge like `Note: draft` is rejected.

---

## ❓ FAQ

### My cover image does not show. Why?

Check that the URL opens in a browser and points to a PNG, JPEG, WebP, or GIF under 200 KB. If the image is too large or in another format, it is linked directly, and GitHub may not display it.

### Why does a widget show `★ ?` or `v?`?

GitHub did not return data for that repo. The usual causes are a typo in `owner/repo`, a private repo, or the shared GitHub rate limit being reached. The data is retried after the 1-hour cache expires.

### Why are some of my badges missing?

There was not enough room. Badges are added left to right until the space runs out, so shorten the labels or remove some.

### How do I show the title line?

Add `tl=true`. Other values are ignored.

### Why does my card take a minute to update?

The card is cached for 60 seconds, and live GitHub data for 1 hour. Changes to the star count or release can take up to an hour to appear.

### Can I use private repos in widgets?

No. Widget data comes from the public GitHub API without authentication, so private repos show placeholders.

### Can I change the height?

No. Cards are always 250 px tall. Use `size` and `imagewidth` to change the width.
