import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/introduction',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/introduction',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
