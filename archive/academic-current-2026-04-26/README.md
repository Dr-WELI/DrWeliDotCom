# Academic page archive - 2026-04-26

This folder records the protected academic-page state before further homepage/program/showreel recovery work.

## Protected branch

`backup/academic-current-2026-04-26`

This branch points to commit:

`08bb3e8407cf35638829870a384169e323957601`

That commit includes:

- Restored full academic page from the Apr 21 working version
- Updated release artwork images
- Restored `site-polish.css` with header/showreel overrides

## Academic page files in use

The live academic page is:

- `academic/index.html`

The academic page currently references:

- `/styles.css` - shared global styles
- `/script.js` - shared mobile-nav/year helper script
- Google font: Instrument Sans

The academic-specific visual system is mostly inline inside `academic/index.html`, including:

- `.academic-hero`
- `.academic-signal`
- `.research-orbit-shell`
- `.research-orbit`
- `.research-node`
- `.research-hub`
- `.appointments-wrap`
- `.publications-grid`
- `.flagship-project-card`

## Safe restoration commands

To restore only the academic page from this protected branch:

```bash
git fetch origin
git checkout backup/academic-current-2026-04-26 -- academic/index.html
git add academic/index.html
git commit -m "Restore academic page from protected archive"
git push
```

To inspect the archived academic page without changing files:

```bash
git show backup/academic-current-2026-04-26:academic/index.html
```

## Conservative recovery note

Do not reset the whole repo to this branch unless intentionally rolling back all newer changes. Restore only `academic/index.html` if the academic page is damaged again.
