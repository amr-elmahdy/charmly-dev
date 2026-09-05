[![banner](./.github/imgs/banner.png)
<a name="readme-top"></a>
<div align="center">

# Charmly Icons

**Generate beautiful skill icons for your GitHub README using a simple URL.**

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://charmly-dev.web.app/?i=javascript,react,nodejs&perline=3)
[![GitHub Repo stars](https://img.shields.io/github/stars/amrelmahdy001/charmly?style=for-the-badge)](https://github.com/amrelmahdy001/charmly)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## What is Charmly?

Charmly is a lightweight API that generates a row of skill icons as an SVG image.
You can use it in your GitHub profile, project README, or resume.

**Powered by Cloudflare Workers ⚡**

## Example

```markdown
![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,react,nodejs,docker&perline=5)
```

Result:

![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,react,nodejs,docker&perline=5)

---

## 🧩 Usage

### 1. Basic Usage

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=js,html,css)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=js,html,css)

Replace `i=` with a comma-separated list of icon names.

### 2. Icons Per Line

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,html,azure,react,angular,css&perline=3)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,html,azure,react,angular,css&perline=3)

### 3. Center Icons

```html
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,docker,c,vim" />
</p>
```
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,docker,c,vim" />
</p>
---

## Parameters

| Parameter | Description | Default |
|-----------|--------------|---------|
| `i` | Comma-separated icon names (required) | - |
| `perline` | Number of icons per line (1–50) | All icons in one line |

---

## How It Works

1. Icon SVGs are stored in the `icons/` folder.
2. `build-icons.js` extracts `viewBox` and inner content from each SVG.
3. Cloudflare Worker reads `dist/icons.json` and generates a combined SVG image.
4. The image is returned with `Content-Type: image/svg+xml`.

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

## 🤝 Contributing

Contributions are welcome!
To suggest an icon, open an issue or add the SVG file directly to the `icons/` folder and submit a pull request.

---

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">Made by <a href="https://github.com/amrelmahdy001">amrelmahdy001</a></p>
<table align="center" border="0" cellpadding="15" style="border-collapse: collapse; width: 100%; max-width: 1200px; margin: 20px auto; text-align: center;">

---

## 📦 Available Icons

Here is a list of currently supported icons.
More icons will be added soon.

  <tbody>
    <!-- الصف 1 (الأيقونات 1–10) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript&perline=1" alt="JavaScript" width="64"><br><strong>JavaScript</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript&perline=1" alt="TypeScript" width="64"><br><strong>TypeScript</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=python&perline=1" alt="Python" width="64"><br><strong>Python</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html&perline=1" alt="HTML" width="64"><br><strong>HTML</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=css&perline=1" alt="CSS" width="64"><br><strong>CSS</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=java&perline=1" alt="Java" width="64"><br><strong>Java</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kotlin&perline=1" alt="Kotlin" width="64"><br><strong>Kotlin</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift&perline=1" alt="Swift" width="64"><br><strong>Swift</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=go&perline=1" alt="Go" width="64"><br><strong>Go</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rust&perline=1" alt="Rust" width="64"><br><strong>Rust</strong></td>
    </tr>
    <!-- الصف 2 (الأيقونات 11–20) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=c&perline=1" alt="C" width="64"><br><strong>C</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cplusplus&perline=1" alt="C++" width="64"><br><strong>C++</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=csharp&perline=1" alt="C#" width="64"><br><strong>C#</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ruby&perline=1" alt="Ruby" width="64"><br><strong>Ruby</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=php&perline=1" alt="PHP" width="64"><br><strong>PHP</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react&perline=1" alt="React" width="64"><br><strong>React</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue&perline=1" alt="Vue.js" width="64"><br><strong>Vue.js</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=angular&perline=1" alt="Angular" width="64"><br><strong>Angular</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=svelte&perline=1" alt="Svelte" width="64"><br><strong>Svelte</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs&perline=1" alt="Next.js" width="64"><br><strong>Next.js</strong></td>
    </tr>
    <!-- الصف 3 (الأيقونات 21–30) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs&perline=1" alt="Node.js" width="64"><br><strong>Node.js</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=express&perline=1" alt="Express" width="64"><br><strong>Express</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django&perline=1" alt="Django" width="64"><br><strong>Django</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flask&perline=1" alt="Flask" width="64"><br><strong>Flask</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=spring&perline=1" alt="Spring Boot" width="64"><br><strong>Spring Boot</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=laravel&perline=1" alt="Laravel" width="64"><br><strong>Laravel</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tailwindcss&perline=1" alt="Tailwind CSS" width="64"><br><strong>Tailwind CSS</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap&perline=1" alt="Bootstrap" width="64"><br><strong>Bootstrap</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sass&perline=1" alt="Sass" width="64"><br><strong>Sass</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=graphql&perline=1" alt="GraphQL" width="64"><br><strong>GraphQL</strong></td>
    </tr>
    <!-- الصف 4 (الأيقونات 31–40) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redux&perline=1" alt="Redux" width="64"><br><strong>Redux</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql&perline=1" alt="MySQL" width="64"><br><strong>MySQL</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postgresql&perline=1" alt="PostgreSQL" width="64"><br><strong>PostgreSQL</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mongodb&perline=1" alt="MongoDB" width="64"><br><strong>MongoDB</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redis&perline=1" alt="Redis" width="64"><br><strong>Redis</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sqlite&perline=1" alt="SQLite" width="64"><br><strong>SQLite</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker&perline=1" alt="Docker" width="64"><br><strong>Docker</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kubernetes&perline=1" alt="Kubernetes" width="64"><br><strong>Kubernetes</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws&perline=1" alt="AWS" width="64"><br><strong>AWS</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=azure&perline=1" alt="Azure" width="64"><br><strong>Azure</strong></td>
    </tr>
    <!-- الصف 5 (الأيقونات 41–50) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=googlecloud&perline=1" alt="Google Cloud" width="64"><br><strong>Google Cloud</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=firebase&perline=1" alt="Firebase" width="64"><br><strong>Firebase</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git&perline=1" alt="Git" width="64"><br><strong>Git</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github&perline=1" alt="GitHub" width="64"><br><strong>GitHub</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gitlab&perline=1" alt="GitLab" width="64"><br><strong>GitLab</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode&perline=1" alt="VS Code" width="64"><br><strong>VS Code</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=npm&perline=1" alt="npm" width="64"><br><strong>npm</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vite&perline=1" alt="Vite" width="64"><br><strong>Vite</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=webpack&perline=1" alt="Webpack" width="64"><br><strong>Webpack</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma&perline=1" alt="Figma" width="64"><br><strong>Figma</strong></td>
    </tr>
  </tbody>
</table>