import { source } from '@/lib/source';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsPageContent, getDocsMDXComponents } from 'docss-theme';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPageContent
      title={page.data.title}
      description={page.data.description}
      toc={page.data.toc}
      full={page.data.full}
    >
      <MDX
        components={getDocsMDXComponents({
          a: createRelativeLink(source, page),
        })}
      />
    </DocsPageContent>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: { params: Promise<{ slug?: string[] }> },
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
