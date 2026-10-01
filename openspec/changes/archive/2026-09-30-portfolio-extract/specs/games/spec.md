# games Specification

## Purpose

Describes the WASM games embedded in the portfolio: a platformer and a space-invaders game. Each game runs inside an iframe pointing to a self-contained bundle under `public/`. The capability covers reachability of the games, asset delivery, production-build playability, theming of the wrapper, and the per-game back navigation.

## Requirements

### Requirement: Two Games Reachable

The system MUST expose two distinct game routes: one for the platformer and one for the space-invaders game. Both routes MUST be reachable from a games index page.

#### Scenario: Games index lists both games

- GIVEN the visitor navigates to the games section
- WHEN the index page renders
- THEN two game entries are visible: platformer and space-invaders
- AND each entry is a link to the corresponding game route

#### Scenario: Each game route renders its game

- GIVEN the visitor follows the platformer link
- WHEN the platformer route renders
- THEN the platformer game is visible and interactive
- AND the same holds for the space-invaders route

### Requirement: Iframe Mount

Each game MUST be loaded via an iframe whose `src` points to the game's `index.html` served from the same origin. The parent page MUST NOT inline the WASM binary or the JS glue into the React tree.

#### Scenario: Game loads from public asset path

- GIVEN the platformer route is rendered
- WHEN the iframe mounts
- THEN its `src` attribute points to `/platformer/index.html`
- AND a network request is made to that exact path

### Requirement: WASM and Glue Co-location

The `.wasm` binary for each game MUST live in the same folder as the game's JS glue file under the public assets path. The relative loader resolution MUST NOT be broken by any project restructure.

#### Scenario: WASM resolves relative to its JS glue

- GIVEN the platformer bundle is served at `/platformer/`
- WHEN the game JS glue executes its `init()`
- THEN the WASM binary is fetched from a sibling path of the JS file
- AND the game initializes without a loader error

### Requirement: Production Build Playability

Both games MUST be fully playable when the application is built with the production build command and served from the production server. The game MUST NOT depend on development-only features.

#### Scenario: Games work after production build

- GIVEN the application has been built and started in production mode
- WHEN the visitor opens the platformer route
- THEN the game loads, displays its canvas, and responds to input
- AND the same holds for the space-invaders route

### Requirement: No Cross-Origin Isolation Headers Required

The system MUST NOT require `Cross-Origin-Embedder-Policy` or `Cross-Origin-Opener-Policy` headers for the games to function. Games MUST run without `SharedArrayBuffer`-based threading.

#### Scenario: Games work without COOP/COEP

- GIVEN the production server emits no COOP/COEP headers
- WHEN either game route loads
- THEN the WASM initializes and the game plays
- AND no `SharedArrayBuffer` is required

### Requirement: Wrapper Theming Only

The dark/light theme MUST style the iframe's wrapper chrome (background, border, container). The theme MUST NOT inject styles into the game's canvas or DOM, which live in a separate document.

#### Scenario: Theme affects wrapper, not canvas

- GIVEN the visitor is on the platformer route in dark mode
- WHEN the page renders
- THEN the wrapper background is dark
- AND the game canvas itself is governed by the game's own stylesheet

### Requirement: Per-Game Back Navigation

Each game route MUST render a back control that returns the visitor to the games index page. The control MUST be reachable from the game page without leaving the page.

#### Scenario: Back button returns to games index

- GIVEN the visitor is on `/en/my-games/platformer`
- WHEN they activate the back control
- THEN the navigation lands on the games index page
- AND the platformer route is no longer in view
