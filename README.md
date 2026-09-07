![banner](./.github/imgs/banner.png)
<a name="readme-top"></a>
<div align="center">

# Charmly Icons

**Generate beautiful skill icons for your GitHub README using a simple URL.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-C071FF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://charmly-dev.web.app/)
[![License](https://img.shields.io/badge/License-MIT-C071FF?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/amrelmahdy001/charmly?style=for-the-badge&color=C071FF&logo=semanticrelease&logoColor=white)](https://github.com/amrelmahdy001/charmly/releases)
[![Last Commit](https://img.shields.io/github/last-commit/amrelmahdy001/charmly?style=for-the-badge&color=C071FF&logo=git&logoColor=white)](https://github.com/amrelmahdy001/charmly/commits)
[![Stars](https://img.shields.io/github/stars/amrelmahdy001/charmly?style=for-the-badge&color=C071FF&logo=github&logoColor=white)](https://github.com/amrelmahdy001/charmly/stargazers)

![README Tools](https://img.shields.io/badge/README%20Tools-C071FF?style=for-the-badge&logo=readme&logoColor=white)
![Markdown Tools](https://img.shields.io/badge/Markdown%20Tools-C071FF?style=for-the-badge&logo=markdown&logoColor=white)

</div>

---

## 📖 What is Charmly?

Charmly is a lightweight, high-performance API that generates beautiful skill icon grids as SVG images. Perfect for your GitHub profile, project README, portfolio, or resume.

**Powered by Cloudflare Workers ⚡ | Dynamic SVG Generation | Zero Dependencies**

### Why Charmly?

- ✨ **Beautiful by Default** - Modern design with customizable styling
- ⚡ **Lightning Fast** - Generated on-demand with 60-second caching
- 🎨 **Fully Customizable** - Control size, colors, spacing, and layout
- 🔒 **Rate Limited** - Built-in protection against abuse
- 🌍 **CORS Enabled** - Works across any domain
- 📦 **150+ Icons** - Extensive coverage of tech stacks

---

## 🚀 Quick Start

### Basic Example

```markdown
![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,python,react,nodejs)
```

![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,python,react,nodejs)

That's it! Just replace the icon names in the `i=` parameter with what you need.

---

## 📚 Usage Guide

### 1️⃣ Basic Usage - Simple Icon Row

Display your tech stack in a single line:

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html,css,javascript,typescript,react)
```

![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html,css,javascript,typescript,react)

Replace `i=` with a comma-separated list of icon names (see [Available Icons](#-available-icons) below).

---

### 2️⃣ Multi-Line Layout - Icons Per Line

Organize icons into rows with the `perline` parameter:

```markdown
![Backend Stack](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs,express,mongodb,redis,postgresql&perline=3)
```

![Backend Stack](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs,express,mongodb,redis,postgresql&perline=3)

**Try different values:**
- `perline=2` - Two icons per row
- `perline=3` - Three icons per row (default shown above)
- `perline=5` - Five icons per row

---

### 3️⃣ Size Customization

Control the icon dimensions with the `size` parameter (16–128px):

**Small Icons (24px)**
```markdown
![Small](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker,kubernetes,terraform&size=24)
```
![Small](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker,kubernetes,terraform&size=24)

**Medium Icons (48px - Default)**
```markdown
![Medium](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,azure,googlecloud&size=48)
```
![Medium](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,azure,googlecloud&size=48)

**Large Icons (80px)**
```markdown
![Large](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flutter,reactnative,ionic&size=80)
```
![Large](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flutter,reactnative,ionic&size=80)

---

### 4️⃣ Spacing Control

Adjust the gap between icons with the `gap` parameter (0–32px):

**No Gap (0px)**
```markdown
![Compact](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jest,pytest,mocha&gap=0)
```
![Compact](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jest,pytest,mocha&gap=0)

**Default Gap (8px)**
```markdown
![Default](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode,vim,neovim&gap=8)
```
![Default](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode,vim,neovim&gap=8)

**Large Gap (16px)**
```markdown
![Spaced](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github,gitlab,bitbucket&gap=16)
```
![Spaced](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github,gitlab,bitbucket&gap=16)

---

### 5️⃣ Corner Radius - Design Flair

Customize corner roundness with the `radius` parameter (0–24px):

**Sharp Corners (0px)**
```markdown
![Sharp](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql,mongodb,postgresql&radius=0)
```
![Sharp](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql,mongodb,postgresql&radius=0)

**Rounded Corners (8px)**
```markdown
![Rounded](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django,flask,fastapi&radius=8)
```
![Rounded](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django,flask,fastapi&radius=8)

**Heavily Rounded (16px)**
```markdown
![Very Rounded](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap,tailwindcss,sass&radius=16)
```
![Very Rounded](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap,tailwindcss,sass&radius=16)

---

### 6️⃣ Custom Colors - Brand Your Icons

Change the background color using the `bgcolor` parameter (hex format):

**Dark Theme**
```markdown
![Dark](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs,nuxtjs,remix&bgcolor=1a1a1a&size=52)
```
![Dark](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs,nuxtjs,remix&bgcolor=1a1a1a&size=52)

**Vibrant Purple**
```markdown
![Purple](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue,angular,svelte&bgcolor=7c3aed&size=52)
```
![Purple](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue,angular,svelte&bgcolor=7c3aed&size=52)

**Ocean Blue**
```markdown
![Blue](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react,preact,inferno&bgcolor=0ea5e9&size=52)
```
![Blue](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react,preact,inferno&bgcolor=0ea5e9&size=52)

**Sunset Orange**
```markdown
![Orange](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma,xd,sketch&bgcolor=f97316&size=52)
```
![Orange](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma,xd,sketch&bgcolor=f97316&size=52)

---

### 7️⃣ No Background Option

Remove the background box entirely for a transparent look with `bg=false`:

```markdown
![Transparent](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,github,gitlab&bg=false&size=56)
```

![Transparent](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,github,gitlab&bg=false&size=56)

**Perfect for:**
- Dark mode profiles
- Embedding in complex layouts
- Minimalist designs

---

### 8️⃣ Center Icons in Your README

Use HTML to center your icon display:

```html
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=linux,docker,kubernetes,terraform&size=56&radius=10&perline=2" />
</p>
```

<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=linux,docker,kubernetes,terraform&size=56&radius=10&perline=2" />
</p>

---

### 9️⃣ Advanced - Combine Multiple Parameters

Chain parameters together for complete customization:

```markdown
![Custom Stack](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript,nest.js,postgresql,redis,docker&size=56&perline=3&gap=12&radius=10&bgcolor=2d3748)
```

![Custom Stack](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript,nestjs,postgresql,redis,docker&size=56&perline=3&gap=12&radius=10&bgcolor=2d3748)

---

## 📋 Parameters Reference

| Parameter | Description | Type | Range | Default |
|-----------|-------------|------|-------|---------|
| **`i`** | Icon names (comma-separated) | string | - | **(required)** |
| **`perline`** | Icons per row | integer | 1–50 | All in one line |
| **`size`** | Icon box size (px) | integer | 16–128 | 48 |
| **`gap`** | Space between icons (px) | integer | 0–32 | 8 |
| **`radius`** | Corner radius (px) | integer | 0–24 | 12 |
| **`bg`** | Show background box | boolean | true/false | true |
| **`bgcolor`** | Background color | hex | #RGB or #RRGGBB | #1a1b2e |

### Parameter Format Examples

```
# Icon list (required)
?i=javascript,typescript,react

# Add new lines every 4 icons
?i=...&perline=4

# Size 64px, gap 12px
?i=...&size=64&gap=12

# Hex color with or without #
?i=...&bgcolor=ff6b6b
?i=...&bgcolor=#0ea5e9

# Disable background
?i=...&bg=false

# Full customization
?i=html,css,js&size=56&perline=2&gap=10&radius=8&bgcolor=1a1b2e
```

---

## ✨ Features Breakdown

### ⚡ Performance
- **60-second caching** - Results cached for optimal speed
- **On-demand generation** - No pre-rendering delays
- **Lightweight** - Minimal bandwidth usage
- **CDN powered** - Served from Cloudflare edge locations worldwide

### 🎨 Customization
- **7 parameters** to control every aspect
- **Unlimited combinations** of styling options
- **Responsive design** - Looks great at any size
- **Accessible** - Proper SVG semantics

### 🛡️ Security & Reliability
- **Rate limiting** - 100 requests per IP per minute
- **Input validation** - All parameters validated
- **Error handling** - Descriptive error messages
- **CORS enabled** - Works cross-origin

### 📦 Content
- **150+ tech icons** - Constantly updated
- **Professional quality** - High-quality SVGs
- **Consistent style** - Unified design language
- **Easy to use** - Simple naming conventions

---

## ⚠️ Error Handling

The API validates all inputs and returns helpful error messages:

### Invalid Size
```
Invalid "size" parameter: must be a number between 16 and 128
```

### Invalid Background Color
```
Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color, e.g. "ff0000" or "#f00"
```

### Invalid Radius
```
Invalid "radius" parameter: must be a number between 0 and 24
```

### Missing Required Parameter
```
Missing "i" query parameter, e.g. ?i=js,html,css
```

### Rate Limit Exceeded (429)
```
Too Many Requests
Retry-After: 60
```

---

## 🏗️ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User sends request with icon names and parameters         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Cloudflare Worker validates all query parameters          │
│    - Size, gap, radius ranges                               │
│    - Hex color format                                       │
│    - Boolean values                                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Worker loads icon data from dist/icons.json              │
│    - SVG content and viewBox for each icon                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Generates combined SVG with custom styling               │
│    - Applies size, gap, and radius parameters               │
│    - Sets background color                                  │
│    - Arranges icons in specified layout                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Returns SVG with cache headers                           │
│    - Content-Type: image/svg+xml                            │
│    - Cache-Control: max-age=60                              │
│    - CORS headers for cross-origin access                   │
└─────────────────────────────────────────────────────────────┘
```

### Build Process

1. **Icon Collection** → SVG files in `icons/` folder
2. **Build Step** → `build-icons.js` extracts metadata
3. **JSON Output** → `dist/icons.json` with viewBox & content
4. **Worker Logic** → `src/worker.js` handles requests
5. **Dynamic Generation** → SVG created on each request

---

## 📁 Project Structure

```
charmly/
├── icons/                    # SVG icon files (original artwork)
├── dist/
│   └── icons.json           # Auto-generated icon metadata
├── src/
│   └── worker.js            # Cloudflare Worker main logic
├── build-icons.js           # Build script to generate icons.json
├── package.json             # Dependencies and scripts
├── wrangler.toml            # Cloudflare Workers configuration
├── .github/
│   └── imgs/
│       └── banner.png       # README banner image
└── README.md                # This file
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Icons

1. **Create an SVG** - Design a new icon or find one you like
2. **Add to folder** - Place it in the `icons/` directory
3. **Follow naming** - Use lowercase, no spaces (e.g., `myicon.svg`)
4. **Submit PR** - Open a pull request with your icon

### Improving Code

- Report bugs via GitHub Issues
- Suggest features with detailed descriptions
- Submit pull requests for improvements
- Help with documentation

### Requirements for Icon Contributions

- ✅ Clean, scalable SVG format
- ✅ Consistent with existing icon style
- ✅ Transparent background
- ✅ Reasonable file size (< 5KB)
- ✅ Clear, descriptive name

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">Made with ❤️ by <a href="https://github.com/amrelmahdy001">amrelmahdy001</a></p>

---

## 🎯 Available Icons

**Total icons: 150+** • Use the icon `id` in your API calls: `?i=id1,id2,id3`

### Quick Reference

<details open>
<summary><b>📖 Table of Contents (Click to expand)</b></summary>

- [Languages & Runtimes](#-languages--runtimes)
- [Frontend Frameworks & UI](#-frontend-frameworks--ui)
- [Backend Frameworks](#-backend-frameworks)
- [Databases & ORMs](#-databases--orms)
- [Mobile & Cross-Platform](#-mobile--cross-platform)
- [DevOps & Cloud](#-devops--cloud)
- [Dev Tools & Version Control](#-dev-tools--version-control)
- [Testing & Build Tools](#-testing--build-tools)

</details>

---

### 🔤 Languages & Runtimes

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>javascript</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript&perline=1" alt="javascript" width="48" height="48"></td>
      <td align="center" width="110"><code>typescript</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript&perline=1" alt="typescript" width="48" height="48"></td>
      <td align="center" width="110"><code>python</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=python&perline=1" alt="python" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>java</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=java&perline=1" alt="java" width="48" height="48"></td>
      <td align="center"><code>csharp</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=csharp&perline=1" alt="csharp" width="48" height="48"></td>
      <td align="center"><code>go</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=go&perline=1" alt="go" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>rust</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rust&perline=1" alt="rust" width="48" height="48"></td>
      <td align="center"><code>php</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=php&perline=1" alt="php" width="48" height="48"></td>
      <td align="center"><code>ruby</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ruby&perline=1" alt="ruby" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>kotlin</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kotlin&perline=1" alt="kotlin" width="48" height="48"></td>
      <td align="center"><code>swift</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift&perline=1" alt="swift" width="48" height="48"></td>
      <td align="center"><code>dart</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=dart&perline=1" alt="dart" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>nodejs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs&perline=1" alt="nodejs" width="48" height="48"></td>
      <td align="center"><code>cplusplus</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cplusplus&perline=1" alt="cplusplus" width="48" height="48"></td>
      <td align="center"><code>c</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=c&perline=1" alt="c" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>bash</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bash&perline=1" alt="bash" width="48" height="48"></td>
      <td align="center"><code>powershell</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=powershell&perline=1" alt="powershell" width="48" height="48"></td>
      <td align="center"><code>dotnet</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=dotnet&perline=1" alt="dotnet" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>deno</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=deno&perline=1" alt="deno" width="48" height="48"></td>
      <td align="center"><code>bun</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bun&perline=1" alt="bun" width="48" height="48"></td>
      <td align="center"><code>elixir</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=elixir&perline=1" alt="elixir" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### 🎨 Frontend Frameworks & UI

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>html</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html&perline=1" alt="html" width="48" height="48"></td>
      <td align="center" width="110"><code>css</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=css&perline=1" alt="css" width="48" height="48"></td>
      <td align="center" width="110"><code>react</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react&perline=1" alt="react" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>vue</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue&perline=1" alt="vue" width="48" height="48"></td>
      <td align="center"><code>angular</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=angular&perline=1" alt="angular" width="48" height="48"></td>
      <td align="center"><code>svelte</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=svelte&perline=1" alt="svelte" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>nextjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs&perline=1" alt="nextjs" width="48" height="48"></td>
      <td align="center"><code>tailwindcss</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tailwindcss&perline=1" alt="tailwindcss" width="48" height="48"></td>
      <td align="center"><code>bootstrap</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap&perline=1" alt="bootstrap" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>sass</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sass&perline=1" alt="sass" width="48" height="48"></td>
      <td align="center"><code>materialui</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=materialui&perline=1" alt="materialui" width="48" height="48"></td>
      <td align="center"><code>chakraui</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=chakraui&perline=1" alt="chakraui" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>shadcnui</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=shadcnui&perline=1" alt="shadcnui" width="48" height="48"></td>
      <td align="center"><code>redux</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redux&perline=1" alt="redux" width="48" height="48"></td>
      <td align="center"><code>threejs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=threejs&perline=1" alt="threejs" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>storybook</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=storybook&perline=1" alt="storybook" width="48" height="48"></td>
      <td align="center"><code>nuxtjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nuxtjs&perline=1" alt="nuxtjs" width="48" height="48"></td>
      <td align="center"><code>astro</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=astro&perline=1" alt="astro" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>solidjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=solidjs&perline=1" alt="solidjs" width="48" height="48"></td>
      <td align="center"><code>pinia</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pinia&perline=1" alt="pinia" width="48" height="48"></td>
      <td align="center"><code>framermotion</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=framermotion&perline=1" alt="framermotion" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### ⚙️ Backend Frameworks

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>express</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=express&perline=1" alt="express" width="48" height="48"></td>
      <td align="center" width="110"><code>nestjs</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nestjs&perline=1" alt="nestjs" width="48" height="48"></td>
      <td align="center" width="110"><code>django</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django&perline=1" alt="django" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>flask</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flask&perline=1" alt="flask" width="48" height="48"></td>
      <td align="center"><code>spring</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=spring&perline=1" alt="spring" width="48" height="48"></td>
      <td align="center"><code>laravel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=laravel&perline=1" alt="laravel" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>graphql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=graphql&perline=1" alt="graphql" width="48" height="48"></td>
      <td align="center"><code>fastify</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=fastify&perline=1" alt="fastify" width="48" height="48"></td>
      <td align="center"><code>remix</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=remix&perline=1" alt="remix" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>gatsby</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gatsby&perline=1" alt="gatsby" width="48" height="48"></td>
      <td align="center"><code>sveltekit</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sveltekit&perline=1" alt="sveltekit" width="48" height="48"></td>
      <td align="center"><code>koa</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=koa&perline=1" alt="koa" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### 🗄️ Databases & ORMs

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>postgresql</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postgresql&perline=1" alt="postgresql" width="48" height="48"></td>
      <td align="center" width="110"><code>mysql</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql&perline=1" alt="mysql" width="48" height="48"></td>
      <td align="center" width="110"><code>mongodb</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mongodb&perline=1" alt="mongodb" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>redis</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redis&perline=1" alt="redis" width="48" height="48"></td>
      <td align="center"><code>supabase</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=supabase&perline=1" alt="supabase" width="48" height="48"></td>
      <td align="center"><code>dynamodb</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=dynamodb&perline=1" alt="dynamodb" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>prisma</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=prisma&perline=1" alt="prisma" width="48" height="48"></td>
      <td align="center"><code>typeorm</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typeorm&perline=1" alt="typeorm" width="48" height="48"></td>
      <td align="center"><code>sequelize</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sequelize&perline=1" alt="sequelize" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>neo4j</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=neo4j&perline=1" alt="neo4j" width="48" height="48"></td>
      <td align="center"><code>cassandra</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cassandra&perline=1" alt="cassandra" width="48" height="48"></td>
      <td align="center"><code>sqlite</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sqlite&perline=1" alt="sqlite" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### 📱 Mobile & Cross-Platform

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>flutter</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flutter&perline=1" alt="flutter" width="48" height="48"></td>
      <td align="center" width="110"><code>reactnative</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=reactnative&perline=1" alt="reactnative" width="48" height="48"></td>
      <td align="center" width="110"><code>ionic</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ionic&perline=1" alt="ionic" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>capacitor</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=capacitor&perline=1" alt="capacitor" width="48" height="48"></td>
      <td align="center"><code>nativescript</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nativescript&perline=1" alt="nativescript" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### ☁️ DevOps & Cloud

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>docker</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker&perline=1" alt="docker" width="48" height="48"></td>
      <td align="center" width="110"><code>kubernetes</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kubernetes&perline=1" alt="kubernetes" width="48" height="48"></td>
      <td align="center" width="110"><code>aws</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws&perline=1" alt="aws" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>azure</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=azure&perline=1" alt="azure" width="48" height="48"></td>
      <td align="center"><code>googlecloud</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=googlecloud&perline=1" alt="googlecloud" width="48" height="48"></td>
      <td align="center"><code>firebase</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=firebase&perline=1" alt="firebase" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>terraform</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=terraform&perline=1" alt="terraform" width="48" height="48"></td>
      <td align="center"><code>nginx</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nginx&perline=1" alt="nginx" width="48" height="48"></td>
      <td align="center"><code>githubactions</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=githubactions&perline=1" alt="githubactions" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>jenkins</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jenkins&perline=1" alt="jenkins" width="48" height="48"></td>
      <td align="center"><code>ansible</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ansible&perline=1" alt="ansible" width="48" height="48"></td>
      <td align="center"><code>vercel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vercel&perline=1" alt="vercel" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>netlify</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=netlify&perline=1" alt="netlify" width="48" height="48"></td>
      <td align="center"><code>heroku</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=heroku&perline=1" alt="heroku" width="48" height="48"></td>
      <td align="center"><code>digitalocean</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=digitalocean&perline=1" alt="digitalocean" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>cloudflare</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare&perline=1" alt="cloudflare" width="48" height="48"></td>
      <td align="center"><code>prometheus</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=prometheus&perline=1" alt="prometheus" width="48" height="48"></td>
      <td align="center"><code>grafana</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=grafana&perline=1" alt="grafana" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### 🛠️ Dev Tools & Version Control

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>git</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git&perline=1" alt="git" width="48" height="48"></td>
      <td align="center" width="110"><code>github</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github&perline=1" alt="github" width="48" height="48"></td>
      <td align="center" width="110"><code>gitlab</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gitlab&perline=1" alt="gitlab" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>vscode</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode&perline=1" alt="vscode" width="48" height="48"></td>
      <td align="center"><code>npm</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=npm&perline=1" alt="npm" width="48" height="48"></td>
      <td align="center"><code>vite</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vite&perline=1" alt="vite" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>webpack</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=webpack&perline=1" alt="webpack" width="48" height="48"></td>
      <td align="center"><code>figma</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma&perline=1" alt="figma" width="48" height="48"></td>
      <td align="center"><code>vim</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vim&perline=1" alt="vim" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>linux</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=linux&perline=1" alt="linux" width="48" height="48"></td>
      <td align="center"><code>stackoverflow</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=stackoverflow&perline=1" alt="stackoverflow" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

### 🧪 Testing & Build Tools

<table>
  <tbody>
    <tr>
      <td align="center" width="110"><code>jest</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jest&perline=1" alt="jest" width="48" height="48"></td>
      <td align="center" width="110"><code>cypress</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cypress&perline=1" alt="cypress" width="48" height="48"></td>
      <td align="center" width="110"><code>vitest</code></td>
      <td align="center" width="50"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vitest&perline=1" alt="vitest" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>playwright</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=playwright&perline=1" alt="playwright" width="48" height="48"></td>
      <td align="center"><code>eslint</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=eslint&perline=1" alt="eslint" width="48" height="48"></td>
      <td align="center"><code>prettier</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=prettier&perline=1" alt="prettier" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>rollup</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rollup&perline=1" alt="rollup" width="48" height="48"></td>
      <td align="center"><code>babel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=babel&perline=1" alt="babel" width="48" height="48"></td>
      <td align="center"><code>esbuild</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=esbuild&perline=1" alt="esbuild" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>postman</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postman&perline=1" alt="postman" width="48" height="48"></td>
      <td align="center"><code>swagger</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swagger&perline=1" alt="swagger" width="48" height="48"></td>
      <td align="center"><code>mocha</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mocha&perline=1" alt="mocha" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

<p align="center">
  <b>Not finding the icon you need?</b> <a href="#contributing">Contribute it!</a>
</p>

<a href="#readme-top">⬆️ Back to top</a>
