import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import docsConfig from '../../docs.config';

const inter = Inter({
  subsets: ['latin'],
});

const webSiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: docsConfig.name,
  url: docsConfig.siteUrl,
  description: docsConfig.description,
});

export const metadata: Metadata = {
  metadataBase: new URL(docsConfig.siteUrl),
  title: {
    default: docsConfig.name,
    template: `%s | ${docsConfig.name}`,
  },
  description: docsConfig.description,
  openGraph: {
    title: docsConfig.name,
    description: docsConfig.description,
    siteName: docsConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: docsConfig.name,
    description: docsConfig.description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={docsConfig.language} className={inter.className} suppressHydrationWarning>
      <head>
        <script type="application/ld+json">{webSiteSchema}</script>
      </head>
      <body className="flex flex-col min-h-screen">
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
