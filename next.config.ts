// next.config.js
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.ignoreWarnings = [
      { module: /handlebars/ }
    ];
    return config;
  },
};

module.exports = nextConfig;
