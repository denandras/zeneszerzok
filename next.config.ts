import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  // trailingSlash removed - Vercel handles this better with static export
};

export default nextConfig;
