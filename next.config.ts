import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ✅ Skip ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Allow production builds even if there are type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
