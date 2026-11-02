import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export type DocsConfig = {
  name: string;
  description: string;
  siteUrl: string;
  language: string;
  githubUrl?: string;
  links: NonNullable<BaseLayoutProps['links']>;
};

const docsConfig: DocsConfig = {
  name: 'Your Docs',
  description: 'Documentation for your product.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  language: 'en',
  links: [],
};

export default docsConfig;