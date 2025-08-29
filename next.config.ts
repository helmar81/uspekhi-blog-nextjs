import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ignore require.extensions warnings from handlebars
    config.ignoreWarnings = [{ module: /handlebars/ }];
    return config;
  },
  typescript: {
    // Allow production builds even if type errors exist
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
