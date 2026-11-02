import './global.css';
import { createDocsMetadata, DocsRoot } from 'docss-theme';
import docsConfig from '../../docs.config';

export const metadata = createDocsMetadata(docsConfig);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocsRoot config={docsConfig}>{children}</DocsRoot>;
}
