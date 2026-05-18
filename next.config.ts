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
