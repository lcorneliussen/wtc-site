import { defineConfig } from 'astro/config';

const base = '/wtc-site';

// Collection tunnels link to the origin. Keep that entry point useful while
// retaining the GitHub Pages subpath for all pages and assets.
function redirectPreviewRoot(server) {
  const handle = (request, response, next) => {
    const url = new URL(request.url || '/', 'http://localhost');
    if (url.pathname !== '/') return next();
    response.writeHead(302, { Location: `${base}/${url.search}` });
    response.end();
  };
  // Astro prepends its base-path check after Vite's setup hooks. Install our
  // exact-root redirect in the post hook, ahead of that check.
  return () => server.middlewares.stack.unshift({ route: '', handle });
}

export default defineConfig({
  site: 'https://lcorneliussen.github.io',
  base,
  trailingSlash: 'always',
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    plugins: [{
      name: 'preview-root-redirect',
      enforce: 'post',
      configureServer: redirectPreviewRoot,
      configurePreviewServer: redirectPreviewRoot,
    }],
  },
});
