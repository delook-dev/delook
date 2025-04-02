import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-plugin-pages-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    Pages({
      dirs: 'src/pages',
      onRoutesGenerated: (routes) => generateSitemap({ routes }),
    }),
  ],
});
