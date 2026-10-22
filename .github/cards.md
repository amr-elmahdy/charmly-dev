<div align="center">

# Charmly Card Endpoint

**Generate beautiful SVG cards for your projects, games, or profiles.**

[![Charmly Banner](.github/imgs/banner.png)](#charmly-card-endpoint)

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Required Parameters](#required-parameters)
- [Card Layout](#card-layout)
- [Image Configuration](#image-configuration)
- [Content Configuration](#content-configuration)
- [Widgets](#widgets)
- [Colors](#colors)
- [Full Parameter Reference](#full-parameter-reference)
- [Examples Gallery](#examples-gallery)
- [Error Handling](#error-handling)
- [Rate Limits & Caching](#rate-limits--caching)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Limitations](#limitations)

---

## Introduction

The **Charmly Card Endpoint** generates a single SVG image that combines:

- 🖼️ A **cover image** on the left
- 📝 A **title** and **description** on the right
- 🏷️ **Widgets** in the corners (status, badges, stars, language, version)
- 🎨 A **customizable gradient background**
- ✨ **Smooth transitions** between the image and text panel

The result is a clean, modern card you can drop into:

- GitHub profile READMEs
- Project documentation
- Portfolio pages
- Blog posts (anywhere that renders Markdown)

> **Built on Cloudflare Workers · GitHub API integration · Zero configuration required**

---

## Quick Start

The simplest possible card:

```markdown
![My Project](https://charmly.read-me.workers.dev/card?title=My+Project&img=https://i.imgur.com/example.png)
```

Preview:

![My Project](https://charmly.read-me.workers.dev/card?title=My+Project&img=https://i.imgur.com/example.png)

That's it. Just `title` and `img`. Everything else is optional.

---

## How It Works

When you call `/card`, the endpoint:

1. Reads and validates the parameters from the URL
2. Fetches your image and converts it to base64 (required for GitHub)
3. Calls the GitHub API for the `stars`, `lan`, and `version` widgets (cached for 1 hour)
4. Calculates the layout based on the card size and image size
5. Composes the SVG and returns it with `Content-Type: image/svg+xml`
6. GitHub Camo caches the result and displays it in your README

> ⚠️ **Important:** Images larger than **200 KB** will not be embedded. Compress them with [TinyPNG](https://tinypng.com) first.

---

## Required Parameters

These are the only parameters you must provide.

### `title`

The card's main heading, displayed at the top of the text panel.

| Property | Value |
|---|---|
| Type | `string` |
| Required | ✅ Yes |
| Max displayed | ~30 characters (auto-truncated with `...`) |
| Short alias | `t` |

### `img`

The cover image URL, displayed on the left side.

| Property | Value |
|---|---|
| Type | URL string |
| Required | ✅ Yes |
| Formats | PNG, JPEG, WebP, GIF |
| Max size | 200 KB |

**Notes:**

- Must be a **direct** image URL, not a page URL
- GitHub raw URLs and Imgur links work
- Converted to base64 internally for GitHub compatibility

**Example:**

```
/card?title=My+Game&img=https://i.imgur.com/example.png
```

---

## Card Layout

Controls the overall size and shape of the card.

### `size` (short: `s`)

Controls the text panel width.

| Value | Panel Width | Total Card Width (with image `m`) |
|---|---|---|
| `s` | 250 px | 500 px |
| `m` (default) | 500 px | 750 px |
| `l` | 750 px | 1000 px |

```markdown
![Card](...&s=l)   <!-- Wide card -->
```

### `corner` (short: `co`)

Controls the corner style of the entire card.

| Value | Description |
|---|---|
| `sharp` | Square corners (0 px radius) |
| `smooth` (default) | Rounded corners (12 px radius) |

```markdown
![Card](...&co=sharp)
```

### `colour` (short: `c`)

The background color. Can be a single color or a gradient.

| Format | Example | Result |
|---|---|---|
| Single hex | `c=1a1a3a` | Solid background |
| Two hexes | `c=5865F2,1a1d2e` | Gradient (left → right) |

- **Default:** `#5865F2` → `#1a1d2e` (violet to dark navy)
- **Direction:** always left-to-right

```markdown
![Card](...&c=5865F2,1a1d2e)
```

---

## Image Configuration

Controls the cover image on the left.

### `imagewidth` (short: `iw`)

The width of the image in pixels. The height is always **250 px** (full card height).

| Value | Image Width | Notes |
|---|---|---|
| `s` | 150 px | Small, compact |
| `m` (default) | 250 px | Square (1:1) |
| `l` | 350 px | Wide |
| `xl` | 500 px | Extra wide |

```markdown
![Card](...&iw=xl)   <!-- Wide image -->
```

### `imagermerge` (short: `im`)

Controls how the image transitions into the text panel.

| Value | Description |
|---|---|
| `cut` (default) | Image ends abruptly, no transition |
| `line` | Thin white separator line between image and panel |
| `smooth` | Image fades into the panel color over the last 15% of its width |

**Visual comparison:**

```
cut:     [IMAGE████████][PANEL███████████]
line:    [IMAGE████████]│[PANEL███████████]
smooth:  [IMAGE███████████████████][PANEL]
                        ↑
                     fade zone
```

```markdown
![Card](...&im=smooth)
```

> 💡 **Recommendation:** Use `smooth` for the most polished look, `cut` for a clean, sharp aesthetic, and `line` for a subtle divider.

---

## Content Configuration

Controls the text content on the right.

### `desc` (short: `d`)

The description text below the title.

| Property | Value |
|---|---|
| Type | `string` |
| Max lines | 3 (auto-wrapped) |
| Max chars per line | ~46 (depends on card size) |
| Truncation | Adds `...` when text overflows |
| Default | Empty (no description) |

```markdown
![Card](...&desc=A+challenging+2D+adventure+game)
```

### `titlecolor` (short: `tc`)

Color of the title text.

- **Type:** hex color
- **Default:** `#ffffff` (white)
- **Formats:** `fff`, `ffffff`, `#fff`, `#ffffff`

```markdown
![Card](...&tc=ff6b6b)
```

### `titleline` (short: `tl`)

Shows or hides a thin separator line under the title.

- **Type:** boolean (`true` / `false`)
- **Default:** `false` (hidden)

```markdown
![Card](...&tl=true)
```

> **When to use:** when you want to visually separate the title from the description.

### `desccolor` (short: `dc`)

Color of the description text.

- **Type:** hex color
- **Default:** `#a8b0c0` (light gray-blue)

```markdown
![Card](...&dc=ffffff)
```

### `descsize` (short: `ds`)

Size of the description text.

| Value | Font Size |
|---|---|
| `s` | 12 px |
| `m` (default) | 14 px |
| `l` | 16 px |

```markdown
![Card](...&ds=l)
```

---

## Widgets

Widgets appear in three corners of the card:

```
┌─────────────────────────────────────┐
│         │  Title            [TR]    │
│  IMAGE  │                           │
│         │  Description              │
│         │                           │
│         │  [BL]              [BR]   │
└─────────────────────────────────────┘
```

> **TL (top-left)** is reserved for the title. Widgets are not allowed there.

### Widget Syntax

Every widget uses the format:

```
type:value
```

The `:` separator prevents widget injection (values cannot contain `:`).

### Widget Placement

| Corner | Full Name | Short Name | Align |
|---|---|---|---|
| Top-right | `topright` | `tr` | right |
| Bottom-right | `bottomright` | `br` | right |
| Bottom-left | `bottomleft` | `bl` | left |

> **Rule:** Only one widget per corner. Multiple widgets require different corners.

---

### Widget: `state`

Shows the project's current status as a colored dot and label.

```
state:release
state:prototype
state:archive
state:in-development
```

| State | Color | Label |
|---|---|---|
| `release` | 🟢 `#4ade80` | RELEASE |
| `prototype` | ⚪ `#94a3b8` | PROTOTYPE |
| `archive` | 🔴 `#ef4444` | ARCHIVE |
| `in-development` | 🟣 `#a78bfa` | IN DEVELOPMENT |

```markdown
![Card](...&tr=state:release)
```

---

### Widget: `badges`

Displays small pill badges. Useful for tags, categories, or technologies.

```
badges:tag1,tag2,tag3
```

**Constraints:**

- Maximum **5** badges
- Each badge max **20** characters
- Comma-separated
- No spaces (they're trimmed automatically)

```markdown
![Card](...&bl=badges:api,cloudflare,open-source)
```

Renders as: `[api]` `[cloudflare]` `[open-source]`

---

### Widget: `stars`

Shows the GitHub stars count for a repository.

```
stars:owner/repo
```

```markdown
![Card](...&tr=stars:amr-elmahdy/Charmly)
```

Renders as: `★ 123`

- **Data source:** GitHub API, cached for 1 hour
- **Fallback:** if the API fails → `★ ?`

---

### Widget: `lan`

Shows the primary programming language of a GitHub repository.

```
lan:owner/repo
```

```markdown
![Card](...&bl=lan:amr-elmahdy/Charmly)
```

Renders as: `[icon] JavaScript`

- **Icon:** pulled from Charmly's icon library if the language is supported
- **Data source:** GitHub API, cached for 1 hour
- **Fallback:** if the API fails → widget hidden

---

### Widget: `version`

Shows the latest release version of a GitHub repository.

```
version:owner/repo
```

```markdown
![Card](...&br=version:amr-elmahdy/Charmly)
```

Renders as: `v1.2.0`

- **Data source:** GitHub Releases API, cached for 1 hour
- **Fallback:** if the API fails or there are no releases → `v?`

---

## Colors

All colors accept hex values with or without `#`.

| Format | Example |
|---|---|
| 3-digit | `fff`, `f00`, `0a0` |
| 6-digit | `ffffff`, `5865F2` |
| With `#` | `#ffffff`, `#5865F2` |

**Using colors in URLs:**

- `#` in a URL must be encoded as `%23`
- Simpler: just omit the `#` (both work)

```markdown
✅ ...&tc=ff0000
✅ ...&tc=%23ff0000
❌ ...&tc=#ff0000   (won't work: # breaks the URL)
```

---

## Full Parameter Reference

### Layout Parameters

| Full | Short | Values | Default |
|---|---|---|---|
| `size` | `s` | `s`, `m`, `l` | `m` |
| `imagewidth` | `iw` | `s`, `m`, `l`, `xl` | `m` |
| `imagermerge` | `im` | `cut`, `line`, `smooth` | `cut` |
| `corner` | `co` | `sharp`, `smooth` | `smooth` |
| `colour` | `c` | hex or `hex,hex` | `#5865F2,#1a1d2e` |

### Content Parameters

| Full | Short | Values | Default |
|---|---|---|---|
| `title` | `t` | string | **required** |
| `desc` | `d` | string | empty |
| `titlecolor` | `tc` | hex | `#ffffff` |
| `titleline` | `tl` | `true` / `false` | `false` |
| `desccolor` | `dc` | hex | `#a8b0c0` |
| `descsize` | `ds` | `s`, `m`, `l` | `m` |

### Media

| Full | Values | Default |
|---|---|---|
| `img` | image URL | **required** |

### Widgets

| Full | Short | Format |
|---|---|---|
| `topright` | `tr` | `type:value` |
| `bottomright` | `br` | `type:value` |
| `bottomleft` | `bl` | `type:value` |

---

## Examples Gallery

**1. Minimal card**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=My+Game&img=https://i.imgur.com/example.png)
```

**2. Card with description and title line**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=My+Game&desc=An+epic+adventure+across+twelve+worlds&img=https://i.imgur.com/example.png&tl=true)
```

**3. Card with custom colors**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Midnight&desc=Dark+theme+portfolio&img=https://i.imgur.com/example.png&c=0a0a0f,1f1f2e&tc=e0e0ff)
```

**4. Smooth image transition**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Smooth&img=https://i.imgur.com/example.png&im=smooth)
```

**5. Game card with state and badges**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Catastrophe&desc=A+2D+platformer+with+time-loop+mechanics&img=https://i.imgur.com/example.png&tr=state:in-development&bl=badges:platformer,puzzle,pixel-art)
```

**6. Full GitHub project card**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Charmly&desc=Icon+API+for+READMEs&img=https://i.imgur.com/example.png&s=l&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly)
```

**7. Wide card, wide image, sharp corners**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Wide&img=https://i.imgur.com/example.png&s=l&iw=xl&co=sharp)
```

**8. Compact card, small everything**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Tiny&img=https://i.imgur.com/example.png&s=s&iw=s&ds=s)
```

**9. Portfolio with GitHub stats**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=Amr+Elmahdy&desc=Developer+%26+creator&img=https://i.imgur.com/example.png&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly)
```

**10. Arcade aesthetic**

```markdown
![Card](https://charmly.read-me.workers.dev/card?title=NEON+RUNNER&desc=Retro+arcade+action&img=https://i.imgur.com/example.png&c=ff00ff,000000&co=sharp&im=cut&tc=00ffff&tl=true&tr=state:release)
```

---

## Error Handling

The endpoint validates every parameter. On failure, it returns a `400 Bad Request` with a descriptive message.

| Error | Message |
|---|---|
| Missing title | `Missing required parameter: title` |
| Missing image | `Missing required parameter: img` |
| Invalid size | `Invalid "size" parameter. Must be one of: s, m, l` |
| Invalid image width | `Invalid "imagewidth" parameter. Must be one of: s, m, l, xl` |
| Invalid merge mode | `Invalid "imagermerge" parameter. Must be one of: cut, line, smooth` |
| Invalid corner | `Invalid "corner" parameter. Must be one of: sharp, smooth` |
| Invalid color | `Invalid "colour" parameter. Must be hex or hex,hex` |
| Invalid title color | `Invalid "titlecolor" parameter. Must be a 3 or 6 digit hex color` |
| Invalid description color | `Invalid "desccolor" parameter. Must be a 3 or 6 digit hex color` |
| Invalid desc size | `Invalid "descsize" parameter. Must be one of: s, m, l` |
| Invalid widget syntax | `"topright": expected "type:value" format` |
| Unknown widget type | `"topright": unknown widget type "foo". Allowed: state, badges, stars, lan, version` |
| Invalid state | `"topright": invalid state value "xxx". Allowed: release, prototype, archive, in-development` |
| Too many badges | `"bottomleft": too many badges (max 5, got 7)` |
| Badge too long | `"bottomleft": badge too long (max 20 chars): "verylongname"` |
| Invalid repo format | `"topright": invalid repo format "foo". Expected: owner/repo` |

**GitHub API failures do NOT return errors.** The widgets degrade gracefully:

- `stars` → `★ ?`
- `lan` → hidden
- `version` → `v?`

---

## Rate Limits & Caching

**Charmly rate limit**

- 100 requests per minute per IP
- Exceeding it returns `429 Too Many Requests` with a `Retry-After: 60` header

**GitHub API rate limit**

- 60 requests per hour per IP (unauthenticated)
- Charmly caches each repo's data for 1 hour to stay well under the limit
- The same repo requested by many users triggers only 1 GitHub API call per hour

**Image caching**

- Browser: respects `Cache-Control: max-age=60`
- GitHub Camo: proxies and caches images independently
- Cloudflare Cache: card responses cached for 60 seconds at the edge

---

## Best Practices

### Image Selection

**✅ Do:**

- Use square images (1:1 ratio), which look best with `iw=m` or `iw=l`
- Compress with [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app) before uploading
- Use stable URLs (Imgur direct links, GitHub raw URLs)
- Test the URL in a browser first. It should show the image, not a webpage

**❌ Don't:**

- Use page URLs (e.g., `github.com/.../blob/...` instead of `raw.githubusercontent.com/...`)
- Use images larger than 200 KB
- Use animated GIFs (only the first frame shows)
- Use URLs that require authentication

### Card Sizes

- **`s` (small):** lists, sidebars, compact displays
- **`m` (medium):** default, works everywhere
- **`l` (large):** hero sections, featured projects

### Widget Combinations

| Use Case | Recommended Widgets |
|---|---|
| Game project | `tr=state:...` + `bl=badges:...` |
| Open source | `tr=stars:owner/repo` + `br=version:owner/repo` + `bl=lan:owner/repo` |
| Portfolio | `tr=stars:owner/repo` + `bl=badges:...` |
| Minimal | None. Let the card breathe |

### Color Tips

- Dark gradients work best with white text
- Light gradients require dark text (`tc=000000`)
- Test contrast so the text stays readable
- Match your brand: use brand colors if you have them

---

## Troubleshooting

### "The image doesn't show up on GitHub"

**Possible causes:**

1. The image URL is not direct. Check that it ends in `.png`, `.jpg`, `.webp`, or `.gif`
2. The image is larger than 200 KB. Compress it
3. The image URL is behind authentication. It must be publicly accessible
4. The image is SVG, which is not supported. Use PNG, JPG, or WebP
5. GitHub Camo cache. Try a hard refresh (Ctrl+F5) on the README

**Fix:** Open the image URL directly in your browser. If you see the image, it should work in the card.

### "The card doesn't show up at all"

**Possible causes:**

1. Malformed URL: check for typos or unencoded spaces
2. Missing `title` or `img`. Both are required
3. Rate limited. Wait 60 seconds
4. Invalid parameter value. Check the error message

**Fix:** Open the card URL directly in your browser. If you see an error message, fix that.

### "The GitHub widget shows `?`"

**Cause:** GitHub API rate limit exceeded or a network error.

**Fix:** Wait 1 hour for the limit to reset, or the cache will refresh automatically.

### "Colors don't appear correctly"

**Possible causes:**

1. Missing `#`. Most browsers accept `fff` without `#`, but some require it. Try `tc=%23fff` (URL-encoded)
2. Color values are inverted. Light text on a light background is invisible

**Fix:** Make sure there is enough contrast between the text and the background.

### "Text is cut off"

**Cause:** The title or description exceeds the panel width.

**Fix:** Shorten your text, or use `s=l` for a larger card.

---

## Limitations

**Current version**

- No custom fonts. Uses the system font stack
- No multiline titles. Titles are truncated to 1 line
- No HTML. Descriptions are plain text only
- No SVG images. Only raster formats (PNG, JPG, WebP, GIF)
- No animated cards. The SVG is static
- GitHub widgets require public repos. Private repo data is not accessible

**Planned for future versions**

- 🔜 Custom theme presets
- 🔜 More widget types (followers, forks, issues)
- 🔜 Multiple images (image galleries)
- 🔜 Custom fonts
- 🔜 Light/dark theme variants

---

## Full Example

A complete, feature-rich card:

```markdown
[![Charmly](https://charmly.read-me.workers.dev/card?title=Charmly&desc=Icon+API+for+READMEs+—+drop+a+URL%2C+get+an+icon.+Built+on+Cloudflare+Workers.&img=https://i.imgur.com/example.png&s=l&iw=l&im=smooth&co=smooth&c=5865F2,1a1d2e&tc=ffffff&tl=true&dc=a8b0c0&ds=m&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly)](https://github.com/amr-elmahdy/Charmly)
```

**Result:**

- Large card (750 px panel + 350 px image = 1100 px total)
- Smooth image fade
- Rounded corners
- Violet-to-navy gradient
- White title with separator line
- Light gray description
- ⭐ Stars (TR), version (BR), language (BL)

---

<div align="center">

Built with ❤️ by [amr-elmahdy](https://github.com/amr-elmahdy)

[Report an Issue](https://github.com/amr-elmahdy/Charmly/issues)

</div>
