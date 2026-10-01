# i18n Specification

## Purpose

Describes the internationalization behavior of the portfolio: locale-prefixed routing, server-side translation loading, the language switcher, and the root redirect that picks a default locale. Two locales are supported — English (default) and Spanish. All user-visible strings MUST come from translation resources.

## Requirements

### Requirement: Locale-Prefixed Routes

Every public route MUST be prefixed with a locale segment. The first path segment SHALL be one of the supported locales. Requests without a locale prefix MUST NOT match any portfolio route.

#### Scenario: Locale segment is the first path component

- GIVEN the visitor navigates to `/en/portfolio`
- WHEN the router resolves the route
- THEN the portfolio page renders under the `en` locale

#### Scenario: Unsupported locale segment does not match

- GIVEN the visitor navigates to `/fr/portfolio`
- WHEN the router attempts to resolve the route
- THEN the portfolio page does not render
- AND the visitor receives a not-found response

### Requirement: Root Locale Redirect

The system MUST redirect requests to `/` to `/en` or `/es` based on the `Accept-Language` header. When the header is missing or matches no supported locale, the system MUST redirect to `/en`.

#### Scenario: Spanish preference redirects to Spanish

- GIVEN the request header `Accept-Language: es-ES,es;q=0.9`
- WHEN a visitor hits `/`
- THEN the response is a redirect to `/es`

#### Scenario: English preference redirects to English

- GIVEN the request header `Accept-Language: en-US,en;q=0.9`
- WHEN a visitor hits `/`
- THEN the response is a redirect to `/en`

#### Scenario: Missing or unmatched header defaults to English

- GIVEN the request has no `Accept-Language` header or one matching no supported locale
- WHEN a visitor hits `/`
- THEN the response is a redirect to `/en`

### Requirement: Language Switcher

The system MUST expose a language switcher that swaps the locale segment of the current path. The visitor's location within the route (page + hash + query) MUST be preserved across the switch.

#### Scenario: Switching locale preserves the rest of the path

- GIVEN the visitor is on `/en/portfolio#projects`
- WHEN they select Spanish from the switcher
- THEN the navigation lands on `/es/portfolio#projects`

#### Scenario: Switching locale does not 404

- GIVEN the visitor is on `/en/portfolio`
- WHEN they switch to Spanish
- THEN the Spanish version of the same page renders without error

### Requirement: Translation Resources

All user-visible strings MUST be loaded from translation resource files keyed by locale and namespace. The system MUST support at minimum two namespaces: `common` and `data`.

#### Scenario: UI strings come from resource files

- GIVEN the visitor is on `/en/portfolio`
- WHEN any UI string is rendered
- THEN the displayed text is read from the English `common` or `data` resource

#### Scenario: Missing translation key falls back to English

- GIVEN a key exists in `en/common.json` but not in `es/common.json`
- WHEN the Spanish page renders that key
- THEN the English string is displayed
- AND no runtime error occurs

### Requirement: Server-Side Translation Loading

Translation resources MUST be loaded on the server for every request. The client MUST receive the resolved translations as part of the initial payload so that no text re-render flash occurs after hydration.

#### Scenario: No translation flash on first paint

- GIVEN a fresh page load of `/es/portfolio`
- WHEN the HTML is parsed and rendered
- THEN all visible text is already in Spanish before client-side scripts execute

### Requirement: Unknown Locale Fallback

When a route uses a locale segment not in the supported locale list, the system MUST treat it as the default locale for translation lookup.

#### Scenario: Unsupported locale segment renders English content

- GIVEN the visitor navigates to `/fr/portfolio`
- WHEN the page renders
- THEN the page displays English content
- AND no crash occurs due to missing translations
