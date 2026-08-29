<?php

function landing_register_blocks()
{
  $manifest_path =
    get_template_directory() . '/dist/.vite/manifest.json';

  if (!file_exists($manifest_path)) {
    return;
  }

  $manifest = json_decode(
    file_get_contents($manifest_path),
    true
  ) ?? [];

  $entry = $manifest['assets/blocks/landing-hero/index.jsx'] ?? null;

  if (!$entry) {
    return;
  }

  wp_register_script(
    'landing-hero',
    get_template_directory_uri() . '/dist/' . $entry['file'],
    [
      'wp-blocks',
      'wp-element',
    ],
    null,
    true
  );

  if (!empty($entry['css'])) {
    foreach ($entry['css'] as $index => $css) {
      wp_enqueue_style(
        'landing-hero-' . $index,
        get_template_directory_uri() . '/dist/' . $css,
        [],
        null
      );
    }
  }

  register_block_type(
    get_template_directory() . '/assets/blocks/landing-hero',
    [
      'editor_script' => 'landing-hero',
    ]
  );
}

add_action('init', 'landing_register_blocks');
