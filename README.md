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

## What is Charmly?

Charmly is a lightweight API that generates a row of skill icons as an SVG image.
You can use it in your GitHub profile, project README, or resume.

**Powered by Cloudflare Workers ⚡**

## Example

```markdown
![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift,typescript,react,go,flask&perline=5)
```

Result:

![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift,typescript,react,go,flask&perline=5)

---

## Usage

### 1. Basic Usage

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript, typescript,html,css)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,html,css)

Replace `i=` with a comma-separated list of icon names.

### 2. Icons Per Line

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,cloudflare,angular,npm&perline=3)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,cloudflare,angular,npm&perline=3)

### 3. Custom Icon Size

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,python,java,go&size=64&perline=2)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,python,java,go&size=80)

### 4. Custom Colors, Radius & Gap

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare,swift,supabase&bgcolor=212521&radius=24&gap=20)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare,swift,supabase&bgcolor=212125&radius=24&gap=20)

### 5. Icons Without Background

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,firebase,gitlab&bg=false&size=48)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,firebase,gitlab&bg=false&size=48)

### 6. Center Icons

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
|-----------|--------------|-------|---------|
| `i` | Comma-separated icon names **(required)** | - | - |
| `perline` | Number of icons per line | 1–50 | All icons in one line |
| `size` | Icon box size in pixels | 16–128 | 48 |
| `gap` | Gap between icons in pixels | 0–32 | 8 |
| `radius` | Corner radius in pixels | 0–24 | 12 |
| `bg` | Show background box | true/false | true |
| `bgcolor` | Background color (hex format) | #RGB or #RRGGBB | #1a1b2e |

### Parameter Examples

**Size parameter:**
```
?i=js,html,css&size=32    # Small icons
?i=js,html,css&size=96    # Large icons
```

**Gap parameter:**
```
?i=react,vue,angular&gap=0    # No space between icons
?i=react,vue,angular&gap=20   # Large spacing
```

**Radius parameter:**
```
?i=js,go,rust&radius=0     # Sharp corners
?i=js,go,rust&radius=20    # Very rounded
```

**Custom background color:**
```
?i=python,java&bgcolor=ff6b6b&bg=true
?i=python,java&bgcolor=#0ea5e9&size=64
```

**Combine multiple parameters:**
```
?i=javascript,typescript,react&size=56&perline=3&gap=12&radius=8&bgcolor=2d3748
```

---

## How It Works

1. Icon SVGs are stored in the `icons/` folder.
2. `build-icons.js` extracts `viewBox` and inner content from each SVG.
3. Cloudflare Worker reads `dist/icons.json` and generates a customized combined SVG image.
4. Parameters are validated and applied to control:
   - Icon dimensions and spacing
   - Background styling and color
   - Layout arrangement
5. The image is returned with `Content-Type: image/svg+xml` and cached for 60 seconds.

---

## Features

✅ **Dynamic SVG Generation** - Icons are generated on-demand  
✅ **Customizable Layout** - Control size, spacing, and arrangement  
✅ **Flexible Styling** - Customize colors and corner radius  
✅ **Rate Limiting** - Built-in protection (100 req/min per IP)  
✅ **Caching** - 60-second cache for better performance  
✅ **CORS Enabled** - Works across different domains  
✅ **No Background Option** - Show icons without boxes  

---

## Error Handling

Invalid parameters will return a 400 error with a descriptive message:

```
Invalid "size" parameter: must be a number between 16 and 128
Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color, e.g. "ff0000" or "#f00"
Invalid "radius" parameter: must be a number between 0 and 24
```

Missing required `i` parameter:

```
Missing "i" query parameter, e.g. ?i=js,html,css
```

Rate limit exceeded (429):

```
Too Many Requests
```

---

## Project Structure

```
charmly/
├── icons/                # SVG icon files
├── dist/
│   └── icons.json        # Auto-generated icon data
├── src/
│   └── worker.js         # Cloudflare Worker logic
├── build-icons.js        # Converts SVG files to JSON
├── package.json
├── wrangler.toml
└── README.md
```

---

## Contributing

Contributions are welcome!
To suggest an icon, open an issue or add the SVG file directly to the `icons/` folder and submit a pull request.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">Made by <a href="https://github.com/amrelmahdy001">amrelmahdy001</a></p>
<table align="center" border="0" cellpadding="15" style="border-collapse: collapse; width: 100%; max-width: 1200px; margin: 20px auto; text-align: center;">

---

## Available Icons

**1028+ icons** across 50+ categories. Use the `id` shown next to each icon: `?i=javascript,react,docker`.

### Programming Languages

<table>
  <tbody>
    <tr>
      <td align="center"><code>javascript</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript&perline=1" alt="javascript" width="48" height="48"></td>
      <td align="center"><code>typescript</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript&perline=1" alt="typescript" width="48" height="48"></td>
      <td align="center"><code>python</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=python&perline=1" alt="python" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>java</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=java&perline=1" alt="java" width="48" height="48"></td>
      <td align="center"><code>csharp</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=csharp&perline=1" alt="csharp" width="48" height="48"></td>
      <td align="center"><code>cplusplus</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cplusplus&perline=1" alt="cplusplus" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>go</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=go&perline=1" alt="go" width="48" height="48"></td>
      <td align="center"><code>rust</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rust&perline=1" alt="rust" width="48" height="48"></td>
      <td align="center"><code>php</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=php&perline=1" alt="php" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>kotlin</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kotlin&perline=1" alt="kotlin" width="48" height="48"></td>
      <td align="center"><code>swift</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift&perline=1" alt="swift" width="48" height="48"></td>
      <td align="center"><code>dart</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=dart&perline=1" alt="dart" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Frontend Frameworks & UI

<table>
  <tbody>
    <tr>
      <td align="center"><code>react</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react&perline=1" alt="react" width="48" height="48"></td>
      <td align="center"><code>vue</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue&perline=1" alt="vue" width="48" height="48"></td>
      <td align="center"><code>angular</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=angular&perline=1" alt="angular" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>svelte</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=svelte&perline=1" alt="svelte" width="48" height="48"></td>
      <td align="center"><code>nextjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs&perline=1" alt="nextjs" width="48" height="48"></td>
      <td align="center"><code>nuxtjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nuxtjs&perline=1" alt="nuxtjs" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>tailwindcss</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tailwindcss&perline=1" alt="tailwindcss" width="48" height="48"></td>
      <td align="center"><code>bootstrap</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap&perline=1" alt="bootstrap" width="48" height="48"></td>
      <td align="center"><code>sass</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sass&perline=1" alt="sass" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>redux</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redux&perline=1" alt="redux" width="48" height="48"></td>
      <td align="center"><code>materialui</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=materialui&perline=1" alt="materialui" width="48" height="48"></td>
      <td align="center"><code>storybook</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=storybook&perline=1" alt="storybook" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Backend Frameworks

<table>
  <tbody>
    <tr>
      <td align="center"><code>nodejs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs&perline=1" alt="nodejs" width="48" height="48"></td>
      <td align="center"><code>express</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=express&perline=1" alt="express" width="48" height="48"></td>
      <td align="center"><code>nestjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nestjs&perline=1" alt="nestjs" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>django</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django&perline=1" alt="django" width="48" height="48"></td>
      <td align="center"><code>flask</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flask&perline=1" alt="flask" width="48" height="48"></td>
      <td align="center"><code>fastapi</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=fastapi&perline=1" alt="fastapi" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>spring</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=spring&perline=1" alt="spring" width="48" height="48"></td>
      <td align="center"><code>laravel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=laravel&perline=1" alt="laravel" width="48" height="48"></td>
      <td align="center"><code>graphql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=graphql&perline=1" alt="graphql" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Databases

<table>
  <tbody>
    <tr>
      <td align="center"><code>postgresql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postgresql&perline=1" alt="postgresql" width="48" height="48"></td>
      <td align="center"><code>mysql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql&perline=1" alt="mysql" width="48" height="48"></td>
      <td align="center"><code>mongodb</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mongodb&perline=1" alt="mongodb" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>redis</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redis&perline=1" alt="redis" width="48" height="48"></td>
      <td align="center"><code>sqlite</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sqlite&perline=1" alt="sqlite" width="48" height="48"></td>
      <td align="center"><code>supabase</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=supabase&perline=1" alt="supabase" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### DevOps & Cloud

<table>
  <tbody>
    <tr>
      <td align="center"><code>docker</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker&perline=1" alt="docker" width="48" height="48"></td>
      <td align="center"><code>kubernetes</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kubernetes&perline=1" alt="kubernetes" width="48" height="48"></td>
      <td align="center"><code>terraform</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=terraform&perline=1" alt="terraform" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>aws</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws&perline=1" alt="aws" width="48" height="48"></td>
      <td align="center"><code>azure</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=azure&perline=1" alt="azure" width="48" height="48"></td>
      <td align="center"><code>googlecloud</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=googlecloud&perline=1" alt="googlecloud" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>firebase</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=firebase&perline=1" alt="firebase" width="48" height="48"></td>
      <td align="center"><code>vercel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vercel&perline=1" alt="vercel" width="48" height="48"></td>
      <td align="center"><code>cloudflare</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare&perline=1" alt="cloudflare" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>nginx</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nginx&perline=1" alt="nginx" width="48" height="48"></td>
      <td align="center"><code>githubactions</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=githubactions&perline=1" alt="githubactions" width="48" height="48"></td>
      <td align="center"><code>grafana</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=grafana&perline=1" alt="grafana" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### AI & Machine Learning

<table>
  <tbody>
    <tr>
      <td align="center"><code>tensorflow</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tensorflow&perline=1" alt="tensorflow" width="48" height="48"></td>
      <td align="center"><code>pytorch</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pytorch&perline=1" alt="pytorch" width="48" height="48"></td>
      <td align="center"><code>huggingface</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=huggingface&perline=1" alt="huggingface" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>openai</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=openai&perline=1" alt="openai" width="48" height="48"></td>
      <td align="center"><code>langchain</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=langchain&perline=1" alt="langchain" width="48" height="48"></td>
      <td align="center"><code>pandas</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pandas&perline=1" alt="pandas" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Mobile & Cross-Platform

<table>
  <tbody>
    <tr>
      <td align="center"><code>flutter</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flutter&perline=1" alt="flutter" width="48" height="48"></td>
      <td align="center"><code>reactnative</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=reactnative&perline=1" alt="reactnative" width="48" height="48"></td>
      <td align="center"><code>android</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=android&perline=1" alt="android" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Dev Tools & IDEs

<table>
  <tbody>
    <tr>
      <td align="center"><code>git</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git&perline=1" alt="git" width="48" height="48"></td>
      <td align="center"><code>github</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github&perline=1" alt="github" width="48" height="48"></td>
      <td align="center"><code>gitlab</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gitlab&perline=1" alt="gitlab" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>vscode</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode&perline=1" alt="vscode" width="48" height="48"></td>
      <td align="center"><code>vim</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vim&perline=1" alt="vim" width="48" height="48"></td>
      <td align="center"><code>intellij</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=intellij&perline=1" alt="intellij" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>npm</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=npm&perline=1" alt="npm" width="48" height="48"></td>
      <td align="center"><code>vite</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vite&perline=1" alt="vite" width="48" height="48"></td>
      <td align="center"><code>webpack</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=webpack&perline=1" alt="webpack" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>figma</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma&perline=1" alt="figma" width="48" height="48"></td>
      <td align="center"><code>postman</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postman&perline=1" alt="postman" width="48" height="48"></td>
      <td align="center"><code>storybook</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=storybook&perline=1" alt="storybook" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Testing & Quality

<table>
  <tbody>
    <tr>
      <td align="center"><code>jest</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jest&perline=1" alt="jest" width="48" height="48"></td>
      <td align="center"><code>cypress</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cypress&perline=1" alt="cypress" width="48" height="48"></td>
      <td align="center"><code>playwright</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=playwright&perline=1" alt="playwright" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>vitest</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vitest&perline=1" alt="vitest" width="48" height="48"></td>
      <td align="center"><code>eslint</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=eslint&perline=1" alt="eslint" width="48" height="48"></td>
      <td align="center"><code>prettier</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=prettier&perline=1" alt="prettier" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

### Operating Systems & Platforms

<table>
  <tbody>
    <tr>
      <td align="center"><code>linux</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=linux&perline=1" alt="linux" width="48" height="48"></td>
      <td align="center"><code>ubuntu</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ubuntu&perline=1" alt="ubuntu" width="48" height="48"></td>
      <td align="center"><code>windows</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=windows&perline=1" alt="windows" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>macos</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=macos&perline=1" alt="macos" width="48" height="48"></td>
      <td align="center"><code>apple</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=apple&perline=1" alt="apple" width="48" height="48"></td>
      <td align="center"><code>google</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=google&perline=1" alt="google" width="48" height="48"></td>
    </tr>
  </tbody>
</table>

---

**✨ See the full list of 1028+ icons in [ICONS.md](ICONS.md).**


