# Design: portfolio-extract

## Technical Approach

Scaffold Next.js 16 App Router at `portfolio-app/`, copy the portfolio subset of `forgebyteslab.com` byte-for-byte per exploration i18n / theme / WASM recipes, prune business code, swap theme fork for official `next-themes`, drop contact API + unused deps, wire Vitest for smoke coverage.

## Architecture Decisions

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Theme library | Official `next-themes` | Fork unmaintained; identical API (prop. Dec. 1). |
| 2 | Component layout | `components/portfolio/` + `components/games/` | Portfolio-only project; drop `jose-dirazar` namespace. |
| 3 | BiggerLogo location | `components/portfolio/BiggerLogo.tsx` | `public/` is static-only (prop. Dec. 3). |
| 4 | Typo fix | `plarformer.tsx` → `platformer.tsx` | Single import; fix once (prop. Dec. 2). |
| 5 | i18n engine | `react-i18next` + `[locale]` segment | Only one wired into portfolio (prop. Dec. 5). |
| 6 | Unknown-locale | `fallbackLng: i18nConfig.defaultLocale` in `app/i18n.ts` | i18next resolves to `en`; no route layer. |
| 7 | Dark mode | `next-themes` `attribute="class"` + Tailwind v4 `@custom-variant dark` | Exploration §theme recipe; no hydration flash. |
| 8 | WASM delivery | iframe → `public/<game>/index.html`; `new URL('xxx_bg.wasm', import.meta.url)` | Source runs this way; byte-for-byte is safe path. |
| 9 | WASM Next config | None — no wasm override, no COOP/COEP | Verified in source `next.config.js`. |
| 10 | Contact form | Render UI; submit no-op | Email deps dropped (prop. Dec. 6); spec forbids submit. |
| 11 | Tests | Vitest + Testing Library + jsdom (smoke) | No prior tests; gate theme + i18n regressions. |
| 12 | Dropped deps | `resend`, `zod`, `simplex-noise`, `@react-email/*`, `next-i18next`, `next-intl`, `next-i18n-router`, `@teispace/next-themes` | None imported by portfolio code paths. |
| 13 | Dropped assets/config | `@font-face` (Lobster/Orbitron/Monserrat/Josefin/NuevaStd/Nasalization) + `public/assets/fonts/**`; LinkedIn `images.remotePatterns` | Portfolio refs neither (prop. Dec. 4, 7). |

## Data Flow

```
Browser → proxy.ts (/) → /en | /es (Accept-Language)
   │
   ▼
app/[locale]/layout.tsx ── ThemeContextProvider (next-themes)
   │
   ▼
app/[locale]/portfolio/page.tsx
├─ initTranslations(locale, ["common","data"])   // server
├─ <TranslationsProvider resources={resources}>
└─ LanguageSwitcher swaps pathname segment
   │
   ▼
app/[locale]/my-games/{platformer,space-invaders}/page.tsx
└─ <iframe src="/<game>/index.html">
   ▼
public/<game>/<glue>.js ─fetch──▶ <glue>_bg.wasm   (co-location rule)
```

## File Changes

All paths under `portfolio-app/`; source `forgebyteslab.com/` is read-only.

| File | Action | Description |
|---|---|---|
| `app/{index.css, i18n.ts}` + `{i18nConfig,proxy}.ts` | Create | Tailwind v4 + OKLCH `:root`/`.dark` + `@theme` + `.theme-experience` (**no `@font-face`**); `initTranslations()`; `locales=["en","es"]`; `/` → 302 by `Accept-Language`. |
| `app/[locale]/layout.tsx` + `portfolio/{layout,page}.tsx` + `my-games/{layout,page,platformer/page,space-invaders/page}.tsx` | Create | Root layout (Inter, `<ThemeContextProvider ... enableSystem>`, Toaster, LanguageSwitcher); portfolio landing (`export const instant=false`); games index + wrappers. |
| `components/portfolio/*.tsx` (15) | Create | `about, BevyCard, contact, experience, footer, intro, MyGames, portfolio-header, project, projects, section-divider, section-heading, skills, submit-btn, BiggerLogo`. |
| `components/games/**/*.tsx` (5) | Create | `back-button`; `platformer/platformer` (renamed from `plarformer`); `platformer-page` (import updated); `space-invaders/space-invaders`, `space-invaders-page`. |
| `components/{LanguageSwitcher,TranslationsProvider,theme-switch,switch-theme-button}.tsx` + `context/{theme-provider,active-section-context}.tsx` | Create | Switcher swaps `usePathname()` segment; toggle fixed `bottom-5 right-5` w/ `mounted` guard; **official** `next-themes` wrapper; section state. |
| `lib/{data,hooks,utils,types}.ts` | Create | `getTranslatedData`, `useSectionInView`, `cn()`, `SectionName`. **`i18nNamespaces=["common","data"]`** (forgebytes dropped). |
| `public/locales/{en,es}/{common,data}.json` + `public/{cv/*.pdf, photo-profile.webp, bevy-1.svg, coolify.svg, 10 thumbnails}.webp` | Create | 2 namespaces × 2 locales (**no `forgebytes.json`**); CVs + static refs. |
| `public/platformer/**` + `public/space-invaders/**` | Create | Byte-for-byte (~110 MB). **WASM co-location rule: `*_bg.wasm` MUST stay next to its `.js` in the same folder.** |
| `next.config.ts` | Create | Minimal. **No LinkedIn remotePatterns. No COOP/COEP. No wasm overrides.** |
| `package.json` + `tsconfig.json` + `vitest.{config,setup}.ts` | Create+Modify | Next 16 / React 19 / Tailwind v4. Runtime deps per exploration §Recommendation step 2 — `next-themes` official replaces `@teispace/next-themes`. **Drop** per Decision #12. Dev: `vitest, @testing-library/{react,jest-dom,user-event}, jsdom, @vitest/coverage-v8`. |
| `lib/__tests__/cn.test.ts` + `components/__tests__/{TranslationsProvider,theme-provider}.test.tsx` | Create | Unit: `cn()` merge order. Integration: provider hydrates w/ server resources; `useTheme()` resolves + persists to `localStorage`. |

## Interfaces / Contracts

```ts
// app/i18n.ts
export default async function initTranslations(
  locale: string, namespaces: string[],
  i18nInstance?: I18nInstance, resources?: Record<string, unknown>,
): Promise<{ i18n: I18nInstance; resources: Record<string, unknown>; t: TFunction }>;

// lib/data.ts
export const i18nNamespaces = ["common", "data"] as const;
export function getTranslatedData(t: TFunction): {
  linksData: Record<string, string>;
  experiencesData: Experience[]; projectsData: Project[]; gamesData: Game[];
};
```

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | `cn()` merge order | 3 cases incl. conflict resolution. |
| Integration | Theme provider applies class + persists | Render, assert `class`, reload mock, assert `localStorage.theme`. |
| Integration | `TranslationsProvider` resolves keys | Render w/ `resources={en:{...}}`, assert translated text. |
| E2E (smoke) | `/en` + `/es` render; switcher; WASM iframe loads | Manual or Playwright scaffold in follow-up. |

## Migration / Rollout

No migration. Source is read-only. Rollback = `rm -rf portfolio-app/`.

## Open Questions

None blocking. Expand Vitest if `sdd-verify` flags coverage gaps.
