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

  // Fix development server and hot reloading issues
  experimental: {
    serverComponentsExternalPackages: ['three'],
    // Improve hot reloading stability
    optimizeCss: false,
    optimizeServerReact: false,
  },

  // Development server configuration
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Fix hot reloading issues
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            default: false,
            vendors: false,
          },
        },
      };
    }
    return config;
  },

  // Prevent fetch errors during development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
