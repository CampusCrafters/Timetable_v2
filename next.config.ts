import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com'],  // Add external domain here
  },
  // other config options here
};

export default nextConfig;
