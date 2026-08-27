import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],

  build: {
    manifest: true,
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: 'assets/js/main.js',
        'landing-hero': 'assets/blocks/landing-hero/index.jsx',
      },
      external: ['react', 'react-dom'],
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'http://127.0.0.1:5173',
  },
});
