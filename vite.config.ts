import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-plugin-pages-sitemap';
import svgr from 'vite-plugin-svgr';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import mdx from '@mdx-js/rollup';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    Pages({
      dirs: 'src/pages',
      onRoutesGenerated: (routes) => generateSitemap({ routes }),
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
      ],
    }),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'metaData' }]],
      rehypePlugins: [[rehypeHighlight, { detect: true }], rehypeStringify],
    }),
    visualizer({
      open: false,
      emitFile: process.env.NODE_ENV === 'production',
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          form: ['react-hook-form', '@hookform/resolvers', 'zod'],
          radix: [
            '@radix-ui/react-toast',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dialog',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-collapsible',
          ],
          mdx: ['@mdx-js/react', 'rehype-highlight', 'remark-gfm'],
          tailwind: ['tailwind-merge'],
        },
      },
    },
  },
  base: './',
});
