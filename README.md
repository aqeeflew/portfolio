# Aqeef — Personal Portfolio

A fast, responsive, dependency-free portfolio website.

**Features:** hero with typing animation · about & stats · skills · filterable projects · experience/education timeline · contact form (opens your email app) · light/dark theme · mobile menu · scroll animations · respects reduced-motion.

## Personalize it
All content lives in **`data.js`** — edit your name, bio, skills, projects, experience, education, email and social links there. Replace anything in `[brackets]`.

- **Photo:** add an image (e.g. `assets/me.jpg`) and set `avatar: "assets/me.jpg"`.
- **Résumé:** add `resume.pdf` and set `resumeUrl: "resume.pdf"`.
- **Project screenshots:** add `image: "assets/project.png"` to any project.
- **Colors:** change `--accent` / `--accent-2` at the top of `styles.css`.

## Run locally
Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

## Deploy
Static files only — works on GitHub Pages (Settings → Pages → deploy from branch), Vercel, or Netlify.
