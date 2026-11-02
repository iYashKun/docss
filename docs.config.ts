import { defineDocsConfig } from 'docss-theme';

export { type DocsConfig } from 'docss-theme';

const docsConfig = defineDocsConfig({
  name: 'Your Docs',
  description: 'Documentation for your product.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  language: 'en',
  links: [],
});

export default docsConfig;