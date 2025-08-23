/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for Netlify
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Build optimization for Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,

  // Simplified configuration for Netlify
  experimental: {
    serverComponentsExternalPackages: ['three'],
  },

  // Improve error handling and prevent RSC fetch failures
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Suppress specific warnings during development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Suppress specific Recharts warnings in development
      const originalWarn = console.warn;
      console.warn = (...args) => {
        if (
          typeof args[0] === 'string' &&
          args[0].includes('Support for defaultProps will be removed from function components') &&
          (args[0].includes('XAxis') || args[0].includes('YAxis'))
        ) {
          return;
        }
        originalWarn.apply(console, args);
      };
    }
    return config;
  },
}

module.exports = nextConfig
