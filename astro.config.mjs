import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lcorneliussen.github.io',
  base: '/wtc-site',
  trailingSlash: 'always',
  output: 'static',
  devToolbar: { enabled: false },
});
