/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'culture.seoul.go.kr',
      },
      {
        protocol: 'https',
        hostname: 'culture.seoul.go.kr',
      },
      {
        protocol: 'http',
        hostname: 'yeyak.seoul.go.kr',
      },
      {
        protocol: 'https',
        hostname: 'yeyak.seoul.go.kr',
      },
    ],
  },
};

module.exports = nextConfig;
