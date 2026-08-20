<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <?php wp_body_open(); ?>

  <header>
    <?php
    if (has_custom_logo()) {
      the_custom_logo();
    } else {
    ?>
      <a href="<?php echo esc_url(home_url('/')); ?>">
        <?php bloginfo('name'); ?>
      </a>
    <?php
    }

    wp_nav_menu([
      'theme_location' => 'primary',
    ]);
    ?>
  </header>