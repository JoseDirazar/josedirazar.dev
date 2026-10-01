# Tasks: portfolio-extract

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated lines | 1500–2500 text + ~110 MB binary |
| 400-line risk | High |
| Chained PRs | Yes |
| Split | PR 1 → PR 2 → PR 3 → PR 4 → PR 5 |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

## Phase 1: Scaffold + Foundation

- [x] 1.1 `pnpm create next-app portfolio-app` (App Router, TS, Tailwind v4, ESLint flat, `@/*`, no `src/`)
- [x] 1.2 Add runtime deps per exploration §Rec step 2 minus drops
- [x] 1.3 Add dev deps: `vitest`, `@testing-library/{react,jest-dom,user-event}`, `jsdom`, `@vitest/coverage-v8`
- [x] 1.4 Create `vitest.config.ts` + `vitest.setup.ts` (jsdom, jest-dom)
- [x] 1.5 Replace `app/layout.tsx` shell with `Inter` via `next/font/google`

## Phase 2: i18n + Theme + Shared

- [x] 2.1 Create `app/i18n.ts` with `initTranslations()` using `i18next-resources-to-backend`
- [x] 2.2 Create `i18nConfig.ts` (`locales=["en","es"]`, `defaultLocale="en"`)
- [x] 2.3 Create `proxy.ts` matching `/` → 302 by `Accept-Language`
- [x] 2.4 Create `components/TranslationsProvider.tsx` wrapping `I18nextProvider`
- [x] 2.5 Create `components/LanguageSwitcher.tsx` swapping `usePathname()` segment
- [x] 2.6 Create `context/theme-provider.tsx` wrapping `next-themes`
- [x] 2.7 Create `components/theme-switch.tsx` + `switch-theme-button.tsx` (`bottom-5 right-5`, `mounted` guard)
- [x] 2.8 Create `lib/utils.ts` (`cn()`) + `lib/types.ts` (`SectionName`)

## Phase 3: Portfolio Content

- [x] 3.1 Create `lib/data.ts`: `getTranslatedData()`, skills arrays, `i18nNamespaces=["common","data"]`
- [x] 3.2 Create `lib/hooks.ts` (`useSectionInView`) + `context/active-section-context.tsx`
- [x] 3.3 Create 14 `components/portfolio/*.tsx` (about, BevyCard, contact, experience, footer, intro, MyGames, portfolio-header, project, projects, section-divider, section-heading, skills, submit-btn)
- [x] 3.4 Move `BiggerLogo.tsx` → `components/portfolio/`; fix `intro.tsx` import
- [x] 3.5 Create `app/[locale]/layout.tsx` (Inter, ThemeContextProvider, Toaster, LanguageSwitcher)
- [x] 3.6 Create `app/[locale]/portfolio/{layout.tsx,page.tsx}` (`export const instant=false`)
- [x] 3.7 Copy `public/locales/{en,es}/{common,data}.json` (NO `forgebytes.json`)
- [x] 3.8 Copy `public/{photo-profile.webp,bevy-1.svg,coolify.svg,10 thumbs}.webp` + `public/cv/{English,Español}.pdf`
- [x] 3.9 Create `app/index.css`: Tailwind v4 + OKLCH `:root`/`.dark` + `@theme inline` + `.theme-experience` (NO `@font-face`)

## Phase 4: Games

- [x] 4.1 Create `app/[locale]/my-games/{layout.tsx,page.tsx,platformer/page.tsx,space-invaders/page.tsx}`
- [x] 4.2 Create `components/games/back-button.tsx`
- [x] 4.3 Create `components/games/platformer/{platformer.tsx,platformer-page.tsx}` (rename from misspelled `plarformer.tsx`)
- [x] 4.4 Create `components/games/space-invaders/{space-invaders.tsx,space-invaders-page.tsx}`
- [x] 4.5 Copy `public/platformer/**` (~56 MB); `.js`+`.wasm+assets co-located
- [x] 4.6 Copy `public/space-invaders/**` (~54 MB); `.js`+`.wasm+assets co-located
- [x] 4.7 Verify each `*_bg.wasm` sits next to its `.js` glue (games §WASM Co-location)
- [x] 4.8 Create minimal `next.config.ts` (NO LinkedIn, NO COOP/COEP, NO wasm overrides)

## Phase 5: Testing + Verification

- [x] 5.1 `lib/__tests__/cn.test.ts` — 3 cases incl. conflict resolution
- [x] 5.2 `components/__tests__/theme-provider.test.tsx` — `useTheme()` + `localStorage`
- [x] 5.3 `components/__tests__/TranslationsProvider.test.tsx` — keys resolve from server `resources` (i18n §Server-Side Translation Loading)
- [x] 5.4 Manual: `/` 302 per `Accept-Language` (i18n §Root Locale Redirect)
- [x] 5.5 Manual: contact submit no-op, no network (portfolio-content §Contact UI Only)
- [x] 5.6 `pnpm build && pnpm start`; both games playable in production (games §Production Build Playability)
- [x] 5.7 `package.json` excludes `resend`, `zod`, `simplex-noise`, `@react-email/*`, `next-i18next`, `next-intl`, `next-i18n-router`, `@teispace/next-themes`