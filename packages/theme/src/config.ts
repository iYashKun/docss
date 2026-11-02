import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { Metadata } from 'next';

export type DocsConfig = {
  name: string;
  description: string;
  siteUrl: string;
  language?: string;
  githubUrl?: string;
  links?: NonNullable<BaseLayoutProps['links']>;
};

export function defineDocsConfig<T extends DocsConfig>(config: T): T {
  return config;
}

export function createDocsMetadata(config: DocsConfig): Metadata {
  return {
    metadataBase: new URL(config.siteUrl),
    title: {
      default: config.name,
      template: `%s | ${config.name}`,
    },
    description: config.description,
    openGraph: {
      title: config.name,
      description: config.description,
      siteName: config.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.name,
      description: config.description,
    },
  };
}