# Landing Theme

Custom WordPress theme developed as part of the WordPress Lab project.

The theme uses a custom Vite-based asset pipeline and React-powered Gutenberg blocks.

## Structure

```text
landing-theme/
├── assets/
│   ├── blocks/
│   │   └── landing/
│   └── js/
│       ├── main.js
│       └── utils/
│
├── inc/
│   ├── assets.php
│   ├── blocks.php
│   └── enqueue.php
│
├── dist/
│
├── functions.php
├── header.php
├── footer.php
├── index.php
└── style.css
```

## Directory Responsibilities

### `assets/`

Source assets processed by Vite.

Contains JavaScript, React blocks and SCSS source files.

### `assets/blocks/`

Gutenberg block source code.

Blocks are organized by domain or feature:

```text
assets/blocks/
└── landing/
    ├── hero/
    ├── benefits/
    │   └── benefits-item/
    ├── testimonials/
    │   └── testimonials-item/
    └── cta/
```

### `assets/js/`

Shared JavaScript source code.

```text
assets/js/
├── main.js
└── utils/
```

### `assets/js/utils/`

Reusable JavaScript utilities shared by different parts of the theme.

Imports use the Vite alias:

```js
import { normalizeUrl } from '@utils/links';
```

### `inc/`

PHP classes and WordPress integration logic.

Responsibilities include:

- asset loading;
- Gutenberg block registration;
- theme integration;
- WordPress-specific functionality.

### `dist/`

Generated Vite build output.

This directory contains compiled assets and the Vite manifest used by the theme.

Generated files should not be edited manually.

## Gutenberg Block Structure

A typical block follows this structure:

```text
block-name/
├── block.json
├── index.jsx
├── edit.jsx
├── save.jsx
├── style.scss
└── editor.scss
```

### `block.json`

Defines the block metadata and attributes.

### `index.jsx`

Registers the block with Gutenberg and connects the block implementation.

### `edit.jsx`

Defines the editor-side implementation.

### `save.jsx`

Defines the serialized frontend markup.

### `style.scss`

Contains styles shared by the editor and frontend when appropriate.

### `editor.scss`

Contains styles specific to the Gutenberg editing experience.

## Block Registration

Blocks are discovered automatically.

Vite generates entries for:

```text
assets/blocks/**/index.jsx
```

The resulting files are recorded in:

```text
dist/.vite/manifest.json
```

The PHP block registration layer discovers:

```text
assets/blocks/**/block.json
```

and resolves each block's compiled entry through the Vite manifest.

This removes the need to manually register every block in PHP.

## Gutenberg Architecture

Blocks follow the separation:

```text
Gutenberg Block
│
├── block.json
│   └── metadata + attributes
│
├── edit.jsx
│   └── editor experience
│
├── save.jsx
│   └── serialized markup
│
├── style.scss
│   └── shared/frontend styling
│
└── editor.scss
    └── editor-only styling
```

## Build

The theme source is compiled from the repository root using Vite.

```bash
npm run dev
```

for development.

```bash
npm run build
```

for a production build.

The Vite configuration is located at:

```text
../../../../vite.config.js
```

relative to this theme directory.

## Current Blocks

```text
landing/hero

landing/benefits
└── landing/benefits-item

landing/testimonials
└── landing/testimonials-item

landing/cta
```

## Architectural Principles

The theme follows a few basic principles:

### Separation of concerns

PHP handles WordPress integration and server-side behavior.

React/Gutenberg handles block editor behavior.

SCSS handles presentation.

Vite handles source processing and asset generation.

### Reusable blocks

Blocks should be self-contained and organized according to their domain.

### Shared utilities

Common JavaScript functionality belongs in:

```text
assets/js/utils/
```

rather than being duplicated across blocks.

### Editor experience

The Gutenberg editor is treated as a first-class interface.

When appropriate, blocks provide dedicated `editor.scss` styles and editor controls instead of relying exclusively on frontend styling.

### Minimal dependencies

The theme favors WordPress and Gutenberg APIs over unnecessary third-party dependencies.

## Development Status

The theme is currently being developed incrementally.

The current implementation focuses on:

- custom Gutenberg blocks;
- Vite integration;
- automatic block discovery;
- reusable block structures;
- editor UX;
- frontend styling.

Additional integrations, including WooCommerce and multilingual support, will be documented here once their implementation is finalized.
