import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import docsConfig from '../../docs.config';

export function baseOptions(): BaseLayoutProps {
  const options: BaseLayoutProps = {
    nav: {
      title: docsConfig.name,
    },
    links: docsConfig.links,
  };

  if (docsConfig.githubUrl) options.githubUrl = docsConfig.githubUrl;

  return options;
}
