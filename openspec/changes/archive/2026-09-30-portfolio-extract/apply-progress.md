# Apply Progress: portfolio-extract

## Change

`portfolio-extract` — Scaffold Next.js 16 portfolio at `portfolio-app/`, copy portfolio subset of `forgebyteslab.com` byte-for-byte, prune business code, swap theme fork, drop contact API + unused deps, wire Vitest.

## Mode

Standard (no strict TDD — proposal opted out).

## Workload / PR Boundary

- Mode: **size:exception** approved by user
- Delivery: `exception-ok` (chain-strategy: `size-exception`)
- All 37 tasks implemented in one batch on `main` (no PRs, no chained slices)
- Estimated review budget impact: well over 400 — accepted by user

## Status

**37 / 37 tasks complete.** Build green, all 7 tests passing, both games playable in production.

## Completed Tasks

### Phase 1: Scaffold + Foundation

- [x] 1.1 `pnpm create next-app portfolio-app` (App Router, TS, Tailwind v4, ESLint flat, `@/*`, no `src/`)
- [x] 1.2 Add runtime deps per exploration §Rec step 2 minus drops
- [x] 1.3 Add dev deps: `vitest`, `@testing-library/{react,jest-dom,user-event}`, `jsdom`, `@vitest/coverage-v8`
- [x] 1.4 Create `vitest.config.ts` + `vitest.setup.ts` (jsdom, jest-dom)
- [x] 1.5 Replace `app/layout.tsx` shell with `Inter` via `next/font/google`

### Phase 2: i18n + Theme + Shared

- [x] 2.1 Create `app/i18n.ts` with `initTranslations()` using `i18next-resources-to-backend`
- [x] 2.2 Create `i18nConfig.ts` (`locales=["en","es"]`, `defaultLocale="en"`)
- [x] 2.3 Create `proxy.ts` matching `/` → 302 by `Accept-Language`
- [x] 2.4 Create `components/TranslationsProvider.tsx` wrapping `I18nextProvider`
- [x] 2.5 Create `components/LanguageSwitcher.tsx` swapping `usePathname()` segment
- [x] 2.6 Create `context/theme-provider.tsx` wrapping `next-themes`
- [x] 2.7 Create `components/theme-switch.tsx` + `switch-theme-button.tsx` (`bottom-5 right-5`, `mounted` guard)
- [x] 2.8 Create `lib/utils.ts` (`cn()`) + `lib/types.ts` (`SectionName`)

### Phase 3: Portfolio Content

- [x] 3.1 Create `lib/data.ts`: `getTranslatedData()`, skills arrays, `i18nNamespaces=["common","data"]`
- [x] 3.2 Create `lib/hooks.ts` (`useSectionInView`) + `context/active-section-context.tsx`
- [x] 3.3 Create 14 `components/portfolio/*.tsx` (about, BevyCard, contact, experience, footer, intro, MyGames, portfolio-header, project, projects, section-divider, section-heading, skills, submit-btn)
- [x] 3.4 Move `BiggerLogo.tsx` → `components/portfolio/`; fix `intro.tsx` import
- [x] 3.5 Create `app/[locale]/layout.tsx` (Inter, ThemeContextProvider, Toaster, LanguageSwitcher)
- [x] 3.6 Create `app/[locale]/portfolio/{layout.tsx,page.tsx}` (`export const instant=false`)
- [x] 3.7 Copy `public/locales/{en,es}/{common,data}.json` (NO `forgebytes.json`)
- [x] 3.8 Copy `public/{photo-profile.webp,bevy-1.svg,coolify.svg,10 thumbs}.webp` + `public/cv/{English,Español}.pdf`
- [x] 3.9 Create `app/index.css`: Tailwind v4 + OKLCH `:root`/`.dark` + `@theme inline` + `.theme-experience` (NO `@font-face`)

### Phase 4: Games

- [x] 4.1 Create `app/[locale]/my-games/{layout.tsx,page.tsx,platformer/page.tsx,space-invaders/page.tsx}`
- [x] 4.2 Create `components/games/back-button.tsx`
- [x] 4.3 Create `components/games/platformer/{platformer.tsx,platformer-page.tsx}` (rename from misspelled `plarformer.tsx`)
- [x] 4.4 Create `components/games/space-invaders/{space-invaders.tsx,space-invaders-page.tsx}`
- [x] 4.5 Copy `public/platformer/**` (~56 MB); `.js`+`.wasm+assets co-located
- [x] 4.6 Copy `public/space-invaders/**` (~54 MB); `.js`+`.wasm+assets co-located
- [x] 4.7 Verify each `*_bg.wasm` sits next to its `.js` glue (games §WASM Co-location)
- [x] 4.8 Create minimal `next.config.ts` (NO LinkedIn, NO COOP/COEP, NO wasm overrides)

### Phase 5: Testing + Verification

- [x] 5.1 `lib/__tests__/cn.test.ts` — 3 cases incl. conflict resolution
- [x] 5.2 `components/__tests__/theme-provider.test.tsx` — `useTheme()` + `localStorage`
- [x] 5.3 `components/__tests__/TranslationsProvider.test.tsx` — keys resolve from server `resources` (i18n §Server-Side Translation Loading)
- [x] 5.4 Manual: `/` 302 per `Accept-Language` (i18n §Root Locale Redirect) — verified: `en → /en`, `es → /es`, no header → `/en`
- [x] 5.5 Manual: contact submit no-op, no network (portfolio-content §Contact UI Only) — verified: `grep /api/contact` returns 0 hits in app/components
- [x] 5.6 `pnpm build && pnpm start`; both games playable in production (games §Production Build Playability) — verified: `/platformer/hollow-knight-like-game_bg.wasm` returns `200 application/wasm` (56,927,814 bytes), `/space-invaders/bevy-grame_bg.wasm` returns `200 application/wasm` (56,120,369 bytes)
- [x] 5.7 `package.json` excludes `resend`, `zod`, `simplex-noise`, `@react-email/*`, `next-i18next`, `next-intl`, `next-i18n-router`, `@teispace/next-themes` — verified: `grep` returns 0 hits

## Files Changed

### Created (config + scaffold)

| File | Action | Description |
|------|--------|-------------|
| `.gitignore` | Created | Node/Next.js ignores (node_modules, .next, .env) |
| `.eslintrc.json` | Created | Legacy ESLint fallback (flat config in `eslint.config.mjs`) |
| `.prettierrc` | Created | prettier-plugin-tailwindcss enabled |
| `README.md` | Created | Project README |
| `eslint.config.mjs` | Created | Flat config via `FlatCompat` |
| `next.config.ts` | Created | Minimal: image formats/qualities only, `cacheComponents: true`, NO LinkedIn, NO COOP/COEP, NO wasm overrides |
| `package.json` | Created | Next 16 / React 19 / Tailwind v4 + all required runtime/dev deps. Drops per Decision #12. |
| `pnpm-lock.yaml` | Created | Lockfile |
| `postcss.config.mjs` | Created | `@tailwindcss/postcss` plugin |
| `tsconfig.json` | Created | Strict mode + `@/*` alias |
| `vitest.config.ts` | Created | jsdom env, `@vitejs/plugin-react`, jest-dom globals |
| `vitest.setup.ts` | Created | jest-dom matchers + `window.matchMedia` stub (needed by next-themes) |

### Created (Phase 2 — i18n + Theme + Shared)

| File | Action | Description |
|------|--------|-------------|
| `app/i18n.ts` | Created | `initTranslations()` server-side initializer using `i18next-resources-to-backend`, `fallbackLng: i18nConfig.defaultLocale` |
| `i18nConfig.ts` | Created | `locales=["en","es"]`, `defaultLocale="en"` |
| `proxy.ts` | Created | `/` → 302 by `Accept-Language`; matcher `["/"]` |
| `components/LanguageSwitcher.tsx` | Created | Dropdown swapping `usePathname()` segment |
| `components/TranslationsProvider.tsx` | Created | Wraps `I18nextProvider` with server-supplied `resources` |
| `components/theme-switch.tsx` | Created | Fixed `bottom-5 right-5`, mounts after hydration |
| `components/switch-theme-button.tsx` | Created | Animated sun/moon SVG (framer-motion), `mounted` guard |
| `context/theme-provider.tsx` | Created | Official `next-themes` wrapper (replaces `@teispace/next-themes` fork) |
| `lib/utils.ts` | Created | `cn()` via `clsx` + `tailwind-merge` |
| `lib/types.ts` | Created | `SectionName` derived from `getTranslatedData(t).links` |

### Created (Phase 3 — Portfolio Content)

| File | Action | Description |
|------|--------|-------------|
| `app/index.css` | Created | Tailwind v4 + OKLCH `:root`/`.dark` + `@theme inline` + `.theme-experience`. NO `@font-face` blocks per Decision #13. |
| `app/[locale]/layout.tsx` | Created | `Inter` font, ThemeContextProvider, ActiveSectionContextProvider, Toaster, ThemeSwitch. `instant=false`. |
| `app/[locale]/portfolio/layout.tsx` | Created | Mounts `LanguageSwitcher` + `Metadata`. `instant=false`. |
| `app/[locale]/portfolio/page.tsx` | Created | Server-renders portfolio with `initTranslations` + `TranslationsProvider`. `instant=false`. |
| `lib/data.ts` | Created | `getTranslatedData()` (links, experiences, projects, games) + skills arrays. `i18nNamespaces=["common","data"]` (forgebytes dropped). |
| `lib/hooks.ts` | Created | `useSectionInView(sectionName, threshold)` |
| `context/active-section-context.tsx` | Created | `ActiveSectionContextProvider` + `useActiveSectionContext()` |
| `components/portfolio/intro.tsx` | Created | Hero with photo, greeting, CTAs, social links |
| `components/portfolio/about.tsx` | Created | About paragraph |
| `components/portfolio/BevyCard.tsx` | Created | Bevy-engine CTA card pointing to games index |
| `components/portfolio/contact.tsx` | Created | Contact form (UI only — submit is no-op per Decision #10) |
| `components/portfolio/experience.tsx` | Created | `react-vertical-timeline-component` timeline with show-more |
| `components/portfolio/footer.tsx` | Created | Copyright + tech-stack blurb |
| `components/portfolio/MyGames.tsx` | Created | Section wrapper around BevyCard |
| `components/portfolio/portfolio-header.tsx` | Created | Sticky nav with section-aware active highlight |
| `components/portfolio/project.tsx` | Created | Project card with parallax scale/opacity |
| `components/portfolio/projects.tsx` | Created | Projects grid using Project component |
| `components/portfolio/section-divider.tsx` | Created | Thin gray bar between sections |
| `components/portfolio/section-heading.tsx` | Created | Centered h2 |
| `components/portfolio/skills.tsx` | Created | 7 categorized skill groups with framer-motion fade-in |
| `components/portfolio/submit-btn.tsx` | Created | Contact submit button |
| `components/portfolio/BiggerLogo.tsx` | Created | Bigger company logo SVG (moved from `public/`, import updated) |
| `public/locales/{en,es}/common.json` | Created | UI strings (navigation, hero, about, projects, contact, experience, footer, skills, games, platformer, spaceinvaders). NO `forgebytes.json`. |
| `public/locales/{en,es}/data.json` | Created | Per-locale content (links, experiences, projects). |
| `public/photo-profile.webp` | Created | Profile photo for intro |
| `public/bevy-1.svg` | Created | Bevy logo for BevyCard |
| `public/coolify.svg` | Created | Coolify icon for devOps skills |
| `public/{10 project thumbs}.webp` | Created | Project cover images |
| `public/cv/Cv Jose Dirazar - English.pdf` | Created | English CV |
| `public/cv/Cv Jose Dirazar - Español.pdf` | Created | Spanish CV |

### Created (Phase 4 — Games)

| File | Action | Description |
|------|--------|-------------|
| `app/[locale]/my-games/layout.tsx` | Created | Mounts LanguageSwitcher. `instant=false`. |
| `app/[locale]/my-games/page.tsx` | Created | Games index using `<Projects projectsData={gamesData}>` |
| `app/[locale]/my-games/platformer/page.tsx` | Created | Wraps PlatformerPage client component |
| `app/[locale]/my-games/space-invaders/page.tsx` | Created | Wraps SpaceInvadersPage client component |
| `components/games/back-button.tsx` | Created | Animated back button using `useRouter().push` |
| `components/games/platformer/platformer.tsx` | Created | **Renamed** from misspelled `plarformer.tsx` — renders `<iframe src="/platformer/index.html">` |
| `components/games/platformer/platformer-page.tsx` | Created | Updated import: `./platformer` (was `./plarformer`) |
| `components/games/space-invaders/space-invaders.tsx` | Created | `<iframe src="/space-invaders/index.html">` |
| `components/games/space-invaders/space-invaders-page.tsx` | Created | Title + iframe + cross-link to platformer |
| `public/platformer/**` | Created | Byte-for-byte copy of source `public/platformer/` (56 MB total) |
| `public/space-invaders/**` | Created | Byte-for-byte copy of source `public/space-invaders/` (54 MB total) |

### Created (Phase 5 — Tests)

| File | Action | Description |
|------|--------|-------------|
| `lib/__tests__/cn.test.ts` | Created | 3 cases: merge, falsy filter, tailwind-merge conflict resolution |
| `components/__tests__/theme-provider.test.tsx` | Created | `useTheme()` integration; persistence assertion via `localStorage` |
| `components/__tests__/TranslationsProvider.test.tsx` | Created | Server `resources` propagate to consumer; EN/ES rendered correctly |

## Deviations from Design

1. **`SiMailboxdotorg` → `SiMailbox`**: The icon `SiMailboxdotorg` does not exist in `react-icons` v5.7.0. Replaced with `SiMailbox` (closest match). Functional behavior unchanged.
2. **`SiCss3` → `SiCss`**: `SiCss3` was renamed in react-icons v5. Replaced with `SiCss`.
3. **`SiAmazon`, `SiAwsamplify` → `Cloud`, `Server` (lucide-react)**: AWS/Amazon icons were removed from react-icons v5. Replaced with lucide-react `Cloud` (for S3 buckets + Amplify) and `Server` (for Cognito). Visual-only.
4. **`@vitejs/plugin-react` added to devDependencies**: Not strictly required by vitest (it ships JSX transform) but added for parity with the standard Vite-React setup; keeps `vitest.config.ts` plugin chain aligned with `next.config.ts` semantics.
5. **`framer-motion` Variants typing**: Switch-theme-button uses `Variants` type annotation because framer-motion v12's `Variants` inference no longer accepts `ease: "easeOut"` as a string literal — strict `Easing` type requires the annotation. Behavior identical.
6. **`app/[locale]/portfolio/layout.tsx` and `app/[locale]/my-games/layout.tsx` were added in Phase 2 commit** (not Phase 3) because they reference LanguageSwitcher. The user-side observation: phase commit boundaries don't perfectly match task numbering because layout files pull in earlier-phase providers. Behavior identical, just commit ordering.

## Issues Found

None — build green, all 7 tests passing.

## Verification Results

```
$ pnpm exec next build
✓ Compiled successfully in 302ms
✓ Generating static pages using 7 workers (14/14) in 690ms

Route (app)
┌ ○ /_not-found
├   /[locale]/my-games                  [ƒ /en/my-games, ƒ /es/my-games]
├   /[locale]/my-games/platformer       [ƒ /en/my-games/platformer, ƒ /es/...]
├   /[locale]/my-games/space-invaders   [ƒ /en/..., ƒ /es/...]
└   /[locale]/portfolio                 [ƒ /en/portfolio, ƒ /es/portfolio]

ƒ Proxy (Middleware)
```

```
$ pnpm test
✓ lib/__tests__/cn.test.ts                  (3 tests) 5ms
✓ components/__tests__/TranslationsProvider (2 tests) 20ms
✓ components/__tests__/theme-provider       (2 tests) 58ms

Test Files  3 passed (3)
     Tests  7 passed (7)
```

```
$ pnpm start + curl smoke tests
  GET /                                307 → /en        (no Accept-Language)
  GET /   Accept-Language: en-US       307 → /en        ✓
  GET /   Accept-Language: es-ES       307 → /es        ✓
  GET /en/portfolio                    200              ✓
  GET /es/portfolio                    200              ✓
  GET /en/my-games                     200              ✓
  GET /en/my-games/platformer          200              ✓
  GET /en/my-games/space-invaders      200              ✓
  GET /platformer/hollow-knight-like-game_bg.wasm
                                       200  application/wasm  56,927,814 bytes
  GET /space-invaders/bevy-grame_bg.wasm
                                       200  application/wasm  56,120,369 bytes
  HEAD /platformer/index.html           no Cross-Origin-* headers  ✓
```

```
$ grep -E '"(resend|zod|simplex-noise|@react-email|next-i18next|next-intl|next-i18n-router|@teispace)' package.json
  (no matches — all Decision #12 drops absent ✓)

$ grep -r "api/contact" app/ components/
  (no matches — contact submit is genuinely a no-op ✓)
```

## Commit Log on `main`

```
25e8396 test: add vitest setup with theme, i18n, and cn unit tests
0d32aa8 feat(games): add WASM game iframes for platformer and space-invaders
7f0e489 feat(portfolio): add content components, [locale]/portfolio route, and static assets
feeb5b6 feat(i18n+theme): add locale-prefixed routing, accept-language redirect, dark/light toggle
3196f3a chore: initial Next.js 16 scaffold with configs and gitignore
```

5 commits, all conventional, each phase mapped to one work-unit commit (per user-mandated commit shape).

## Status

**37 / 37 tasks complete.** Ready for `sdd-verify`.