import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true, // Serves images directly from static storage
  },
};

export default nextConfig;