import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all quality values used across gallery, couple, and story images
    qualities: [70, 75, 80, 82, 85, 90],
  },
};

export default nextConfig;
