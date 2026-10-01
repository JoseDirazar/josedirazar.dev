## Exploration: portfolio-extract

Investigation of the portfolio content embedded inside `/Users/josedirazar/Desktop/forgebyteslab/forgebyteslab.com` to extract everything required to build a standalone Next.js (App Router, TypeScript) portfolio project from scratch. Target destination: `/Users/josedirazar/Desktop/forgebyteslab/portfolio-app/` (openspec scaffolding already present under `openspec/changes/portfolio-extract/`).

### Current State

The source is a Next.js 16.3.0 App Router app with i18n routing via a custom `[locale]` segment (`/en` and `/es`). It hosts two unrelated businesses side-by-side:

- The **forgebyteslab business site** (landing, services, clients, team, contact form, email + Resend API, `/api/contact` route).
- **Jose Dirazar's personal portfolio** (bio, projects, experience, skills, two WASM games) nested at `/[locale]/jose-dirazar/portfolio` and `/[locale]/jose-dirazar/my-games/...`.

Both share the root layout (theme provider, font, Toaster, language switcher) and pull from the same `public/locales/{en,es}/*.json` files. Three translation namespaces exist (`common`, `data`, `forgebytes`) — only `common` and `data` are needed for the portfolio; `forgebytes.json` is business-only and must be left behind.

The portfolio's WASM games work because they are loaded via plain `<iframe src="/<game>/index.html">`, not inlined into the React tree. The `index.html` files live in `public/<game>/` alongside the JS glue (`bevy-grame.js`, `hollow-knight-like-game.js`) and the `.wasm` payloads (~55 MB each, total ~110 MB). No COOP/COEP headers are required because the games run in cross-origin iframes; the parent page never touches the WASM binary.

### Affected Areas

Portfolio code that must move to the new project:

- `app/[locale]/layout.tsx` — root layout (Inter font, theme provider, Toaster, language switcher). Used by portfolio AND business, but the portfolio depends on it.
- `app/[locale]/jose-dirazar/portfolio/{layout.tsx,page.tsx}` — portfolio landing route.
- `app/[locale]/jose-dirazar/my-games/{layout.tsx,page.tsx,platformer/page.tsx,space-invaders/page.tsx}` — games index + each game's iframe page.
- `app/i18n.ts` — server-side `initTranslations()` used by every portfolio page.
- `i18nConfig.ts` (root) — locale list (`["en","es"]`), default `en`.
- `proxy.ts` — root-locale redirect (`/` → `/en` or `/es` based on Accept-Language).
- `components/jose-dirazar/portfolio/*` — `about.tsx`, `BevyCard.tsx`, `contact.tsx`, `experience.tsx`, `footer.tsx`, `intro.tsx`, `MyGames.tsx`, `portfolio-header.tsx`, `project.tsx`, `projects.tsx`, `section-divider.tsx`, `section-heading.tsx`, `skills.tsx`, `submit-btn.tsx`.
- `components/jose-dirazar/games/*` — `back-button.tsx`, `platformer/{plarformer.tsx,platformer-page.tsx}`, `space-invaders/{space-invaders.tsx,space-invaders-page.tsx}`.
- `components/forgebyteslab/common/LanguageSwitcher.tsx` — actual dropdown switcher used by the portfolio layout (NOT the dead `components/LanguageSwitcher.tsx`).
- `components/theme-switch.tsx` + `components/switch-theme-button.tsx` — fixed bottom-right theme toggle.
- `components/TranslationsProvider.tsx` — wraps children with an `I18nextProvider` populated from server-side resources.
- `context/theme-provider.tsx` — `ThemeContextProvider` wrapper around `@teispace/next-themes` (the one actually mounted in the layout).
- `context/active-section-context.tsx` — provider for the active-section state used by the sticky nav and `useSectionInView`.
- `lib/data.ts` — `getTranslatedData()` (links, projects, experiences, games) + skills arrays (`languajes`, `frontendSkills`, `backendSkills`, `databaseSkills`, `devOpsSkills`, `testingSkills`, `integrationSkills`) + `i18nNamespaces = ["common","data","forgebytes"]` constant.
- `lib/hooks.ts` — `useSectionInView(sectionName, threshold)` hook.
- `lib/utils.ts` — `cn()` helper (used by skills and intro).
- `lib/types.ts` — derives `SectionName` from `getTranslatedData(t).links`.
- `public/locales/{en,es}/{common.json,data.json}` — translations (NOT `forgebytes.json`).
- `public/locales/en/forgebytes.json` and `public/locales/es/forgebytes.json` — leave behind.
- `public/photo-profile.webp`, `public/BiggerLogo.tsx`, `public/bevy-1.svg`, `public/coolify.svg` — portfolio-only static assets.
- `public/cv/Cv Jose Dirazar - English.pdf` and `public/cv/Cv Jose Dirazar - Español.pdf` — portfolio CVs (the certificate `.pdf` is portfolio too but not linked).
- `public/platformer/**` (56 MB) and `public/space-invaders/**` (54 MB) — full game bundles including the .wasm files, JS glue, and asset folders.
- `public/BelliDeportes.webp`, `public/multicuotas-tandil.webp`, `public/tu-bienestar.webp`, `public/padelink.webp`, `public/forgebyteslab.webp`, `public/Workitfy.webp`, `public/space-invaders.webp`, `public/deaca-olavarria.webp`, `public/pawdlink.webp`, `public/platformer.webp` — referenced by `lib/data.ts` for `projectsData` and `gamesData`.
- `public/assets/fonts/**` (NuevaStd, Orbitron, Montserrat, Josefin_Sans, Lobster, nasalization) — defined as `@font-face` in `app/index.css` under the `--font-*` theme tokens. Used by the landing page only; the portfolio does not reference them but the root layout imports `app/index.css`, so dropping the @font-face block breaks the global CSS without breaking the portfolio visually. Decide whether to drop them in the new project.
- `app/index.css` — Tailwind v4 entry + OKLCH tokens (`:root` and `.dark` blocks) + custom `@theme` + `.theme-experience` rules for the timeline component + the `#space-invaders` and `#coolify` styling.
- `next.config.js` — only `images.formats`, `images.qualities`, `images.remotePatterns` (LinkedIn media host), and `cacheComponents: true`. NO COEP/COOP, NO `experimental.asyncWebAssembly`, NO wasm headers. The LinkedIn remote pattern is only used by the forgebyteslab business team section; safe to drop from the new project.

Out of scope (business-only — do NOT bring across):

- `app/[locale]/page.tsx`, `app/[locale]/services/page.tsx` — landing and services routes.
- `app/api/contact/route.ts`, `email/contact-form-email.tsx`, `lib/validations/contact.ts`, `app/api/contact/*`.
- All of `components/forgebyteslab/**` except `common/LanguageSwitcher.tsx`.
- All of `components/ui/wavy-background.tsx` (used by `HeroSection`).
- `lib/forgebyteslab/index.tsx` (team + clients data).
- `public/forgebyteslab/**`, `public/BiggerLogo.tsx` is portfolio-only but the rest of that folder is business.
- `public/assets/landing/**`, `public/{web,iphone,coolify}.svg` (landing visuals — `coolify.svg` is referenced by skills.tsx via `devOpsSkills`, so it is portfolio-relevant — KEEP).
- `public/locales/{en,es}/forgebytes.json`.
- All `.env` values (only `RESEND_API_KEY`; not needed because contact form is being commented out).

Dead code to ignore when copying (it lives in the repo but the portfolio does not use it):

- `components/LanguageChanger.tsx`, `components/LanguageProvider.tsx`, `components/LanguageSwitcher.tsx`, `components/TranslatedImage.tsx` — the top-level `/components/` i18n files use `next-i18next` and are NOT wired into any portfolio route.
- `lib/i18n.ts` — alternate `initTranslations()` that is imported nowhere in the portfolio tree.
- `lib/cn.ts` — duplicates `lib/utils.ts`.
- `lib/i18nConfig.ts` (under `lib/`) — alternate config; the active one is `i18nConfig.ts` at the repo root.
- `next-i18next.config.js` — only relevant if using `next-i18next`, which the portfolio does NOT (it uses `react-i18next` directly via the custom `app/i18n.ts`).
- `components/LanguageProvider.tsx` (only consumed by the language switcher dead code).
- `components/TranslatedImage.tsx` (same).
- `context/theme-context.tsx` — custom React context for dark mode that is NOT mounted anywhere; the active provider is `context/theme-provider.tsx` which wraps `@teispace/next-themes`.

### Approaches

Not applicable here — this is an investigation/exploration phase. The next phase (`sdd-propose`) will pick the concrete scaffolding approach (likely: copy-paste the relevant files into a fresh Next.js project initialized with `create-next-app`, then prune).

### Recommendation

When moving into proposal/design, the new project should:

1. Initialize with `create-next-app` (App Router, TypeScript, ESLint, Tailwind v4, no `src/` dir, `@/*` alias) at `/Users/josedirazar/Desktop/forgebyteslab/portfolio-app/`.
2. Add the exact dependency set used by the portfolio: `i18next`, `react-i18next`, `i18next-resources-to-backend`, `@formatjs/intl-localematcher`, `negotiator`, `@types/negotiator`, `framer-motion`, `motion`, `react-icons`, `react-intersection-observer`, `react-vertical-timeline-component`, `@types/react-vertical-timeline-component`, `@teispace/next-themes`, `lucide-react`, `tailwind-merge`, `clsx`, `class-variance-authority`, `tw-animate-css`, `@tailwindcss/postcss`, `tailwindcss`, `react-hot-toast`. Skip `next-i18next`, `next-i18n-router`, `next-intl`, `@react-email/*`, `resend`, `simplex-noise`, `zod`, `tw-animate-css` only if not used.
3. Adopt the same layout/i18n/theme/i18n-routing pattern (see "Reproduction recipe" below).
4. Drop the `forgebytes.json` namespace and the `forgebytes` namespace entry from `i18nNamespaces` (should become `["common", "data"]`).
5. Keep the WASM game folders intact — they work because of the `<iframe>` pattern, not because of any Next.js config. Copy `public/platformer/**` and `public/space-invaders/**` byte-for-byte (~110 MB).

### WASM Reproduction Recipe (the critical part)

The games work in production today because of the following — copy VERBATIM:

1. **HTML wrapper** (`public/platformer/index.html`, `public/space-invaders/index.html`):

```html
<div
  style="
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: full;
    background-color: transparent;
  "
  id="space-invaders"
>
  <script type="module">
    import init from "./hollow-knight-like-game.js";  // platformer
    // OR: import init from "./bevy-grame.js";           // space-invaders
    init();
  </script>
  <!-- <canvas id="bevy"></canvas> -->
</div>
```

2. **JS glue** is generated by `wasm-bindgen`. The exact files are:
   - `public/platformer/hollow-knight-like-game.js` (102 KB) + `.d.ts`
   - `public/platformer/hollow-knight-like-game_bg.wasm` (55 MB) + `.wasm.d.ts`
   - `public/space-invaders/bevy-grame.js` (102 KB) + `.d.ts`
   - `public/space-invaders/bevy-grame_bg.wasm` (55 MB) + `.wasm.d.ts`

   The glue resolves the WASM via `new URL('bevy-grame_bg.wasm', import.meta.url)`. **The `.wasm` must live next to the `.js` in `public/`** — paths are relative, so any layout change breaks the loader. The glue uses `WebAssembly.instantiateStreaming` and falls back to `WebAssembly.instantiate` only when the server returns a non-`application/wasm` Content-Type (line 296-297 of `bevy-grame.js`). No special MIME configuration is required for the new project because Next.js serves `public/*.wasm` with the correct MIME in production.

3. **Game assets** (`public/platformer/assets/**`, `public/space-invaders/assets/**`) are loaded by the WASM at runtime. Do not rename folders or strip files. Notable sizes:
   - `public/platformer/assets/hero/` — 8 PNG sprite sheets (Attack1, Attack2, Death, Fall, Hurt, Idle, Jump, Run).
   - `public/platformer/assets/enemy/skeleton/` — 9 PNG sprite sheets.
   - `public/platformer/assets/world/levels/1/` — level tilemaps.
   - `public/platformer/assets/fonts/` — FiraSans-Bold.ttf + FiraSans.ttf (loaded by the WASM for in-game text).
   - `public/space-invaders/assets/` — alien.png, bullet.png, player.png.

4. **iframe mount** in React (`components/jose-dirazar/games/{platformer,space-invaders}/{plarformer,space-invaders}.tsx`):

```tsx
// platformer (plarformer.tsx — note: file is misspelled in source)
<iframe
  ref={gameRef}
  src="/platformer/index.html"
  className="flex h-[793px] w-[1040px] items-center justify-center rounded-md bg-white dark:bg-black"
/>

// space-invaders (space-invaders.tsx)
<iframe
  ref={gameRef}
  src="/space-invaders/index.html"
  className="flex h-[530px] w-[530px] items-center justify-center rounded-md bg-white dark:bg-black"
/>
```

5. **No COOP/COEP needed**. Confirmed by reading `next.config.js` and `proxy.ts` — neither sets `Cross-Origin-Embedder-Policy` or `Cross-Origin-Opener-Policy`. The iframe is same-origin (it loads `/platformer/index.html` from the same host), so SharedArrayBuffer is not required and the games do not need threading.

6. **No webpack/turbopack config needed**. Confirmed by `next.config.js` — no `experimental.asyncWebAssembly`, no `webpack` override, no custom loaders.

7. **Filename typo to preserve or fix**: `components/jose-dirazar/games/platformer/plarformer.tsx` (misspelled "platformer"). Either keep the misspelling to preserve the existing import graph or rename during the move.

### i18n Reproduction Recipe

1. **Locales**: `en` (default), `es`.
2. **Routing**: App Router segment `[locale]` at the second URL position (`/en/...`, `/es/...`). The first segment is the locale.
3. **Server-side init** (`app/i18n.ts`) — creates a fresh i18next instance per request with `resourcesToBackend` lazy-loading `@/public/locales/${language}/${namespace}.json`:

```ts
import { createInstance, i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "@/i18nConfig";

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: I18nInstance,
  resources?: any,
) {
  i18nInstance = i18nInstance || createInstance();
  i18nInstance.use(initReactI18next);
  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/public/locales/${language}/${namespace}.json`),
      ),
    );
  }
  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });
  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
}
```

4. **Client provider** (`components/TranslationsProvider.tsx`) — every page wraps its content in this provider, passing pre-loaded `resources` from the server so the client does not re-fetch on hydration.

5. **Language switcher** — the portfolio uses `components/forgebyteslab/common/LanguageSwitcher.tsx` (NOT the top-level `components/LanguageSwitcher.tsx`). It is a custom dropdown that swaps the locale segment in `usePathname()` and navigates to `/${newLocale}/${rest}` via `<Link>`.

6. **Proxy** (`proxy.ts`) — minimal matcher for `/` that 302-redirects to `/en` or `/es` based on the `Accept-Language` header. Locale-prefixed paths are not affected.

7. **Namespaces needed for portfolio**: `common` (UI strings: navigation, hero, about, projects, contact, experience, footer, skills, games, platformer, spaceinvaders) and `data` (per-locale content: links, experiences, projects descriptions). `forgebytes.json` is business-only.

8. **Translation file shape** — common.json: top-level keys `navigation`, `hero`, `about`, `projects`, `spaceinvaders`, `platformer`, `games`, `contact`, `experience`, `footer`, `skills`. data.json: top-level keys `links`, `experiences.{slug}.{title,location,date,description}`, `projects.{slug}.{title,description}`.

### Theme Reproduction Recipe

1. **Library**: `@teispace/next-themes` (a drop-in fork of `next-themes`). Pinned at `^2.0.4`.
2. **Provider** (`context/theme-provider.tsx`):

```tsx
"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "@teispace/next-themes";
export function ThemeContextProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

3. **Mount** (in `app/[locale]/layout.tsx`):

```tsx
<ThemeContextProvider attribute="class" defaultTheme="system" enableSystem>
  {/* ... */}
</ThemeContextProvider>
```

4. **Toggle** (`components/theme-switch.tsx` + `components/switch-theme-button.tsx`) — fixed `bottom-5 right-5`, framer-motion animated sun/moon SVG, uses `useTheme().resolvedTheme` from `@teispace/next-themes`, guarded by a `mounted` flag to avoid hydration mismatch.
5. **CSS strategy**: Tailwind v4 `dark:` variant driven by `.dark` class on `<html>` (declared in `app/index.css` via `@custom-variant dark (&:where(.dark, .dark *));`). Color tokens are OKLCH-based shadcn-style vars in `:root` and `.dark`. Custom tokens for portfolio colors live in the first `@theme` block (`--color-primary`, `--color-secondary`, plus 6 custom font family tokens).
6. **Persistence**: `next-themes` uses `localStorage` automatically (key: `theme`).
7. **`context/theme-context.tsx` is dead code** — it implements a parallel custom dark-mode context that is never mounted. Do not bring it across.

### Data Inventory (verbatim locations)

| Content | Location | Shape |
|---------|----------|-------|
| Hero copy (greeting, role, status, recent, building, sites, focus, mobile) | `public/locales/{en,es}/common.json` → `hero.*` | strings |
| About copy (education, passion, etc.) | `public/locales/{en,es}/common.json` → `about.*` | strings |
| Experience entries (6 jobs) | `public/locales/{en,es}/data.json` → `experiences.{deaca,forgebytes,biggertech,mayland,henry,freecodecamp}` | object `{title,location,date,description}` |
| Experience icons + URLs | `lib/data.ts` → `getTranslatedData().experiencesData` | inline JSX (`CgWorkAlt`, `LuGraduationCap`) + hardcoded URLs |
| Project entries (8 projects) | `public/locales/{en,es}/data.json` → `projects.{pawdlink,deaca,spaceinvaders,forgebytes,tubienestar,padelink,workitfy,multicuotas,bellideportes}` | object `{title,description}` |
| Project tags, imageUrl, url | `lib/data.ts` → `getTranslatedData().projectsData` | inline `tags: string[]`, `imageUrl: StaticImageData` (imported from `public/*.webp`), hardcoded URLs |
| Games entries (2 games) | `public/locales/{en,es}/common.json` → `spaceinvaders.*` and `platformer.*` + `lib/data.ts` → `getTranslatedData().gamesData` | strings for i18n; tags/imageUrl/url inline |
| Skills (languages/frontend/backend/database/devops/testing/integrations) | `lib/data.ts` → `languajes`, `frontendSkills`, `backendSkills`, `databaseSkills`, `devOpsSkills`, `testingSkills`, `integrationSkills` | inline arrays of `{title, icon: ReactNode}` |
| Nav links (Home, About, Projects, Skills, Experience, Contact) | `public/locales/{en,es}/data.json` → `links.*` | strings with hardcoded `#hash` in `lib/data.ts` |
| Skills section labels | `public/locales/{en,es}/common.json` → `skills.*` | strings |
| Contact copy (title, direct, or, success, error, email, message) | `public/locales/{en,es}/common.json` → `contact.*` | strings |
| Contact email | Hardcoded `jfdirazar@gmail.com` in `components/jose-dirazar/portfolio/contact.tsx` + `app/api/contact/route.ts` | string literal |
| Social links | Hardcoded in `components/jose-dirazar/portfolio/intro.tsx` → `linkedin.com/in/jose-dirazar-a6b927236/`, `github.com/JoseDirazar` | strings |
| CV PDF path | `components/jose-dirazar/portfolio/intro.tsx` chooses between `/cv/Cv Jose Dirazar - Español.pdf` and `/cv/Cv Jose Dirazar - English.pdf` based on `pathname.split("/").includes("es")` | conditional |
| Profile photo | `/photo-profile.webp` (used by `intro.tsx`) | image asset |
| Bigger logo | `public/BiggerLogo.tsx` (inline SVG component that takes a `theme` prop and recolors) | imported from `@/public/BiggerLogo` |
| Bevy logo | `/bevy-1.svg` (used by `BevyCard.tsx`) | image asset |

### Conventions

1. **TypeScript**: `strict: true`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `@/*` path alias mapped to `./*`, `target: es5` (legacy default).
2. **ESLint**: `eslint-config-next/core-web-vitals` via flat config (`eslint.config.mjs`); legacy `.eslintrc.json` is also present and is redundant.
3. **Prettier**: just enables `prettier-plugin-tailwindcss` with `tailwindStylesheet: "./app/index.css"`.
4. **Naming**: portfolio components live under `components/jose-dirazar/portfolio/` and `components/jose-dirazar/games/`. Business components live under `components/forgebyteslab/`. Generic shared (LanguageSwitcher, theme, i18n provider) live at `components/` root.
5. **File conventions**:
   - Server Components are async, take `params: Promise<{locale: string}>`.
   - Client Components opt in via `"use client"`.
   - Every page calls `initTranslations(locale, i18nNamespaces)` and passes `resources` into `<TranslationsProvider>`.
   - Every page declares `export const instant = false` to opt out of Cache Components (Next.js 16 specific).
6. **Styling**: Tailwind v4 utility-first + OKLCH CSS vars for theme + `tw-animate-css` for shadcn animations. Class merge via `tailwind-merge` + `clsx` through `cn()` in `lib/utils.ts`. shadcn theme tokens live in the `@theme inline` block in `app/index.css`.
7. **Fonts**: `Inter` from `next/font/google` is applied to `<body>` in the root layout. The custom fonts (Lobster, Orbitron, Monserrat Italic, Josefin Sans, Nueva Std, Nasalization) are loaded via `@font-face` from `/assets/fonts/...` and exposed as `--font-*` tokens; only the business landing page uses them — the portfolio does not.
8. **Dependencies**: pnpm with extensive `pnpm.overrides` block in `package.json` to force patched versions of transitive deps (postcss, brace-expansion, picomatch, next-intl). Most overrides are not relevant to the portfolio.

### Risks

1. **WASM bundle size**: copying `public/platformer/**` (56 MB) and `public/space-invaders/**` (54 MB) into the new project will balloon the repo and slow down `pnpm install` / Git clones. They MUST be included for the games to work — there is no CDN fallback. Plan for hosting bandwidth.
2. **WASM loader is brittle**: the JS glue uses `import.meta.url` to resolve the relative `.wasm` path. Any rename, folder move, or sub-path serving change will break the loader with no build error — it will just fail at runtime in the iframe. The new project must keep these files at exactly `/platformer/` and `/space-invaders/` under `public/`.
3. **Filename typo**: `plarformer.tsx` (missing 't') is misspelled. The new project should rename it to `platformer.tsx` to avoid propagating the typo.
4. **Mixed i18n conventions in source**: the repo has FOUR overlapping i18n setups (`next-i18next`, `next-i18n-router`, `next-intl`, the custom `react-i18next` via `app/i18n.ts`). Only the custom `react-i18next` setup is what the portfolio uses. The new project must drop the others and avoid installing them — bring only `i18next`, `react-i18next`, `i18next-resources-to-backend`, `@formatjs/intl-localematcher`, `negotiator`.
5. **Dead `context/theme-context.tsx`**: a custom dark-mode context exists but is never mounted. Easy to mistakenly copy + mount it; do NOT.
6. **`@teispace/next-themes` is a fork**: not the official `next-themes`. If the official one is preferred for the new project, the API is identical (`<ThemeProvider attribute="class" defaultTheme="system" enableSystem>` + `useTheme().resolvedTheme`) but the import path changes to `next-themes`. Verify before locking.
7. **`BiggerLogo.tsx` import path**: the intro imports `BiggerLogo` from `@/public/BiggerLogo`. While `public/` is normally a static-only folder, Next.js's `@/*` alias resolves `.tsx` files there. The new project should either copy this file to `components/portfolio/` and update the import, or keep the import and document the oddity.
8. **`exports const instant = false`**: every portfolio page declares this to opt out of Cache Components. If the new project is on Next.js >=16, keep this. On older Next.js versions, the export is a no-op.
9. **LinkedIn remote image pattern**: `next.config.js` whitelists `media.licdn.com`. The portfolio does not render any LinkedIn images — drop this from the new config.
10. **`projectsData` image imports**: `lib/data.ts` imports `StaticImageData` from `@/public/*.webp`. The new project must keep these images in `public/` with the same filenames (or rewrite the imports).
11. **`CV` download conditional**: `intro.tsx` decides the CV language based on `pathname.split("/").includes("es")`. If the new project uses a different locale segment (e.g., subpath), this check needs adjusting.
12. **`BevyCard.tsx` references `/bevy-1.svg`**: there is no `/bevy-1.svg` outside the portfolio — verified by `ls public/`. This asset must be copied.
13. **Tailwind v4 + shadcn theme vars**: the `app/index.css` mixes Tailwind v4 syntax (`@import "tailwindcss"; @theme { ... }`) with shadcn's CSS-var-driven theming. The `.theme-experience` block is custom CSS for the `react-vertical-timeline-component` styling and must be preserved.
14. **`react-vertical-timeline-component/style.min.css` is imported globally** by `experience.tsx`. The new project must include this side-effect import; the package is not tree-shakeable for styles.
15. **No tests**: the source repo has zero tests. The new project inherits this gap unless we add tests during the apply phase.
16. **`cookie` and `RESEND_API_KEY`**: contact form is "commented out" but `lib/validations/contact.ts` imports `zod` and `app/api/contact/route.ts` imports `resend`. The `.env` file contains a placeholder API key (`sdjknfj`). The new project can safely skip both the API route, the email template, and `resend`/`zod` deps — and drop the `.env`.
17. **`portfolio/` sibling directory is poison**: the user explicitly flagged it. The new project lives at `portfolio-app/`, NOT `portfolio/`. Existing tooling/scripts may have hardcoded paths to `portfolio/` — verify before running anything that touches the file system.
18. **`i18nNamespaces` constant**: includes `forgebytes` namespace which is business-only. The new project must redefine this as `["common", "data"]`.
