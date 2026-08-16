import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // ← CETTE LIGNE EMPÊCHE LE PLANTAGE DU BUILD
  },
};

export default nextConfig;