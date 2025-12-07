// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  fontLoaders: [], // 👈 prevents automatic Geist/Inter injection
  eslint: {
    ignoreDuringBuilds: true, // ✅ must be inside eslint
  },
  /* other config options */
};

export default nextConfig;