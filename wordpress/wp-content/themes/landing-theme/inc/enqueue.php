<?php

function landing_enqueue_assets()
{
    $theme_uri = get_template_directory_uri();

    wp_enqueue_style(
        'landing-theme',
        $theme_uri . '/dist/assets/main.css',
        [],
        filemtime(get_template_directory() . '/dist/assets/main.css')
    );

    wp_enqueue_script(
        'landing-theme',
        $theme_uri . '/dist/assets/main.js',
        [],
        filemtime(get_template_directory() . '/dist/assets/main.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'landing_enqueue_assets');
