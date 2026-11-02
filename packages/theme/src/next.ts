import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

export function withDocsTheme(config: NextConfig = {}): NextConfig {
  const withMDX = createMDX();
  const transpilePackages = new Set([...(config.transpilePackages ?? []), '@docss/theme']);

  return withMDX({
    ...config,
    transpilePackages: [...transpilePackages],
  });
}