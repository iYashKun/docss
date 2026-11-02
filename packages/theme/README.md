# docss-theme

Reusable Next.js and Fumadocs components for MDX documentation sites. The package is intended to be used with the `create-docss` scaffold or an existing Next.js App Router project.

```bash
npm install docss-theme fumadocs-core fumadocs-mdx fumadocs-ui
```

Wrap your Next.js config with `withDocsTheme` from `docss-theme/next`. Re-export `docss-theme/source-config` from `source.config.ts`, and compose the root/layout/page adapters exported from `docss-theme`. Import `docss-theme/styles.css` after the Fumadocs CSS presets.

See the root README and `packages/create-docss/template` for a complete application setup.