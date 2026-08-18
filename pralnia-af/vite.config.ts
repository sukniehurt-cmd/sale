import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  // Ścieżki względne — strona działa zarówno w katalogu głównym domeny,
  // jak i w podkatalogu (np. https://domena.pl/podglad/).
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    target: 'es2020',
  },
  server: {
    port: 3000,
    host: true,
  },
});
