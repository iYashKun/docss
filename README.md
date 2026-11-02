# docss

An npm-published documentation theme and project generator. A user creates a small standalone Next.js app, then maintains their docs in `docs.config.ts` and `content/docs/*.mdx`. The routes, layout, styling, MDX integration, and metadata come from `docss-theme`.

## Create a site

After the packages are published to npm:

```bash
npm create docss my-docs
cd my-docs
npm install
npm run dev
```

Open http://localhost:3000. The CLI creates a normal project folder, not a clone of this repository. Push that generated folder to a Git provider when you are ready to deploy.

## Configure

Set site metadata and navigation in the generated `docs.config.ts`:

```ts
import { defineDocsConfig } from 'docss-theme';

export default defineDocsConfig({
  name: 'Acme Docs',
  description: 'Guides and reference for Acme.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  language: 'en',
  githubUrl: 'https://github.com/acme/product',
  links: [
    { text: 'Status', url: 'https://status.acme.com', external: true },
  ],
});
```

Set `NEXT_PUBLIC_SITE_URL` to the final origin, such as `https://docs.acme.com`, in the host's environment settings.

## Add documentation

Create `.mdx` files under `content/docs/`. `index.mdx` is the homepage, and folders map to URL segments.

```text
content/docs/
  index.mdx
  getting-started.mdx
  guides/
    accounts.mdx
```

Each page can define title and description in frontmatter:

```mdx
---
title: Accounts
description: Manage users and account settings.
---

Write page content with Markdown and MDX components.
```

The sidebar is generated from this content tree. Normal users generally only need to edit `docs.config.ts` and files under `content/docs/`.

## Deploy a generated site

1. Push the generated project to a GitHub, GitLab, or Bitbucket repository.
2. Import that repository in Vercel, or run `npx vercel` from the generated project.
3. Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin.
4. Deploy. The project build command is `npm run build`; the production start command for other Node.js hosts is `npm start`.

The generated project is a regular Next.js app, so any host that supports Next.js can deploy it.

## Develop this repository

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run build:packages
npm run dev
```

The repository root is an example docs site consuming the local `docss-theme` workspace. The publishable workspaces are:

```text
packages/theme/       docss-theme runtime, Next integration, and styles
packages/create-docss/ create-docss CLI and generated app template
```

Run checks before release:

```bash
npm run build:packages
npm run lint
npm run build
```

## Publish releases

The npm names `docss-theme` and `create-docss` must belong to your npm account before publishing. Log in with an account that can publish both packages.

1. Update `packages/theme/package.json` version.
2. Update the matching `docss-theme` version in the root and in `packages/create-docss/template/package.json`.
3. Update `packages/create-docss/package.json` version.
4. Run `npm install`, `npm run build:packages`, `npm run lint`, and `npm run build`.
5. Inspect package contents with `npm pack --workspace=packages/theme --dry-run` and `npm pack --workspace=packages/create-docss --dry-run`.
6. Publish the theme first with `npm publish --workspace=packages/theme`.
7. Publish the CLI with `npm publish --workspace=packages/create-docss`.
8. Test the public flow in a clean folder: `npm create docss smoke-test`.

The CLI template dependency must point at a theme version that has already been published. The npm packages contain the theme source and the app template; generated user projects do not depend on this Git repository.

