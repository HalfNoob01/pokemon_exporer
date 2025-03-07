import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizePackageImports: ["@chakra-ui/react"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint : {
    ignoreDuringBuilds : true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: ''
      },
    ],
  },
};

export default nextConfig;
