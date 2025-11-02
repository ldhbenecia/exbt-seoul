/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.go.kr',
      },
      {
        protocol: 'https',
        hostname: '**.org',
      },
      {
        protocol: 'http',
        hostname: '**.go.kr',
      },
      {
        protocol: 'http',
        hostname: '**.org',
      },
    ],
  },
};

module.exports = nextConfig;

