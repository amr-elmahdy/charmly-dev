<a name="readme-top"></a>
<div align="center">

<img src="./.github/imgs/banner.png" alt="Charmly Icons" />

# Charmly Icons

**Generate beautiful skill icons for your GitHub README using a simple URL.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-C071FF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://charmly-dev.web.app/)
[![License](https://img.shields.io/badge/License-MIT-C071FF?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Stars](https://img.shields.io/github/stars/amrelmahdy001/charmly?style=for-the-badge&color=C071FF&logo=github&logoColor=white)](https://github.com/amrelmahdy001/charmly/stargazers)

</div>

---

## What is Charmly?

Charmly is a lightweight API that generates a row of skill icons as an SVG image. Use it in your GitHub profile, project README, or resume — no configuration needed.

**Powered by Cloudflare Workers ⚡**

## Quick Start

```markdown
![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,react,nodejs,python)
```

https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,react,nodejs,python

That's it. Replace `i=` with your own comma-separated list of icon names.

---

## Usage

### Icons Per Line

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,cloudflare,angular,npm&perline=3)
```

https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,cloudflare,angular,npm&perline=3

### Custom Size, Color & Style

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare,swift,supabase&size=64&bgcolor=212125&radius=24&gap=20)
```

https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare,swift,supabase&size=64&bgcolor=212125&radius=24&gap=20

### Without Background

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,firebase,gitlab&bg=false&size=48)
```

https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,firebase,gitlab&bg=false&size=48

### Centered

```html
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>
```

<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>

---

## Parameters

| Parameter | Description | Range | Default |
|-----------|-------------|-------|---------|
| `i` | Comma-separated icon names (required) | — | — |
| `perline` | Number of icons per line | 1–50 | All in one line |
| `size` | Icon size in pixels | 16–128 | 48 |
| `gap` | Space between icons in pixels | 0–32 | 8 |
| `radius` | Corner radius in pixels | 0–24 | 12 |
| `bg` | Show background box | true/false | true |
| `bgcolor` | Background color (hex) | #RGB or #RRGGBB | #1a1b2e |

All parameters are validated. Invalid values return a descriptive 400 error.

---

## Features

- ⚡ Dynamic SVG generation — icons are rendered on demand
- 🎨 Fully customizable — size, spacing, radius, colors, and background
- 🔒 Rate limited — 100 requests per minute per IP
- 💾 Cached — 60-second cache for better performance
- 🌍 CORS enabled — works across any domain

---

## Available Icons

1028+ icons across 50+ categories. Use the id shown next to each icon: `?i=javascript,react,docker`.

| Icon | Preview | Icon | Preview | Icon | Preview |
|------|---------|------|---------|------|---------|
| `javascript` | ![javascript](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript&perline=1) | `typescript` | ![typescript](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript&perline=1) | `python` | ![python](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=python&perline=1) |
| `react` | ![react](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react&perline=1) | `vue` | ![vue](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue&perline=1) | `nextjs` | ![nextjs](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs&perline=1) |
| `nodejs` | ![nodejs](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs&perline=1) | `tailwindcss` | ![tailwindcss](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tailwindcss&perline=1) | `html` | ![html](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html&perline=1) |
| `css` | ![css](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=css&perline=1) | `sass` | ![sass](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sass&perline=1) | `bootstrap` | ![bootstrap](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap&perline=1) |
| `angular` | ![angular](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=angular&perline=1) | `svelte` | ![svelte](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=svelte&perline=1) | `nuxtjs` | ![nuxtjs](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nuxtjs&perline=1) |
| `redux` | ![redux](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redux&perline=1) | `materialui` | ![materialui](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=materialui&perline=1) | `storybook` | ![storybook](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=storybook&perline=1) |
| `express` | ![express](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=express&perline=1) | `nestjs` | ![nestjs](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nestjs&perline=1) | `django` | ![django](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django&perline=1) |
| `flask` | ![flask](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flask&perline=1) | `fastapi` | ![fastapi](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=fastapi&perline=1) | `spring` | ![spring](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=spring&perline=1) |
| `laravel` | ![laravel](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=laravel&perline=1) | `graphql` | ![graphql](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=graphql&perline=1) | `postgresql` | ![postgresql](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postgresql&perline=1) |
| `mysql` | ![mysql](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql&perline=1) | `mongodb` | ![mongodb](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mongodb&perline=1) | `redis` | ![redis](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redis&perline=1) |
| `sqlite` | ![sqlite](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sqlite&perline=1) | `supabase` | ![supabase](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=supabase&perline=1) | `docker` | ![docker](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker&perline=1) |
| `kubernetes` | ![kubernetes](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kubernetes&perline=1) | `aws` | ![aws](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws&perline=1) | `azure` | ![azure](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=azure&perline=1) |
| `googlecloud` | ![googlecloud](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=googlecloud&perline=1) | `firebase` | ![firebase](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=firebase&perline=1) | `vercel` | ![vercel](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vercel&perline=1) |
| `cloudflare` | ![cloudflare](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare&perline=1) | `nginx` | ![nginx](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nginx&perline=1) | `terraform` | ![terraform](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=terraform&perline=1) |
| `githubactions` | ![githubactions](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=githubactions&perline=1) | `grafana` | ![grafana](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=grafana&perline=1) | `git` | ![git](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git&perline=1) |
| `github` | ![github](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github&perline=1) | `gitlab` | ![gitlab](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gitlab&perline=1) | `vscode` | ![vscode](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode&perline=1) |
| `vim` | ![vim](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vim&perline=1) | `intellij` | ![intellij](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=intellij&perline=1) | `npm` | ![npm](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=npm&perline=1) |
| `vite` | ![vite](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vite&perline=1) | `webpack` | ![webpack](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=webpack&perline=1) | `figma` | ![figma](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma&perline=1) |
| `postman` | ![postman](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postman&perline=1) | `tensorflow` | ![tensorflow](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tensorflow&perline=1) | `pytorch` | ![pytorch](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pytorch&perline=1) |
| `huggingface` | ![huggingface](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=huggingface&perline=1) | `openai` | ![openai](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=openai&perline=1) | `langchain` | ![langchain](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=langchain&perline=1) |
| `pandas` | ![pandas](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pandas&perline=1) | `flutter` | ![flutter](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flutter&perline=1) | `reactnative` | ![reactnative](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=reactnative&perline=1) |
| `android` | ![android](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=android&perline=1) | `java` | ![java](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=java&perline=1) | `csharp` | ![csharp](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=csharp&perline=1) |
| `cplusplus` | ![cplusplus](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cplusplus&perline=1) | `go` | ![go](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=go&perline=1) | `rust` | ![rust](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rust&perline=1) |
| `php` | ![php](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=php&perline=1) | `kotlin` | ![kotlin](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kotlin&perline=1) | `swift` | ![swift](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift&perline=1) |
| `dart` | ![dart](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=dart&perline=1) | `jest` | ![jest](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jest&perline=1) | `cypress` | ![cypress](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cypress&perline=1) |
| `playwright` | ![playwright](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=playwright&perline=1) | `vitest` | ![vitest](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vitest&perline=1) | `eslint` | ![eslint](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=eslint&perline=1) |
| `prettier` | ![prettier](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=prettier&perline=1) | `linux` | ![linux](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=linux&perline=1) | `ubuntu` | ![ubuntu](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ubuntu&perline=1) |
| `windows` | ![windows](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=windows&perline=1) | `macos` | ![macos](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=macos&perline=1) | `apple` | ![apple](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=apple&perline=1) |
| `google` | ![google](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=google&perline=1) | | | | |

✨ See the full list of 1028+ icons in ICONS.md.

---

## Contributing

Contributions are welcome. To suggest an icon, open an issue or submit a pull request.

## License

Distributed under the MIT License. See LICENSE for details.

Icons are trademarks of their respective owners — see NOTICE.md.

---

<p align="center">Made by <a href="https://github.com/amrelmahdy001">amrelmahdy001</a></p>
