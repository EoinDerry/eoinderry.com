# EoinDerry.com

A bespoke, dark, network-themed static site for **eoinderry.com** —
built with Jekyll so GitHub Pages builds and hosts it (with free SSL)
every time you push. All written content lives in plain Markdown.

---

## 1. Put it live on GitHub Pages (one-time, ~10 minutes)

1. **Create a repository** on GitHub called `eoinderry.com`
   (any name works, but this keeps it tidy).
2. **Upload everything in this folder** to the root of that repository
   (or `git init`, commit, and push).
3. In the repository: **Settings → Pages** →
   - *Source*: **Deploy from a branch**
   - *Branch*: `main`, folder `/ (root)` → **Save**
4. Wait a minute or two. Your site is now live at
   `https://<your-username>.github.io/eoinderry.com/`.

### Connect the eoinderry.com domain

1. Still in **Settings → Pages**, enter `eoinderry.com` under
   *Custom domain* and save. (The `CNAME` file in this folder keeps
   that setting across future pushes.)
2. At your domain registrar, create these DNS records:

   | Type  | Host | Value |
   |-------|------|----------------------|
   | A     | @    | `185.199.108.153` |
   | A     | @    | `185.199.109.153` |
   | A     | @    | `185.199.110.153` |
   | A     | @    | `185.199.111.153` |
   | CNAME | www  | `<your-username>.github.io` |

3. Back in **Settings → Pages**, once the DNS check passes, tick
   **Enforce HTTPS**. GitHub provisions the SSL certificate
   automatically (it can take up to an hour the first time).

That's it. From now on, every push to `main` republishes the site.

---

## 2. Writing an article (the everyday workflow)

Create one Markdown file in `_posts/`, named
`YYYY-MM-DD-short-slug.md`:

```markdown
---
title: "VLANs: Fences for Floods"
description: A one-sentence standfirst shown under the title and on cards.
date: 2026-07-15
domain: network-access
---

Your article, in ordinary Markdown...
```

Push it. The article appears on the homepage, the articles page, the
RSS feed — **and attaches itself to its exam domain on the CCNA
roadmap**, switching that node from amber to live.

`domain` must be one of the ids in `_data/roadmap.yml`:

| id | Domain |
|----|--------|
| `fundamentals` | 1.0 Network Fundamentals |
| `network-access` | 2.0 Network Access |
| `ip-connectivity` | 3.0 IP Connectivity |
| `ip-services` | 4.0 IP Services |
| `security` | 5.0 Security Fundamentals |
| `automation` | 6.0 Automation & Programmability |

For content adjacent to the syllabus, omit `domain` — the article is
labelled "Field notes" instead.

Code blocks with CLI output look best fenced as plain text:

<pre>
```
SW1# show ip interface brief
```
</pre>

## 3. Editing everything else

| To change… | Edit… |
|------------|-------|
| Site title, tagline, email, social links | `_config.yml` |
| About page | `about/index.md` |
| Training page | `training/index.md` |
| CCNA domains & topic lists | `_data/roadmap.yml` |
| Homepage sections | `index.html` |
| Colours, fonts, spacing | `assets/css/main.css` (tokens at the top) |
| Hero terminal script | `assets/js/main.js` (the `script` array) |

### Newsletter

The signup forms are wired but dormant. Sign up with a provider
(Buttondown is the simplest for a personal site), copy its form action
URL, and paste it into `newsletter_action` in `_config.yml`. Every form
on the site activates at once.

---

## 4. Running the site locally (optional)

You never *need* to — GitHub builds it for you — but for instant
previews while writing:

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

---

## 5. Design notes (for future you)

- **Fonts:** Bricolage Grotesque (display), Instrument Sans (body),
  IBM Plex Mono (labels/code) — loaded from Google Fonts in
  `_layouts/default.html`.
- **Accent:** `--accent: #35e0d0` in `main.css`. Change one token and
  the packets, LEDs, links and buttons all follow.
- **Animations:** the hero topology is `assets/js/network.js` (canvas,
  dependency-free, pauses off-screen). All motion respects
  `prefers-reduced-motion`.
- **No build tooling, no npm, no frameworks.** Plain CSS and JS on
  purpose — nothing to rot.
