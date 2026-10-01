# theme Specification

## Purpose

Describes the dark/light theme behavior of the portfolio application. The theme system supports three modes — light, dark, and system — persisted across visits, and applies without causing a hydration mismatch between server and client renders. Only this capability owns theme behavior; section content belongs to other specs.

## Requirements

### Requirement: Three-Mode Theme Toggle

The system MUST expose a theme control that lets the visitor cycle through light, dark, and system modes. The active mode MUST be applied to the document root before any section paints.

#### Scenario: Toggle cycles light → dark → system → light

- GIVEN the current mode is light
- WHEN the visitor activates the toggle twice
- THEN the active mode is system
- AND activating it once more returns to light

#### Scenario: System mode follows OS preference

- GIVEN the toggle is on system mode and the OS reports a dark color scheme
- WHEN the page loads
- THEN the rendered theme is dark

### Requirement: Theme Persistence

The visitor's last explicit theme choice MUST be persisted across page reloads and across browser sessions. The persistence mechanism MUST be `localStorage`.

#### Scenario: Choice survives a page reload

- GIVEN the visitor selected dark mode
- WHEN they reload the page
- THEN the page renders in dark mode without flashing light

#### Scenario: Choice survives a new browser session

- GIVEN the visitor selected light mode and closed the tab
- WHEN they open a new tab to the portfolio
- THEN the page renders in light mode on first paint

### Requirement: System Default on First Visit

When no prior theme choice exists in `localStorage`, the system MUST default to following the operating system's reported color scheme.

#### Scenario: Fresh storage respects OS preference

- GIVEN the visitor's browser has no `theme` key in `localStorage`
- AND the OS reports a dark color scheme
- WHEN the portfolio loads for the first time
- THEN the page renders in dark mode

#### Scenario: Fresh storage with light OS preference

- GIVEN the visitor's browser has no `theme` key in `localStorage`
- AND the OS reports a light color scheme
- WHEN the portfolio loads for the first time
- THEN the page renders in light mode

### Requirement: Fixed Toggle Position

The theme toggle MUST be positioned at the bottom-right corner of the viewport and MUST remain visible while the visitor scrolls any portfolio section.

#### Scenario: Toggle stays anchored while scrolling

- GIVEN the visitor is on `/en/portfolio`
- WHEN they scroll from the hero to the footer
- THEN the theme toggle remains visible at the bottom-right of the viewport

### Requirement: Hydration Safety

The theme MUST be applied to the DOM in a way that does not cause a hydration mismatch warning between the server-rendered HTML and the client-rendered tree.

#### Scenario: No hydration mismatch on reload

- GIVEN a visitor with dark mode persisted
- WHEN they reload any portfolio route
- THEN no hydration mismatch warning is reported by the framework
- AND the first paint is already dark

### Requirement: Class-Based Dark Mode

Dark mode MUST be applied by adding a `dark` class to the root `<html>` element. Tailwind's `dark:` variant MUST activate only when that class is present.

#### Scenario: Dark class toggles dark styles

- GIVEN the active mode is light
- WHEN the visitor switches to dark mode
- THEN the `<html>` element has the `dark` class
- AND elements styled with Tailwind `dark:` variants render in their dark form

#### Scenario: Removing dark class reverts styles

- GIVEN the active mode is dark
- WHEN the visitor switches back to light mode
- THEN the `<html>` element no longer has the `dark` class
- AND `dark:` variants no longer apply
