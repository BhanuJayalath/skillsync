import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img.icons8.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // This will skip ESLint during builds
  },
};

export default nextConfig;
