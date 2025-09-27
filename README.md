# Personal Portfolio (Static HTML/CSS/JS)

A fast, responsive single‑page portfolio for Mohan R. Built with vanilla HTML/CSS/JS and a few lightweight vendor libraries. Optimized for quick first paint and shareable rich previews.

## Live Sections
- Home (hero with typed text + resume CTA)
- About
- Experience 
- Skills
- Projects
- Coding Profiles
- Contact

## Tech Stack
- HTML5, CSS3
- Bootstrap 5 (layout/components)
- AOS (scroll animations)
- Swiper, GLightbox (optional vendor effects)
- Typed.js (typewriter hero)
- jQuery (DOM helpers)

## Getting Started (Local)
- Open `index.html` directly in a browser.
- Or serve locally for cleaner routing:
```bash
# from the personal-website directory
python -m http.server 8080  # or any static server
# visit http://localhost:8080
```

## Deploy
### GitHub Pages
1. Push this `personal-website` folder to a repo (e.g., `Mohan18R/personal-website`).
2. In GitHub → Settings → Pages → Source: `main` branch, root (or `/docs` if you move files).
3. Your site will be available at `https://<username>.github.io/<repo>/`.

### Any Static Host
Upload the contents of `personal-website/` to Netlify, Vercel (static), Cloudflare Pages, or your server.

## Customization
- Profile image: `assets/img/mohan.jpg`
- HCLTech logo in Experience: `assets/img/hcl.jpg` (40×40 displayed)
- Hero typed text: in `index.html` (`data-typed-items` on `.typed` span)
- Skills icons: in the Skills section (SVGs via CDN)
- Projects: edit cards under `#projects`
- Social links: header profile → `.social-links`
- Favicon set: `favicon.ico`, `apple-touch-icon.png`, etc. Cache‑busting query `?v=2` is added in `<head>`; update version if you replace icons

## Performance Tweaks
- Deferred all vendor and main JS
- Preconnect to Google Fonts + `&display=swap`
- Lazy‑load non‑critical images (`loading="lazy"` + `decoding="async"`)
- Prioritized sidebar avatar image (`fetchpriority="high"`)
- Hidden sidebar scrollbar track for cleaner UI

## Profile Views Counter
- Implemented with `countapi.xyz` in `assets/js/main.js`
- If the API fails (e.g., blocked), the `Profile Views` section auto‑hides to avoid broken UI

## Ordering and Navigation
- Navbar and page order: About → Experience → Skills → Projects → Coding Profiles → Contact
- Smooth scrolling + active link highlighting handled in `assets/js/main.js`

## Development Notes
- Styles live in `assets/css/style.css`
- Behavior in `assets/js/main.js`
- Vendor assets in `assets/vendor/`
- Keep indentation and formatting consistent with current files

## License
This site content is © Mohan R. You may reuse the structure with attribution; replace content and assets with your own.
