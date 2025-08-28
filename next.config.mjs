/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Handle static assets
  trailingSlash: false,
  // Environment specific configs
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
