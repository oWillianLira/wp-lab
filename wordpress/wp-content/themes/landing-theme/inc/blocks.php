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

  $blocks_path =
    get_template_directory() . '/assets/blocks';

  $block_files = glob($blocks_path . '/*/block.json');

  foreach ($block_files as $block_file) {
    $block_path = dirname($block_file);

    $relative_path = str_replace(
      get_template_directory() . '/',
      '',
      $block_path
    );

    $entry_key = $relative_path . '/index.jsx';

    $entry = $manifest[$entry_key] ?? null;

    if (!$entry) {
      continue;
    }

    $handle = basename($block_path);

    wp_register_script(
      $handle,
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
          $handle . '-' . $index,
          get_template_directory_uri() . '/dist/' . $css,
          [],
          null
        );
      }
    }

    register_block_type(
      $block_path,
      [
        'editor_script' => $handle,
      ]
    );
  }
}

add_action('init', 'landing_register_blocks');
