import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['mui-chips-input'],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.grofers.com',
      },
      {
        protocol: 'https',
        hostname: 'media-assets.swiggy.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
      },
    ],
  },
};

export default nextConfig;
