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
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,html,css,tailwindcss)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,html,css,tailwindcss)

Replace `i=` with a comma-separated list of icon names.

### 2. Icons Per Line

```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,react,angular,npm&perline=3)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,react,angular,npm&perline=3)

### 3. Center Icons

```html
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,gitlab,c,github" />
</p>
```
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,gitlab,c,github" />
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

Here is a list of currently supported icons.
More icons will be added soon.

<style>
  .icons-table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
  }
  .icons-table td {
    width: 10%;
    text-align: center;
    vertical-align: top;
    padding: 10px 4px;
  }
  .icons-table img {
    width: 64px;
    height: 64px;
    display: block;
    margin: 0 auto 6px;
  }
  .icons-table strong {
    font-size: 13px;
    display: block;
    line-height: 1.2;
    word-wrap: break-word;
  }
</style>

<table class="icons-table">
  <tbody>
    <!-- الصف 1: لغات برمجة أساسية (10) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript&perline=1" alt="JavaScript"><br><strong>JavaScript</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript&perline=1" alt="TypeScript"><br><strong>TypeScript</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=python&perline=1" alt="Python"><br><strong>Python</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=java&perline=1" alt="Java"><br><strong>Java</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kotlin&perline=1" alt="Kotlin"><br><strong>Kotlin</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift&perline=1" alt="Swift"><br><strong>Swift</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=go&perline=1" alt="Go"><br><strong>Go</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rust&perline=1" alt="Rust"><br><strong>Rust</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=c&perline=1" alt="C"><br><strong>C</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cplusplus&perline=1" alt="C++"><br><strong>C++</strong></td>
    </tr>
    <!-- الصف 2: لغات وأطر أمامية (10) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=csharp&perline=1" alt="C#"><br><strong>C#</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ruby&perline=1" alt="Ruby"><br><strong>Ruby</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=php&perline=1" alt="PHP"><br><strong>PHP</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html&perline=1" alt="HTML"><br><strong>HTML</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=css&perline=1" alt="CSS"><br><strong>CSS</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react&perline=1" alt="React"><br><strong>React</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue&perline=1" alt="Vue.js"><br><strong>Vue.js</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=angular&perline=1" alt="Angular"><br><strong>Angular</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=svelte&perline=1" alt="Svelte"><br><strong>Svelte</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs&perline=1" alt="Next.js"><br><strong>Next.js</strong></td>
    </tr>
    <!-- الصف 3: أطر خلفية وأدوات CSS (10) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs&perline=1" alt="Node.js"><br><strong>Node.js</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=express&perline=1" alt="Express"><br><strong>Express</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django&perline=1" alt="Django"><br><strong>Django</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flask&perline=1" alt="Flask"><br><strong>Flask</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=spring&perline=1" alt="Spring Boot"><br><strong>Spring Boot</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=laravel&perline=1" alt="Laravel"><br><strong>Laravel</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tailwindcss&perline=1" alt="Tailwind CSS"><br><strong>Tailwind CSS</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap&perline=1" alt="Bootstrap"><br><strong>Bootstrap</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sass&perline=1" alt="Sass"><br><strong>Sass</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=graphql&perline=1" alt="GraphQL"><br><strong>GraphQL</strong></td>
    </tr>
    <!-- الصف 4: قواعد بيانات وDevOps (10) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redux&perline=1" alt="Redux"><br><strong>Redux</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql&perline=1" alt="MySQL"><br><strong>MySQL</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postgresql&perline=1" alt="PostgreSQL"><br><strong>PostgreSQL</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mongodb&perline=1" alt="MongoDB"><br><strong>MongoDB</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redis&perline=1" alt="Redis"><br><strong>Redis</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sqlite&perline=1" alt="SQLite"><br><strong>SQLite</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker&perline=1" alt="Docker"><br><strong>Docker</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kubernetes&perline=1" alt="Kubernetes"><br><strong>Kubernetes</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws&perline=1" alt="AWS"><br><strong>AWS</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=azure&perline=1" alt="Azure"><br><strong>Azure</strong></td>
    </tr>
    <!-- الصف 5: سحابة وأدوات تطوير (10) -->
    <tr>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=googlecloud&perline=1" alt="Google Cloud"><br><strong>Google Cloud</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=firebase&perline=1" alt="Firebase"><br><strong>Firebase</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git&perline=1" alt="Git"><br><strong>Git</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github&perline=1" alt="GitHub"><br><strong>GitHub</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gitlab&perline=1" alt="GitLab"><br><strong>GitLab</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode&perline=1" alt="VS Code"><br><strong>VS Code</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=npm&perline=1" alt="npm"><br><strong>npm</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vite&perline=1" alt="Vite"><br><strong>Vite</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=webpack&perline=1" alt="Webpack"><br><strong>Webpack</strong></td>
      <td><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma&perline=1" alt="Figma"><br><strong>Figma</strong></td>
    </tr>
  </tbody>
</table>