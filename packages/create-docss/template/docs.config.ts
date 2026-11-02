import { defineDocsConfig } from 'docss-theme';

export { type DocsConfig } from 'docss-theme';

export default defineDocsConfig({
  name: {{SITE_NAME_JSON}},
  description: 'Documentation, guides, and reference.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  language: 'en',
  links: [],
});
