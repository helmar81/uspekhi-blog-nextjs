import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Genkit uses dynamic requires that the bundler can't resolve; load it from node_modules at runtime
  serverExternalPackages: ["genkit", "@genkit-ai/core", "@genkit-ai/ai", "@genkit-ai/googleai"],
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true, // Serves images directly from static storage
  },
};

export default nextConfig;