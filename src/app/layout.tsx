import '@/app/global.css';
import { createDocsMetadata, DocsRoot } from 'docss-theme';
import docsConfig from '../../docs.config';

export const metadata = createDocsMetadata(docsConfig);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsRoot config={docsConfig}>{children}</DocsRoot>;
}
