import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allowed quality settings for next/image (Next 16+ requires explicit
    // allow-list when components pass custom quality values).
    qualities: [50, 55, 60, 65, 70, 75, 80, 85, 90],
  },
};

export default nextConfig;
