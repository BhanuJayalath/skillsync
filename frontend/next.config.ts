import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.icons8.com", "example.com", "ft6wu7qq4rlyfzwh.public.blob.vercel-storage.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // This will skip ESLint during builds
  },
};

export default nextConfig;
