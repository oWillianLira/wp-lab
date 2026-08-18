<?php get_header(); ?>

<main>

  <?php if (have_posts()) : ?>

    <?php while (have_posts()) : the_post(); ?>

      <article>
        <header>
          <h1>
            <?php the_title(); ?>
          </h1>
        </header>

        <div class="page-content">
          <?php the_content(); ?>
        </div>
      </article>

    <?php endwhile; ?>

  <?php endif; ?>

</main>

<?php get_footer(); ?>