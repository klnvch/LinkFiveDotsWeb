import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'images',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'ic_launcher_big.png',
        'screenshots/game_wide.png',
        'screenshots/game_narrow.png',
      ],
      manifest: {
        id: '/',
        name: 'Link Five Dots',
        short_name: 'FiveDots',
        description: 'Link Five Dots',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'ic_launcher_big.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshots/game_wide.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'screenshots/game_narrow.png',
            sizes: '400x800',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
        protocol_handlers: [],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__\/vite/],
      },
    }),
  ],
  server: {
    port: 3010,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  }
});
