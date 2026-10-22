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

![Skills](https://charmly.read-me.workers.dev/icons?i=python,pytorch,tensorflow&size=80&gap=16&radius=14&bgcolor=1c1c3c)

</div>

### Bare icons — no background
<div align="center">

![Skills](https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=42&gap=12)

</div>

### Highlights:

- **Customize everything** — size, spacing, radius, colors, background
- **Multiple layouts** — one line, multiple lines, or compact
- **1,028 icons** across **50+ categories**
- **Fast** — cached at the edge, no rate limit headaches

> - 📖 Full Icons Documentation → [Icons Doc](./doc/Icons.md)
> - 🎨 Browse All 1,028 Icons →

---

## 🎴 Cards

Rich cards for **projects**, **games**, and everything in between. Cover image, title, description, and live GitHub stats — all in one SVG.

### For Developer Repos

Show off your project with live GitHub data — stars, version, and primary language, auto-updated.

[![Charmly](https://charmly.read-me.workers.dev/card?title=Charmly&desc=An+icon+API+for+READMEs+%E2%80%94+drop+a+URL%2C+get+an+icon.+Now+growing+with+widgets+and+more+display+tools.+Built+on+Cloudflare+Workers.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/charmly-500.jpg&c=140035,100030&tc=B048D0&dc=D0C0D0&tl=true&im=smooth&co=smooth&tr=stars:amr-elmahdy/Charmly&br=version:amr-elmahdy/Charmly&bl=lan:amr-elmahdy/Charmly)](https://github.com/amr-elmahdy/Charmly)


### For Game Development

Perfect for indie games — show your dev status, tags, and genre in one clean card.

[![The Last Lantern](https://charmly.read-me.workers.dev/card?title=The+Last+Lantern&desc=You+have+20+seconds+of+light.+Make+them+count.+A+2D+horror+exploration+game+set+in+your+late+grandmother%27s+abandoned+mansion.+Made+for+GMTK+2026.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/the-last-lantern-500.jpg&c=0a0a0f,2a1a0a&tc=fef3c7&dc=a1a1aa&tl=true&im=smooth&tr=state:release&bl=badges:Horror,Exploration,GMTK+2026)](https://github.com/Orpita-Community/the-last-lantern)

### For Encyclopedias & Knowledge Bases

For wikis, courses, and reference sites — show version, status, and topic badges.

[![Jurdian Cipher Wiki](https://charmly.read-me.workers.dev/card?title=Jurdian+Cipher+Wiki&desc=A+large+encyclopedia+of+ciphers+%E2%80%94+classical%2C+modern%2C+and+experimental+%E2%80%94+with+study%2C+analysis%2C+and+usage+for+each+entry.+Written+in+Markdown+for+Obsidian.+Currently+in+active+development.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/jurdian-500.jpg&c=303030,000000&tc=C0A038&dc=786848&tl=true&im=smooth&tr=state:in-development&bl=badges:Ciphers,Cryptography,Wiki,Jurdian)](https://github.com/Jurdian-Project/jurdian-cipher-wiki)


### Highlights:

- Cover image with 3 merge modes — cut, line, smooth
- 🎨 Custom gradients — single color or two-color gradient
- 🏷️ Widgets — status, badges, GitHub stars, version, language
- 📐 3 sizes — small, medium, large — for any layout

> - 📖 Full Cards Documentation →
> - 🖼️ Card Showcase & Examples →

---

## Documentation

 
- 🎨 Icons Full reference and parameters →
- 🎴 Cards Complete guide with examples →
- 📝 Changelog Version history →
- ⚖️ Legal License · Notices

---

## Contributing

Contributions are welcome — new icons, bug fixes, or documentation improvements.

- Suggest an icon: open an issue
- Submit a PR: add the SVG to icons/ and open a pull request

---

## License

MIT — see [LICENSE](./LINCESE.md) for details.

Icons are trademarks of their respective owners — see NOTICE.md.

---

<div align="center">

Built with ☁️ Cloudflare Workers

Report an issue · Star on GitHub

</div>