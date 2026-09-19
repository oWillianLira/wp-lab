# WordPress Environment

Local WordPress application used by the project development environment.

## Structure

```text
wordpress/
├── wp-admin/
├── wp-content/
│   ├── plugins/
│   ├── themes/
│   │   └── landing-theme/
│   └── uploads/
└── wp-includes/
```

## WordPress Core

### `wp-admin/`

WordPress administration application.

### `wp-includes/`

WordPress core libraries and framework code.

These directories should generally not be modified directly.

## `wp-content/`

Project-specific WordPress content.

### `plugins/`

Installed and custom plugins.

### `themes/`

Installed and custom themes.

### `uploads/`

Media files managed by WordPress.

## Custom Theme

The project currently contains:

```text
wp-content/
└── themes/
    └── landing-theme/
```

Theme-specific architecture and development instructions are documented separately in:

```text
wp-content/themes/landing-theme/README.md
```

## Development Environment

The WordPress application runs inside Docker.

The application container is responsible for serving WordPress, while the database runs in a separate MySQL container.

The repository root contains the Compose configuration:

```text
../docker-compose.yml
```

## Runtime

Local WordPress:

```text
http://localhost:8080
```

Database:

```text
MySQL 8.4
```

The database is exposed locally for development tools while WordPress communicates with MySQL through the Docker network.

## WP-CLI

WP-CLI is provided through a dedicated container.

Commands can be executed from the repository root through Docker Compose.

Example:

```bash
docker compose run --rm wpcli <command>
```

The exact command and available services are defined by the root `docker-compose.yml`.

## Development Principle

WordPress core is treated as an external dependency.

Project-specific changes should be implemented through:

- custom themes;
- custom plugins;
- configuration;
- hooks;
- WordPress APIs.

Direct modifications to WordPress core should be avoided.
