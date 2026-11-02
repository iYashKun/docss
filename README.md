# Your Docs

A customizable documentation site built with Next.js, Fumadocs, and MDX. Edit one TypeScript config, add pages under `content/docs/`, and deploy the site with your hosting provider.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site rebuilds as you edit its config and MDX pages.

## Configure the site

Edit `docs.config.ts` to set the site name, description, canonical URL, language, GitHub link, and navigation links:

```ts
const docsConfig: DocsConfig = {
	name: 'Acme Docs',
	description: 'Guides and reference for Acme.',
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
	language: 'en',
	githubUrl: 'https://github.com/acme/product',
	links: [
		{ text: 'Status', url: 'https://status.acme.com', external: true },
	],
};
```

The config drives the site title, SEO metadata, language, navigation, and structured data. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin, for example `https://docs.acme.com`.

## Write documentation

Add `.mdx` pages in `content/docs/`. The `index.mdx` file is the site homepage; nested folders map to nested URLs.

```text
content/docs/
	index.mdx
	getting-started.mdx
	guides/
		accounts.mdx
```

Pages support YAML frontmatter:

```mdx
---
title: Accounts
description: Manage users and account settings.
---

Your page content goes here.
```

The sidebar is generated from the files in `content/docs/`. `source.config.ts` defines the MDX frontmatter schema and Fumadocs source integration.

## Build and deploy

```bash
npm run lint
npm run build
npm start
```

Deploy to Vercel by importing the repository and setting `NEXT_PUBLIC_SITE_URL` in the project environment variables. For other Node.js hosts, use `npm run build` as the build command and `npm start` as the start command. Run `npm install` during deployment so the `postinstall` script generates the Fumadocs source.

## TypeScript configuration

Application and tool configs use TypeScript. `next.config.ts` and `eslint.config.ts` are TypeScript configs; PostCSS is configured through the `postcss` field in `package.json` because Next.js does not load a `postcss.config.ts` file.

