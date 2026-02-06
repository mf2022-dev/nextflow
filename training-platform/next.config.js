/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow cross-origin requests for development
  experimental: {
    allowedDevOrigins: ['sandbox.novita.ai'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
}

const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

module.exports = withNextIntl(nextConfig);
