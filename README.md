# Abdelwaheb Ghoubali — Portfolio

A space/galaxy-themed personal portfolio built with React, Three.js (via React
Three Fiber + drei), Framer Motion, and Tailwind CSS v4.

**Live 3D layer:** a fixed WebGL canvas renders a drifting starfield + spiral
galaxy dust layer behind everything, plus a wireframe/glowing "orbital" hero
object that tilts toward the cursor and parallaxes away as you scroll. All
content sections float above it as glass panels.

---

## 1. Run it locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## 2. Project structure

```
src/
  components/
    three/
      Scene.jsx        # the single <Canvas>, wraps the whole 3D layer
      Starfield.jsx     # two layered point clouds (far stars + galaxy dust)
      HeroObject.jsx    # the glowing core + wireframe shell + orbit rings
    sections/
      Hero.jsx
      About.jsx
      Skills.jsx
      Certifications.jsx
      Projects.jsx
      Contact.jsx
    Navbar.jsx          # floating pill nav, active-section highlight, mobile menu
    Loader.jsx          # intro loading screen (tracks real asset progress)
    CustomCursor.jsx    # desktop-only custom cursor + hover glow ring
    SectionHeading.jsx  # shared "eyebrow + title" heading used by every section
    BrandIcons.jsx      # hand-rolled GitHub/LinkedIn glyphs
    Footer.jsx
  data/
    skills.js
    certifications.js
    projects.js
  hooks/
    useIsMobile.js       # detects small screens / touch devices
    useActiveSection.js  # IntersectionObserver-based scroll-spy for the navbar
  App.jsx                # wires everything together, owns the scroll progress value
  index.css              # design tokens (@theme), globals, glass/glow utilities
```

---

## 3. Where to put your real content

Everything you need to personalize lives in a handful of clearly-marked spots:

| What | File |
|---|---|
| Name, tagline, hero copy | `src/components/sections/Hero.jsx` |
| Bio paragraph | `src/components/sections/About.jsx` (look for the `PLACEHOLDER BIO` comment) |
| Skills & proficiency levels | `src/data/skills.js` |
| Certifications | `src/data/certifications.js` — replace each `name` / `issuer` / `date` / `verifyUrl` |
| Projects | `src/data/projects.js` — replace `title` / `description` / `tags` / `liveUrl` / `githubUrl` |
| Email / GitHub / LinkedIn links | `src/components/sections/Contact.jsx` — the `CONTACT` object near the top |
| Contact form submissions | Same file — set `FORM_ENDPOINT` to a free [Formspree](https://formspree.io) endpoint (or similar) to receive real emails. Until you do, the form simulates a send so the UI stays demoable. |
| Site title / meta description / OG image | `index.html` |
| Favicon | `public/favicon.svg` |

Certifications with no public verification link should keep `verifyUrl: null`
— the "Verify" link simply won't render for that card.

---

## 4. Design tokens

Colors, fonts, etc. are defined once in `src/index.css` under `@theme` (Tailwind
v4's CSS-based config) and used everywhere as Tailwind utilities
(`bg-void`, `text-star`, `text-accent`, `text-teal`, `text-muted`, `font-display`,
`font-mono`...). Change a value there and it updates across the whole site.

- **Accent:** electric violet (`#8b5cf6`), with teal (`#2dd4bf`) as a secondary
  cosmic accent used sparingly for depth cues.
- **Type:** Space Grotesk for headings (`font-display`), Inter for body text
  (default), JetBrains Mono for labels/eyebrows/tags (`font-mono`).

---

## 5. Performance notes

- The entire 3D scene (`three`, `@react-three/fiber`, `@react-three/drei`) is
  loaded via `React.lazy()` in `App.jsx`, so it's split into its own chunk and
  doesn't block the initial page paint.
- `useIsMobile()` detects small screens / coarse pointers and both the
  starfield and hero object automatically reduce particle counts and drop the
  orbit rings on mobile.
- `dpr` (device pixel ratio) is capped lower on mobile in `Scene.jsx` to keep
  the frame rate healthy on phones.
- Reduced-motion is respected globally (see the `prefers-reduced-motion` block
  in `index.css`).

---

## 6. Deploying

### Vercel
1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output
   directory `dist` (Vercel usually detects this automatically).
4. Deploy.

### Netlify
1. Push this project to a GitHub repo.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

Both platforms also support drag-and-drop: run `npm run build` locally and
drag the resulting `dist/` folder onto Netlify's dashboard for a quick manual
deploy.

---

## 7. Tech stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Three.js](https://threejs.org) via [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei)
- [Framer Motion](https://www.framer.com/motion/) for scroll-reveals, the intro sequence, and micro-interactions
- [Tailwind CSS v4](https://tailwindcss.com) for layout/styling
- [lucide-react](https://lucide.dev) for utility icons
