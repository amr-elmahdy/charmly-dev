<div align="center">

![Charmly banner](./.github/imgs/banner.png)

# Charmly

**Beautiful icons and cards for your README — from a single URL.**

[![Version](https://img.shields.io/github/package-json/v/amr-elmahdy/Charmly?style=for-the-badge&color=C071FF&logo=semanticrelease&logoColor=white)](https://github.com/amr-elmahdy/Charmly/releases)
[![Stars](https://img.shields.io/github/stars/amr-elmahdy/Charmly?style=for-the-badge&color=C071FF&logo=github&logoColor=white)](https://github.com/amr-elmahdy/Charmly/stargazers)

</div>

---

## What is Charmly?

Charmly is a **lightweight API** that generates SVG images for your README — no setup, no API key, no configuration.

Two tools, one endpoint:

- 🎨 **Icons** — display your tech stack in a clean, customizable row
- 🎴 **Cards** — showcase projects, games, or anything else as beautiful cards

Everything is generated on-demand, served from Cloudflare's edge, and designed to render perfectly on GitHub.

> ⚡ **Actively in development** — new features are shipping regularly. Follow along via [releases](https://github.com/amr-elmahdy/Charmly/releases).

---

## 🎨 Icons

Display your skills with 1,000+ icons across 50+ categories. Fully customizable — size, colors, background, layout.

### Default row
<div align="center">
![Skills](https://charmly.read-me.workers.dev/icons?i=javascript,typescript,react,nodejs,docker,postgresql&perline=6)
</div>

### Large icons with custom background
<div align="center">
![Skills](https://charmly.read-me.workers.dev/icons?i=python,pytorch,tensorflow&size=80&gap=16&radius=20&bgcolor=1a1a3a&perline=3)
</div>

### Bare icons — no background
<div align="center">
![Skills](https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=64&gap=24)
</div>
https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=64&gap=24

Highlights:

· ⚙️ Customize everything — size, spacing, radius, colors, background
· 📐 Multiple layouts — one line, multiple lines, or compact
· 🎯 1,028 icons across 50+ categories
· ⚡ Fast — cached at the edge, no rate limit headaches

📖 Full Icons Documentation →
🎨 Browse All 1,028 Icons →

---

🎴 Cards

Rich cards for projects, games, and everything in between. Cover image, title, description, and live GitHub stats — all in one SVG.

For Developer Repos

Show off your project with live GitHub data — stars, version, and primary language, auto-updated.

```markdown
![Charmly](https://charmly.read-me.workers.dev/card?title=Charmly&desc=Icon+API+for+READMEs+—+built+on+Cloudflare+Workers&img=https://i.imgur.com/6tj7ecs.png&im=smooth&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly)
```

https://charmly.read-me.workers.dev/card?title=Charmly&desc=Icon+API+for+READMEs+—+built+on+Cloudflare+Workers&img=https://i.imgur.com/6tj7ecs.png&im=smooth&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly

For Game Development

Perfect for indie games — show your dev status, tags, and genre in one clean card.

```markdown
![Catastrophe](https://charmly.read-me.workers.dev/card?title=Catastrophe&desc=A+2D+platformer+with+time-loop+mechanics&img=https://i.imgur.com/6tj7ecs.png&c=005159,0a1a1f&tl=true&tr=state:in-development&bl=badges:platformer,puzzle,pixel-art)
```

https://charmly.read-me.workers.dev/card?title=Catastrophe&desc=A+2D+platformer+with+time-loop+mechanics&img=https://i.imgur.com/6tj7ecs.png&c=005159,0a1a1f&tl=true&tr=state:in-development&bl=badges:platformer,puzzle,pixel-art

For Encyclopedias & Knowledge Bases

For wikis, courses, and reference sites — show version, status, and topic badges.

```markdown
![Wiki](https://charmly.read-me.workers.dev/card?title=World+History+Wiki&desc=A+comprehensive+encyclopedia+of+world+history&img=https://i.imgur.com/6tj7ecs.png&c=78350f,1c1917&tl=true&tr=state:release&br=version:my-org/history-wiki&bl=badges:education,reference,open-source)
```

https://charmly.read-me.workers.dev/card?title=World+History+Wiki&desc=A+comprehensive+encyclopedia+of+world+history&img=https://i.imgur.com/6tj7ecs.png&c=78350f,1c1917&tl=true&tr=state:release&br=version:my-org/history-wiki&bl=badges:education,reference,open-source

Highlights:

· 🖼️ Cover image with 3 merge modes — cut, line, smooth
· 🎨 Custom gradients — single color or two-color gradient
· 🏷️ Widgets — status, badges, GitHub stars, version, language
· 📐 3 sizes — small, medium, large — for any layout

📖 Full Cards Documentation →
🖼️ Card Showcase & Examples →

---

Documentation

 
🎨 Icons Full reference and parameters →
🎴 Cards Complete guide with examples →
📝 Changelog Version history →
⚖️ Legal License · Notices

---

Contributing

Contributions are welcome — new icons, bug fixes, or documentation improvements.

· Suggest an icon: open an issue
· Submit a PR: add the SVG to icons/ and open a pull request

---

License

MIT — see LICENSE for details.

Icons are trademarks of their respective owners — see NOTICE.md.

---

<div align="center">

Built with ☁️ Cloudflare Workers

Report an issue · Star on GitHub

</div>