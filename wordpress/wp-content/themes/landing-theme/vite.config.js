import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { globSync } from 'glob';
import path from 'path';

const blockEntries = Object.fromEntries(
  globSync('assets/blocks/**/index.jsx').map((file) => [
    file.replace(/\\/g, '/'),
    file,
  ]),
);

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
    minify: 'terser',
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        main: 'assets/js/main.js',
        ...blockEntries,
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'http://127.0.0.1:5173',
  },

  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'assets/js/utils'),
    },
  },
});
