<?php

require_once __DIR__ . '/Assets.php';

add_action('wp_enqueue_scripts', function () {
    $assets = new Assets();

    $assets->enqueue();
});
