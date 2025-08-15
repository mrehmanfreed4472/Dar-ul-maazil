/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for Vercel
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/api/v1/image/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Build optimization
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  // Vercel-specific optimizations
  experimental: {
    optimizeCss: true,
    // Enable if using app directory features
    serverComponentsExternalPackages: ['three'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
