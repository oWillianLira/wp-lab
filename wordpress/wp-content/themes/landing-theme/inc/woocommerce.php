<?php

function landing_woocommerce_before_main_content()
{
  echo '<div class="landing-woocommerce landing-woocommerce-shop">';
}

function landing_woocommerce_after_main_content()
{
  echo '</div>';
}

add_action(
  'woocommerce_before_main_content',
  'landing_woocommerce_before_main_content'
);

add_action(
  'woocommerce_after_main_content',
  'landing_woocommerce_after_main_content'
);
