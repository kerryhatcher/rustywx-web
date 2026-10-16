import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kerryhatcher.github.io',
  base: '/rustywx-web',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'css-variables' },
  },
});
