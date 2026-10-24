# Contributing to Charmly

Thanks for your interest in improving Charmly. This document covers the practical steps for contributing icons, fixing bugs, or proposing features.

Charmly is a small project, and contributions are reviewed manually. Keeping PRs focused and well-described makes that process faster.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Project Structure](#project-structure)
- [Adding Icons](#adding-icons)
- [Code Changes](#code-changes)
- [Local Development](#local-development)
- [Testing](#testing)
- [Style and Conventions](#style-and-conventions)
- [Legal](#legal)
- [Review Process](#review-process)

---

## Ways to Contribute

- **Report a bug:** open an issue using the [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md)
- **Request a feature:** open an issue using the [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md)
- **Suggest an icon:** open an issue using the [icon request template](./.github/ISSUE_TEMPLATE/icon_request.md)
- **Submit a pull request:** for icon additions, bug fixes, or documentation improvements

For questions that are not bugs or feature requests, use [GitHub Discussions](https://github.com/amr-elmahdy/Charmly/discussions).

---

## Project Structure

```

charmly/
├── .github/
│   ├── imgs/                # Banner and screenshots
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── workflows/           # CI/CD pipelines
├── docs/                    # Documentation
│   ├── ICONS.md             # Icons guide
│   ├── ICONS-LIST.md        # Full icon catalog
│   ├── CARDS.md             # Cards guide
│   └── FAQ.md               # Common questions
├── icons/                   # SVG icon files
├── src/
│   ├── card/                # Card rendering modules
│   ├── icons.js             # Icons endpoint
│   ├── utils.js             # Shared helpers
│   └── worker.js            # Cloudflare Worker entry point
├── build-icons.js           # Builds dist/icons.json
├── wrangler.toml            # Cloudflare Worker config
└── package.json

```

---

## Adding Icons

Icons are stored as individual SVG files in `icons/`.

### Steps

1. Add your SVG file to `icons/` with a lowercase name and `.svg` extension (e.g., `astro.svg`).
2. Ensure the SVG has a valid `viewBox`.
3. Prefer official brand assets or a well-maintained icon library when
   available. theSVG, Devicon, and Simple Icons are common sources, but
   any source with a compatible license works.
4. Add the icon to `icons.txt` under the appropriate category, if applicable.
5. Commit and open a pull request.

### SVG requirements

- Valid `viewBox` attribute on the root `<svg>` element.
- No external references (`<image href="https://...">`, remote CSS, web fonts).
- No `<script>` tags, event handlers (`onload`, `onclick`), or `<foreignObject>`.
- No embedded base64 data longer than a few KB.
- Clean paths with no unnecessary groups or transforms.

### Testing an icon

After adding the icon, verify it renders correctly:

```

https://charmly.read-me.workers.dev/icons?i=<icon-name>&perline=1

```

Also test it combined with other icons:

```

https://charmly.read-me.workers.dev/icons?i=<icon-name>,react,vue&perline=3

```

And with no background:

```

https://charmly.read-me.workers.dev/icons?i=<icon-name>&bg=false

```

If the icon fails to render, check for `xlink:href` references without a declared `xmlns:xlink` namespace.

---

## Code Changes

### Endpoints

- `/icons` — handled by `src/icons.js`
- `/card` — handled by `src/card/` modules

Shared helpers (validation, escaping, color utilities) live in `src/utils.js`.

### Before you start

- Open an issue first for non-trivial changes. This avoids duplicate work.
- Keep the scope of a PR focused on one thing.
- Avoid refactoring unrelated code in the same PR.

### Testing locally

To run the Worker locally:

```

npm install
npx wrangler dev

```

This starts a local server at `http://localhost:8787`.

Test the icons endpoint:

```

http://localhost:8787/icons?i=js,html

```

Test the card endpoint:

```

http://localhost:8787/card?title=Test

```

### Deploying

Deployment happens automatically from the `main` branch via GitHub Actions. Do not deploy manually.

---

## Testing

### Manual checks

Before opening a PR, confirm:

- The icon or code change works in a browser.
- The response has the correct `Content-Type` (`image/svg+xml`).
- No `500` errors appear in `wrangler dev`.
- The change works when combined with other icons or cards.

### Automated checks

GitHub Actions runs on every PR. It does not currently run a full test suite, but it checks that the build succeeds.

If you add logic that can be tested, include a test or a reproducible URL that a reviewer can check.

---

## Style and Conventions

### JavaScript

- 2 spaces for indentation.
- Single quotes for strings.
- Semicolons are required.
- Prefer `const`; use `let` only when reassignment is needed.
- Keep functions small and single-purpose.
- Avoid external dependencies unless strictly necessary.

### Commit messages

Use the format:

```

<type>: <short description>

```

Allowed types:

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `refactor` — no behavior change
- `perf` — performance improvement
- `chore` — maintenance
- `security` — security fix

Examples:

```

feat: add perline parameter to /icons
fix: prevent SVG ID collision when combining icons
docs: update ICONS.md examples

```

### Pull requests

- Fill in the PR template completely.
- Link the issue it closes with `Closes #<number>`.
- Include screenshots for visual changes.
- Keep the PR description short and factual.

---

## Legal

### Code license

All code is released under the MIT License. By contributing, you agree that your code will be licensed under the same terms.

### Icons

Icons are provided under their upstream licenses. Do not submit an icon unless you are certain it can be redistributed.

Check the icon source license before submitting:

- **CC0** and **MIT** — accepted.
- **Apache-2.0** and **CC BY** — accepted with attribution.
- **CC BY-NC** or **proprietary** — not accepted.

If an icon is a trademark of a company and you are not affiliated with that company, use it only for identification purposes, not to imply endorsement.

### Trademark

All brand icons remain the property of their respective owners. This project is not affiliated with, endorsed by, or sponsored by any of the brands whose icons appear in the library.

See [NOTICE.md](./NOTICE.md) for full attribution and trademark details.

---

## Review Process

1. A maintainer reviews the PR within a few days.
2. Feedback may include style changes, testing requests, or a request to split the PR.
3. Once approved, the PR is merged into `main`.
4. A release is prepared when enough changes accumulate.

There is no strict SLA for reviews. This is a small project maintained in spare time.

---

## Thank You

Every contribution — an icon, a bug report, a typo fix — makes Charmly better for everyone who uses it.

If your PR is not accepted, it is not a reflection of your effort. Sometimes the timing, scope, or direction does not align. You are welcome to try again.