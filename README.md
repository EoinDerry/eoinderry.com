# EoinDerry.com

A bespoke, light, spreadsheet-themed static site for **eoinderry.com** —
built with Jekyll so GitHub Pages builds and hosts it (with free SSL)
every time you push. All written content lives in plain Markdown.

> The previous CCNA/networking site is fully preserved on the
> `archive/ccna-site-2026-07` branch — nothing was lost in the redesign.

---

## 1. Writing a guide (the everyday workflow)

Create one Markdown file in `_posts/`, named
`YYYY-MM-DD-short-slug.md`:

```markdown
---
title: "Format as Table: the feature that changes everything"
description: A one-sentence standfirst shown under the title and on cards.
date: 2026-07-21
domain: working-with-data
---

Your guide, in ordinary Markdown...
```

Push it. The guide appears on the homepage, the guides page, the RSS
feed — **and attaches itself to its stage on the Excel path**,
switching that stage from amber to live.

`domain` must be one of the ids in `_data/roadmap.yml`:

| id | Stage |
|----|-------|
| `foundations` | 01 Foundations |
| `working-with-data` | 02 Working with data |
| `formulas` | 03 Formulas that think |
| `lookups` | 04 Lookups & joining data |
| `analysis` | 05 Analysis & reporting |
| `power-tools` | 06 Power tools & automation |

For content that doesn't fit a stage, omit `domain` — the guide is
labelled "Field notes" instead.

Fenced code blocks render as Excel formula bars (with the *fx* gutter):

<pre>
```
=XLOOKUP(B2, Customers!A:A, Customers!C:C)
```
</pre>

Markdown tables render styled like a clean sheet — use them freely.

## 2. Editing everything else

| To change… | Edit… |
|------------|-------|
| Site title, tagline, email, social links | `_config.yml` |
| About page | `about/index.md` |
| Excel path stages & topic lists | `_data/roadmap.yml` |
| Homepage sections | `index.html` |
| Colours, fonts, spacing | `assets/css/main.css` (tokens at the top) |
| Hero spreadsheet animation | `assets/js/main.js` (the `CLEAN` array and `run` sequence) |
| Logo / brand assets | `assets/brand/` (see its README) |

### Newsletter

The signup forms are wired but dormant. Sign up with a provider
(Buttondown is the simplest for a personal site), copy its form action
URL, and paste it into `newsletter_action` in `_config.yml`. Every form
on the site activates at once.

### YouTube

The header link, homepage section and footer all read the channel URL
from `social.youtube` in `_config.yml`.

## 3. Running the site locally (optional)

You never *need* to — GitHub builds it for you — but for instant
previews while writing:

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

## 4. Design notes (for future you)

- **Fonts:** Bricolage Grotesque (display), Instrument Sans (body),
  IBM Plex Mono (labels/formulas) — loaded from Google Fonts in
  `_layouts/default.html`.
- **Palette:** design tokens at the top of `main.css`. Brand green is
  `--accent: #0E7A4F`; change one token and the buttons, links, LEDs
  and logo all follow. The palette was chosen to survive a future
  pivot toward Microsoft 365 or personal-finance content.
- **Logo:** the ED cell monogram (letters built from spreadsheet
  cells) lives in `assets/brand/` as SVG in every needed variant.
- **Animations:** the hero spreadsheet ("ordering the data") is plain
  DOM + timeouts in `main.js`; scroll reveals use IntersectionObserver.
  All motion respects `prefers-reduced-motion`.
- **No build tooling, no npm, no frameworks.** Plain CSS and JS on
  purpose — nothing to rot.
