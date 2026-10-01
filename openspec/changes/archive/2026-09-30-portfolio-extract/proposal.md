# Proposal: portfolio-extract

## Intent

Extract Jose Dirazar's personal portfolio from `forgebyteslab.com` into a standalone Next.js project at `portfolio-app/`. The portfolio is entangled with the forgebyteslab business site, forcing whole-business deploys for any portfolio change. New project owns its deps and pipeline.

## Scope

### In Scope
- Scaffold fresh Next.js (App Router, TS, Tailwind v4, ESLint flat) at `portfolio-app/`.
- Migrate routes, components, contexts, hooks, libs, translations, static assets (~110 MB WASM).
- Wire EN/ES switcher, dark/light toggle, WASM iframes, disabled contact form; add Vitest + Testing Library + jsdom.
- Swap `@teispace/next-themes` for official `next-themes`; fix `plarformer.tsx` → `platformer.tsx`.

### Out of Scope
- forgebyteslab routes, contact API/email, Resend/Zod/simplex-noise.
- `next-i18next`, `next-i18n-router`, `next-intl` (only `react-i18next` is used).
- LinkedIn remote pattern, unused `@font-face`, `forgebytes.json`, WASM CDN.

## Capabilities

### New Capabilities
- `portfolio-content`: bio, projects, experience, skills, contact (rendered, disabled).
- `i18n`: EN/ES via `[locale]` App Router segment + `react-i18next` server init.
- `theme`: dark/light toggle via `next-themes`, persisted in localStorage.
- `games`: WASM games (platformer + space-invaders) via iframe + byte-for-byte `public/<game>/**`.

### Modified Capabilities
- None.

## Approach

1. `create-next-app` into `portfolio-app/` (App Router, TS, Tailwind v4, ESLint, `@/*`).
2. Copy exploration's file list byte-for-byte; reproduce i18n/theme/WASM recipes; prune business deps + `forgebytes` namespace.
3. Rename `plarformer.tsx` → `platformer.tsx`; move `BiggerLogo.tsx` to `components/portfolio/`; swap `next-themes` fork for official.

## Affected Areas

- `portfolio-app/app/[locale]/**`
- `portfolio-app/app/{i18n,i18nConfig,proxy}.ts`
- `portfolio-app/components/{portfolio,games}/**`
- `portfolio-app/components/{LanguageSwitcher,theme-switch,TranslationsProvider}.tsx`
- `portfolio-app/context/theme-provider.tsx`
- `portfolio-app/lib/{data,hooks,utils,types}.ts`
- `portfolio-app/public/locales/{en,es}/{common,data}.json`
- `portfolio-app/public/{*.webp,*.svg,photo-profile.webp,cv/**}`
- `portfolio-app/public/{platformer,space-invaders}/**`
- `portfolio-app/{app/index.css,next.config.ts,package.json,tsconfig.json,vitest.config.ts}`

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| WASM loader path drift breaks games | Med | Keep `public/{platformer,space-invaders}/` exact. |
| `plarformer` rename misses import | Low | One import; grep after. |
| `next-themes` swap import miss | Low | One file; retest toggle. |
| Tailwind v4 / shadcn vars lost | Med | Copy `app/index.css` incl. `.theme-experience`. |
| 110 MB repo bloat | Med | Document size; Git LFS deferred. |
| Reinstall dropped i18n libs | Med | Pin deps; verify `package.json`. |
| Contact placeholder UI lost | Med | Keep component; drop submit + API. |

## Rollback Plan

`rm -rf portfolio-app/`. Source `forgebyteslab.com` untouched.

## Dependencies

- Node 20+, pnpm 9+; `create-next-app`; npm packages per exploration §Recommendation step 2 minus drops.

## Success Criteria

- [ ] `pnpm dev` serves `/en` and `/es`; both render portfolio.
- [ ] Language switcher swaps locale, preserves route.
- [ ] Dark/light toggle persists across reloads.
- [ ] Both WASM games play identically to source.
- [ ] `next build` passes, zero TS errors.
- [ ] No `forgebytes`-only code, no `next-i18next`/`next-intl`/`resend`/`zod` in `package.json`.
- [ ] Contact form rendered; submit is a no-op.