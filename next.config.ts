import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['motion'],
  async rewrites() {
    return [
      {
        source: '/farvepalette',
        destination: '/farvepalette.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/farvepalette',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/farvepalette.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/page2',
        destination: '/behandlinger',
        permanent: true,
      },
      {
        source: '/page2.html',
        destination: '/behandlinger',
        permanent: true,
      },
      {
        source: '/omossporgsmaal',
        destination: '/min-historie',
        permanent: true,
      },
      {
        source: '/omossporgsmaal.html',
        destination: '/min-historie',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
