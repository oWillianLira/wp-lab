# WordPress Lab

Technical WordPress development laboratory focused on a modern, containerized development workflow.

## Repository Structure

```text
/
├── docker-compose.yml
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
│
└── wordpress/
    ├── README.md
    │
    ├── wp-admin/
    ├── wp-content/
    │   ├── plugins/
    │   ├── themes/
    │   │   └── landing-theme/
    │   └── uploads/
    │
    └── wp-includes/
```

## Root Files

### `docker-compose.yml`

Defines the local containerized development environment.

### `.env`

Contains environment-specific configuration used by Docker Compose.

Environment variables and secrets should not be committed to version control.

### `.gitignore`

Defines files and directories that should not be tracked by Git, including generated assets and local environment files when applicable.

### `package.json`

Defines the JavaScript development dependencies and npm scripts used by the project.

### `vite.config.js`

Defines the Vite build configuration, including:

- React support;
- block entry discovery;
- asset manifest generation;
- development server;
- module aliases;
- production build configuration.

## `wordpress/`

Contains the WordPress application files and its associated development documentation.

See:

```text
wordpress/README.md
```

for environment-specific documentation.

## `wordpress/wp-content/`

Contains WordPress content that is expected to be customized or extended by the project.

### `plugins/`

Custom or project-specific WordPress plugins.

### `themes/`

Custom WordPress themes.

The current project theme is:

```text
wordpress/
└── wp-content/
    └── themes/
        └── landing-theme/
```

### `uploads/`

WordPress media uploads.

This directory is generated and managed by WordPress rather than by the theme or application source code.

## Architecture Boundaries

The repository intentionally separates responsibilities between the development environment, WordPress, and the custom theme:

```text
Repository
│
├── Development environment
│   ├── Docker
│   ├── Compose
│   └── Node/Vite tooling
│
├── WordPress application
│   ├── Core
│   ├── Plugins
│   ├── Themes
│   └── Content
│
└── Custom theme
    ├── PHP
    ├── Gutenberg blocks
    ├── JavaScript
    ├── SCSS
    └── Build artifacts
```

The root README intentionally does not document theme-specific implementation details. Those belong to the theme documentation.
