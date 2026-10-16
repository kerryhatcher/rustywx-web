# rustywx-web

Website and documentation for [rustywx](https://github.com/kerryhatcher/rustywx), the native NEXRAD Level II radar scope. Built with [Astro](https://astro.build) as a static site and served from GitHub Pages at <https://kerryhatcher.github.io/rustywx-web/>.

## Develop

Node is pinned in `mise.toml` (current LTS).

```sh
npm install
npm run dev       # http://localhost:4321/rustywx-web/
npm run build     # static output in dist/
npm run preview   # serve dist/
```

## Layout

- `src/pages/index.astro`: the landing page
- `src/content/docs/*.md`: documentation pages (frontmatter: `title`, `description`, `group`, `order`, `symbol`)
- `src/lib/analysis.ts`: builds the hero's surface-analysis map at build time (the fronts and isobars are illustrative)
- `src/data/sites.json`, `src/data/legends.json`: NEXRAD sites and color tables extracted from the rustywx source
- `src/data/site.ts`: release version, download files and sizes. Update this when rustywx ships a new release.

## Deploy

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`. In the repository settings, set **Pages → Source** to **GitHub Actions**.
