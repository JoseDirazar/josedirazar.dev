# Archive Report: portfolio-extract

## Change Identity

| Field | Value |
|-------|-------|
| Change name | `portfolio-extract` |
| Archived on | 2026-09-30 |
| Archived to | `openspec/changes/archive/2026-09-30-portfolio-extract/` |
| Archive mode | openspec (filesystem) |
| Project | `portfolio-app` (`/Users/josedirazar/Desktop/forgebyteslab/portfolio-app`) |

## Verification Note

`/sdd-verify` was **skipped per explicit user choice**. There is no `verify-report.md` for this change. Self-verification is recorded in `apply-progress.md`, which is the verification record for archive purposes:

- Build: `pnpm exec next build` → compiled successfully, 14/14 static pages, no errors.
- Tests: `pnpm test` → 7/7 passing (3 test files: `cn`, `theme-provider`, `TranslationsProvider`).
- Smoke (production server): `/` 307-redirects to `/en` or `/es` per `Accept-Language`; both locales render portfolio + games routes; both WASM binaries served as `200 application/wasm` with correct byte counts (platformer: 56,927,814 bytes; space-invaders: 56,120,369 bytes); no COOP/COEP headers.
- Forbidden-deps audit: `grep` on `package.json` for `resend|zod|simplex-noise|@react-email|next-i18next|next-intl|next-i18n-router|@teispace` → 0 matches.
- Contact-submit audit: `grep -r "api/contact" app/ components/` → 0 matches.

No CRITICAL issues to gate on. Proceeding with archive.

## Specs Synced (NEW → main specs)

All 4 specs in `openspec/changes/portfolio-extract/specs/` were **NEW capabilities** (no pre-existing main spec to delta against). Each was copied verbatim from the change folder to `openspec/specs/`.

| Domain | Action | Requirements | Path |
|--------|--------|--------------|------|
| `portfolio-content` | Created | 9 | `openspec/specs/portfolio-content/spec.md` |
| `i18n` | Created | 6 | `openspec/specs/i18n/spec.md` |
| `theme` | Created | 6 | `openspec/specs/theme/spec.md` |
| `games` | Created | 7 | `openspec/specs/games/spec.md` |

**Total**: 28 new requirements, all marked `MUST`/`SHALL` per RFC 2119, each with at least one Given/When/Then scenario.

`diff -r` confirmed zero drift between source-of-truth (change `specs/`) and target (`openspec/specs/`).

## Source of Truth Updated

The following specs now define the source-of-truth behavior for the portfolio app:

- `openspec/specs/portfolio-content/spec.md` — Hero, about, projects, experience, skills, contact (UI-only), CV download (locale-aware), sticky nav, social links.
- `openspec/specs/i18n/spec.md` — `[locale]`-prefixed routes, `/` Accept-Language redirect, language switcher (path-preserving), translation resources (`common` + `data` namespaces), server-side translation loading, unknown-locale fallback.
- `openspec/specs/theme/spec.md` — 3-mode toggle (light/dark/system), `localStorage` persistence, system default on first visit, fixed bottom-right position, hydration safety, class-based dark mode.
- `openspec/specs/games/spec.md` — Two game routes reachable from index, iframe mount to `public/<game>/index.html`, WASM/glue co-location, production-build playability, no COOP/COEP required, wrapper-only theming, per-game back navigation.

## What Was Built

Brief summary — full details in `apply-progress.md` in this archive folder.

Scaffolded Next.js 16 App Router project at `portfolio-app/` (TS, Tailwind v4, ESLint flat, `@/*` alias, no `src/`). Copied the portfolio subset of `forgebyteslab.com` byte-for-byte: routes, components, contexts, hooks, libs, EN/ES translations, static assets, and ~110 MB of WASM game bundles. Pruned business-only code (`forgebytes` namespace, contact API, Resend/Zod/simplex-noise/@react-email/next-i18next/next-intl/next-i18n-router deps, `@font-face` declarations, LinkedIn remotePatterns). Swapped the unmaintained `@teispace/next-themes` fork for the official `next-themes` package. Fixed the `plarformer.tsx` → `platformer.tsx` typo. Wired Vitest + Testing Library + jsdom with 7 passing tests covering `cn()`, theme persistence, and `TranslationsProvider` server-resource propagation.

### Phase Completion

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Scaffold + Foundation | 5/5 | ✅ |
| Phase 2: i18n + Theme + Shared | 8/8 | ✅ |
| Phase 3: Portfolio Content | 9/9 | ✅ |
| Phase 4: Games | 8/8 | ✅ |
| Phase 5: Testing + Verification | 7/7 | ✅ |
| **Total** | **37/37** | **✅** |

### Deviations from Design (recorded in `apply-progress.md` §Deviations)

1. `SiMailboxdotorg` → `SiMailbox` (icon does not exist in react-icons v5.7.0).
2. `SiCss3` → `SiCss` (renamed in react-icons v5).
3. `SiAmazon`, `SiAwsamplify` → lucide-react `Cloud`, `Server` (AWS icons removed from react-icons v5).
4. `@vitejs/plugin-react` added to devDependencies for vitest config parity.
5. framer-motion `Variants` typing annotation required by strict `Easing` type in v12.
6. `[locale]/portfolio/layout.tsx` and `[locale]/my-games/layout.tsx` landed in the Phase 2 commit because they depend on LanguageSwitcher.

None of these deviate from spec semantics — visual-only or commit-ordering adjustments.

## Git Commit Summary

5 conventional commits on `main`, each phase mapped to one work-unit commit (per user-mandated commit shape):

```
25e8396  test: add vitest setup with theme, i18n, and cn unit tests
0d32aa8  feat(games): add WASM game iframes for platformer and space-invaders
7f0e489  feat(portfolio): add content components, [locale]/portfolio route, and static assets
feeb5b6  feat(i18n+theme): add locale-prefixed routing, accept-language redirect, dark/light toggle
3196f3a  chore: initial Next.js 16 scaffold with configs and gitignore
```

Workload: user approved `size:exception` — all 37 tasks landed in one batch on `main` without PR slices or chained delivery.

## Archive Contents

The archive folder is the immutable audit trail. All original artifacts are preserved verbatim:

| Artifact | Status |
|----------|--------|
| `exploration.md` | ✅ archived (26,360 bytes) |
| `proposal.md` | ✅ archived (3,646 bytes) |
| `specs/portfolio-content/spec.md` | ✅ archived |
| `specs/i18n/spec.md` | ✅ archived |
| `specs/theme/spec.md` | ✅ archived |
| `specs/games/spec.md` | ✅ archived |
| `design.md` | ✅ archived (6,576 bytes) |
| `tasks.md` | ✅ archived (37/37 marked complete) |
| `apply-progress.md` | ✅ archived (15,891 bytes; serves as verification record) |
| `archive-report.md` | ✅ this file |

## Post-Archive State

| Path | Status |
|------|--------|
| `openspec/specs/` | ✅ 4 new main specs created |
| `openspec/changes/portfolio-extract/` | ✅ removed (active changes dir cleaned) |
| `openspec/changes/archive/2026-09-30-portfolio-extract/` | ✅ present (audit trail) |
| `portfolio-app/` (project code) | ✅ intact, untouched by archive |

## SDD Cycle Status

**Complete.** The change was planned (explore → propose → spec → design → tasks), implemented (37/37 tasks applied), self-verified (apply-progress.md), and archived (this report). Ready for the next change.

## Next Recommended Action

Run `/sdd-new` to start the next SDD change. Optionally run `/sdd-init` if a different project needs its own SDD context.
