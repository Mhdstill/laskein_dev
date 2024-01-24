/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fr.wikipedia.org',
        port: '',
        pathname: '/wiki/Avatar_(informatique)#/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
