# Portfolio

Personal portfolio site for Jose Dirazar, extracted from `forgebyteslab.com` as a standalone Next.js 16 + App Router project.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- react-i18next with server-side `initTranslations()`
- next-themes for dark/light toggle
- WASM games (platformer + space-invaders) served as static bundles from `public/<game>/index.html` via iframe

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` — the root-locale proxy will 302 you to `/en` or `/es` based on `Accept-Language`.

## Routes

- `/` — proxy.ts redirects to `/en` or `/es`
- `/[locale]/portfolio` — main portfolio page
- `/[locale]/my-games` — games index
- `/[locale]/my-games/platformer` — platformer iframe
- `/[locale]/my-games/space-invaders` — space invaders iframe

## Tests

```bash
pnpm test
```