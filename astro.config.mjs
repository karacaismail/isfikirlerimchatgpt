import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://karacaismail.github.io',
  base: '/isfikirlerimchatgpt',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  vite: { build: { sourcemap: false } },
});
