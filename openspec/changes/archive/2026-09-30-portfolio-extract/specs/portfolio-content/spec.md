# portfolio-content Specification

## Purpose

Content rendered on `/[locale]/portfolio`: hero, about, projects, experience, skills, contact, footer, sticky nav, social links, and the locale-aware CV download. Sourced from translation files and static data; no submissions or API calls accepted.

## Requirements

### Requirement: Hero Section

The system MUST render a hero at the top of the portfolio route that displays greeting, role, status, and focus area, all sourced from the active locale's translations.

#### Scenario: Hero renders on first paint

- GIVEN the visitor lands on `/en/portfolio`
- WHEN the page renders
- THEN the hero shows greeting, role, status, and focus area in English

#### Scenario: Hero updates on locale switch

- GIVEN the visitor switches from `/en/portfolio` to `/es/portfolio`
- WHEN the new locale loads
- THEN the hero strings update to Spanish translations

### Requirement: About Section

The system MUST render an about section whose copy is loaded from the active locale's `about.*` translation keys.

#### Scenario: About renders locale copy

- GIVEN the visitor is on `/es/portfolio`
- WHEN the about section enters the viewport
- THEN every paragraph renders in Spanish

### Requirement: Projects Section

The system MUST render every projects entry with image, title, description, tags, and external link, in declared order.

#### Scenario: All projects render with metadata

- GIVEN the data source contains N project entries
- WHEN the section renders
- THEN N cards appear in declared order with image, title, description, tags, and link

#### Scenario: Missing image does not collapse the card

- GIVEN a project has no resolvable image
- WHEN the section renders
- THEN the card still shows title, description, tags, and link

### Requirement: Experience Section

The system MUST render a vertical timeline. Each entry MUST show title, location, date range, and description.

#### Scenario: Timeline lists all experiences in order

- GIVEN the experiences data source contains 6 entries
- WHEN the section renders
- THEN 6 timeline entries appear in declared chronological order

### Requirement: Skills Section

The system MUST render categorized skill lists. Each category MUST display its title and skills.

#### Scenario: All skill categories render

- GIVEN the data source contains 7 categories
- WHEN the section renders
- THEN 7 titled groups appear
- AND each non-empty group lists its skills

### Requirement: Contact Section (UI Only)

The system MUST render a contact form with email and message fields plus a submit control. Submit MUST be a no-op.

#### Scenario: Form is visible but submit does nothing

- GIVEN the visitor is on `/en/portfolio`
- WHEN the contact section scrolls into view
- THEN email input, message textarea, and submit button are visible
- AND clicking submit causes no network request

### Requirement: Locale-Aware CV Download

The system MUST expose a CV link that selects English PDF for English and Spanish PDF for Spanish.

#### Scenario: English locale downloads English CV

- GIVEN the visitor is on `/en/portfolio`
- WHEN they click the CV link
- THEN the browser receives a PDF whose filename ends with `English.pdf`

#### Scenario: Spanish locale downloads Spanish CV

- GIVEN the visitor is on `/es/portfolio`
- WHEN they click the CV link
- THEN the browser receives a PDF whose filename ends with `Español.pdf`

### Requirement: Sticky Navigation

The system MUST render a sticky nav that highlights the section currently in view.

#### Scenario: Highlight follows scroll

- GIVEN the visitor is on `/en/portfolio`
- WHEN the projects section enters the viewport
- THEN the projects nav item shows its active visual state

### Requirement: Social Links

The system MUST render LinkedIn and GitHub links that open in a new tab.

#### Scenario: Social link opens in new tab

- GIVEN the visitor clicks the LinkedIn icon
- WHEN the click resolves
- THEN a new tab opens to the LinkedIn profile
- AND the portfolio tab stays on the current section
