# Portfolio Website — Project Specification
> You are GitHub Copilot Agent. Read this entire file before doing anything. Build exactly as specified. No frameworks, no build step, no dependencies.

---

## Your Behaviour Rules

- Generate **one file at a time** in the exact order listed under File Generation Order
- After creating each file, **stop and report**:
  1. The file you just created
  2. A one-line summary of what it contains
  3. The next file in the sequence
- **Do not proceed to the next file** until explicitly told to continue
- **Do not install any packages** — zero dependencies, zero npm, zero frameworks
- **Do not use inline styles** — all styles go in the CSS module files
- **Do not hardcode colors or fonts** anywhere outside `tokens.css` — always use `var(--...)`
- **Do not add `@media` queries** anywhere except `responsive.css`
- All placeholder text must use `[bracket]` format — e.g. `[Your Name]`, `[Company]`, `[Role]`
- If you are unsure about any detail, re-read this file before proceeding

---

## Self-Check After Every File

After generating each file, verify it against this table before reporting done:

| File | Must contain |
|------|-------------|
| `tokens.css` | Both `[data-chapter="india"]` and `[data-chapter="ireland"]` blocks |
| `reset.css` | `box-sizing: border-box` and `margin: 0` |
| `base.css` | EB Garamond on `h1`, Inter on `h2/h3/h4` |
| `nav.css` | `.chapter-toggle` centered, zero `@media` queries |
| `components.css` | Tab, card, timeline, and tag styles |
| `india.css` | Only India decorative rules, no layout, no `@media` |
| `ireland.css` | Only Ireland decorative rules, no layout, no `@media` |
| `curtain.css` | Only curtain animation rules, nothing else |
| `responsive.css` | All four breakpoints: 480px, 768px, 1024px, 1280px |
| `style.css` | Only `@import` lines, zero actual styles |
| `main.js` | Exactly four functions: curtain, tabs, chapter state, dark mode |
| `index.html` | Only a redirect to `/india/`, no body content |
| `india/index.html` | `data-chapter="india"` on `<html>` tag |
| `ireland/index.html` | `data-chapter="ireland"` on `<html>` tag |

If your output fails any check, fix it before reporting done. Do not wait to be told.

---

## Hard Constraints — Never Violate

- Zero dependencies — no npm, no packages, no frameworks, no libraries
- Fonts via Google Fonts CDN only — no local font files
- No `@media` queries outside `responsive.css`
- No hardcoded colors or fonts outside `tokens.css` — always `var(--...)`
- `style.css` is a pure aggregator — only `@import` lines, zero styles
- `curtain.css` contains only curtain animation rules, nothing else
- All placeholder text uses `[bracket]` format

If you find yourself violating any of these, stop and fix before continuing.

---

## Project Overview

A two-chapter personal portfolio website telling the story of a journey from **India to Ireland**. The owner is a graduate student pursuing an MSc in Computer Science at Trinity College Dublin (TCD), expected to graduate in 2027, with 2 years of prior work experience in India.

- Primarily professional in tone, but with personality woven in
- Two distinct visual chapters: **India** and **Ireland**
- Hosted on **GitHub Pages** — pure HTML + CSS + vanilla JS only
- No frameworks, no npm, no build step — `git push` = deployed
- Fully **responsive** for mobile, tablet, and desktop

---

## File Structure

```
/
├── index.html                        ← Instant redirect to /india/
├── india/
│   └── index.html                    ← India chapter (default landing)
├── ireland/
│   └── index.html                    ← Ireland chapter
├── resume/
│   └── index.html                    ← Clean single-page resume
├── css/
│   ├── style.css                     ← Aggregator only, just @imports
│   └── modules/
│       ├── tokens.css                ← ALL CSS custom properties
│       ├── reset.css                 ← Browser reset
│       ├── base.css                  ← Typography hierarchy
│       ├── layout.css                ← Container, sections, prose, grid
│       ├── nav.css                   ← Navbar + IND↔IRE toggle
│       ├── components.css            ← Cards, tabs, timeline, tags, buttons
│       ├── india.css                 ← India-specific theme & aesthetics
│       ├── ireland.css               ← Ireland-specific theme & aesthetics
│       ├── curtain.css               ← Curtain transition animation only
│       └── responsive.css            ← ALL @media queries, nothing else
├── js/
│   └── main.js                       ← Curtain, tabs, chapter state, dark mode
└── assets/
    ├── india/                        ← India images (hero, trek, life)
    └── ireland/                      ← Ireland images (hero, dublin, tcd)
```

---

## File Generation Order

Generate files in this exact sequence. Do not skip, do not reorder:

1. `css/modules/tokens.css`
2. `css/modules/reset.css`
3. `css/modules/base.css`
4. `css/modules/layout.css`
5. `css/modules/nav.css`
6. `css/modules/components.css`
7. `css/modules/india.css`
8. `css/modules/ireland.css`
9. `css/modules/curtain.css`
10. `css/modules/responsive.css`
11. `css/style.css`
12. `js/main.js`
13. `index.html`
14. `india/index.html`
15. `ireland/index.html`
16. `resume/index.html`
17. `assets/india/.gitkeep`
18. `assets/ireland/.gitkeep`

---

## Entry Point

`index.html` is a pure redirect — no visible content, no flash:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/india/">
    <script>window.location.replace('/india/');</script>
  </head>
</html>
```

Default chapter is **India**. Root URL lands on India instantly.

---

## The IND ↔ IRE Toggle

### Placement
- **Top center of the navbar** on every page — `india/`, `ireland/`, `resume/`
- Sticky — stays visible on scroll
- Never in the hero section

### HTML Structure
```html
<div class="chapter-toggle">
  <button class="toggle-btn" id="btn-india" data-target="/india/">
    🇮🇳 IND
  </button>
  <span class="toggle-divider">↔</span>
  <button class="toggle-btn" id="btn-ireland" data-target="/ireland/">
    IRE 🇮🇪
  </button>
</div>
```

### Design Rules
- Pill-style switcher
- Font: `var(--font-mono)` — IBM Plex Mono
- Active chapter: accent color background + white text
- Inactive chapter: ghost/muted style
- `↔` separator is non-clickable, decorative only
- On India page → `#btn-india` gets `.active` class
- On Ireland page → `#btn-ireland` gets `.active` class
- Clicking the active button does nothing
- Clicking the inactive button triggers curtain then navigates

### CSS for centering in navbar
```css
.chapter-toggle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## Curtain Transition Effect

### How it works
1. A `<div class="curtain"></div>` sits as the last element before `</body>` on every page
2. Default state: off-screen above viewport (`translateY(-100%)`)
3. On toggle click → JS adds `.slide-down` → curtain covers full viewport
4. After 400ms → JS fires `window.location.href` to the target URL
5. New page loads → JS immediately adds `.slide-up` → curtain exits downward
6. After 600ms → JS removes `.slide-up`

### CSS — goes in `curtain.css` only
```css
.curtain {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  transform: translateY(-100%);
  z-index: 9999;
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}
.curtain.slide-down { transform: translateY(0); }
.curtain.slide-up   { transform: translateY(100%); }

[data-chapter="india"]   .curtain { background: #F4A124; }
[data-chapter="ireland"] .curtain { background: #1B4332; }
```

---

## Fonts

Load via Google Fonts CDN. This line goes at the top of `style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

| Font | Variable | Usage |
|------|----------|-------|
| EB Garamond | `var(--font-heading)` | `h1`, hero text, long-form prose, About sections |
| Inter | `var(--font-sans)` | `h2/h3/h4`, all UI, nav, tabs, buttons, body text |
| IBM Plex Mono | `var(--font-mono)` | IND/IRE toggle, skill tags, project stack labels, code |

---

## Color System — `tokens.css`

All colors are CSS custom properties. Chapter theming is driven by `data-chapter` on `<html>`.

```css
:root {
  --font-heading:      'EB Garamond', Georgia, serif;
  --font-sans:         'Inter', system-ui, sans-serif;
  --font-mono:         'IBM Plex Mono', monospace;
  --max-width:         960px;
  --transition:        300ms ease;
  --shadow-card:       0 2px 8px rgba(0,0,0,0.06);
  --shadow-card-hover: 0 8px 28px rgba(0,0,0,0.12);
}

/* ─── India Chapter ─── */
[data-chapter="india"] {
  --color-bg:         #FDF6EC;   /* warm cream */
  --color-bg-alt:     #F5ECD7;   /* deeper warm cream for cards */
  --color-text:       #1A0F00;   /* near black, warm */
  --color-text-muted: #6B4F2A;   /* warm muted brown */
  --color-accent:     #E07B39;   /* terracotta orange */
  --color-accent-2:   #C0392B;   /* deep red secondary */
  --color-border:     #D4B896;   /* warm tan border */
  --color-curtain:    #F4A124;   /* saffron curtain */
  --color-nav-bg:     #1A0F00;   /* dark warm nav */
  --color-nav-text:   #FDF6EC;
}

/* ─── Ireland Chapter ─── */
[data-chapter="ireland"] {
  --color-bg:         #F0F4F1;   /* cool off-white */
  --color-bg-alt:     #E2EBE5;   /* deeper cool green-tinted white */
  --color-text:       #0D1F15;   /* near black, cool */
  --color-text-muted: #4A6B55;   /* cool muted green */
  --color-accent:     #2D6A4F;   /* emerald green */
  --color-accent-2:   #1B4332;   /* deep forest green */
  --color-border:     #A8C5B0;   /* cool sage border */
  --color-curtain:    #1B4332;   /* deep green curtain */
  --color-nav-bg:     #0D1F15;   /* dark cool nav */
  --color-nav-text:   #F0F4F1;
}

/* ─── Dark Mode Overrides ─── */
[data-chapter="india"][data-theme="dark"] {
  --color-bg:         #1A0F00;
  --color-bg-alt:     #2A1A05;
  --color-text:       #FDF6EC;
  --color-text-muted: #C49A6C;
}

[data-chapter="ireland"][data-theme="dark"] {
  --color-bg:         #0D1F15;
  --color-bg-alt:     #152B1E;
  --color-text:       #F0F4F1;
  --color-text-muted: #7FB898;
}
```

---

## Navbar Structure

Use this exact HTML on all chapter pages. Do not deviate:

```html
<nav class="site-nav">
  <div class="nav-inner">
    <a href="/india/" class="nav-logo">[Your Name]</a>

    <div class="chapter-toggle">
      <button class="toggle-btn" id="btn-india" data-target="/india/">🇮🇳 IND</button>
      <span class="toggle-divider">↔</span>
      <button class="toggle-btn" id="btn-ireland" data-target="/ireland/">IRE 🇮🇪</button>
    </div>

    <div class="nav-links">
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="/resume/">Resume</a>
      <button class="theme-toggle" id="theme-toggle">○</button>
    </div>

    <button class="nav-hamburger" id="nav-hamburger">☰</button>
  </div>
</nav>
```

---

## Tab Structure

Use this pattern on both chapter pages:

```html
<div class="tab-bar">
  <button class="tab-btn active" data-tab="about">About</button>
  <button class="tab-btn" data-tab="experience">Experience</button>
  <button class="tab-btn" data-tab="projects">Projects</button>
  <button class="tab-btn" data-tab="skills">Skills</button>
  <button class="tab-btn tab-personal" data-tab="personal-1">[Personal Tab 1]</button>
  <button class="tab-btn tab-personal" data-tab="personal-2">[Personal Tab 2]</button>
  <button class="tab-btn tab-personal" data-tab="personal-3">[Personal Tab 3]</button>
</div>

<div class="tab-panels">
  <div class="tab-panel active" id="tab-about"></div>
  <div class="tab-panel" id="tab-experience"></div>
  <div class="tab-panel" id="tab-projects"></div>
  <div class="tab-panel" id="tab-skills"></div>
  <div class="tab-panel" id="tab-personal-1"></div>
  <div class="tab-panel" id="tab-personal-2"></div>
  <div class="tab-panel" id="tab-personal-3"></div>
</div>
```

---

## Shared Sections — Identical on Both Chapter Pages

Experience and Projects must be **identical in content** on both `india/index.html` and `ireland/index.html`. A recruiter landing on either chapter sees the full professional picture.

### Experience Tab
Vertical timeline. Each entry:
```
[Job Title] — [Company Name]
[City, India] · [Month Year] – [Month Year]
• [Responsibility placeholder]
• [Achievement placeholder]

MSc Computer Science — Trinity College Dublin
Dublin, Ireland · Sep 2025 – Expected 2027
• [Module / focus area placeholder]
• [Research / project placeholder]
```

### Projects Tab
Card grid — 3-col desktop, 2-col tablet, 1-col mobile.
Each card: Title, Stack tags (IBM Plex Mono), Description, GitHub + Live links.

Fetch from `projects.json` pattern:
```json
[
  {
    "title": "[Project Title]",
    "description": "[What it does, what problem it solves]",
    "stack": ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    "github": "#",
    "live": "#"
  }
]
```

### Skills Tab
Tag-style components using `var(--font-mono)`. Grouped by:
- Languages
- Frameworks
- AI/ML
- Cloud & DevOps
- Tools

---

## India Chapter — Unique Sections

Set `data-chapter="india"` on `<html>`. This drives all color tokens.

### Visual Aesthetic
- Warm, rich, textured — deep ochres, terracotta, saffron
- EB Garamond heavy for headings
- Hero: full-width background image `assets/india/hero.jpg`
- Hero overlay: `linear-gradient(to bottom, rgba(26,15,0,0.55), rgba(26,15,0,0.35))`

### Hero HTML
```html
<section class="hero india-hero">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-label">Chapter One</p>
    <h1>[Your Name]</h1>
    <p class="hero-sub">From India — Engineer, Builder, Explorer</p>
    <p class="hero-desc">[One line about yourself — placeholder]</p>
  </div>
</section>
```

### About Tab (India-specific)
Origin story — where you're from, what shaped you, why you chose Ireland. EB Garamond prose. Placeholder text.

### Personal Tabs (India)

**Tab: Adventures**
- Sarpass Trek — 13,700ft, Himalayas
- Stats block (IBM Plex Mono): Altitude, Distance, Duration — all placeholder
- Short write-up placeholder
- Photo grid placeholder referencing `assets/india/trek/`

**Tab: Life**
- Interests, photography, photo editing, creative pursuits, gym
- Warm casual tone, placeholder text

**Tab: Thoughts**
- Philosophical/aphoristic writing, personal reflections
- EB Garamond prose, generous line-height
- Placeholder entries

---

## Ireland Chapter — Unique Sections

Set `data-chapter="ireland"` on `<html>`. This drives all color tokens.

### Visual Aesthetic
- Cool, misty, atmospheric — deep greens, slate greys
- EB Garamond lighter weight, more airy
- Hero: full-width background image `assets/ireland/hero.jpg`
- Hero overlay: `linear-gradient(to bottom, rgba(13,31,21,0.55), rgba(13,31,21,0.35))`

### Hero HTML
```html
<section class="hero ireland-hero">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-label">Chapter Two</p>
    <h1>[Your Name]</h1>
    <p class="hero-sub">In Ireland — MSc CS, Trinity College Dublin</p>
    <p class="hero-desc">[One line about what you're building here — placeholder]</p>
  </div>
</section>
```

### About Tab (Ireland-specific)
Why Ireland, why TCD, what you're building here. Forward-looking tone. Placeholder text.

### Personal Tabs (Ireland)

**Tab: MSc @ TCD**
- Trinity College Dublin — MSc Computer Science, Expected 2027
- Modules, research focus, academic highlights — placeholder
- TCD aesthetic in this tab

**Tab: Dublin Life**
- Settling into Ireland, neighbourhoods, food, culture
- Casual observational tone, placeholder text

**Tab: What's Next**
- Post-graduation ambitions
- Target markets: Ireland, Netherlands, Germany, Singapore, Japan, Canada, Australia, US
- 2027 goals — agentic AI roles, Java development
- Placeholder text

---

## JS — `main.js`

Exactly four functions. No other logic. Call all four on `DOMContentLoaded`.

```javascript
function initCurtain() {
  // On .toggle-btn click → add .slide-down to .curtain
  // After 400ms → navigate to button's data-target URL
  // On page load → remove .slide-down, add .slide-up, after 600ms remove .slide-up
}

function initTabs() {
  // On .tab-btn click → remove .active from all .tab-btn and .tab-panel
  // Add .active to clicked button and matching #tab-{id} panel
}

function initChapter() {
  // On load → read data-chapter from <html>
  // Add .active to the matching .toggle-btn
}

function initDarkMode() {
  // On load → read localStorage('theme') → set data-theme on <html>
  // On #theme-toggle click → flip theme → write to localStorage
}

document.addEventListener('DOMContentLoaded', () => {
  initCurtain();
  initTabs();
  initChapter();
  initDarkMode();
});
```

---

## `style.css` — Aggregator Only

This file contains nothing except imports. Exact structure:

```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
@import 'modules/tokens.css';
@import 'modules/reset.css';
@import 'modules/base.css';
@import 'modules/layout.css';
@import 'modules/nav.css';
@import 'modules/components.css';
@import 'modules/india.css';
@import 'modules/ireland.css';
@import 'modules/curtain.css';
@import 'modules/responsive.css';
```

Zero styles. Zero rules. Imports only.

---

## Responsive Breakpoints — `responsive.css` Only

All `@media` queries live exclusively here:

| Breakpoint | Target |
|------------|--------|
| `max-width: 480px` | Mobile phones |
| `max-width: 768px` | Large phones / small tablets |
| `max-width: 1024px` | Tablets / small laptops |
| `max-width: 1280px` | Large laptops |

Rules per breakpoint:
- **Navbar `≤768px`** → hamburger menu, toggle stays visible and centered
- **Tab bar `≤768px`** → horizontal scroll, no wrapping, no overflow hidden
- **Project cards `≤480px`** → 1-col; `≤768px` → 2-col; desktop → 3-col
- **Timeline `≤768px`** → full-width single column
- **Hero `≤768px`** → reduced height, font sizes scaled down
- **Curtain** → full viewport on all sizes, no changes needed

---

## Resume Page — `resume/index.html`

- Clean, minimal, single-page
- Printable / PDF-friendly at A4
- Sections: Summary, Education, Experience, Projects, Skills, Contact
- `h1` / name: EB Garamond only. Everything else: Inter
- Same navbar with chapter toggle at top center
- All content placeholder text

---

## Images

All placeholder. Owner will replace with real images:

| Path | Usage | Recommended size |
|------|-------|-----------------|
| `assets/india/hero.jpg` | India hero background | 1920×1080 minimum |
| `assets/india/trek/` | Sarpass trek photos | Square or landscape |
| `assets/india/life/` | Life section photos | Square |
| `assets/ireland/hero.jpg` | Ireland hero background | 1920×1080 minimum |
| `assets/ireland/dublin/` | Dublin Life photos | Square or landscape |

---

## Cache Busting

Every HTML file must reference CSS and JS with version query strings:

```html
<link rel="stylesheet" href="/css/style.css?v=20260524">
<script src="/js/main.js?v=20260524" defer></script>
```

---

## Final Verification

After generating all 18 files, self-verify every item. Report PASS or FAIL for each. Fix all FAILs before reporting complete:

1. `index.html` redirects to `/india/` with no visible content
2. `india/index.html` has `data-chapter="india"` on `<html>`
3. `ireland/index.html` has `data-chapter="ireland"` on `<html>`
4. Chapter toggle is top-center in navbar on both chapter pages
5. Experience and Projects tab content is identical on both chapter pages
6. Curtain color is `#F4A124` for India chapter, `#1B4332` for Ireland chapter
7. Zero `@media` queries exist outside `responsive.css`
8. Zero hardcoded color values exist outside `tokens.css`
9. `style.css` contains only `@import` lines, zero styles
10. `curtain.css` contains only curtain animation rules, nothing else
11. `main.js` has exactly four functions
12. All placeholder text uses `[bracket]` format
13. Google Fonts CDN `@import` is present in `style.css`
14. Both `assets/india/` and `assets/ireland/` folders exist
15. Zero npm packages or external libraries referenced anywhere

---

*Spec version: 1.0 — May 2026*
