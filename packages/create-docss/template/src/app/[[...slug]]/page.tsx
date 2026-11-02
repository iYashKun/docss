import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsPageContent, getDocsMDXComponents } from 'docss-theme';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';

type PageProps = { params: Promise<{ slug?: string[] }> };

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPageContent
      title={page.data.title}
      description={page.data.description}
      toc={page.data.toc}
      full={page.data.full}
    >
      <MDX components={getDocsMDXComponents({ a: createRelativeLink(source, page) })} />
    </DocsPageContent>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return { title: page.data.title, description: page.data.description };
}
