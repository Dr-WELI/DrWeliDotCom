# WELI — Creativity, Wellbeing & Engagement (Landing Page)

A fast, single-page site you can deploy **free** with **GitHub Pages**.

## 🚀 Quick start

1. **Create a new folder** and copy these files into it (or clone from your local working directory).
2. Initialize git and commit:

```bash
git init
git add .
git commit -m "Initial commit: WELI landing page"
```

3. Create a new GitHub repo (replace `USERNAME` and `REPO`):

**Option A — without GitHub CLI**
```bash
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

**Option B — with GitHub CLI (`gh`)**
```bash
git branch -M main
gh repo create REPO --public --source=. --remote=origin --push
```

4. **Enable GitHub Pages** (no build step needed):
   - On GitHub, open **Settings → Pages**
   - **Build and deployment**: *Deploy from a branch*
   - **Branch**: `main` — **Folder**: `/ (root)`
   - Click **Save**. Wait ~1–2 minutes.

5. Your site will be live at:
   - `https://USERNAME.github.io/REPO/` (or `https://USERNAME.github.io/` if you name the repo `USERNAME.github.io`).

## 🔧 Customise
- Edit **`index.html`** for text/sections.
- Update **contact** links near the end of `index.html`.
- Replace the YouTube/LinkedIn links in the **Watch my work** section if needed.
- Tweak colours in **`styles.css`** (CSS variables at the top).

## 🧩 Notes
- The LinkedIn promo opens in a new tab (LinkedIn embedding is restricted). The YouTube video is embedded.
- This site is 100% static — no backend required.

---

© WELI
