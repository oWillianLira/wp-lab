<?php

function landing_theme_setup()
{
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('custom-logo');
  add_theme_support('menus');

  register_nav_menus([
    'primary' => 'Menu Principal',
  ]);
}

add_action('after_setup_theme', 'landing_theme_setup');

require_once get_template_directory() . '/inc/enqueue.php';
