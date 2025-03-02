import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mangafuna.xyz',
      },
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
    ],
  },
};

export default nextConfig;
