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

  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,

  // Simplified configuration for Netlify
  experimental: {
    serverComponentsExternalPackages: ['three'],
  },
}

module.exports = nextConfig
