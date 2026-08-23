import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Configuration PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ]
  },
  
  // Optimisations images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddfwhwgpxdzborpvusld.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig