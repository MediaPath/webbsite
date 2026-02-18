# MediaPath EU Astro Website

This project is an Astro + Tailwind website template prepared for MediaPath EU content.

## Current Scope

- MediaPath EU homepage content based on `mediapatheu.wordpress.com`
- Core pages:
  - `/`
  - `/about/`
  - `/services/`
  - `/blog/`
  - `/blog/[slug]/`
  - `/articles/`
  - `/articles/[slug]/`
- Empty content collections ready for new markdown entries:
  - `src/content/blog/`
  - `src/content/article/`

## Development

```bash
bun install
bun run dev
```

## Validation

```bash
bun run build
bun run seo:check
```
