<?php
class Assets
{
  private string $devServer = 'http://127.0.0.1:5173';

  private string $devServerHost = 'host.docker.internal';

  private int $devServerPort = 5173;

  private string $manifestPath;

  private array $manifest = [];

  public function __construct()
  {
    $this->manifestPath =
      get_template_directory() . '/dist/.vite/manifest.json';

    if (file_exists($this->manifestPath)) {
      $this->manifest = json_decode(
        file_get_contents($this->manifestPath),
        true
      ) ?? [];
    }
  }

  public function enqueue(): void
  {
    if ($this->isDev()) {
      $this->enqueueDev();

      return;
    }

    $this->enqueueProd();
  }

  private function isDev(): bool
  {
    $connection = @fsockopen(
      $this->devServerHost,
      $this->devServerPort,
      $errorCode,
      $errorMessage,
      0.5
    );

    if ($connection) {
      fclose($connection);

      return true;
    }

    return false;
  }

  private function enqueueDev(): void
  {
    wp_enqueue_script(
      'vite-client',
      $this->devServer . '/@vite/client',
      [],
      null,
      false
    );

    wp_enqueue_script(
      'theme',
      $this->devServer . '/assets/js/main.js',
      [],
      null,
      false
    );

    add_filter('script_loader_tag', function ($tag, $handle) {

      if (in_array($handle, ['vite-client', 'theme'], true)) {
        return str_replace(
          '<script ',
          '<script type="module" ',
          $tag
        );
      }

      return $tag;
    }, 10, 2);
  }

  private function enqueueProd(): void
  {
    $asset = $this->manifest['assets/js/main.js'] ?? null;

    if (!$asset) {
      return;
    }

    $themeUri = get_template_directory_uri();

    if (!empty($asset['css'])) {
      foreach ($asset['css'] as $index => $css) {
        wp_enqueue_style(
          'theme-' . $index,
          $themeUri . '/dist/' . $css,
          [],
          null
        );
      }
    }

    wp_enqueue_script(
      'theme',
      $themeUri . '/dist/' . $asset['file'],
      [],
      null,
      true
    );
  }
}
