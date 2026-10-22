import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://wtc.sh',
  base: '/',
  trailingSlash: 'always',
  output: 'static',
  devToolbar: { enabled: false },
});
