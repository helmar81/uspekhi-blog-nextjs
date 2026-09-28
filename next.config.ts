import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // This handles the warning for Webpack (used in production builds)
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /handlebars/ }];
    return config;
  },

  experimental: {
    swcTraceProfiling: false,
    // This handles equivalent settings for Turbopack (used in npm run dev)
    turbo: {
      rules: {
        // If handlebars causes issues in Turbo, you can add rules here
      },
    },
  },
};

const withPwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPwaConfig(nextConfig);