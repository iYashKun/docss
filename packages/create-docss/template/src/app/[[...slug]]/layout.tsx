import { DocsLayoutShell } from 'docss-theme';
import { source } from '@/lib/source';
import docsConfig from '../../../docs.config';

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocsLayoutShell tree={source.pageTree} config={docsConfig}>{children}</DocsLayoutShell>;
}
