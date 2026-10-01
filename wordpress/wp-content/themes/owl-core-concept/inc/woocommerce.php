<?php

function owlcc_woocommerce_before_main_content()
{
  echo '<div class="owlcc-woocommerce owlcc-woocommerce-shop">';
}

function owlcc_woocommerce_after_main_content()
{
  echo '</div>';
}

add_action(
  'woocommerce_before_main_content',
  'owlcc_woocommerce_before_main_content'
);

add_action(
  'woocommerce_after_main_content',
  'owlcc_woocommerce_after_main_content'
);

function owlcc_woocommerce_product_classes($classes)
{
  $classes[] = 'owlcc-product-card';

  return $classes;
}

add_filter(
  'woocommerce_post_class',
  'owlcc_woocommerce_product_classes'
);
