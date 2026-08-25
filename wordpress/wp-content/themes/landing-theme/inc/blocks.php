<?php

function landing_register_blocks()
{
  register_block_type(
    get_template_directory() . '/assets/blocks/landing-hero'
  );
}

add_action('init', 'landing_register_blocks');
