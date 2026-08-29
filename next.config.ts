import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The framework version is not something visitors need to know. */
  poweredByHeader: false,

  /* Brand artwork is served locally, so only the modern format matters here. */
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
