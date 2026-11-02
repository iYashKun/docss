import type { ComponentProps, ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage as FumadocsDocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { DocsConfig } from './config.js';

export function DocsRoot({ children, config }: { children: ReactNode; config: DocsConfig }) {
  const websiteSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.siteUrl,
    description: config.description,
  });

  return (
    <html lang={config.language ?? 'en'} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json">{websiteSchema}</script>
        <RootProvider
          theme={{
            defaultTheme: 'system',
            attribute: 'class',
            enableSystem: true,
            disableTransitionOnChange: false,
            scriptProps: { type: 'application/json' },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

export function DocsLayoutShell({
  children,
  config,
  tree,
}: {
  children: ReactNode;
  config: DocsConfig;
  tree: ComponentProps<typeof FumadocsDocsLayout>['tree'];
}) {
  const layoutProps: ComponentProps<typeof FumadocsDocsLayout> = {
    tree,
    nav: { title: config.name },
    links: config.links,
    themeSwitch: { mode: 'light-dark-system' },
  };

  if (config.githubUrl) layoutProps.githubUrl = config.githubUrl;

  return <FumadocsDocsLayout {...layoutProps}>{children}</FumadocsDocsLayout>;
}

export function DocsPageContent({
  children,
  description,
  full,
  title,
  toc,
}: {
  children: ReactNode;
  description?: string;
  full?: boolean;
  title: string;
  toc: ComponentProps<typeof FumadocsDocsPage>['toc'];
}) {
  return (
    <FumadocsDocsPage toc={toc} full={full}>
      <DocsTitle>{title}</DocsTitle>
      {description && <DocsDescription>{description}</DocsDescription>}
      <div className="mb-1 border-b pb-1" />
      <DocsBody>{children}</DocsBody>
    </FumadocsDocsPage>
  );
}

export function getDocsMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  };
}