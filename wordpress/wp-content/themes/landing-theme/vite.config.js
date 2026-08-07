import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'http://127.0.0.1:5173',
  },

  build: {
    manifest: true,
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: 'assets/js/main.js',
    },
  },
});
