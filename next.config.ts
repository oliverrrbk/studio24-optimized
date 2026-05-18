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
    ];
  },
};

export default nextConfig;
