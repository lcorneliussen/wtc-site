import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://taba.sh',
  base: '/',
  trailingSlash: 'always',
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    server: { strictPort: true },
  },
});
