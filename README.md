# CAGE Docs

Public documentation for the closed-source **CAGE** language and runtime.

CAGE is an emoji-syntax language with a native C++ compiler/runtime architecture. This repository contains the public documentation site, tutorials, examples, deployment configuration, and ZIP synchronization workflow. It does **not** contain the private compiler/runtime source.

## Recovered docs surface

- 164 documentation routes across 10 categories
- 24 animated tutorial routes
- 9 `.cage` example programs
- Next.js + TypeScript/TSX static export
- mobile-first navigation and responsive reference pages
- root `index.html` standalone preview
- Netlify `out/` deployment
- ZIP-only GitHub Actions synchronization/build workflow

Pages label runtime-backed behavior separately from design/declared behavior.

## Run

```bash
npm install
npm test
npm run dev
```

Static export:

```bash
npm run build
```
