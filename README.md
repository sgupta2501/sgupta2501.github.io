# Samarth Gupta — Personal Site

A clean, minimal, multi-page academic/product portfolio site built with plain
Jekyll (no extra gems, no build step needed) — ready for GitHub Pages.

## Before you deploy

1. **Add your real photo.** Replace `assets/img/avatar.svg` with a real image
   (e.g. `avatar.jpg`), then update the `src` in `_includes/sidebar.html`.
2. **Add your resume PDF.** Drop your resume into `assets/cv/` and name it
   `Samarth_Gupta_Resume.pdf` (or update the filename referenced in
   `_includes/sidebar.html` and `contact.md`).
3. Double check all bio/experience content across the `.md` files — everything
   was written from your resumes, but proofread names, dates, and numbers.

## Deploying to GitHub Pages

### Option A — user/org site (yoursite becomes `https://<username>.github.io`)
1. Create a new GitHub repo named exactly `<username>.github.io`.
2. Push all files in this folder to the `main` branch of that repo.
3. Go to **Settings → Pages** in the repo. Under "Build and deployment",
   set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Your site goes live at `https://<username>.github.io` within a minute or two.

### Option B — project site (any repo name)
1. Create a repo with any name, e.g. `portfolio`.
2. Push all files to `main`.
3. Same **Settings → Pages** steps as above.
4. Your site is live at `https://<username>.github.io/portfolio/`.
   - If you use this option, set `baseurl: "/portfolio"` in `_config.yml`
     so internal links resolve correctly.

### Custom domain (optional)
1. Buy/own a domain (e.g. from Namecheap, GoDaddy, Google Domains).
2. Add a file named `CNAME` (no extension) at the repo root containing just
   your domain, e.g.:
   ```
   samarthgupta.com
   ```
3. At your domain registrar, add a `CNAME` record pointing to
   `<username>.github.io`, or `A` records pointing to GitHub Pages' IPs
   (185.199.108.153, .109.153, .110.153, .111.153) if using an apex domain.
4. Back in **Settings → Pages**, enter the custom domain and enable
   "Enforce HTTPS" once it's verified.

## Local preview (optional)

If you have Ruby installed:
```bash
gem install bundler jekyll
bundle init
bundle add jekyll
bundle exec jekyll serve
```
Then open `http://localhost:4000`. This step is optional — GitHub Pages
builds the Jekyll site automatically on every push, so you don't need Ruby
installed locally just to deploy.

## Structure

```
_config.yml            → site title, description, permalink settings
_layouts/default.html   → page wrapper (head, sidebar, footer)
_includes/sidebar.html  → shared header, socials, resume button, nav
assets/css/style.css    → all styling (design tokens at the top)
assets/js/timeline.js   → draws the wavy connector line on Education/Experience
assets/img/             → avatar + favicon (swap avatar.svg for a real photo)
assets/cv/               → drop your resume PDF here
index.md             → About (home page)
education.md          → Degrees, timeline layout
research.md           → Publications + dissertation (separate from Education)
experience.md         → Work history, timeline layout
leadership.md         → Positions of responsibility
projects.md           → Projects
contact.md            → Contact info
```

## Institution/company badges

The small colored "FMS" / "SNU" / "HUL" etc. squares next to each entry are
plain CSS monogram badges, not real logos — pulling actual company/university
logos raises trademark/licensing questions I can't resolve for you, so this
keeps things clean and safe by default. If you'd rather use the real logos:
1. Save each logo image into `assets/img/logos/` (e.g. `fms.png`, `snu.png`).
2. In `education.md` / `experience.md` / `leadership.md`, replace e.g.
   `<span class="org-badge">FMS</span>` with
   `<img src="{{ '/assets/img/logos/fms.png' | relative_url }}" class="org-badge" alt="FMS">`.

## Adding your real photo

Replace `assets/img/avatar.svg` with a real image file (e.g. `avatar.jpg`),
then in `_includes/sidebar.html` change:
```html
<img src="{{ '/assets/img/avatar.svg' | relative_url }}" ...>
```
to point at your new filename.

## Editing content

Each page is plain Markdown with a bit of HTML for the styled "entry" blocks
(title/org/date). To add a new entry anywhere, copy an existing `<div
class="entry">...</div>` block and edit the text — no other files need to
change.
