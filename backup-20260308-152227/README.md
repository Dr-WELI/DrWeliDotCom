# WELI — Creativity, Wellbeing & Engagement (Landing Page)

Production-ready static site for **GitHub Pages**.

## 🚀 Publish / Update

```bat
cd %USERPROFILE%\weli-site

rem ensure correct remote (org repo)
git remote set-url origin https://github.com/Dr-WELI/program-site.git

git add .
git commit -m "Design refresh: Ariana-style gradient (no grid) + subtle shimmer + Ideal-for + hero CTAs"
git push -u origin main
```

Then enable Pages:
- Settings → **Pages** → *Deploy from a branch*
- Branch: `main` · Folder: `/ (root)` → **Save**
- Live at: `https://dr-weli.github.io/program-site/`

## 🧩 Customise
- Edit `index.html` text and links
- Tweak gradient colours in `:root` (`styles.css`)
- Replace `WELI_Program_Pack.pdf` when needed

## 📄 Files
- `index.html` — landing page
- `styles.css` — Ariana-style gradient (no grid), glitter, subtle shimmer
- `script.js` — mobile nav + smooth scroll
- `WELI_Program_Pack.pdf` — program pack with pricing, ideal-for & testimonials

---
© WELI
